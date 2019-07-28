/**
 * Created by lixinwei on 16/8/6.
 */
/*
 * 修改记录：
 * 20170810 yongjiafan
 * roboo只做了airkiss的加密配网，没有做非加密配网，
 * 而3503需要用到非加密配网。添加代码，判断是否需要加密配网
 * 
 * 20170812
 * zhiban mingxiao_build 后台没有encryption.do接口，在error中将encryption设置为true
 */

!function ($, win, undefined) {
    "use strict";

    var encryption = true;

    wx.ready(function () {
        //这里放配置成功后就触发的内容
        wx.hideOptionMenu();
        getencryption();
        doConnect();
    });

    function getencryption() {
        if (window.deviceId == "") utils.getdevice();

        var url = window.juli.host + window.juli.dir + "/wx/connectwifi/encryption.do?deviceId=" + window.deviceId;
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            timeout: 4000,
            success: function (msg) {
                if (msg == 0) {
                    encryption = false;
                } else {
                    encryption = true;
                }
            },
            error: function (msg) {
                encryption = true;
            }
        });
    }

    function doConnect() {
        if (encryption) {
            var key = "MTIzNDU2Nzg5MDEyMzQ1Ng=="; //1234567890123456 加码

            wx.invoke('configWXDeviceWiFi', {
                key: key
            }, function (res) {
                wx.closeWindow();
            });
        } else {
            wx.invoke('configWXDeviceWiFi', {}, function (res) {
                wx.closeWindow();
            });
        }
    }

    //从后台获取加码
    function getMessage(s) {

        var result = "";
        $.ajax({
            type: "Get",
            url: "../encode.do?sourceString=" + s,
            async: false,
            cache: false,
            success: function (msg) {
                result = msg;
            }
        });

        return result;
    }
}(jQuery, window);