<template>
  <div class="pagination">
      <el-pagination  @current-change="changePage"
                      background
                     :current-page.sync="currentPage"
                     :page-size="limit"
                     layout="prev, pager, next, jumper"
                     :total="totalNum">
      </el-pagination>
  </div>
</template>

<script>
export default {
  name:'Pagination',
  props:{
    offset:{
      type:[Number,String],
      default:1
    },
    limit:{
      type:[Number,String],
      default:30,
    },
    total:{
      type:[Number, String],
      default:null,
    }
  },
  data(){
    return{
      currentPage:this.offset,
    }
  },
  computed:{
    // currentPage:{
    //   get(){
    //     return this.offset;
    //   },
    //   set(val){
    //     this.currentPage = val;
    //   }
    // },
    totalNum(){
      return this.total ? this.total : this.limit*50;
    }
  },
  methods:{
    changePage(page){
      this.$bus.$emit('changeOffset',page);
    }
  },
}
</script>

<style lang="less" scoped>
.pagination{

  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>