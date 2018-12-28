<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<firstcomponent></firstcomponent>-->
    <!--<router-link to="/view1">Go to view1</router-link>-->
    <!--<router-link to="/book">Go to view2</router-link>-->
    <router-view/>
  </div>
</template>

<script>
import firstcomponent from './components/first-component.vue'

var broswer=localStorage.getItem('temp')  //浏览器环境
var u = navigator.userAgent
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //这个判断 是不是ios手机
var flag
var myFunction
if(broswer=='wx' && isiOS){ //既是微信浏览器 又是ios============（因为查到只有在微信环境下，ios手机上才会出现input失去焦点的时候页面被顶起）
    document.body.addEventListener('focusin', () => {  //软键盘弹起事件
        flag=true
        clearTimeout(myFunction);
    })
    document.body.addEventListener('focusout', () => { //软键盘关闭事件
        flag=false
        if(!flag){
            myFunction = setTimeout(function(){
                window.scrollTo({top:0,left:0,behavior:"smooth"})//重点  =======当键盘收起的时候让页面回到原始位置
            },200);
        }else{
            return
        }
    })
}
export default {
  name: 'App',
  components: { firstcomponent }
}
</script>

<!--<style>-->
<!--#app {-->
  <!--font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
  <!-- -webkit-font-smoothing: antialiased;-->
  <!-- -moz-osx-font-smoothing: grayscale;-->
  <!--text-align: center;-->
  <!--color: #2c3e50;-->
  <!--margin-top: 60px;-->
<!--}-->
<!--</style>-->
<style lang="less">
@import "./assets/styles/index.less";
#app{
  background-color: #FFFFFF;
}
html,body{
  position:relative;
  height:100%;
  min-height:100%;
}

</style>
