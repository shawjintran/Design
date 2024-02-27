<template>
  <el-row>
    <el-row>
      <van-divider style="opacity: 0"></van-divider>
    </el-row>
    <el-row>
      <el-col>
        <el-timeline>
          <el-timeline-item timestamp="导入方式" placement="top">
            <div>
              <el-radio-group v-model="childCom">
                <el-radio-button  label="MPdf" >
                  <div style="text-align: left;line-height: 20px">
                    <div style="font-size: 17px;font-weight: bold">PDF文件导入</div>
                    <span style="font-size: 14px;color: #5a5e66">上传多个PDF文件</span>
                  </div>

                </el-radio-button>
                <el-radio-button  label="MDoi" >
                  <div style="text-align: left;line-height: 20px">
                    <div style="font-size: 17px;font-weight: bold">DOI导入</div>
                    <span style="font-size: 14px;color: #5a5e66">上传Excel文件</span>
                  </div>
                </el-radio-button>
              </el-radio-group>
            </div>
          </el-timeline-item>
          <el-timeline-item timestamp="导入步骤" placement="top">
            <el-row>
              <el-col :span="12" :xs="24">
                <keep-alive>
                 <component :is="childCom"></component>
                </keep-alive>
              </el-col>
            </el-row>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import uploadMPdf from "@/views/upload/uploadMPdf";
import uploadMDoi from "@/views/upload/uploadMDoi";
export default {
  name: "uploadMulti",
  components:{
    MPdf:uploadMPdf,
    MDoi:uploadMDoi
  },
  data(){
    return{
      childCom:'MPdf',
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
::v-deep.el-radio-button{
  margin-right: 15px;
  .el-radio-button__inner {//修改按钮样式
    width: 150px;
    flex-wrap: wrap;
    //height: 42px;
    background: #f6f6f6;
    color:#333;
    border-radius:4px;
    border:1px
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {// 修改按钮激活样式
    //color: #fff;
    background-color: #ececec;
    border-style: solid;
    border-color: #f63;
    box-shadow: -1px 0 0 0px rgba(255, 102, 51, 0);
  }
}
::v-deep .el-upload-dragger{
  width: 300px;
  border-color: #3a8ee6;
}
</style>
