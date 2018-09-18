//index.js
const plugin = requirePlugin("WechatSI")
const manager = plugin.getRecordRecognitionManager()
//获取应用实例
const app = getApp()
Page({
  data: {
    currentText: '',
    translateText: '',
    zhToEn: true
  },
  onLoad: function () {
    this.initRecord();
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
  },
  switchChange(e) {
    this.setData({
      zhToEn: e.detail.value
    })
  },
  initRecord: function () {
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = (res) => {
      console.log(res);
      let text = res.result
      this.setData({
        currentText: text,
      })
    }
    // 识别结束事件
    manager.onStop = (res) => {
      let text = res.result
      if (text == '') {
        // 用户没有说话，可以做一下提示处理...
        return
      }
      this.setData({
        currentText: text,
      })
      // 得到完整识别内容就可以去翻译了
      this.translateTextAction()
    }
  },
  streamRecord: function () {
    manager.start({
      lang: 'zh_CN',
    })
  },
  streamRecordEnd: function () {
    manager.stop()
  },
  translateTextAction() {
    let lfrom = this.data.zhToEn ? 'zh_CN' : 'en_US';
    let lto = this.data.zhToEn ? 'en_US' : 'zh_CN';
    plugin.translate({
      lfrom: lfrom,
      lto: lto,
      content: this.data.currentText,
      tts: true, // 需要合成语音
      success: (resTrans) => {
        // 翻译可以得到 翻译文本，翻译文本的合成语音，合成语音的过期时间
        let text = resTrans.result
        this.setData({
          translateText: text,
        })
        // 得到合成语音让它自动播放出来
        wx.playBackgroundAudio({
          dataUrl: resTrans.filename,
          title: ''
        })
      },
    })
  }
})
