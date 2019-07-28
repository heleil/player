/**
 * @description: 炬力公众�?
 * @author: 李宝�? coolli2@163.com
 * @version: V1
 * @update: 16/8/1
 */

/**
 *
 * @name    cfgcenter.js
 * @param   {String}    名称
 * @param   {Function}  方法
 */

//这些方法需要放到window下
function onConnectCallback() {
    //获取设备信息，设置页面中的文字信息
    // console.log("hahah，链接啦！")
    queryTrack();
    queryPlayStatus();
    queryMode();
    cmd_getVolume();
}

//拿到播放状态后设置页面
function playStatus_change(playStatus) {
    //playing pause
    // console.log(playStatus);
    if (playStatus == "playing") {
        listvm.isplay = true;
    } else {
        listvm.isplay = false;
    }
}

//拿到当前播放的资源后设置页面
function playTrack_change(trackListId, trackId, type) {
    listvm.tracklistid = trackListId;
    if (trackId == -1) {
        // listvm.music = "当前无正在播放歌曲~";
        listvm.music = " ";
    } else {
        listvm.getsingle(trackId);
    }
}

//播放模式改变
function mode_change(mode) {
    //repeat one，repeat all
    var _self = listvm;
    // console.log(mode);
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
        // console.log("deviceOnline true");
        listvm.deviceOnline = true;
    } else {
        listvm.deviceOnline = false;
        if (DEBUG === "zhiban") $.toast("机器人断网了哦~", "text");else $.toast("故事机断网了哦~", "text");
        return false;
    }
}

//当前音量
function currentVolumeDisplay(volume) {
    // console.log("currentVolumeDisplay callback: " + volume);
    var percent = Math.round(volume / 40 * 100);
    if (utils.getClientId().substring(0, 6) == "302004") {
        percent = Math.round(volume / 33 * 100);
    }
    listvm.getVolume(percent);
    $sliderTrackVolume.css('width', percent + '%');
    $sliderHandlerVolume.css('left', percent + '%');
}

//当前播放进度
function onCustomerPlayProgress(playProgress) {
    listvm.getProgress(playProgress);
}

var listvm = new Vue({
    el: 'html',
    data: {
        loading: true,
        list: "",
        input: "",
        times: "",
        learning: "",
        newests: "",
        chinese: "",
        cnindexs: [],
        english: "",
        enindexs: [],
        /*     recommendations: "",
             xiaobincontents:"",
             studycontents:"",*/
        contents: [],
        imghost: "http://dwn.roo.bo/appimg/",
        deviceOnline: false,
        music: "",
        isplay: false,
        isloop: false,
        islike: false,
        tracklistid: -1,
        currentdata: "",
        sec: "",
        favlist: "", //收藏列表数据
        audio: "0",
        progresspercent: 0,
        progress: 0,
        currentprogress: "00:00",
        interval: "",
        playerimg: "static/img/demo.jpg",
        scroolinit: 0
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
        zhiban: function () {
            return DEBUG == "zhiban";
        },
        title: function () {
            if (this.babateng) {
                return "故事云";
            } else if (this.mingxiao) {
                return "云端内容";
            } else if (this.orange) {
                return "故事云";
            } else if (this.zhiban) {
                return "百宝袋";
            } else {
                return "儿童馆";
            }
        },
        device_tips: function () {
            if (this.deviceOnline) {
                if (this.isplay) return this.music;else return "设备已连接";
            } else return "设备未连接";
        }
    },
    watch: {
        "scroolinit": function (val) {
            var _self = this;
            if (3 == 3) {
                initScroolReval();
            }
        }
    },
    ready: function () {
        this.getdata();
        this.isOnline();
        this.getdeviceinfo();
        utils.saveiptodb('127.0.0.1');
    },
    methods: {
        getdata: function () {
            //获取数据
            var _self = this;
            var clientInfo = utils.getClientInfo();
            var json = {
                "appId": clientInfo.appRooboId,
                "token": clientInfo.appRooboToken,
                "clientId": utils.getClientId(),
                "userId": "",
                /*"tags": ["h2"]*/
                "tags": ["six"]
            };

            var ajaxUrl = juli.URL.cate + "?inter=/cms/modules";
            $.ajax({
                url: ajaxUrl,
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(json)
            }).done(function (res) {
                listvm.contents = JSON.parse(res).data.modules;
                for (var i = 0; i < listvm.contents.length; i++) {
                    if (listvm.contents[i].name == "首页广告") {
                        listvm.contents.$remove(listvm.contents[i]);
                    }
                }
                _self.loading = false;
                _self.getTimes();
                _self.scroolinit++;
            });
        },
        /*        */
        search: function () {
            //去搜索页
            // console.log(this.input)
            location.href = "search.html?search=" + this.input;
        },
        goToSource: function (item) {
            var _self = this;
            _self.putHistory(item);
            location.href = " source.html?id=" + item.id;
        },
        goToList: function (item) {
            var _self = this;
            _self.putHistory(item);
            location.href = "list.html?id=" + item.id + "&albumType=" + item.albumType;
        },
        putHistory: function (item) {
            var ajaxUrl = juli.URL.levelOne;
            var json = {
                "albumId": item.id,
                "albumName": item.name,
                "type": item.albumType
            };
            $.ajax({
                url: ajaxUrl,
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(json)
            }).done(function (res) {
                console.log("插入成功");
            });
        },
        getTimes: function () {
            var size = this.list.length - 4;
            var i = 1;
            var total = size / 4;
            this.times = [];
            if (size % 4) {
                this.times.push(i);
                i++;
                total++;
            }
            for (; i <= total; i++) {
                this.times.push(i);
            }
        },
        more: function () {
            //更多展开
            $('.item-more').toggleClass('active');
            if ($('.item-more').hasClass('active')) {
                $('.item-more').find('h5').text('收回');
            } else {
                $('.item-more').find('h5').text('更多');
            }
            $('.top-category.more').stop(true, true);
            $('.top-category.more').toggle('fast');
        },
        getRandomNmber: function (number, maxNumber, start) {
            //获取随机数start-maxNumber之间不重复的number个数
            var count = maxNumber;
            var ret = [];
            var originalArray = new Array(); //原数组 
            //给原数组originalArray赋值 
            for (var i = 0; i < count; i++) {
                originalArray[i] = i + start;
            }
            originalArray.sort(function () {
                return 0.5 - Math.random();
            });
            for (var i = 0; i < number; i++) {
                ret.push(originalArray[i]);
            }
            return ret;
        },
        getRecommendations: function () {
            //获取随机推荐的12个内容
            var _self = this;
            _self.recommendations = [];
            var indexs = _self.getRandomNmber(12, _self.list.length - 1, 1);
            for (var i = 0; i < 12; i++) {
                var mycontents = _self.list[indexs[i]].contents;
                if (mycontents.length == 0) {
                    listvm.recommendations.push(_self.list[indexs[i]]);
                } else {
                    var pickone = _self.getRandomNmber(1, mycontents.length, 0);
                    listvm.recommendations.push(mycontents[pickone[0]]);
                }
            }
            _self.scroolinit++;
            // console.log("getRecommendations");
            // console.log(indexs);
            // console.log(_self.recommendations);
        },

        getdeviceinfo: function () {
            //与设备建立连接
            var _self = this;

            clientCreate(onConnectCallback); //与设备建立连接
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
            //如果故事机不在线--则提示并返回
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
            //如果故事机不在线--则提示并返回
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
            //如果故事机不在线--则提示并返回
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
            //如果故事机不在线--则提示并返回
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
            //如果故事机不在线--则提示并返回
            if (!_self.deviceOnline) {
                utils.showOfflineToast();
                return false;
            }
            forwardTrack();
        },
        backward: function () {
            //上一首
            var _self = this;
            //如果故事机不在线--则提示并返回
            if (!_self.deviceOnline) {
                utils.showOfflineToast();
                return false;
            }
            backwardTrack();
        },
        showlist: function () {
            var _self = this;
            //如果故事机不在线--则提示并返回
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
                // console.log("getsingle");
                // console.log(res);
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
                // alert("请确认网络正常或已绑定设备！");
                $.alert("请确认网络正常或已绑定设备！", "", function () {
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
                // console.log(res);
                // alert("删除收藏");
                $.toast("删除收藏", "text");
                _self.islike = false;
            });
        },
        setVolume: function () {

            if (utils.getClientId().substring(0, 6) == "302004") {
                cmd_setvolume(Math.round(this.audio * 33 / 100));
            } else {
                cmd_setvolume(Math.round(this.audio * 40 / 100));
            }
            //cmd_getVolume(); //同步其他设备音量信息,当设置为51%时，设置过去的是音量是20，会导致重新获取的为50%，所以不同步刷新
            // console.log("volume: " + Math.round(this.audio * 40 / 100) + " percent: " + this.audio);
        },
        getVolume: function (volume) {
            this.audio = volume;
            // console.log("getVolume: " + this.audio);
        },
        getProgress: function (progress) {
            if (progress >= this.currentdata.duration) {
                progress = this.currentdata.duration;
            }
            if (this.interval != "" && Math.abs(progress - this.progress) <= 2) {
                //误差2秒内不刷新
                return false;
            }
            if (typeof this.currentdata.duration != "undefined") {
                this.progress = progress;
                this.progresspercent = this.progress / this.currentdata.duration * 100;
                this.currentprogress = this.formatSeconds(this.progress);
                // console.log("getProgress: " + this.progress);
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
                this.currentprogress = this.formatSeconds(this.progress);
                // console.log("getProgressPercent: " + this.progresspercent);
            }
        },
        setProgress: function () {
            cmd_customer_seekTrack(Math.round(this.progress));
            setTimeout(cmd_customer_getPlayProgress, 1000);
        },
        progressIncrease: function () {
            //秒数自增，一秒调用一次
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
        if (listvm.deviceOnline) {
            $('.play-component').show(0);
            $('.play-component').addClass('play-show');
        } else {
            utils.showOfflineToast();
            return false;
        }
    });

    $('#play-component .close').click(function () {
        $('.play-component').removeClass('play-show');
    });

    $('.search-bar-new input').on('click', function () {
        $('.play-component').hide(0);
    });
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

    listvm.getProgressPercent(percent);
    listvm.setProgress();
});

$sliderHandler.on('touchstart', function (e) {
    // console.log(e.originalEvent);
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

    listvm.getProgressPercent(percent);

    e.preventDefault();
}).on('touchend', function (e) {
    listvm.setProgress();
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

    listvm.getVolume(percent);
    listvm.setVolume();
});

$sliderTrackVolume.on('touchstart', function (e) {
    // console.log(e.originalEvent);
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

    listvm.getVolume(percent);

    e.preventDefault();
}).on('touchend', function (e) {
    listvm.setVolume();
});

$('#minvolume').on('click', function (e) {
    $sliderTrackVolume.css('width', 0 + '%');
    $sliderHandlerVolume.css('left', 0 + '%');
    listvm.getVolume(0);
    listvm.setVolume();
});

$('#maxvolume').on('click', function (e) {
    $sliderTrackVolume.css('width', 100 + '%');
    $sliderHandlerVolume.css('left', 100 + '%');
    listvm.getVolume(100);
    listvm.setVolume();
});

function initScroolReval() {
    // console.log($('.animate-box'));
    var config = {
        origin: 'top',
        viewFactor: 0.15,
        duration: 800,
        distance: "0px",
        scale: 0.5,
        easing: 'ease',
        mobile: true
    };

    window.sr = new ScrollReveal(config);

    var animate = {
        reset: false,
        viewOffset: {
            bottom: 100
        }
    };

    sr.reveal(".animate-box", animate);
}