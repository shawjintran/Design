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
          <!-- 上传 https://jsonplaceholder.typicode.com/posts/-->
          <!-- 点击上传后，将文件上传到服务器，服务器返回文件名，再将文件名pdfTitle和userId传回后端，后端返回pdfId,再将pdfId和userId返回后端 -->

<!--          <el-upload-->
<!--            class="upload-demo"-->
<!--            action="http://localhost:8081/file/temp"-->
<!--            accept=".pdf"-->
<!--            :on-preview="handlePreview"-->
<!--            :on-remove="handleRemove"-->
<!--            :before-remove="beforeRemove"-->
<!--            :on-error="handleAvatarError"-->
<!--            :on-success="handleAvatarSuccess"-->
<!--            :get-messages="getMessages"-->
<!--            multiple-->
<!--            :limit="50"-->
<!--            :on-exceed="handleExceed"-->
<!--            :file-list="fileList"-->
<!--          >-->
<!--            <el-button size="small" type="primary" plain>上传文献</el-button>-->
<!--            <div slot="tip" class="el-upload__tip">可批量上传PDF文件(限50个)</div>-->
<!--          </el-upload>-->
<!--          <el-button type="primary" plain size="medium" @click="handleForm">-->
<!--&lt;!&ndash;            <router-link to="/upload/form">上传文献</router-link>&ndash;&gt;-->
<!--              上传文献-->
<!--          </el-button>-->
<!--          <el-button type="primary" plain size="medium" @click="handleRecent">-->
<!--&lt;!&ndash;            <router-link to="/upload/form">上传文献</router-link>&ndash;&gt;-->
<!--              bian-->
<!--          </el-button>-->
          <div class="coll">
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  <i class="header-icon el-icon-info"></i><span style="opacity: 0">.</span>新增文献
                </template>
                <uploadform></uploadform>
              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="coll">
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  <i class="header-icon el-icon-info"></i><span style="opacity: 0">.</span>批量导入文献
                </template>
                <uploadmulti></uploadmulti>
              </el-collapse-item>
            </el-collapse>
          </div>

          <el-divider>
            <i class="el-icon-upload" />
          </el-divider>

<!--          <el-button-->
<!--            type="primary"-->
<!--            size="small"-->
<!--            plain-->
<!--            style="margin-top: 20px"-->
<!--            :disabled="isDisabled"-->
<!--            @click="handleIdentify"-->
<!--          >识别分析</el-button>-->

          <!-- <el-upload
            class="upload-demo"
            action="http://192.168.43.61:8081/file/temp"
            accept=".pdf"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-error="handleAvatarError"
            :on-success="handleAvatarSuccess"
            multiple
            :limit="50"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">可批量上传PDF文件(限50个)</div>
          </el-upload>
          <el-divider /> -->

          <van-divider style="opacity: 0"/>
          <recent></recent>
<!--          <div>-->
<!--            <component :is="this.show"></component>-->
<!--          </div>-->
          <!-- “识别”按钮 点击后变成disabled样式持续3秒，并弹出提示：正在识别中，请稍后，在7秒之后弹出提示：识别已完成 -->

          <!-- <div v-for="(items,index) in this.files" :key="index">
            <div>

              <span class="title">{{items.pdfTitle}}</span>
              <el-tag
                effect="plain">
                {{ items.pdfTitle}}
              </el-tag>
            </div> -->
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
    'recent':uploadrecent,
    'uploadform':uploadform,
    'uploadmulti':uploadmulti
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
      files: []
    }
  },
  created() {
    this.userId = 3
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.fetchSortFiles(this.userId, 1)
  },
  methods: {
    fetchSortFiles(userId, status) {
      sortfile.fetchById(userId, status).then(response => {
        if (response.code === 200) {
          const arr = JSON.parse(JSON.stringify(response.data))
          this.files = arr.data
        }
      })
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
    },
    handleUpload(){

    }
    // 点击上传后，将文件上传到服务器，服务器返回文件名,再将文件名pdfTitle和userId传回后端，后端返回pdfId,再将pdfId和userId返回后端
    /* getMessage() {
      axios.post('http://192.168.43.61:8081/file/temp').then(
        (res) => {
          this.pdfTitle = res.data.data
          console.log(res.data)
          console.log(this.pdfTitle)
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
      axios
        .post('http://192.168.43.61:8081/file/upload', {
          pdfTitle: this.pdfTitle,
          userId: this.userId
        })
        .then(
          (res) => {
            this.pdfId = res.data.data.pdfId
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      axios.get('http://192.168.43.61:8081/file/analyze/structure', {
        params: {
          pdfId: this.pdfId,
          userId: this.userId
        }
      }).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
    } */
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
