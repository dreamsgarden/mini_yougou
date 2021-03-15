import { showModel, showToast } from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  // 页面数据
  data: {
    // 收货地址
    address: {},
    // 商品
    cart: [],
    // 全选
    allChecked: false,
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
    const cart = wx.getStorageSync('cart') || []

    this.setData({ address })
    this.setCart(cart)
  },
  // 获取用户收货地址
  handleChooseAddress() {
    // 获取用户权限状态
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting['scope.address']

        if (scopeAddress) this.getAddress()

        // !新版不存在授权问题
        // 已成功授权 或 从未授权
        // if (scopeAddress === true || scopeAddress === undefined)
        //   return this.getAddress()
        // // 取消了授权，重新授权
        // wx.openSetting({
        //   success: (result) => {
        //     this.getAddress()
        //   },
        // })
      },
    })
  },
  // 获取地址
  getAddress() {
    wx.chooseAddress({
      success: (result) => {
        // 拼接地址
        result.all =
          result.provinceName +
          result.cityName +
          result.countyName +
          result.detailInfo
        // console.log(result)
        // 设置缓存
        wx.setStorageSync('address', result)
      },
    })
  },
  // 商品选中状态
  handleItemChange(e) {
    // 选中项 id
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data

    const index = cart.findIndex((v) => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked

    this.setCart(cart)
  },
  // 商品状态  计算商品 价格数量
  setCart(cart) {
    // 商品全选状态
    let allChecked = true
    // 总价格 总数量
    let totalPrice = 0
    let totalNum = 0

    cart.forEach((v) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false

    this.setData({ cart, allChecked, totalPrice, totalNum })

    // 刷新缓存
    wx.setStorageSync('cart', cart)
  },
  // 商品全选
  handleAllChecked() {
    let { cart, allChecked } = this.data

    allChecked = !allChecked
    cart.forEach((v) => (v.checked = allChecked))

    this.setCart(cart)
  },
  // 商品数量编辑
  async handleItemNumEdit(e) {
    const { id, operation } = e.currentTarget.dataset
    let { cart } = this.data
    const index = cart.findIndex((v) => v.goods_id === id)

    if (cart[index].num === 1 && operation === -1) {
      let res = await showModel('您是否要删除商品？')

      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    } else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  // 结算
  async handlePay() {
    const { address, totalNum } = this.data

    if (!address.userName)
      return await showToast({ title: '您还没有选择收货地址' })
      
    if (totalNum === 0) return await showToast({ title: '您还没有选购商品' })

    // 跳转支付
    wx.navigateTo({ url: '/pages/pay/index' })
  },
})
