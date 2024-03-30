<template>
  <div>
    <div style="margin-bottom: 10px;display: flex; align-items: center">
      <span style="font-size:20px;font-weight: bolder;">最近已完成文献</span>
      <span style="margin-left: 20px">
        <el-button round size="small" @click="tosum()">查看全部</el-button>
      </span>
    </div>
    <!-- 表格显示最近上传文件 展示pdfTitle pdfTitle-->
    <el-table
      :data="files"
      style="width: 100%"
      v-if="this.$store.state.app.device==='mobile'"
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
        min-width="160"
        align="right"
      >
        <!-- 当状态为1时 表示为“已完成”，状态为0时，表示“分析中”，状态为2时，表示出现异常 -->
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.pdfStatus === 1"
            effect="light"
            type="success"
          >
            已完成
          </el-tag>
          <el-tag
            v-else
            effect="light"
            type="danger"
          >
            错误
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import sortfile from "@/api/sortfile";

export default {
  name: "uploadrecent",
  data() {
    return {
      files: [
        {
          pdfId: '1',
          pdfTitle: '慢性阻塞性肺疾病患者自我管理水平及影响因素研究',
          pdfStatus: 1,
        },{
          pdfId: '1',
          pdfTitle: '视频监控系统的设计视频监控系统的设计',
          pdfStatus: 1,
        },{
          pdfId: '1',
          pdfTitle: 'PDF内容提取系统设计与实现',
          pdfStatus: 1,
        },{
          pdfId: '1',
          pdfTitle: '基于Elasticsearch的知识库检索引擎系统设计与实现',
          pdfStatus: 1,
        },{
          pdfId: '1',
          pdfTitle: '自动著录技术在户籍档案数字化中的应用研究与实践',
          pdfStatus: 1,
        },
      ],
      userId: '3',
    }
  },
  mounted() {
    this.fetchSortFiles(this.userId, 1)
  },
  methods:{
    fetchSortFiles(userId, status) {
      sortfile.fetchById(userId, status).then(response => {
        if (response.code === 200) {
          const arr = JSON.parse(JSON.stringify(response.data))
          this.files = arr.data
        }
      })
    },
    tosum(){
      this.$emit('tosum',1)
    }
  }
}
</script>

<style scoped>

</style>
