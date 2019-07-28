/**
 * @description: roobo 工具类js
 * @author: libaojun@roo.bo
 * @version: V2
 * @update: 16/4/19
 **/

/**
utils.js 通用工具方法js里的方法列表

1 获取openId

2 根据deviceId 拿到播放列表ID 数组 首个

3 创建播放列表 无返回

4 获取deviceID

5 点播的通用方法

6 播放通用方法

7 获取url参数

8 时间戳格式化为分秒

9 获取设备在线状态

10 使故事机同步播放列表

11 IOS设置标题

12 清除select的值  名

13 是否是巴巴腾环境

14 拉取当前用户收藏列表
*/

var _opId = '';

if (sessionStorage.getItem(juli.openIdkey) === '' || sessionStorage.getItem(juli.openIdkey) === null) {
    _opId = getCookie(juli.openIdkey);
} else {
    _opId = sessionStorage.getItem(juli.openIdkey);
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            var c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
console.log(_opId);

var utils = {
    pagesize: 10,
    openid: _opId,
    tracklist: "播放列表",
    getfav: function (obj) {
        //拿到该用户的收藏列表数据
        if (LOCAL_TEST) {
            return;
        }
        var _self = obj;
        $.ajax({
            url: juli.URL.getlike,
            type: 'get',
            dataType: 'json',
            cache: false,
            async: false,
            data: {
                openId: utils.openid
            }
        }).done(function (res) {
            console.log(res);
            _self.favlist = res;
        });
    },
    gettrackList: function () {
        //拿到设备播放列表，return设备播放列表数据
        var playtracklist;
        $.ajax({
            url: juli.URL.getplaytracklist,
            type: 'get',
            async: false,
            cache: false,
            data: {
                deviceId: utils.getdevice()
            }
        }).done(function (res) {
            console.log(res);
            playtracklist = res;
        });
        return playtracklist;
    },
    trackListId: function () {
        //拿到播放列表ID
        var trackListId;
        $.ajax({
            url: juli.URL.gettracklist,
            type: 'get',
            async: false,
            cache: false,
            data: {
                deviceId: utils.getdevice()
            }
        }).done(function (res) {
            console.log(res);
            trackListId = res[0].id;
            console.log(trackListId);
        });
        return trackListId;
    },
    createtrackList: function () {
        //创建播放列表
        var newjson = {
            id: 0,
            deviceId: utils.getdevice(),
            name: "默认列表",
            coverSmallUrl: ""
        };
        console.log(newjson);
        $.ajax({
            url: juli.URL.addlist,
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(newjson)
        }).done(function (res) {
            console.log(res);
        });
    },
    getdevice: function () {
        //获取deviceid
        var deviceid;
        var openId = utils.openid;
        $.ajax({
            url: juli.URL.getdevice,
            type: 'get',
            async: false,
            cache: false,
            data: {
                openId: utils.openid
            }
        }).done(function (res) {
            console.log(res);
            deviceid = res;
            window.deviceId = res;
        });
        return deviceid;
    },
    showOfflineToast: function () {
        if (DEBUG == "zhiban" || DEBUG == "taizhi") {
            $.toast("机器人不在线", "text");
        } else if (DEBUG == "orange") {
            $.toast("小桔灯不在线", "text");
        } else if (DEBUG == "bear") {
            $.toast("吉特熊不在线", "text");
        } else if (DEBUG == "yuandao") {
            $.toast("早教机不在线", "text");
        } else if (DEBUG == "jinglin") {
            $.toast("小七不在线", "text");
        } else {
            $.toast("故事机不在线", "text");
        }
    },
    demand: function (trackId, url) {
        //点播的通用方法
        //如果没有绑定设备--提示并返回
        if (!utils.getdevice()) {
            $.alert("您还没有绑定设备，请去绑定设备！", "", function () {
                // 回调
            });
            return false;
        }
        //如果故事机不在线--则提示并返回
        if (!utils.online()) {
            utils.showOfflineToast();
            return false;
        }

        var json = {
            openId: utils.openid,
            trackId: trackId,
            url: url
        };
        $.ajax({
            url: juli.URL.demand + "?mediaId=",
            type: "POST",
            contentType: 'application/json',
            async: false,
            //dataType : 'json',
            timeout: 4000,
            data: JSON.stringify(json),
            success: function (msg) {
                if (msg == "0") {
                    $.toast("点播成功！", "text");
                } else {
                    $.toast("点播失败", "text");
                }
            }
        });
    },
    play: function (trackId) {
        //播放通用方法
        var playJson = {
            openId: utils.openid,
            trackId: trackId
        };
        console.log(JSON.stringify(playJson));
        $.ajax({
            url: juli.URL.play + "?mediaId=" + "",
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            data: JSON.stringify(playJson)
        }).done(function (res) {
            console.log(res);
        });
    },
    getparam: function (name) {
        //获取url参数
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null) return "";else return decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    formatSeconds: function (value) {
        //时间戳格式化
        var theTime = parseInt(value); // 秒
        var theTime1 = 0; // 分
        var theTime2 = 0; // 小时
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result;
    },
    online: function () {
        //设备是否在线
        var isonline;
        $.ajax({
            url: juli.URL.getinfo,
            type: 'get',
            async: false,
            cache: false,
            data: {
                deviceId: utils.getdevice()
            }
        }).done(function (res) {
            isonline = res.online;
        });
        return isonline;
    },
    settitle: function (name) {
        //解决iosbug
        console.log(name);
        var $body = $('body');
        document.title = name;
        var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
        $iframe.on('load', function () {
            setTimeout(function () {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    },
    clearselect: function () {
        //清除select的值  名
        $("#select").val("");
        $("#select").data('values', '');
    },
    clearselectall: function () {
        //清除select的值  名
        $("#selectall").val("");
        $("#selectall").data('values', '');
    },
    setImgSmallLarge: function (module) {
        switch (module.name) {
            case "子鱼讲故事":
                module.imgLarge = "static/img/rooboimg/imgLarge/ziyu.jpg";
                module.imgSmall = "static/img/rooboimg/imgSmall/ziyu.png";
                break;
            case "晓月讲故事":
                module.imgLarge = "static/img/rooboimg/imgLarge/xiaoyue.jpg";
                module.imgSmall = "static/img/rooboimg/imgSmall/xiaoyue.png";
                break;
            case "儿歌童谣":
                module.imgLarge = "static/img/rooboimg/imgLarge/ertong.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/ertong.png";
                break;
            case "故事精选":
                module.imgLarge = "static/img/rooboimg/imgLarge/jingxuan.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/jingxuan.png";
                break;
            case "动画故事":
                module.imgLarge = "static/img/rooboimg/imgLarge/donghua.jpg";
                module.imgSmall = "static/img/rooboimg/imgSmall/donghua.png";
                break;
            case "安全常识":
                module.imgLarge = "static/img/rooboimg/imgLarge/anquan.jpg";
                module.imgSmall = "static/img/rooboimg/imgSmall/anquan.png";
                break;
            case "社会交往":
                module.imgLarge = "static/img/rooboimg/imgLarge/jiaowang.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/jiaowang.png";
                break;
            case "性格培养":
                module.imgLarge = "static/img/rooboimg/imgLarge/xingge.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/xingge.png";
                break;
            case "精品绘本":
                module.imgLarge = "static/img/rooboimg/imgLarge/huiben.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/huiben.png";
                break;
            case "英语启蒙":
                module.imgLarge = "static/img/rooboimg/imgLarge/qimeng.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/qimeng.png";
                break;
            case "晚安故事":
                module.imgLarge = "static/img/rooboimg/imgLarge/wanan.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/wanan.png";
                break;
            case "热门专辑":
                module.imgLarge = "static/img/rooboimg/imgLarge/zhuanji.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/zhuanji.png";
                break;
            case "科普益智":
                module.imgLarge = "static/img/rooboimg/imgLarge/yizhi.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/yizhi.png";
                break;
            case "国学历史":
                module.imgLarge = "static/img/rooboimg/imgLarge/lishi.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/lishi.png";
                break;
            case "走进艺术":
                module.imgLarge = "static/img/rooboimg/imgLarge/yishu.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/yishu.png";
                break;
            case "家长专区":
                module.imgLarge = "static/img/rooboimg/imgLarge/jiazhang.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/jiazhang.png";
                break;
            case "小学学科":
                module.imgLarge = "static/img/rooboimg/imgLarge/xueke.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/xueke.png";
                break;
            case "儿歌":
                module.imgLarge = "static/img/rooboimg/imgLarge/ertong.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/xueke.png";
                break;
            case "故事":
                module.imgLarge = "static/img/rooboimg/imgLarge/jingxuan.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/xueke.png";
                break;
            case "国学":
                module.imgLarge = "static/img/rooboimg/imgLarge/jiazhang.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/xueke.png";
                break;

            case "英语":
                module.imgLarge = "static/img/rooboimg/imgLarge/yishu.png";
                module.imgSmall = "static/img/rooboimg/imgSmall/xueke.png";
                break;
        }

        return module;
    },
    getClientId: function () {
        var clientId = window.juli.clientId;
        var deviceId = utils.getdevice();
        if (deviceId != null && deviceId != "") {
            if (deviceId.indexOf("test") == -1) {
                clientId = deviceId.split('_')[0];
            }
        }
        // console.log(clientId);
        return clientId;
    }

};