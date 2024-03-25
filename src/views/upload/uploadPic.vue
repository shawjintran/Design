<template>
  <el-row>
    <el-col>
      <el-row>
        <el-upload
          ref="pic"
          action="http://localhost:8081/file/temp"
          accept=".jpg,.png,jpeg"
          :on-preview="handlePreview"
          :on-remove="picRemove"
          :before-remove="beforeRemove"
          :on-change="picChange"
          :before-upload="excelBefore"
          :on-error="handleAvatarError"
          :on-success="handleAvatarSuccess"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary" plain>上传图片</el-button>&nbsp&nbsp
          <el-button size="small" type="info" style="vertical-align: bottom" plain @click="showTakePhoto ">
            <i class="el-icon-camera" />&nbsp拍照
          </el-button>
          <el-button size="small" type="warning" :disabled="picData==null||picData.length<1" plain @click="submitPicUpload">保存添加</el-button>
        </el-upload>
        <br>
        <br>
      </el-row>
      <el-row v-if="picUrl!=null&&picUrl.length>0">
        <div>
          <div v-for="(img,index) of picUrl" class="image-container">
            <el-image
              style="width: 100px; height: 100px"
              :src="img"
              fit="contain"
              :preview-src-list="[img]">
            </el-image>
            <i class="el-icon-delete delete-button "  @click="deleteImage(index)"></i>
          </div>
        </div>
      </el-row>

    </el-col>
    <!--                      强制渲染-->
    <el-dialog ref="takeDialog" :visible.sync="isTake" title="拍照"
               @hook:mounted="$refs.takeDialog.rendered = true"
               @close="closeT">
      <takephoto ref="takePhoto" @getPhotoUrl="getPhotoUrl" @getPhoto="getPhoto"></takephoto>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeT">关闭</el-button>
      </div>
    </el-dialog>
  </el-row>

</template>

<script>
import takephoto from "@/views/photo/takephoto";

export default {
  name: "uploadPic",
  components:{
    takephoto:takephoto
  },
  data(){
    return{
      picUrl:[],
      picData:[],
      isTake:false,
    }
  },
  methods:{
    picRemove(val){
      console.log('Delete')
      console.log(val)
    },
    picChange(val){
      console.log('Add')
      console.log(val.raw)
      this.picData.push(val.raw)
      let reader = new FileReader()
      reader.readAsDataURL(val.raw)
      reader.onload = () => {
        console.log('结果显示')
        this.picUrl.push(reader.result)
      }
    },
    getPhotoUrl(arr){
      arr.map(url =>{
        this.picUrl.push(url);
      })
    },
    getPhoto(arr){
      arr.map(pic =>{
        this.picData.push(pic);
      })
    },
    deleteImage(index){
      this.picUrl.splice(index,1)
      this.picData.splice(index,1)
    },
    closeT(){
      // this.$EventBus.$emit("close",'1')
      this.isTake = false
      this.$refs.takePhoto.stopNavigator()

    },
    showTakePhoto(){
      this.isTake=true;
      this.$refs.takePhoto.getCompetence()
    },
    submitPicUpload(){

    },
  }
}
</script>

<style lang="scss" scoped>
.image-container {position: relative;display: inline-block;}
.delete-button {
  background-color: white;
  position: absolute;top: 10px;right: 10px;
}
::v-deep .el-upload-list{
  display: none;
}
::v-deep .el-dialog{
  margin-bottom: 30px;
}
@media screen and (max-width: 767px) {
  ::v-deep .el-dialog{
    width: 95%;
    margin-bottom: 15px;
  }
}
</style>
