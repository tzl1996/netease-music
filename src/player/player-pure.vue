<template>
<<<<<<< HEAD
  <div class="playpure scroll" ref="scroll">
=======
  <div class="playpure scroll">
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
    <div class="display-container">
      <div class="display-top">
        <div class="display-music">
          <div class="cover">
            <div class="play-bar-support">
              <img src="../assets/player/play-bar-support.png" alt="">
            </div>
            <div class="play-bar" :style="barStyle">
              <img src="../assets/player/play-bar.png" alt="">
            </div>
            <div class="play-cover">
              <img v-lazy="song.pic || song.picUrl" alt=""
               v-if="song">
            </div>
          </div>
          <div class="lyric">
            <div class="title">
              <div class="song-name">{{song.name}}</div>
              <div class="song-artist">{{song.artist}}</div>
            </div>
            <PlayerLyric :lyric="lyric"
            :currentTime="currentTime"
<<<<<<< HEAD
            :middle=true 
            />
=======
            :middle=true />
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
          </div>
        </div>
        <div class="cancel-display" @click="cancelShowPure">
          <i class="el-icon-tzl-zuixiaohua"></i>
        </div>
      </div>
      <Recommends :recommends="recommends" class="comments"/>
      <Pagination :limit="limit" :offset="offset" :total="total"/>
    </div>
  </div>
</template>

<script>
import Pagination from 'common/pagination/Pagination'
import PlayerLyric from './player-lyric.vue';
import Recommends from 'content/recommends/Recommends';
import {reqMusicRecommend} from 'network/detail';
export default {
  name: 'PlayerPure',
  components:{
    PlayerLyric,
    Recommends,
    Pagination,
  },
  props:{
    song:{
      type:Object,
      default: () => {name:''},
    },
    lyric:{
      type:String,
      default:'暂无歌词'
    },
    currentTime:{
      type:Number,
      default:0,
    }
  },
  data(){
    return{
      recommends:[],
      total:null,
      offset:1,
      limit:30,
    }
  },
  created(){
    this.$bus.$on('changeOffset',(page) =>{
      this.offset = page
      this.getComment()
<<<<<<< HEAD
    });
     
    this.$bus.$on('scrollToTop',() =>{
      this.$refs.scroll.scrollTop = 500;
    })
  
=======
    })
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
  },
  computed:{
    barStyle(){
      return {
        transform: this.getIsPlay ? `rotate(-7deg)` : `rotate(-50deg)`,
      }
    },
    getIsPlay(){
      return this.$parent.isPlay;
    }
  },
  watch:{
    song:{
      immediate:true,
      handler(){
        this.getComment();
      }
    }
  },
  methods: {
    cancelShowPure() {
      this.$parent.isPlayPure = false
    },
    getComment(){
      reqMusicRecommend(this.song.id,this.limit,this.offset).then((res) =>{
        
        this.recommends = res.data.comments;
        this.total = res.data.total;
      })
    }
  },
}
</script>

<style lang="less" scoped>
.playpure {
  width: 100%;
  height: calc(100vh - 58px - 60px);
  background-color: #fff;
  position: absolute;
  overflow-y: auto;
  left: 0px;
  bottom: 60px;
  z-index: 2;
}
.display-container{
  width: 70%;
  margin: 0px 200px;
  height: 100%;
  // background-color: antiquewhite;
}
.display-top{
  display: flex;
  background: radial-gradient(closest-side, #928e8d, #fff);
  
}
.display-music{
  flex: 1;
<<<<<<< HEAD
  height: 500px;
=======
  height: 400px;
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
  position: relative;
  display: flex;
  .cover{
    width: 60%;
    height: 100%;
    
    .play-bar-support{
      height: 30px;
      width: 30px;
      position: absolute;
      top: -2px;
      left: 33%;
      z-index: 3;
      img{
        width: 100%;
      }
    }
    .play-bar{
      width: 75px;
      z-index: 2;
      position: absolute;
      top: 23px;
      left: calc(33% + 12px);
       transition: transform 0.3s;
      // transform: rotate(-5deg);
      transform-origin:left top;
      img{
        width: 100%;
        
      }
    }
    .play-cover{
      width: 240px;
      height: 240px;
      border-radius: 50%;
      border: 40px solid #333;
      position: absolute;
      margin-left: 20px;
      top: 60px;
      left: calc(33% - 130px);
      box-shadow: 0px 0px 10px #918a85;
      img{
        width: 100%;
        border-radius: 50%;
        box-shadow: 0 0 2px #333;
        -webkit-animation: rotate 20s linear infinite;
      }
    }
  }
  .lyric{
    flex: 1;
    position: relative;
    .title{
      margin: 5px 0px 20px 0px;
      .song-name{
        font-size: 17px;
        font-weight: 500;
      }
      .song-artist{
        font-size: 13px;
        margin: 10px 0px 10px 10px;
      }
    }
  }
}
.comments{
  padding: 0px 40px;
}
.cancel-display{
  margin-top: 10px;
  width: 40px;
  height: 40px;
  background-color: #ffb800;
  cursor: pointer;
  text-align: center;
  line-height: 48px;
  i{
    color: #fff;
    font-size: 20px;
  }
}
@keyframes rotate {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>