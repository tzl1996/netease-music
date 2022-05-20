<template>
  <div class="new-songs-list">
    <h4 class="top">最新音乐</h4>
    <div class="songs-list-container">
      <div
        class="songs-list-container-group"
        v-for="(item, index) in newSongList"
        :key="item.id"
      >
        <div class="number">
          <span>
            {{ index + 1 }}
          </span>
        </div>
        <div class="title">
          <img v-lazy="item.picUrl" alt="" />
          <div class="icon"></div>
        </div>

        <div class="mess">
          <div>{{ item.name }}</div>
          <br />
          <div class="bottom">{{ item.song.album.company }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewSongs",
  props: {
    newSongList: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="less" scoped>
.new-songs-list {
  width: 100%;
}
.top {
  border-bottom: 1px solid #b8b6b6;
}
.songs-list-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.songs-list-container-group {
  padding: 10px 0px;
  display: flex;
  width: calc(50%);
  height: 70px;
  cursor: pointer;
}
.number {
  height: 70px;
  width: 40px;
  text-align: center;
  line-height: 70px;
  span {
    font-size: 14px;
  }
}
.title {
  height: 100%;
  img {
    height: 100%;
  }
  
}
.mess {
    flex: 1;
    margin-left: 10px;
    font-size: 13px;
    position: relative;
  }
.mess .bottom {
  position: absolute;
  bottom: 0px;
}
h4 {
  padding-left: 10px;
  font-size: 14px;
  padding-bottom: 8px;
}
</style>