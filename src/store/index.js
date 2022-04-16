import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isloading: true,
    requestErr: false,
    cookie: null,
    userid: null,
  },
  mutations: {
    /**显示隐藏loading */
    showLoading(state) {
      state.isloading = true;
    },
    hiddenLoading(state) {
      state.isloading = false;
    },
    /**修改网络状态 */
    setRequestErr(state) {
      state.requestErr = true;
    },
    addUser(state, data) {
      state.user = data;
      state.cookie = data.cookie;
      localStorage.setItem('cookie',data.cookie);
      localStorage.setItem('avatar', data.profile.avatarUrl);
      localStorage.setItem('userId', data.profile.userId);
      state.userid = data.profile.userId;
      localStorage.setItem('nickname', data.profile.nickname);
    },
    handleLogout(state) {
      localStorage.removeItem('nickname');
      localStorage.removeItem('avatar');
      localStorage.removeItem('userId');
      localStorage.removeItem('cookie');
      state.user = null;
      state.cookie = null;
      state.userid = null;
    }
  },
  getters: {
    getAvatar(state) {

      if (localStorage.getItem('avatar')) {
        return localStorage.getItem('avatar');
      }
      return state.user && state.user.profile.avatarUrl || '';
    },
    getNickname(state) {
      if (localStorage.getItem('nickname')) {
        return localStorage.getItem('nickname');
      }
      return state.user && state.user.profile.nickname || '';
    },
    getLoginStatus(state) {
      return localStorage.getItem('cookie') ? true : false;
    }
  },
  actions: {
  },
  modules: {
  }
})