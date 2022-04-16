<template>
  <div class="artist-base-info">
    <div class="artist-avatar">
      <img v-lazy="artist.picUrl"
           alt="">
    </div>
    <div class="artist-desc">
      <div class="name-container">
        <div class="tag">歌手</div>
        <div class="name">{{artist.name}}</div>
      </div>
      <div class="publish">
        <div class="item"><span>单曲数：</span>{{artist.musicSize}}</div>
        <div class="item"><span>专辑数：</span>{{artist.albumSize}}</div>
        <div class="item"><span>MV数：</span>{{mvCount}}</div>
        <div class="item"><span>简介：</span>{{desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetArtistDesc } from 'network/artist'
export default {
  name: 'artist-baseinfo',
  props: {
    artist: {
      type: Object,
      default: () => {},
    },
    mvCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      desc: '',
    }
  },
  watch: {
    artist: {
      immediate: true,
      handler() {
        reqGetArtistDesc(this.artist.id).then((res) => {
          this.desc = res.data.briefDesc
        })
      },
    },
  },
}
</script>

<style lang='less' scoped>
.artist-base-info {
  height: 150px;
  width: 100%;
  display: flex;
  padding: 0px 20px 0px 10px;
}
.artist-avatar {
  width: 200px;
  height: 100%;
  
  img {
    width: 100%;
  }
}
.artist-desc {
  flex: 1;
  padding-left: 20px;

  .name-container {
    display: flex;
    height: 30px;
    margin: 4px 0px 10px 0px;

    .tag {
      height: 26px;
      width: 50px;
      margin-right: 5px;
      border-radius: 3px;
      line-height: 24px;
      text-align: center;
      color: #e83c3c;
      font-weight: 700;
      border: 1px solid #e83c3c;
    }
    .name {
      height: 26px;
      line-height: 25px;
      font-size: 16px;
      font-weight: 700;
    }
  }
  .publish {
    .item {
      margin-bottom: 8px;
      font-size: 13px;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      span {
        color: #2d8cf0;
      }
    }
  }
}
</style>