<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <el-row class="tac">
      <el-col :span="1">
        <div><p /></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>文献上传</h2>
<!--        Todo：DOI文献解析-->
        <div class="content">
          <div class="coll">
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  <i class="header-icon el-icon-info"></i>&nbsp新增文献
                </template>
                <uploadform></uploadform>
              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="coll">
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  <i class="header-icon el-icon-info"></i>&nbsp批量导入文献
                </template>
                <uploadmulti></uploadmulti>
              </el-collapse-item>
            </el-collapse>
          </div>

          <el-divider>
            <i class="el-icon-upload" />
          </el-divider>


          <van-divider style="opacity: 0"/>
          <recent v-on="$listeners"></recent>
          <van-divider style="opacity: 0"></van-divider>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.title{
  white-space:nowrap;/*强制单行显示*/
  text-overflow:ellipsis;/*超出部分省略号表示*/
  overflow:hidden;/*超出部分隐藏*/
  width: 260px;/*设置显示的最大宽度*/
  display:inline-block;
}
.title-next{
  vertical-align: top;
}
</style>
<script>
import axios from 'axios'
import sortfile from '@/api/sortfile'
import uploadrecent from "@/views/upload/uploadrecent";
import uploadform from "@/views/upload/uploadform";
import uploadmulti from "@/views/upload/uploadmulti";
export default {
  components:{
    recent:uploadrecent,
    uploadform:uploadform,
    uploadmulti:uploadmulti
  },
  data() {
    return {
      radio: '1',
      isCollapse: false,
      show:"recent",
      activeIndex: '2',
      tableData: [
        {
          id: '1',
          listOne: '慢性阻塞性肺疾病患者自我管理水平及影响因素研究',
          state: '已分析',
          add_time: '2023-02-16'
        }
      ],
      fileList: [
        // 上传文件展示
      ],
      isDisabled: false,
      pdfTitle: '',
      userId: '3',
      pdfId: '',
      file: '',
      formData: new FormData(),
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.fetchSortFiles(this.userId, 1)
  },
  methods: {
    handleAvatarSuccess(res, file, fileList) {
      this.fileList = fileList
      // 上传成功钩子函数
      console.log('res', res)
      console.log('file', file)
      console.log('fileList', fileList)
      // 上传成功后，服务端返回文件名
      this.pdfTitle = res.data
      console.log(this.pdfTitle)
      console.log('成功返回文件名')
      // 将文件名pdfTitle和userId传回后端，后端返回pdfId
      axios.post('http://localhost:8081/file/upload/',null,
        { params: {
          pdfTitle: this.pdfTitle,
          userId: this.userId
        }}).then(
        (res) => {
          this.pdfId = res.data
          console.log(res.data)
          console.log(this.pdfId)
          console.log('成功返回pdfId')
          // this.fetchSortFiles(this.userId, 1)
          // 将pdfId和userId返回后端
          // axios.post('http://192.168.43.61:8081/file/analyze/structure'
          //   , {
          //     pdfId: this.pdfId,
          //     userId: this.userId
          //   }).then(
          //   (res) => {
          //     console.log(res.data)
          //     console.log('成功返回pdfId和userId')
          //   }
          // ).catch(
          //   (err) => {
          //     console.log(err)
          //     console.log('失败返回pdfId和userId')
          //   }
          // )
        })
      // 上传成功后，弹出提示 上传成功
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    handleAvatarError(err, file, fileList) {
      // 上传失败钩子函数
      console.log('err', err)
      console.log('file', file)
      console.log('fileList', fileList)
      console.log('err', JSON.parse(err.message))
      if (file.status === 'fail') {
        this.$message.error(JSON.parse(err.message).message)
      }
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 50 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    handleIdentify() {
      console.log(this.fileList)
      this.isDisabled = true
      this.$message({
        message: '后台将进行识别中，请等待5-10分钟',
        type: 'success'
      })
      this.fileList = []
      this.fetchSortFiles(this.userId, 1)
      // setTimeout(() => {
      //   this.$message({
      //     message: '识别已完成',
      //     type: 'success'
      //   })
      //   this.isDisabled = false
      // }, 4000)
    }
  }
}
</script>
<style lang="scss" scoped>
.coll{
  margin-top: 10px;
  padding-top: 10px;
  border-radius: 10px 10px 10px 10px;
  background-color: #f0f3ff;
  border-color: #f0f3ff;
  box-shadow: 0px -10px 10px -10px rgba(0, 0, 0, 0.34);
}
::v-deep .el-collapse-item__header {
  background-color: #f0f3ff;
  font-size: 15px;
  border-color: #f0f3ff;
  font-weight: bold;
  color: #3a9cc9;
  margin-left: 5px;
  margin-bottom: 10px;
}
::v-deep .el-collapse{
  border-color:#f0f3ff;
}
</style>
