<template>
  <div>
      <SongList :musicList="musicList"/>
  </div>
</template>

<script>
import {reqSearch} from 'network/search'
import {reqGetSongsDetail,songDetail} from 'network/detail';
import SongList from 'common/song-list/SongList'
import {search} from 'mixin/component/search'
export default {
    name:'SearchSongs',
     mixins: [search],
    components:{
      SongList,
    },
    data(){
      return{
        musicList:[],
        songCount:0,
        type:1,
      }
    },
    created(){
      this.Search();
    },
    methods:{
      Search(){
        if(this.keyword == "")return;
        this.musicList = [],
        reqSearch(this.keyword,this.type).then((res) =>{
          let songs = res.data.result.songs;
          let length = songs.length
          for(let i = 0; i< length;i++){
            reqGetSongsDetail(songs[i].id).then((res) =>{
              let song = new songDetail(res.data.songs);
              this.musicList.push(song);
              if(i == length -1){
                this.songCount = this.musicList.length;
                this.$emit('setData',this.songCount,"单曲");
              }
            })
          };
         
          
          
          
        })
      }
    }
}
</script>

<style>

</style>