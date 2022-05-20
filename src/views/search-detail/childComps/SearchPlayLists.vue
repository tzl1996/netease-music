<template>
  <div class="play-list-search">
      <template v-if="playlistCount">
        <MusicList emptyDesc :musicList="playList"/>
      </template>
      <template v-else>
        数据为空~~
    </template>
  </div>
</template>

<script>
import MusicList from 'content/musiclist/MusicList.vue'
import { reqSearch } from "network/search"
export default {
    name:'SearchPlayLists',
    components:{
      MusicList,
    },
    data(){
      return{
        type:1000,
        playList:[],
        playlistCount:0,
      }
    },
    created(){
      this.Search(this.$route.params.keyword,this.type);
    } ,
    methods:{
      Search(keyword,type){
        reqSearch(keyword,type).then((res) =>{
          console.log(res.data)
          this.playList = res.data.result.playlists;
          this.playlistCount = res.data.result.playlistCount;
          this.$emit('setData',this.playlistCount,'歌单');
        })  
      }
    }
}
</script>

<style>

</style>