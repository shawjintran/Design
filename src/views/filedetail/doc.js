import request from '@/utils/request'

const api_name = '/group'

export default {

  getNestedTreeList(courseId) {
    return request({
      url: `${api_name}/getNestedTreeList/${courseId}`,
      method: 'get'
    })
  },

  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  save(chapter) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: chapter
    })
  },
  updateById(chapter) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: chapter
    })
  },
  getDocUsers(docId){
    return request({
      url: `${api_name}/docUsers`,
      method: 'get',
      params:{
        docId: docId
      }
    })
  }
}
