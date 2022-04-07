<template>
  <div class="login-form-container">
    <el-form ref="form"
             v-model="loginForm"
              >
      <el-form-item >
        <el-input v-model="loginForm.phone"
                  placeholder="请输入手机账号"
                  ></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="loginForm.password"
                  placeholder="请输入密码"
                  type="password"
                  ></el-input>
      </el-form-item>
     <el-form-item>
        <el-button type="primary"
                   >立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {reqQrcode,reqQrcheck} from 'network/user';
export default {
  name:'QrcodeLogin',
  data(){
    return{
      loginForm:{
        phone:'',
        password:'',
      }
    }
  },
  created(){
    reqQrcode().then((res) =>{
      console.log(res.data);
    });
    reqQrcheck().then((res) =>{
      console.log(res.data);
    })
  }

  
}
</script>

<style lang="less" scoped>
.login-form-container{
  width: 100%;
  
}
</style>