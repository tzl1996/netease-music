<template>
  <div class="mv-detail"
       v-if="id != null && detail != null">
    <div class="mv-detail-left">
      <div class="mv-container">
        <div class="mv-title"
             v-if="detail != null">
          <div class="title-left">MV</div>
          <div class="title-name">{{detail.name}}</div>
        </div>
        <div class="mv-video"
             v-if="url != null">
          <video :src="url"
                 autoplay
                 controls
                 width="100%"
                 class="video-play"></video>
        </div>
      </div>
      <div class="comments">
        <Recommends :recommends="recommends" />
        <Pagination :limit="limit"
                    :offset="offset"
                    :total="total" />
      </div>
    </div>
    <div class="mv-detail-right">
      <h4>MV介绍</h4>
      <div class="base">
        <div class="publish-date"><span>发布时间：</span><span>{{detail.publishTime}}</span></div>
        <div class="play-count"><span>播放次数：</span><span>{{detail.playCount}}次</span></div>
      </div>
      <div class="desc clearfix">
        <span>简介：</span>
        {{ detail.desc }}
      </div>
      <h4>相关推荐</h4>
      <simiMv :mvList="simiMv" />
    </div>
  </div>
</template>

<script>
import {
  reqGetMvDetail,
  reqGetMVUrl,
  reqGetMVComment,
  reqGetSimiMv,
} from 'network/mv'
import Recommends from 'content/recommends/Recommends'
import simiMv from './childComps/simiMv.vue'
import Pagination from 'common/pagination/Pagination'
import { formatDate } from 'utils/tool'
export default {
  name: 'mv-detail',
  components: {
    Recommends,
    simiMv,
    Pagination,
  },
  data() {
    return {
      id: null,
      detail: null,
      url: null,
      recommends: null,
      simiMv: [],
      limit: 30,
      offset: 1,
      total:null,
    }
  },
  created() {
    this.$bus.$on('changeOffset', (page) => {
      this.offset = page;
      this.getComments();
    })
  },
  methods: {
    initRequest() {
      reqGetMvDetail(this.id).then((res) => {
        this.detail = res.data.data
      })
      reqGetMVUrl(this.id).then((res) => {
        this.url = res.data.data.url
      })
      reqGetMVComment(this.id, this.limit, this.offset).then((res) => {
        this.recommends = res.data.comments
      })
      reqGetSimiMv(this.id).then((res) => {
        this.simiMv = res.data.mvs
      })
    },
    getComments() {
      reqGetMVComment(this.id, this.limit, this.offset).then((res) => {
        this.recommends = res.data.comments
        this.total= res.data.toal;
      })
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.path.indexOf('mv-detail') >= 0) {
          this.id = this.$route.params.mvId
          if (this.id) {
            this.initRequest()
          }
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.mv-detail {
  width: 100%;
  padding: 10px 100px 0px 100px;
  display: flex;
  position: relative;
}
.mv-detail-left {
  display: inline-block;
  width: 70%;
}
.mv-title {
  display: flex;
  height: 30px;
  font-size: 18px;
  .title-left {
    width: 50px;
    height: 28px;
    line-height: 25px;
    color: #e83c3c;
    border: 1px solid #e83c3c;
    border-radius: 5px;
    text-align: center;
  }
  .title-name {
    padding-left: 5px;
    line-height: 35px;
  }
}
.mv-video {
  padding: 10px 0px;
  .video-play {
    outline-style: none;
  }
}
.mv-detail-right {
  width: 30%;
  padding-left: 20px;
}
h4 {
  font-weight: 400;
  font-size: 18px;
}
.base {
  padding: 5px 0px;
  width: 1005;
  font-size: 12px;
  height: 13px;
  .publish-date {
    float: left;
  }
  .play-count {
    float: right;
  }
}
.clearfix {
  clear: both;
}
.desc {
  padding-top: 10px;
  max-height: 288px;
  width: 100%;
  overflow: hidden;
  line-height: 1.2em;
  font-size: 13px;
  margin-bottom: 15px;
  text-overflow: ellipsis;
}
.desc span {
  font-size: 14px;
}
</style>