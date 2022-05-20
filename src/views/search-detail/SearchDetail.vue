<template>
  <div class="search-detail-container">
    <div class="search-result">
      <span class="big">{{ keyword }}</span
      >共找到 <span>{{ count }}</span
      >个<span>{{ searchType }}</span>
    </div>
    <div class="search-type-list">
      <div
        class="type-item"
        v-for="(type, index) in menuList"
        :key="index"
        :class="{ actived: currentIndex == index }"
      @click="changeSearchType(index)">
        {{ type.content }}
      </div>
    </div>
    <router-view @setData="handleSearchData"></router-view>
  </div>
</template>

<script>
import { menuList } from "./data";
export default {
  name: "SearchDetail",
  /**provide对组件内data不能响应，要传入this */
  provide() {
    return {
      search: this,
    };
  },
  data() {
    return {
      keyword: "",
      count: 0,
      searchType: "单曲",
      menuList: menuList,
      currentIndex: 0,
    };
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.path.indexOf("/search-detail") >= 0) {
          this.keyword = this.$route.params.keyword;
        }
      },
    },
  },
  methods: {
    handleSearchData(count, type) {
      this.count = count;
      this.searchType = type;
    },
    changeSearchType(index){
      if(this.currentIndex == index) return;
      this.currentIndex = index;
      this.$router.push(`/search-detail/${this.keyword}/${this.menuList[index].link}`);

    },
  },
};
</script>

<style lang="less" scoped>
.search-detail-container {
  width: 100%;
  height: 100%;
  padding: 10px 20px 0px 25px;
}
.search-result {
  font-size: 15px;
  span {
    color: #0c73c2;
    margin: 0px 3px;
  }
  .big {
    font-size: 18px;
    margin-right: 10px;
  }
}
.search-type-list {
  margin-top: 10px;
  display: flex;
  .type-item {
    width: 45px;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    padding-bottom: 5px;
    text-align: center;
    cursor: pointer;
  }
  .type-item:hover {
    color: #2d8cf0;
    border-bottom: 3px solid #2d8cf0;
  }
}
.actived {
  color: #2d8cf0;
  border-bottom: 3px solid #2d8cf0;
}
</style>>

