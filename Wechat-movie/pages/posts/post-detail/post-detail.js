// pages/posts/post-detail/post-detail.js
var data = require('../../../data/posts-data.js');
var app = getApp()
Page({
  data:{
    detail: {},
    isPlayingMusic: false
  },
  onLoad:function(options){
    var globalData = app.globalData
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

    // 监听音乐播放状态
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic:  true
      })
    })

    // 监听音乐播放状态
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic:  false
      })
    })
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
    var id = this.data.currentPostId
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.detail.music.url,
        title: this.data.detail.music.title,
        coverImgUrl: this.data.detail.music.coverImgUrl
      })
      this.setData({
        isPlayingMusic: true
      })
    }

  },

  onFenxang:function (event) {
    console.log('onFenxang')
    var itemList =  [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到知乎',
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success:function (res) {
        // res.cancel  用户是否点击了取消
        // res.tapIndex  数组元素的序号 从0 开始
        wx.showModal({
            title: '用户分享到' + itemList[res.tapIndex],
            content: res.cancel + '目前无法实现分享API'
        })
      }
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