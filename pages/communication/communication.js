//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },
  onLoad: function () {
  },
  startRecord() {
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
        console.log(tempFilePath);
        wx.playVoice({
          filePath: tempFilePath,
          complete: function () {
          }
        })
      },
      fail: error => {
        console.log('456');
      },
      complete: _ => {
        console.log('123');
      }
    })
  },
  stopRecord() {
    wx.stopRecord();
  }
})
