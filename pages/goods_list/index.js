// pages/goods_list/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    // 选项卡
    tabs: [
      { id: 0, value: '综合', isActive: true },
      { id: 1, value: '销量', isActive: false },
      { id: 2, value: '价格', isActive: false },
    ],
    // 商品列表数据
    goodsList: [],
  },

  // 商品列表请求参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },
  // 总页数
  totalPages: 1,
  // 页面加载
  onLoad: function (options) {
    // console.log(options)
    this.queryParams.cid = options.cid || ''
    this.queryParams.query = options.query || ''

    this.getGoodsList()
  },
  // 接收子数据
  handleTabsItemChange(e) {
    const { index } = e.detail
    // console.log(index)

    // 修改源数组
    let { tabs } = this.data
    tabs.forEach((v, i) => {
      i == index ? (v.isActive = true) : (v.isActive = false)
    })
    this.setData({
      tabs,
    })
  },
  // 获取商品列表数据
  async getGoodsList() {
    let result = await request({
      url: '/goods/search',
      data: this.queryParams,
    })
    // console.log(result)
    const { data } = result
    if (data.meta.status != 200) return console.log('获取失败')

    // 总条数
    const { total } = data.message
    // 总页数
    this.totalPages = Math.ceil(total / this.queryParams.pagesize)
    this.setData({
      // 拼接数组
      goodsList: [...this.data.goodsList, ...data.message.goods],
    })
  },
  // 监听用户上拉触底事件，上拉刷新
  onReachBottom() {
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({ title: '没有数据了' })
    } else {
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 监听用户下拉动作，下拉刷新
  onPullDownRefresh() {
    // 重置数组
    this.setData({
      goodsList: [],
    })
    // 重置页码
    this.queryParams.pagenum = 1
    this.getGoodsList()

    // 关闭等待效果
    wx.stopPullDownRefresh()
  },
})
