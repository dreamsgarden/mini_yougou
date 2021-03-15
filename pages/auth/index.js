import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { login } from '../../utils/asyncWx.js'
Page({
  // 页面的初始数据
  data: {},

  // 生命周期函数--监听页面加载

  onLoad: function (options) {},
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      // console.log(e.detail)
      const { encryptedData, rawData, iv, signature } = e.detail
      const { code } = await login()

      const loginParams = { encryptedData, rawData, iv, signature, code }

      // 获取用户token
      // let result = await request({
      //   url: '/users/wxlogin',
      //   data: loginParams,
      //   method: 'post',
      // })
      // console.log(result)
      // const { data } = result
      // if (data.meta.status != 200) return console.log('获取失败')
      const token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'

      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1,
      })
    } catch (err) {
      console.log(err)
    }
  },
})
