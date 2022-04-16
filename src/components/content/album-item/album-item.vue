<template>
  <div class="album-item">
    <div class="item-container">
      <div class="item-left">
        <img v-lazy="album.blurPicUrl"
             alt="">
      </div>
      <div class="item-right">
        <div class="song-name">{{album.name}}</div>
        <div class="publish-time">发行时间：<span>{{publishTime}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'utils/tool'
export default {
  name: 'album-item',
  props: {
    album: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    publishTime() {
      return formatDate(new Date(this.album.publishTime), 'yyyy-MM-dd')
    },
  },
}
</script>

<style lang="less" scoped>
.album-item {
  width: 100%;
  margin: 10px 0px;
  
}
.item-container {
  padding: 5px 0px;
  width: 100%;
  height: 80px;
  display: flex;
  cursor: pointer;
}
.item-container:hover{
  background-color: #f1f1f1;
}
.item-left {
  height: 70px;
  width: 70px;
  border-radius: 6px;
  img {
    height: 100%;
    border-radius: 6px;
  }
}
.item-right{
  flex: 1;
  margin-left: 10px;
  position: relative;
  .song-name{
    position: absolute;
    top: 0px;
    font-size: 14px;
  }
  .publish-time{
    position: absolute;
    bottom: 0px;
    font-size: 13px;
    span{
      color: #2d8cf0;
    }
  }
}
</style>