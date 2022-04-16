import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

/**解决router重复报错 */
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

const router = new VueRouter({
<<<<<<< HEAD
    mode:'history',
=======
    mode:'hash',
>>>>>>> dc085efa91d0fcb852275653c2ebd059be248b1d
    base:process.env.BASE_URL,
    routes,
})

export default router;