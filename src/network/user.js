import { request } from './request';

//获取验证码
export const reqCaptcha = (phone) => request({
  url: '/captcha/sent',
  params: {
    phone,
  }
});
//注册账号
export const reqRegister = ({nickname,phone,password,captcha}) => request({
  url: '/register/cellphone',
  method: 'post',
  params:{
    nickname,
    phone,
    password,
    captcha,
  }
})
//登录账号
export const reqLogin = (data) =>request({
  url:'/login/cellphone',
  method:'post',
  params:{
    phone:data.phone,
    captcha:data.captcha || '',
    password:data.password,
  }
});
//获取qrcode的钥匙
export const reqQrcode = ()=>request({
  url:'/login/qrcode/unikey',
  method:'post',
})
///login/qrcode/client/login
export const reqQrcheck = () =>request({
  url:'/login/qrcode/client/login',
  method:'post',
})