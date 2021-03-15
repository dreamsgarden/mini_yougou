import { showModel, showToast } from '../../utils/asyncWx.js'
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  // 页面数据
  data: {
    // 收货地址
    address: {},
    // 商品
    cart: [],
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0,
  },

  // 生命周期函数--监听页面加载
  onLoad(options) {},
  // 生命周期函数——监听页面显示
  onShow: function () {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []

    // 支付的商品
    cart = cart.filter((v) => v.checked)

    // 总价格 总数量
    let totalPrice = 0
    let totalNum = 0

    cart.forEach((v) => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })

    this.setData({ address, cart, totalPrice, totalNum })
  },
  async haandleOrderPay() {
    // 获取token
    const token = wx.getStorageSync('token')
    if (!token)
      return wx.navigateTo({
        url: '/pages/auth/index',
        coplete: () => {},
      })

    // 创建订单
    const header = { Authorization: token }
    const order_price = this.data.totalPrice
    const consignee_addr = this.data.totalNum
    let goods = []
    this.data.cart.forEach((v) =>
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.goods_number,
        goods_price: v.goods_price,
      })
    )
    const result = await request({
      url: 'my/orders/create',
      method: 'post',
      data: {
        order_price,
        consignee_addr,
        goods,
      },
      header,
    })
    console.log(result)
  },
})
