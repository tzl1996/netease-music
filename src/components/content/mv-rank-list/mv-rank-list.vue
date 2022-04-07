<template>
  <div class="mv-rank-list">
    <div class="rank-list-container">
      <div class="rank-item"
           v-for="(mv,index) in rankList"
           :key="index"
           @mouseenter="handleEnter(index)"
           @mouseleave="handleleave(index)"
           @click="goMvDetail(mv.id)">
        <div class="rank-item-index">{{index+1}}</div>
        <div class="rank-item-cover">
          <img v-lazy="mv.cover ||mv.picUrl"
               alt="">
          <div class="play-count">
            <i class="el-icon-tzlshipin2"></i>
            <span>{{getPlayCount(mv.playCount)}}</span>
          </div>
          <transition name="hover">
            <div class="play-icon"
                 v-show="currentIndex == index">
              <i class="el-icon-tzl24gf-play"></i>
            </div>
          </transition>
        </div>
        <div class="rank-item-desc">
          <div class="mv-name">MV <span>{{mv.name}}</span></div>
          <div class="mv-artist">{{mv.artistName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mv-rank-list',
  props: {
    rankList: {
      tyoe: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentIndex: null,
    }
  },
  methods: {
    getPlayCount(count) {
      return count < 10000 ? count : Math.floor(count / 10000) + '万'
    },
    handleEnter(index) {
      this.currentIndex = index
    },
    handleleave(index) {
      this.currentIndex = null
    },
    goMvDetail(id){
      this.$router.push(`/mv-detail/${id}`);
    }
  },
}
</script>

<style lang="less" scoped>
.mv-rank-list {
  width: 100%;
}
.rank-list-container {
  display: flex;
  flex-wrap: wrap;
}
.rank-item {
  width: calc(100% / 2);
  cursor: pointer;
  display: flex;
  position: relative;
  &-index {
    width: 20px;
    line-height: 120px;
  }
  &-cover {
    width: 160px;

    margin: 10px 2px;
    position: relative;

    img {
      width: 100%;
    }
    .play-count {
      font-size: 12px;
      color: #fff;
      margin: 2px;
      position: absolute;
      right: 0px;
      top: 0px;
      i {
        margin-right: 5px;
      }
    }
    .play-icon {
      position: absolute;
      width: 34px;
      height: 34px;
      background-color: #fff;
      border-radius: 50%;
      top: calc(50% - 17px);
      left: calc(50% - 17px);
      line-height: 39px;
      text-align: center;
      opacity: 0.6;
      i {
        margin-left: 4px;
        color: #e83c3c;
        font-size: 20px;
      }
    }
  }
  &-desc {
    margin-left: 3px;

    .mv-name {
      white-space: nowrap;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      position: absolute;
      top: 10px;
      span {
        margin-left: 2px;
      }
    }
    .mv-artist {
      position: absolute;
      bottom: 20px;
      font-size: 13px;
    }
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
    opacity: 0.6;
  }
}
@keyframes hoverOut {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 0;
  }
}
</style>