<template>
  <div class="song-list-container">
    <el-table
      :data="musicList"
      stripe
      style="width: 100%"
      :row-class-name="createIndex"
      @row-dblclick="handleDbclick"
    >
      <el-table-column v-if="lines[0]" label="" min-width="7%">
        <template slot-scope="scope">
          <div class="column-index common">
            <span class="el-icon-tzlsound-filling-fill active" v-show="playIndex == scope.$index"></span>
            <span  v-show="playIndex != scope.$index">{{ getIndex(scope.$index) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="lines[1]" label="操作" min-width="10%">
        <template>
          <div class="column-name common">
            <span class="el-icon-tzlxihuan2"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="lines[2]" label="音乐标题" min-width="30%">
        <template slot-scope="scope">
          <div class="column-name common">
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="lines[3]" label="歌手" min-width="30%">
        <template slot-scope="scope">
          <div class="column-artist common">
            <span>{{ scope.row.artist }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="lines[4]" label="专辑" min-width="30%">
        <template slot-scope="scope">
          <div class="column-album common">
            <span>{{ scope.row.album }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="lines[5]" label="时长" min-width="20%">
        <template slot-scope="scope">
          <div class="column-time common">
            <span>{{ scope.row.time }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { randomStr } from "utils/random";
import { playMusic } from "mixin/global/play-music";
import {playing} from 'player/playing'
export default {
  name: "SongList",
  props: {
    musicList: {
      type: Array,
      default: () => [],
    },
    lines: {
      type: Array,
      default: () => [true, true, true, true, true, true],
    },
  },
  mixins: [playMusic,playing],
  data() {
    return {
      /* 给每个songlist 设置唯一id */
      id: randomStr(),
    };
  },
  mounted(){
    this.$bus.$on('playAll',(index) =>{
      this.playMusic(index);
    })
  },
  methods: {
    handleDbclick(row, ) {
      /* 生成播放列表 并播放*/
      this.playMusic(row.index);
    },
    getIndex(index) {
      return index < 9 ? "0" + (index + 1) : index + 1;
    },
    //为song-list每一个song添加一个index属性
    createIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
  },
};
</script>

<style lang="less" scoped>
.song-list-container {
  width: 100%;

  cursor: pointer;
}
/deep/.el-table {
   td {
    padding: 2px 0px;
  }
  tr{
    
    th{
      font-size: 14px;
      color: #000000;
      font-weight: 500;
      padding: 5px 0px;
      margin-right: 5px;
      border-left: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      background-color: #f9f9f9;
    }
  }
}
.common {
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.active{
  color: #2d8cf0;
}
</style>