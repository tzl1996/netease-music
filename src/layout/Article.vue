<template>
  <div class="article-container scroll" ref="scroll">
    <!-- loading图标 -->
    <!-- <div class="loading" v-show="isLoading">
      <div class="loading-icon">
        <i class="el-icon-tzlLoading"></i>
      </div>
    </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'LayoutArticle',
  data() {
    return {}
  },
  mounted(){
    this.$bus.$on('scrollToTop',() =>{
      this.$refs.scroll.scrollTop = 0;
    })
  },
  computed: {
    isLoading() {
      return this.$store.state.isloading
    },
  },
}
</script>

<style lang="less">
.article-container {
  width: 82%;
  height: calc(100% - 58px - 60px);
  // float: left;

  padding-top: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
}
/* 滚动条样式 */
.scroll::-webkit-scrollbar {
  width: 12px;

  border-radius: 10px;
}
.scroll::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
}
.loading {
  position: absolute;
  width: 100%;
  height: calc(100% - 58px - 60px);
  z-index: 2000;
  background: #fff;
  opacity: 0.6;
  .loading-icon{
    position: absolute;
    height: 40px;
    width: 40px;
    color: #2d8cf0;
    
    top: calc(40% );
    left: calc(38% );
    i{
      font-size: 45px;
      font-weight: 500;
    }
    animation: rotateLoading 2s linear infinite;
    -webkit-animation:rotateLoading 2s linear infinite;
  }
}
@keyframes rotateLoading{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(1turn);
  }
}
</style>