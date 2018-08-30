//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    latitude: 39.9110666857,
    longitude: 116.4136103013,
    markers: [{
      id: 1,
      latitude: 39.9110666857,
      longitude: 116.4136103013,
      name: 'T.I.T 创意园'
    }]
  },
  onLoad: function (options) {
  },
  onReady() {
    this.mapCtx = wx.createMapContext('myMap');
    this.getCenterLocation();
  },
  getCenterLocation: function () {
    const self = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        self.setMarker(res.latitude, res.longitude);
      }
    })
  },
  setMarker(latitude, longitud) {
    this.setData({
      markers: [
        {
          latitude: latitude,
          longitude: longitud
        }
      ]
    })
  },
  regionChange(event) {
    this.getCenterLocation();
  },
  mapClick(event) {
    console.log(event);
  }
})
