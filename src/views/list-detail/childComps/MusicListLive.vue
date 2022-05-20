<template>
  <div class="music-list-live">
    <div class="item" v-for="(sub,index) in subs" :key="index">
      <div class="avatar">
        <img v-lazy="sub.avatarUrl" alt="">
      </div>
      <div class="name">
        <span>{{sub.nickname}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'MusicListLive',
  props:{
    subs:{
      type:Array,
      default:() => [],
    }
  }
}
</script>

<style lang='less' scoped>
  .music-list-live{
    width: 100%;
    margin: 20px 30px;
    display: flex;
    flex-wrap: wrap;
  }
  .item{
    width: calc(100% / 10);
    padding: 15px 15px;
    .avatar{
      img{
        width: 60%;
        border-radius: 50%;
      }
    }
    .name{
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>