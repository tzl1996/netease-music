<template>
  <div class="login-form-container">
    <el-form ref="form"
             :model="loginForm"
             :rules="rules"
              >
      <el-form-item  prop="phone">
        <el-input v-model="loginForm.phone"
                  placeholder="请输入手机账号"
                  ></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input v-model="loginForm.password"
                  placeholder="请输入密码"
                  type="password"
                  ></el-input>
      </el-form-item>
     <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {reqLogin} from 'network/user';
export default {
  name:'PhoneLogin',
  data(){
    var validatePhone = (rule, value, callback) => {
      const pattern = /^1[3-9]\d{9}$/
      if (!pattern.test(value)) {
        return callback(new Error('请输入正确的手机号!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      const pattern = /^[\w]{6,16}$/
      if (value == '') {
        return callback(new Error('密码不能为空!'))
      } else if (!pattern.test(value)) {
        return callback(new Error('密码长度需为6-16！'))
      } else {
        callback()
      }
    }
    return{
      loginForm:{
        phone:'',
        password:'',
      },
       rules: {
       
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        
      },
    }
  },
  methods:{
    onSubmit(){
      reqLogin(this.loginForm).then((res) =>{
        console.log(res.data);
        if(res.data.code == 200){
          this.$parent.showLogin = false;
          localStorage.setItem('cookie',res.data.cookie);
          localStorage.setItem('avatar',res.data.pofile.avatarUrl);
          localStorage.setItem('userId',res.data.pofile.userId);
        }else if(res.data.code == 502){
          alert('账号或密码错误！')
        }
      })
    }
  }
  
}
</script>

<style lang="less" scoped>
.login-form-container{
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
/deep/ .el-form-item__content{
  text-align: center;
}
</style>