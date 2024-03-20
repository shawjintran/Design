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
  getDocUsers(uid,docId){
    return request({
      url: `group/docUsers`,
      method: 'get',
      params:{
        docId: docId
      }
    })
  },
  getDownloadFile(fileId){
    return request({
      url: `file/download/${fileId}`,
      method: 'get'
    })
  },
  placefiles(fileIds,uId,newDocId){
    return request({
      url: `file/place/${uId}/${newDocId}`,
      method: 'put',
      // params:{
      //   ids:fileIds
      // },
      data:fileIds
    })
  }
}
