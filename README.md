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
  <dateSelector 
       show="{{showPicker}}" 
       title="title" 
       date="{{date}}" 
       year-range="{{yearRange}}" 
       bindcancel="hideDateSelector" 
       bindconfirm="onConfirmDate">
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
### 参数

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| - | :-: | :-: | :-: | :- |
| date | number | 无 | 是 | 用于选择器初始化的时间戳 |
| show | boolean | false | 否 | 选择器开关 |
| title | string | '' | 否 | 选择器顶部标题 |
| year-range | array | [1970, 今年+5] | 否 | 选择器年份的范围 |


### 事件

| 事件名 | 触发条件 | 数据 |
| - | :-: | :- |
| confirm | 点击确认按钮 | e.detail 为当前所选时间戳 |
| cancel | 关闭选择器 | 无 |
