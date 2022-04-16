<template>
  <div class="recommend">
    <div class="input-container">
      <el-input type="textarea"
                resize='both'
                size="medium"
                :rows="3"
                v-model="recommendText">
      </el-input>
      <div class="button">
        <span>评论</span>
      </div>
    </div>
    <div class="title"><span>精彩评论</span></div>
    <div class="recommend-list-container">
      <div class="recommend-item"
           v-for="(item,index) in recommends"
           :key="index">
        <div class="avatar">
          <img v-lazy="item.user.avatarUrl"
               alt="">
        </div>
        <div class="right">
          <div class="recommend"><span class="user">{{item.user.nickname}} :</span><span>
              {{item.content}}</span> </div>
          <div class="createTime">
            {{getCreateTime(item.time)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'utils/tool';
export default {
  name: 'Recommends',
  
  props: {
    recommends: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      recommendText: '',
    }
  },
  
  methods: {
    getCreateTime(time) {
      return formatDate(new Date(time), 'yyyy年MM月dd日 hh:mm:ss')
    },
  },
}
</script>

<style lang="less" scoped>
.recommend {
  width: 100%;
  margin-top: 10px;
}
.input-container {
  position: relative;
  width: 100%;
  background-color: #f0f0f2;
  padding: 15px 30px 10px 10px;

  .button {
    margin-top: 10px;
    text-align: right;
    span {
      cursor: pointer;
    }
    span:hover {
      opacity: 0.7;
    }
  }
}
.title {
  margin-top: 10px;
}
.recommend-list-container {
  width: 100%;
  margin-top: 10px;
}
.recommend-item {
  width: 100%;
  padding: 10px 0px;
  display: flex;
  align-items: center;
}
.recommend-item:nth-child(even) {
  background-color: #f9f9f9;
}
.avatar {
  
  margin: 0px 20px;
  width: 40px;
  height: 40px;
  margin:auto 20px;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
.right {
  flex: 1;
  div{
    margin: 10px 0px 5px 0px;
  }
}
.user{
  color:#2d8cf0;
}
</style>