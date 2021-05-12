<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">应付金额：</em><em class="orange money">￥{{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url" :size="338"/>
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
      </div>
    </div>
  </div>
</template>
<script>

import orderApi from '@/api/order'

export default {
    //异步调用请求，进入页面不会立即去请求，而是当操作请求的时候才会调用,只会调用一次；1,8表示第一页，共8条
    //params : 表示this.$route.params.vid 等于 params.vid,由于页面时_pid，所以此处用_pid.
    //error : 异步请求出现错误
    asyncData({ params, error }) {
       return orderApi.createRWCode(params.pid)
       //此处相当于 this.data =  response.data.data
        // data () {
        //   return {
        //     data: []
        //   }
        // },
        .then(response => {
            return { 
                payObj: response.data.data,
            }
        })
    },
    data () {
        return {
            timer : ''
        }
    },
    //每隔3秒查询订单状态,页面渲染之后执行
    mounted () {
        this.timer = setInterval(() => {
            this.queryRWCodeStatus(this.payObj.out_trade_no)
        },3000)
    },

    methods : {
        queryRWCodeStatus (orderNo) {
            orderApi.queryRWCodeStatus(orderNo).then(response => {
                if (response.data.success) {
                    debugger
                        //支付成功，清除定时器
                        clearInterval(this.timer)
                        //提示
                        this.$message({type: 'success',message: '支付成功!'})
                        //跳转回到课程详情页面
                        this.$router.push({path: '/course/' + this.payObj.course_id})
                     }
            })
        }
    }
}
</script>