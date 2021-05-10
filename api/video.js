import request from '@/utils/request'

export default {
      
  //根据视频id获取视频凭证
  getAlyiVideoPlayAuth(videoId) {
    return request({
      url: `/eduvod/video/getAlyiVideoPlayAuth/${videoId}`,
      method: 'get'
    })
  }

}