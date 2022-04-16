<template>
  <div class="artist-item">
    <div class="artist-item-left">
      <img v-lazy="artist.picUrl"
           alt="">
    </div>
    <div class="artist-item-right">
      <div class="artist-name">{{artist.name}}</div>
      <div class="album-num">专辑数: <span>{{artist.albumSize}}</span></div>
      <div class="mv-num">MV数: <span>{{artist.mvSize}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'artist-item',
  props: {
    artist: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang='less' scoped>
.artist-item {
  height: 80px;
  padding: 10px 0px;
  display: flex;
  width: 100%;
  margin: 20px 0px 20px 10px;
  
  cursor: pointer;
  &-left {
    height: 100%;
    
    img {
      height: 100%;
      border-radius: 8px;
    }
  }
 &-right{
   flex: 1;
   margin-left: 10px;
   div{
     padding-bottom: 3px;
   }
  .album-num, .mv-num{
    font-size: 12px;
  }
 }
}
.artist-item:hover{
  background: #f1f1f1;
}
</style>