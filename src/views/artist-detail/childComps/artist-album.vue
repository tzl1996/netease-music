<template>
  <div class="artist-album">
    <album-detail v-for="(album,index) in albumList" :key="index" :album="album"/>
  </div>
</template>

<script>
import {
  reqGetArtistAlbum,
} from 'network/artist';

import AlbumDetail from 'content/album-detail/album-detail.vue'
export default {
  name:"ArtistAlbum",
  components:{
    AlbumDetail

  },
  props:{
    id:{
      type:[Number,String],
      default:0,
    }
  },
  created(){
    this.getArtistAlbum();
  },
  data(){
    return{
      albumList:[],
    }
  },
  methods:{
    getArtistAlbum(){
      this.albumList=[],
      reqGetArtistAlbum(this.id).then((res) =>{
        this.albumList = res.data.hotAlbums;
      })
    }
  },
  watch:{
    id(){
      this.getArtistAlbum();
    }
  }
}
</script>

<style lang='less' scoped>
.artist-album{
  padding: 20px 20px 0px 30px;
}
</style>