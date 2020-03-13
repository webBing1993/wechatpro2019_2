<template>
  <div style="height: 100%;width:100%;position: fixed;bottom: 0" >
    <br>
    <div style="padding-left: 1rem;">
        <h2>控客智慧酒店</h2>
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
              行政双床
          </span>
            <span style="margin-left: 1rem">
              双早
            </span>
          </p>
        </div>
        <br>
        <div>
          <p class="inputBox">
            <span>预定人</span>
            <span>{{$route.query.owner}}</span>
          </p>
          <p class="inputBox">
            <span>电话</span>
            <span>{{$route.query.phone}}</span>
          </p>

        </div>

    </div>
        <div class="bottomCode">
          <img src="../assets/qrimg.jpg" height="220" width="220"/>
          <h4>长按二维码办理在线登记</h4>
        </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import utils from '../tool/utils.js'
// import {Cell} from 'vux'

const _today = new Date().getTime()
const _tomorrow = _today + 24 * 3600 * 1000
export default {
  components: {},
  data () {
    return {
      today: utils.datetimeparse(_today, 'MM／DD'),
      tomorrow: utils.datetimeparse(_tomorrow, 'MM／DD')
    }
  },
  methods: {
    ...mapActions([
      'goto'
    ])

  },
  watch: {},
  computed: {
    ...mapState([
      'route',
      'Interface'
    ])
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
  .detail {
    width: 70%;
    p {
      color: #a9a9a9;
      display: flex;
      justify-content: space-between;
      &:nth-child(2) {
        justify-content: left;
      }
      img {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 10px;
      }

    }
  }

  .inputBox {
    height: 3.5rem;
    line-height: 3.5rem;
    border-bottom: 1px solid #f3f3f3;
    span {
      font-size: 15px;
      font-weight: 400;
      margin-right: 3rem;
      &:first-child {
        display: inline-block;
        width: 4rem;
      }
    }
    input {
      outline: none;
      border: none;
      font-size: 15px;
    }
  }

  .bottomCode {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20rem;

    img {
      padding: 10px;
    }
  }
</style>
