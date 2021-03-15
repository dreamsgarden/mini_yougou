// pages/login/index.js
Page({
  data: {},

  //  生命周期函数--监听页面加载
  onLoad: function (options) {},

  handleGetUserInfo(e) {
    const { userInfo } = e.detail
    console.log(userInfo)
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1,
    })
  },
})
