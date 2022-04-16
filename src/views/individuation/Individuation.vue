<template>
  <div class="music-individuation scroll">
    <swiper :banner="banner" class="swiper" />
    <h4>推荐歌单</h4>
    <music-list :musicList="personalized" />
    <private-content :pri="privateContent"/>
    <new-songs :newSongList="songList"/>
  </div>
</template>

<script>
//请求数据
import {
  reqBanner,
  reqGetPersonalized,
  reqGetPrivateContent,
  reqGetNewSong,
} from "network/discover";
import Swiper from "common/swiper/Swiper.vue";
import MusicList from "content/musiclist/MusicList";
import PrivateContent from "./childsComps/PrivateContent";
import NewSongs from "./childsComps/NewSongs";

export default {
  name: "Individuation",
  components: {
    MusicList,
    PrivateContent,
    NewSongs,
    Swiper,
  },
  data() {
    return {
      banner: null, //轮播图数据
      limit: 10, //一次获取的歌单数量
      personalized: null, //保存获取到的推荐歌单
      privateContent: null, //独家放送
      songList: null, //每日新歌
    };
  },
  created() {
    /* 这个暂时不知道什么意思 */
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 11;
    }
    /* 获取轮播图数据 */
    reqBanner().then((res) => {
      this.banner = res.data.banners;
    });
    /* 获取推荐歌单 */
    reqGetPersonalized(this.limit).then((res) => {
      this.personalized = res.data.result;
    });
    /* 获取独家放送 */
    reqGetPrivateContent().then((res) =>{
      this.privateContent = res.data;
    });
    reqGetNewSong().then((res) => {
      this.songList = res.data.result;
    });
  },
};
</script>

<style lang="less" scoped>
.music-individuation {
  width: 100%;
  height: 100%;
  padding: 0px 100px;
}
h4{
  padding: 10px 10px;
  font-size: 13px;
}
.swiper {
  width: calc(100% - 20px);
  margin-left: 10px;
}
/* 滚动条样式 */
 ::-webkit-scrollbar {
  background-color: red;
}
</style>