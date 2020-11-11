<template>
  <div>
    <div class="book">
      <div class="header"></div>
      <div class="houseInfo">
        <div class="info">
          <div class="list">
            <div class="name">预订房型</div>
            <div class="value">智慧大床房</div>
          </div>
          <div class="list">
            <div class="name">入离时间</div>
            <div class="value">{{ orderList.inDate.split('/')[0] + '月' + orderList.inDate.split('/')[1] + '日' + ' - ' +  orderList.outDate.split('/')[0] + '月' + orderList.outDate.split('/')[1] + '日&nbsp;&nbsp;' + '共' + dayNumber + '晚' }}</div>
          </div>
        </div>
        <div class="orderInfo">
          <el-form ref="form" :model="changeItem" label-width="100px">
            <el-form-item label="预订类型">
              <el-radio-group v-model="changeItem.type" @change="radioChange">
                <el-radio :label=1>散客</el-radio>
                <el-radio :label=0>团队</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="房间数">
              <div class="roomCount">
                <div v-if="changeItem.type == 1">
                  {{ changeItem.roomCount }}间
                    <span>每间最多住2人</span>
                </div>
                <div id="trigger" v-else>
                  <div class="triggerContent">
                    <div>
                      {{ changeItem.roomCount }}间
                    <span>每间最多住2人</span>
                    </div>
                    <img src="../assets/ic_unfold_right_grey.png" alt="">
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="预订人">
              <el-input v-model="changeItem.owner" placeholder="请输入预订人姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="changeItem.ownerTel" oninput="if(value.length > 11)value=value.slice(0, 11)" type="number" placeholder="请输入预订人手机号"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footer">   <!--v-if="footerShow"-->
        <div class="total">
          <span>总计 <span>¥</span></span>
          <span class="price">0.01</span>
        </div>
        <div class="btns">
          <button @click="payBtn" class="payBtn">到店付</button>
        </div>
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
import MobileSelect from 'mobile-select'

import { ToastPlugin,LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
const Today = new Date().getTime();
const Tomorrow = Today + 24 * 3600 * 1000;

export default {
  components: {

  },
  data () {
    return {
      orderList: {
        begin: '',
        end: '',
        typehood: 1,
        today: '',
        inDateType: '',
        outDateType: '',
        inDate:'',
        outDate:'',
      },
      dayNumber: '',
      changeItem: {
        type: 1,
        roomCount: 1,
        owner: sessionStorage.getItem('owner') ? sessionStorage.getItem('owner') : '',
        ownerTel: sessionStorage.getItem('ownerTel') ? parseFloat(sessionStorage.getItem('ownerTel')) : '',
      },
      footerShow: true
    }
  },
  methods: {
    ...mapActions([
      'goto',
      'resource',
    ]),

      radioChange(val) {
        let that = this;
        if (val == 0) {
          new MobileSelect({
            trigger: "#trigger",
            title: "房间数选择",
            wheels: [
              {data: ["1","2","3","4","5"]}
            ],
            callback:function(indexArr, data){
              console.log(data,indexArr);
              that.changeItem.roomCount = data[0];
              that.htmlVal(data, require('../assets/ic_unfold_right_grey.png'));
            }
          })
        }else {
          that.changeItem.roomCount = 1;
        }
      },

      htmlVal(val, src) {
        let MyComponent = Vue.extend({
          template: '<div><div class="triggerContent" style="display: flex;align-items: center;justify-content: space-between;font-size: 14px;color: #333333;font-weight: bold;"><div>'+ val[0] +'间<span style="font-size: 12px;color: #999999;margin-left: 8px;font-weight: normal;">每间最多住2人</span></div><img src="'+ src +'" alt="" style="width: 1.1rem;height: 1.1rem;display: inline-flex"></div></div></div>',
        });
        let component = new MyComponent().$mount();
        let dom = document.querySelector("#trigger");
        console.log(dom);
        while (dom.hasChildNodes()) {
          dom.removeChild(dom.firstChild);
        }
        dom.appendChild(component.$el);
      },

      focusevent(){

      },
      blurevent(){
          window.scrollTo(0,0);
          console.log(document.body.scrollTop)
      },
      payBtn() {
        if (this.changeItem.owner === '' || this.changeItem.ownerTel === '') {
          this.$vux.toast.text('请填写完整信息', 'middle');
          return
        }else if (this.changeItem.ownerTel.toString().length != 11) {
          this.$vux.toast.text('请填写正确的手机号', 'middle');
          return
        }else {
          let _this = this;
          let data = {
            'hotelId': 'c1f98e947d45428f9a146ba084e0a5b5',
            'inTime': new Date(new Date(this.orderList.begin + ' ' + this.datetimeparse(new Date().getTime(), 'hh:mm:ss'))).getTime(), // 入住时间
            'outTime': new Date(new Date(this.orderList.begin).toLocaleDateString()).getTime() + 3*24*60*60*1000/2, // 离店时间
            'totalfee': '1', // 总费用
            'owner': this.changeItem.owner,
            'ownerTel': this.changeItem.ownerTel,
            'type': this.changeItem.type,
          };
          let arr = [];
          for (var i = 0; i < this.changeItem.roomCount; i++) {
              let obj = {
                'roomTypeName': '行政大床', // 房型名称
                'roomPrice': '1', // 单价
                'breakfast': '0', // 每个房间早餐份数,
                'roomNo': ''
              };
              arr.push(obj)
          }
          data.subOrders = arr;
          axios.post('http://qa.fortrun.cn:19761/wqtorder/wechat/add', data)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.errcode == 0) {
                  sessionStorage.setItem('owner', _this.changeItem.owner);
                  sessionStorage.setItem('ownerTel', _this.changeItem.ownerTel);
                  _this.$vux.loading.hide();
                  _this.$vux.toast.text('预订成功', 'middle');
                  router.push({path: '/bookDetail', query: {roomCount: _this.changeItem.roomCount}})
                }else {
                  _this.$vux.loading.hide();
                  _this.$vux.toast.text(response.data.errmsg, 'middle');
                }
            })
            .catch(function (response) {
              console.log(response);
              _this.$vux.loading.hide();
              _this.$vux.toast.text(response.data.errmsg, 'middle');
            })
        }
      },
  },
  watch: {

  },
  computed: {
    ...mapState([
      'route'
    ])
  },
  mounted () {
    this.orderList = JSON.parse(sessionStorage.getItem('bookItem'));
    this.dayNumber = sessionStorage.getItem('dayNumber') ? sessionStorage.getItem('dayNumber') : 1;
    console.log('orderList', this.orderList);
    let that = this;
    let screenHeight = document.body.offsetHeight;
    window.onresize = function () {
      let nowHeight = document.body.offsetHeight;
      if (nowHeight < screenHeight) {
        that.footerShow = false;
      } else {
        that.footerShow = true;
      }
    }
  }
}
</script>
<style lang="less" scoped>

  .book {
    .header {
      position: fixed;
      left: 0;
      top: 0;
      background-image: linear-gradient(0deg, #F7F7F7 27%, #6B7AFF 87%);
      width: 100vw;
      height: 26.8rem;
      z-index: -1;
    }
    .houseInfo {
      padding: 1.9rem 1.2rem;
      .info {
        background: #FFFFFF;
        box-shadow: 0 1px 5px 0 rgba(0,0,0,0.05);
        border-radius: 6px;
        padding: 0.9rem 0;
        .list {
          padding: 3px 0.9rem;
          line-height: 40px;
          height: 40px;
          position: relative;
          .name {
            font-size: 14px;
            color: #A8A8A8;
          }
          .value {
            font-size: 16px;
            color: #333333;
            font-weight: bold;
            position: absolute;
            left: 100px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .orderInfo {
        margin-top: 14px;
        background: #FFFFFF;
        box-shadow: 0 1px 5px 0 rgba(0,0,0,0.05);
        border-radius: 6px;
        padding: 3px 0;
        /deep/ .el-form-item__label {
          text-align: left;
          font-size: 14px;
          color: #A8A8A8;
          padding-left: 12px;
        }
        /deep/ .el-radio {
          -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        /deep/ .el-form-item {
          margin-bottom: 0;
          .el-form-item__content {
            padding-right: 12px;
            font-size: 14px;
            color: #333333;
            font-weight: bold;
          }
        }
        /deep/ .el-input__inner {
          border: none;
          outline: none;
          padding: 0;
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        /deep/ .el-input__inner:-moz-placeholder {
          font-weight: normal !important;
        }
        /deep/ .el-input__inner:-ms-input-placeholder {
          font-weight: normal !important;
        }
        /deep/ .el-input__inner::-moz-placeholder {
          font-weight: normal !important;
        }
        /deep/ .el-input__inner::-webkit-input-placeholder {
          font-weight: normal !important;
        }
        /deep/ .is-checked {
          color: #333333 !important;
        }
        /deep/ .el-radio__label {
          font-weight: bold;
        }
        .roomCount {
          font-size: 14px;
          color: #333333;
          #trigger {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            .triggerContent {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 14px;
              color: #333333;
              font-weight: bold;
              span {
                font-size: 12px;
                color: #999999;
                margin-left: 8px;
                font-weight: normal;
              }
              img {
                width: 1.1rem;
                height: 1.1rem;
              }
            }
          }
          span {
            font-size: 12px;
            color: #999999;
            margin-left: 8px;
            font-weight: normal;
          }
        }
      }
    }
    .footer {
      /*position: fixed;*/
      /*bottom: 0;*/
      /*left: 0;*/
      /*width: calc(100vw - 2.4rem);*/
      margin-top: calc(100vh - 350px - 6rem);
      padding: 0.8rem 1.2rem 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #FFFFFF;
      box-shadow: 0 0 6px 0 rgba(0,0,0,0.07);
      .total {
        span {
          font-size: 10px;
          color: #888888;
          span {
            color: #FF5870;
          }
        }
        .price {
          font-family: Georgia;
          font-size: 20px;
          letter-spacing: 0.62px;
          font-weight: bold;
          color: #FF5870;
        }
      }
      .btns {
        .payBtn {
          background-image: linear-gradient(156deg, #93C3FF 0%, #6E7EFF 88%);
          box-shadow: 0 3px 7px -2px #8DB1FF;
          border-radius: 19px;
          line-height: 2.7rem;
          height: 2.7rem;
          width: 9.6rem;
          font-size: 14px;
          color: #FFFFFF;
          border: none;
          outline: none;
        }
      }
    }
  }

</style>
