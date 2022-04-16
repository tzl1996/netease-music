<template>
  <div class="category-list ">
    <div class="content-container ">
      <div class="content-title">
        <span>全部歌单分类</span>
      </div>
      <hr>
      <div class="scroll">
        <div class="content-header">
        全部歌单
      </div>
      <div class="content-item-main "
           v-for="(cate,index) in catelist"
           :key="index">
        <div class="content-item-title">
          {{categories[index]}}
        </div>
        <div class="content-item-list">
          <div class="item"
               v-for="(item,index) in cate"
               :key="index"
               @click="handleGetCate(item.name)">
            {{item.name}}
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category-list',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    catelist: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
    handleGetCate(cate){
      this.$emit('getCate',cate);
    }
  }
}
</script>
<style lang="less" scoped>
.category-list {
  width: 520px;
  height: 340px;
  
   
}
.scroll{
  width: 100%;
  height: 317px;
  overflow-y: auto;
}
.content-title {
  height: 20px;
  margin-bottom: 3px;
  font-weight: 700;
  font-size: 14px;
}
hr {
  background-color: #f3f4f5;
}
.content-header {
  margin: 10px 10px;
  border: 1px solid #f3f4f5;
  padding: 2px 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
}
.content-item-main {
  width: 100%;
  padding: 10px;
  display: flex;
  .content-item-title {
    width: 80px;
    padding-right: 5px;
    text-align: center;
    font-size: 18px;
  }
  .content-item-list {
    padding-bottom: 10px;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: calc(20%);
      height: 35px;
      line-height: 32px;
      padding: 0px 1px;
      border: 1px solid #f3f4f5;
      text-align: center;
      cursor: pointer;
      font-size: 13px;
    }
    .item:hover {
      border-color: #2d8cf0;
    }
  }
}
.content-header:hover {
  border-color: #2d8cf0;
}
/* 滚动条样式 */
/* 滚动条样式 */
.scroll::-webkit-scrollbar {
  width: 8px;
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
  cursor: pointer;
}
</style>
