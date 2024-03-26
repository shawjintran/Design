<template>
  <el-row>
    <el-col :offset="4" :span="16":xs="{offset:0,span:34-10}">
      <el-row>
        <el-col>
          <el-card>
            <el-form>
              <el-row>
                <el-col :span="14" :xs="34-10">
                  <el-form-item label="文献集名">
                    <el-input v-model="editDoc.docName"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="userAuth==3">
                <el-form-item label="文献集权限">
                  <el-radio v-model="editDoc.docAuth" :label=1>共享</el-radio>
                  <el-radio v-model="editDoc.docAuth" :label=0>私有</el-radio>
                </el-form-item>
              </div>
              <el-form-item>
                <el-button plain size="small" @click="changeTable">返回文献集</el-button>
                <el-button plain size="small" type="primary" @click="modifyDocSubmit">保存更改</el-button>
              </el-form-item>
              <span v-if="docInfo.docType!=1&&editDoc.docAuth!=docInfo.docAuth" class="el-upload__tip">当 共享文献集 变为 个人文献集，所有用户都将删除，请注意</span>
            </el-form>
          </el-card>
          <van-divider style="opacity: 0"></van-divider>
          <el-card v-if="docInfo.docAuth!=0">

            <label>搜索用户</label>
            <br/><br/>
            <el-row>
              <el-col :span="14" :xs="34-10">
                <el-row>
                  <el-input v-model="addId" placeholder="请输入用户ID">
                    <el-button slot="append" @click="getUser(addId)" icon="el-icon-circle-plus-outline">搜索</el-button>
                  </el-input>
                </el-row>
                <el-row v-if="findUser.id!=undefined&&findUser.id!=null" style="padding-top: 10px">
                    <el-descriptions :column="3-1" size="medium" border>
                      <el-descriptions-item label="UID">{{findUser.id}}</el-descriptions-item>
                      <el-descriptions-item label="手机号">{{findUser.phone}}</el-descriptions-item>
                      <el-descriptions-item label="操作">
                        <el-button size="small" v-if="findUser.jointStatus==null" @click="addUser" type="primary" >添加</el-button>
                        <el-button size="small" v-else @click="addUser" type="danger" >删除</el-button>
                      </el-descriptions-item>
                    </el-descriptions>
                </el-row>
              </el-col>
            </el-row>


            <van-divider style="opacity: 0"></van-divider>
            <label>
              <span style="padding-right: 30px">管理用户</span>
              <span style="margin-right: 10px;font-size: 13px;color: #c1c8d2">已选 {{multipleSelection.length}} 条</span>
              <el-popover
                placement="top"
                width="100"
                v-model="showDelete">
                <p>确认删除</p>
                <div style="text-align: right;">
                  <el-button size="mini" type="text" @click="showDelete = false">取消</el-button>
                  <el-button type="danger" size="mini" @click="handleMultiDelete">确定</el-button>
                </div>
              <el-button :disabled="multipleSelection.length<1?true:false" slot="reference" size="mini" type="warning" plain >删除已选</el-button>
              </el-popover>
            </label>
            <el-table ref="table" :data="docUsers"
                      style="width: 100%;min-height: 300px"
                      max-height="500"
                      @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                :selectable="selectable"
                width="55"
              />
              <el-table-column prop="id" label="UID" show-overflow-tooltip min-width="65" sortable></el-table-column>
              <el-table-column prop="auth" label="权限" min-width="60">
                <template slot-scope="scope">
                  <el-tag size="small" v-if="scope.row.auth==1" type="info">用户</el-tag>
                  <el-tag size="small" v-if="scope.row.auth==2" >管理员</el-tag>
                  <el-tag size="small" v-if="scope.row.auth==3" type="danger">归属者</el-tag>
                </template>
              </el-table-column>
              <el-table-column  class-name="op" type="expand">
                <template slot-scope="props">
                  <el-card>
                    <el-col :span="15" :xs="34-10">
                      <el-form label-position="top" :model="editUser">

                        <el-form-item label="UID">
                          <el-input v-model="editUser.id" disabled>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="用户手机号">
                          <el-input v-model="editUser.phone" disabled>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="权限">
                          <el-select v-model="editUser.auth" >
                            <el-option
                              v-for="item in authOption"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>

                    </el-col>

                  </el-card>
                </template>
              </el-table-column>
              <el-table-column  label="操作" width="75" class-name="op" >
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" :disabled="scope.row.disable"  round v-if="scope.row.coll==false" icon="el-icon-edit" @click="expend(scope.row);modifyUser(scope.row)">
                  </el-button>
                  <el-button size="mini"  type="danger" :disabled="scope.row.disable"  icon="el-icon-check" round v-else  @click="expend(scope.row);modifyUserSubmit(editUser)" >
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-card>

        </el-col>
      </el-row>
    </el-col>

  </el-row>

</template>

<script>
export default {
  name: "modifyDoc",
  props:["docInfo","userAuth"],
  data() {
    return {
      docUsers: [{
        id:1,
        auth:1,
        phone:'13455',
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
          phone:'1454545',
          coll:false,
        },
        {
          id:2,
          auth:3,
          phone:'111111',
          coll:false,
        },{
          id:2,
          auth:3,
          phone:'111111',
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
      // edit
      addId:'',
      editUser: {
          id:0,
          phone:'',
          auth:0,
        },
      editDoc:{
        docId:0,
        docName:'',
        docAuth:0,
      },
      chooseUser:[],
      multipleSelection: [],
      showDelete:false,
      deleteUsers:[],
      findUser:{
      },
    }
  },
  mounted() {
    this.getUserAuth();
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleMultiDelete(){
      this.showDelete=false
      if(this.multipleSelection.length<1)
        return
      for(var i = 0; i < this.multipleSelection.length; i++) {
        this.deleteUsers.push(this.multipleSelection[i].id)
      }
    },
    selectable(row,index){
      if (row.auth>1)
        return false
      return true
    },
    changeTable(){
      console.log('change')
      this.$emit("changeTable",'showTable')
    },
    getUser(id){
      this.findUser={
        id:7,
        phone:'1839851880',
      }
    },
    addUser(id){
      this.findUser={}
    },
    modifyDocSubmit(){
      let doc
      if(this.userAuth!=3){
        doc={
          docId:this.editDoc.docId,
          docName:this.editDoc.docName,
        }
      }else {
        doc={
          docId:this.editDoc.docId,
          docName:this.editDoc.docName,
          docAuth:this.editDoc.docAuth,
        }
      }
    },
    getUserAuth(){
      console.log(this.docInfo.docAuth)
      this.editDoc.docId=this.docInfo.docId
      this.editDoc.docAuth=this.docInfo.docAuth
      this.editDoc.docName=this.docInfo.docName
      this.buttonJustify(this.userAuth)
    },
    buttonJustify(userAuth){
      this.docUsers.map((item) => {
        if (item.auth>=userAuth)
          item.disable=true
        item.coll=false
      })
    },
    modifyUser(user){
      this.editUser.id=user.id
      this.editUser.phone=user.phone
      this.editUser.auth=user.auth
    },
    modifyUserSubmit(mUser,uid){
      this.docUsers.map((item) => {
        if (mUser.id == item.id) {
          item.auth=mUser.auth
        }
      })
    },
    expend(row){
      let $table = this.$refs.table;
      this.docUsers.map((item) => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false)
          item.coll = false
        }
        else{
          item.coll = !item.coll
        }
      })
      $table.toggleRowExpansion(row);

    },
  }
}
</script>

<style lang="scss" scoped>

::v-deep .el-table__expand-column .cell {
  display: none;
}
::v-deep .el-table__expanded-cell{
  padding-left: 5px;
  padding-right: 5px;
}
</style>
