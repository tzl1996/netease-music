<template>
  <div class="music-list-container">
    <div class="playlist-item"
         v-for="(item, index) in musicList"
         :key="index"
         @mouseenter="handleEnter(index)"
         @mouseleave="handleLeave(index)" 
         @click="toMusicDetail(item.id)">
      <div class="playlist-item-container">
        <!-- 图片内部容器 -->
        <div class="playlist-item-container-group">
          <!-- 当item.copywriter内容为空时，不显示提示内容，只显示播放数，且播放书滑动进入 -->
          <template v-if="item.copywriter">
            <transition name="playlist-slide">
              <div class="playlist-desc"
                   v-show="currentIndex == index">
                {{ item.copywriter }}
              </div>
            </transition>
          </template>
          <transition name="playlist-slide">
            <div class="playlist-count"
                 v-show="emptyDesc ? currentIndex == index : currentIndex !== index">
              <div>
                <!-- 播放数量 -->
                <i class="el-icon-tzl18erji-1"></i>
                {{item.playCount}}
              </div>
            </div>
          </transition>
          <img v-lazy="item.picUrl ||item.coverImgUrl"
               alt="">
          <!-- 播放标志 -->
          <transition name="playlist-play">
            <div class="playlist-play"
                 v-show="currentIndex == index">
              <i class="el-icon-tzl24gf-play"></i>
            </div>
          </transition>
        </div>
        <!-- 底下文字 -->
        <div class="playlist-name">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicList',
  props: {
    musicList: {
      type: Array,
      default: () => [],
    },
    /**当描述信息为空时，播放数量滑动显示出来 */
    emptyDesc: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentIndex: null, //控制描述信息、播放次数显示隐藏
    }
  },
  methods: {
    handleEnter(index) {
      this.currentIndex = index
    },
    handleLeave(index) {
      this.currentIndex = null
    },
    toMusicDetail(id){
      let params ={
        id,
        time:new Date().getTime(),
      }
      this.$router.push({name:'musiclistdetail',params})
    }
  },
}
</script>

<style lang="less" scoped>
.music-list-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .playlist-item {
    width: calc(20%);
    padding: 5px 10px;
  }
  img {
    width: 100%;
  }
}
.playlist-item-container {
  cursor: pointer;
  overflow: hidden;
  &-group {
    position: relative;
  }
}

// 歌单容器
.playlist-name {
  padding: 5px 0px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
<<<<<<< HEAD
  font-size: 1rem;
=======
  font-size: 14px;
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
}
.playlist-desc {
  width: 100%;
  padding: 5px 2px;
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
<<<<<<< HEAD
  font-size: 1rem;
=======
  font-size: 14px;
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
}
.playlist-play {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 5px;
  bottom: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  i{
<<<<<<< HEAD
    font-size:20px ;
=======
    font-size: 20px;
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
   color: red;
  }
  }
.playlist-count {
  width: 100%;
  padding: 3px 2px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  text-align: right;
  position: absolute;
  top: 0px;
  right: 0;
  color: #f6f6f6;
  font-size: 13px;
}
.playlist-slide-enter-active {
  animation: slideIn 0.5s ease-in-out;
}
.playlist-slide-leave-active {
  animation: slideOut 0.3s ease-in-out;
}
@keyframes slideIn {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0px);
  }
}
@keyframes slideOut {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-100%);
  }
}
.playlist-play-enter-active{
  animation: appear 0.5s ease-out;
}
.playlist-play-leave-active {
  animation: disappear 0.5s ease-out;
}
@keyframes appear{
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@keyframes disappear{
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
}
</style>