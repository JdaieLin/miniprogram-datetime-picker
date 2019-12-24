//index.js
//获取应用实例
const util = require('../../utils/util')
const app = getApp()

Page({
  data: {
    yearRange: [2018, new Date().getFullYear() + 1],
    date: new Date().getTime(),
    showPicker: false
  },
  onLoad: function () {
    
  },
  showDateSelector (e) {
    this.setData({
      showPicker: true
    })
  },
  hideDateSelector (e) {
    console.log(e)
  },
  onConfirmDate (e) {
    console.log(e.detail)
    this.setData({
      date: e.detail
    })
  }
})
