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
  </div>
</template>

<script>
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
  methods: {
    changeIndex(index,link) {
      this.currentIndex = index;
      this.$router.push(link)
    },
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
  height: 50%;
  .item-list {
    .item {
      padding-left: 20px;
      height: 50px;

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
</style>