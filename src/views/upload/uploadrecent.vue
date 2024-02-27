<template>
  <div>
    <div style="font-size:20px;font-weight: bolder;margin-bottom: 10px">最近上传文献</div>
    <!-- 表格显示最近上传文件 展示pdfTitle pdfTitle-->
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
            v-else-if="scope.row.pdfStatus === 0"
            effect="light"
            type="warning"
          >
            分析中
          </el-tag>
          <el-tag
            v-else-if="scope.row.pdfStatus === 2"
            effect="light"
            type="danger"
          >
            异常
          </el-tag>
          <el-tag
            v-else-if="scope.row.pdfStatus === 3"
            effect="light"
            type="warning"
          >
            审核中
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "uploadrecent"
}
</script>

<style scoped>

</style>
