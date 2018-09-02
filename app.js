//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    this.getImagesAccessToken();
    // this.getWordsAccessToken();
  },
  globalData: {
    userInfo: null,
    access_token: '',
    word_access_token: ''
  },
  // 获取百度的图像识别acccess_token认证
  getImagesAccessToken() {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        'grant_type': 'client_credentials',
        'client_id': 'koPlDDQkK7sUpGZ9yE1bgMq9',
        'client_secret': 'AGMCLgmUqLTaEUTTjAHIFXwNpYWxWHLm'
      },
      dataType: 'json',
      success: (response) => {
        if (response.statusCode === 200) {
          const access_token = response.data.access_token;
          this.globalData.access_token = access_token;
        }
      }
    });
  },
  // 获取百度的文字识别acccess_token认证
  getWordsAccessToken() {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        'grant_type': 'client_credentials',
        'client_id': 'iADtlMT9rCW8Hqt8dcUpcFdY',
        'client_secret': 'S0uBvzmewyTHYGIDxGX2NcGqHGFAdmRG'
      },
      dataType: 'json',
      success: (response) => {
        if (response.statusCode === 200) {
          const access_token = response.data.access_token;
          this.globalData.word_access_token = access_token;
        }
      }
    });
  }
})