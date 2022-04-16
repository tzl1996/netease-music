<template>
  <div class="new-song">
    <div class="new-song-container">
      <div class="new-song-title">
        <div class="title-item"
             v-for="(area,index) in areas"
             :key="index"
             :class="{actived:currentArea == index}" 
             @click="handleGetTopSongs(index)">{{area.content}}</div>
      </div>

    </div>
    <SongList :musicList="musicList"
              newSong />
  </div>
</template>

<script>
import { reqGetTopSongs } from 'network/discover'
import { reqGetSongsDetail, songDetail } from 'network/detail'
import SongList from 'common/song-list/SongList.vue'
export default {
  name: 'new-songs',
  components: {
    SongList,
  },
  data() {
    return {
      areas: [
        { value: 0, content: '全部' },
        { value: 7, content: '华语' },
        { value: 96, content: '欧美' },
        { value: 16, content: '韩国' },
        { value: 8, content: '日本' },
      ],
      currentArea: 0,
      page: 1,
      musicList: [],
    }
  },
  mounted() {
    this.getTopSong(this.areas[this.currentArea].value)
  },
  methods: {
    getTopSong(value) {
      ;(this.musicList = []),
        reqGetTopSongs(value).then((res) => {
          let list = res.data.data
          for (let i = 0; i < list.length; i++) {
            reqGetSongsDetail(list[i].id).then((res) => {
              let song = new songDetail(res.data.songs)
              this.musicList.push(song)
            })
          }
        })
    },
    handleGetTopSongs(index){
      this.currentArea = index;
      this.getTopSong(this.areas[index].value)
    }
  },
}
</script>

<style lang="less" scoped>
.new-song {
  width: 100%;
  margin: 10px 50px 0px 50px;
}
.new-song-title {
  display: flex;
  cursor: pointer;
  margin-bottom:10PX ;
  .title-item {
    width: 50px;

    font-size: 15px;
    text-align: center;
  }
  .title-item:hover {
    border-bottom: 3px solid #2d8cf0;
  }
}
.actived {
  color: #2d8cf0;
  border-bottom: 3px solid #2d8cf0;
}
</style>