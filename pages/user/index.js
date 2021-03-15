// pages/user/index.js
Page({
  data: {
    userInfo: {},
    // 商品收藏数量
    collectNum: 0,
  },
  onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    const collect = wx.getStorageSync('collect') || []
    // console.log(collect)
    this.setData({ userInfo, collectNum: collect.length })
  },
})
