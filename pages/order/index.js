// pages/order/index.js
Page({
  data: {
    // 选项卡
    tabs: [
      { id: 0, value: '全部', isActive: true },
      { id: 1, value: '待付款', isActive: false },
      { id: 2, value: '待发货', isActive: false },
      { id: 3, value: '退款/退货', isActive: false },
    ],
    //
    type: 1,
  },
  onshow: function (options) {
    // 1 获取当前的小程序的页面栈-数组 长度最大是10页面
    let pages = getCurrentPages()
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1]
    // 3 获取url上的type参数
    const { type } = currentPage.options
    // 4 激活选中页面标题 当 type=1 index=0
    this.changeTitleByIndex(type - 1)
    this.getOrders(type)
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    let { tabs } = this.data
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    )
    this.setData({
      tabs,
    })
  },
  
  handleTabsItemChange(e) {
    const { index } = e.detail
    this.changeTitleByIndex(index)
    // this.getOrders(index + 1)
  },
})
