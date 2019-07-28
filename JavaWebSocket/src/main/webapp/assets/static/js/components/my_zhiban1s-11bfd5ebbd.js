/**
 * @description: 炬力公众号
 * @author: 李宝君  coolli2@163.com
 * @version: V1
 * @update: 16/8/1
 */

//这些方法需要放到window下
function onConnectCallback() {
    //获取设备信息，设置页面中的文字信息
    console.log("hahah，链接啦！");
    queryTrack();
    queryPlayStatus();
    queryMode();
    cmd_getVolume();
}

//拿到播放状态后设置页面
function playStatus_change(playStatus) {
    //playing pause
    console.log(playStatus);
    if (playStatus == "playing") {
        myvm.isplay = true;
    } else {
        myvm.isplay = false;
    }
}

//拿到当前播放的资源后设置页面
function playTrack_change(trackListId, trackId, type) {
    myvm.tracklistid = trackListId;
    if (trackId == -1) {
        myvm.music = " ";
    } else {
        myvm.getsingle(trackId);
    }
}

//播放模式改变
function mode_change(mode) {
    //repeat one，repeat all
    var _self = myvm;
    console.log(mode);
    if (mode == "repeat all") {
        _self.isloop = true;
        if ($('.play-component').hasClass('play-show')) $.toast("当前循环模式为:全部循环~", "text");
    } else {
        _self.isloop = false;
        if ($('.play-component').hasClass('play-show')) $.toast("当前循环模式为:单曲循环~", "text");
    }
}

//当前是否在线情况的改变
function onlineStatus_change(onlineStatus) {
    if (onlineStatus == "on" || onlineStatus == "online" || onlineStatus == "on-upgrade-failed") {
        console.log("isonline true");
        myvm.deviceOnline = true;
    } else {
        myvm.deviceOnline = false;
        if (DEBUG === "zhiban") $.toast("机器人断网了哦~", "text");else $.toast("机器人断网了哦~", "text");
        return false;
    }
}

//当前音量
function currentVolumeDisplay(volume) {
    console.log("currentVolumeDisplay callback: " + volume);
    var percent = Math.round(volume / 40 * 100);
    myvm.getVolume(percent);
    $sliderTrackVolume.css('width', percent + '%');
    $sliderHandlerVolume.css('left', percent + '%');
}

//当前播放进度
function onCustomerPlayProgress(playProgress) {
    myvm.getProgress(playProgress);
}

/**
my.js 我的页面 js里的方法列表

1 显示设备的播放列表

2 跳转到列表详情页

3 拿到我的收藏数

5 拿到点播历史数

*/

myvm = new Vue({
    el: 'html',
    data: {
        loading: true,
        fav: "",
        history: "",
        playlist: "",
        deviceOnline: true,
        masked: false,
        playtracklist: "",
        isplay: false,
        playtracklisthandle: "",
        imghost: "http://dwn.roo.bo/appimg/",
        islike: false,
        isloop: false,
        music: "",
        tracklistid: -1,
        currentdata: "",
        sec: "",
        favlist: "", //收藏列表数据
        audio: "0",
        progresspercent: 0,
        progress: 0,
        currentprogress: "00:00",
        interval: "",
        playerimg: "static/img/demo.jpg"
    },
    ready: function () {
        //this.getdevice();
        utils.settitle("宝贝");
        this.getfav();
        this.gethistory();
        utils.gettrackList();
        this.getplaytracklist();
        this.isOnline();
        this.getdeviceinfo();
    },

    computed: {
        babateng: function () {
            return DEBUG == "babateng" || DEBUG == "dev";
        },
        mingxiao: function () {
            return DEBUG == "mingxiao_build";
        },
        zhiban: function () {
            return DEBUG == "zhiban";
        },
        yuandao: function () {
            return DEBUG == "yuandao";
        },
        youze: function () {
            return DEBUG == "youze";
        },
        orange: function () {
            return DEBUG == "orange";
        },
        zhiban: function () {
            return DEBUG == "zhiban";
        },
        title: function () {
            if (this.babateng) {
                return "阿零";
            } else if (this.mingxiao) {
                return "本地内容";
            } else if (this.orange) {
                return "小桔灯";
            } else if (this.yuandao) {
                return "原道小V";
            } else if (this.zhiban) {
                return "智能1S";
            } else {
                return "我的";
            }
        },

        favname: function () {
            if (this.babateng) {
                return "家长最爱";
            } else if (this.mingxiao) {
                return "我的收藏";
            } else {
                return "收藏";
            }
        },
        name: function () {
            if (this.babateng) {
                return "设备设置";
            } else if (this.zhiban) {
                return "智能智能机器人";
            } else if (this.mingxiao) {
                return "机器人设置";
            } else if (this.youze) {
                return "机器人设置";
            } else if (this.yuandao) {
                return "原道早教机";
            } else if (this.orange) {
                return "小桔灯设置";
            } else {
                return "机器人";
            }
        },

        listname: function () {
            if (this.babateng) {
                return "播放列表";
            } else if (this.mingxiao) {
                return "本地目录";
            }
        },
        historyLength: function () {
            return this.history.length + " 首";
        },
        favLength: function () {
            return this.fav.length + " 首";
        },
        device_tips: function () {
            if (this.deviceOnline) {
                if (this.isplay) return this.music;else return "设备已连接";
            } else return "设备未连接";
        }
    },

    methods: {
        getdevice: function () {
            //判断是否绑定设备
            //如果没有绑定设备--提示并返回
            if (!utils.getdevice()) {
                window.location.href = 'doscaninfo.html';
            }
        },
        getplaytracklist: function () {
            //显示设备的播放列表
            var _self = this;
            _self.playtracklist = utils.gettrackList();
            console.log(_self.playtracklist);
            this.addinfo();
            this.loading = false;
        },
        linklist: function (item) {
            //跳转到列表页
            location.href = "mylist.html?id=" + item.id;
        },
        getfav: function () {
            //拿到我的收藏数
            var _self = this;
            $.ajax({
                url: juli.URL.getlike,
                type: 'get',
                dataType: 'json',
                cache: false,
                data: {
                    openId: utils.openid
                }
            }).done(function (res) {
                console.log(res);
                _self.fav = res;
            });
        },
        gethistory: function () {
            //拿到点播历史数
            var _self = this;
            $.ajax({
                url: juli.URL.gethistory,
                type: 'get',
                dataType: 'json',
                cache: false,
                data: {
                    openId: utils.openid
                }
            }).done(function (res) {
                console.log(res);
                _self.history = res;
            });
        },
        isOnline: function () {
            var _self = this;
            if (!utils.online()) {
                _self.deviceOnline = false;
            } else {
                _self.deviceOnline = true;
            }
        },
        pause: function () {
            //暂停-儿童馆
            var _self = this;
            //如果机器人不在线--则提示并返回
            if (!_self.deviceOnline) {
                utils.showOfflineToast();
                return false;
            }

            pauseTrack();
            _self.isplay = false;
        },

        resume: function () {
            //恢复播放
            var _self = this;
            //如果机器人不在线--则提示并返回
            if (!_self.deviceOnline) {
                utils.showOfflineToast();
                return false;
            }
            resumeTrack();
            _self.isplay = true;
        },
        repeatone: function () {
            //发单曲循环消息
            var _self = this;
            //如果机器人不在线--则提示并返回
            if (!_self.deviceOnline) {
                utils.showOfflineToast();
                return false;
            }
            setRepeatone();
            this.isloop = false;
        },
        repeatall: function () {
            //发全部循环消息
            var _self = this;
            //如果机器人不在线--则提示并返回
            if (!_self.deviceOnline) {
                utils.showOfflineToast();
                return false;
            }
            setRepeatall();
            this.isloop = true;
        },
        forward: function () {
            //下一首
            var _self = this;
            //如果机器人不在线--则提示并返回
            if (!_self.deviceOnline) {
                utils.showOfflineToast();
                return false;
            }
            forwardTrack();
        },
        backward: function () {
            //上一首
            var _self = this;
            //如果机器人不在线--则提示并返回
            if (!_self.deviceOnline) {
                utils.showOfflineToast();
                return false;
            }
            backwardTrack();
        },
        showlist: function () {
            var _self = this;
            //如果机器人不在线--则提示并返回
            if (!_self.deviceOnline) {
                utils.showOfflineToast();
                return false;
            }
            if (_self.tracklistid == -1) {
                $.toast("当前无播放列表", "text");
                return false;
            } else {
                location.href = "mylist.html?id=" + _self.tracklistid;
            }
        },
        getsingle: function (id) {
            //根据查到歌曲信息
            var _self = this;
            utils.getfav(this);
            $.ajax({
                url: juli.URL.singleview + "?trackId=" + id,
                type: 'get',
                dataType: 'json',
                cache: false
            }).done(function (res) {
                console.log(res);
                if (!res) {
                    $.alert("已经没有更多歌曲了哦~", "", function () {
                        return false;
                    });
                };
                if (this.interval != "") {
                    clearInterval(this.interval);
                    this.interval = "";
                }

                _self.currentdata = res;
                _self.music = _self.currentdata.title; //_self.currentdata.name;
                _self.sec = _self.formatSeconds(_self.currentdata.duration); //utils.formatSeconds(_self.currentdata.length);
                _self.islike = false;
                if (_self.currentdata.coverSmallUrl != null && _self.currentdata.coverSmallUrl != "") {
                    playerimg = _self.currentdata.coverSmallUrl;
                } else if (_self.currentdata.albumCoverSmallUrl != null && _self.currentdata.albumCoverSmallUrl != "") {
                    playerimg = _self.currentdata.albumCoverSmallUrl;
                } else {
                    playerimg = "static/img/demo.jpg";
                }

                cmd_customer_getPlayProgress();

                //将数据与收藏列表元素逐个比对，如果已经存在于收藏列表，则标记为已经收藏
                _self.favlist.forEach(function (value, index, array) {
                    if (res.id == value.trackId) {
                        _self.islike = true;
                    }
                });
            });
        },
        addfav: function () {
            //添加收藏
            //如果没有绑定设备--提示并返回
            if (!utils.getdevice()) {
                // alert("您还没有绑定设备，请去绑定设备！");
                $.alert("您还没有绑定设备，请去绑定设备！", "", function () {
                    // 回调
                });
                return false;
            }
            var _self = this;
            var json = {
                openId: utils.openid,
                trackId: _self.currentdata.id,
                title: _self.currentdata.title, //_self.currentdata.name,
                duration: _self.currentdata.duration, //_self.currentdata.length,
                url: _self.currentdata.url, //_self.currentdata.content,
                downloadUrl: _self.currentdata.downloadUrl, //_self.currentdata.content,
                downloadSize: _self.currentdata.size
            };
            $.ajax({
                url: juli.URL.addlike,
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(json)
            }).done(function (res) {
                $.toast("已添加收藏", "text");
                _self.islike = true;
            });
        },
        dellike: function () {
            //删除收藏
            var _self = this;
            var deldata = {
                trackId: _self.currentdata.id,
                openId: utils.openid
            };
            $.ajax({
                url: juli.URL.dellike,
                type: 'post',
                cache: false,
                async: false,
                contentType: 'application/json',
                data: JSON.stringify(deldata)
            }).done(function (res) {
                console.log(res);
                // alert("删除收藏");
                $.toast("删除收藏", "text");
                _self.islike = false;
            });
        },
        addinfo: function () {
            this.playtracklisthandle = [];
            for (var i = 0; i < this.playtracklist.length; i++) {
                var item = this.playtracklist[i];
                if (item.coverSmallUrl == null) {
                    item.coverSmallUrl = "static/img/icon/category-music-icon.jpg";
                } else {
                    item.coverSmallUrl = this.imghost + item.coverSmallUrl;
                }
                if (item.name.indexOf("英语") !== -1) {
                    item.coverSmallUrl = "static/img/icon/category-english-icon.jpg";
                } else if (item.name.indexOf("国学") !== -1) {
                    item.coverSmallUrl = "static/img/icon/category-chinese-icon.jpg";
                } else if (item.name.indexOf("故事") !== -1) {
                    item.coverSmallUrl = "static/img/icon/category-story-icon.jpg";
                } else if (item.name.indexOf("儿歌") !== -1) {
                    item.coverSmallUrl = "static/img/icon/category-music-icon.jpg";
                }
                item.trackCount = item.trackCount + " 首";
                this.playtracklisthandle.push(item);
            }
            console.log("playtracklisthandle");
            console.log(this.playtracklisthandle);
        },
        setVolume: function () {
            cmd_setvolume(Math.round(this.audio * 40 / 100));
            //cmd_getVolume(); //同步其他设备音量信息,当设置为51%时，设置过去的是音量是20，会导致重新获取的为50%，所以不同步刷新
            console.log("volume: " + Math.round(this.audio * 40 / 100) + " percent: " + this.audio);
        },
        getVolume: function (volume) {
            this.audio = volume;
            console.log("getVolume: " + this.audio);
        },
        getdeviceinfo: function () {
            //与设备建立连接--首先要判断机器人是否在线--是否连接
            var _self = this;
            /*
                        //如果机器人不在线--则提示并返回
                        if (!_self.deviceOnline) {
                            return false;
                        }*/
            clientCreate(onConnectCallback); //与设备建立连接
        },
        getProgress: function (progress) {
            if (progress >= this.currentdata.duration) {
                progress = this.currentdata.duration;
            }
            if (this.interval != "" && Math.abs(progress - this.progress) <= 2) {
                return false;
            }
            if (typeof this.currentdata.duration != "undefined") {
                this.progress = progress;
                this.progresspercent = this.progress / this.currentdata.duration * 100;
                this.currentprogress = this.formatSeconds(this.progress);
                console.log("getProgress: " + this.progress);
                $sliderTrack.css('width', this.progresspercent + '%');
                $sliderHandler.css('left', this.progresspercent + '%');
                if (this.interval != "") {
                    clearInterval(this.interval);
                    this.interval = "";
                }
                this.interval = setInterval(this.progressIncrease, 1000);
            }
        },
        getProgressPercent: function (percent) {
            if (typeof this.currentdata.duration != "undefined") {
                this.progresspercent = percent;
                this.progress = this.progresspercent / 100 * this.currentdata.duration;
                this.currentprogress = this.formatSeconds(Math.round(this.progress));
                console.log("getProgressPercent: " + this.progresspercent);
            }
        },
        setProgress: function () {
            cmd_customer_seekTrack(Math.round(this.progress));
            setTimeout(cmd_customer_getPlayProgress, 1000);
        },
        progressIncrease: function () {
            if (this.isplay) {
                if (this.progress >= this.currentdata.duration || this.progresspercent >= 100) {
                    clearInterval(this.interval);
                    this.interval = "";
                    return false;
                } else {
                    this.progress++;
                    this.progresspercent = this.progress / this.currentdata.duration * 100;
                    this.currentprogress = this.formatSeconds(Math.floor(this.progress));
                    $sliderTrack.css('width', this.progresspercent + '%');
                    $sliderHandler.css('left', this.progresspercent + '%');
                }
            }
        },
        formatSeconds: function (value) {
            //时间戳格式化
            var theTime = parseInt(value); // 秒
            var theTime1 = 0; // 分
            var theTime2 = 0; // 小时
            if (theTime >= 60) {
                theTime1 = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
                if (theTime1 >= 60) {
                    theTime2 = parseInt(theTime1 / 60);
                    theTime1 = parseInt(theTime1 % 60);
                }
            }
            var result = "00:" + ("0" + parseInt(theTime)).slice(-2);
            if (theTime1 > 0) {
                result = ("0" + parseInt(theTime1)).slice(-2) + ":" + ("0" + parseInt(theTime)).slice(-2);
            }
            if (theTime2 > 0) {
                result = ("0" + parseInt(theTime2)).slice(-2) + ":" + ("0" + parseInt(theTime1)).slice(-2) + ":" + ("0" + parseInt(theTime)).slice(-2);
            }
            return result;
        }
    }
});

$(function () {
    $('.play-bar').click(function () {
        if (myvm.deviceOnline) {
            $('.play-component').addClass('play-show');
        } else {
            utils.showOfflineToast();
            return false;
        }
    });

    $('#play-component .close').click(function () {
        $('.play-component').removeClass('play-show');
    });
    setTimeout("getDeviceId()", 200);
});

var $sliderTrack = $('#sliderTrack'),
    $sliderHandler = $('#sliderHandler');

var totalLen = $('#sliderInner').width(),
    startLeft = 0,
    startX = 0;

$('#sliderInner').on('click', function (e) {
    totalLen = $('#sliderInner').width();
    var left = e.originalEvent.offsetX;
    var percent = parseInt(left / totalLen * 100);
    $sliderTrack.css('width', percent + '%');
    $sliderHandler.css('left', percent + '%');

    myvm.getProgressPercent(percent);
    myvm.setProgress();
});

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

    myvm.getProgressPercent(percent);
    e.preventDefault();
}).on('touchend', function (e) {
    myvm.setProgress();
});

var $sliderTrackVolume = $('#sliderTrackVolume'),
    $sliderHandlerVolume = $('#sliderHandlerVolume');

var totalLenVolume = $('#sliderInnerVolume').width(),
    startLeftVolume = 0,
    startXVolume = 0;

$('#sliderInnerVolume').on('click', function (e) {
    totalLenVolume = $('#sliderInnerVolume').width();
    var left = e.originalEvent.offsetX;
    var percent = parseInt(left / totalLenVolume * 100);
    $sliderTrackVolume.css('width', percent + '%');
    $sliderHandlerVolume.css('left', percent + '%');

    myvm.getVolume(percent);
    myvm.setVolume();
});

$sliderTrackVolume.on('touchstart', function (e) {
    console.log(e.originalEvent);
    totalLenVolume = $('#sliderInnerVolume').width();
    startLeftVolume = parseInt($sliderHandlerVolume.css('left'));
    startXVolume = e.originalEvent.changedTouches[0].clientX;
}).on('touchmove', function (e) {
    var dist = startLeftVolume + e.originalEvent.changedTouches[0].clientX - startXVolume,
        percent;
    dist = dist < 0 ? 0 : dist > totalLenVolume ? totalLenVolume : dist;
    percent = parseInt(dist / totalLenVolume * 100);
    $sliderTrackVolume.css('width', percent + '%');
    $sliderHandlerVolume.css('left', percent + '%');

    myvm.getVolume(percent);

    e.preventDefault();
}).on('touchend', function (e) {
    myvm.setVolume();
});

$('#minvolume').on('click', function (e) {
    $sliderTrackVolume.css('width', 0 + '%');
    $sliderHandlerVolume.css('left', 0 + '%');
    myvm.getVolume(0);
    myvm.setVolume();
});

$('#maxvolume').on('click', function (e) {
    $sliderTrackVolume.css('width', 100 + '%');
    $sliderHandlerVolume.css('left', 100 + '%');
    myvm.getVolume(100);
    myvm.setVolume();
});