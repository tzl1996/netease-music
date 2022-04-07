<template>
  <div class="artist-detail">
    <ArtistBaseinfo :artist='artist'
                    :mvCount="mvCount" />
    <div class="menu">
      <div class="menu-item"
           v-for="(item,index) in list"
           :key="item"
           :class="{actived:currentIndex == index}"
           @click="handleMenuClick(index)">{{item}}</div>
    </div>
    <div class="display-container">
      <ArtistHot50 v-if="isShow == 'hot50'"
                   :id="this.artist.id" />
      <ArtistAlbum v-else-if="isShow == 'album'"
                   :id="this.artist.id" />
      <mv-list v-else-if="isShow == 'MV'"
               :mvList="mvList"
               :show-artist="false"
               :line-num="6" />
    </div>
  </div>
</template>

<script>
import {
  reqGetArtistDesc,
  reqGetArtistDescDetail,
  reqGetArtistAlbum,
  reqGetArtistMv,
} from 'network/artist'
import ArtistBaseinfo from './childComps/artist-baseinfo'
import ArtistHot50 from './childComps/artist-hot50.vue'
import ArtistAlbum from './childComps/artist-album.vue'
import MvList from 'content/mv-list/mv-list.vue'
export default {
  name: 'ArtistDetail',
  components: {
    ArtistBaseinfo,
    ArtistHot50,
    ArtistAlbum,
    MvList,
  },
  data() {
    return {
      mvCount: 0,
      artist: null,
      list: ['热门歌曲', '专辑', 'MV', '歌手详情', '相似歌手'],
      currentIndex: 0,
      mvList: [],
      isShow: 'hot50',
    }
  },
  computed: {},
  created() {
    this.artist = this.$route.query.artist
    this.getMvList()
  },

  methods: {
    handleMenuClick(index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.isShow = 'hot50'
          break
        case 1:
          this.isShow = 'album'
          break
        case 2:
          this.isShow = 'MV'
          break
        case 3:
          this.isShow = 'descDetail'
          break
        case 4:
          this.isShow = 'simi'
          break
      }
    },
    reset() {
      this.mvList = []
      this.isShow = 'hot50'
    },
    async getMvList() {
      let res = await reqGetArtistMv(this.artist.id)
      this.mvList = res.data.mvs
    },
  },
  watch: {
    /**路由变化数据置空 */
    $route() {
      if (this.$route.path.indexOf('artist-detail') > 0) {
        this.artist = this.$route.query.artist
        this.reset()
        this.initRequest()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.artist-detail {
  width: 100%;
  padding: 10px 20px 0px 30px;
}
.menu {
  width: 100%;
  margin: 30px 0px 20px 10px;
  display: flex;
  cursor: pointer;
  .menu-item {
    height: 60px;
    width: 100px;
    line-height: 60px;
    text-align: center;
  }
  .menu-item:hover {
    color: #2d8cf0;
    border-bottom: 3px solid #2d8cf0;
  }
}
.actived {
  color: #2d8cf0;
  border-bottom: 3px solid #2d8cf0;
}
</style>