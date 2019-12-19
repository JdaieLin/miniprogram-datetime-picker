//index.js
//获取应用实例
const util = require('../../utils/util')
const app = getApp()

Page({
  data: {
    dateData: {
      show: false
    }
  },
  onLoad: function () {
    
  },
  showDateSelector (e) {
    this.setData({
      dateData: {
        date: new Date(),
        title: "title",
        show: true
      }
    })
  },
  hideDateSelector () {
    this.setData({
      dateData: {
        show: false
      }
    })
  }
})
