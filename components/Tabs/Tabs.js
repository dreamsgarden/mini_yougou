// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击  当前选中项
    handleTap(e) {
      const { index } = e.currentTarget.dataset
      // console.log(index)

      // 传给父组件
      this.triggerEvent("tabsItemChange",{index})
    },
  },
})
