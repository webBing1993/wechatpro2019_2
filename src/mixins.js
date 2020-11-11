import Vue from 'vue'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

Vue.mixin({
  data(){
    return{
        
    }
  },
  computed:{
      ...mapState([
      ]),

  },
  methods: {

      //时间格式处理
      datetimeparse (timestamp, format, prefix) {
          if (typeof timestamp =='string'){
              timestamp=Number(timestamp)
          }
          //转换时区
          let currentZoneTime = new Date (timestamp);
          let currentTimestamp = currentZoneTime.getTime ();
          let offsetZone = currentZoneTime.getTimezoneOffset () / 60;//如果offsetZone>0是西区，西区晚
          let offset = null;
          //客户端时间与服务器时间保持一致，固定北京时间东八区。
          offset = offsetZone + 8;
          currentTimestamp = currentTimestamp + offset * 3600 * 1000;

          let newtimestamp = null;
          if (currentTimestamp) {
              if (currentTimestamp.toString ().length >= 13) {
                  newtimestamp = currentTimestamp.toString ()
              } else if (currentTimestamp.toString ().length === 10) {
                  newtimestamp = currentTimestamp + '000'
              } else {
                  newtimestamp = null
              }
          } else {
              newtimestamp = null
          }
          let dateobj = newtimestamp ? new Date (parseInt (newtimestamp)) : new Date ()
          let YYYY = dateobj.getFullYear ()
          let MM = dateobj.getMonth () > 8 ? dateobj.getMonth () + 1 : '0' + (dateobj.getMonth () + 1)
          let DD = dateobj.getDate () > 9 ? dateobj.getDate () : '0' + dateobj.getDate ()
          let HH = dateobj.getHours () > 9 ? dateobj.getHours () : '0' + dateobj.getHours ()
          let mm = dateobj.getMinutes () > 9 ? dateobj.getMinutes () : '0' + dateobj.getMinutes ()
          let ss = dateobj.getSeconds () > 9 ? dateobj.getSeconds () : '0' + dateobj.getSeconds ()
          let output = '';
          let separator = '/'
          if (format) {
              separator = format.match (/-/) ? '-' : '/'
              output += format.match (/yy/i) ? YYYY : ''
              output += format.match (/MM/) ? (output.length ? separator : '') + MM : ''
              output += format.match (/dd/i) ? (output.length ? separator : '') + DD : ''
              output += format.match (/hh/i) ? (output.length ? ' ' : '') + HH : ''
              output += format.match (/mm/) ? (output.length ? ':' : '') + mm : ''
              output += format.match (/ss/i) ? (output.length ? ':' : '') + ss : ''
          } else {
              output += YYYY + separator + MM + separator + DD
          }
          output = prefix ? (prefix + output) : output

          return newtimestamp ? output : ''
      },

      idnumber: id => {
        return id.replace(id.slice(3, 14), '***********')
      },

      timeFetch () {
        var todayZero = new Date ();
        var todayEleven = new Date ();
        var today = {};
        todayZero.setHours (0);
        todayZero.setMinutes (0);
        todayZero.setSeconds (0);
        todayEleven.setHours (23);
        todayEleven.setMinutes (59);
        todayEleven.setSeconds (59);
        console.log ('今天零点：' + todayZero.getTime ());
        console.log ('23:59：' + todayEleven.getTime ());
        return today = {todayStart: todayZero.getTime (), todayEnd: todayEleven.getTime ()}
      },

      // 获取前七天或者后七天的日期
      fun_date(datestr, num) {
          var date1 = new Date(datestr);
          //今天时间
          var time1 = date1.getFullYear() + "/" + (date1.getMonth() + 1) + "/" + date1.getDate();
          console.log(time1);
          var date2 = new Date(date1);
          date2.setDate(date1.getDate() + num);
          //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
          let month = date2.getMonth() + 1;
          if (month < 10) {
              month = '0' + month;
          }
          let day = date2.getDate();
          if (day < 10) {
              day = '0' + day;
          }
          var time2 = date2.getFullYear() + "/" + month + "/" + day;
          console.log(time2);
          return time2;
      },

      // 获取星期
      fun_week(datestr){
          var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
          var week = weekArray[new Date(datestr).getDay()];
          console.log(week);
          return week;
      },

      // 获取所有日期  01/01 周五
      // getBetweenDateList(start,end){
      //     let result = [];
      //     let beginDay = start.split("/");
      //     let endDay = end.split("/");
      //     let diffDay = new Date();
      //     let dateList = new Array;
      //     let i = 0;
      //     diffDay.setDate(beginDay[2]);
      //     diffDay.setMonth(beginDay[1]-1);
      //     diffDay.setFullYear(beginDay[0]);
      //     result.push(this.datetimeparse(new Date(start).getTime(), 'MM/dd') + this.fun_week(start));
      //     while(i == 0){
      //         let countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
      //         diffDay.setTime(countDay);
      //         dateList[2] = diffDay.getDate();
      //         dateList[1] = diffDay.getMonth() + 1;
      //         dateList[0] = diffDay.getFullYear();
      //         if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1]}
      //         if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2]}
      //         result.push(dateList[1]+"/"+dateList[2] + this.fun_week(dateList[0]+"/" + dateList[1]+"/"+dateList[2]));
      //         if(dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]){ i = 1;
      //         }
      //     }
      //     console.log(result);
      //     return result;
      // },

      getBetweenDateList(start, end) {

          let startTime = this.getDate(start);

          let endTime = this.getDate(end);

          let dateArr = [];

          while ((endTime.getTime() - startTime.getTime()) > 0) {

              let year = startTime.getFullYear();

              let month = (startTime.getMonth() + 1).toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(),10) + 1) : (startTime.getMonth() + 1);

              let day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();

              dateArr.push(month + "/" + day + this.fun_week(startTime));

              startTime.setDate(startTime.getDate() + 1);

          }

          return dateArr;

      },



      getDate (datestr) {
        let temp = datestr.split("/");

        if (temp[1] === '01') {

            temp[0] = parseInt(temp[0],10) - 1;

            temp[1] = '12';

        } else {

            temp[1] = parseInt(temp[1],10) - 1;

        }

        //new Date()的月份入参实际都是当前值-1

          let date = new Date(temp[0], temp[1], temp[2]);

            return date;

      },

      // 获取所有日期
      getBetweenDateStr(start,end){
          let result = [];
          let beginDay = start.split("-");
          let endDay = end.split("-");
          let diffDay = new Date();
          let dateList = new Array;
          let i = 0;
          diffDay.setDate(beginDay[2]);
          diffDay.setMonth(beginDay[1]-1);
          diffDay.setFullYear(beginDay[0]);
          result.push(start);
          while(i == 0){
              let countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
              diffDay.setTime(countDay);
              dateList[2] = diffDay.getDate();
              dateList[1] = diffDay.getMonth() + 1;
              dateList[0] = diffDay.getFullYear();
              if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1]}
              if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2]}
              result.push(dateList[0]+"-"+dateList[1]+"-"+dateList[2]);
              if(dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]){ i = 1;
              }
          }
          console.log(result);
          return result;
      },
      // 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。num1被乘数 | num2乘数
      numMulti(num1, num2) {
          var baseNum = 0;
          try {
              baseNum += num1.toString().split(".")[1].length;
          } catch (e) {
          }
          try {
              baseNum += num2.toString().split(".")[1].length;
          } catch (e) {
          }
          return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
      },

      // 获取某月最后一天
      getCurrentMonthLast(time){
          var date=new Date(time);
          var currentMonth=date.getMonth();
          var nextMonth=++currentMonth;
          var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
          var oneDay=1000*60*60*24;
          var lastTime = new Date(nextMonthFirstDay-oneDay);
          var month = parseInt(lastTime.getMonth()+1);
          var day = lastTime.getDate();
          if (month < 10) {
              month = '0' + month
          }
          if (day < 10) {
              day = '0' + day
          }
          return date.getFullYear() + '-' + month + '-' + day;
      },

  },
  mounted () {
    
  },
});
