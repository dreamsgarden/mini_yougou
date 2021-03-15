// pages/goods_detail/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { showToast } from '../../utils/asyncWx'
Page({
  data: {
    // 商品详情数据
    goodsDetail: {},
    // 商品是否收藏
    isCollect: false,
  },
  // 商品对象
  GoodsInfo: {},
  // 生命周期函数--监听页面加载
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    const { options } = currentPage
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    let result = await request({ url: '/goods/detail', data: { goods_id } })
    // console.log(result)
    const { data } = result
    if (data.meta.status != 200) return console.log('获取失败')
    this.GoodsInfo = data.message

    // 商品收藏
    let collect = wx.getStorageSync('collect') || []
    // 当前是否收藏
    let isCollect = collect.some((v) => v.goods_id === this.GoodsInfo.goods_id)

    this.setData({
      goodsDetail: {
        pics: data.message.pics,
        goods_price: data.message.goods_price,
        goods_name: data.message.goods_name,
        // 临时修改 .webp => .jpg
        goods_introduce: data.message.goods_introduce.replace(
          /\.webp/g,
          '.jpg'
        ),
      },
      isCollect,
    })
  },
  // 全屏预览图片
  handlePrevewImage(e) {
    const urls = this.GoodsInfo.pics.map((v) => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls, // 需要预览的图片http链接列表
    })
  },
  // 加入购物车
  handleCartAdd() {
    // 获取购物车缓存
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex((v) => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      // 不存在
      this.GoodsInfo.num = 1
      // 选中状态
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      cart[index].num++
    }
    // 设置购物车缓存
    wx.setStorageSync('cart', cart)

    // 提示
    wx.showToast({
      title: '加入购物车成功',
      icon: 'sucess',
      mask: true,
    })
  },
  // 商品收藏
  handleCollect() {
    let isCollect = false
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex((v) => v.goods_id === this.GoodsInfo.goods_id)

    if (index !== -1) {
      // 已收藏
      collect.splice(index, 1)
      isCollect = false
      showToast({ title: '取消成功' })
    } else {
      collect.push(this.GoodsInfo)
      isCollect = true
      showToast({ title: '收藏成功', icon: 'true' })
    }
    wx.setStorageSync('collect', collect)
    this.setData({ isCollect })
  },
})
