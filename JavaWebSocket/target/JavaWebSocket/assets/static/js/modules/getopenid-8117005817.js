/**
 * Created by lixinwei on 16/8/8.
 */

!function ($, win, undefined) {
    "use strict";

    var setUrl = {
        /**
         * 将URL中的参数解析为对象
         * @param  {String} url 解析的URL字符串
         * @return {Object}     返回结果
         */
        parse: function (url) {
            var re = /[\?&]([^\?&=]+)=([^&]+)/g,
                matcher = null,
                items = {};

            url = url || window.location.search;

            while (null != (matcher = re.exec(url))) {
                items[matcher[1]] = decodeURIComponent(matcher[2]);
            }

            return items;
        },
        /**
         * 获取URL中指定参数值
         * @param  {String} name 指定参数名
         * @param  {String} url  指定URL，可靠默认为当前URL
         * @return {String}      返回指定参数名值
         */
        get: function (name, url) {
            var o = this.parse(url);

            return o[name] ? o[name] : '';
        },
        check: function (url) {
            var reg = /^https?:\/\/[a-z]+\.fenqile\.com\//i,
                ret = true;

            if (/^https?/.test(url)) {
                ret = reg.test(url);
            }
            return ret;
        }
    };

    //设置cookie
    function setCookie(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    }

    //取回cookie
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

    // 删除
    function clearCookie(name) {
        setCookie(c_name, "", -1);
    }

    var pageUrl = window.location.href;
    var _url = location.href.split('#')[0];
    var openUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + window.juli.appid + "&redirect_uri=" + _url + "&response_type=code&scope=snsapi_base#wechat_redirect";

    var wxcode = setUrl.get('code', pageUrl);
    window.openId = '';
    window.deviceId = '';

    if (sessionStorage.getItem(juli.openIdkey) === '' || sessionStorage.getItem(juli.openIdkey) === null) {
        getOpenId(juli.URL.codeid, wxcode);
    }

    function getOpenId(_ajaxUrl, _code) {
        if (LOCAL_TEST) {
            sessionStorage.setItem(juli.openIdkey, "1234567890");
            setCookie(juli.openIdkey, "1234567890", 30);
            utils.openid = "1234567890";
            window.openId = "1234567890";
            return;
        }

        $.ajax({
            url: _ajaxUrl,
            type: 'GET',
            dataType: 'json',
            async: false,
            data: {
                code: _code
            }
        }).done(function (res) {
            console.log(res);
            if (res.error === '0') {
                window.location.href = openUrl;
            } else {
                sessionStorage.setItem(juli.openIdkey, res.openid);
                setCookie(juli.openIdkey, res.openid, 30);
                utils.openid = res.openid;

                window.openId = res.openid;
                //getDeviceId(res.openid);
            }
        }).fail(function () {
            console.log("error");
        });
    }

    // var localOpenid = sessionStorage.getItem('openId');
    // console.log(getDeviceId(localOpenid));

    window.getDeviceId = function getDeviceId() {
        var _opId = '';

        if (sessionStorage.getItem(juli.openIdkey) === '' || sessionStorage.getItem(juli.openIdkey) === null) {
            _opId = getCookie(juli.openIdkey);
        } else {
            _opId = sessionStorage.getItem(juli.openIdkey);
        }

        console.log(_opId);

        $.ajax({
            url: juli.URL.getdevice,
            type: 'GET',
            dataType: 'html',
            async: false,
            data: {
                openId: _opId
            }
        }).done(function (res) {
            window.deviceId = res;
            if (window.deviceId === '' || window.deviceId === undefined) {
                window.location.href = 'doscaninfo.html';
            }
        }).fail(function () {
            console.log("error");
        });
    };
}(jQuery, window);