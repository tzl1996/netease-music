<template>
  <div class="hotsearch-list scroll">
    <div
      class="searchItem"
      v-for="(searchItem, index) in hotSearchList"
      :key="index"
     @click="goSearchDetail(index)">
      <div class="itemIndex" :class="{ active: index < 3 }">
        {{ index + 1 }}
      </div>
      <div class="itemContent">
        <div class="itemName">{{ searchItem.searchWord }}</div>
        <div class="score">{{ searchItem.score }}</div>
        <div class="icon">
          <img
            :src="searchItem.iconUrl"
            :style="{ width: searchItem.iconType == 5 ? '14px' : '24px' }"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotSearchList",
  props: {
    hotSearchList: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
    goSearchDetail(index){
      this.$router.push(`/search-detail/${this.hotSearchList[index].searchWord}`);
      this.$parent.isSearch = false;
      console.log(this.$parent.isSearch)
    },
    handleEnter(){
     
      this.$parent.isSearch = true;
    }
  }
};
</script>

<style lang="less" scoped>
.hotsearch-list {
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  width: 100%;
  background-color: #fff;
  height: 350px;
  overflow-y: scroll;
  
}
.searchItem {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 9;
}
.searchItem:hover{
  color: #2d8cf0;
}
.itemIndex {
  width: 50px;
  margin: 5px 3px 10px 6px;
  text-align: center;
  font-size: 13px;
}
.active {
  color: #e83c3c;
}
.itemContent {
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 13px;
}
.score {
  margin: 0px 5px;
  color: #dcdde4;
}
.icon {
  width: 18px;
  height: 18px;

  img {
    width: 100%;
  }
}
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