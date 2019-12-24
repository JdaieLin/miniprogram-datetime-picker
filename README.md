# miniprogram-datetime-picker
小程序日期时间合并选择器组件

### Demo
<p align="left">
  <img width="240" src="https://pic3.superbed.cn/item/5e01705676085c32893f703c.gif">
</p>

### 引用方法

```
<!--index.wxml-->
<wxs module="fliter">
function dateFormat (timestamp) {
  var date = getDate(timestamp)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}
function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
    dateFormat: dateFormat
}
</wxs>
<view class="container">
  <button bindtap="showDateSelector">Date</button>
  <dateSelector show="{{showPicker}}" title="title" date="{{date}}" year-range="{{yearRange}}" bindcancel="hideDateSelector" bindconfirm="onConfirmDate">
    <view class="picker">{{fliter.dateFormat(date)}}</view>
  </dateSelector>
</view>
```

```
//index.js

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
```
###注意事项

因为小程序组件无法传入Date对象作为props，所以这里采用时间戳进行传输。
