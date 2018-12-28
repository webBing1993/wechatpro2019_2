<template>
  <div style="padding: 0 1rem;height: 100%;width:100%;position: fixed;top: 0;bottom: 0">
    <br>
    <h2>微信智慧酒店</h2>
    <br>
    <div class="detail">
      <p>
        <span>
              <img src="../assets/logo1.jpg" height="56" width="56"/>
          入住 <span>{{today}}</span>
      </span>
        <span>
          离店 <span>{{tomorrow}}</span>
        </span>
        <span>共一晚</span>
      </p>
      <p>
        <span>
              <img src="../assets/logo2.jpg" height="56" width="56"/>
          标准房
      </span>
        <span style="margin-left: 1rem">
          双早
        </span>
      </p>
    </div>
    <br>
    <div>
      <p class="inputBox">
        <span >房间</span>
        <input type="text" placeholder="请输入房间" v-model="roomNo" disabled>
      </p>
      <p class="inputBox">
        <span >姓名</span>
        <input type="text" placeholder="请输入姓名" v-model="owner">
      </p>
      <p class="inputBox">
        <span >手机号</span>
        <input type="text" placeholder="请输入手机号" v-model="ownerTel">
      </p>
    </div>

    <div class="bottomPayBtn">
      <p style="width: 40%">应付款：<span style="color: #4bad99;font-size: 20px;font-weight: 500">¥316</span></p>
      <p class="pushBtn" @click="confirmOrder">提交订单</p>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'
import {mapActions, mapState} from 'vuex'
import router from '../router/index.js'
import utils from '../tool/utils.js'
import axios from 'axios'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
// import {Cell} from 'vux'
const Today = new Date().getTime();
const Tomorrow = Today + 24 * 3600 * 1000;

export default {
  components: {

  },
  data () {
    return {
      roomNo: '201',
      owner: '',
      ownerTel: '',
      today: utils.datetimeparse(Today, 'MM／DD'),
      tomorrow: utils.datetimeparse(Tomorrow, 'MM／DD')
    }
  },
  methods: {
    ...mapActions([
      'goto',
      'book',
      'resource',
      'showToast'
    ]),
    confirmOrder () {
      if (this.owner === '' || this.ownerTel === '') {
        this.$vux.toast.show({
          text: '请填写完整信息'
        })
      } else {
        let obj = {
          'hotelId': '7a64f7504bab436590528d8b5b809e3a', // 酒店id
          'inTime': Today, // 入住时间
          'outTime': Tomorrow, // 离店时间
          'totalfee': '31600', // 总费用
          'owner': this.owner,
          'ownerTel': this.ownerTel,
          'subOrders': [
            {
              'roomTypeName': '标准间', // 房型名称
              'roomPrice': '31600', // 单价
              'breakfast': '2', // 每个房间早餐份数,
              roomNo: this.roomNo
            }
          ]
        }
        console.log(obj)
           let _this=this;
        axios.post('https://wqt.fortrun.cn/cloud/base-order/wqtorder/wechat/add', obj)
          .then(function (response) {
            console.log(response)
              _this.$vux.toast.show({
                  text: '预定成功'
              })
            router.push({path: '/bookDetail', query: {owner: obj.owner, phone: obj.ownerTel}})
          })
          .catch(function (response) {
            console.log(response)
              _this.$vux.toast.show({
                  text: '预定失败'
              })
          })
        // router.push('/bookDetail')
        // this.resource({
        //   body: JSON.stringify(obj),
        //   onSuccess: (body, headers) => {
        //     this.showToast({text: '下单成功', time: 2000})
        //     this.goto({path: 'bookDetail', query: {owner: this.owner, phone: this.ownerTel}})
        //   }
        // })
      }
    },
    showToast (ctx, param) {
      // console.log('param:',param)
      ctx.commit('TOAST',
        {
          show: true,
          text: param.text ? param.text : '操作成功',
          time: param.time ? param.time : 800
        }
      )
    }
  },
  watch: {

  },
  computed: {
    ...mapState([
      'route'
    ])
  },
  mounted () {
      var brower = navigator.userAgent.toLowerCase();
      console.log('brower:',brower)
      var wx=false;
      if(brower.match(/WindowsWechat/i)=="WindowsWechat"||brower.match(/MicroMessenger/i)=="MicroMessenger") {
          wx=true
      };
      console.log('wx:',wx)
      // var u = navigator.userAgent
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //这个判断 是不是ios手机
      var flag
      var myFunction
      if(wx){ //既是微信浏览器 又是ios============（因为查到只有在微信环境下，ios手机上才会出现input失去焦点的时候页面被顶起）
          document.body.addEventListener('focusin', () => {  //软键盘弹起事件
              flag=true
              clearTimeout(myFunction);
          })
          document.body.addEventListener('focusout', () => { //软键盘关闭事件
              flag=false
              if(!flag){
                  myFunction = setTimeout(function(){
                      window.scrollTo(0,0)//重点  =======当键盘收起的时候让页面回到原始位置
                  },200);
              }else{
                  return
              }
          })
      }
      const h = document.body.scrollHeight  // 用onresize事件监控窗口或框架被调整大小，先把一开始的高度记录下来
      window.onresize = function () { // 如果当前窗口小于一开始记录的窗口高度，那就让当前窗口等于一开始窗口的高度
          console.log('h:',h)
          if (document.body.scrollHeight < h) {
              document.body.style.height = h
          }
      };
      console.log('h:',h)
  }
}
</script>
<style lang="less" scoped>
.detail{
   width: 70%;
   p{
     color: #a9a9a9;
     display: flex;
     justify-content: space-between;
     &:nth-child(2){
       justify-content:left;
     }
      img{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 10px;
      }

    }
}
.inputBox{
    height: 3.5rem;
    line-height: 3.5rem;
    border-bottom: 1px solid #f3f3f3;
  span{
    font-size: 15px;
    font-weight: 400;
    margin-right: 3rem;
    &:first-child{
      display: inline-block;
      width: 4rem;
    }
  }
  input{
    outline: none;
    border: none;
    font-size: 15px;
    background-color: #FFFFFF;
  }
}
.bottomPayBtn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  margin-left: -10px;
  height: 4rem;
  position: fixed;
  bottom: 0;
  border-top:1px solid #eeeeee;
}
  .pushBtn{
    width: 8rem;
    text-align: center;
    height: 100%;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 4rem;
    background: linear-gradient(to right, #00e2a8, #1bdbea);

  }
</style>
