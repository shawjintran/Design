<template>
<!--Todo：小组页-->
  <div id="app">
    <el-row class="tac">
      <el-col :span="1">
        <div><p style="color:white;">.</p></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>文献共享</h2>
        <div class="content" style="color:white;">.</div>
        <el-row>
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="我的文献组" name="first">
              <el-card class="box-card" shadow="always">
                  <div slot="header" class="clearfix">
                    <span>我管理的文献组</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                  </div>
                </el-card>
<!--              <el-divider border-color="#ffffff" style="background-color:#ffffff"/>-->
              <van-divider></van-divider>
              <el-card class="box-card" shadow="always">
                  <div slot="header" class="clearfix" >
                    <span>我加入的文献组</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                  </div>

                </el-card>
              <van-divider></van-divider>
            </el-tab-pane>

            <el-tab-pane label="我的共享文件夹" name="second">
              <el-card class="box-card">
                <div slot="header" class="clearfix" shadow="always">
                  <span>我管理的共享文件夹</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>

              </el-card>
              <el-card class="box-card">
                <div slot="header" class="clearfix" shadow="always">
                  <span>我加入的共享文件夹</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>

              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-row>

        <!-- elementUI 表格 -->
        <!-- el-dialog嵌套对话框 点击"添加"按钮后弹出对话框提示“是否要新建文件夹”，点击确定后再弹出对话框对文件名进行编辑 -->
        <el-dialog
          title="新建文件夹"
          :visible.sync="outerVisible"
        >
          <template #default>
            <el-form>
              <span>本次创建文件夹需要花费10积分</span>
            </el-form>
          </template>
          <template #footer>
            <div slot="footer" class="dialog-footer">
              <el-button @click="outerVisible = false">取消</el-button>
              <el-button type="primary" @click="FirstDialog">确定</el-button>
            </div>
          </template>

        </el-dialog>

        <!-- 编辑对话框  custom-class="mydialog"-->
        <el-dialog
          title="添加文件夹"
          :visible.sync="showAddDialog"
        >
          <template #default>
            <el-form :model="editData">
              <el-form-item label="文件名">
                <el-input v-model="editData.name" />
              </el-form-item>
              <el-form-item label="共享">
                <el-input v-model="editData.auth" />
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
export default {
  name: "groupdetail",
  data() {
    return {
      activeName: 'first',
      manageGroup:[],
      joinGroup:[],
      manageDoc:[],
      joinDoc:[],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }

}
</script>

<style scoped>

</style>
