<template>
  <el-row>
    <el-col>
      <el-row v-for="(likes, index) of pages " :key="index" :gutter="15" >
        <el-col :span="6" :xs="12" v-for="(like, innerindex) of likes" :key="like.pdfId" style="align-items: center">
          <el-card :body-style="{ padding: '0px'}" shadow="hover" style="border-color: #dfdfdf ;width: 100%;height: 100%; margin-bottom: 15px;"
                   @click.native="toDetail($event, like)"
          >
            <el-image :src="like.url" fit="contain" class="image" ></el-image>
            <div style="padding: 14px;">
              <span>{{like.pdfTitle}}</span>
              <div class="bottom clearfix">
                <span class="id">ID. {{like.pdfId}}</span>
                <el-button  v-if="like.isLike" type="text" class="button" @click="toggleLike(index*lineSize+innerindex,like)">取消收藏</el-button>
                <el-button  v-if="!like.isLike" type="text" class="button" @click="toggleLike(index*lineSize+innerindex,like)">收藏</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "likesDoc",
  computed: {
    pages() {
      const pages = []
      if(this.$store.state.app.device=='mobile')
        this.lineSize=2
      else
        this.lineSize=4
      this.likes.forEach((item, index) => {
        if (item.isLike==null)
        {
          console.log("add")
          item.isLike=true
        }
        const page = Math.floor(index / this.lineSize)
        // 4代表4条为一行，随意更改
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  data() {
    return {
      lineSize:4,
      likes: [
        {
          pdfId:0,
          pdfTitle:'汉堡',
          url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        },
        {
          pdfId:4,
          pdfTitle:'汉堡',
          url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        },{
          pdfId:1,
          pdfTitle:'汉堡',
          url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        },{
          pdfId:3,
          pdfTitle:'汉堡',
          url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        },{
          pdfId:5,
          pdfTitle:'汉堡',
          url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        },{
          pdfId:6,
          pdfTitle:'汉堡',
          url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        },{
          pdfId:14,
          pdfTitle:'汉堡',
          url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        },
      ],
    }
  },
  methods: {
    toDetail(event, like) {
      console.log(event)
      if (!event.target.matches('span')) { // 或者使用其他合适的 CSS 选择器定位按钮元素
        this.$router.push({
          name: 'pdf',
          params: {
            pdfId: like.pdfId,
            pdfTitle: like.pdfTitle
          }
        });
      }
    },
    toggleLike(index, item) {
      item.isLike = !item.isLike;
      this.$set(this.likes, index, Object.assign({}, item)); // 创建一个新的引用，使Vue能够跟踪到变化

      if (item.isLike) {
        this.$message({
          message: '收藏成功',
          type: 'success'
        });
      } else {
        this.$message({
          message: '取消收藏',
          type: 'error'
        });
      }
    },
  }
}
</script>

<style scoped>
.id {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
