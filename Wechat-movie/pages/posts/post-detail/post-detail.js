// pages/posts/post-detail/post-detail.js
var data = require('../../../data/posts-data.js');
Page({
  data:{
    detail: {},
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id
    this.data.currentPostId = postId
    this.setData({
      detail: data.postList[postId]
    })

    var postsCollected = wx.getStorageSync('posts_collected')

    if (postsCollected) {
      var PosCollected = postsCollected[postId]
      this.setData({
        collected: PosCollected
      })
    } else {
      var postsCollected = {}
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }

  },

  onShouchang:function (event) {
    var postsCollected = wx.getStorageSync('posts_collected')
    var PosCollected = !!postsCollected[this.data.currentPostId]
    PosCollected = !PosCollected
    postsCollected[this.data.currentPostId] = PosCollected
    //更新文章是否收藏缓存值
    wx.setStorageSync('posts_collected', postsCollected)
    // 更新数据绑定变量， 从而实现切换 图标状态
    this.setData({
      collected: PosCollected
    })

    wx.showToast({
      title: PosCollected? '收藏成功': '取消收藏',
      duration: 500
    })
  },

  onMusicTap:function (event) {
    wx.playBackgroundAudio({
      dataUrl: "http://ws.stream.qqmusic.qq.com/C100002mWVx72p8Ugp.m4a?fromtag=38",
      title: "恋恋风尘-老狼",
      coverImgUrl: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001VaXQX1Z1Imq.jpg?max_age=2592000"
    })
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  onFenxang:function () {



  },

})