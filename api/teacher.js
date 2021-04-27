import request from '@/utils/request'

export default {
      
  //分页获取讲师
  getTeacherList(current,limit) {
    return request({
        url: `/eduservice/teacherfront/getTeacherFrontList/${current}/${limit}`,
        method: 'post'
      })
  },

  //根据讲师id获取讲师的信息和课程信息
  getTeacherCourseById(teacherId) {
    return request({
      url: `/eduservice/teacherfront/getTeacherCourseById/${teacherId}`,
      method: 'get'
    })
  }

}