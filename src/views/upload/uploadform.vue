<template>
  <el-row class="tac">
    <el-col :span="1">
      <div><p /></div>
    </el-col>
    <el-col :span="22">
      <h2>文献基础信息</h2>
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-row>
          <el-col :span="13-1" :xs="33-13">
            <el-form-item label="文献名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13-1" :xs="33-13">
            <el-form-item label="文献作者" >
              <el-input v-model="form.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13-1" :xs="33-13">
            <el-form-item label="文献归属" prop="docId">
              <el-select v-model="form.docId" placeholder="请选择文件夹">
                <el-option
                  v-for="item in docData"
                  :key="item.docId"
                  :label="item.name"
                  :value="item.docId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" :xs="24">
          <!--            <el-form-item label="文献文件类型">-->
          <!--              <el-radio v-model="this.file" label="1">PDF</el-radio>-->
          <!--              <el-radio v-model="this.file" label="2">图片</el-radio>-->
          <!--              <el-radio v-model="this.file" label="3">DOI解析</el-radio>-->
          <!--            </el-form-item>-->
            <el-form-item label="文献文件类型">
              <el-tabs v-model="activeTab">
                <el-tab-pane label="PDF文件" name="first">
                  <el-upload
                    class="upload-demo"
                    action="http://localhost:8081/file/temp"
                    accept=".pdf"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess"
                    :get-messages="getMessages"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="pdfFiles"
                    :auto-upload="false"
                  >
                    <el-button size="small" type="primary" plain>选择文献</el-button>
                    <div slot="tip" class="el-upload__tip">一条文献信息对应一个文件</div>
                  </el-upload>
                </el-tab-pane>
                <el-tab-pane label="图片文件" name="second">

                </el-tab-pane>
                <el-tab-pane label="DOI解析" name="third">
                  <el-form label-position="top">
                    <el-row>
                      <el-col :span="13-1" :xs="33-13">
                        <el-form-item label="DOI号">
                          <el-input v-model="doi">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </el-form-item>
          </el-col>
        </el-row>
<!--        <el-row>-->
<!--          <el-col :span="13-1" :xs="33-11">-->
<!--            <el-form-item label="文献图片">-->
<!--              <el-upload-->
<!--                class="upload-demo"-->
<!--                action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                :on-preview="handlePreview"-->
<!--                :on-remove="handleRemove"-->
<!--                :file-list="fileList"-->
<!--                :auto-upload="false"-->
<!--                list-type="picture">-->
<!--                <el-button size="small" type="primary">点击上传</el-button>-->
<!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,文献图片顺序如上传顺序</div>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  // name: "uploadform",
  data(){
    return{
      doi:'',
      docData:[],
      activeTab:'first',
      form:{
        author:'',
        docId:'',
        name:'',
      },
      rules:{
        name: [
          { required: true, message: '请输入文献名', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        docId: [
          { required: true, message: '请选择归属文件夹', trigger: 'change' }
        ]
      },
      pdfFiles: [
        // 上传文件展示
      ],
    }
  },
  methods:{
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
  }
}
</script>

<style scoped>

</style>
