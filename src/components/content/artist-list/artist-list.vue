<template>
  <div class="artist-list">
    <div class="artist-container"
         v-for="(artist, index) in artistList"
         :key="index"
         @click="goArtistDetail(artist)">
      <div class="artist-cover"
           @mouseenter="handleEnter(index)"
           @mouseleave="handleleave(index)">
        <img v-lazy="artist.picUrl || artist.coverImgUrl"
             alt="">
        <transition name="hover">
          <div class="button"
               v-show="currentIndex == index">查看详情</div>
        </transition>
      </div>
      <div class="artist-name">{{artist.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'artist-list',
  props: {
    artistList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentIndex: null,
    }
  },
  methods: {
    handleEnter(index) {
      this.currentIndex = index
    },
    handleleave(index) {
      this.currentIndex = null
    },
    goArtistDetail(artist) {
      this.$router.push({
        name: 'artist-detail',
        query: {
          artist: artist,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.artist-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.artist-container {
  width: calc(100% / 6);
  margin-bottom: 10px;
  cursor: pointer;
  .artist-cover {
    width: 100%;
    padding: 0px 10px;
    position: relative;
    img {
      width: 100%;
    }
    .button {
      position: absolute;
      width: 60px;
      height: 20px;
      line-height: 18px;
      top: calc(50% - 10px);
      left: calc(50% - 30px);
      font-size: 11px;
      border: 1px solid #2d8cf0;
      border-radius: 10px;
      text-align: center;
      color: #2d8cf0;
    }
  }
  .artist-name {
    padding-left: 10px;
  }
}
.hover-enter-active {
  animation: hoverIn 0.5s ease-in;
}
.hover-leave-active {
  animation: hoverOut 0.5s ease-in;
}
@keyframes hoverIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hoverOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>