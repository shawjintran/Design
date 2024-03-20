<template>
  <el-row>
    <el-col :offset="1" :span="22">
      <el-row>
        <div style="margin-top: 10px;color: #9298a5" @click="goBack">
          <i class="el-icon-arrow-left" style="margin-right: 10px"></i>返回
        </div>
        <h2>
          我的订单
          <el-popover>
            <template slot="reference">
              <i class="el-icon-question"></i>
            </template>
            <template slot="default">
              如有问题，请联系客服 1880
            </template>
          </el-popover>

        </h2>
        <el-divider />
      </el-row>
      <el-row>
        <div v-for="item of orderData" class="aBox" style="position: relative;">
          <div style="display: inline-block;">
            <span class="price">￥ {{item.price}}</span>
            <br>
            <br>
            <span class="time">{{item.creattime}}</span>
          </div>
          <span class="resource">
            + {{item.resource}} 积分
          </span>
          <el-divider/>
        </div>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "order",
  mounted() {
    this.getData()
  },
  data(){
    return {
      orderData:[
        {
          orderId:1,
          price:'50.00',
          creattime:'1998-01-01',
          resource:10
        },{
          orderId:1,
          price:'50.00',
          creattime:'1998-01-01',
          resource:10
        },
      ],
    }
  },
  methods:{
    goBack(){
      this.$router.back()
    },
    getData(){

    },
  }
}
</script>

<style lang="scss" scoped>

.resource {
  position: absolute;right: 10px;
  color:#56b317;
}
.price{
  color:#56b317
}
.time{
  color: #97a8be;
}
::v-deep .el-divider--horizontal{
  margin-top:15px ;
}
//.aBox:after{
//  background-color:blue;
//  float:left;
//  content:"";
//  display: block;
//  clear: both;
//}
</style>
