<template>
  <div class="simi-mv-list">
    <div class="simi-mv-item"
         v-for="(mv,index) in mvList"
         :key="index"
         @click="playMv(mv.id)">
      <div class="item-left">
        <img v-lazy="mv.cover"
             alt="">
        <div class="play-count">
          <span class="el-icon-tzlshipin2"></span>
          <span>{{mv.playCount}}</span>
        </div>
      </div>
      <div class="item-right">
        <div class="mv-title">
          <div class="title-left">MV</div>
          <span class="title-name">{{mv.name}}</span>
        </div>
        <div class="mv-artist">
          {{mv.artistName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'simiMv',
  props: {
    mvList: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
    playMv(id){
      this.$router.push({name:'mv-detail',params:{
        mvId:id
      }})
    }
  }
}
</script>

<style lang="less" scoped>
.simi-mv-list {
  width: 100%;
}
.simi-mv-item {
  display: flex;
  padding: 10px 0px;
  cursor: pointer;
}
.item-left {
  width: 60%;
  position: relative;
  img {
    width: 100%;
  }
  .play-count {
    position: absolute;
    top: 3px;
    right: 0px;
    color: #fff;
    white-space: nowrap;
    span {
      padding: 0px 3px;
    }
  }
}
.item-right {
  width: 40%;
  padding-left: 10px;
  position: relative;
  display: -webkit-box;
 
}
.mv-title {
  font-size: 15px;

  display: -webkit-box;
  // -webkit-box-orient: horizontal;
  //   -webkit-line-clamp: 1;
  .title-left {
    border: 1px solid #e83c3c;
    height: 24px;
    border-radius: 4px;
    color: #e83c3c;
    font-size: 14px;
    padding: 2px 3px;
  }
  .title-name {
    padding-left: 10px;
    font-size: 14px;
    line-height: 20px;
  }
}
.mv-artist {
  position: absolute;
  bottom: 10px;
  font-size: 12px;
}
</style>