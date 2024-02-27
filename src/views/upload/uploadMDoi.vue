<template>
<div>
  <div style="font-weight: bolder">1.填写模板</div>
  下载&nbsp <el-link style="font-size: 15px;">Excel 模板</el-link><br>
  按照表格字段，填写对应的数据，最后保存<br>
  <div style="font-weight: bolder">2.选择分组文件夹</div>
  选择文件夹后，文献将上传到该文件夹中<br>
  <el-select v-model="docId" placeholder="请选择文件夹">
    <el-option
      v-for="item in docData"
      :key="item.docId"
      :label="item.name"
      :value="item.docId"
    />
  </el-select>
  <div style="font-weight: bolder;margin-bottom:3px">3.上传Excel文件</div>
  <el-upload
    ref="excel"
    action="http://localhost:8081/file/temp"
    accept=".xls,.xlsx"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-change="excelChange"
    :before-upload="excelBefore"
    :on-error="handleAvatarError"
    :on-success="handleAvatarSuccess"
    limit="1"
    :on-exceed="handleExceed"
    :file-list="excelFile"
    :auto-upload="false"
  >
    <!--                    <i class="el-icon-upload"></i>-->
    <!--                    <div class="el-upload__text">上传Excel文件</div>-->
    <el-button size="small" type="primary" plain>选择文献</el-button>
    <el-button size="small" type="warning" plain>上传解析</el-button>
    <div slot="tip" class="el-upload__tip">只上传Excel文件</div>
  </el-upload><br>
</div>
</template>

<script>
export default {
  name: "uploadMDoi",
  data(){
    return{
      childCom:'MPdf',
      excelFile:''
    }
  },
  methods:{

    excelChange(file, fileList){
      this.excelFile=fileList
    },
    excelBefore(file, fileList){
      return
    },
    excelRemove(file, fileList){
      this.excelFile=fileList
    }
  }
}
</script>

<style scoped>

</style>
