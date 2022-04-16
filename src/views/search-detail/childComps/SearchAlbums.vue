<template>
  <div class="search-album">
      <template v-if="albumCount">
        <album-item v-for="(album,index) in albums" :key="index"
        :album="album"/>
      </template>
  </div>
</template>

<script>
import AlbumItem from 'content/album-item/album-item.vue'
import {reqSearch,} from 'network/search';
export default {
    name:'SearchAlbums',
    components:{
      AlbumItem,
    },
     data(){
      return{
        type:10,
        albums:[],
        albumCount:0,
      }
    },
    created(){
      this.Search(this.$route.params.keyword,this.type)
    },
    methods:{
      Search(keyword,type){
        reqSearch(keyword,type).then((res) =>{
          this.albums = res.data.result.albums,
          this.albumCount = res.data.result.albumCount
          this.$emit('setData',this.albumCount,'专辑');
        })
      }
    }
}
</script>

<style>

</style>