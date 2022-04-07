<template>
  <div class="music-header">
    <div class="header-title">
      <div class="header-title-left"
           @mouseenter="handleMouseEnter"
           @mouseleave="handleMouseLeave">
        <div class="item">
          <transition name="header-side">
            <i class="el-icon-tzlshouye"
               v-show="isShow"></i>
          </transition>
        </div>
        <div class="item">
          <transition name="header-side">
            <i class="el-icon-tzl-zuixiaohua"
               v-show="isShow"></i>
          </transition>
        </div>
        <div class="item">
          <transition name="header-side">
            <i class="el-icon-tzlmaximizezuidahua"
               v-show="isShow"></i>
          </transition>
        </div>
      </div>
      <div class="header-title-right">
        <i class="el-icon-tzlqqmusic-fill-round"></i>
      </div>
    </div>
    <div class="header-content">
      <div class="content-change">
        <div class="el-icon-arrow-left"></div>
        <div class="el-icon-arrow-right"></div>
      </div>
      <div class="content-search">
        <Search />
      </div>
    </div>
    <div class="header-right">
      <div class="item-left">
        <div class="item-left-logout"
             v-if="!logined">
          <div class="avatar"
               @click="handleLogin">
            <i class="el-icon-tzluser-circle"></i>
          </div>
          <div class="logout-name"
               @click="handleLogin"><span>请登录</span></div>
        </div>
        <div class="item-left-login"
             v-if="logined">
          <div class="user-avatar">
            <img :src="getAvatar"
                 alt="">
          </div>
          <div class="user-name"
               >
            <el-popover placement="bottom-start"
                        trigger="hover"
                        width="20px"
                        popper-class="logout-popover">
                <div class="logout-button" @click="confirmLogout">退出登录</div>
              <template slot="reference"><div>{{getNickname}}</div></template>
            </el-popover>

          </div>
        </div>

      </div>
      <div class="item-right">
        <div class="item">
          <el-popover placement="bottom-start"
                      title="主题"
                      width="200"
                      trigger="manual"
                      content="默认 || 黑色 || 绿色"
                      v-model="visible">
            <div class="el-icon-tzljingzi"
                 slot="reference"
                 @click="visible = !visible"></div>

          </el-popover>

        </div>
        <div class="item">
          <a href=""
             class="el-icon-tzlgitee2"></a>
        </div>
        <div class="item">
          <a href=""
             class="el-icon-tzlgithub-fill"></a>
        </div>
      </div>
    </div>
    <div class="login"
         v-if="showLogin">
      <div class="login-container">
        <div class="login-cance">
          <i class="el-icon-tzlzuidahua"
             @click="handleCance"></i>
        </div>
        <div class="login-title-button">
          <div class="login-button "
               :class="{actived:isLogining}"
               @click="isLogining= true">登录</div>
          <div class="register-button"
               :class="{actived:!isLogining}"
               @click="isLogining=false">注册</div>
        </div>
        <div class="login-content">
          <transition name="login-slide">
            <PhoneLogin v-show="isLogining" />
          </transition>

          <!-- <QrcodeLogin v-if="!isLogining"/> -->
          <transition name="register-slide">
            <Register v-show="!isLogining" />
          </transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from 'content/search'
import PhoneLogin from 'content/login/PhoneLogin'
import Register from 'content/login/Register'
// import QrcodeLogin from 'content/login/QrcodeLogin';

export default {
  name: 'LayoutHeader',
  components: {
    Search,
    PhoneLogin,
    Register,
    // QrcodeLogin,
  },
  data() {
    return {
      isShow: false,
      visible: false,
      isLogining: true,
      showLogin: false,
    }
  },
  computed: {
    getAvatar() {
      return this.$store.getters.getAvatar
    },
    getNickname() {
      return this.$store.getters.getNickname
    },
    logined() {
      return this.$store.getters.getLoginStatus
    },
  },
  methods: {
    handleMouseEnter() {
      this.isShow = true
    },
    handleMouseLeave() {
      this.isShow = false
    },
    handleLogin() {
      this.showLogin = true
    },
    handleCance() {
      this.isLogining = true
      this.showLogin = false
    },
    confirmLogout(){
      this.$confirm ('确定退出登录？',{
        confirmButtonText:'确定',
        canceButtonText:'取消',
        type:'warning',
      }).then(() =>{
        //清除cookie localstorage
        this.$store.commit('handleLogout')
        this.$router.push('/');
        location.reload();
        this.$message({
          type:'success',
          message:'退出成功!'
        })
      }).catch(() =>{
        
      })
    }
    
  },
}
</script>
<style>
  .logout-popover{
    min-width:30px; 
  }
</style>
<style lang="less" scoped>
.music-header {
  height: 58px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #f9f9f9;
  a {
    text-decoration: none;
    color: inherit;
  }
}
.header-title {
  width: 18%;
  display: flex;
  padding: 0px 20px;

  &-left {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;
      line-height: 18px;
      i {
        display: inline-block;
      }
    }
    .item:nth-child(1) {
      background: #ed655a;
    }
    .item:nth-child(2) {
      background: #e0c04c;
    }
    .item:nth-child(3) {
      background: #72be47;
    }
  }
  &-right {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;

    i {
      font-size: 30px;
      color: rgb(235, 227, 128);
    }
  }
}
//登录窗口样式
.login {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0);
  z-index: 99;
}
.login-container {
  position: absolute;
  height: 470px;
  width: 400px;
  top: calc(50% - 230px);
  left: calc(50% - 200px);
  background-color: #ffff;
  box-shadow: 0px 0px 10px #ccc;
  z-index: 2;
  border-radius: 5px;
  padding: 10px 10px;
}
.login-cance {
  text-align: right;
  i {
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
  }
}
.login-title-button {
  background-color: #ddd;
  height: 35px;
  width: 240px;
  margin: 10px auto;

  border-radius: 16px;
  display: flex;
  cursor: pointer;
  div {
    width: 120px;
    height: 100%;
    border-radius: 16px;
    text-align: center;
    line-height: 35px;
    font-size: 17px;
    border: 1px solid #ddd;
  }
  .actived {
    background-color: #fff;
    color: black;
  }
}
.login-content {
  padding: 10px 30px;
}
.header-content {
  // background-color: goldenrod;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;

  .content-change {
    width: 15%;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    div {
      line-height: 58px;
      text-align: center;
    }
    div:hover {
      color: #e0c04c;
    }
  }
}
.header-right {
  width: 30%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  .item-left {
    flex: 1;
    &-logout {
      display: flex;
      align-items: center;
      cursor: pointer;
      .avatar {
        font-size: 30px;
        line-height: 58px;

        color: #c0c4cc;
        i {
          font-size: 30px;
        }
      }
      .logout-name {
        padding-left: 5px;
        color: #c0c4cc;
      }
    }
    &-login {
      display: flex;
      align-items: center;
      cursor: pointer;
      .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .user-name {
        padding-left: 5px;
      }
    }
  }
  .item-right {
    display: flex;
    width: 50%;

    justify-content: space-around;
    line-height: 58px;
    .item {
      cursor: pointer;
      div {
        font-size: 23px;
        color: rgb(235, 227, 128);
      }
      a {
        font-size: 23px;
        color: rgb(235, 227, 128);
      }
    }
  }
}
.logout-button{
  cursor: pointer;
}
.header-side-enter-active {
  animation: slideInDown 0.4s;
}
.header-side-enter-active {
  animation: slideIn 0.3s ease-in-out;
}
.header-side-leave-active {
  animation: slideOut 0.3s ease-in-out;
}
@keyframes slideIn {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0px);
  }
}
@keyframes slideOut {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-100%);
  }
}
// .login-slide-enter-active{
//   animation: loginslideIn 0.5s ease-in-out;
// }
// .login-slide-leave-active{
//   animation: loginslideOut 0.5s ease-in-out;
// }
// .register-slide-enter-active{
//   animation:  registerslideIn 0.5s ease-in-out;
// }
// .register-slide-leave-active{
//   animation: registerslideOut 0.5s ease-in-out;
// }
// @keyframes  loginlideIn {
//   from {
//     width: 0;
//     opacity: 0;
//   }
//   to {
//     width: 100%;
//     opacity: 1;
//   }
// }
// @keyframes loginslideOut {
//    from {
//     width: 100%;
//     opacity: 1;
//   }
//   to {
//     width: 0;
//     opacity: 0;
//   }
// }
// @keyframes registerslideIn{
//   from{
//     transform: translateX(1000px);
//   }
//   to{
//     transform: translateX(0px);
//   }
// }
</style>