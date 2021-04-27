import request from '@/utils/request'

export default {
  //根据手机号发送验证码
  sendCode(phone) {
    return request({
      url: `/msmservice/edu-msm/send/${phone}`,
      method: 'get'
    })
  },

  //注册
  toRegister(registerVo) {
    return request({
        url: `/ucenterservice/ucenter-member/register`,
        method: 'post',
        data : registerVo
      })
  }
}