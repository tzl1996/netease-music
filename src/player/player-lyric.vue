<template>
  <div class="lyric-container scroll"
       :style="{height:height}"
       ref="scroll">
    <ul>
      <li class="lyric-line"
          v-for="(line,index) in lyricArray"
          :key="index"
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
    height: {
      type: String,
      default: '300px',
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
      this.lyricArray = parseLyric(this.lyric);
      /**歌词改变，歌词列表刷新后重新计算刷新滚动条 */
    },
    /**监听歌曲播放时间，滚动歌词 */
    currentTime(currentTime) {
      /**歌词对应时间判断 */
      let len = this.lyricArray.length
      for (let i = 0; i < len; i++) {
        const line = this.lyricArray[i]
        const nextLine = this.lyricArray[i + 1]
        /**如果歌曲currentTime大于当前行歌曲时间，并且，下一行不为空或者当前currentTime小于下一行时间 */
        if (
          currentTime >= line[0] &&
          (!nextLine || currentTime < nextLine[0])
        ) {
          this.lyricIndex = i
          /**如果歌词展示形式为列表，需要活跃歌词在中间时才滚动 */
          if (this.middle) {
            /**list形式时，活跃歌词不到中间不滚动 */
            if (
              this.lyricIndex < this.scrollNum ||
              this.lyricIndex > this.lyricArray.length - this.scrollNum
            )
              return;
             /**拖动进度条小球时不能自动滚动 */
            if (!this.isDarg) {
              this.$refs.scroll.scrollTo(
                -30 * (this.lyricIndex - this.scrollNum),
                2,
                false
              );
            }
          }else {
            this.$refs.scroll.scrollTo(-30 * this.lyricIndex, 0, false);
          }
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.lyric-container {
  width: 100%;
  height: 300px;
  overflow: auto;
  overflow-x: hidden;
  font-size: 12px;
}
.scroll ul li{
  list-style-type: none;
  height: 30px;
  line-height: 30px;
  padding: 5px 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
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
.player-action {
  color: #409eff;
}
</style>