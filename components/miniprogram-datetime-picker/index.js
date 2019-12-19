// components/timePicker/index.js
// 定义年、月、日、时、分、秒的数组都为空
const date = new Date()
const years = []
const months = []
let days = []
const hours = []
const minutes = []
var thisMon = date.getMonth();
var thisDay = date.getDate();
// 获取年
for (let i = 2017; i <= date.getFullYear() + 2; i++) {
  years.push(i)
}
// 获取月份
for (let i = 0; i <= 11; i++) {
  var k = i;
  if (0 <= i && i < 9) {
    k = "0" + (i + 1);
  } else {
    k = (i + 1);
  }
  months.push(k)
}
if (0 <= thisMon && thisMon < 9) {
  thisMon = "0" + (thisMon + 1);
} else {
  thisMon = (thisMon + 1);
}
if (0 <= thisDay && thisDay < 10) {
  thisDay = "0" + thisDay;
}
// 获取日期
var monthDays = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var totalDay = mGetDate(date.getFullYear(), thisMon);
function getDays (count) {
  days = []
  for (let i = 1; i <= count; i++) {
    var k = i;
    if (0 <= i && i < 10) {
      k = "0" + i
    }
    days.push(k)
  }
}
// 获取小时
for (let i = 0; i <= 23; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  hours.push(k)
}
// 获取分钟
for (let i = 0; i <= 59; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  minutes.push(k)
}
// 给新的日期赋值
function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dateData: {
      type: Object,
      observer (val) {
        console.log(val)
        this.updatePicker()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: parseInt(thisMon) - 1,
    days: getDays(parseInt(thisMon) - 1),
    day: parseInt(thisDay) - 1,
    value: [0, parseInt(thisMon) - 1, parseInt(thisDay) - 1, 0, 0],
    hours: hours,
    hour: "00",
    minutes: minutes,
    minute: "00",
    show: false,
    firstColumnWidth: (wx.getSystemInfoSync().windowWidth - 248.5) / 2 + 53.5
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateDays (year, mon) {
      let count = monthDays[mon]
      if (count === 0) {
        count = year % 4 === 0 ? 29 : 28
      }
      getDays(count)
      this.setData({
        days: days
      })
    },
    updateDate (val) {
      const date = new Date(val)
      const year = date.getFullYear();
      const mon = date.getMonth();
      const day = date.getDate();
      const hour = date.getHours();
      const min = date.getMinutes();
      this.updateDays(year, mon)
      this.setData({
        year: years.indexOf(year),
        month: mon,
        day: day - 1,
        hour: hour,
        minute: min,
        value: [years.indexOf(year), mon, day - 1, hour, min]
      })
    },
    updatePicker () {
      const dateData = this.data.dateData
      let props = {
        show: dateData.show
      }
      if (dateData.date) {
        this.updateDate(dateData.date)
      }
      this.setData(props)
    },
    // 获取新的日期和时间
    bindChange: function (e) {
      const val = e.detail.value
      const pageData = this.data
      const year = pageData.year
      const month = pageData.month
      if (parseInt(val[1]) !== parseInt(month) || (month === 1 && years[val[0]] !== parseInt(year))) {
        this.updateDays(years[val[0]], val[1])
      }
      this.setData({
        year: val[0],
        month: val[1],
        day: val[2],
        hour: val[3],
        minute: val[4]
      })
    },
    cancel () {
      this.triggerEvent('cancel')
    },
    confirm () {
      const pageData = this.data
      const date = new Date(years[pageData.year], pageData.month, days[pageData.day], hours[pageData.hour], minutes[pageData.minute]).getTime()
      this.triggerEvent('confirm', date)
    },
    onSlotClick () {
      this.setData({
        show: true
      })
    }
  }
})
