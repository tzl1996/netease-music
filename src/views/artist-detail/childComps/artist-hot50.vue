<template>
  <div class="hot-song">
    <SongList :musicList="musicList"
              :lines="lines" />
  </div>
</template>

<script>
import { reqGetArtistHot50 } from 'network/artist'
import SongList from 'common/song-list/SongList'
import { reqGetSongsDetail, songDetail } from 'network/detail'
export default {
  name: 'ArtistHot50',
  components: {
    SongList,
  },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  created() {
    this.getArtistHot50()
  },
  data() {
    return {
      musicList: [],
      lines: [true, true, true, false, false, true],
    }
  },
  methods: {
    async getArtistHot50() {
      this.musicList = []
      let res = await reqGetArtistHot50(this.id)
      let songs = res.data.songs

      for (let i = 0; i < songs.length; i++) {
        reqGetSongsDetail(songs[i].id).then((res) => {
          let song = new songDetail(res.data.songs)
          this.musicList.push(song)
        })
      }
    },
  },
  watch: {
    id() {
      this.getArtistHot50()
    },
  },
}
</script>

<style>
</style>