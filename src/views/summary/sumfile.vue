<template>
  <div>
    <el-row >
      <!-- 页面主题内容 -->
      <el-col :offset="1" :span="22">
        <h2>文献进程</h2>
        <van-divider style="opacity: 0"></van-divider>
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName">
              <el-tab-pane label="全部文献" name="first">
                <el-card v-if="!showRatio()" >
                  <span> 范围 : </span>
                  <el-radio-group size="small" v-model="dataType">
                    <el-radio-button
                      :label="1"
                    >
                      我上传的
                    </el-radio-button>
                    <el-radio-button
                      :label="2"
                    >
                      他人上传
                    </el-radio-button>
                  </el-radio-group>
                </el-card>
                <el-table
                  :data="files"
                  style="width: 100%;min-height: 470px"
                >
                  <el-table-column
                    prop="pdfTitle"
                    label="文献名"
                    min-width="160"
                    :show-overflow-tooltip="true"
                  />
                  <!-- 将状态栏靠在最后 -->
                  <el-table-column
                    prop="pdfStatus"
                    label="当前状态"
                    min-width="140"
                    sortable
                  >
                    <!-- 当状态为1时 表示为“已完成”，状态为0时，表示“分析中”，状态为2时，表示出现异常 -->
                    <template slot-scope="scope">
                      <el-tag
                        v-if="scope.row.pdfStatus === 1"
                        effect="light"
                        type="success"
                        size="mini"
                      >
                        已完成
                      </el-tag>
                      <el-tag
                        v-else-if="scope.row.pdfStatus === 0"
                        effect="light"
                        type="primary"
                        size="mini"
                      >
                        分析中
                      </el-tag>
                      <el-tag
                        v-else-if="scope.row.pdfStatus === 2"
                        effect="light"
                        type="danger"
                        size="mini"
                      >
                        系统异常
                      </el-tag>
                      <el-tag
                        v-else-if="scope.row.pdfStatus === 3"
                        effect="light"
                        type="warning"
                        size="mini"
                      >
                        审核中
                      </el-tag>
                      <el-tag
                        v-else-if="checkMessage[scope.row.pdfStatus]"
                        effect="light"
                        type="danger"
                        size="mini"
                      >
                        {{ checkMessage[scope.row.pdfStatus] }}
                      </el-tag>
                      <el-tag
                        v-else
                        effect="light"
                        type="info"
                        size="mini"
                      >
                        错误
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                  align="center">
                    <template slot="header" slot-scope="scope">
                      <el-radio-group v-if="showRatio()" size="medium" v-model="dataType">
                          <el-radio-button
                            :label="1"
                          >
                            我上传的
                          </el-radio-button>
                          <el-radio-button
                            :label="2"
                          >
                            他人上传
                          </el-radio-button>
                      </el-radio-group>
                    </template>
                    <template slot-scope="scope">
                      <el-button
                        v-if="checkMessage[scope.row.pdfStatus]||scope.row.pdfStatus===2"
                        type="text"
                        size="mini"
                        @click="reUpload(scope.row)"
                      >
                        重传
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                  style="text-align: center"
                  @current-change="handleCurrentChange"
                />
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        <el-dialog
          title="重新上传文献"
          :visible.sync="showUploadDialog"
        >
          <template #default>
            <el-form :model="editData" label-position="top">
              <el-form-item label="文件名" required>
                <el-input  v-model="editData.pdfTitle" style="width: 350px" />
              </el-form-item>
              <el-form-item label="上传" required>
                <el-upload
                  action="http://localhost:8081/file/temp"
                  accept=".pdf"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-change="handleChange"
                  :on-error="handlePdfError"
                  :on-success="handlePdfSuccess"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="editData.editFile"
                  :auto-upload="false"
                >
                  <el-button slot="trigger" size="small" type="primary" plain>选择文献</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
                  <div slot="tip" class="el-upload__tip">若通过解析上传，请先解析下载PDF文件后上传</div>
                  <el-button style="margin-left: 10px" size="small" type="warning" plain @click="uploadFile(1)">保存添加</el-button>
                </el-upload>
                <br/>

              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showUploadDialog = false">取消</el-button>
            </div>
          </template>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
import axios from "axios";
export default {
  name: "sumfile",
  components: {ElSelectDropdown},
  data() {
    return{
      total: 0,
      // 当前页
      currentPage: 1,
      // 每页显示的条数
      pageSize: 10,
      files: [
        {
          pdfId: '1',
          pdfTitle: '慢性阻塞性肺疾病患者自我管理水平及影响因素研究',
          pdfStatus: 1,
        },{
          pdfId: '1',
          pdfTitle: '视频监控系统的设计视频监控系统的设计',
          pdfStatus: 30,
        },{
          pdfId: '1',
          pdfTitle: 'PDF内容提取系统设计与实现',
          pdfStatus: 0,
        },{
          pdfId: '1',
          pdfTitle: '基于Elasticsearch的知识库检索引擎系统设计与实现',
          pdfStatus: 0,
        },
        {
          pdfId: '1',
          pdfTitle: '自动著录技术在户籍档案数字化中的应用研究与实践',
          pdfStatus: 3,
        },
      ],
      activeName:'first',
      dataType:1,
      checkMessage:{
        30:'审核异常：政治因素',
        31:'审核异常：血腥不适',
        32:'审核异常：涉及引流',
        33:'审核异常：',
        34:'审核异常：政治因素',
      },
      showUploadDialog:false,
      editData:{
        editId:null,
        editTitle:null,
        editFile:null
      }
    }
  },
  methods:{
    getFileList(){
      this.total=this.files.length
    },
    showRatio(){
      if (this.$store.state.app.device==='mobile')
        return false
      return true
    },
    reUpload(row){
      this.editData.pdfId=row.pdfId
      this.editData.pdfTitle=row.pdfTitle
      this.showUploadDialog=true
    },
    uploadFile(){

    },
    getCheck(){
      // this.checkMessage
    },
    handlePdfError(err, file, fileList) {
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
      this.editData.editFile=null
      console.log(file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed(files, fileList) {
      console.log(fileList)
      this.$message.warning(
        `限制选择 1 个文件，已选择了 ${fileList.length} 个文件，请先删除`
      )
    },
    handleChange(file, fileList){
      this.editData.editFile=fileList
    },
    handlePdfSuccess(res, file, fileList) {
      this.editData.editFile = fileList
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
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog{
  width: 50%;
  margin-bottom: 20px;
}
::v-deep .el-form-item__content{
  line-height: 20px;
}
@media screen and (max-width: 767px) {
  ::v-deep .el-dialog{
    width: 90%;
    margin-bottom: 15px;
  }
}

</style>
