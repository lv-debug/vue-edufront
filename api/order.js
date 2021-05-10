
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
  }
}
