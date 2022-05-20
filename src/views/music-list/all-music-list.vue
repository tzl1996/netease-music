<template>
  <div class="all-musiclist">
    <div class="musiclist-header">
      <el-popover placement="bottom-start"
                  trigger="click"
                  :append-to-body="false"
                  :popper-options="{
                    boundariesElement: 'body',
                    positionFixed: true,
	                  preventOverflow: true
                  }">
        <MuscilistCategory :categories="categories"
                           :catelist="list"
                           v-if="showAllCate"
                           @getCate="getPlayList" />
        <el-button slot="reference"
                   @click.stop="showAllCate = !showAllCate">
          全部
          <i class="el-icon-tzldown"></i>
        </el-button>
      </el-popover>
    </div>
    <div class="titlelist-container">
      <div class="titlelist-left">热门标签</div>
      <div class="titlelist-right">
        <div class="title-item"
             :class="{actived:currentIndex == index}"
             v-for="(tag,index) in  hotTags"
             :key="index"
             @click="changeIndex(index)">{{tag}}</div>
      </div>
    </div>
    <div class="musiclist-main">
      <!-- <music-list/> -->
      <MusicList :emptyDesc="true"
                 :music-list="playList" />
    </div>
    <div class="pagination">
      <Pagination  :limit="limit" :offset="offset" :total="total"/>
    </div>
  </div>
</template>

<script>
import {
  reqGetCatList,
  reqGetMusicListHot,
  reqGetPlayList,
} from 'network/music-list'
import MusicList from 'content/musiclist/MusicList'
import MuscilistCategory from './category-list';
import Pagination from 'common/pagination/Pagination.vue'
export default {
  name: 'allmusic-list',
  components: {
    MusicList,
    MuscilistCategory,
    Pagination,
  },
  data() {
    return {
      showAllCate: false,
      currentIndex: 0,
      categories: [],
      list: [], //存放所有分类选项的列表,内部是categories所有分类的子数组
      /**@ ArrayItems
       *0：langs:[],//语种
       *1：styles:[],//风格
       *2：scenes:[],//场景
       *3：emotions:[],//情感
       *4：themes:[],//主题
       */
      hotTags: [], //热门标签
      playList: [], //歌单列表
      // 歌单列表
      limit: 30,
      offset: 1,
      cat: '全部',
      total:0,
    }
  },
  created() {
    reqGetCatList().then((res) => {
      let result = res.data

      this.categories = Object.values(res.data.categories)
      let subs = res.data.sub
      /**对sub进行分类 */
      for (let i = 0; i < this.categories.length; i++) {
        this.list[i] = subs.filter((item) => {
          return item.category == i
        })
      }
    })
    reqGetMusicListHot().then((res) => {
      this.hotTags = res.data.tags.map((item) => {
        return item.name
      })
      this.getPlayList(this.cat, this.limit, this.getOffset)
    });
    this.$bus.$on('changeOffset',(page) =>{
      this.handleChangePage(page);
    })
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index
      this.cat = this.hotTags[index]
      this.getPlayList(this.cat, this.limit, this.getOffset)
    },
    getPlayList(cat, limit = this.limit, getOffset = this.offset) {
      reqGetPlayList(cat, limit, getOffset).then((res) => {
        console.log(res.data)
        this.total = res.data.total;
        this.playList = res.data.playlists
      })
    },
    handleChangePage(page){
      this.offset = page;
      reqGetPlayList(this.cat,this.limit,this.offset).then((res) =>{
        this.playList = res.data.playlists;
      })

    }
  },
}
</script>

<style lang="less" scoped>
.el-button,
.el-button:hover,
.el-button.is-active,
.el-button:focus {
  background: #fff;
  color: inherit;
  border: 1px #e3e3e3 solid;
  width: 90px;
  height: 30px;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.all-musiclist {
  width: 100%;
  padding: 0px 100px;
}
.titlelist-container {
  padding: 10px 10px;
  font-size: 13px;
  display: flex;
}
.titlelist-left {
  width: 70px;
  height: 30px;
  line-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.titlelist-right {
  flex: 1;
  display: flex;
  cursor: pointer;
  .title-item {
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .title-item:hover {
    color: #2d8cf0;
  }
}
.actived {
  color: #2d8cf0;
}
.musiclist-main {
  margin-top: 10px;
}
</style>