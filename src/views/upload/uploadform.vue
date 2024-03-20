<template>
  <el-row class="tac">
    <el-col>
      <div style="font-size:20px;font-weight: bolder;margin-bottom: 10px"></div>
      <el-form :model="form" label-width="80px" :rules="rules" ref="form">
        <el-row>
          <el-col :span="13-1" :xs="33-13">
            <el-form-item label="文献名" prop="name">
              <el-input v-model="form.name"></el-input>
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
                >
                  <div style="display:inline-block;float: left;width: 150px;text-overflow: ellipsis;overflow:hidden">{{ item.name }}</div>
                  <span style="float: right; color: #8492a6; font-size: 13px;margin-left: 10px">ID {{ item.docId }}</span>
                  <span style="float: right;">
                    <el-tag type="success" size="small" v-if="item.auth==0">个人</el-tag>
                    <el-tag type="danger" size="small" v-else>共享</el-tag>
                  </span>
                </el-option>
              </el-select>
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
      </el-form>
      <el-row>
        <el-col :span="18" :xs="24">
        <!--            <el-form-item label="文献文件类型">-->
        <!--              <el-radio v-model="this.file" label="1">PDF</el-radio>-->
        <!--              <el-radio v-model="this.file" label="2">图片</el-radio>-->
        <!--              <el-radio v-model="this.file" label="3">DOI解析</el-radio>-->
        <!--            </el-form-item>-->
          <el-form :label-position="'top'" >

            <el-form-item required >
              <template slot="label">
                类型
                <el-tooltip effect="dark"
                            content="请选择合适的文献类型进行上传"
                            placement="right">
                  <i class="el-icon-question"
                     style=" font-size: 16px; vertical-align: center;"></i>
                </el-tooltip>
              </template>
              <el-row>
                <el-col :span="18" :xs="24" style="padding-left: 10px">
                  <el-tabs v-model="activeTab"  class="x-tab">
                    <el-tab-pane label="PDF文件" name="first">
                      <el-upload
                        class="upload-demo"
                        action="http://localhost:8081/file/temp"
                        accept=".pdf"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-change="handleChange"
                        :on-error="handlePdfError"
                        :on-success="handlePdfSuccess"
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="pdfFiles"
                        :auto-upload="false"
                      >
                        <el-button size="small" type="primary" plain>选择文献</el-button>
                        <div slot="tip" class="el-upload__tip">一条文献信息对应一个PDF文件</div>
                      </el-upload>
                      <br/>
                      <el-button size="small" type="warning" plain @click="uploadFile(1)">保存添加</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="图片文件" name="second">
                      <upload-pic></upload-pic>
                    </el-tab-pane>
                    <el-tab-pane label="DOI解析" name="third">
                      <el-row>
                        <el-col :span="13-1" :xs="33-13">
                          <el-input v-model="doi" placeholder="请输入DOI号">
                            <el-button slot="append" icon="el-icon-s-promotion"></el-button>
                          </el-input>
                          <div class="el-upload__tip">暂时只支持xxx</div>
                          <div v-if="this.doiFile.length!=null&&this.doiFile.length>0">
                            <ul class="el-upload-list el-upload-list--text">
                              <li v-for="f of this.doiFile " :key="f.name" class="el-upload-list__item is-success">
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>{{f.name}}</a>
                                <label class="icon-label" @click="downloadFile(f)">
                                  <i class="el-icon-download"></i>
                                </label>
                              </li>
                            </ul>
                          </div>
                          <el-button size="small" type="warning" plain @click="uploadFile(3)">保存添加</el-button>
                        </el-col>
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="URL解析" name="forth">
                      <el-row>
                        <el-col :span="13-1" :xs="33-13">
                          <el-input v-model="url" placeholder="请输入微信URL">
                            <el-button slot="append" icon="el-icon-s-promotion"></el-button>
                          </el-input>
                          <div class="el-upload__tip">暂时只支持微信文章</div>
                          <div v-if="urlResolve.length!=null&&urlResolve.length>0">
                            <ul class="el-upload-list el-upload-list--text">
                              <li v-for="f of urlResolve " :key="f.name" class="el-upload-list__item is-success">
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>{{f.name}}</a>
                                <label class="icon-label" @click="downloadFile(f)">
                                  <i class="el-icon-download"></i>
                                </label>
                              </li>
                            </ul>
                          </div>
                          <el-button size="small" type="warning" plain @click="uploadFile(4)">保存添加</el-button>
                        </el-col>
                      </el-row>
                    </el-tab-pane>
                  </el-tabs>
                </el-col>
              </el-row>

            </el-form-item>
          </el-form>

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
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import takephoto from "@/views/photo/takephoto";
import uploadPic from "@/views/upload/uploadPic";
export default {
  name: "uploadform",
  components:{
    takephoto:takephoto,
    uploadPic:uploadPic
  },
  data(){
    return{
      doi:'',
      doiFile:[
        {
          name: '日本.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
      docData:[],
      activeTab:'first',
      isTake:false,
      takeWidth:400,
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
      urlResolve:[
        {
          name: 'url.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
      url:'',
    }
  },
  methods:{
    uploadFile(type){
      if (type==1){
        console.log(this.pdfFiles)
      }else if(type==3){
        console.log(this.doiFile)
      }else if(type==4){
        console.log(this.urlResolve)
      }
    },
    downloadFile(excel){

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
      console.log(file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed(files, fileList) {
      console.log(fileList)
      this.$message.warning(
        `限制选择 1 个文件，已选择了 ${fileList.length} 个文件，请先删除前一个文件`
      )
    },
    handleChange(file, fileList){
      this.pdfFiles=fileList
    },
    handlePdfSuccess(res, file, fileList) {
      this.pdfFiles = fileList
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
.icon-label{
  position: absolute;
  right: 5px;
  top: 0;
}
::v-deep .el-form-item__content{
  line-height: 10px;
}
::v-deep .el-form--label-top .el-form-item__label{
  padding-bottom: 0;
  padding-left:15px;
}
@media screen and (max-width: 767px) {
  ::v-deep .el-dialog{
    width: 95%;
  }
}
</style>
