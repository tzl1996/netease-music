<template>
  <div class="mv-bar">
    <div class="title-list">
      <div class="title-item"
           v-for="(item,index) in title"
           :key="index"
           :class="{actived:currentIndex == index}"
           @click="handleIndex(index)">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mv-bar',
  props: {
    title: {
      type: Array,
      default: () => [],
    },
  },
  data(){
    return{
      currentIndex:0,
    }
  },
  methods:{
    handleIndex(index){
      this.currentIndex = index;
    }
  }
}
</script>

<style lang="less" scoped>
.mv-bar{
  height: 100%;
}

</style>