<template>
  <div class="search-mv">
      <template v-if="mvCount">
        <mv-list :mvList="mvList"/>
      </template>
  </div>
</template>

<script>
import MvList from 'content/mv-list/mv-list';
import {reqSearch} from 'network/search'
export default {
    name:'SearchMv',
    components:{
      MvList,
    },
    data(){
      return{
        type:1004,
        mvList:[],
        mvCount:0,
      }
    },
    created(){
      this.Search(this.$route.params.keyword,this.type)
    },
    methods:{
      Search(keyword,type){
        reqSearch(keyword,type).then((res) =>{
          
          this.mvList = res.data.result.mvs;
          this.mvCount = res.data.result.mvCount;
          this.$emit('setData',this.mvCount,'MV');
        })
      }
    }
}
</script>

<style>

</style>