<template>
  <div class="private-list" v-if="pri != null">
    <div>
      <h4>{{pri.name}}</h4>
    </div>
    <div class="private-list-container">
      <div
        class="private-list-item"
        v-for="(item, index) in pri.result"
        :key="index"
       @click="enterMVDetail(item.id)">
        <!-- 图片 -->
        <div class="private-list-container-group">
          <img v-lazy="item.picUrl" alt="" />
        </div>
        <div class="private-list-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrivateContent",
  props: {
    pri: {
      type: Object,
      default: () =>{},
    },
  },
  methods:{
    enterMVDetail(id){
      this.$router.push('/mv-detail/' + id);
    }
  }
};
</script>

<style lang="less" scoped>
.private-list {
  width: 100%;
  padding: 20px 0;
}
.private-list-container {
  width: 100%;
  margin-top: 10px;
  display: flex;

  &-group{
    
    img{
      width: 100%;
    }
  }
}
.private-list-item{
  width: calc(100% / 3);
  padding: 5px 10px;
  cursor: pointer;
}
h4 {
  font-size: 14px;
  padding-left: 10px;
}
.private-list-name {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 13px;
}
</style>