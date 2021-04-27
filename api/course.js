import request from '@/utils/request'

export default {
      
  //分页获取讲师
  getCourseList(current,limit,searchCourse) {
    return request({
        url: `/eduservice/coursefront/getCourseFrontList/${current}/${limit}`,
        method: 'post',
        data : searchCourse
      })
  },

  //查询所有分类
  getAllsubject() {
    return request({
      url: `/eduservice/edu-subject/getAllsubject`,
      method: 'get'
    })
  }

}