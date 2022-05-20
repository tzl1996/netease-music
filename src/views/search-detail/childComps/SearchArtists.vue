<template>
  <div class="artists-container">
      <template v-if="artistCount">
        <artist-item v-for="(item,index) in artistList"
        :key="index" :artist ="item"/>
        
      </template>
  </div>
</template>

<script>
import ArtistItem from 'content/artist-item/artist-item.vue'
import {reqSearch,} from 'network/search';
export default {
    name:'SearchArtists',
    components:{
      ArtistItem
        
    },
    data(){
      return{
        type:100,
        artistList:[],
        artistCount:0,
      }
    },
    created(){
      this.Search(this.$route.params.keyword,this.type)
    },
    methods:{
      async Search(keyword,type){
        let res = await reqSearch(keyword,type);
        console.log(res.data);
        if(res.status == 200){
          this.artistList = res.data.result.artists;
          this.artistCount = res.data.result.artistCount;
          this.$emit('setData',this.artistCount,"歌手")
        }
      }
    }
}
</script>

<style>

</style>