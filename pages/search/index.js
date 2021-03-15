// pages/search/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    goodsList: [],
    // 显示隐藏按钮
    isFocus: false,
    value: '',
  },
  // 防抖 定时器
  TimeId: -1,

  onLoad: function (options) {},
  // 输入框
  handleInput(e) {
    let { value } = e.detail
    if (!value.trim()) return this.setData({ goodsList: [], isFocus: true })
    console.log(value)
    this.setData({ value, isFocus: true })

    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.getGoodsList(value)
    }, 1000)
  },
  // 获取商品列表
  async getGoodsList(query) {
    let result = await request({
      url: '/goods/qsearch',
      data: { query },
    })
    // console.log(result)
    const { data } = result
    if (data.meta.status != 200) return console.log('获取失败')
    this.setData({ goodsList: data.message })
  },
  // 取消
  handleCancel() {
    this.setData({ value: '', goodsList: [], isFocus: false })
  },
})
