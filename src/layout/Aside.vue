<template>
  <div class="aside-container">
    <div class="menu">
      <ul class="item-list">
        <li class="item"
            v-for="(menu,index) in menuList"
            :key="index"
            :class="{actived:currentIndex == index}"
            @click="changeIndex(index,menu.link)">
          <span :class="menu.icon"></span>
          <span>{{menu.content}}</span>
        </li>
      </ul>

    </div>
    <div class="user-music-list"  v-if="loginStatus">
      <div class="user-music-list-title">
        <span>创建的歌单</span>
      </div>
      <div class="user-music-list-container scroll" >
        <div class="user-music-list-item"
             v-for="(item,index) in playList"
             :key="item.createTime"
             @click="goPlayListDetail(item.id)">
          <div class="music-list-cover">
            <img v-lazy="item.coverImgUrl"
                 alt="">
          </div>
          <div class="music-list-name">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { reqUserSongList } from 'network/user'
export default {
  name: 'LayoutAside',
  data() {
    return {
      menuList: [
        {
          link: '/individuation',
          icon: 'el-icon-tzlmusic',
          content: '个性推荐',
        },
        {
          link: '/allmusiclist',
          icon: 'el-icon-tzlic_queue_music_48px',
          content: '歌单',
        },
        {
          link: '/ranklist',
          icon: 'el-icon-tzlicon_rank',
          content: '排行榜',
        },
        {
          link: '/artist-list',
          icon: 'el-icon-tzl40one',
          content: '歌手',
        },
        { link: '/mv', icon: 'el-icon-tzlshipin2', content: 'MV' },
        // { link: "/mv-list", icon: "iconfont icon-MV", content: "全部MV" },
        {
          link: '/new-songs',
          icon: 'el-icon-tzlMusic-Note',
          content: '最新音乐',
        },
      ],
      currentIndex: 0,
      playList: [],
    }
  },
  created() {
    this.getUserSongList()
  },
  computed:{
    loginStatus(){
      return this.$store.getters.getLoginStatus;
    }
  },
  methods: {
    changeIndex(index, link) {
      this.currentIndex = index
      this.$router.push(link)
    },
    async getUserSongList() {
      let id = localStorage.getItem('userId')
      if (id) {
        let res = await reqUserSongList(id)
        if (res.data.code == 200) {
          this.playList = res.data.playlist
        }
      }
    },
    goPlayListDetail(id){
      this.$router.push({
        name:'musiclistdetail',
        params:{
          id,
          time:new Date().getTime(),
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.aside-container {
  background-color: #f9f9f9;
  height: calc(100% - 58px - 60px);
  width: 18%;
  float: left;
  padding-left: 1px;
}
a {
  text-decoration: none;
  color: inherit;
}
.menu {
  height: 45%;
  .item-list {
    height: 100%;
    .item {
      padding-left: 20px;
      height: calc(100% / 6);

      line-height: 50px;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      span {
        font-size: 14px;
        margin-right: 5px;
      }
    }
    .actived {
      color: #2d8cf0;
    }
    .item:hover {
      color: #2d8cf0;
      border-left: 3px solid #2d8cf0;
    }
  }
}

.user-music-list {
  height: calc(50% - 60px);
  padding: 20px 10px 0px 5px;
  .user-music-list-title {
  font-size: 13px; 
}
  
}
.user-music-list-container{
  height: 100%;
  overflow-y: auto;
  .user-music-list-item {
    height: 28px;
    padding: 3px;
    display: flex;
    cursor: pointer;
    padding-left: 20px;
    .music-list-cover {
      height: 100%;
      img {
        height: 100%;
        border-radius: 2px;
      }
    }
    .music-list-name{
      font-size: 12px;
      height: 100%;
      line-height: 26px;
      padding-left: 3px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
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
</style>