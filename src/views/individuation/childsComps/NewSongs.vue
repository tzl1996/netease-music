<template>
  <div class="new-songs-list">
    <h4 class="top">最新音乐</h4>
    <div class="songs-list-container">
      <div
        class="songs-list-container-group"
        v-for="(item, index) in newSongList"
        :key="item.id"
      @click="playNewSong(index)">
        <div class="number">
          <span>
            {{ index + 1 }}
          </span>
        </div>
        <div class="title">
          <img v-lazy="item.picUrl" alt="" />
          <div class="icon"></div>
        </div>

        <div class="mess">
          <div>{{ item.name }}</div>
          <br />
          <div class="bottom">{{ item.song.album.company }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reqGetSongsDetail,songDetail} from 'network/detail'
import {playMusic} from 'mixin/global/play-music'
export default {
  name: "NewSongs",
  mixins:[playMusic,],
  props: {
    newSongList: {
      type: Array,
      default: [],
    },
  },
  data(){
    return{
      musicList:[],
    }
  },
  methods:{
    playNewSong(index){
      if(this.newSongList.length !== 0){
        this.musicList = [];
        for(let i in this.newSongList){
          reqGetSongsDetail(this.newSongList[i].id).then((res) =>{
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
            if(i == this.newSongList.length-1){
              this.playMusic(index);
            }
          })
        }
        
      }
    }
  }
};
</script>

<style lang="less" scoped>
.new-songs-list {
  width: 100%;
}
.top {
  border-bottom: 1px solid #b8b6b6;
}
.songs-list-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.songs-list-container-group {
  padding: 10px 0px;
  display: flex;
  width: calc(50%);
  height: 70px;
  cursor: pointer;
}
.number {
  height: 70px;
  width: 40px;
  text-align: center;
  line-height: 70px;
  span {
    font-size: 14px;
  }
}
.title {
  height: 100%;
  img {
    height: 100%;
  }
  
}
.mess {
    flex: 1;
    margin-left: 10px;
    font-size: 13px;
    position: relative;
  }
.mess .bottom {
  position: absolute;
  bottom: 0px;
}
h4 {
  padding-left: 10px;
  font-size: 14px;
  padding-bottom: 8px;
}
</style>