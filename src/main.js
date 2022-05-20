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
  loading: 'assets/loading.gif',
})
Vue.config.productionTip = false
import {Button, Icon,Input,Slider,Popover,Carousel,carouselItem,Loading,Table,TableColumn,Pagination,Form,FormItem} from 'element-ui';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Slider);
Vue.use(Popover);
Vue.use(Carousel);
Vue.use(carouselItem);
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
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