
import request from '@/utils/request'
export default {
  getBannerList() {
    return request({
      url: `/cmsservice/crm-banner/getAllBanner`,
      method: 'get'
    })
  }
}
