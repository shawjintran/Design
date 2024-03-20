<template>
  <div id="app">
    <el-row class="tac">
      <!-- 页面主题内容 -->
      <el-col :offset="1" :span="22">
        <!-- <h2>详情</h2> -->
        <div class="content">
          <el-row>
            <el-col :span="24">
              <div>
                <!-- 在线查看PDF -->
                <br>
                <span style="padding-right: 10px;color: #9498a1" @click="goBack">
                  <i class="el-icon-arrow-left"> 返回 </i>
                </span>
                <br><br>
                <div>
                  <span style="font-size:35px;font-weight:bold">{{title}}</span>
                </div>
                <br>
                <!-- 点击按钮跳转到pdf.vue页面 -->
                <el-button type="primary" size="mini" @click="showPdfOL">在线查看</el-button>
                <!-- 收藏按钮 -->
<!--                <el-button type="success" size="mini" @click="handleCollect">收藏</el-button>-->
                <el-button type="success" size="mini" @click="handleCollect">下载</el-button>

                <!-- 下载PDF -->
                <!-- <el-link type="primary" :href="pdfLink" download target="_blank">
                  <h1>{{ title }}.PDF</h1>
                </el-link> -->
                <p>命中页数: {{ pdfPages }}</p>
                <p>相关度得分: {{ score }}</p>
                <p>创建时间: {{ createtime }}</p>
                <!-- el-分割线 -->
                <el-divider />
                <el-tabs v-model="activeType">
                  <el-tab-pane label="正文"  name="text">
                    <div v-for="(items,index) in details.text" :key="index">
                      <p>页数 {{ items.page }}</p>
                      <p>
                        <span v-html="highlightText(items.esvalue)" />
                      </p>
                      <el-divider />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="页眉"  name="header" v-if="details.header!=null&&details.header.length>0">
                    <div v-for="(items,index) in details.header" :key="index">
                      <p>页数为 {{ items.page }}</p>
                      <p>
                        <span v-html="highlightText(items.esvalue)" />
                      </p>
                      <el-divider />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="页脚"  name="footer" v-if="details.footer!=null&&details.footer.length>0">
                    <div v-for="(items,index) in details.footer" :key="index">
                      <p>页数为 {{ items.page }}</p>
                      <p>
                        <span v-html="highlightText(items.esvalue)" />
                      </p>
                      <el-divider />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="标题"  name="title" v-if="details.title!=null&&details.title.length>0">
                    <div v-for="(items,index) in details.title" :key="index">
                      <p>页数为 {{ items.page }}</p>
                      <p>
                        <span v-html="highlightText(items.esvalue)" />
                      </p>
                      <el-divider />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="公式"  name="equation" v-if="details.equation!=null&&details.equation.length>0">
                    <div v-for="(items,index) in details.equation" :key="index">
                      <p>页数为 {{ items.page }}</p>
                      <p>
                        <span v-html="highlightText(items.esvalue)" />
                      </p>
                      <el-divider />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="引用"  name="reference" v-if="details.reference!=null&&details.reference.length>0">
                    <div v-for="(items,index) in details.reference" :key="index">
                      <p>页数为 {{ items.page }}</p>
                      <p>
                        <span v-html="highlightText(items.esvalue)" />
                      </p>
                      <el-divider />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="表格"  name="table" v-if="details.table!=null&&details.table.length>0">
                    <div v-for="(items,index) in details.table" :key="index">
                      <p>页数为 {{ items.page }}</p>
                      <p>
                        <span v-html="highlightText(items.esvalue)" />
                      </p>
                      <el-divider />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="图像"  name="figure" v-if="details.figure!=null&&details.figure.length>0">
                    <div v-for="(items,index) in details.figure" :key="index">
                      <p>页数为 {{ items.page }}</p>
                      <p>
                        <span v-html="highlightText(items.esvalue)" />
                      </p>
                      <el-divider />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="其他"  name="other" v-if="details.other!=null&&details.other.length>0">
                    <div v-for="(items,index) in details.other" :key="index">
                      <p>页数为 {{ items.page }}</p>
                      <p>
                        <span v-html="highlightText(items.esvalue)" />
                      </p>
                      <el-divider />
                    </div>
                  </el-tab-pane>
                </el-tabs>
<!--                <div v-for="(items,index) in detaildata" :key="index">-->
<!--                  <p>页数为 {{ items.page }}</p>-->
<!--                  <el-text :style="{ color: textColor }">{{ items.estype }}</el-text>-->
<!--                  <p>-->
<!--                    <span v-html="highlightText(items.esvalue)" />-->
<!--                  </p>-->
<!--                  <el-divider />-->
<!--                </div>-->

                <!-- <el-link type="primary" @click="showPdf">{{ $route.query.row.listOne }}.pdf</el-link> -->
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
export default {
  data() {
    return {
      title: '',
      pdfPages: 0,
      score: 0,
      createtime: '',
      detaildata: [
        {
          page:1,
          estype:'图片',
          esvalue:'你有这么告诉运转的机器加入中国'
        },
        {
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },{
          page:1,
          estype:'图片',
          esvalue:'你有你是你的你的爹'
        },
      ], // 详情数据
      activeType:'text',
      details:{
        text:[
          {
            page:1,
            esvalue:'你有这么告诉运转的机器加入中国'
          },
        ],
        header:[],
        footer:[ ],
        title:[ ],
        figure:[],
        table:[],
        reference:[],
        equation:[],
        other:[],
      },
      textColor: '#409EFF',
      keyword: '你'// 高亮关键字
      // keyword: this.$route.query.searchString// 高亮关键字
      // pdfLink: 'http://example.com/myfile.pdf' // pdf下载链接
    }
  },
  mounted() {
    // 接收search页面传输过来的参数
    this.title = this.$route.query.title
    this.pdfPages = this.$route.query.pdfPages
    this.score = this.$route.query.score
    this.createtime = this.$route.query.createtime
    this.pdfId = this.$route.query.pdfId
    this.searchString = this.$route.query.searchString
    // 测试 浏览器控制台打印search.vue传递过来的参数
    console.log(this.$route.query.title)
    console.log(this.$route.query.pdfPages)
    console.log(this.$route.query.score)
    console.log(this.$route.query.createtime)
    console.log(this.$route.query.pdfId)
    console.log(this.$route.query.searchString)
    console.log('keyword:' + this.keyword)
    this.getDetail()
    this.highlightText()
    this.catalogType()
    /* this.$nextTick(() => {
      this.highlightText()
    }) */
  },

  methods: {
    // 使用axios从后端api获取详情数据
    goBack(){
      this.$router.back()
    },
    getDetail() {
      const pdfId = this.pdfId
      const searchString = this.searchString
      const url = 'http://192.168.43.61:8081/search/' + pdfId + '/' + searchString
      axios.get(url, {
        params: {
        }
      }).then((res) => {
        // 处理结果
        console.log(res)
        this.detaildata = res.data.data
      }).catch(error => {
        // 处理错误
        console.log(error)
      })
      console.log('url:' + url)
    },
    // 高亮显示
    highlightText(text) {
      const keyword = this.keyword
      const regex = new RegExp(keyword, 'g')
      const highlightedText = text.replace(regex, `<em style="color: red;background-color: yellow; font-weight: bold; font-style: normal;">${keyword}</em>`)
      return highlightedText
    },
    catalogType(){
      if(this.details.text==null||this.details.text.length<1)
        this.activeType='other'
    },
    // 在线查看PDF
    showPdf() {
      // const pdfId = this.pdfId
      const url = 'https://lkw-edu.oss-cn-chengdu.aliyuncs.com/%E5%9F%BA%E4%BA%8E%E7%98%A4%E5%91%A81_cm%E5%86%85ADC%E5%80%BC...%E6%B5%8B%E8%83%B6%E8%B4%A8%E7%98%A4%E6%9C%AF%E5%90%8E%E8%BF%9B%E5%B1%95%E7%9A%84%E4%B8%B4%E5%BA%8A%E4%BB%B7%E5%80%BC_%E7%A8%8B%E6%A2%A6%E9%9B%A8%20%281%29.pdf'
      window.open(url)
    },
    // 跳转到pdf.vue页面
    showPdfOL() {
      this.$router.push({
        name:"pdf",
        params: {
          pdfId: this.pdfId,
          searchString: this.searchString,
          pdfTitle:this.title
        }
      })
    },
    // 收藏 点击后上方弹出收藏成功
    handleCollect() {
      this.$message({
        message: '收藏成功',
        type: 'success'
      })
    }
  }
}
</script>
