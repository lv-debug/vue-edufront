
import axios from 'axios'
import {MessageBox , Message} from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9009', // api的base_url
  timeout: 20000 // 请求超时时间
})

//创建前端拦截器，判断cookie里面有没有token字符串，如果有，把token放到header里面（因为后端接收的时request,所以放到hearder请求头里面）
//http request拦截器：每次发起请求都会进行验证
service.interceptors.request.use(
    config => {
    //判断cookie里面是不是有名字为edu_token的值
    if (cookie.get('edu_token')) {
      //把获取到的token值放到header里面
      config.headers['token'] = cookie.get('edu_token');
    }
      return config
    },
    err => {
      return Promise.reject(err);
    }
)

  
service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 28004) {
        console.log("response.data.resultCode是28004")
        // 返回 错误代码-1 清除ticket信息并跳转到登录页面
        //debugger
        window.location.href="/login"
        return
    }else{
      if (response.data.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if(response.data.code != 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        return response;
      }
    }
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
});

export default service
