
import request from '@/utils/request'
export default {
  //查询热门课程和名师
  createOrder(courseId) {
    return request({
      url: `/orderservice/t-order/createOrder/${courseId}`,
      method: 'post'
    })
  },

  //根据订单id查询订单
  getOrderInfo(orderNo) {
    return request({
      url: `/orderservice/t-order/getOrderInfo/${orderNo}`,
      method: 'get'
    })
  },

  //生成二维码方法
  createRWCode(orderNo) {
    return request({
      url: `/orderservice/tPayLog/createRWCode/${orderNo}`,
      method: 'get'
    })
  },

  //查询订单支付状态
  queryRWCodeStatus(orderNo) {
    return request({
      url: `/orderservice/tPayLog/queryRWCode/${orderNo}`,
      method: 'get'
    })
  }
}
