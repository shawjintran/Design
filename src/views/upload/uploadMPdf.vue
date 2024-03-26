<template>
  <div>
    <div style="font-weight: bolder;margin-bottom: 5px">1.文件命名</div>
    为PDF文件命名，格式为 标题-作者<br>
    示例:文献系统操作指南-xx<br>
    请不要包含其他 ‘-’ 字符，避免解析不准<br>
    <div style="font-weight: bolder;margin-top: 5px;margin-bottom: 5px">2.选择分组文件夹</div>
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
    <div style="font-weight: bolder;margin-top:5px;margin-bottom:5px">3.上传文件</div>
    <el-upload
      :disabled="docId==null||docId==''"
      ref="pdf"
      drag
      action="http://localhost:8081/file/temp"
      accept=".pdf"
      :on-preview="handlePreview"
      :on-remove="pdfRemove"
      :on-change="pdfChange"
      :before-remove="pdfBefore"
      :on-error="handleAvatarError"
      :on-success="handleAvatarSuccess"
      :on-exceed="handleExceed"
      :file-list="pdfFiles"
      multiple
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <!--                    <el-button size="small" type="warning" plain>上传解析</el-button>-->
      <div class="el-upload__text">{{(this.docId==null||this.docId=='')?'请先选择文件夹':'上传PDF文件'}}</div>
      <!--                <el-button size="small" type="primary" plain>选择文献</el-button>-->
<!--                      <div slot="tip" class="el-upload__tip">请先选择文件夹</div>-->
    </el-upload><br>
    <el-button v-if="pdfFiles!=null&&pdfFiles.length>0" size="small" type="primary" plain @click="showFile">导入到服务器</el-button>
  </div>
</template>

<script>
let id = 1
export default {
  name: "uploadMPdf",
  data(){
    return {
      pdfFiles: [],
      docId: '',
      docData: [
        {
          docId:1,
          name:'你有是的是的我会死的社死hi但圣诞节设计的',
          auth:1,
        },
        {
          docId:3,
          name:'你有是的是的',
          auth:0,
        },
      ],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const {level} = node;
          setTimeout(() => {
            const nodes = Array.from({length: level + 1})
            .map(item => ({
              value: ++id,
              label: `选项${id}`,
              leaf: level >= 2
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 1000);
        },
      }
    }
  },
  methods:{
    showFile(){
      console.log(this.pdfFiles)
    },
    pdfChange(file,fileList){
      this.pdfFiles=fileList
    },
    pdfRemove(file, fileList) {
      // fileList.push(file);
      this.pdfFiles=fileList
    },
    pdfBefore(file, fileList){
      return
    }
  }
}
</script>

<style scoped>

</style>
