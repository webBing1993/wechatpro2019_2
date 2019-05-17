<template>
  <div style="width: 100%;min-height: 100%;position: fixed;bottom: 0;overflow: scroll">
    <div class="top">
      <img src="../assets/Group 11.png"/>
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

    <div class="bottom">
      <!--<img src="../assets/bottomImg.jpg" height="352" width="1256"/>-->
      <img src="../assets/Group 10(2).png" />
        <router-link class="bookBtn" to="book"></router-link>
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
      console.log(this.$route.query.room);
      sessionStorage.setItem('roomNo',this.$route.query.room);
      window.scrollTo(0,0);
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
    height: 4rem;
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
 position: relative;
  margin: auto;
  margin-bottom: 1rem;
  width: 100%;
  img{
    display: inline-block;
    width: 100%;
    /*height: 6rem;*/
  }
  .bookBtn{
    position: absolute;
    display: inline-block;
    width: 6rem;
    height:2rem;
    right: 2rem;
    bottom: 3rem;
    border-radius: 15px;
    line-height: 2rem;
    background: none;
    text-align: center;
  }
  /*.bottom_cont{*/
    /*align-items: center;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*.left{*/
      /*width: 50%;*/
      /*h3{*/
        /*margin-bottom: 1rem;*/
      /*}*/
    /*}*/
    /*.txt{*/
      /*display: flex;*/
      /*justify-content: space-between;*/
    /*}*/
  /*}*/
}
</style>
