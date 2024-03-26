<template>
  <el-row>
    <el-col style="max-height: 300px;overflow-y: scroll">
      <div v-for=" (xdoc,index) of tableData"  class="docDiv" @click="toDetail(xdoc)">
        <i class="el-icon-notebook-1 docIcon"></i>
        <div style="width: 100%;display: flex;justify-content: space-between;align-items: flex-end;">
          <div style="display: inline-block" class="docWord" >
            <span class="docName docName-wrap">{{xdoc.name}}</span>
            <div>
              <span class="docSize">ID.{{xdoc.docId}}&nbsp|&nbsp</span>
              <span class="docSize">共&nbsp{{xdoc.size}}&nbsp篇文档</span>
            </div>
          </div>
          <div style="display: inline-block;padding-left: 19px;width: 50px;" @click.stop>
            <div @click.stop>
              <el-dropdown trigger="click" placement="bottom-start"  @click.stop>
              <span style="width: 100%" >
                <i class="el-icon-arrow-down divOperate"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1" @click.native="handleEdit(xdoc)">编辑</el-dropdown-item>
                  <el-dropdown-item command="2" divided @click.native="handleDelete(xdoc)">删除</el-dropdown-item>
                  <el-dropdown-item command="3" divided @click.native="toDetail(xdoc)">详情</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-dialog
      title="编辑文件夹"
      :visible.sync="showEditDialog"
    >
      <template #default>
        <el-form :model="editDoc">
          <el-form-item label="文件名">
            <el-input v-model="editDoc.docName" />
          </el-form-item>
          <el-form-item label="权限" :disabled="true">
            <el-radio disabled v-model="editDoc.docAuth" :label=1>共享</el-radio>
            <el-radio disabled v-model="editDoc.docAuth" :label=0>私有</el-radio>
            <div class="el-upload__tip">请进入文献集页面,点击右上方进行更改权限</div>
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
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "tableManage",
  props:["docs"],
  mounted() {
    this.tableData=this.docs
  },
  data(){
    return{
      // 表格数据
      tableData: [
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
      showEditDialog:false,
      editDoc:{
        docName:'',
        docAuth:0,
      },
    }
  },
  methods:{
    getDocsData() {
      // 使用aioxs获取数据
      const userId = 3
      // const url = 'http://192.168.43.61:8081/doc/search/' + userId
      const url = 'http://localhost:8081/doc/search/' + userId
        //manage
      //type=3
      axios.get(url).then(res => {
        this.manageDocs = res.data.data.data
        console.log('成功' + this.selfDocs)
        console.log(this.selfDocs)
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(row){
      this.editDoc.docName=row.name
      this.editDoc.docAuth=row.auth
      this.showEditDialog=true
    },
    handleDelete(row){
      if(this.userAuth<3)
      {
        this.$message({
          message: '权限不够',
          type: 'error'
        })
        return
      }
      console.log(row)
      const userId = 3
      const docId = row.docId
      // const url = 'http://192.168.43.61:8081/doc/delete/' + userId + '/' + docId
      const url = 'http://localhost:8081/doc/delete/' + userId + '/' + docId
      axios.delete(url).then(res => {
        console.log('成功' + res.data.data)
        console.log(res.data.mes)
        this.getDocsData()
        // 点击删除后 上方弹出提示框 提示删除成功
        this.$message({
          message: 'mes',
          type: 'info'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      })

    },
    toDetail(row){
      console.log(row)
      this.$router.push({
        path: '/filedetail/filedetail',
        query: {
          docId: row.docId,
          docName: row.name,
          docAuth:row.auth,
          docType:3
        }
      })
    },
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
          docId: docId
        }
      }).then(res => {
        console.log('成功' + res.data.data)
        console.log(res.data.mes)
        this.getDocsData()
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
.docDiv{
  padding: 15px 5px;
  display: flex;
  justify-items: flex-start;
  align-items: center;
  border: 1px solid #eff2f5;
  border-right: none;
  border-left: none;
}
.docName{
  font-size: 18px;
  font-weight: bold;
}
.docName-wrap{
  display:inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 500px;
}
.docWord{
  padding-left: 15px;
  line-height: 20px;
}
.docSize{
  color:#5a5e66;
}
.docIcon{
 font-size: 35px;
  color: #0093D5;
  /*background-color: #3a8ee6;*/
  padding:5px;

}
::-webkit-scrollbar {
  display: none;
}
@media screen and (max-width: 767px) {
  .docName-wrap{
    max-width: 200px;
  }
  ::v-deep .el-dialog{
    width: 90%;
  }
}

</style>
