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
    >
      <div style="display:inline-block;float: left;width: 150px;text-overflow: ellipsis;overflow:hidden">{{ item.name }}</div>
      <span style="float: right; color: #8492a6; font-size: 13px;margin-left: 10px">ID {{ item.docId }}</span>
      <span style="float: right;">
          <el-tag type="success" size="small" v-if="item.auth==0">个人</el-tag>
          <el-tag type="danger" size="small" v-else>共享</el-tag>
        </span>
    </el-option>
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
    <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
    &nbsp
    <el-button size="small" type="warning" plain>上传解析</el-button>
    <div slot="tip" class="el-upload__tip">上传Excel文件后,请等待系统返回解析文件</div>
  </el-upload>
  <div v-if="excelResolve.length!=null&&excelResolve.length>0">
    <ul class="el-upload-list el-upload-list--text">
      <li v-for="f of excelResolve " :key="f.name" class="el-upload-list__item">
        <a class="el-upload-list__item-name">
          <i class="el-icon-document"></i>{{f.name}}
        </a>
        <label class="icon-label" @click="downloadExcel(f)">
          <i class="el-icon-download"></i>
        </label>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "uploadMDoi",
  data(){
    return{
      childCom:'MPdf',
      docData:[],
      excelFile:'',
      excelResolve:[
        {
          name: 'url.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
    }
  },
  methods:{
    downloadExcel(excel){

    },
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

<style lang="scss" scoped>
.icon-label{
  position: absolute;
  right: 5px;
  top: 0;
}
</style>
