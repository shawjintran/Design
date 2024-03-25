<template>
  <div>
    <el-row >
      <!-- 页面主题内容 -->
      <el-col :offset="1" :span="22">
        <h2>文献进程</h2>
        <van-divider style="opacity: 0"></van-divider>
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName">
              <el-tab-pane label="我上传的文档" name="first">
                <el-card v-if="!showRatio()" >
                  <span> 范围 : </span>
                  <el-radio-group size="small" v-model="dataType">
                    <el-radio-button
                      :label="1"
                    >
                      我上传的
                    </el-radio-button>
                    <el-radio-button
                      :label="2"
                    >
                      他人上传
                    </el-radio-button>
                  </el-radio-group>
                </el-card>
                <el-table
                  :data="files"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="pdfTitle"
                    label="文献名"
                    min-width="160"
                    :show-overflow-tooltip="true"
                  />
                  <!-- 将状态栏靠在最后 -->
                  <el-table-column
                    prop="pdfStatus"
                    label="当前状态"
                    min-width="140"
                    sortable
                  >
                    <!-- 当状态为1时 表示为“已完成”，状态为0时，表示“分析中”，状态为2时，表示出现异常 -->
                    <template slot-scope="scope">
                      <el-tag
                        v-if="scope.row.pdfStatus === 1"
                        effect="light"
                        type="success"
                        size="mini"
                      >
                        已完成
                      </el-tag>
                      <el-tag
                        v-else-if="scope.row.pdfStatus === 0"
                        effect="light"
                        type="primary"
                        size="mini"
                      >
                        分析中
                      </el-tag>
                      <el-tag
                        v-else-if="scope.row.pdfStatus === 2"
                        effect="light"
                        type="danger"
                        size="mini"
                      >
                        系统异常
                      </el-tag>
                      <el-tag
                        v-else-if="scope.row.pdfStatus === 3"
                        effect="light"
                        type="warning"
                        size="mini"
                      >
                        审核中
                      </el-tag>
                      <el-tag
                        v-else-if="checkMessage[scope.row.pdfStatus]"
                        effect="light"
                        type="danger"
                        size="mini"
                      >
                        {{ checkMessage[scope.row.pdfStatus] }}
                      </el-tag>
                      <el-tag
                        v-else
                        effect="light"
                        type="info"
                        size="mini"
                      >
                        错误
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                  align="center">
                    <template slot="header" slot-scope="scope">
                      <el-radio-group v-if="showRatio()" size="medium" v-model="dataType">
                          <el-radio-button
                            :label="1"
                          >
                            我上传的
                          </el-radio-button>
                          <el-radio-button
                            :label="2"
                          >
                            他人上传
                          </el-radio-button>
                      </el-radio-group>
                    </template>
                    <template slot-scope="scope">
                      <el-button
                        v-if="checkMessage[scope.row.pdfStatus]||scope.row.pdfStatus===2"
                        type="text"
                        size="mini"
                      >
                        重传
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="他人上传" name="second">
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
<!--        <el-dialog-->
<!--          title="编辑文件夹"-->
<!--          :visible.sync="showEditDialog"-->
<!--        >-->
<!--          <template #default>-->
<!--            <el-form :model="editData">-->
<!--              <el-form-item label="文件名">-->
<!--                <el-input v-model="editData.name" />-->
<!--              </el-form-item>-->
<!--              <el-form-item label="权限">-->
<!--                <el-radio  v-model="editData.docAuth" :label=1>共享</el-radio>-->
<!--                <el-radio  v-model="editData.docAuth" :label=0>个人</el-radio>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </template>-->
<!--          <template #footer>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--              <el-button @click="showEditDialog = false">取消</el-button>-->
<!--              <el-button type="primary" @click="submitEditData">确定</el-button>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-dialog>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
export default {
  name: "sumfile",
  components: {ElSelectDropdown},
  data() {
    return{
      files: [
        {
          pdfId: '1',
          pdfTitle: '慢性阻塞性肺疾病患者自我管理水平及影响因素研究',
          pdfStatus: 1,
        },{
          pdfId: '1',
          pdfTitle: '视频监控系统的设计视频监控系统的设计',
          pdfStatus: 30,
        },{
          pdfId: '1',
          pdfTitle: 'PDF内容提取系统设计与实现',
          pdfStatus: 0,
        },{
          pdfId: '1',
          pdfTitle: '基于Elasticsearch的知识库检索引擎系统设计与实现',
          pdfStatus: 0,
        },{
          pdfId: '1',
          pdfTitle: '自动著录技术在户籍档案数字化中的应用研究与实践',
          pdfStatus: 3,
        },
      ],
      activeName:'first',
      dataType:1,
      checkMessage:{
        30:'审核异常：政治因素',
        31:'审核异常：血腥不适',
        32:'审核异常：涉及引流',
        33:'审核异常：',
        34:'审核异常：政治因素',
      }
    }
  },
  methods:{
    showRatio(){
      if (this.$store.state.app.device==='mobile')
        return false
      return true
    },
    getCheck(){
      // this.checkMessage
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
