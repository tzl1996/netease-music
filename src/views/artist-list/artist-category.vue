<template>
  <div class="artists-container">
    <div class="artist-category">
      <div class="areas">
        <div class="title">语种：</div>
        <div class="area"
             v-for="(area,index) in areas"
             :key="index"
             :class="{actived:currentArea == area.value}"
             @click="handleArea(area.value)">{{area.content}}</div>
      </div>
      <div class="types">
        <div class="title">分类：</div>
        <div class="type"
             v-for="(type,index) in types"
             :key="index"
             :class="{actived:currentType == type.value}"
             @click="handleType(type.value)">{{type.content}}</div>
      </div>
      <div class="fnames">
        <div class="title">筛选：</div>
        <div class="name"
             v-for="(name,index) in Fnames"
             :key="index"
             :class="{actived:currentName == name.value}"
             @click="handleName(name.value)">{{name.content}}</div>
      </div>

    </div>
    <div class="artist-category-container">
      <artist-list :artistList="artistList" />
    </div>
    <div>我是</div>
    <div class="pagination-container">
      <Pagination :limit="limit" :offset="offset" v-if="showPagination"/>
    </div>
  </div>
</template>

<script>
import artistList from 'content/artist-list/artist-list'
import { reqGetArtist } from 'network/discover'
import Pagination from 'common/pagination/Pagination'
import { areas, types, Fnames } from './data'
export default {
  name: 'artist-category',
  components: {
    artistList,
    Pagination,
  },
  data() {
    return {
      areas,
      types,
      Fnames,
      currentArea: -1,
      currentType: -1,
      currentName: -1,
      artistList: [],
      limit: 30,
      offset: 1,
      showPagination: true,
    }
  },
  mounted() {
    this.getArtist()
    this.$bus.$on('changeOffset', (page) => {
      this.offset = page;
      this.getArtist()
    })
  },
  methods: {
    async getArtist(
      area = this.currentArea,
      type = this.currentType,
      name = this.currentName,
      limit = this.limit,
      offset = this.offset
    ) {
      try {
        let res = await reqGetArtist(area, type, name, limit, offset)
        this.artistList = res.data.artists;
        this.showPagination = true
      } catch (error) {
        console.log(error.message)
      }
    },
    handleArea(value) {
      this.currentArea = value
      // 通过利用v-if让pagination组件强制刷新，使得其初始化高亮第一页的页码
      this.showPagination = false;
      this.offset = 1;
      this.getArtist()
      
    },
    handleType(value) {
      this.currentType = value
      this.showPagination = false;
      this.offset = 1;
      this.getArtist()
      
    },
    handleName(value) {
      this.currentName = value
      this.showPagination = false;
      this.offset = 1;
      this.getArtist()
      
    },
  },
}
</script>

<style lang="less" scoped>
.artists-container {
  width: 100%;
  height: calc(100% - 60px - 58px);
  padding: 0px 100px;
  font-size: 13px;
}
.artist-category {
  width: 100%;
  margin: 10px 0px;
}
.artist-category > div {
  display: flex;
  height: 40px;
  cursor: pointer;
  div {
    margin: 10px;
  }
}
.title {
  cursor: auto;
}
.actived {
  color: #2d8cf0;
}

.area:hover,
.type:hover,
.name:hover {
  color: #2d8cf0;
}
</style>