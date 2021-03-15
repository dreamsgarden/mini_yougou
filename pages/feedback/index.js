import { showToast } from '../../utils/asyncWx.js'
Page({
  data: {
    // 选项卡
    tabs: [
      { id: 0, value: '体验问题', isActive: true },
      { id: 1, value: '商品、商家投诉', isActive: false },
    ],
    // 选择的图片的路径
    chooseImgs: [],
    // 文本域的内容
    textVal: '',
  },
  // 外网的图片的路径
  UpLoadImgs: [],

  onShow: function () {},
  // 根据标题索引来激活选中项
  handleTabsItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    )
    this.setData({
      tabs,
    })
  },
  // 选择图片
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result)
        this.setData({
          // 拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths],
        })
      },
    })
  },
  // 点击 自定义图片组件,删除图片
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset
    let { chooseImgs } = this.data
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs,
    })
  },
  // 文本域输入
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value,
    })
  },
  // 提交按钮的点击
  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data
    // 合法性的验证
    if (!textVal.trim())
      // 不合法
      return showToast({
        title: '输入不合法',
      })

    // 上传图片 
    // 上传文件的 api 不支持 多个文件同时上传  遍历数组 挨个上传
    // 显示正在等待的图片
    wx.showLoading({
      title: '正在上传中',
      mask: true,
    })

    // 判断有没有需要上传的图片数组
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          // 图片要上传到哪里
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          // 被上传的文件的路径
          filePath: v,
          // 上传的文件的名称 后台来获取文件  file
          name: 'file',
          // 顺带的文本信息
          formData: {},
          success: (result) => {
            console.log(result)
            let url = JSON.parse(result.data).url
            this.UpLoadImgs.push(url)

            // 所有的图片都上传完毕了才触发
            if (i === chooseImgs.length - 1) {
              wx.hideLoading()

              console.log('把文本的内容和外网的图片数组 提交到后台中')
              //  提交都成功了
              // 重置页面
              this.setData({
                textVal: '',
                chooseImgs: [],
              })
              // 返回上一个页面
              wx.navigateBack({
                delta: 1,
              })
            }
          },
        })
      })
    } else {
      wx.hideLoading()

      console.log('只是提交了文本')
      wx.navigateBack({
        delta: 1,
      })
    }
  },
})
