import request from '@/utils/request'

export default {
      
  //登录
  toLoginUser(ucenterMember) {
    return request({
        url: `/ucenterservice/ucenter-member/login`,
        method: 'post',
        data : ucenterMember
      })
  },

  //根据token获取用户信息
  getLoginUserInfo() {
    return request({
        url: `/ucenterservice/ucenter-member/getMemberInfo`,
        method: 'get',
      })
  }

}