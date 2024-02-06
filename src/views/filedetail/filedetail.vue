<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="1">
        <div><p style="color:white;">.</p></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>{{this.docName}}</h2>
<!--        <div class="content" style="color:white;">.</div>-->
        <div v-if="this.$route.query.auth ==1" class="userList">
<!--          文件夹群内共享人-->
            <el-tooltip placement="top" v-for="user in docUsers"
                        :key="user.userId" class="userAvatar">
              <div slot="content">
                {{user.userName}}<br/>
                {{user.userRole===1?'创建者':''}}
              </div>
              <el-avatar
                :style="{ backgroundColor: user.userRole === 1 ? '#ffa1a1' : '' }"
              >{{user.userName}}
              </el-avatar>
            </el-tooltip>
        </div>
        <!-- 多选文献后批量移动到其他文件夹 按钮 -->
        <el-button type="primary" plain @click="handleMultiMove">移动</el-button>
        <el-button type="primary" plain @click="handleMultiDownload">下载</el-button>
<!--        <el-button type="primary" plain @click="handleMove">导出</el-button>-->
<!--        Todo：移动功能添加-->
        <el-divider />
        <!-- elementUI 可选择表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          @row-click="rowclick"
        >
          <!-- 表格第一列为docId -->
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="pdfTitle"
            label="文献名"
            show-overflow-tooltip="true"
            min-width="160"
          />
          <!-- 表格最后一列为操作,有跳转到文献详情界面detail.vue,有移动到另一个文件夹操作 -->
          <el-table-column
            prop="pdfAuthor"
            label="作者"
            width="80"
          />
          <el-table-column
            label="操作"
            align="right"
          >
            <template slot-scope="scope">
              <!-- 编辑按钮 点击按钮弹窗显示docId,pdfId,pdfTitle 并且可以修改 -->
              <el-popover
                v-model="visible"
                placement="right"
                width="10"
              >
                <div>
                  <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="text" @click="handleDownload(scope.$index,scope.row)">下载</el-button>
                </div>
                <i slot="reference" class="el-icon-caret-bottom" />
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 每页显示数量size和总数total从后端获取 然后将后端传回的数据分页显示在表格中 -->
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <!-- 点击编辑按钮弹窗显示docId,pdfId,pdfTitle 并且可以修改-->
        <el-dialog
          title="编辑数据"
          :visible.sync="showEditDialog"
        >
          <template #header>
            <span>编辑数据</span>
          </template>
          <template #default>
            <el-form :model="editData">
              <el-form-item label="文件夹">
                <el-select v-model="tempId" placeholder="请选择">
                  <el-option
                    v-for="item in docData"
                    :key="item.docId"
                    :label="item.name"
                    :value="item.docId"
                  />
                </el-select>
                <!-- 选择文件夹名后，将另一个输入框里的docId不变 -->
                <el-input v-show="false" v-model="editData.docId" disabled />
                <!-- 选择文件夹名后，将另一个输入框里的新选择的newDocId跟着变化 -->
                <el-input v-show="false" v-model="editData.newDocId" disabled />
              </el-form-item>
              <el-form-item v-show="false" label="pdfId">
                <el-input v-model="editData.pdfId" disabled />
              </el-form-item>
              <el-form-item label="文献名">
                <el-input v-model="editData.pdfTitle" />
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="showEditDialog = false">取 消</el-button>
              <el-button size="small" type="primary" @click="handleEditSubmit">确 定</el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog
          title="移动文件"
          :visible.sync="showMoveDialog"
        >
          <template #header>
            <span>移动文件</span>
          </template>
          <template #default>
            <el-form :model="editData">
              <el-form-item label="文件夹">
                <el-select v-model="tempId" placeholder="请选择">
                  <el-option
                    v-for="item in docData"
                    :key="item.docId"
                    :label="item.name"
                    :value="item.docId"
                  />
                </el-select>
                <!-- 选择文件夹名后，将另一个输入框里的docId不变 -->
                <el-input v-show="false" v-model="editData.docId" disabled />
                <!-- 选择文件夹名后，将另一个输入框里的新选择的newDocId跟着变化 -->
                <el-input v-show="false" v-model="editData.newDocId" disabled />
              </el-form-item>
              <el-form-item v-show="false" label="pdfIds">
                <el-input v-model="movePdfIds" disabled />
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="showMoveDialog = false">取 消</el-button>
              <el-button size="small" type="primary" @click="handleMoveSubmit">确 定</el-button>
            </div>
          </template>
        </el-dialog>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import docApi from '@/views/filedetail/doc'
export default {
  data() {
    return {
      // 从file.vue页面传递过来的参数
      docId: '',
      userId: '3',
      docName: '文件夹详情',
      // 表格数据
      tableData: [
      ],
      // 选中的数据
      multipleSelection: [],
      // 总页数
      total: '',
      // 当前页
      currentPage: 1,
      // 每页显示的条数
      pageSize: 10,
      // 编辑对话框是否显示
      showEditDialog: false,
      // 编辑对话框中的数据
      showMoveDialog:false,
      movePdfIds:[],
      editData: {
        index: 0,
        docId: '',
        pdfId: '',
        pdfTitle: '',
        newDocId: ''
      },
      docData:'',
      tempId: -1,
      docUsers: ''
    }
  },
  mounted() {
    // 接收file.vue页面传输过来的参数
    this.docId = this.$route.query.docId
    this.userId = this.$route.query.userId
    this.docName = this.$route.query.docName
    // 测试 浏览器控制台打印file.vue传递过来的参数
    console.log('测试')
    console.log(this.docId)
    console.log(this.userId)
    // 页面加载时获取数据
    this.getdata()
    // this.getDocData()
    console.log(this.$route.query.auth)
    if (this.$route.query.auth ==1)
    {
      console.log(this)
      this.getDocUsers();
    }
    // console.log(this.docData)
  },
  methods: {
    // 使用使用axios从后端api获取文件夹里面的文献信息 /file/search/{page}/{size}
    getdata() {
      const page = this.currentPage
      const size = this.pageSize
      // const url = 'http://192.168.43.61:8081/file/search/' + page + '/' + size
      const url = 'http://localhost:8081/file/search/' + page + '/' + size
      console.log(url)
      // 使用axios从后端api获取数据 get请求 params传参数
      axios.get(url, {
        params: {
          docId: this.docId,
          userId: this.userId
        }
      }).then(res => {
        console.log(res)
        // 将获取到的数据赋值给tableData
        console.log('成功获取')
        console.log(res.data)
        this.tableData = res.data.data.data
        this.total = res.data.data.all
        console.log(this.total)
        console.log(this.tableData)
      }).catch(err => {
        console.log('失败')
        console.log(err)
      })
    },
    // 选择框
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    rowclick(row,col,event){
      console.log(row)
      if (col.label!='操作') {
        this.$router.push({
          path: '/pdf/pdf',
          query: {
            pdfId: row.pdfId
          }
        })
      }
    },
    // 编辑 使用axios post从后端api编辑一行数据 使用query传参,在点完编辑按钮后弹出窗口进行编辑
    handleEdit(index, row) {
      console.log('编辑')
      console.log(index)
      console.log(row)
      // 将点击的行的数据赋值给editData
      this.editData.index = index
      this.editData.docId = row.docId
      this.tempId = row.docId
      this.editData.pdfId = row.pdfId
      this.editData.pdfTitle = row.pdfTitle
      // 将弹窗显示
      this.showEditDialog = true
      this.getDocData()
    },
    // 编辑提交
    handleEditSubmit() {
      console.log('编辑提交')
      console.log(this.editData)
      console.log(this.userId)
      // eslint-disable-next-line eqeqeq
      if (this.tempId != this.editData.docId)
        this.editData.newDocId = this.tempId
      // 使用axios post 从后端api编辑一行数据 使用query传参
      // const url = 'http://192.168.43.61:8081/file/update'
      const url = 'http://localhost:8081/file/update'
      axios({
        method: 'post',
        url: url,
        params: {
          docId: this.editData.docId,
          pdfId: this.editData.pdfId,
          pdfTitle: this.editData.pdfTitle,
          userId: this.userId,
          newDocId: this.editData.newDocId
        }
      }).then(res => {
        console.log(res)
        // 将获取到的数据赋值给tableData
        console.log('成功')
        console.log(res.data)
        // 将弹窗隐藏
        this.showEditDialog = false
        // 将修改后的数据赋值给tableData
        this.getdata()
        // this.tableData[this.editData.index].pdfTitle = this.editData.pdfTitle
      }).catch(err => {
        console.log('失败')
        console.log(err)
      })
      // 点击确认后上方弹出提示 提示修改成功
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    },
    // 使用axios 从后端获取文件夹数据
    getDocData() {
      //Todo:获取有可写权限的文件夹
      const userId = 3
      const url = 'http://localhost:8081/doc/search/' + userId
      // const url = 'http://192.168.43.61:8081/doc/search/' + userId
      console.log(url)
      axios.get(url).then(res => {
        // 将获取到的数据赋值给docData
        this.docData = res.data.data.data
        console.log('成功')
        console.log(res.data.data.data)
        console.log(this.docData)
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击分页器中的每页显示数量，触发size-change事件，调用handleSizeChange()方法
    handleSizeChange(size) {
      this.pageSize = size
      this.getdata()
    },
    // 点击分页器中的页码，触发current-change事件，调用handleCurrentChange()方法
    handleCurrentChange(page) {
      this.currentPage = page
      this.getdata()
    },
    getDocUsers() {
      docApi.getDocUsers(this.$route.query.docId)
      .then(response => {
        console.info(response.data)
        this.docUsers=response.data
      })
    },
    handleMultiDownload(){
      if(this.multipleSelection.length<1)
        return
      for(var i = 0; i < this.multipleSelection.length; i++) {
        console.log(this.multipleSelection[i]);
        this.handleDownload('',this.multipleSelection[i])
      }
    },
    handleDownload(index, row){
      console.log(row)
      var elemIF = document.createElement('iframe')
      elemIF.src = 'http://localhost:8081/file/download/'+row.pdfId
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)
      // docApi.getDownloadFile(row.pdfId)
    },
    handleMultiMove(){
      if(this.multipleSelection.length<1)
        return
      this.tempId=this.multipleSelection[0].docId
      this.editData.docId=this.tempId
      for(var i = 0; i < this.multipleSelection.length; i++) {
        // console.log(this.multipleSelection[i]);
        this.movePdfIds.push(this.multipleSelection[i].pdfId)
      }
      this.showMoveDialog=true
    },
    handleMoveSubmit(){
      console.log(this.movePdfIds)
      console.log(this.editData.docId)
      console.log(this.tempId)
      if (this.tempId == this.editData.docId)
        return
      this.editData.newDocId = this.tempId
      docApi.placefiles(this.movePdfIds,3,this.editData.newDocId)
    }
  },
}
</script>
<style>
.el-icon-caret-bottom{
  padding-right: 30px;
}
.userList {
  width: 100%;
  height: 55px; /* 设置高度，可以根据需要调整 */
  overflow-y: scroll; /* 允许纵向滚动 */
  overflow-x: hidden; /* 隐藏横向滚动条 */
  padding:10px;
}
.userAvatar{
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
