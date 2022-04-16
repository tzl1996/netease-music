<template>
  <div class="lyric-container scroll"
       :style="{height:height}"
<<<<<<< HEAD
       ref="lyric">
    <ul>
         <li class="lyric-line"
          v-for="(line,index) in lyricArray"
          ref="liItem"
          :key="index"
          :style="{height:lineHeight}"
=======
       ref="scroll">
    <ul>
      <li class="lyric-line"
          v-for="(line,index) in lyricArray"
          :key="index"
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
          :class="[index == lyricIndex ? 'player-action' : '']">{{line[1]}}</li>
    </ul>

  </div>
</template>

<script>
import { parseLyric } from 'utils/parseLyric'
export default {
  name: 'playerLyric',
  props: {
    lyric: {
      type: String,
      default: '暂无歌词',
    },
    currentTime: {
      type: Number,
      default: 0,
    },
    middle: {
      type: Boolean,
      default: false,
    },
<<<<<<< HEAD
    lineHeight: {
      type: String,
      default: '30px',
    },
     height: {
      type: String,
      default: '330px',
=======
    height: {
      type: String,
      default: '300px',
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
    },
    /**在middle为true时，即列表形式歌单时有效，
     * 作用：设置第几行歌词滚动
     * 同时动态计算此时歌词列表高度
     */
    scrollNum: {
      type: Number,
      default: 5,
    },
  },
<<<<<<< HEAD
  
=======
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
  data() {
    return {
      lyricArray: [], //转换后的歌词数组
      lyricIndex: -1, //活跃的歌词行数
      midIndex: 0,
      length: 0,
      isDarg: false, //是否在拖动歌词进度条，true的话禁用歌词scrollTo
    }
  },
  watch: {
    lyric() {
      /* 格式化歌词 */
      this.lyricIndex = -1
      this.midIndex = 0
<<<<<<< HEAD
      this.lyricArray = parseLyric(this.lyric)
      /**歌词改变，歌词列表刷新后重新计算刷新滚动条 */
      this.$nextTick(() => {
        this.$refs.lyric.scrollTo(0, 0)
      })
=======
      this.lyricArray = parseLyric(this.lyric);
      /**歌词改变，歌词列表刷新后重新计算刷新滚动条 */
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
    },
    /**监听歌曲播放时间，滚动歌词 */
    currentTime() {
      /**歌词对应时间判断 */
<<<<<<< HEAD

=======
      
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
      let len = this.lyricArray.length
      for (let i = 0; i < len; i++) {
        const line = this.lyricArray[i]
        const nextLine = this.lyricArray[i + 1]
        /**如果歌曲currentTime大于当前行歌曲时间，并且，下一行不为空或者当前currentTime小于下一行时间 */
        if (
          this.currentTime >= line[0] &&
          (!nextLine || this.currentTime < nextLine[0])
        ) {
          this.lyricIndex = i
          /**如果歌词展示形式为列表，需要活跃歌词在中间时才滚动 */
          if (this.middle) {
            /**list形式时，活跃歌词不到中间不滚动 */
            if (
              this.lyricIndex < this.scrollNum ||
              this.lyricIndex > this.lyricArray.length - this.scrollNum
            )
<<<<<<< HEAD
              return
            /**拖动进度条小球时不能自动滚动 */
            if (!this.isDarg) {
              this.$nextTick(() => {
                if (this.lyricIndex >= 6 && this.lyricIndex < len - 1) {
                  let scrollNum = 30*(this.lyricIndex-5);
                  this.$refs.lyric.scrollTo({
                    top: scrollNum,
                    left: 100,
                    behavior: 'smooth',
                  })
                }
              })

              // console.log(this.$refs.lyric)
              // console.log(this.$refs.lyric.scroll)
              // this.$refs.lyricScroll.scrollTo({
              //   top: 100,
              //   left: 100,
              //   behavior: 'smooth',
              // })
            }
          } else {
=======
              return;
             /**拖动进度条小球时不能自动滚动 */
            if (!this.isDarg) {
              
              this.$refs.scroll.scrollTo(0,
                -30 * (this.lyricIndex - this.scrollNum),
              );
            }
          }else {
            this.$refs.scroll.scrollTo(0,-30 * this.lyricIndex, false);
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
          }
        }
      }
    },
<<<<<<< HEAD
    
=======
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
  },
}
</script>

<style lang="less" scoped>
.lyric-container {
  width: 100%;
<<<<<<< HEAD
  
=======
  height: 300px;
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
  overflow: auto;
  overflow-x: hidden;
  font-size: 12px;
}
.scroll ul li {
  list-style-type: none;
  height: 30px;
  line-height: 30px;
<<<<<<< HEAD
  transition: all 0.5s;
=======
  padding: 5px 0px;
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
  white-space: nowrap;
  text-overflow: ellipsis;
}

<<<<<<< HEAD

=======
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
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
.player-action {
  color: #409eff;
}
</style>