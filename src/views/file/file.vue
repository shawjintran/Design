<template>
  <div id="app">
    <el-row class="tac">
      <!-- 页面主题内容 -->
      <el-col :offset="1" :span="22">
        <h2>文献集</h2>
        <van-divider style="opacity: 0"></van-divider>
<!--        <el-button type="primary" plain @click="addTableData">添加</el-button>-->
<!--        <van-divider style="opacity: 0;"></van-divider>-->
        <el-row>
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="个人文献集" name="first">
              <br>
              <el-table
                v-if="activeName ==='first'"
                :data="selfDocs"
                style="width: 100%;min-height: 350px"
                @row-click="hrow"
              >
                <el-table-column
                  prop="name"
                  label="名称"
                  min-width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="larkui-icon larkui-icon-book-type-default icon-svg larkui-tooltip index-module_size_wVASz" data-name="BookTypeDefault" style="width: 18px; height: 18px; min-width: 18px;text-align: center">
                      <g fill="none" fill-rule="evenodd">
                        <path d="M4.75 1.267h10.5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2Z" fill="" />
                        <path d="M4.75 1.267h2.215v18H5.75a3 3 0 0 1-3-3v-13a2 2 0 0 1 2-2Z" fill="" />
                        <path stroke="#0093D5" d="M7.25 1.1v17.667" />
                        <path stroke="#0093D5" stroke-linecap="round" stroke-linejoin="round" d="M10.85 5.394h3.4" />
                        <path d="M4.25 1.267h11.5a1.5 1.5 0 0 1 1.5 1.5v14.5a1.5 1.5 0 0 1-1.5 1.5H4.25a1.5 1.5 0 0 1-1.5-1.5v-14.5a1.5 1.5 0 0 1 1.5-1.5Z" stroke="#0093D5" />
                      </g>
                    </svg>
                    <span style="margin-left: 5px;text-align: center;vertical-align:middle">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="size"
                  label="数量"
                  min-width="50"
                />
                <el-table-column
                  min-width="50"
                  align="right"
                  padding-right="30"
                >
                  <template slot="header" slot-scope="scope">
                    <el-button size="mini" plain @click="addTableData(0)">
                      &nbsp添加
                    </el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-dropdown trigger="click" placement="bottom-start">
                      <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1" @click.native="handleEdit(scope.$index, scope.row)">编辑</el-dropdown-item>
                        <el-dropdown-item command="2" divided @click.native="handleDelete(scope.$index, scope.row)">删除</el-dropdown-item>
                        <el-dropdown-item command="3" divided @click.native="handleDetail(scope.$index, scope.row)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>

            </el-tab-pane>

            <el-tab-pane label="共享文献集" name="second" style="min-height: 400px">
              <div style="padding-bottom: 10px;padding-top: 5px">
                <el-button plain size="small" type="warning" @click="addTableData(1)">
                  <i class="el-icon-circle-plus-outline">&nbsp添加</i>
                </el-button>
              </div>

              <el-collapse v-model="showColl1" accordion>
                <el-collapse-item name="1" @click.native="collapse1Change">
                  <template slot="title"  class="collapse-title">
                    <div class="collapse-title-length">
                      &nbsp我管理的
                    </div>
                  </template>
                  <div  @click.stop="collapse1Change" @click.prevent="collapse1Change">
                    <table-manage :docs="manageDocs" ></table-manage>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <el-collapse v-model="showColl2" accordion>
                <el-collapse-item name="1" @click.native="collapse2Change">
                  <template slot="title" class="collapse-title">
                    <div class="collapse-title-length">
                      &nbsp我加入的
                    </div>
                  </template>
                  <div @click.stop="collapse2Change" @click.prevent="collapse2Change">
                    <table-add :docs="participateDocs" ></table-add>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>

            <el-tab-pane label="收藏文献集" name="third" style="min-height: 400px">
              <likesDoc></likesDoc>
            </el-tab-pane>
          </el-tabs>
        </el-row>

        <!-- elementUI 表格 -->

        <!-- el-dialog嵌套对话框 点击"添加"按钮后弹出对话框提示“是否要新建文件夹”，点击确定后再弹出对话框对文件名进行编辑 -->
        <el-dialog
          title="消耗积分"
          :visible.sync="outerVisible"
        >
          <template #default>
              <span>本次创建文件夹需要花费10积分</span>
          </template>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">取消</el-button>
            <el-button type="primary" @click="FirstDialog">确定</el-button>
          </div>
        </el-dialog>

        <el-dialog
          title="添加文件夹"
          :visible.sync="showAddDialog"
        >
          <template #default>
            <el-form :model="editData">
              <el-form-item label="文件名" required>
                <el-input v-model="editData.name" />
              </el-form-item>
              <el-form-item label="权限">
                <el-radio v-model="editData.docAuth" :label=1>共享</el-radio>
                <el-radio v-model="editData.docAuth" :label=0>个人</el-radio>
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showAddDialog = false">取消</el-button>
              <el-button type="primary" @click="submitAddData">确定</el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog
          title="编辑文件夹"
          :visible.sync="showEditDialog"
        >
          <template #default>
            <el-form :model="editData">
              <el-form-item label="文件名">
                <el-input v-model="editData.name" />
              </el-form-item>
              <el-form-item label="权限">
                <el-radio  v-model="editData.docAuth" :label=1>共享</el-radio>
                <el-radio  v-model="editData.docAuth" :label=0>个人</el-radio>
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showEditDialog = false">取消</el-button>
              <el-button type="primary" @click="submitEditData">确定</el-button>
            </div>
          </template>
        </el-dialog>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import tableAdd from "@/views/file/tableAdd";
import tableManage from "@/views/file/tableManage";
import likesDoc from "@/views/filedetail/likesDoc";
export default {
  components:{
    tableAdd:tableAdd,
    tableManage:tableManage,
    likesDoc:likesDoc
  },
  data() {
    return {
      showEditDialog: false,
      outerVisible: false,
      showAddDialog: false,
      activeName: 'second',
      // 编辑对话框中的数据
      editData: {
        index: 0,
        // docId: '',
        name: 'x',
        docAuth:1,
      },
      // 表格数据
      selfDocs: [
        {
          docId:1,
          name:'文献检索',
          size:4,
          auth:0
        },
        {
          docId:2,
          name:'Elasticsearch',
          size:5,
          auth:0
        },
      ],
      participateDocs:[
        {
          docId:1,
          name:'你有这么高速运转的机器进入中国，记住我给出的原理',
          size:4,
          auth:1
        },
        {
          docId:2,
          name:'xxx',
          size:5,
          auth:1
        },
      ],
      manageDocs:[
        {
          docId:1,
          name:'神经学',
          size:4,
          auth:1
        },
        {
          docId:2,
          name:'计算机安全',
          size:5,
          auth:1
        },
      ],
      showColl1:'1',
      showColl2:'2',
    }
  },
  mounted() {
    this.getDocsData()
    this.TabLocal()
  },
  methods: {
    TabLocal(){
      if(localStorage.getItem('Atab')!=null){
        this.activeName=localStorage.getItem('Atab')
      }
      if(localStorage.getItem('showColl1')!=null&&localStorage.getItem('showColl2')!=null){
        this.showColl2=localStorage.getItem('showColl2')
        this.showColl1=localStorage.getItem('showColl1')
      }

    },
    collapse1Change(val) {
      if (this.showColl2=='1') {
        this.showColl2 = '2'
        this.showColl1 = '1'
        this.getDocsData(3)
      }else{
        this.showColl2='1'
        this.showColl1='2'
        this.getDocsData(2)
      }
      localStorage.setItem('showColl1',this.showColl1)
      localStorage.setItem('showColl2',this.showColl2)
    },
    collapse2Change(val) {
      if (this.showColl1=='1') {
        this.showColl2 = '1'
        this.showColl1 = '2'
        this.getDocsData(2)
      }else{
        this.showColl2='2'
        this.showColl1='1'
        this.getDocsData(3)
      }
      localStorage.setItem('showColl1',this.showColl1)
      localStorage.setItem('showColl2',this.showColl2)
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      localStorage.setItem('Atab',tab.name)
    },
    // 获取表格数据
    getDocsData(type) {
      // 使用aioxs获取数据
      const userId = 3
      // const url = 'http://192.168.43.61:8081/doc/search/' + userId
      const url = 'http://localhost:8081/doc/search/' + userId
      if (type==1)
      {
        //self
        axios.get(url).then(res => {
          this.selfDocs = res.data.data.data
          console.log('成功' + this.selfDocs)
          console.log(this.selfDocs)
        }).catch(err => {
          console.log(err)
        })
      }else if(type==2){
        //participate
        axios.get(url).then(res => {
          this.participateDocs = res.data.data.data
          console.log('成功' + this.selfDocs)
          console.log(this.selfDocs)
        }).catch(err => {
          console.log(err)
        })
      }else if(type==3){
        //manage
        axios.get(url).then(res => {
          this.manageDocs = res.data.data.data
          console.log('成功' + this.selfDocs)
          console.log(this.selfDocs)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 使用axios从后端api添加一行数据 使用params传参
    // 在点完添加按钮后页面上方弹出
    addTableData(auth) {
      this.editData.name = ''
      this.editData.docAuth= auth
      this.outerVisible = true
    },
    // 使用axios从后端api删除一行
    handleDelete(index, row) {
      console.log(index, row)
      console.log(row)
      const userId = 3
      const docId = row.docId
      // const url = 'http://192.168.43.61:8081/doc/delete/' + userId + '/' + docId
      const url = 'http://localhost:8081/doc/delete/' + userId + '/' + docId
      axios.delete(url).then(res => {
        console.log('成功' + res.data.data)
        console.log(res.data.mes)
        this.getDocsData(1)
      }).catch(err => {
        console.log(err)
      })
      // 点击删除后 上方弹出提示框 提示删除成功
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 使用axios从后端api编辑一行数据 使用params传参,在点完编辑按钮后弹出窗口进行编辑
    handleEdit(index, row) {
      // 将当前行的数据绑定到表单控件中
      this.editData = {
        docId: row.docId,
        name: row.name,
        docAuth: row.auth
      }
      // 显示编辑对话框
      this.showEditDialog = true
    },
    // 提交表单数据
    submitEditData() {
      // 隐藏编辑对话框
      this.showEditDialog = false
      //  将编辑成功的数据使用aioxs的put方法发送params方法传参给后端 传参为docName,uesrId,docId docId为后端传回tableData中的docId并且是点击编辑按钮时传入的row.docId
      // const url = 'http://192.168.43.61:8081/doc/update'
      const url = 'http://localhost:8081/doc/update'
      const userId = 3
      // 获取点击编辑按钮时传入的row.docId
      console.log('edit')
      const docId = this.editData.docId
      axios.put(url, null, {
        params: {
          docName: this.editData.name,
          userId: userId,
          docAuth: this.editData.docAuth,
          docId: docId
        }
      }).then(res => {
        console.log('成功' + res.data.data)
        console.log(res.data.mes)
        this.getDocsData(1)
      }).catch(err => {
        console.log(err)
      })
    },
    FirstDialog() {
      this.showAddDialog = true
      this.editData.name = ''
      this.outerVisible = false
    },
    submitAddData() {
      // 更新tableData数组中的相应行
      // 隐藏编辑对话框
      this.showAddDialog = false
      //  将编辑成功的数据使用aioxs的put方法发送params方法传参给后端 传参为docName,uesrId,docId docId为后端传回tableData中的docId并且是点击编辑按钮时传入的row.docId
      // const url = 'http://192.168.43.61:8081/doc/add'
      const url = 'http://localhost:8081/doc/add'
      const userId = 3
      // 获取点击编辑按钮时传入的row.docId
      axios.post(url, null, {
        params: {
          docName: this.editData.name,
          docAuth:this.editData.docAuth,
          userId: userId
        }
      }).then(res => {
        console.log('成功' + res.data.data)
        console.log(res.data.mes)
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getDocsData(1)
      }).catch(err => {
        console.log(err)
      })
    },
    hrow(row, col, event) {
      if (col.align != 'is-right'&&col.label!='名称') {
        this.handleDetail('', row)
      }
    },
    // 点击详情按钮跳转到filedetail.vue页面
    handleDetail(index, row) {
      console.log(row)
      this.$router.push({
        path: '/filedetail/filedetail',
        query: {
          docId: row.docId,
          userId: 3,
          docName: row.name,
          docAuth:row.auth,
          docType:1
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
svg{
  vertical-align:middle;
}
.mydialog{
  width: 30%;
  height: 30%;
  overflow: scroll;
}
// 当鼠标移动到表格中的某一行时，才显示操作按钮
//.el-icon-arrow-down{
//  display: none;
//  padding-right: 30px;
//}
//.el-table__row:hover .el-icon-arrow-down{
//  display: inline-block;
//}
//::v-deep .el-collapse-item__header {
//  border: 2px;
//  border-color: #1e3482;
//  margin-left: 5px;
//  margin-bottom: 10px;
//}

::v-deep .el-collapse-item__arrow {
  margin: 4px 4px 4px 12px;
}
.collapse-title {
  display: flex;
  &-length {
    margin-left: 5px;
    margin-right: 14px;
  }
}
::v-deep .el-collapse-item__header {
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}
::v-deep .el-table{
  font-size: 18px;
  font-weight: bold;
}
@media screen and (max-width: 767px) {
  ::v-deep .el-dialog{
    width: 90%;
  }
}
</style>
