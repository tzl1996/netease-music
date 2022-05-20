<template>
  <div class="player-cover"
       v-if="song"
       @click="showPure">
    <div class="cover-left">
      <transition name="cover-slide">
        <div class="icon">
          <i class="el-icon-tzlmaximizezuidahua"></i>
        </div>
      </transition>
      <img v-lazy="song.pic || song.picUrl || ''"
           alt="" />
    </div>
    <div class="cover-right">
      <div class="song-name">{{ song.name }}</div>
      <div class="song-artist">{{ song.artist }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCover',
  props: {
    song: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    showPure() {
      this.$parent.isPlayPure = true
    },
  },
}
</script>

<style lang="less" scoped>
.player-cover {
  width: 18%;
  height: 60px;
  position: absolute;
  bottom: 60px;
  left: 0px;
  margin-left: 10px;
  display: flex;
  align-items: flex-end;
  .cover-left {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    line-height: 60px;
    cursor: pointer;
    text-align: center;

    z-index: 1;
    img {
      width: 100%;
      border-radius: 4px;
    }

    .icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 100%;
      transition: all 0.3s;
      z-index: 10;
      background: #000;
      opacity: 0;
      i {
        font-size: 26px;
        color: #fff;
        font-weight: 500;
      }
    }
    .icon:hover {
      opacity: 0.4;
    }
  }
  .cover-left:hover {
    // position: relative;
    // background-color: #000;
    // opacity: 1;
  }
  .cover-right {
    flex: 1;
    padding: 0px 10px;
    position: relative;
    .song-name {
      font-size: 14px;
      font-weight: 600;
      position: absolute;
      top: -60px;
      white-space: nowrap;

      text-overflow: ellipsis;
    }
    .song-artist {
      position: absolute;
      bottom: 0px;
      overflow: hidden;
      white-space: nowrap;
      font-size: 13px;
      text-overflow: ellipsis;
    }
  }
}
.cover-slide-enter-active {
  animation: slideIn 0.4s ease-in-out;
}
.cover-slide-leave-active {
  animation: slideOut 0.4s ease-in-out;
}
@keyframes slideIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>