<template>
  <div>
    <div class="detail">
      <div class="banner">
        <div class="bg">
          <img src="../assets/bg_success.png" alt="">
        </div>
        <div class="bannerTitle">
          <img src="../assets/ic_success.png" alt="">
          <div class="title">预订成功</div>
        </div>
      </div>
      <div class="detail_content">
        <div class="hotelInfo">
          <div class="name">{{ hotelInfo.name }}</div>
          <div class="notice">
            智慧大床房
            <span>{{ roomCount }}间</span>
          </div>
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
        <div class="orderInfo">
          <el-form ref="form" :model="obs" label-width="100px">
            <el-form-item label="住离时间">
              <span>
                {{ obs.inDate.split('/')[0] + '月' + obs.inDate.split('/')[1] + '日' + ' - ' +  obs.outDate.split('/')[0] + '月' + obs.outDate.split('/')[1] + '日&nbsp;&nbsp;' + '共' + dayNumber + '晚' }}
              </span>
            </el-form-item>
            <el-form-item label="预订人">
              <span>{{ owner }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ ownerTel }}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <button class="footerBtn" @click="goBack">返回首页</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import router from '../router/index.js'
export default {
  components: {},
  data () {
    return {
      hotelInfo: {
        name: '旅游管理学院智慧酒店',
        notice: '湖北省第一批转型发展试点院校',
        address: '湖北省武汉市经济技术开发区东风大道816号'
      },
      obs: {
        begin: '',
        end: '',
        typehood: 1,
        today: '',
        inDateType: '',
        outDateType: '',
        inDate:'',
        outDate:'',
      },
      roomCount: 1,
      dayNumber: sessionStorage.getItem('dayNumber') ? sessionStorage.getItem('dayNumber') : 1,
      owner: sessionStorage.getItem('owner') ? sessionStorage.getItem('owner') : '',
      ownerTel: sessionStorage.getItem('ownerTel') ? parseFloat(sessionStorage.getItem('ownerTel')) : '',
    }
  },
  methods: {
    ...mapActions([

    ]),

    // 返回首页
    goBack() {
      window.history.go(-2);
    },
  },
  watch: {},
  computed: {
    ...mapState([
      'route',
      'Interface'
    ])
  },
  mounted () {
      console.log(this.$route.query);
      this.roomCount = this.$route.query.roomCount;
      this.obs = JSON.parse(sessionStorage.getItem('bookItem'));
  }
}
</script>
<style lang="less" scoped>
  .detail {
    .banner {
      position: relative;
      height: 17.2rem;
      .bg {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .bannerTitle {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img {
          display: block;
          width: 7rem;
          height: 7rem;
          margin-bottom: 5px;
        }
        .title {
          font-size: 22px;
          color: #FFFFFF;
          font-weight: bold;
          text-align: center;
        }
      }
    }
    .detail_content {
      padding: 1rem 1.2rem 6rem;
      .hotelInfo {
        background: #FFFFFF;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
        border-radius: 6px;
        .name {
          padding: 1.2rem 1.1rem 0.4rem;
          font-weight: bold;
          font-size: 20px;
          color: #333333;
          border-radius: 10px 10px 0 0;
        }
        .notice {
          padding: 0 15px;
          font-size: 12px;
          color: #888888;
          span {
            margin-left: 23px;
          }
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
      .orderInfo {
        margin-top: 14px;
        background: #FFFFFF;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
        border-radius: 6px;
        padding: 3px 0;
        /deep/ .el-form-item__label {
          text-align: left;
          font-size: 14px;
          color: #A8A8A8;
          padding-left: 12px;
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
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: calc(100% - 2.4rem);
      padding: 2.2rem 1.2rem;
      .footerBtn {
        width: 100%;
        background-image: linear-gradient(155deg, #93C3FF 0%, #6F7EFF 88%);
        box-shadow: 0 3px 7px -2px #8DB1FF;
        border-radius: 19px;
        height: 2.7rem;
        line-height: 2.7rem;
        border: none;
        outline: none;
        font-size: 14px;
        color: #FFFFFF;
      }
    }
  }
</style>
