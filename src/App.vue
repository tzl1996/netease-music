<template>
  <div id="app">
    <!-- <layout-header />
    <div class="main">
      <div class="main-left">
        <layout-aside />
      </div>
      <div class="main-right">
        <layout-article />
      </div>
    </div>
    <div class="footer">
       <layout-footer />
    </div> -->
    <layout-header/>
    <layout-aside/>
    <layout-article/>
    <layout-footer/>
  </div>
</template>

<script>

import {reqUserAccount} from 'network/user'
import LayoutHeader from "./layout/Header";
import LayoutAside from "./layout/Aside.vue";
import LayoutFooter from "./layout/Footer.vue";
import LayoutArticle from "./layout/Article.vue";
export default {
  name: "App",
  components: {
    LayoutHeader,
    LayoutAside,
    LayoutFooter,
    LayoutArticle,
  },

};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  // .main {
  //   display: flex;
  //   width: 100%;
  //   height: 100vh;
  //   overflow: hidden;
  //   .main-left{
  //     width: 18%;
  //   }
  // }
  // .footer{
  //   width: 100%;
  //   height: 18%;
  //   position: absolute;
  //   bottom: 0;
  //   height: 60px;
  // }
}
</style>
