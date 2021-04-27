<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>
        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import cookie from 'js-cookie'
  import loginApi from '@/api/login'

  export default {
    layout: 'sign',
    data () {
      return {
        user:{
          mobile:'',
          password:''
        },
        loginInfo:{}
      }
    },
    methods: {
      checkPhone (rule, value, callback) {
        //debugger
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      },

      //登录
      submitLogin() {
        // 1 调用登录接口，返回token字符串
        loginApi.toLoginUser(this.user).then(response => {
          // 2 获取token，放到cookie里面
          //'edu_token' 是cookie里面定义的值
          // response.data.data.token获取到的token值
          // {domain:'localhost'}cookie传递的作用范围，表示只能在localhost下面传递
          cookie.set('edu_token',response.data.data.token,{domain:'localhost'})
          // 3 创建前端拦截器(在request.js里面定义)，判断cookie里面有没有token字符串，如果有，把token放到header里面（因为后端接收的时request,所以放到hearder请求头里面）
          // 4 调用接口，根据token获取用户信息，为了首页面显示,此处不需要参数，因为在上步操作的时候把token放到的cookie请求头里面了
          loginApi.getLoginUserInfo().then(response =>{
            //5 返回用户信息，把用户信息也放到cookie里面
            cookie.set('edu_userInfo',response.data.data.userInfo,{domain:'localhost'})
            //6 跳转到首页面:指的是pages里面的index.vue
            this.$router.push({path:'/'})
          })
        })
      }
    }
  }
</script>
<style>
    .el-form-item__error{
      z-index: 9999999;
    }
</style>
