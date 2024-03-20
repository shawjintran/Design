<template>
  <div id="app">
    <el-row class="tac">
      <!-- 页面主题内容 -->
      <el-col :offset="1" :span="22">
        <div style="padding-top: 10px;width: 100%;display: flex;align-items: baseline;justify-content: space-between">
          <i class="el-icon-back" @click="goBack" style="font-size: 24px;"></i>
          <el-tooltip placement="top">
            <div slot="content">{{this.docInfo.docName}}</div>
            <span class="doc-name">
              <i class="el-icon-folder-opened" style="font-size:24px;color: #5a5e66" ></i>
              &nbsp{{this.docInfo.docName}}
            </span>
          </el-tooltip>

          <i class="el-icon-s-operation"
             v-if="(docInfo.docType==1||docInfo.docType==3)&&(userAuth==2||userAuth==3)&&operationIcon=='showTable'"
             @click="changeModify" style="float:right;font-size: 20px;color: #97a8be"></i>
          <i class="el-icon-s-grid"
             v-if="(docInfo.docType==1||docInfo.docType==3)&&(userAuth==2||userAuth==3)&&operationIcon=='showModify'"
             @click="changeTable" style="float:right;font-size: 20px;color: #97a8be"></i>
          <i class="el-icon-refresh"
             v-if="docInfo.docType!=1&&docInfo.docType!=3&&userAuth!=2&&userAuth!=3"
             @click="refreshTable" style="float:right;font-size: 20px;color: #97a8be"></i>
        </div>

        <div v-if="this.$route.query.docAuth ==1" >
<!--          文件夹群内共享人-->
          <div class="userList">
            <el-tooltip placement="top" v-for="user in docUsers"
                        :key="user.userId" class="userAvatar">
              <div slot="content" style="max-width: 100px;">
                {{user.id}}<br/>
                {{user.phone}}<br/>
                <span v-if="user.auth==3" >归属者 </span>
                <span v-if="user.auth==2" >管理员</span>
                <span v-if="user.auth==1" >用户</span>
              </div>
              <el-avatar v-if="user.auth==1"
              >{{user.phone.slice(-4)}}
              </el-avatar>
              <el-avatar v-if="user.auth==2"
                :style="{ backgroundColor: '#60bee7'}"
              >{{user.phone.slice(-4)}}
              </el-avatar>
              <el-avatar v-if="user.auth==3"
                :style="{ backgroundColor:  '#fc5b5b'}"
              >{{user.phone.slice(-4)}}
              </el-avatar>
            </el-tooltip>
          </div>
        </div>
        <div v-else>
         <van-divider style="opacity: 0"></van-divider>
        </div>
        <div>
          <show-table ref="showtable" v-if="operationIcon=='showTable'" :doc-info="docInfo" :user-auth="userAuth" ></show-table>
          <show-modify v-if="operationIcon=='showModify'" :doc-info="docInfo" :user-auth="userAuth" @changeTable="getChange"></show-modify>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import docApi from '@/views/filedetail/doc'
import showDoc from "@/views/filedetail/showDoc";
import modifyDoc from "@/views/file/modifyDoc";
export default {
  components:{
    showTable:showDoc,
    showModify:modifyDoc
  },
  data() {
    return {
      // 从file.vue页面传递过来的参数
      docInfo:{
        docId: '',
        userId: '3',
        docName: '文件夹详情',
        docAuth:1,
        docType:0,
      },
      addId:'',
      // 表格数据
      // 选中的数据
      multipleSelection: [],
      // 总页数
      total: 0,
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
      docData:[],
      tempId: -1,
      docUsers: [
        {
          id:1,
          auth:1,
          phone:'134551880',
          coll:false,
        },
        {
          id:3,
          auth:2,
          phone:'145645',
          coll:false,
        },{
          id:4,
          auth:2,
          phone:'14545451880',
          coll:false,
        },
        {
          id:2,
          auth:3,
          phone:'1111111880',
          coll:false,
        },
      ],
      authOption:[
        {
          value:1,
          label:'用户'
        },
        {
          value:2,
          label:'管理员'
        },
        {
          value:3,
          label:'归属者'
        },
      ],
      operationIcon:'showTable',
      userAuth:2,

    }
  },
  mounted() {
    // 接收file.vue页面传输过来的参数
    this.docInfo.docId = this.$route.query.docId
    this.docInfo.userId = this.$route.query.userId
    this.docInfo.docName = this.$route.query.docName
    this.docInfo.docAuth = this.$route.query.docAuth
    this.docInfo.docType = this.$route.query.docType
    if (this.docInfo.docType==2)
      this.userAuth=1;
    if (this.docInfo.docType==1)
      this.userAuth=3;
    // 测试 浏览器控制台打印file.vue传递过来的参数
    // 页面加载时获取数据
    this.refreshTable()
    console.log(this.$route.query.docAuth)
    if (this.$route.query.docAuth==1)
    {
      this.getDocUsers();
    }
  },
  methods: {
    refreshTable(){
      this.$refs.showtable.getdata()
    },
    getChange(val){
      console.log("111")
      this.operationIcon=val
    },
    changeModify(){
      this.operationIcon='showModify'
    },
    changeTable(){
      this.operationIcon='showTable'
    },

    goBack(){
      this.$router.go(-1)
    },
    getDocUsers() {
      docApi.getDocUsers(this.$route.query.docId)
      .then(response => {
        console.info(response.data)
        this.docUsers=response.data.docUsers
        this.userAuth=response.data.userAuth
      })
    },
  }
}
</script>
<style lang="scss" scoped >
.el-icon-caret-bottom{
  padding-right: 30px;
}
.userList {
  width: 100%;
  height: 60px; /* 设置高度，可以根据需要调整 */
  overflow-y: scroll; /* 允许纵向滚动 */
  overflow-x: hidden; /* 隐藏横向滚动条 */
  padding:10px;
  margin-bottom: 10px ;
  margin-top: 20px;
  border: 1px solid #dae7f8;
}
.userAvatar{
  margin-right: 5px;
  margin-bottom: 5px;
}
.doc-name{
  display: inline-block;
  max-width: 550px;
  font-size: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
::v-deep .el-avatar{
font-size: 18px;
}

@media screen and (max-width: 767px) {
  .doc-name{
    max-width: 200px;
  }
}
</style>
