<template>
  <div>
    <div class="cot">
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
          <input type="text" placeholder="请输入房间" v-model="roomNo" disabled >
        </p>
        <p class="inputBox">
          <span >姓名</span>
          <input type="text" placeholder="请输入姓名" v-model="owner" id="name1" @focus="focusevent" @blur="blurevent">
        </p>
        <p class="inputBox">
          <span >手机号</span>
          <input type="text" placeholder="请输入手机号" v-model="ownerTel" id="phone1" @focus="focusevent" @blur="blurevent">
        </p>
      </div>

      <div class="bottomPayBtn">
        <p style="width: 40%">应付款：<span style="color: #4bad99;font-size: 20px;font-weight: 500">¥316</span></p>
        <p class="pushBtn" @click="confirmOrder">提交订单</p>
      </div>
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
      focusevent(){

      },
      blurevent(){
          window.scrollTo(0,0);
          console.log(document.body.scrollTop)
      },
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
        axios.post('http://qa.fortrun.cn:19761/wqtorder/wechat/add', obj)
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
  }
}
</script>
<style lang="less" scoped>
  .cot{
    padding: 0 1rem;
    height: 100%;
    width:100%;
    position: relative;
    bottom: 0
  }
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
  left:0;
  right:0;
  position: absolute;
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
