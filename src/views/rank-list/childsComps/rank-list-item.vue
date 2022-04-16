<template>
  <div class="rank-list-item" @click="toMusicDetail(rankId)">
    <div class="rank-item-top"
         :style="{
        background:
          'linear-gradient(to right,' + bgColor[0] + ',' + bgColor[1] + ')',
      }">
      <div class="left">
        <div class="left-itemF">
          <i>{{title[0]}}</i>
        </div>
        <div class="set">
          <div class="left-item">
            <i>{{title[1]}}</i>
          </div>
          <div class="left-item">
            <i>{{title[2]}}</i>
          </div>
          <div class="update">03月13日</div>
        </div>
      </div>
      <div class="right">
        <i class="el-icon-tzlbofangsanjiaoxing"></i>
      </div>
    </div>
    <div class="item-content">
      <el-table :data="musiclist"
                :show-header="false"
                stripe
                style="width: 100%">
        <el-table-column min-width="20%">
          <template slot-scope="scope"
                    type="index">
            <div class="column-id row"
                 :class="[scope.$index <=2 ? 'active' : '']">
                <span>
                  {{"0"+(scope.$index +1)}}</span>
              
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="40%">
          <template slot-scope="scope">
            <div class="column-name row">
              <span>{{scope.row.name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="40%">
          <template slot-scope="scope">
            <div class="column-name row">
              <div class="column-artist">
                <span>{{scope.row.artist}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  reqGetMusicListDetail,
  reqGetSongsDetail,
  songDetail,
} from 'network/detail'
export default {
  name: 'rank-list-item',
  data() {
    return {
      musiclist: [],
      musicListDetail: [],
      /*  每个组件都代表一个榜单，有个榜单rankId，通过rankID 请求该榜单的数据*/
    }
  },
  props: {
    rankId: {
      default: 0,
    },
    title: {
      type: Array,
      default: () => [],
    },
    bgColor: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    if (this.rankId != null) {
      reqGetMusicListDetail(this.rankId).then((res) => {
        this.musicListDetail = res.data
        /** 遍历查询歌单的所有歌曲情况（取前8名）*/
        for (let i of this.musicListDetail.playlist.trackIds.slice(0, 8)) {
          reqGetSongsDetail(i.id).then((res) => {
            /* 获得歌曲信息，对歌曲信息进行封装*/
            let song = new songDetail(res.data.songs)
            this.musiclist.push(song)
            /**刷新scroll 这部分不知道有什么用*/
            //     if (
            //       this.musiclist.length == 8 &&
            //       this.getTitleString.indexOf("热") == 0
            //     ) {
            //       this.$emit("refresh"); // 向父组件传递
            //     }
          })
        }
      })
    }
  },
  methods:{
    toMusicDetail(id){
      let params = {
        id,
        time:new Date().getTime(),
      }
      this.$router.push({name:'musiclistdetail',params});
    }
  }
}
</script>

<style lang="less" scoped>
.rank-list-item {
  cursor: pointer;
  width: calc(30%);
  height: 400px;
  margin-right: 25px;
}
// 榜单样式头部
.rank-item-top {
  width: 100%;
  height: 100px;
  position: relative;
}
.rank-item-top .left {
  width: 200px;
  display: flex;
  align-items: center;
  padding: 0px 25px;
  padding-top: 10px;
  color: #fff;
  .left-itemF {
    font-size: 54px;
    margin-right: 10px;
  }
  .set {
    position: relative;

    .left-item {
      font-size: 26px;
      float: left;
    }
    .update {
      font-size: 14px;
      padding-top: 1px;
      margin-left: 5px;
    }
  }
}
.right {
  position: absolute;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  right: 20px;
  bottom: calc(50% - 20px);
  text-align: center;
  line-height: 40px;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    margin-left: 5px;
  }
}
.item-content {
  width: 100%;
}

.el-table{

   /deep/ td {
      padding: 2px 0px ;
      cursor: pointer;
      
    }
    
}
//table
.row{
  font-size: 13px;
  padding: 0px;
}
.column-id{
  text-align: left;
  white-space:nowrap;
}
.column-name{
  padding-left: 0px;
  white-space:nowrap;
   text-overflow:ellipsis;
   overflow: hidden;
}
.column-artist{
  text-align: right;
  white-space:nowrap;
   text-overflow:ellipsis;
   overflow: hidden;

}
.active {
  color: red;
}
</style>