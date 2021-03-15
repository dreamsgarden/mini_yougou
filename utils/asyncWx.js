/**
 * @description: 显示模态对话框
 * @param {String} content 提示信息
 * @return {Promise}
 */
export const showModel = (content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
/**
 * @description: 显示消息提示框
 * @param {Object}  提示内容 title mask icon
 * @return {Promise}
 */
export const showToast = ({ title, mask = true, icon = 'none' }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      icon,
      mask,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
/**
 * @description: 获取登录凭证（code）
 * @param {*}
 * @return {Promise}
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {},
    })
  })
}
