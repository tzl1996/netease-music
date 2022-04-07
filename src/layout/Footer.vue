<template>
  <div class="footer-container">
    <Player />
  </div>
</template>

<script>
import Player from "player/Player.vue";

export default {
  name: "LayoutFooter",
  components: {
    Player,
  },
};
</script>

<style lang="less" scoped>
.footer-container {
  
  height: 60px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  
}
</style>