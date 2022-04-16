<template>
  <div class="search-container">
    <el-popover popper-class="search-popper"
                placement="bottom-start"
                width="400"
                trigger="manual"
                v-model="isSearch"
                ref="searchPopover"
                >
      <template :v-slot="content">
        <HotSearchList :hotSearchList="hotSearchList"
                       v-if="isSearch && keyword == ''" />
        <SearchSuggest v-if="isSearch && keyword != ''"
                       :keyword="keyword" />
      </template>
    </el-popover>
    <el-input placeholder="请输入内容"
                  v-model="keyword"
                  size="small"
                  @focus="isSearch = true"
                  @blur="handleBlur"
                  @keyup.native.enter="goSearchDetail"
                  v-popover:searchPopover>
          <i slot="suffix"
             class="el-input__icon el-icon-search"
             @click="goSearchDetail"></i>
        </el-input>
  </div>
</template>

<script>
import { reqHotSearchList, reqSearchSong } from 'network/search'
import HotSearchList from './HotSearchList.vue'
import SearchSuggest from './SearchSuggest.vue'
export default {
  name: 'Search',
  components: {
    HotSearchList,
    SearchSuggest,
  },
  data() {
    return {
      keyword: '',
      visible: false,
      hotSearchList: [],
      isSearch: false,
      suggestList: [],
    }
  },
  mounted() {
    reqHotSearchList().then((res) => {
      this.hotSearchList = res.data.data
    })
  },
  methods: {
    handleBlur() {
      setTimeout(()=>{
        this.isSearch = false
      },200)
    },
    goSearchDetail() {
      if (this.keyword) {
        this.$router.push(`/search-detail/${this.keyword}`)
      }
      this.isSearch = false
    },
  },
}
</script >
<style>
.el-popover.search-popper {
  padding: 0px;
}
</style>
<style lang="less" scoped>
.search-container {
  height: 100%;
  position: relative;
}
.el-icon-search {
  color: #180000;
  cursor: pointer;
}
</style>