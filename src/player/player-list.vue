<template>
  <div class="list-container">
      <h4>播放列表</h4>
      <div class="cance el-icon-close"
      @click="canceDisplay"></div>
    <SongList :music-list="musicList"
    :lines="lines"/>
  </div>
</template>

<script>
import SongList from 'common/song-list/SongList'
export default {
    name:'player-list',
    components:{
        SongList,
    },
    props:{
        musicList:{
            type:Array,
            default:()=>[],
        }
    },
    data(){
        return{
            lines:[true,false,true,true,false,true]
        }
    },
    methods:{
        canceDisplay(){
            this.$parent.showPlayList = false;
            this.$parent.displayList = false;
        }
    }
}
</script>

<style lang="less" scoped>
.list-container{
    width: 500px;
    height: 500px;
    position: relative;
    background-color: #fff;
    z-index: 9;
}
h4{
    text-align: center;
    font-size: 15px;
    padding: 10px 0px;
}
.cance{
    position: absolute;
    top: 3px;
    right: 5px;
    cursor: pointer;
}
</style>