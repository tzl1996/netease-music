<template>
  <div class="search-suggest-container">
    <div class="suggest-title">
      搜索<span>{{ keyword }}</span>相关的结果>
    </div>
    <div class="songs"
         v-if="songs && songs.length">
      <div class="header"><i class="el-icon-tzlMusic-Note"></i>单曲</div>
      <div class="item"
           v-for="(song, index) in songs"
           :key="index"
           @click="goSearchDetail(song.name,'songs')">
        {{ song.name }}——<span v-if="song.artists && song.artists">{{
          song.artists[0].name
        }}</span>
      </div>
    </div>
    <div class="artist"
         v-if="artists && artists.length">
      <div class="header"><i class="el-icon-tzluser"></i>歌手</div>
      <div class="item">{{ artists[0].name }}</div>
    </div>
    <div class="albums"
         v-if="albums && albums.length">
      <div class="header">
        <i class="el-icon-tzlqqmusic-fill-round"></i>专辑
      </div>
      <div class="item"
           v-for="(album, index) in albums"
           :key="index">
        {{ album.name }}——<span>{{ album.artist.name }}</span>
      </div>
    </div>
    <div class="play-list"
         v-if="playlists && playlists.length">
      <div class="header">
        <i class="el-icon-tzlic_queue_music_48px"></i>歌单
      </div>
      <div class="item"
           v-for="(playlist, index) in playlists"
           :key="index">
        {{ playlist.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { reqSuggest } from 'network/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  props: {
    keyword: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      songs: [], //单曲
      albums: [], //专辑
      artists: [], // 歌手
      playlists: [], //歌单
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler() {
        this.suggest()
      },
    },
  },
  methods: {
    suggest: debounce(function () {
      if (!this.keyword) {
        return
      }
      reqSuggest(this.keyword).then((res) => {
        const { songs, artists, albums, playlists } = res.data.result
        this.songs = songs
        this.artists = artists
        this.albums = albums
        this.playlists = playlists
      })
    }, 200),
    goSearchDetail(keyword, name) { 
      // this.$router.push(`/search-detail/${keyword}/songs`)
      this.$router.push({name:name,params:{keyword:keyword}})
    },
  },
}
</script>

<style lang="less" scoped>
.search-suggest-container {
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid #d2d2d2;
  padding-left: 20px;
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  height: 380px;
}
.search-suggest-container div {
  margin: 8px 10px 0px 0px;
}
.suggest-title {
  span {
    color: #2d8cf0;
  }
}
i {
  margin-right: 3px;
}
.item {
  padding-left: 20px;
  cursor: pointer;
  font-size: 13px;
}
.item:hover {
  color: #2d8cf0;
}
</style>