/**
 * @description: roobo 微信公众号接口配置
 * @author: 李宝君  coolli2@163.com
 * @version: V1
 * @update: 16/7/14
 */

"use strict";

var juli = window.juli || {};
var DEBUG = "zhiban";
var LOCAL_TEST = false;
var DEVICENAME = "";

if (DEBUG === "dev") {
    window.juli.host = "http://172.17.232.68"; //开发环境接口地址
    window.juli.root = "http://dwn.roo.bo/appimg/"; //rooboAI系统测试地址
    window.juli.search = "http://172.17.232.67"; //搜索接口
    window.juli.dir = "/bbtbox"; //接口目录
    window.juli.openIdkey = "storyboxopenid"; //openIdkey值
    window.juli.resource = "/resource-mxt";
} else if (DEBUG === "story") {
    window.juli.host = "http://story.wechat.athenamuses.cn"; //正式环境接口地址
    window.juli.root = "http://story.wechat.athenamuses.cn/"; //rooboAI系统正式地址
    window.juli.search = "http://story.wechat.athenamuses.cn"; //生产环境appid

    window.juli.appid = "wx2c646ad3952224f1";
    window.juli.MQTT = "story.mqtt.athenamuses.cn"; //测试环境mqtt
    window.juli.MQTTPORT = 13008; //mqtt端口  web socket
    window.juli.useSSL = false;
    window.juli.dir = "/story"; //接口目录
    window.juli.openIdkey = "storyopenid"; //openIdkey值
    window.juli.resource = "/resource-zb";
    DEVICENAME = "机器人";

    window.juli.appRooboId = "FhMjBiNjM2YzI3Yj";
    window.juli.appRooboToken = "8c4ca87494daf3b43305e93cc94d2e439475";
    window.juli.clientId = "3010290000045007";
} else if (DEBUG === "zbui") {
    window.juli.host = "https://ui.wechat.athenamuses.cn";
    window.juli.root = "https://ui.wechat.athenamuses.cn/";
    window.juli.search = "https://ui.wechat.athenamuses.cn";

    window.juli.appid = "wxefe317540a339b9c";
    window.juli.MQTT = "uitest.mqtt.athenamuses.cn";
    window.juli.MQTTPORT = 13033;
    window.juli.useSSL = true;
    window.juli.dir = "/zbui";
    window.juli.openIdkey = "zbuiopenid";
    window.juli.resource = "/resource-zb";
    DEVICENAME = "机器人";
} else if (DEBUG === "zhineng") {
    window.juli.host = "http://dev.storybox.roobo.com"; //测试环境接口地址
    window.juli.root = "http://test-www.roobo.net"; //rooboAI系统正式地址
    window.juli.search = "http://dev.storybox.roobo.com"; //测试环境搜索接口
    window.juli.appid = "wxf45ec14451d07bfd"; //测试环境appid
    window.juli.MQTT = "101.200.151.229"; //测试环境mqtt
    window.juli.MQTTPORT = 8083; //mqtt端口
    window.juli.useSSL = false;
    window.juli.dir = "/storybox"; //接口目录
    window.juli.openIdkey = "storyboxopenid"; //openIdkey值
    window.juli.resource = "/resource-mxt";
} else if (DEBUG === "zhiling") {
    window.juli.host = "http://wechat.roobo.com"; //正式环境接口地址
    window.juli.root = "http://test-www.roobo.net"; //rooboAI系统正式地址
    window.juli.search = "http://wechat.roobo.com"; //生产环境appid
    window.juli.appid = "wx9c5f793c4eee9683";
    window.juli.MQTT = "storybox.mqtt.roobo.com"; //志玲公众号mqtt
    window.juli.MQTTPORT = 8083; //mqtt端口
    window.juli.useSSL = false;
    window.juli.dir = "/storybox"; //接口目录
    window.juli.openIdkey = "storyboxopenid"; //openIdkey值
    window.juli.resource = "/resource-mxt";
} else if (DEBUG === "babateng") {
    window.juli.host = "http://wechat.roobo.com"; //正式环境接口地址
    window.juli.root = "http://wechat.roobo.com/"; //rooboAI系统正式地址
    window.juli.search = "http://wechat.roobo.com"; //生产环境appid
    window.juli.appid = "wx7aa02ddc6da299f0";
    window.juli.MQTT = "storybox.mqtt.roobo.com"; //测试环境mqtt
    window.juli.MQTTPORT = 8084; //mqtt端口
    window.juli.useSSL = false;
    window.juli.dir = "/bbtbox"; //接口目录
    window.juli.openIdkey = "bbtopenid"; //openIdkey值
    window.juli.resource = "/resource-mxt";
}
/*
else if (DEBUG === "mingxiao") {
    window.juli.host = "http://wechat.roobo.com";           //正式环境接口地址
    window.juli.root = "http://wechat.roobo.com/";                 //rooboAI系统正式地址
    window.juli.search = "http://wechat.roobo.com";                 //生产环境appid
    window.juli.appid = "wx05499fe93f07bc3a";
    window.juli.MQTT = "mxt.mqtt.roobo.com";                    //测试环境mqtt
    window.juli.MQTTPORT = 8083;                               //mqtt端口
    window.juli.useSSL = false;
    window.juli.dir = "/mxt";                             //接口目录
    window.juli.openIdkey = "mxtopenid";                             //openIdkey值
}
*/
//ming xiao tang using 20170612
else if (DEBUG === "mingxiao_build") {
        window.juli.host = "http://wechat.music-box.cn"; //正式环境接口地址
        window.juli.root = "http://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "http://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wx05499fe93f07bc3a";
        window.juli.MQTT = "mqtt.music-box.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8083; //mqtt端口
        window.juli.useSSL = false;
        window.juli.dir = "/mxt"; //接口目录
        window.juli.openIdkey = "mxtopenid"; //openIdkey值
        window.juli.resource = "/resource-mxt";
    } else if (DEBUG === "zbtest") {
        window.juli.host = "https://zbtest.wechat.athenamuses.cn"; //正式环境接口地址
        window.juli.root = "https://zbtest.wechat.athenamuses.cn/"; //rooboAI系统正式地址
        window.juli.search = "https://zbtest.wechat.athenamuses.cn"; //生产环境appid

        window.juli.appid = "wxd11aa1a1cffd3415";
        window.juli.MQTT = "zbtest.mqtt.athenamuses.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8094; //mqtt端口  web socket
        window.juli.useSSL = true;
        window.juli.dir = "/zbtest"; //接口目录
        window.juli.openIdkey = "zbtestopenid"; //openIdkey值
        window.juli.resource = "/resource-zb";
        DEVICENAME = "机器人";

        /*  window.juli.appRooboId="NWY4MDRhYjBhYzQ2";
          window.juli.appRooboToken="242f812ba979a61a087caf21e78d7f364936";
          window.juli.clientId="3000000000100256";*/
        window.juli.appRooboId36 = "FhMjBiNjM2YzI3Yj";
        window.juli.appRooboToken36 = "8c4ca87494daf3b43305e93cc94d2e439475";
        window.juli.clientId = "3010290000045007";

        window.juli.appRooboId35 = "ODllNDViNWMyZjQx";
        window.juli.appRooboToken35 = "a2029a48423a568135f74ef1ed15a1eb3762";
    } else if (DEBUG === "zhiban") {
        window.juli.host = "https://zhiban.wechat.athenamuses.cn"; //正式环境接口地址
        window.juli.root = "https://zhiban.wechat.athenamuses.cn/"; //rooboAI系统正式地址
        window.juli.search = "https://zhiban.wechat.athenamuses.cn"; //生产环境appid

        window.juli.appid = "wx63c4c7e7719be882";
        window.juli.MQTT = "zhiban.mqtt.athenamuses.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8094; //mqtt端口  web socket
        window.juli.useSSL = true;
        window.juli.dir = "/zhiban"; //接口目录
        window.juli.openIdkey = "zhibanopenid"; //openIdkey值
        window.juli.resource = "/resource-zb";
        DEVICENAME = "机器人";

        window.juli.appRooboId36 = "FhMjBiNjM2YzI3Yj";
        window.juli.appRooboToken36 = "8c4ca87494daf3b43305e93cc94d2e439475";
        window.juli.clientId = "3010290000045007";

        window.juli.appRooboId35 = "ODllNDViNWMyZjQx";
        window.juli.appRooboToken35 = "a2029a48423a568135f74ef1ed15a1eb3762";
    } else if (DEBUG === "wys") {
        window.juli.host = "http://wechat.music-box.cn"; //正式环境接口地址
        window.juli.host = "http://shactions.athenamuses.cn";
        window.juli.root = "http://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "http://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wxefe317540a339b9c";
        window.juli.MQTT = "shactions.athenamuses.cn"; //mqtt端口  web socket
        window.juli.MQTTPORT = 8094; //mqtt端口
        window.juli.useSSL = false; //false不支持https
        window.juli.dir = "/zhiban_story"; //接口目录
        window.juli.openIdkey = "wysopenid"; //openIdkey值
        window.juli.resource = "/resource-mxt";
    } else if (DEBUG === "yuandao") {
        window.juli.host = "http://wechat.music-box.cn"; //正式环境接口地址
        window.juli.root = "http://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "http://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wx97a70cf18c2c23a8";
        window.juli.MQTT = "mqtt.music-box.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8053; //mqtt端口
        window.juli.useSSL = false;
        window.juli.dir = "/yuandao"; //接口目录
        window.juli.openIdkey = "yuandaoopenid"; //openI
        window.juli.resource = "/resource-mxt";
    } else if (DEBUG === "jinglin") {
        window.juli.host = "https://wechat.music-box.cn"; //正式环境接口地址
        window.juli.root = "https://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "https://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wxc1b2e3394e5b6012";
        window.juli.MQTT = "mqtt.music-box.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8044; //mqtt端口
        window.juli.useSSL = true;
        window.juli.dir = "/jinglin"; //接口目录
        window.juli.openIdkey = "jinglinopenid"; //openI
        window.juli.resource = "/resource-mxt";
    } else if (DEBUG === "zhiban_usa") {
        window.juli.host = "yiht.wechat.athenamuses.cn"; //正式环境接口地址
        window.juli.wyshost = "yiht.wechat.athenamuses.cn"; //web应用地址
        window.juli.root = "http://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "http://wechat.music-box.cn";
        window.juli.appid = "wxefe317540a339b9c"; //生产环境appid
        window.juli.MQTT = "shactions.athenamuses.cn"; //mqtt端口  web socket
        window.juli.MQTTPORT = 8094; //mqtt端口
        window.juli.useSSL = false; //false不支持https
        window.juli.dir = "/zhiban_usa"; //接口目录
        window.juli.openIdkey = "zhibanusaopenid"; //openIdkey值
        window.juli.resource = "/resource-zb";
        DEVICENAME = "机器人";
    } else if (DEBUG === "yiht") {
        window.juli.localhost = "http://yiht.wechat.athenamuses.cn";;
        window.juli.host = "http://wechat.music-box.cn";; //正式环境接口地址
        window.juli.root = "http://wechat.music-box.cn/";; //rooboAI系统正式地址
        window.juli.search = "http://wechat.music-box.cn";; //生产环境appid
        window.juli.appid = "wx4c8046de27216992";
        window.juli.MQTT = "yiht.mqtt.athenamuses.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 9133; //mqtt端口
        window.juli.useSSL = false;
        window.juli.dir = "/yiht"; //接口目录
        window.juli.openIdkey = "bearopenid"; //openIdkey值
        window.juli.resource = "/resource-zb";
    } else if (DEBUG === "youze") {
        window.juli.host = "http://wechat.music-box.cn"; //正式环境接口地址
        window.juli.root = "http://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "http://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wx3cf9a598ba3a0565";
        window.juli.MQTT = "mqtt.music-box.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8063; //mqtt端口
        window.juli.useSSL = false;
        window.juli.dir = "/youze"; //接口目录
        window.juli.openIdkey = "youzeopenid"; //openI
        window.juli.resource = "/resource-mxt";
    } else if (DEBUG === "gjlx") {
        window.juli.host = "https://wechat.music-box.cn"; //正式环境接口地址
        window.juli.root = "https://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "https://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wxca3b930c36e08e5b";
        window.juli.MQTT = "mqtt.music-box.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 9014; //mqtt端口
        window.juli.useSSL = true;
        window.juli.dir = "/gjlx"; //接口目录
        window.juli.openIdkey = "gjlxopenid"; //openI
        window.juli.resource = "/resource-zb";
    } else if (DEBUG === "taizhi") {
        window.juli.host = "https://wechat.music-box.cn"; //正式环境接口地址
        window.juli.root = "https://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "https://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wxc57ce70e17af494a";
        window.juli.MQTT = "mqtt.music-box.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8014; //mqtt端口
        window.juli.useSSL = true;
        window.juli.dir = "/taizhi"; //接口目录
        window.juli.openIdkey = "taizhiopenid"; //openI
        window.juli.resource = "/resource-mxt";
    } else if (DEBUG === "luqiya") {
        window.juli.host = "https://wechat.music-box.cn"; //正式环境接口地址
        window.juli.root = "https://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "https://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wx8dfcba47bd17f492";
        window.juli.MQTT = "mqtt.music-box.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8034; //mqtt端口
        window.juli.useSSL = true;
        window.juli.dir = "/luqiya"; //接口目录
        window.juli.openIdkey = "luqiyaopenid"; //openI
        window.juli.resource = "/resource-mxt";
    } else if (DEBUG === "mengdou") {
        window.juli.host = "https://wechat.music-box.cn"; //正式环境接口地址
        window.juli.root = "https://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "https://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wxf9d745b514de6033";
        window.juli.MQTT = "mqtt.music-box.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8024; //mqtt端口
        window.juli.useSSL = true;
        window.juli.dir = "/mengdou"; //接口目录
        window.juli.openIdkey = "mengdouopenid"; //openI
        window.juli.resource = "/resource-mxt";
    } else if (DEBUG === "niwawa") {
        window.juli.host = "https://wechat.music-box.cn"; //正式环境接口地址
        window.juli.root = "https://wechat.music-box.cn/"; //rooboAI系统正式地址
        window.juli.search = "https://wechat.music-box.cn"; //生产环境appid
        window.juli.appid = "wx04e5529b590464eb";
        window.juli.MQTT = "mqtt.music-box.cn"; //测试环境mqtt
        window.juli.MQTTPORT = 8004; //mqtt端口
        window.juli.useSSL = true;
        window.juli.dir = "/niwawa"; //接口目录
        window.juli.openIdkey = "niwawaopenid"; //openI
        window.juli.resource = "/resource-mxt";
    }

juli.URL = {
    codeid: window.juli.host + window.juli.dir + '/roobo/getOpenId.do', //取openid
    getSign: window.juli.host + window.juli.dir + '/roobo/getSign.do', //取微信JS-SDK签名
    sinvoice: window.juli.host + window.juli.dir + '/sinvoice/set.do', //声波配网

    //资源相关
    // cate: window.juli.host + window.juli.resource+"/getCategroy",              //大类列表
    // subcate: window.juli.host + window.juli.resource+ "/getSubCategroy",           //子类列表
    cate: window.juli.host + window.juli.dir + "/roobo/newInterface.do",
    aiqa: window.juli.host + window.juli.dir + "/roobo/rooboAiQa.do",
    // rooboOnline: window.juli.host + window.juli.dir + "/roobo/cmsOnline.do",
    getsingle: window.juli.host + window.juli.resource + "/findById", //单个资源
    download: window.juli.host + window.juli.dir + "/track/download.do", //单个媒体下载
    downloadlist: window.juli.host + window.juli.dir + "/roobo/tracklist/addTrackBatch.do", //整个资源列表下载
    reset: window.juli.host + window.juli.resource + "/ResetTrackList", //
    reset400: window.juli.host + window.juli.dir + "/roobo/tracklist/resetTrackList.do", //

    //搜索相关
    search: window.juli.search + window.juli.resource + "/EsSearch/", //ES搜索
    savesearch: window.juli.host + window.juli.resource + "/insertSearchHistory", //保存搜索历史
    getsearch: window.juli.host + window.juli.resource + "/getSearchHistory", //查询搜索历史
    clearsearch: window.juli.host + window.juli.resource + "/clearSearchHistory", //清空搜索历史

    //收藏相关
    getlike: window.juli.host + window.juli.dir + "/favorite/getlist.do", //获取收藏列表
    addlike: window.juli.host + window.juli.dir + "/favorite/save.do", //添加收藏列表
    dellike: window.juli.host + window.juli.dir + "/favorite/delete.do", //删除收藏列表

    //点播历史相关
    play: window.juli.host + window.juli.dir + "/roobo/save.do", //点播
    gethistory: window.juli.host + window.juli.dir + "/demand/getlist.do", //获取用户的点播列
    delhistory: window.juli.host + window.juli.dir + "/demand/delete.do", //点播删除
    demand: window.juli.host + window.juli.dir + "/demand/online/save.do", //点播

    //家庭成员相关
    getdevice: window.juli.host + window.juli.dir + "/familymember/getdeviceid.do", //获取用户绑定的设备号
    getmember: window.juli.host + window.juli.dir + "/familymember/getlist.do", //获取所有家庭成员
    join: window.juli.host + window.juli.dir + "/familymember/join.do", //加入家庭
    quit: window.juli.host + window.juli.dir + "/familymember/quit.do", //退出家庭
    editname: window.juli.host + window.juli.dir + "/familymember/modifynickname.do", //修改家庭成员昵称

    //设备相关
    getcode: window.juli.host + window.juli.dir + "/boxqrticket/get.do", //获取设备二维码信息
    setvolume: window.juli.host + window.juli.dir + "/boxinfo/setvolume.do", //音量调节 0-40
    getinfo: window.juli.host + window.juli.dir + "/boxinfo/get.do", //获取设备信息
    getversion: window.juli.host + window.juli.dir + "/boxinfo/getversion.do", //获取固件最新版本号

    //播放列表相关
    add: window.juli.host + window.juli.dir + "/track/add.do", //添加资源到资源信息表
    getlist: window.juli.host + window.juli.dir + "/track/getpage.do", //获取播放列表
    addlist: window.juli.host + window.juli.dir + "/tracklist/add.do", //添加资源到播放列表
    gettracklist: window.juli.host + window.juli.dir + "/tracklist/getlistsimple.do", //获取设备二维码信息
    remove: window.juli.host + window.juli.dir + "/track/remove.do", //删除资源到播放列表
    singleview: window.juli.host + window.juli.dir + "/track/getid.do", //拿到资源ID
    sync: window.juli.host + window.juli.dir + "/roobo/tracklist/syncTrackList.do", //同步播放列表
    getplaytracklist: window.juli.host + window.juli.dir + "/tracklist/getlistview.do", //获取设备播放列表
    getlistinfo: window.juli.host + window.juli.dir + "/tracklist/get.do", //获取设备播放列表
    inital: window.juli.host + window.juli.dir + "/tracklist/inital.do", //初始化

    lockrecord: window.juli.host + window.juli.dir + "/roobo/lockRecord.do", //儿童锁
    lightrecord: window.juli.host + window.juli.dir + "/roobo/lightRecord.do", //灯光设置
    volumerecord: window.juli.host + window.juli.dir + "/roobo/volumeRecord.do", //音量设置
    powerrecord: window.juli.host + window.juli.dir + "/roobo/powerRecord.do", //定时设置

    levelOne: window.juli.host + window.juli.dir + "/roobo/levelOne.do",
    levelTwo: window.juli.host + window.juli.dir + "/roobo/levelTwo.do",
    upgUpdate: window.juli.host + window.juli.dir + "/roobo/upgUpdate.do",
    upIp: window.juli.host + window.juli.dir + "/roobo/upIp.do",
    getControl: window.juli.host + window.juli.dir + "/roobo/getControl.do"
};