// pages/index/index.js
import { request } from '../../request/index'
Page({
  data: {
    // 轮播图列表
    swiperList: [],
    // 导航栏列表
    cateList: [],
    // 楼层列表
    floorList: [],
  },
  // 页面加载
  onLoad(options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  // 获取轮播图数据
  async getSwiperList() {
    let result = await request({
      url: '/home/swiperdata',
    })
    // console.log(result)
    const { data } = result
    if (data.meta.status != 200) return console.log('获取失败')
    let swiperList = data.message
    swiperList.forEach((v, i) => {
      swiperList[i].navigator_url = v.navigator_url.replace('main', 'index')
    })
    // console.log(swiperList)
    this.setData({ swiperList })
  },
  // 获取导航栏数据
  async getCateList() {
    let result = await request({
      url: '/home/catitems',
    })
    // console.log(result)
    const { data } = result
    if (data.meta.status != 200) return console.log('获取失败')
    this.setData({
      cateList: data.message,
    })
  },
  // 获取楼层数据
  async getFloorList() {
    let result = await request({
      url: '/home/floordata',
    })
    // console.log(result)
    const { data } = result
    if (data.meta.status != 200) return console.log('获取失败')
    let floorList = data.message
    // floorList.forEach((v) => v.repalce(/main/, 'index'))
    for (let k = 0; k < floorList.length; k++) {
      floorList[k].product_list.forEach((v, i) => {
        floorList[k].product_list[k].navigator_url = v.navigator_url.replace(
          '?',
          '/index?'
        )
      })
    }
    this.setData({ floorList })
  },
})
