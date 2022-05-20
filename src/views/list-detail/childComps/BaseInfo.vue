<template>
  <div class="baseInfo">
    <div class="left">
      <img v-lazy="baseInfo.img"
           alt="">
    </div>
    <div class="right">
      <div class="main-content">
        <div class="title">
          <div class="title-button">歌单</div>
          <div class="title-name">{{baseInfo.name}}</div>
        </div>
        <div class="create-info">
          <div class="creator-avatar">
            <img v-lazy="baseInfo.creatorAvatar"
                 alt="">
          </div>
          <div class="creator-name">
            {{baseInfo.creatorName}}
          </div>
          <div class="create-time">
            创建时间：{{createTime}}
          </div>
        </div>
        <div class="options-list">
          <div class="play" @click="playAllMusic">
            <div class="play-left">
              <i class="el-icon-tzlbofangsanjiaoxing"></i>
            </div>
            <div class="play-right">播放全部</div>
          </div>
          <div class="comman">
            <i class="el-icon-tzlshoucangjia"></i>收藏({{baseInfo.subscribedCount}})
          </div>
          <div class="comman">
            <i class="el-icon-tzlzhuanfa-mian"></i>分享({{baseInfo.shareCount}})
          </div>
        </div>
        <div class="content-bottom">
          <div class="tags">
            标签：<span>{{tags}}</span>
          </div>
          <div class="desc">
            简介：<span>{{baseInfo.title}}</span>
          </div>
        </div>
      </div>
      <div class="count-container">
        <div class="music-count">
          <div class="top">歌曲数</div>
          <div class="bottom">{{baseInfo.trackCount}}</div>
        </div>
        <div class="play-count">
          <div class="top">播放数</div>
          <div class="buttom">{{playCount}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { formatDate } from 'utils/tool'
export default {
  name: 'BaseInfo',
  mixins:[],
  props: {
    baseInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    createTime() {
      return formatDate(new Date(this.baseInfo.createTime), 'yyyy-MM-dd')
    },
    tags() {
      return this.baseInfo.tags && this.baseInfo.tags.join('/')
    },
    playCount() {
      return this.baseInfo.playCount < 10000
        ? this.baseInfo.playCount
        : Math.floor(this.baseInfo.playCount / 10000) + '万'
    },
  },
  methods:{
    playAllMusic(){
      this.$bus.$emit('playAll',0);
    }
  }
}
</script>

<style lang="less" scoped>
.baseInfo {
  margin-top: 10px;
  width: 100%;
  height: 200px;
  // background-color: aquamarine;
  display: flex;
}
.left {
  flex: 1;
  height: 100%;
  padding: 0px 10px 10px 0px;
  margin-right: 10px;
  img {
    height: 100%;
  }
}

.right {
  width: 80%;
  height: 28px;
  margin: 10px 10px 10px 30px;
  position: relative;
  .title {
    display: flex;
    .title-button {
      height: 100%;
      width: 50px;
      border: 1px solid #e83c3c;
      border-radius: 8%;
      line-height: 26px;
      text-align: center;
      font-weight: bold;
      color: #e83c3c;
      font-size: 14px;
      margin-right: 5px;
    }
    .title-name {
      height: 100%;
      line-height: 26px;
      font-weight: bold;
    }
  }
  .create-info {
    margin-top: 10px;
    display: flex;
    height: 30px;
    .creator-avatar {
      margin-right: 10px;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .creator-name {
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
      font-size: 14px;
    }
    .create-time {
      height: 100%;
      line-height: 30px;
      font-size: 14px;
    }
  }
  .options-list {
    margin-top: 10px;
    display: flex;

    .play {
      display: flex;
      height: 40px;
      width: 150px;
      align-items: center;
      background-color: #e83c3c;
      border-radius: 7px;
      justify-content: center;
      cursor: pointer;
      .play-left {
        margin-right: 6px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1.5px solid #e3e3e3;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 2px;
        color: #e3e3e3;
        i {
          font-size: 12px;
        }
      }
      .play-right {
        color: #e3e3e3;
        font-size: 13px;
        font-weight: 600;
      }
    }
    .play:hover {
      opacity: 0.7;
    }
    .comman {
      border: 1px solid #eeeff1;
      width: 150px;
      border-radius: 8px;
      margin-left: 20px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      font-size: 13px;
      i {
        margin-right: 10px;
      }
    }
    .comman:hover {
      border: 1px solid #2d8cf0;
      opacity: 0.7;
    }
  }
  .content-bottom {
    margin-top: 15px;
    font-size: 13px;
    .tags {
      margin-bottom: 3px;
      span {
        color: #2d8cf0;
      }
    }
    .desc {
      display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    }
  }
}
.count-container {
  height: 50px;
  width: 150px;

  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  .music-count {
    padding-right: 10px;
    border-right: 1px solid #e5e7ec;
    div {
      font-size: 12px;
      margin-bottom: 2px;
    }
  }
  .play-count {
    padding-left: 6px;

    div {
      font-size: 12px;
      margin-bottom: 2px;
    }
  }
}
</style>