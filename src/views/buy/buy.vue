<template>
  <div>
    <div>
      <el-row>
        <!-- 页面主题内容 -->
        <el-col :offset="1" :span="22">
          <div style="margin-top: 10px;color: #9298a5" @click="goBack">
            <i class="el-icon-arrow-left" style="margin-right: 10px"></i>返回
          </div>
          <h2>积分购买</h2>
          <el-divider />
          <span>请点击商品进行购买</span>
          <div class="content" style="color:white;">.</div>
          <div v-for="(page, index) of pages" :key="index" >
            <el-col :span="6" :xs="24" v-for="(item, innerindex) of page" :key="item.bizId" style="align-items: center">
              <el-card :body-style="{ padding: '0px', height:'30%'}" shadow="hover" style="width: 90%;height: 90%;color: rgb(114 114 175); margin-bottom: 15px;background-color: rgb(232 242 255)"
              @click.native="handleRowClick(item.bizId)"
              >
                <div style="display:flex;justify-content: space-between;">
                  <div style="padding: 10px 10px;display: inline-block">
                    <div>
                      <div style="font-size: 20px; font-weight:bolder; margin: 10px 10px">套餐 {{innerindex+1}}</div>
                    </div>
                    <div style="font-size: 20px;font-weight:bolder; margin-left: 10px">
                      <i class="el-icon-coin"></i>
                      {{item.bizPoint}} 积分
                    </div>
                    <div style="font-size: 18px;font-weight:bold;margin-left: 10px">
                      <i class="el-icon-money"></i>
                      <span style="margin-left: 3px">
                      {{item.bizPrice}} 元
                    </span>
                    </div>
                  </div>
                  <div style="display:inline-block; height: 100%;width: 20%">
                    <van-icon name="new-o" color="rgb(255 21 21)" size="70px" style="position:relative;" />
<!--                    <i class="el-icon-s-flag" style="color: rgb(243 222 32);font-size: 40px;position:relative;right: -15px;top:10px"></i>-->
                  </div>
                </div>

              </el-card>
            </el-col>
          </div>
          <!-- 点击表格中的某一行，弹窗显示购买窗口 后端传回的图片流 弹窗显示后端传回的图片流并显示 -->
          <el-dialog
            title="支付订单"
            :visible.sync="orderVisible"
          >
            <template slot="title">
              <span>支付订单</span>
            </template>
            <template slot="default">
              <el-image :src="bizImg" style="max-width: 100%; height: 100%;min-width: 300px;min-height: 50px">
              </el-image>
            </template>
            <template slot="footer">
              <span slot="footer" class="dialog-footer">
                <el-button  @click="orderVisible = false">支 付 取 消</el-button>
              </span>
            </template>
          </el-dialog>
          <el-dialog
            title="创建订单"
            :visible.sync="dialogVisible">
            <template >
              <div>即将生成订单，请确认是否需要购买</div>
            </template>
            <template slot="footer">
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="generateOrder">确 定</el-button>
              </span>
            </template>
          </el-dialog>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import request from "@/utils/request";
export default {
  data() {
    return {
      bizList: [
        {
          bizId: '1',
          bizName: '套餐一',
          bizPoint: '100',
          bizPrice: '10',
        },
        {
          bizId: '2',
          bizName: '套餐二',
          bizPoint: '200',
         bizPrice: '20',
        }
      ],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      bizId: '',
      userId: '',
      bizImg: 'data:image/png;base64,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',
      dialogVisible: false,
      orderVisible: false,
      dialogImageUrl: ''
    }
  },
  computed: {
    pages() {
      const pages = []
      this.bizList.forEach((item, index) => {
        const page = Math.floor(index / 5)
        // 4代表4条为一行，随意更改
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  created() {
    this.getBizList()
  },
  methods: {
    goBack(){
      this.$router.back()
    },
    generateOrder() {
      this.userId = 3
      const url = 'http://192.168.43.61:8081/order/add'
      axios({
        method: 'post',
        url: url,
        params: {
          bizId: this.bizId,
          userId: this.userId
        }, responseType: 'blob'
      }
      ).then(response => {
        console.log(response)
        if (response.status === 200) {
          const imageUrl = window.URL.createObjectURL(new Blob([response.data]))
          // 将图片显示在页面上
          this.bizImg = imageUrl
          this.dialogVisible = false
          this.orderVisible = true
          this.$message.success('已生成订单，请尽快支付')
        } else {
          this.dialogVisible = false
          this.$message.error('生成订单失败，请联系工作人员')
        }
        // 处理后端返回的图片流
      }).catch(error => {
        console.error(error)
        this.$message.error('生成订单失败，请联系工作人员')
      })
      this.dialogVisible = false
      this.orderVisible = true
    },
    getBizList() {
      // /biz/list/{page}/{size}
      const page = this.currentPage
      const size = this.pageSize
      const url = 'http://192.168.43.61:8081/biz/list/' + page + '/' + size
      console.log(url)
      axios.get(url, {
        params: {
          page: page,
          size: size
        }
      }).then(res => {
        this.bizList = res.data.data.data
        this.total = res.data.data.total
        console.log(res.data.data)
      })
    },
    // 点击分页器中的每页显示数量，触发size-change事件，调用handleSizeChange()方法
    handleSizeChange(size) {
      this.pageSize = size
      this.getBizList()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getBizList()
    },
    // 点击表格中的某一行，弹窗显示 将bizId和userId传给后端，后端传回的图片流
    handleRowClick(bizId) {
      // 使用axios.post将bizId和userId传给后端，前端使用blob处理显示后端传回的图片流
      // url = 'http://192.168.43.61:8081/order/add'
      this.dialogVisible = true
      this.bizId = bizId
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog{
  width: 50%;
}

@media screen and (max-width: 767px) {
  ::v-deep .el-dialog{
    width: 90%;
    margin-bottom: 15px;
  }
}
</style>

