import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入图标字体库
import './assets/icon/iconfont.css'
// 懒加载
import VueLazyload from 'vue-lazyload'
//引入自适应响应
import 'utils/rem'
// or with options
Vue.use(VueLazyload, {
  loading: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
})
Vue.config.productionTip = false
import {Button, Icon,Input,Slider,Popover,Carousel,CarouselItem,Loading,Table,TableColumn,Pagination,Form,FormItem,MessageBox,Message } from 'element-ui';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Slider);
Vue.use(Popover);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this;
  }
}).$mount('#app')

export default Vue;