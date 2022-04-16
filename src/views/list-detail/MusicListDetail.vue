<template>
  <div class="music-list-detail">
    <BaseInfo :baseInfo="baseInfo" />
    <!-- 歌单列表 -->
    <div class="detail-container">
      <div class="detail-header">
        <div class="header-item"
             :class="{actived:currentIndex == index}"
             v-for="(item,index) in list"
             :key="index"
             @click="handleMenuClick(index)">{{item}}</div>
      </div>
      <div class="content">
        <SongList :music-list="musicList"
                  ref="songList"
                  v-if="isShow == 'music'" />
        <div class="recommends"
             v-if="isShow == 'recommend'">
          <Recommends :recommends='recommends' />
          <Pagination :limit="limit"
                      :offset="offset"
                      :total="total" />
        </div>
        <MusicListLive :subs="subs"
                       v-if="isShow == 'sub'" />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'common/pagination/Pagination'
import {
  reqGetMusicListDetail,
  songDetail,
  baseInfo,
  reqGetSongsDetail,
  reqGetSub,
  reqGetRecommends,
} from 'network/detail'
import BaseInfo from './childComps/BaseInfo.vue'
import MusicListLive from './childComps/MusicListLive.vue'
import Recommends from 'content/recommends/Recommends.vue'
import SongList from 'common/song-list/SongList.vue'

export default {
  name: 'MusicListDetail',
  components: {
    BaseInfo,
    Recommends,
    MusicListLive,
    SongList,
    Pagination,
  },
  data() {
    return {
      currentIndex: 0, //控制显示歌单、评论、收藏者 标题样式
      id: null,
      limit: 30,
      offset: 1, //分页
      total: null,
      list: [],
      baseInfo: {},
      musicList: [],
      isShow: 'music', //控制显示歌单、评论、收藏者
      recommends: null,
      recommendsCount: 0, //歌单评论数
      subs: null,
      length: null, //获取歌曲列表长度，用于刷新scroll
    }
  },
  created() {
    this.getDetailRequestDate()
    this.getRecommends()
    this.getSubs()
    this.$bus.$on('changeOffset', (page) => {
      this.offset = page
      this.getRecommends()
    })
  },
  methods: {
    /**根据导航切换 */
    handleMenuClick(index) {
      switch (index) {
        case 0:
          this.currentIndex = index
          this.isShow = 'music'
          break
        case 1:
          this.currentIndex = index
          this.isShow = 'recommend'
          break
        case 2:
          this.currentIndex = index
          this.isShow = 'sub'
      }
    },
    init() {
      this.limit = 30
      this.list = []
      this.offset = 1
      this.baseInfo = {}
      this.musicList = []
      this.isShow = 'music' //控制显示歌单、评论、收藏者
      this.recommends = null
      this.subs = null
    },
    /**获取歌单详情网络数据 */
    async getDetailRequestDate() {
      this.id = this.$route.params.id
      if (!this.id) return
      this.init()
      let res = await reqGetMusicListDetail(this.id)
      /* 获取封装歌单的数据 */
      this.baseInfo = new baseInfo(res.data.playlist)
      /* 获取歌单评论数 */
      this.recommendsCount = res.data.playlist.commentCount
      let str = '评论(' + this.recommendsCount + ')'
      this.list = ['歌曲列表', str, '收藏者']

      /**遍历查询歌单所有歌曲详情 */
      const trackIds = res.data.playlist.trackIds
      /**获取歌曲列表长度 */
      this.length = trackIds.length
      for (let i = 0, length = trackIds.length; i < length; i++) {
        reqGetSongsDetail(trackIds[i].id).then((res) => {
          let song = new songDetail(res.data.songs)
          this.musicList.push(song)
        })
      }
      this.getRecommends();
      this.getSubs();
    },
    /* 获取评论数据 */
    getRecommends() {
      reqGetRecommends(this.$route.params.id, this.limit, this.offset).then(
        (res) => {
          
          this.recommends = res.data.comments
          this.total = res.data.total
        }
      )
    },
    /* 获取歌单收藏者 */
    getSubs() {
      reqGetSub(this.id, this.limit, this.offset).then((res) => {
        this.subs = res.data.subscribers
      })
    },
  },
  watch: {
    $route: {
      
      handler() {
        if (this.$route.path.indexOf('musiclistdetail') >= 0) {
          this.getDetailRequestDate()
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.music-list-detail {
  width: 100%;
  padding: 10px 30px;
  .detail-container {
    margin-top: 20px;
  }
}
.detail-header {
  width: 100%;
  height: 60px;
  display: flex;
  .header-item {
    width: 140px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    padding-right: 10px;
  }
  .header-item:hover {
    border-bottom: 3px solid #2d8cf0;
    color: #2d8cf0;
  }
}
.actived {
  border-bottom: 3px solid #2d8cf0;
  color: #2d8cf0;
}
</style>