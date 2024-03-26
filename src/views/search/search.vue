<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <el-row class="tac">
      <!-- 页面主题内容 -->
      <el-col :offset="1" :span="22">
        <h2>文献检索</h2>
        <br>
        <el-row>
          <el-col :span="14" :xs="13-1" >
            <el-input v-model="tempText" placeholder="请输入相关的搜索内容" />
          </el-col>
          <el-col :span="2" offset="1">
            <el-button type="primary" @keyup.enter="enterSearch()" @click="search()">搜索</el-button>
          </el-col>

          <el-col :span="2" :offset="1" :xs="{span:3-1,offset:3}" >
            <!--            Todo: 图片相似检索 -->


            <el-upload
              ref="picSearch"
              action="http://localhost:8081/file/temp"
              accept=".jpg,.png,.jpeg"
              :on-preview="handlePreview"
              :on-remove="picSRemove"
              :before-remove="beforeRemove"
              :on-change="picSChange"
              :before-upload="excelBefore"
              :on-error="handleAvatarError"
              :on-success="handleAvatarSuccess"
              :auto-upload="false"
            > <el-button slot="trigger" type="primary"  >图片检索</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="22">
            <span style="font-size:15px;color:#5a5e66;vertical-align: bottom;margin-right: 5px">检索范围 : </span>
            <el-radio-group v-model="searchRule" style="margin-top: 10px">
              <el-radio :label="1">个人</el-radio>
              <el-radio :label="2">共享</el-radio>
              <el-radio :label="3">所有</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-divider>
          <i class="el-icon-search"></i>
        </el-divider>
        <template v-if="searchData!=null && sType=='text'&&searchText!=null">
          <el-table :data="searchData" @row-click="handleRowClick" style="min-height: 550px">
            <el-table-column prop="title" label="标题" show-tooltip-when-overflow/>
            <el-table-column prop="pdfPages" label="页数" />
            <el-table-column prop="score" label="相关度" sortable />
            <el-table-column prop="createtime" show-tooltip-when-overflow label="上传时间" sortable />
            <el-table-column v-if="showId" label="" width="0" prop="pdfId" />
          </el-table>
          <!-- 分页 每页显示数量size和总数total从后端获取 然后将后端传回的数据分页显示在表格中 -->
          <el-pagination
            :current-page="currentPage"
            background
            layout="total,prev, pager, next"
            :total="this.total"
            :page-size="this.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="text-align: center"
          />
        </template>

        <template v-if="((searchData==null||searchText==null)&&(searchPhotos==null||searchPic==null))">
          <el-skeleton>
            <template slot="template">
              <div style="padding: 14px;">
                <el-skeleton-item variant="p" style="width: 100%" />
                <div v-for=" n in 8" :key="n" style="margin:20px">
                  <div style="display: flex; align-items: center;justify-content: space-between;">
                    <el-skeleton-item variant="text" class="item" />
                    <el-skeleton-item variant="text" class="item" />
                    <el-skeleton-item variant="text" class="item" />
                    <el-skeleton-item variant="text" class="item" />
                  </div>
                </div>
              </div>
            </template>
          </el-skeleton>
        </template>
        <div v-if="searchPic!=null&& sType=='pic'&&searchPhotos!=null">
          <el-row>
            <el-col>
              <div style="display: flex;flex-direction: column;align-items: center;">
                <div class="image-container">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="picUrl"
                  fit="contain"
                  :preview-src-list="[picUrl]">
                </el-image>
                  <i class="el-icon-delete detail-button "  @click="toDelete"></i>
                <div>上传的图片</div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-divider/>
          <el-row>
            <el-col :offset="3-1" :span="30-10" :xs="{offset:0,span:34-10}">
                <div v-for="(img,index) of searchPhotos" class="image-container">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="img.photoUrl"
                    fit="fill"
                    :preview-src-list="[img.photoUrl]">
                  </el-image>
                  <i class="el-icon-more detail-button "  @click="photoToPdf(img.pdfId,img.pdfTitle)"></i>
                </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
import 'element-ui/lib/theme-chalk/display.css'
export default {
  data() {
    return {
      tempText:null,
      searchText: null,
      searchData: [
        {
          title:'是你的点点滴滴对对对懂的都懂懂的都懂',
          pdfPages: '1,2',
          score: 0.86,
          createtime:'2002.08.14',
          pdfId:2

        }, {
          title:'是你的点点滴滴对对对懂的都懂懂的都懂',
          pdfPages: '1,2',
          score: 0.86,
          createtime:'2002.08.14',
          pdfId:2

        }
      ], // 表格数据
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示条数
      total: 10, // 总条数
      showId: false,
      searchRule:1,
      sType:'text',
      searchPic:null,
      picUrl:'',
      searchPhotos:[
        {
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },{
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },{
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },{
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },{
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },{
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },{
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },{
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },{
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },{
          pdfId:1,
          pdfTitle:'',
          photoUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
      ],
    }
  },
  created() {
    // this.search()
  },
  methods: {
    toDelete(){
      this.searchPic=null
      this.picUrl=null
      this.searchPhotos=null
      this.sType='text'
      this.searchText=null
      this.searchData=null
    },
    photoToPdf(pid,title){
      this.$router.push({
        name:"pdf",
        params: {
          pdfId:pid,
          pdfTitle:title
        }
      })
    },
    picSChange(val){
      this.searchPic=val.raw
      let reader = new FileReader()
      reader.readAsDataURL(val.raw)
      reader.onload = () => {
        console.log('结果显示')
        this.picUrl=reader.result
      }
      this.sType='pic'
    },
    picSRemove(val){

    },
    // 分页组件连接后端api

    // 表格行点击事件 并带参跳转到details.vue页面
    handleRowClick(row, col, event) {
      if (col.label=='标题')
        return
      this.$router.push({
        path:"/details/details",
        query: {
          title: row.title,
          pdfPages: row.pdfPages,
          score: row.score,
          createtime: row.createtime,
          pdfId: row.pdfId,
          searchString: this.searchText
        }
      })
      console.log('跳转到详情页')
    },

    // 搜索
    search() {
      // 调用后端API接口进行搜索
      this.sType='text'
      this.searchText=this.tempText
      const searchString = this.searchText
      const pageNo = this.currentPage
      const pageSize = this.pageSize
      const userId = 3
      const docId = 0
      const searchType = 1
      // const url = 'http://192.168.43.61:8081/search/' + searchString + '/' + pageNo + '/' + pageSize + '/' + userId + '/' + docId + '/' + searchType
      const url = 'http://localhost:8081/search/' + searchString + '/' + pageNo + '/' + pageSize + '/' + userId + '/' + docId + '/' + searchType

      axios.get(url, null).then(response => {
        // 处理搜索结果
        this.searchData = response.data.data.list
        this.total = response.data.data.count
        console.log(this.total)
        // 返回分页信息 total
        // this.total = 20
      }).catch(error => {
        // 处理错误
        console.log(error)
      })
      console.log('搜索' + this.searchText)
      console.log(url + 'url')
    },
    germinate(){
      const searchString = this.searchText
      // const url = 'http://192.168.43.61:8081/chatGpt/ask/' + searchString
      const url = 'http://localhost:8081/chatGpt/ask/' + searchString
      axios.get(url).then(response => {
        // 处理搜索结果
        this.searchText = response.data
        console.log(this.searchText)
        // 返回分页信息 total
      }).catch(error => {
        // 处理错误
        console.log(error)
      })
    },
    // 搜索框回车事件
    enterSearch() {
      this.search()
    },
    // 点击分页器中的每页显示数量，触发size-change事件，调用handleSizeChange()方法
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.search()
    },
    // 点击分页器中的页码，触发current-change事件，调用handleCurrentChange()方法
    handleCurrentChange(pageNo) {
      this.currentPage = pageNo
      this.search()
    }
  }

}

</script>
<style lang="scss" scoped>
.image-container {position: relative;display: inline-block; margin: 5px}
.detail-button {
  background-color: white;
  position: absolute;top: 10px;right: 10px;
}
::v-deep .el-upload-list{
  display: none;
}
.item{
  width: 20%;
  height: 20px
}
</style>
