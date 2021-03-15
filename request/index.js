// 发送异步代码次数
let ajaxTimes = 0

/**
 * @description: 封装请求接口
 * @param {Object} params 请求参数
 * @return {Promise} resolve,reject
 */
export const request = (params) => {
  ajaxTimes++

  // 显示加载中效果
  wx.showLoading({
    title: '加载中',
    mask: true,
  })

  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimes--
        // 关闭等待图标
        if (ajaxTimes === 0) wx.hideLoading()
      },
    })
  })
}
