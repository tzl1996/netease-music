import { request } from './request';

//获取验证码
export const reqCaptcha = (phone) => request({
  url: '/captcha/sent',
  params: {
    phone,
  }
});
//注册账号
export const reqRegister = ({ nickname, phone, password, captcha }) => request({
  url: '/register/cellphone',
  method: 'post',
  params: {
    nickname,
    phone,
    password,
    captcha,
  }
})
//登录账号
export const reqLogin = (data) => request({
  url: '/login/cellphone',
  method: 'post',
  params: {
    phone: data.phone,
    captcha: data.captcha || '',
    password: data.password,
  }
});

// 登出账号
export const reqLogout = () => request({
  url: '/logout',
  method: 'post',

})


  

  //nuser/account/get
  export const reqUserAccount = () => request({
    url: '/w/nuser/account/get',
    mehtod: 'get'
  });
  /**获取用户歌单 */
  export function reqUserSongList(id){
  return request({
    url: '/user/playlist',
    params: {
      uid: id
    }
  })
}