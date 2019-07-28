/**
 * @description: 炬力公众号
 * @author: 李宝君  coolli2@163.com
 * @version: V1
 * @update: 16/8/1
 */

historyvm = new Vue({
  el: 'html',
  data: {
    favlist: "", //收藏列表数据
    loading: true,
    list: "",
    downloaddata: "",
    playtracklist: ""
  },
  ready: function () {
    utils.getfav(this); //拿到该用户的收藏列表数据
    this.getdata();
    this.initselectdata(); //初始化selecr组件数据
  },
  methods: {
    initselectdata: function () {
      //初始化select组件
      var _self = this;
      var playtracklist = utils.gettrackList();

      console.log(playtracklist);

      if (playtracklist.length) {
        $.each(playtracklist, function (i, n) {
          n.title = n.name;
          n.value = n.id;
        });
      }
      _self.playtracklist = playtracklist;
    },
    getdata: function () {
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
        $.each(res, function (i, n) {
          n.sec = utils.formatSeconds(n.duration);
          n.isplay = false;
          n.islike = false;

          //将每条数据与收藏列表元素逐个比对，如果已经存在于收藏列表，则标记为已经收藏
          if (_self.favlist.length) {
            _self.favlist.forEach(function (value, index, array) {
              if (n.trackId == value.trackId) {
                n.islike = true;
              }
            });
          }
        });
        _self.list = res;
        _self.loading = false;
      });
    },
    demand: function (item) {
      //收藏列表-我的
      var _self = this;

      //如果故事机不在线--则提示并返回
      if (!utils.online()) {
        utils.showOfflineToast();
        return false;
      }

      var json = {
        openId: utils.openid,
        trackId: item.trackId
      };
      $.ajax({
        url: juli.URL.getsingle + "/" + item.trackId,
        type: 'get',
        dataType: 'json',
        cache: false,
        async: false
      }).done(function (res) {
        json.url = res.content;
      });
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
    /*pause:function(item){                        //暂停
      var _self = this;
       pauseTrack();
       item.isplay=false;
    },*/
    addfav: function (item) {
      //添加收藏
      item.openid = utils.openid;
      console.log("addfav item:", JSON.stringify(item));
      var favJson = {
        openId: utils.openid,
        trackId: item.trackId,
        title: item.title,
        coverSmallUrl: item.coverSmallUrl,
        duration: item.duration,
        albumTitle: item.albumTitle,
        albumCoverSmallUrl: item.albumCoverSmallUrl,
        url: item.url,
        downloadUrl: item.downloadUrl,
        downloadSize: item.downloadSize
      };

      $.ajax({
        url: juli.URL.addlike,
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(favJson)
      }).done(function (res) {
        console.log(res);
        // alert("已添加收藏");
        $.toast("已添加收藏", "text");
        item.islike = true;
      });
    },
    dellike: function (item) {
      //删除收藏
      var deldata = {
        trackId: item.trackId,
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
        $.toast("删除收藏", "text");
        item.islike = false;
      });
    },
    download: function (item) {
      //下载
      var _self = this;

      var json = [{
        title: item.title,
        id: item.trackId,
        duration: item.duration,
        albumTitle: item.albumTitle,
        albumCoverSmallUrl: item.albumCoverSmallUrl,
        url: item.url,
        downloadUrl: item.downloadUrl,
        downloadSize: item.downloadSize
      }];

      _self.downloaddata = json;

      $("#select").select({
        title: "请选择播放列表",
        items: _self.playtracklist,
        closeText: "取消",
        onChange: function () {
          //传（名，值）
          _self.downloadfun($("#select").val(), $("#select").data('values'));
        }
      });

      //调用打开select，开始选择，并拿到值
      $("#select").select("open");
    },
    downloadfun: function (name, val) {
      //下载--需先判断是否已经绑定设备
      var _self = this;
      console.log(name);
      console.log(val);
      $.ajax({
        url: juli.URL.download + "?deviceId=" + utils.getdevice() + "&id=" + val + "&name=" + encodeURI(encodeURI(name)),
        type: 'post',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(_self.downloaddata)
      }).done(function (res) {
        console.log(res);
        $.toast("添加成功！", "text");
        //清除select状态
        utils.clearselect();
      });
    },
    del: function (item) {
      //删除历史
      var _self = this;
      var deldata = {
        openId: utils.openid,
        trackId: item.trackId,
        deviceId: utils.getdevice()
      };
      console.log(deldata);
      $.ajax({
        url: juli.URL.delhistory,
        type: 'post',
        cache: false,
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(deldata)
      }).done(function (res) {
        $.toast("删除成功", "text");
        _self.list.$remove(item);
      });
    }
  }
});