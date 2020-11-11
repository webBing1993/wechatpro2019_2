<template>
  <div>
    <div class="homeIndex">
      <div class="banner">
        <img src="../assets/banner.png" alt="">
      </div>
      <div class="hotelInfo">
        <div class="name">{{ hotelInfo.name }}</div>
        <div class="notice">{{ hotelInfo.notice }}</div>
        <div class="address">
          <div class="address_bg">
            <img src="../assets/bg_map.png" alt="">
          </div>
          <div class="address_content">
            <img src="../assets/ic_weizhi.png" alt="">
            <span>{{ hotelInfo.address }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="homeContent">
      <div class="calender">
        <div class="calenderBox" @click="openCheckDate">
          <div class="calender_box">
            <div class="box_left">
              <span>{{ ops.inDate ? (ops.inDate.split('/')[0] + '月' + ops.inDate.split('/')[1] + '日') : '' }}</span>
              <span>{{ ops.inDateType }}入住</span>
            </div>
            <div class="line">{{ dayNumber }}晚</div>
            <div class="box_right">
              <span>{{ ops.outDate ? (ops.outDate.split('/')[0] + '月' + ops.outDate.split('/')[1] + '日') : '' }}</span>
              <span>{{ ops.outDateType }}离店</span>
            </div>
          </div>
          <div class="more">
            <img src="../assets/ic_unfold_right_white.png" alt="">
          </div>
        </div>
      </div>
      <div class="lists">
        <div class="list" v-for="item in lists" @click="toBook(item)">
          <div class="list_container">
            <div class="img">
              <img :src="item.src" alt="">
            </div>
            <div class="content">
              <div class="title">{{ item.houseType }}</div>
              <div class="airct">
                <p>
                  <span>{{ item.area }}</span>
                  <span>{{ item.maxCount }}人入住</span>
                  <span>{{ item.notice }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="list_footer">
            <div class="footer_left">
              <div class="name">{{ item.produceName }}</div>
              <div class="remark">{{ item.remark }}</div>
            </div>
            <div class="footer_right">
              <div class="price">¥{{ (item.price/100).toFixed(2) }}</div>
              <div class="btns">
                <span class="payStatus">{{ item.status == 1 ? '到店付' : '已预付' }}</span>
                <span class="pay">
                  <span>预订</span>
                  <img src="../assets/ic_unfold_right_white.png" alt="">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="checkDate" v-if="isShowCheckDate">
      <div class="zhezhao" @click='closeDialog'></div>
      <div class="calendar-contaier">
        <div class="calendar">
          <div class="calendar-header">
            <div class="calendar-header-title">
              选择日期
          </div>
            <div class="close_dialog" @click='closeDialog'>
              <img src="../assets/ic-close.png">
            </div>
            <div class="calendar-week">
              <div class="sunday">日</div>
              <div>一</div>
              <div>二</div>
              <div>三</div>
              <div>四</div>
              <div>五</div>
              <div class="sunday">六</div>
            </div>
          </div>
          <div class="horizontal-line">
            <div class="calender-list"  v-for="(items, index) in dates">
              <div class="calendar-month_title">{{ months[index] }}</div>
              <div class="calendar-days">
                <div class="calendar-days_item" v-for="item in items">
                  <div @click="select(item.classNames, item.day, item.value)" :class="item.classNames ? (item.classNames + ' day') : 'day'">
                    {{ item.showDay }}
                </div>
                  <div @click="select(item.classNames, item.day, item.value)" :class="item.txt ? 'info':''">{{ item.txt }}</div>
                </div>
              </div>
            </div>
            <view class="vfd"></view>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import router from '../router/index.js'
import utils from '../tool/utils.js'
const _today = new Date().getTime();
const _tomorrow = _today + 24 * 3600 * 1000

export default {
  components: {

  },
  data () {
    return {
      hotelInfo: {
        name: '旅游管理学院智慧酒店',
        notice: '湖北省第一批转型发展试点院校',
        address: '湖北省武汉市经济技术开发区东风大道816号'
      },
      isShowCheckDate: false,
      start: null,
      end: null,
      date: null,
      months: [],
      dates: [],
      zh: {
        split: "/",
        rest: "休",
        work: "班",
        day: "日",
        week: "周",
        month: "月",
        year: "年",
        dayinfo: ["今天", "明天", "后天"],
      },
      classNames: {
        start: "start",
        end: "end",
        range: "range",
        bottom: "bottom",
        button: "button",
        enable: "enable",
        today: "today",
      },
      dayNumber: '',
      count: 3,
      current:0,
      festivaltag: {},
      cnfestivaltag: {},
      holidaytag: {},
      ops: {
        begin: '',
        end: '',
        typehood: 1,
        today: '',
        inDateType: '',
        outDateType: '',
        inDate:'',
        outDate:'',
      },
      toViewIndex: 1,
      today: utils.datetimeparse(_today, 'MM／DD'),
      lists: [
        {
          src: require('../assets/img_big_bed.png'),
          houseType: '智慧大床房',
          area: '35㎡',
          maxCount: '2',
          notice: '禁烟',
          price: 1,
          produceName: '学员专享价',
          remark: '仅入住当天18:00前可取消 不含早餐',
          status: 1,
        }
      ],
    }
  },
  methods: {
    ...mapActions([
      'goto'
    ]),
    toBook (item) {
      sessionStorage.setItem('bookItem', JSON.stringify(this.ops));
      sessionStorage.setItem('dayNumber', JSON.stringify(this.dayNumber));
      router.push('/book');
    },

    openCheckDate() {
      this.isShowCheckDate = true;
    },

    closeDialog() {
        this.isShowCheckDate = false;
    },

    datedifference(sDate1, sDate2,a='') {    //sDate1和sDate2是2006-12-18格式
      console.log(sDate1, sDate2);
      var dateSpan,
        iDays;
      if(!a){
        sDate1 = Date.parse(sDate1.replace(/\./g, "/"));
        sDate2 = Date.parse(sDate2.replace(/\./g, "/"));
      }

      dateSpan = sDate2 - sDate1;
      console.log(dateSpan / (24 * 3600 * 1000));
      iDays = dateSpan / (24 * 3600 * 1000);
      return  Math.round(iDays)
    },

    initStart (t, a) {
      if ("string" == typeof t && (t = t.replace(/\./g, "/")), t) return new Date(t);
      var e = new Date(a), s = e.getHours();
      return s >= 0 && s <= 5 && e.setDate(e.getDate() - 1), e.setHours(0), e.setMinutes(0),
        e.setSeconds(0), e.setMilliseconds(0), e;
    },
    initEnd (t, a) {
      if ("string" == typeof t && (t = t.replace(/\./g, "/")), t) return new Date(t);
      var e = new Date(a), s = e.getHours();
      return s >= 0 && s <= 5 || e.setDate(e.getDate() + 1), e.setHours(0), e.setMinutes(0),
        e.setSeconds(0), e.setMilliseconds(0), e;
    },
    initCalendar (t) {
      var a, e, s = t.today ? new Date(t.today) : new Date(), i = this.initStart(t.begin, s), n = this.initStart(t.begin, s), o = this.initEnd(t.end, s), d = this.initEnd(t.end, s), r = (a = t.start || n,
        e = new Date(Math.min(a, new Date())), new Date(e.getFullYear(), e.getMonth() + 1, 0)), h = [], l = [];
      s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0);
      this.today = s;
      this.start = n;
      this.end = d;
      this.date = r;
      console.log('this.ops', this.ops);
      let ops = this.ops;
      ops.begin = this.datetimeparse(i, "yyyy.MM.dd");
      ops.end = this.datetimeparse(o, "yyyy.MM.dd");
      ops.inDate = this.datetimeparse(i, 'MMdd');
      ops.outDate = this.datetimeparse(o, 'MMdd');
      ops.inDateType = this.fun_week(i);
      ops.outDateType = this.fun_week(o);
      let day = this.datedifference(ops.begin,ops.end);
      for (var g = 0; g < this.count; g++ , this.toViewIndex++) {
        var u = new Date(r.getFullYear(), r.getMonth() + g, 1);
        l.push(u.getFullYear() + "年" + (u.getMonth() + 1) + "月"), h.push(this.createDate(u));
      }
      this.dates = h;
      this.months = l;
      this.ops = ops;
      this.dayNumber = day;
    },
    select (classNames, day, value) {
      var a = day, e = classNames, s = this.ops.typehood, w = this.datetimeparse(new Date(new Date(day).toLocaleDateString()).getTime() + 24*60*60*1000, 'yy/MM/dd');
      console.log(classNames, day, value, w, new Date(new Date(day).toLocaleDateString()).getTime() + 24*60*60*1000);
      if (a && !("" === e || 3 == s && e.includes("disabled"))) {
        var i = this.start, n = this.end, o = new Date(a), d = Math.min(this.start, this.today), r = Math.round((o - d) / 864e5);
        Math.round((o - new Date(i)) / 864e5);
        if (!(r < 0) || this.isLateMightModel(o)) {
            console.log(5553, this.start, this.end);
          if (this.start && +o == +this.start && !this.end){
//            this.$message({
//              type: 'info',
//              message: '请选择离店日期'
//            });
            this.start = new Date(a);
            this.end = new Date(w);
          }
          if (o < this.start && !this.end) this.start = new Date(a),this.end = new Date(w),void this.onChange(a, o, null);
          if (!this.start || this.getDateString(a, "-") != this.getDateString(this.start, "-") || this.end) return i && n ? (this.start = new Date(a), this.end = new Date(w), void this.onChange(a, this.start, this.end)) : i && !n ? (this.start = new Date(i),this.end = new Date(a), void this.onChange(a, this.start, this.end)) : i || n ? void 0 : (this.start = new Date(a), this.end = new Date(w), void this.onChange(a, this.start, this.end));
        }
      }
    },
    onChange (t, a, i) {
        console.log(11, t, a, i, this.ops, this.end);
      if(a != null && i == null && this.end == null){
        this.$vux.toast.text('请选择离店日期', 'middle');
      }
      var n = this, o = n.dates, d = 1 == n.ops.typehood || 3 == n.ops.typehood ? "入住" : "入住", r = 1 == n.ops.typehood || 3 == n.ops.typehood ? "离店" : "离店", h = !1;
      if (o.map(function (t, e) {
          t.map(function (t, e) {
            var s = new Date(a), o = new Date(i), l = new Date(t.day);
            3 == n.ops.typehood && l > s && l < o && t.disabled && (h = !0);
            var g = n.getItemClass(t.day, t.day.split("/")[2], a, i);
            t.classNames = g, t.txt = +n.start == +new Date(t.day) ? d : +n.end == +new Date(t.day) ? r : "";
          });
        }), 3 == n.ops.typehood && h) this.$message({
        type: 'error',
        message: '选择日期中包含不可选日期'
      }); else if (this.dates = o, this.start && this.end) {

        let ops = this.ops;
        ops.begin = this.start ? this.datetimeparse(this.start, "yyyy.MM.dd") : '';
        ops.end = this.end ? this.datetimeparse(this.end, "yyyy.MM.dd") : '';
        ops.inDate = this.start ? this.datetimeparse(this.start, "MMdd") : '';
        ops.outDate = this.end ? this.datetimeparse(this.end,"MMdd") : '';
        ops.inDateType = this.fun_week(this.start);
        ops.outDateType = this.fun_week(this.end);
        let day = this.datedifference(ops.begin,ops.end);
        let maxDay = 31;
        if(day>maxDay){
          this.$vux.toast.text('超过最长入住天数'+ maxDay+'天', 'middle');
          return
        }
        this.ops = ops;
        console.log('this.ops', this.ops);
        this.dayNumber = day;
        if (ops.outDate != ''){
          this.isShowCheckDate = false;
        }
      }
    },
    getShowDate (t, a) {
      var e = new Date(a);
      if (e) {
        if (this.isLateMightModel(e)) return "深夜";
        var s = this.getFestivaltag([e.getFullYear(), e.getMonth() + 1, e.getDate()].join("-")), i = Math.min(this.start, this.today), n = Math.round((new Date(a + " 00:00:00") - i) / 864e5);
        return this.getDateString(this.start) == this.getDateString(new Date(a)) ? e.getDate() : this.getDateString(this.end) == this.getDateString(new Date(a)) ? e.getDate() : 0 == n ? this.zh.dayinfo[0] : s || e.getDate();
      }
    },
    getDateString (t, a) {
      return "string" == typeof t && (t = new Date(t)), a = a || this.zh.split, [t.getFullYear(), t.getMonth() + 1, t.getDate()].join(a);
    },
    getDay (t, a, e) {
      this.festivaltag[a], this.select;
      return e;
    },
    getFestivaltag (t) {
      var a = [t.split("-")[1], t.split("-")[2]].join("-");
      return this.festivaltag[a] || this.getCnfestivaltag(t);
    },
    getCnfestivaltag (t) {
      return this.cnfestivaltag[t];
    },
    getHolidaytag (t) {
      var a = new Date(t), e = [a.getFullYear(), a.getMonth() + 1, a.getDate()];
      return this.holidaytag[e.join("-")];
    },
    getFestival (t) {
      var a = [this.date.getFullYear(), this.date.getMonth() + 1, txt], e = this.getHolidaytag[a.join("-")];
      new Date(a.join("/"));
      return e;
    },
    getItemClass (t, a, e, s) {
      if (t) {
        var i = new Date(t), n = [i.getFullYear(), i.getMonth() + 1, i.getDate()].join("-"), o = this.getFestivaltag(n), d = this.getHolidaytag(n), r = Math.min(this.start || new Date(), this.today), h = Math.round((i - r) / 864e5), l = new Date(e), g = new Date(s), u = [];
        t = i.getDay();
        return (h >= 0 || this.isLateMightModel(i)) && (u.push(this.classNames.enable),
        (0 == t || 6 == t || o || d) && (d && "班" == d[0] ? u.push("work") : u.push("sunday"))),
          this.ops.typehood, 0 == h && u.push(this.classNames.today), this.getDateString(i) == this.getDateString(l) && (u = [this.classNames.start],
          this.toView = "toView_" + this.toViewIndex), i > l && i < g && (u = [this.classNames.range]), a && e && this.getDateString(i) == this.getDateString(g) && (u = [this.classNames.end]),
          a ? u.join(" ") : "";
      }
    },
    createDate: function (t) {
      for (var a = [], e = (t.getDate(), new Date(t.getFullYear(), t.getMonth(), 1).getDay()), s = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate(), i = {
        day: "",
        value: "",
        showDay: ""
      }, n = 43 - (42 - s - e), o = 1; o < n; o++) {
        var d = new Date(t.getFullYear(), t.getMonth(), o - e, 0, 0, 0), r = (Math.round((d - this.today) / 864e5),
          this.getDateString(d));
        if (o > e && o <= s + e) {
          var h = this.getDay(d, r, o - e), l = this.getItemClass(r, h, this.start, this.end), g = 1 == this.ops.typehood || 3 == this.ops.typehood ? "入住" : "入住", u = 1 == this.ops.typehood || 3 == this.ops.typehood ? "离店" : "离店";
          i = {
            day: r,
            value: h,
            showDay: this.getShowDate(o, r),
            classNames: l,
            work: l.match("sunday") ? "休" : l.match("work") ? "班" : "",
            txt: +this.start == +new Date(r) ? g : +this.end == +new Date(r) ? u : "",
            disabled: !(3 != this.ops.typehood || !l.includes("disabled"))
          };
        }
        a.push(i);
      }
      return a;
    },
    isLateMightModel: function (t) {
      return new Date().getHours() < 5 && +t + 864e5 == +this.today;
    },
  },
  watch: {

  },
  computed: {
    ...mapState([
      'route',
      'Interface'
    ])
  },
  mounted () {
//      console.log(this.$route.query.room);
//      console.log(this.$route.query.hotelId);
//      sessionStorage.setItem('roomNo',this.$route.query.room);
//      sessionStorage.setItem('hotelId',this.$route.query.hotelId);
//      window.scrollTo(0,0);
    if (sessionStorage.getItem('bookItem')) {
        this.ops = JSON.parse(sessionStorage.getItem('bookItem'));
    }
    this.initCalendar(this.ops);
  }
}
</script>
<style lang="less" scoped>

  .homeIndex {
    position: relative;
    padding-top: 11rem;
    .banner {
      width: 100%;
      height: 12.3rem;
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .hotelInfo {
      background: #FFFFFF;
      box-shadow: 0 1px 4px 0 rgba(0,0,0,0.05);
      border-radius: 10px;
      width: 100vw;
      .name {
        padding: 1.7rem 1.1rem 0.8rem;
        font-weight: bold;
        font-size: 20px;
        color: #333333;
        border-radius: 10px 10px 0 0;
      }
      .notice {
        padding: 0 15px;
        font-size: 12px;
        color: #888888;
      }
      .address {
        height: 54px;
        position: relative;
        margin-top: 1.2rem;
        border-radius: 0 0 10px 10px;
        .address_bg {
          width: 100%;
          height: 100%;
          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 0 0 10px 10px;
          }
        }
        .address_content {
          display: flex;
          width: 100%;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          justify-content: flex-start;
          img {
            width: 16px;
            height: 16px;
            margin: 0 7px 0 16px;
          }
          span {
            font-size: 14px;
            color: #333333;
          }
        }
      }
    }
  }

  .homeContent {
    margin-top: 1rem;
    background: #FFFFFF;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.05);
    border-radius: 10px;
    padding: 1.3rem 0;
    .calender {
      padding: 0 1.2rem;
      .calenderBox {
        background-image: linear-gradient(165deg, #82B8FB 0%, #768AFE 76%);
        border-radius: 4px;
        padding: 1.5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .calender_box {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          width: 90%;
          .box_left, .box_right {
            span:first-of-type {
              font-size: 14px;
              color: #FFFFFF;
              font-weight: bold;
            }
            span:last-of-type {
              font-size: 12px;
              color: #DBDFFF;
            }
          }
          .line {
            font-size: 10px;
            color: #ECEEFF;
            transform: scale(0.8);
            border-bottom: 1px solid #D7DBFF;
          }
        }
        .more {
          img {
            width: 1.1rem;
            height: 1.1rem;
          }
        }
      }
    }
    .lists {
      margin-top: 1.8rem;
      .list {
        .list_container {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0 1.2rem 1.4rem;
          .img {
            width: 6rem;
            height: 6.6rem;
            margin-right: 1rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .content {
            .title {
              font-size: 18px;
              color: #333333;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .airct {
              font-size: 12px;
              color: #888888;
              p {
                width: 100%;
                span {
                  margin-right: 15px;
                }
              }
            }
          }
        }
        .list_footer {
          background-image: linear-gradient(180deg, #F7F7F7 0%, rgba(255,255,255,0.05) 67%, rgba(255,255,255,0.00) 100%);
          padding: 1.3rem 1.2rem 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .footer_left {
            .name {
              font-size: 14px;
              color: #333333;
              font-weight: bold;
              margin-bottom: 8px;
            }
            .remark {
              font-size: 12px;
              color: #888888;
            }
          }
          .footer_right {
            .price {
              font-family: Georgia-Bold;
              font-size: 20px;
              letter-spacing: 0.75px;
              color: #FF5870;
              text-align: right;
            }
            .btns {
              background-image: linear-gradient(157deg, #FEA392 0%, #FF5870 100%);
              box-shadow: 0 2px 5px 0 rgba(255,88,112,0.50);
              border-radius: 30px;
              display: inline-flex;
              align-items: center;
              justify-content: space-between;
              padding: 7px;
              .payStatus {
                font-size: 10px;
                color: #FFFFFF;
                transform: scale(0.8);
              }
              .pay {
                padding-left: 6px;
                font-size: 14px;
                color: #FFFFFF;
                font-weight: bold;
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                img {
                  width: 1.1rem;
                  height: 1.1rem;
                }
              }
              .pay:before {
                content: '';
                display: block;
                width: 1px;
                height: 15px;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                background-color: #febbbe;
              }
            }
          }
        }
      }
    }
  }


  .checkDate{

  }

  .zhezhao{
    background: rgba(0, 0, 0,0.6);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 4;
  }

  .calendar-contaier {
    width: 86vw;
    background: #FDFDFD;
    border-radius: 24px;
    z-index:1000;
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .horizontal-line {
      height: 24rem;
      overflow-y: scroll;
    }
  }
  .close_dialog{
    position:absolute;
    top:0;
    right:0;
    width: 4.6rem;
    height: 4.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
  .sunday {
    color: #6B7AFF;
  }
  .calendar-header {

  }

  .calendar-header-title{
    height: 4.6rem;
    line-height: 4.6rem;
    font-family: SourceHanSansCN-Medium;
    font-size: 18px;
    color: #333333;
    text-align:center;
  }

  .calendar-week {
    display: flex;
    padding: 0 1.8rem;
    align-items: center;
    justify-content: space-between;
  }

  .calendar-week div {
    flex: 1;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    line-height: 32px;
  }

  .calender-scoll {
    padding-bottom: 24px;
  }

  .calendar-month_title {
    font-size: 14px;
    color: #888888;
    height: 3.4rem;
    text-align: center;
    line-height: 3.4rem;
  }

  .calender-list {
    overflow: hidden;
  }

  .calendar-days {
    height: auto;
    padding: 0 1.8rem;
  }

  .calendar-days_item {
    float: left;
    width: 14.2857143%;
    height: 45px;
    position: relative;
    margin-bottom: 10px;
  }

  .calendar-days_item .day {
    width: 100%;
    text-align: center;
    line-height: 48px;
    font-size: 14px;
  }

  .calendar-days_item .start,.calendar-days_item .end {
    box-sizing: border-box;
    height: 100%;
    line-height: 16px;
    padding-top: 8px;
    padding-bottom: 24px;
    background-color: #6B7AFF;
    color: #fff;
  }

  .calendar-days_item .start {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .calendar-days_item .end {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .calendar-days_item .info {
    position: absolute;
    z-index: 99;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
    color: #fff;
    font-size: 12px;
    bottom: 4px;
    width: 100%;
    text-align: center;
  }

  .calendar-days_item .rest,.calendar-days_item .work1 {
    position: absolute;
    top: 3px;
    right: 5px;
    width: auto;
    font-size: 14px;
    height: 12px;
    line-height: 6px;
  }

  .calendar-days_item .rest {
    color: #6B7AFF;
  }

  .calendar-days_item .range {
    background-color:  #E7E9FD;
    height: 100%;
  }

  .calendar-days .calendar-days_item .range {
    display: block;
    color: #000;
  }

  .calendar-days_item .range .info {
    color: #6B7AFF;
  }

  .calendar-days_item .enable {
    color: #666666;
  }

  .calendar-days_item div {
    color: #cccccc;
  }

  .calendar-days_item .sunday {
    color: #6B7AFF !important;
  }

  .calendar-days_item .disabled {
    color: #cccccc !important;
  }


</style>
