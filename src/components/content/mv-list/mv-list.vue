<template>
  <div class="music-mv">
    <div class="mv-list-container">
      <div class="mv-list-item"
           v-for="(mv,index) in mvList"
           :key="index"
           :style="itmeStyle"
           @mouseenter="handleEnter(index)"
           @mouseleave="handleleave(index)" 
           @click="goMvDetail(mv.id)">
        <div class="mv-cover">
          <img v-lazy="mv.cover ||mv.picUrl ||mv.imgurl"
               alt="">
          <div class="play-count">
            <i class="el-icon-tzlshipin2"></i>
            <span>{{getPlayCount(mv.playCount)}}</span>
          </div>
          <transition name="hover">
            <div class="play-icon"
                 v-show="currentIndex == index">
              <i class="el-icon-tzl24gf-play"></i>
            </div>
          </transition>
        </div>
        <div class="mv-item-bottom">
          <div class="mv-desc">{{mv.name}}</div>
          <div class="mv-artist" v-show="showArtist">{{mv.artistName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mv-list',
  props: {
    mvList: {
      type: Array,
      default: () => [],
    },
    showArtist:{
      type:Boolean,
      default:true,
    },
    lineNum:{
      type:Number,
      default:4,
    }
  },
  data() {
    return {
      currentIndex: null,
    }
  },
  computed:{
    itmeStyle(){
      return{
        width:`calc(100% / ${this.lineNum}`,
      }
    }
  },
  methods: {
    getPlayCount(count) {
      return count < 10000 ? count : Math.floor(count / 10000) + '万'
    },
    handleEnter(index) {
      this.currentIndex = index
    },
    handleleave(index) {
      this.currentIndex = null
    },
    goMvDetail(id){
      this.$router.push({name:'mv-detail',params:{mvId:id}})
    }
  },
}
</script>

<style lang="less" scoped>
.music-mv {
  width: 100%;
}
.mv-list-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.mv-list-item {
  
  padding: 0px 15px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  font-size: 13px;
}
.mv-cover {
  width: 100%;
  position: relative;

  img {
    width: 100%;
  }
  .play-count {
    font-size: 12px;
    color: #fff;
    margin: 2px;
    position: absolute;
    right: 0px;
    top: 0px;
    i {
      margin-right: 5px;
    }
  }
  .play-icon {
    position: absolute;
    width: 34px;
    height: 34px;
    background-color: #fff;
    border-radius: 50%;
    top: calc(50% - 17px);
    left: calc(50% - 17px);
    line-height: 39px;
    text-align: center;
    opacity: 0.6;
    i {
      margin-left: 4px;
      color: #e83c3c;
      font-size: 20px;
    }
  }
}
.mv-item-bottom {
  .mv-desc{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient:vertical;

  }
  .mv-artist {
    font-size: 12px;
    opacity: 0.6;
  }
}

.hover-enter-active {
  animation: hoverIn 0.5s ease-in;
}
.hover-leave-active {
  animation: hoverOut 0.5s ease-in;
}
@keyframes hoverIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
}
@keyframes hoverOut {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 0;
  }
}
</style>