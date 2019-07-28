var clientId = new Date().getTime().toString();

var client = new Paho.MQTT.Client(window.juli.MQTT, window.juli.MQTTPORT, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;

var onConnectCallback;

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    // console.log("onConnect");
    //alert("onConnect");

    if (window.deviceId != "") {
        client.subscribe("storybox/" + window.deviceId + "/client");
        //client.subscribe("storybox/"+window.deviceId+"/server");
    }

    //询问设备是否在线
    //var objCmd = {cmd:"getOnlineStatus"};
    //clientPublish(objCmd);
    //alert(window.deviceId);
    if (onConnectCallback) onConnectCallback();

    //支持离线消息，clearSession=false外，还必须订阅时qos=1
    //client.subscribe('12345',{qos:1});
}

function onFailure() {
    var date = new Date();
    // console.log(date + " failure,try to reclient");
    clientConnect();
}

function onConnectionLost() {

    clientConnect();
}

function onMessageDelivered(message) {
    alert("发送成功");
}

//function onMessageArrived(message){
//	alert(message.payloadString);
//}


function clientCreate(onConnectCallback) {
    if (WebSocketCheck()) {
        client.onMessageArrived = onMessageArrived;

        onConnectCallback = onConnectCallback;
        clientConnect();
    } else {
        var html = "<div class=\"alert alert-danger notSupportWebSocket\"><span>抱歉，您的浏览器不支持某些重要特性，有些功能无法正常使用</span></div>";
        $("body").find("div").eq(0).before(html);
    }
}

function clientConnect() {
    // connect the client
    try {
        client.connect({
            cleanSession: false,
            useSSL: window.juli.useSSL, //outman,20170810,https环境下，要采用wss传输，不然浏览器会block
            onSuccess: onConnect,
            onFailure: onFailure
        });
    } catch (error) {
        console.log(error);
    }
}

function clientPublish(obj) {
    if (WebSocketCheck()) {
        var s = JSON.stringify(obj); //message is object ,like {cmd:"download",track:{url:play_url_32,title:trackId}}
        console.log(s);
        //alert(s);
        if (window.deviceId != "") {
            //var bytes = str2ab(s);
            var message = new Paho.MQTT.Message(s);
            //message = new Paho.MQTT.Message("hello");
            var topic = "storybox/" + window.deviceId + "/server/page";
            //alert(topic);
            message.destinationName = topic;
            message.qos = 1;
            try {
                // console.log()
                client.send(message);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

function WebSocketCheck() {
    if ("WebSocket" in window) return true;else return false;
}

var initialList = {};

function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);

    try {
        var obj = JSON.parse(message.payloadString);
        console.log(obj);
        if (obj.hasOwnProperty("onlineStatus")) {
            if (onlineStatus_change) onlineStatus_change(obj.onlineStatus);
        } else if (obj.hasOwnProperty("boxInfo")) {
            if (showBoxInfo) showBoxInfo(obj.boxInfo);
        } else if (obj.hasOwnProperty("volume")) {
            if (currentVolumeDisplay) currentVolumeDisplay(obj.volume);
        } else if (obj.hasOwnProperty("trackListId") && obj.hasOwnProperty("trackId") && obj.hasOwnProperty("type")) {
            if (playTrack_change) playTrack_change(obj.trackListId, obj.trackId, obj.type);
        } else if (obj.hasOwnProperty("playStatus")) {
            if (playStatus_change) playStatus_change(obj.playStatus);
        } else if (obj.hasOwnProperty("playProgress")) {
            if (currentProgressDisplay) currentProgressDisplay(obj.playProgress);
        } else if (obj.hasOwnProperty("mode")) {
            if (mode_change) mode_change(obj.mode);
        } else if (obj.hasOwnProperty("downloadStatus") && obj.hasOwnProperty("trackId")) {
            if (after_download) after_download(obj.downloadStatus, obj.trackId);
        } else if (obj.hasOwnProperty("configWifi")) {
            if (onConfigWifi) onConfigWifi(obj.configWifi);
        } else if (obj.hasOwnProperty("playSinVoiceUrl") && obj.hasOwnProperty("openId")) {
            console.log("------------------------------------");
            if (playSinVoiceUrl) playSinVoiceUrl(obj.playSinVoiceUrl, obj.openId);
        } else if (obj.hasOwnProperty("cmd") && obj.hasOwnProperty("trackListId") && obj.hasOwnProperty("trackIds")) {
            if (obj.cmd == "initialTrackList" && startInitialTrackList) {
                if (obj.hasOwnProperty("from") && obj.hasOwnProperty("to") && obj.hasOwnProperty("listSize")) {
                    if (obj.from == 0) {
                        initialList.listId = obj.trackListId;
                        initialList.trackIds = [];
                    }

                    if (initialList.listId == obj.trackListId) {
                        initialList.trackIds.push.apply(initialList.trackIds, obj.trackIds);
                        if (obj.to + 1 >= obj.listSize) {
                            startInitialTrackList(obj.trackListId, initialList.trackIds);
                            initialList.listId = -1;
                            initialList.trackIds = [];
                        }
                    }
                } else {
                    startInitialTrackList(obj.trackListId, obj.trackIds);
                }
            }
        } else if (obj.hasOwnProperty("cmd") && obj.cmd == "customer") {
            if (obj.hasOwnProperty("key") && obj.hasOwnProperty("value")) {
                if (obj.key == "poweroff") {
                    if (onCustomerPoweroff) onCustomerPoweroff(obj.value);
                } else if (obj.key == "light") {
                    if (onCustomerLight) onCustomerLight(obj.value);
                } else if (obj.key == "childlock") {
                    if (onCustomerChildlock) onCustomerChildlock(obj.value);
                } else if (obj.key == "playProgress") {
                    if (onCustomerPlayProgress) onCustomerPlayProgress(obj.value);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}

/*********************************发消息*************************************/
//播放当前歌曲
function playTrack(trackListId, trackId, url, downloadUrl) {
    var cmdObj = { cmd: "playTrack", trackListId: trackListId, trackId: trackId, url: url, downloadUrl: downloadUrl };
    clientPublish(cmdObj);
}

//下一首
function forwardTrack() {
    var cmdObj = { cmd: "forward" };
    clientPublish(cmdObj);
}

//上一首
function backwardTrack() {
    var cmdObj = { cmd: "backward" };
    clientPublish(cmdObj);
}

//暂停
function pauseTrack() {
    var cmdObj = { cmd: "pause" };
    clientPublish(cmdObj);
}

//继续播放
function resumeTrack() {
    var cmdObj = { cmd: "resume" };
    clientPublish(cmdObj);
}

//询问当前播放歌曲
function queryTrack() {
    var cmdObj = { cmd: "getTrack" };
    clientPublish(cmdObj);
}

//询问当前播放状态
function queryPlayStatus() {
    var cmdObj = { cmd: "getPlayStatus" };
    clientPublish(cmdObj);
}

//询问当前播放进度
function queryPlayProgress() {
    var cmdObj = { cmd: "getPlayProgress" };
    clientPublish(cmdObj);
}

//询问当前播放模式
function queryMode() {
    var cmdObj = { cmd: "getMode" };
    clientPublish(cmdObj);
}

//设置列表循环
function setRepeatall() {
    var cmdObj = { cmd: "setMode", value: "repeat all" };
    clientPublish(cmdObj);
}

//设置单曲循环
function setRepeatone() {
    var cmdObj = { cmd: "setMode", value: "repeat one" };
    clientPublish(cmdObj);
}

//远程关机
function cmd_poweroff() {
    var cmdObj = { cmd: "setPoweroff" };
    clientPublish(cmdObj);
}

//设置音量
function cmd_setvolume(value) {
    var cmdObj = { cmd: "setVolume", value: value };
    clientPublish(cmdObj);
}

//获取音量
function cmd_getVolume() {
    var cmdObj = { cmd: "getVolume" };
    clientPublish(cmdObj);
}

//主动询问是否在线
function getOnlineStatus() {
    var cmdObj = { cmd: "getOnlineStatus" };
    clientPublish(cmdObj);
}

//主动询问设备信息
function getBoxInfo() {
    var cmdObj = { cmd: "getBoxInfo" };
    clientPublish(cmdObj);
}

//升级指令
function boxUpgrade(versionName, firmwareUrl) {
    var cmdObj = { cmd: "upgrade", versionName: versionName, firmwareUrl: firmwareUrl };
    clientPublish(cmdObj);
}

//询问设备初始列表内容
function getInitialTrackList(trackListId) {
    trackListId = parseInt(trackListId);
    var cmdObj = { cmd: "getInitialTrackList", trackListId: trackListId };
    clientPublish(cmdObj);
}

/** ------------------------智伴扩展接口---------------------------- **/

//获取设备定时关机状态
function cmd_customer_getPoweroff() {
    var cmdObj = { cmd: "customer", key: "getPoweroff" };
    clientPublish(cmdObj);
}

//设置设备定时关机状态
function cmd_customer_setPoweroff(value) {
    var cmdObj = { cmd: "customer", key: "setPoweroff", value: value };
    clientPublish(cmdObj);
}

//获取设备灯光状态
function cmd_customer_getLight() {
    var cmdObj = { cmd: "customer", key: "getLight" };
    clientPublish(cmdObj);
}

//设置设备灯光状态
function cmd_customer_setLight(value) {
    var cmdObj = { cmd: "customer", key: "setLight", value: value };
    clientPublish(cmdObj);
}

//获取设备童锁状态
function cmd_customer_getChildlock() {
    var cmdObj = { cmd: "customer", key: "getChildlock" };
    clientPublish(cmdObj);
}

//设置设备童锁状态
function cmd_customer_setChildlock(value) {
    var cmdObj = { cmd: "customer", key: "setChildlock", value: value };
    clientPublish(cmdObj);
}

//获取设备播放进度
function cmd_customer_getPlayProgress() {
    var cmdObj = { cmd: "customer", key: "getPlayProgress" };
    clientPublish(cmdObj);
}

//设置设备播放进度
function cmd_customer_seekTrack(value) {
    var cmdObj = { cmd: "customer", key: "seek", value: value };
    clientPublish(cmdObj);
}

/**---------------------------------------------------------------**/

/*//播放一个trackId的数组，不含url
function playTracks(trackIds) {
	var cmdObj = {cmd:"playTracks",trackIds:trackIds};
	clientPublish(cmdObj);
}*/

//播放一个trackId的数组，不含url
//function playTracks(trackIds){
//	var cmdObj = {cmd:"playTracks",trackIds:trackIds};
//	clientPublish(cmdObj);
//}

//播放一个trackId的数组，不含url, isSegment:MQTT消息是否要分段发送（部分方案不支持大数据包拼接）
function playTracks(trackIds, segment) {
    if (segment == 0) {
        var cmdObj = { cmd: "playTracks", trackIds: trackIds };
        clientPublish(cmdObj);
    } else {
        var from = 0;
        var to = 0;
        var segmentIds = new Array();

        for (var i = 0; i < trackIds.length; i++) {
            if (i % 100 == 0) {
                var size = trackIds.length - i >= 100 ? 100 : trackIds.length - i;
                segmentIds = new Array();
                from = i;
            }

            to = i;
            segmentIds[i - from] = trackIds[i];
            var listSize = trackIds.length;
            if (i - from >= 99 || i == trackIds.length - 1) {
                var cmdObj = { cmd: "playTracks", from: from, to: to, listSize: listSize, trackIds: segmentIds };
                clientPublish(cmdObj);
            }
        }
    }
}