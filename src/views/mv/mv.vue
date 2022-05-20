<template>
  <div class="mv-container">
    <div class="new-mv-container">
      <div class="mv-title">
        <h4>最新MV</h4>
        <div class="title-list">
          <div class="title-item"
               v-for="(item,index) in  areas"
               :key="index"
               :class="{actived:currentArea == item}"
               @click="handleAreas(item)">{{item}}</div>
        </div>
      </div>
      <mv-list :mvList = "mvList"/>
    </div>
    <div class="recommend-mv-container">
      <div class="mv-title">
        <h4>推荐MV</h4>
      </div>
      <mv-list :mvList = "perMV"/>
    </div>
    <div class="rank-mv-container">
      <div class="mv-title">
        <h4>MV排行榜</h4>
        <div class="title-list">
          <div class="title-item"
               v-for="(item,index) in  mvRank"
               :key="index"
               :class="{actived:currentRankMV == item}"
               @click="handleRank(item)">{{item}}</div>
        </div>
      </div>
      <mv-rank-list :rankList="topMv"/>
    </div>
  </div>
</template>

<script>
import MvList from 'content/mv-list/mv-list';
import mvRankList from 'content/mv-rank-list/mv-rank-list'
import { reqGetNewMV, reqGetTopMv, reqPersonalized } from 'network/mv'

export default {
  name: 'mv',
  components: {
    MvList,
    mvRankList
  },
  data() {
    return {
      areas: ['内地', '港台', '欧美', '日本', '韩国'],
      mvRank: ['内地', '港台', '欧美', '日本', '韩国'],
      mvList: [], //最新MV
      topMv: [], //排行榜MV
      perMV: [], //推荐MV
      limit: 8,
      currentArea: '内地',
      currentRankMV: '内地',
    }
  },
  created() {
    this.getNewMv()
    this.getTopMv()
    this.Personalized()
  },
  methods: {
    handleAreas(item){
      this.currentArea = item;
    },
    handleRank(item){
      this.currentRankMV = item;
    },
    getNewMv() {
      reqGetNewMV(this.limit, this.currentArea).then((res) => {
        this.mvList = res.data.data
      })
    },
    Personalized() {
      reqPersonalized().then((res) => {
        this.perMV = res.data.result
      })
    },
    getTopMv() {
      reqGetTopMv(10, this.currentArea).then((res) => {
        this.topMv = res.data.data
      })
    },
  },
}
</script>

<style lang='less' scoped>
.mv-container {
  width: 100%;
  padding: 10px 60px;
}
.mv-title {
  height: 40px;
  display: flex;
  h4 {
    font-size: 15px;
    margin-right: 5px;
  }
  .title-list {
    display: flex;
    line-height: 34px;
    cursor: pointer;
  }
  .title-item {
    width: 40px;
    font-size: 13px;
  }
  .title-item:hover {
    color: #2d8cf0;
  }
  .actived {
    color: #2d8cf0;
  }
}
</style>