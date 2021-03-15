// pages/category/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    // 左侧菜单列表
    leftMenuList: [],
    // 右侧菜单列表
    rightMenuList: [],
    // 左侧选中项
    currentIndex: 0,
    // 右侧列表置顶
    scrollTop: 0,
  },
  // 接口返回 商品分类列表
  CatesList: [],

  // 页面加载
  onLoad: function (options) {
    // 获取本地存储
    const Cates = wx.getStorageSync('cates')
    // console.log(Cates.data)
    if (!Cates) return this.getCatesList()

    // 有旧数据 定义过期时间 5分钟
    if (Date.now() - Cates.time > 1000 * 10) {
      // 重新发送请求
      this.getCatesList()
    } else {
      // 使用旧的数据
      this.CatesList = Cates.data
      let leftMenuList = this.CatesList.map((v) => v.cat_name)
      let rightContent = this.CatesList[0].children
      this.setData({
        leftMenuList,
        rightContent,
      })
    }
  },
  // 获取商品分类数据
  async getCatesList() {
    let result = await request({
      url: '/categories',
    })
    // console.log(result)
    const { data } = result
    if (data.meta.status != 200) return console.log('获取失败')
    this.CatesList = data.message

    // 设置本地存储
    wx.setStorageSync('cates', { time: Date.now(), data: this.CatesList })

    let leftMenuList = this.CatesList.map((item) => item.cat_name)
    let rightMenuList = this.CatesList[0].children

    this.setData({
      leftMenuList,
      rightMenuList,
      scrollTop: 0,
    })
  },
  // 左侧菜单点击
  handleItemTap(e) {
    // 获取点击菜单下标
    const { index } = e.currentTarget.dataset
    // 渲染商品
    let rightMenuList = this.CatesList[index].children
    this.setData({
      currentIndex: index,
      rightMenuList,
    })
  },
})
