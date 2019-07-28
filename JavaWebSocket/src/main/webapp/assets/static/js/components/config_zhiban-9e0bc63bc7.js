/**
 * @description: 炬力公众号
 * @author: 李宝君  coolli2@163.com
 * @version: V1
 * @update: 16/8/1
 */

configvm = new Vue({
    el: 'html',
    data: {
        members: "",
        isadmin: "",
        isupdate: "",
        firmware: "",
        loading: true,
        electri: "",
        babylock: false,
        audio: "0",
        light: 1,
        shutdown: "",
        isonline: false
    },
    computed: {
        babateng: function () {
            return DEBUG == "babateng" || DEBUG == "dev";
        },
        mingxiao: function () {
            return DEBUG == "mingxiao_build";
        },
        orange: function () {
            return DEBUG == "orange";
        },
        yuandao: function () {
            return DEBUG == "yuandao";
        },
        youze: function () {
            return DEBUG == "youze";
        },
        zhiban: function () {
            return DEBUG === "zhiban";
        },
        name: function () {
            if (this.babateng) {
                return "关于阿零";
            } else if (this.mingxiao) {
                return "关于机器人";
            } else if (this.youze) {
                return "关于机器人";
            } else if (this.orange) {
                return "设备信息";
            } else if (this.yuandao) {
                return "设备信息";
            } else if (this.zhiban) {
                return "关于机器人";
            } else {
                return "关于机器人";
            }
        },

        config_title: function () {
            if (this.mingxiao) {
                return "机器人设置";
            } else if (this.orange) {
                return "小桔灯设置";
            } else if (this.yuandao) {
                return "早教机设置";
            } else {
                return "机器人设置";
            }
        },

        isadmin: function () {
            //我是否是管理员
            var adminopenid;
            $.each(this.members, function (i, n) {
                if (n.admin) {
                    adminopenid = n.openId;
                }
            });
            if (utils.openid === adminopenid) {
                return true;
            } else {
                return false;
            }
        },

        totalmembers: function () {
            return this.members.length + "人";
        },

        babylock_title: function () {
            if (this.babylock) {
                return "儿童锁已开启";
            } else {
                return "儿童锁已关闭";
            }
        },

        getAudio: function () {
            return this.audio + "%";
        },

        getAudioNumber: function () {
            return this.audio;
        },

        light_title: function () {
            if (this.light == 1) {
                return "呼吸灯已开启";
            } else {
                return "呼吸灯已关闭";
            }
        }
    },
    ready: function () {
        getBoxInfo();
        this.getmembers();
        this.getinfo();
        clientCreate(onConnectCallback);
    },
    methods: {
        getmembers: function () {
            //取得家庭成员列表
            var _self = this;
            $.ajax({
                url: juli.URL.getmember,
                type: 'get',
                dataType: 'json',
                cache: false,
                async: false,
                data: {
                    deviceId: utils.getdevice()
                }
            }).done(function (res) {
                console.log(res);
                $.each(res, function (i, n) {
                    if (n.openId === utils.openid) {
                        n.self = true;
                    }
                });
                _self.loading = false;
                _self.members = res;
            });
        },
        quit: function (item) {
            //非管理员自己退出
            var _self = this;
            //非管理员只能对自己退出，先判断是否是自己，如果不是自己则退出
            if (item.openId != utils.openid) {
                return false;
            }
            $.confirm("您确定退出该微信群吗？", function () {
                //点击确认后的回调函数
                _self.quitfun();
            }, function () {
                //点击取消后的回调函数
                return false;
            });
        },
        quitfun: function () {
            var _self = this;
            var json = {
                openId: utils.openid,
                admin: false
            };
            $.ajax({
                url: juli.URL.quit + "?byAdmin=false",
                type: 'post',
                cache: false,
                async: false,
                contentType: 'application/json',
                data: JSON.stringify(json)
            }).done(function (res) {
                console.log(res);
                if (res == "ok") {
                    $.toast("删除成功", "text");
                } else {
                    $.toast("删除失败", "text");
                }
                _self.getmembers();
                //如果没有绑定设备，则退出页面到微信中
                if (!utils.getdevice()) {
                    wx.ready(function () {
                        wx.closeWindow();
                    });
                }
            });
        },
        quitbyadmin: function (item) {
            //管理员自己退出以及删除他人
            var _self = this;
            //管理员自己退出提示
            if (item.openId == utils.openid) {
                $.confirm("您是管理员，退出后该群会自动解散，你确定吗？", function () {
                    //点击确认后的回调函数
                    _self.quitbyadminfuc(item);
                }, function () {
                    //点击取消后的回调函数
                    return false;
                });
            }
            //删除他人提示
            else {
                    $.confirm("您确定删除" + item.nickname + "?", function () {
                        //点击确认后的回调函数
                        _self.quitbyadminfuc(item);
                    }, function () {
                        //点击取消后的回调函数
                        return false;
                    });
                }
        },
        quitbyadminfuc: function (item) {
            var _self = this;
            var json = {
                openId: item.openId,
                admin: true
            };
            $.ajax({
                url: juli.URL.quit + "?byAdmin=true",
                type: 'post',
                cache: false,
                async: false,
                contentType: 'application/json',
                data: JSON.stringify(json)
            }).done(function (res) {
                console.log(res);
                if (res == "ok") {
                    $.toast("删除成功", "text");
                } else {
                    $.toast("删除失败", "text");
                }
                _self.getmembers();
                //如果没有绑定设备，则退出页面到微信中
                if (!utils.getdevice()) {
                    wx.ready(function () {
                        wx.closeWindow();
                    });
                }
            });
        },
        toCloseMech: function (idDiv) {
            $(idDiv).show();
        },
        tohideDivSet: function (idDiv) {
            $(idDiv).hide();
        },
        onListenBabylock: function (idDiv) {
            if (this.babylock) {
                cmd_customer_setChildlock(0);
                cmd_customer_getChildlock();
                this.babylock = false;
            } else {
                this.toCloseMech(idDiv);
                this.babylock = true;
            }
        },
        toConfirmBabylock: function (idDiv) {
            this.tohideDivSet(idDiv);
            cmd_customer_setChildlock(1);
            cmd_customer_getChildlock();
            this.babylock = true;
        },
        toCanvelBabylock: function (idDiv) {
            this.tohideDivSet(idDiv);
            this.babylock = false;
        },
        onListenLight: function () {
            if (this.light) {
                console.log("light 1");
                cmd_customer_setLight(0);
                cmd_customer_getLight();
                this.light = false;
            } else {
                console.log("light 0");
                cmd_customer_setLight(1);
                cmd_customer_getLight();
                this.light = true;
            }
        },
        toCloseMechCou: function (idDiv) {
            var _self = this;
            $(idDiv).show();
        },
        setVolume: function (idDiv) {
            this.tohideDivSet(idDiv);
            cmd_setvolume(Math.round(this.audio * 40 / 100));
            //cmd_getVolume(); //同步其他设备音量信息,当设置为51%时，设置过去的是音量是20，会导致重新获取的为50%，所以不同步刷新
            console.log("volume: " + Math.round(this.audio * 40 / 100) + " percent: " + this.audio);
        },
        getinfo: function () {
            var _self = this;
            if (!utils.online()) {
                if (DEBUG === "zhiban") _self.electri = "机器人不在线！";else _self.electri = "机器人不在线！";
                _self.isonline = false;
                return "";
            }
            $.ajax({
                url: juli.URL.getinfo,
                type: 'get',
                async: false,
                cache: false,
                data: {
                    deviceId: utils.getdevice()
                }
            }).done(function (res) {
                console.log(res);
                if (res.electricity > 100) {
                    res.electricity = '正在充电';
                } else {
                    res.electricity = res.electricity + '%';
                }
                _self.electri = res.electricity;
            });
        },
        //改变界面显示状态外部调用函数
        getBabylock: function (state) {
            this.babylock = state;
            console.log("getBabylock: " + this.babylock);
        },
        getVolume: function (volume) {
            this.audio = volume;
            console.log("getVolume: " + this.audio);
        },
        getLight: function (state) {
            this.light = state;
            console.log("getLight: " + this.light);
        },
        getPoweroff: function (time) {
            if (time == 0) {
                this.shutdown = "取消定时";
            } else if (time == -1) {
                this.shutdown = "立即关机";
            } else {
                this.shutdown = time + "分钟";
            }
            console.log("getPoweroff: " + this.shutdown);
        },

        shutdown: function () {
            return shutdown;
        }

    }
});

//定时关机弹出层
var timelist = [{
    text: '取消定时',
    value: 1
}, {
    text: '立即关机',
    value: 2
}, {
    text: '10分钟',
    value: 3
}, {
    text: '20分钟',
    value: 4
}, {
    text: '30分钟',
    value: 5
}, {
    text: '60分钟',
    value: 6
}, {
    text: '90分钟',
    value: 7
}, {
    text: '120分钟',
    value: 8
}];

function time2Index(time) {
    var index = 0;
    switch (time) {
        case 0:
            index = 0;
            break;
        case -1:
            index = 1;
            break;
        case 10:
            index = 2;
            break;
        case 20:
            index = 3;
            break;
        case 30:
            index = 4;
            break;
        case 60:
            index = 5;
            break;
        case 90:
            index = 6;
            break;
        case 120:
            index = 7;
            break;
    }
    return index;
}

var picker = new Picker({
    data: [timelist],
    selectedIndex: [0]
});

function setTimeList(selectedIndex) {
    console.log(timelist[selectedIndex[0]].text);
    var va = timelist[selectedIndex[0]].text;
    if (va == "取消定时") {
        cmd_customer_setPoweroff(0);
        configvm.getPoweroff(0);
    } else if (va == "立即关机") {
        cmd_customer_setPoweroff(-1);
        configvm.getPoweroff(-1);
    } else {
        var time = parseInt(va.split("分钟")[0]);
        cmd_customer_setPoweroff(time);
        configvm.getPoweroff(time);
    }
    cmd_customer_getPoweroff();
}

picker.on('picker.select', function (selectedVal, selectedIndex) {
    setTimeList(selectedIndex);
});

picker.on('picker.change', function (index, selectedIndex) {});

picker.on('picker.valuechange', function (selectedVal, selectedIndex) {});

function initPicker(index) {
    console.log("initPicker: " + index);
    var indexs = [index];
    picker.setSelected(indexs);
}

function showPicker() {
    //界面显示与弹出窗口保持一致
    var indexs = [0];
    for (var i = 0; i < timelist.length; i++) {
        //console.log(timelist[i]);
        if (configvm.shutdown == timelist[i].text) {
            indexs = [timelist[i].value - 1];
            break;
        }
    }
    console.log(configvm.shutdown + ": index: " + indexs);
    picker.setSelected(indexs);
    picker.show();
}

//音量弹出层
var $sliderTrack = $('#sliderTrack'),
    $sliderHandler = $('#sliderHandler'),
    $sliderValue = $('#sliderValue');

var totalLen = $('#sliderInner').width(),
    startLeft = 0,
    startX = 0;

$sliderTrack.css('width', configvm.getAudioNumber + '%');
$sliderHandler.css('left', configvm.getAudioNumber + '%');

$sliderHandler.on('touchstart', function (e) {
    console.log(e.originalEvent);
    totalLen = $('#sliderInner').width();
    startLeft = parseInt($sliderHandler.css('left'));
    startX = e.originalEvent.changedTouches[0].clientX;
}).on('touchmove', function (e) {
    var dist = startLeft + e.originalEvent.changedTouches[0].clientX - startX,
        percent;
    dist = dist < 0 ? 0 : dist > totalLen ? totalLen : dist;
    percent = parseInt(dist / totalLen * 100);
    $sliderTrack.css('width', percent + '%');
    $sliderHandler.css('left', percent + '%');
    $sliderValue.text(percent + '%');

    configvm.getVolume(percent);

    e.preventDefault();
});

//mqtt 回调函数实现
function onConnectCallback() {
    //获取设备信息，设置页面中的文字信息
    console.log("config 链接啦！");
    cmd_customer_getChildlock();
    cmd_getVolume();
    cmd_customer_getLight();
    cmd_customer_getPoweroff();
}

function showBoxInfo(info) {
    console.log("showBoxInfo callback: " + info);
}

function onCustomerChildlock(state) {
    console.log("onCustomerChildlock callback: " + state);
    configvm.getBabylock(state);
}

function currentVolumeDisplay(volume) {
    console.log("currentVolumeDisplay callback: " + volume);
    var percent = Math.round(volume / 40 * 100);
    configvm.getVolume(percent);
    $sliderTrack.css('width', percent + '%');
    $sliderHandler.css('left', percent + '%');
    $sliderValue.text(percent + '%');
}

function onCustomerLight(state) {
    console.log("onCustomerLight callback: " + state);
    configvm.getLight(state);
}

function onCustomerPoweroff(time) {
    console.log("onCustomerPoweroff callback: " + time);
    configvm.getPoweroff(time);
    var index = time2Index(time);
    initPicker(index);
}

//儿童锁，音量，定时关机弹出窗口点击窗口以外地方，隐藏弹出设置
$(".uc-center").bind("mouseup touchend", function (e) {
    var _con;
    if ($(".childlock").css("display") != "none") {
        _con = $('.lockshow'); // 设置目标区域 
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            // Mark 1  
            $("#babylock").hide();
            configvm.getBabylock(0);
            e.preventDefault();
        }
    }

    if ($(".volumesetting").css("display") != "none") {
        _con = $('.volumeshow'); // 设置目标区域 
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            // Mark 1  
            $("#volumesetting").hide();
            configvm.setVolume('#volumesetting');
            //cmd_getVolume(); //同步其他设备音量信息
            e.preventDefault();
        }
    }

    if ($(".picker").css("display") != "none") {
        _con = $('.picker-panel'); // 设置目标区域 
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            // Mark 1  
            picker.confirmClick();
            e.preventDefault();
        }
    }
});