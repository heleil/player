/**
 * Created by lixinwei on 16/8/4.
 */

"use strict";

wx.ready(function () {
  //这里放配置成功后就触发的内容
  wx.hideOptionMenu();

  /*wx.getNetworkType({
   success: function (res) {
   var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
   }
   });
   */
});

var audio = undefined;

function createAudio() {
  if (typeof audio == "undefined") {
    var a = audiojs.create(document.getElementsByTagName('audio'), {});
    audio = a[0];
  }
}
createAudio();

$(function () {
  // window.deviceId = $("input[name=deviceId]").val();
  // window.openId = $("input[name=openid]").val();
  window.configResult = false; //配置结果

  $(".weui-check").change(function () {
    if ($(this).is(':checked')) {
      console.log("开");
      $("input[name=password]").attr("type", "text");
    } else {
      console.log("关");
      $("input[name=password]").attr("type", "password");
    }
  });

  $("input[name=ssid]").change(function () {
    checkSsid();
    console.log(111);
  });

  var ssid = window.localStorage.getItem("ssid");
  var password = window.localStorage.getItem("ssidpassword");

  $("input[name=ssid]").val(ssid);
  $("input[name=password]").val(password);

  clientCreate(onConnectCallback);
});

function checkSsid() {
  var ssid = $("input[name=ssid]").val();
  if (ssid == "") {
    $("input[name=ssid]").parents(".weui_cell").addClass('weui_cell_warn');
    return false;
  } else {
    $("input[name=ssid]").parents(".weui_cell").removeClass('weui_cell_warn');
    return true;
  }
}

$("#btnConnect").click(function () {

  if (window.deviceId == "") utils.getdevice();

  if (checkSsid()) {
    var ssid = $("input[name=ssid]").val();
    var password = $("input[name=password]").val();
    var playingCycleSecond = 10;

    var sinVoiceSet = {
      openId: sessionStorage.getItem(juli.openIdkey),
      deviceId: window.deviceId,
      ssid: ssid,
      password: password
    };

    console.log(sinVoiceSet);

    $.ajax({
      type: "POST",
      url: juli.URL.sinvoice,
      contentType: 'application/json',
      async: false,
      timeout: 5000,
      data: JSON.stringify(sinVoiceSet),
      success: function (msg) {
        var fileUrl = msg;

        audio.load(fileUrl);
        doNotDone();

        window.localStorage.setItem("ssid", ssid);
        window.localStorage.setItem("ssidpassword", password);
      },
      error: function (data) {
        //hideMaskLoading();
      }
    });
  }
});

function checkSsid() {
  var ssid = $("input[name=ssid]").val();
  if (ssid == "") {
    $("input[name=ssid]").parents(".weui_cell").addClass('weui_cell_warn');
    return false;
  } else {
    $("input[name=ssid]").parents(".weui_cell").removeClass('weui_cell_warn');
    return true;
  }
}

function onConnectCallback() {
  console.log("this is onConnectCallback");
  //client.subscribe("storybox/"+window.deviceId+"/server");
}

function onConfigWifi(configWifi) {
  console.log("configWifi:" + configWifi);
  if (configWifi == "success") {
    //window.configResult = true;
    doDone();
  }
}

function checkIfConnected() {
  //first pause
  audio.pause();
  $.hideLoading();
  //显示model
  $.modal({
    title: "提示",
    text: DEBUG === "zhiban" ? "机器人收到网络信息了吗？" : "机器人收到网络信息了吗？",
    buttons: [{ text: "没收到", onClick: function () {
        doNotDone();
      } }, { text: "收到了", onClick: function () {
        doDone();
      } }]
  });
}

function doDone() {
  $.hideLoading();
  setTimeout(function () {
    wx.closeWindow();
  }, 500);
}

function doNotDone() {
  $.hideLoading();
  audio.play();
  $.showLoading("配置中");
  setTimeout(checkIfConnected, 10 * 1000);
}