<template>
  <div>
    <div class="top">
      <img src="../assets/indexImg.jpg"/>
    </div>

    <div class="cont">
      <div>
        <p>入住</p>
        <p> {{today}}</p>
      </div>
      <div >
        <p class="center">一晚</p>
      </div>
      <div>
        <p>离店</p>
        <p>{{tomorrow}}</p>
      </div>
    </div>
    <br>
    <div class="bottom">
      <img src="../assets/bottomImg.jpg" height="352" width="1256"/>
      <div class="bottom_cont">
        <div class="left">
          <h3>标准房</h3>
          <p class="txt">
            <span>双早</span>
            <span style="font-size: 18px">¥316</span>
          </p>
        </div>
        <span class="bookBtn" @click="toBook">预订</span>
        <!--<router-link class="bookBtn" to="book">预订</router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import router from '../router/index.js'
import utils from '../tool/utils.js'
// import {Cell} from 'vux'
const _today = new Date().getTime()
const _tomorrow = _today + 24 * 3600 * 1000

export default {
  components: {

  },
  data () {
    return {
      today: utils.datetimeparse(_today, 'MM／DD'),
      tomorrow: utils.datetimeparse(_tomorrow, 'MM／DD')
    }
  },
  methods: {
    ...mapActions([
      'goto'
    ]),
    toBook () {
      router.push('/book')
      // router.go('book')
    }
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

  }
}
</script>
<style lang="less" scoped>
.top{
  width:100%;
  /*height: 30rem;*/
  img{
    display: inline-block;
    width:100%;
  }
}
  .cont{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 5rem;
    border-bottom: 1px solid #f2f2f2;
    .center{
      border: 1px solid #eeeeee;
      border-radius:30px;
      width: 3rem;

    }
    p{
      text-align: center;
    }
  }
.bottom {
  padding: 10px;
  margin: 1rem auto;
  border: 1px solid #f3f3f3;

  width: 80%;
  height: 12rem;
  box-shadow: 0px 1px 5px 3px #fafafa;
  img{
    display: inline-block;
    width: 100%;
    height: 6rem;
  }
  .bottom_cont{
    align-items: center;
    display: flex;
    justify-content: space-between;
    .left{
      width: 50%;
      h3{
        margin-bottom: 1rem;
      }
    }
    .txt{
      display: flex;
      justify-content: space-between;
    }
  }
  .bookBtn{
    display: inline-block;
    width: 6rem;
    height:2rem;
    border-radius: 15px;
    line-height: 2rem;
    background: #1AAD19;
    color:#FFFFFF;
    text-align: center;
    background: linear-gradient(to right, #00e2a8, #1bdbea);
  }

}
</style>
