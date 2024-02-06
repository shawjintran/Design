<template>
<!--Todo：小组页-->
  <div id="app">
    <el-row class="tac">
      <el-col :span="1">
        <div><p style="color:white;">.</p></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>文献归档</h2>
        <div class="content" style="color:white;">.</div>
        <el-button type="primary" plain @click="addTableData">添加文件夹</el-button>
        <!-- elementUI 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
          @row-click="hrow"
        >
          <el-table-column
            prop="name"
            label="文件夹名"
            width="100"
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
            label="文件夹大小"
            width="90"
          />
          <el-table-column
            prop="auth"
            align="center"
            label="共享权限"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag v-if ="scope.row.auth =='1'" type="danger" size="mini" effect="plain">
              </el-tag>
              <el-tag v-else type="info" size="mini" effect="plain">
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="right"
            padding-right="30"
            fixed="right"
          >
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
  name: "groupdetail"
}
</script>

<style scoped>

</style>
