<template>
  <div class="album-detail">
    <div class="avatar">
      <img v-lazy="album.picUrl" alt="">
    </div>
    <div class="song-list">
      <div class="album-name">{{album.name}}</div>
      <SongList :musicList="musicList" :lines="lines"/>
    </div>
  </div>
</template>

<script>
import { reqGetSongsDetail, songDetail } from 'network/detail'
import {reqGetAlbum} from 'network/artist';
import SongList from 'common/song-list/SongList';
export default {
  name:'AlbumDetail',
  components:{
    SongList,
  },
  props:{
    album:{
       type:Object,
       default:()=> {},
    }
  },
  created(){
    this.getAlbum()
  },
  data(){
    return{
      musicList:[],
       lines: [true, true, true, false, false, true],
    }
  },
  methods:{
    async getAlbum(){
      let res = await reqGetAlbum(this.album.id)
      let songs= res.data.songs
      for(let i in songs){
        let res = await reqGetSongsDetail(songs[i].id); 
       
        let song = new songDetail(res.data.songs);
        this.musicList.push(song);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.album-detail{
  padding: 10px 0px;
  width: 100%;
  display: flex;
  
}
.avatar{
  width: 150px;
  
  padding-right: 10px;
  img{
    width: 100%;
  }
}
.song-list{
  flex: 1;
  .album-name{
    margin-bottom: 8px;
  }
}
</style>