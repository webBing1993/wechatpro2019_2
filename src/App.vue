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
  html,body{
    position:relative;
    height:100%;
    min-height:100%;
  }

  body {
    background-color: #F7F7F7;
  }

</style>
