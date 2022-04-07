<template>
  <div class="register">
    <el-form ref="registerform"
             :model="registerForm"
             status-icon
             :rules="rules">
      <el-form-item prop="nickname">
        <el-input v-model="registerForm.nickname"
                  placeholder="请输入注册名称"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="registerForm.phone"
                  placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password"
                  placeholder="请设置密码"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input v-model="registerForm.checkPassword"
                  placeholder="请确认密码"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="registerForm.captcha">
          <template slot="append">
            <el-button size="mini"
                       v-show="!isGettingCaptcha"
                       @click="getCaptcha('registerform')">获取验证码</el-button>
          </template>
          <template slot="append">
            <el-button size="mini"
                       v-show="isGettingCaptcha"
                       class="send-code">{{count}}s后重新发送</el-button>
          </template>
        </el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('registerform')">立即注册</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqCaptcha, reqRegister } from 'network/user'
export default {
  name: 'Register',
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('名称不能为空!'))
      } else if (value.length < 2 || value.length > 8) {
        return callback(new Error('名称长度为2~8个字符'))
      } else {
        callback()
      }
    }
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
    var checkPass = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请再次输入密码！'))
      } else if (value != this.registerForm.password) {
        return callback(new Error('两次密码不一致！'))
      } else {
        callback()
      }
    }
    var validateCaptcha = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请输入验证码！'))
      } else {
        callback()
      }
    }
    return {
      count: 0,
      isGettingCaptcha: false,
      timer: null,
      captchaCode: null,
      registerForm: {
        nickname: '',
        phone: null,
        password: '',
        captcha: '',
        checkPassword: '',
      },
      rules: {
        nickname: [{ validator: validateName, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPassword: [{ validator: checkPass, trigger: 'blur' }],
        captcha: [{ validator: validateCaptcha, trigger: 'blur' }],
      },
    }
  },
  methods: {
    getCaptcha(formName) {
      // 在发送验证码之前验证手机号是否正确，验证成功才执行发送验证码的流程
      this.$refs[formName].validateField('phone', (err) => {
        if (!err) {
          reqCaptcha(this.registerForm.phone).then((res) =>{
            console.log(res.data);
          })
          const num = 60
          this.count = num
          this.isGettingCaptcha = true
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= num) {
              this.count--
            } else {
              this.isGettingCaptcha = false
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, field) => {
        if (valid) {
          reqRegister(this.registerForm).then((res) =>{
            this.$parent.isLogining = true;
            alert('注册成功！')
          },(err) => {
              console.log(err.message);
          })
        }
      })
    },
  },
}
</script >

<style lang="less" scoped>
.register {
  width: 100%;
  height: 300px;
 
  display: flex;
  justify-content: center;
 
}
/deep/.el-form-item__content {
  
  .el-input__inner {
    font-size: 12px;
  }
  // 修改验证码button 样式
  .el-input-group__append {
    color: #606266;

    .el-button {
      padding: 0px 5px;
      span {
        font-size: 11px;
      }
    }
  }
}
.send-code {
  display: inline;
}

</style>