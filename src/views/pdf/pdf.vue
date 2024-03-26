<template>
  <!-- 后端传入多张图片连接，用列表显示图片 -->
<!--  Todo：PDF下载-->
<!--  Todo：返回按钮-->
  <el-row>
    <el-col :offset="1" :span="22">
      <el-row>
        <div style="padding-top: 10px;width: 100%;display: flex;align-items: baseline;justify-content: space-between">
          <i class="el-icon-back" @click="goBack" style="font-size: 24px;"></i>
          <el-tooltip placement="top" >
            <div slot="content">{{this.pdf.pdfTitle}}</div>
            <span class="pdfname">
              &nbsp{{this.pdf.pdfTitle}}
            </span>
          </el-tooltip>
          <span>
            <i class="el-icon-star-off" v-if="pdf.isLike==false" @click="liking"  style="float:right;font-size: 20px;color: #97a8be"></i>
            <i class="el-icon-star-on" v-else  @click="notLike" style="float:right;font-size: 20px;color: #fae057"></i>
            <i class="el-icon-download" style="float:right;font-size: 20px;color: #97a8be"></i>
          </span>

        </div>
      </el-row>
      <el-row>

        <van-divider style="opacity: 0"></van-divider>
        <el-card>
          <el-empty v-if="imageList==null||imageList.length<1" description="暂无图像">
          </el-empty>
          <ul v-else>
            <li v-for="img in imageList" :key="img.imageId">
              <img class="demo-image" :src="img" alt="image">
            </li>
          </ul>
        </el-card>

      </el-row>
    </el-col>
  </el-row>


</template>

<script>
import axios from 'axios' // 引入axios
export default {
  data() {
    return {
      pdf:{
        pdfId:0,
        pdfTitle: '',
        isLike:false,
      },
      imageList: [],
    }
  },
  mounted() {
    // 接收details页面传输过来的参数
    this.userId = 3
    this.pdf.pdfId = this.$route.params.pdfId
    this.pdf.pdfTitle = this.$route.params.pdfTitle
    // 测试 浏览器控制台打印details页面传递过来的参数
    console.log('测试')
    console.log(this.pdf)
    // 页面加载时调用获取图片列表的方法
    this.getImageList()
  },
  methods: {
    goBack(){
      this.$router.back()
    },
    liking() {
      this.pdf.isLike=true

    },
    notLike() {
      this.pdf.isLike=false

    },
    // 通过axios获取图片列表
    getImageList() {
      const userId = 3
      const pdfId = this.pdf.pdfId
      // const pdfId = 3
      const url = 'http://localhost:8081/file/view2/' + userId + '/' + pdfId
      axios.get(url).then(res => {
        this.imageList = res.data.data
        console.log(res.data)
        console.log(this.imageList)
        console.log('成功')
      })
    }
  }
}
</script>

<style>
/* 去掉列表圆点 */
ul {
  list-style: none;
}
/* 设置图片大小 并居中显示 */
.demo-image {
  width: 75%;
  height: 100%;
  display: block;
  margin: 0 auto;
}
.pdfname{
  display: inline-block;
  max-width: 550px;
  font-size: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
