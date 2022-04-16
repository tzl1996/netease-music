<template>
  <div class="rank-list">
    <h4>官方榜</h4>
    <div class="official-list">
      <RankListItem v-if="rankList[0] && rankList[0].id"
                    :rank-id="rankList[0].id"
                    :title="rankList[0].name.slice(-3).split('')"
                    :bg-color="['#56a1e3', '#5a8beb']" />
      <RankListItem v-if="rankList[1] && rankList[1].id"
                    :rank-id="rankList[1].id"
                    :title="rankList[1].name.slice(-3).split('')"
                    :bg-color="['#34aabe', '#56c2cd']" />
      <RankListItem v-if="rankList[2] && rankList[2].id"
                    :rank-id="rankList[2].id"
                    :title="rankList[2].name.slice(-3).split('')"
                    :bg-color="['#d53d6a', '#eb638d']" />
      <RankListItem v-if="rankList[3] && rankList[3].id"
                    :rank-id="rankList[3].id"
                    :title="rankList[3].name.slice(-3).split('')"
                    :bg-color="['#c7523c', '#cc7455']" />
      <RankListItem v-if="rankList[4] && rankList[4].id"
                    :rank-id="rankList[4].id"
                    :title="rankList[4].name.slice(-3).split('')"
                    :bg-color="['#9455ce', '#9946c9']" />
    </div>
    <h4>全球榜</h4>
    <div class="play-list">
      <music-list empty-desc
                  :music-list="rankList.slice(4)"
                  disable-slide />
    </div>
  </div>
</template>

<script>
import { reqGetRankList } from 'network/discover'
import RankListItem from './childsComps/rank-list-item'
import MusicList from "content/musiclist/MusicList"
export default {
  name: 'rank-list',
  components: {
    RankListItem,
    MusicList
  },
  data() {
    return {
      rankList: [], //排行榜
    }
  },
  created() {
    reqGetRankList().then((res) => {
      this.rankList = res.data.list
      console.log(res.data);
    })
  },
}
</script>

<style lang="less" scoped>
.rank-list {
  width: 100%;
  padding: 10px 100px 0px 100px;
  height: 100%;
}
h4 {
  font-weight: bold;
  font-size: 14px;
}
.official-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0px 10px;
}
</style>