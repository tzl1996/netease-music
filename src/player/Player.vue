<template>
  <div class="player-container">
    <!-- 播放器歌曲页面 -->
    <PlayerCover :song="playList[currentIndex]" />
    <!-- 歌词显示区域 -->
    <player-lyric :lyric="lyric"
                  :currentTime="currentTime"
                  height="40px"
                  ref="lyric"
                  class="player-lyric-simple"
                  v-show="isShowLyric" 
                 />
    <!-- 播放列表 -->
    <transition name="list-slide">
      <div class="player-list scroll"
           v-show="showPlayList">
        <player-list :musicList="musicList" />
      </div>
    </transition>

    <!-- 播放详情进入页 -->
    <transition name="pure-slide">
      <PlayerPure v-if="isPlayPure"
                  :song="playList[currentIndex]"
                  :lyric="lyric"
                  :currentTime="currentTime" />
    </transition>
    <!-- 音频播放标签 -->
    <audio :src="getSongSrc"
           ref="audio"
           autoplay
           @play="playLoad"
           @timeupdate="audioTimeUpdate()"
           @playing="musicPlaying"
           @ended="playEnded"></audio>
    <!-- 播放状态 -->
    <div class="player-toggle">
      <div class="player-item player-pre"
           @click="preMusic">
        <i class="player-icon el-icon-tzl1_music83"></i>
      </div>
      <div class="player-item player-player-type"
           @click="toggle">
        <i class="player-icon el-icon-tzlbofang1"
           v-show="!isPlay"></i>
        <i class="player-icon el-icon-tzlbofang3"
           v-show="isPlay"></i>
      </div>
      <div class="player-item player-next"
           @click="nextMusic">
        <i class="player-icon el-icon-tzl1_music82"></i>
      </div>
    </div>
    <!-- 播放进度 -->
    <div class="player-progress">
      <div class="player-progress-current-time">{{ getCurrentTime }}</div>
      <div class="player-progress-main">
        <el-slider height="6px"
                   v-model="percent"
                   @change="updateProgress"
                   :show-tooltip="false"
                   @mousedown.native="isChange = true"
                   @mouseup.native="isChange = false"></el-slider>
      </div>
      <div class="player-progress-time">{{ getDurationTime }}</div>
    </div>
    <!-- 播放音量 -->
    <div class="player-volumn">
      <span @click="changSounds">
        <i class="player-small-icon el-icon-tzlSoundshengyin13"
           v-show="isSilence"></i>
        <i class="player-small-icon el-icon-tzlSoundshengyin10"
           v-show="!isSilence"></i>
      </span>
      <div class="player-volumn-progress">
        <el-slider v-model="currentVolume"
                   @change="updateVolume"
                   :show-tooltip="false"></el-slider>
      </div>
    </div>
    <!-- 播放选项 -->
    <div class="player-tool">
      <div class="player-tool-schema"
           @click="changeSchema">
        <a href="#"
           title="顺序播放">
          <i class="player-small-icon el-icon-tzlshunxubofang"
             v-show="schemaIndex == 0"></i>
        </a>
        <a href="#"
           title="随机播放">
          <i class="player-small-icon el-icon-tzlsuijibofang"
             v-show="schemaIndex == 1"></i>
        </a>
        <a href="#"
           title="单曲循环">
          <i class="player-small-icon el-icon-tzldanquxunhuan"
             v-show="schemaIndex == 2"></i>
        </a>
      </div>
      <div class="player-tool-lyric" @click="handleShowLyric"
       :class="{actived:isShowLyric}">
        <a href="#"
           title="歌词">
          <i class="player-small-icon el-icon-tzlgeciweidianji" :class="{actived:isShowLyric}"></i>
        </a>
      </div>
      <div class="player-tool-list"
           @click="handlePlayList"
           >
        <a href="#"
           title="歌单">
          <i class="player-small-icon el-icon-tzlic_queue_music_48px" :class="{ actived: displayList }"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'utils/tool'
import { reqGetLyric } from 'network/detail'
import PlayerCover from './player-cover.vue'
import PlayerLyric from './player-lyric.vue'
import PlayerList from './player-list.vue'
import PlayerPure from './player-pure.vue'
export default {
  name: 'Player',
  components: {
    PlayerCover,
    PlayerLyric,
    PlayerList,
    PlayerPure,
  },
  data() {
    return {
      isSilence: false,
      currentVolume: 50, ////音量百分比
      preVolume: 0, //在设置音量切换时暂时保存之前音量百分比
      percent: 0,
      isPlay: false, //true正在播放
      currentTime: 0, //当前音乐播放时间
      duration: 0, //音乐总时间
      playList: [],
      musicList: [],
      /**播放列表
      @params {
      this.index=index;
      this.name=song.name;
      this.artist=song.artist;
      this.src=url;
      this.pic=song.pic;
      this.id=id;
      }
      */
      lyric: '',
      isShowLyric: false,
      isPlayPure: false, //是否进入播放页
      showPlayList: false,
      currentIndex: 0, //当前播放音乐
      id: null, //接收传来的播放列表唯一标识
      schemaIndex: 1, // 0 1 2 设置播放为顺序、随机、单曲
      isChange: false, //判断进度条是否在改变，当为ture时不执行updateTime监听事件，解决进度条拖拽失效问题
    }
  },
  computed: {
    displayList() {
      return this.playList.length > 0 && this.showPlayList
    },
    getCurrentTime() {
      /* new Date()传入的是毫秒，而$refs.audio.currentTime返回的是秒*/
      return formatDate(new Date(this.currentTime * 1000), 'mm:ss') || '00:00'
    },
    /**格式化duration => 'mm:dd' */
    getDurationTime() {
      return formatDate(new Date(this.duration * 1000), 'mm:ss') || '00:00'
    },
    /**获取歌曲播放地址 */
    getSongSrc() {
      return (
        (this.playList[this.currentIndex] &&
          this.playList[this.currentIndex].src) ||
        ''
      )
    },
  },
  mounted() {
    /**list是音乐列表，index是要播放的音乐在列表中的位置，path是当前播放音乐的路由路径,musicList是歌单信息*/
    this.$bus.$on('playMusic', (playList, index, musicList, id) => {
      this.id = id
      this.musicList = musicList
      /**初始化播放列表 */
      this.playList = []
      /**对playList进行处理 */
      let transferList = []
      /**过滤掉没有音乐地址的歌曲 */
      transferList = playList.filter((item) => {
        return item.src
      })
      /**对数组进行排序 */
      transferList = transferList.sort((a, b) => {
        return a.index - b.index
      })
      // console.log(transferList)
      this.playList = transferList
      /**在请求歌曲的时候可能有的歌曲不可用，或丢失。导致在播放器中的歌曲列表和页面展示存在差异，可能会出现指定的播放歌曲不服
       * 用一次查找解决问题
       */
      this.setCurrentIndex(index);
      this.$store.commit('hiddenLoading');
    })
  },
  methods: {
    /**设置要播放的音乐 */
    setCurrentIndex(index) {
      console.log('playList', this.playList)
      for (let i in this.playList) {
        if (this.playList[i].index == index) {
          this.currentIndex = i
          break //break跳出循环------continue跳出本次循环
        }
      }
    },

    /* 监听音乐加载 */
    playLoad() {
      this.isPlay = true
      //歌曲时长
      this.duration = this.$refs.audio.duration
      //获取歌词
      reqGetLyric(this.playList[this.currentIndex].id).then((res) => {
        this.lyric = (res.data.lrc && res.data.lrc.lyric) || '暂无歌词'
      })
    },
    /**监听音乐已开始播放 */
    musicPlaying() {
      this.isPlay = true
      this.currentTime = this.$refs.audio.currentTime
      this.$bus.$emit(
        'playing',
        this.playList[this.currentIndex].index,
        this.playList[this.currentIndex].index,
        this.id
      )
    },
    /**监听当前的播放时间 */
    audioTimeUpdate() {
      if (this.$refs.audio != null && this.isChange === false) {
        /**获取currentTime */
        this.currentTime = this.$refs.audio.currentTime
        /**计算音乐播放进度百分比
         * 在拖拽时不设置
         */
        this.percent = (this.$refs.audio.currentTime / this.duration) * 100
      }
    },
    /* 监听音乐播放结束 */
    playEnded() {
      //根据播放类型 随机、顺序还是单曲播放来播放下一曲
      //顺序播放
      if (this.schemaIndex == 0) {
        this.nextMusic()
      } else if (this.schemaIndex == 2) {
        this.currentIndex = this.currentIndex
      } else {
        let length = this.playList.length
        let randomIndex = Math.floor(Math.random() * length)
        this.currentIndex = randomIndex
      }
    },
    /* 控制暂停和播放 */
    toggle() {
      this.isPlay = !this.isPlay
      if (this.isPlay && this.$refs.audio.readyState == 4) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    /* 播放上一首 */
    preMusic() {
      if (this.currentIndex <= 0) this.currentIndex = this.playList.length - 1
      else this.currentIndex--
    },
    /* 播放下一首 */
    nextMusic() {
      if (this.currentIndex >= this.playList.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    },
    /* 改变播放进度条 */
    updateProgress() {
      this.$refs.audio.currentTime =
        (this.percent / 100) * this.$refs.audio.duration
      this.percent =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
    },
    /* 控制是否禁止音 */
    changSounds() {
      this.isSilence = !this.isSilence
      //不是静音
      if (this.isSilence) {
        this.preVolume = this.currentVolume
        this.$refs.audio.volume = 0
        this.currentVolume = 0
      } else {
        this.currentVolume = this.preVolume
        this.$refs.audio.volume = this.currentVolume / 100
      }
    },
    /* 控制音量 */
    updateVolume() {
      if (this.$refs.audio) this.$refs.audio.volume = this.currentVolume / 100
    },
    /* 改变播放的类型 */
    changeSchema() {
      switch (this.schemaIndex) {
        case 0:
          this.schemaIndex = 1
          break
        case 1:
          this.schemaIndex = 2
          break
        case 2:
          this.schemaIndex = 0
          break
      }
    },
    /* 是否展示歌词 */
    handleShowLyric(){
      this.isShowLyric = !this.isShowLyric;
    },
    /* 控制播放列表的展示和隐藏 */
    handlePlayList() {
      this.showPlayList = !this.showPlayList
    },
  },
  watch: {
    $route: {
      handler() {
        this.showPlayList = false
      },
    },
  },
}
</script>

<style lang="less" scoped>
.player-container {
  width: 100%;
  height: 60px;
  display: flex;
  position: relative;
  a {
    text-decoration: none;
    color: inherit;
  }
}
//播放歌词
.player-lyric-simple{
  width: 100%;
  height: 60px;
  position: absolute;
  top: -58px;
  left: 0px;
  overflow:hidden;
  text-align: center;
  
}
.player-list {
  position: absolute;
  bottom: 50px;
  right: 0px;
  z-index: 9;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;
}
.actived {
  color: #409eff;
}
.player-toggle {
  width: 18%;
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .player-item {
    padding: 0px 20px;
    text-align: center;
    cursor: pointer;
  }
}
.player-progress {
  //   background-color: rgb(202, 144, 67);
  flex: 1;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  &-current-time {
    width: 50px;
    text-align: left;
  }
  &-time {
    width: 50px;
    text-align: right;
  }
  &-main {
    flex: 1;
  }
}
.player-volumn {
  width: 150px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &-progress {
    flex: 1;
    padding: 0px 0px 0px 15px;
  }
}
.player-tool {
  padding: 0px 10px;
  width: 200px;
  display: flex;
  align-items: center;
  &-schema {
    width: calc(33%);
  }
  &-lyric {
    width: calc(33%);
  }
  &-list {
    width: calc(33%);
  }
}
.player-icon {
  font-size: 26px;
}
.player-small-icon {
  font-size: 24px;
}
// 进度条样式
/deep/ .el-slider__runway {
  height: 4px;
  .el-slider__bar {
    height: 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
  }
  .el-slider__button-wrapper {
    cursor: pointer;
    position: absolute;
    top: -16.5px;
    .el-slider__button {
      cursor: pointer;
      border: 0px;
      background-color: #409eff;
      height: 4px;
      width: 0px;
    }
  }

  .el-slider__button-wrapper:hover .el-slider__button {
    height: 14px;
    width: 14px;
    border: 4px solid #fff;
    box-shadow: 0px 1px 2px #888888;
  }
}
/deep/ .el-slider__runway:hover .el-slider__button {
  height: 14px;
  width: 14px;
  border: 3px solid #fff;
}
/* 滚动条样式 */
.scroll::-webkit-scrollbar {
  width: 8px;
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
}
// 播放列表显示隐藏动画
.list-slide-enter-active {
  animation: slideIn 0.3s ease-out;
}
.list-slide-leave-active {
  animation: slideOut 0.3s ease-in;
}
@keyframes slideIn {
  from {
    transform: translateX(500px);
  }
  to {
    transform: translateX(0px);
  }
}
@keyframes slideOut {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(500px);
  }
}
//播放界面展示隐藏界面
.pure-slide-enter-active {
  animation: slideUp 0.3s ease-in-out;
}
.pure-slide-leave-active {
  animation: slideDown 0.3s ease-in-out;
}
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slideDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>