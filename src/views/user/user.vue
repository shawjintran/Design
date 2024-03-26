<!-- 个人中心页面 展示用户头像,用户iduserId,手机号userPhone,用户积分userPoints -->
<template>
  <div id="app">
    <div>
      <el-row>
        <!-- 页面主题内容 -->
        <el-col :span="22" :offset="1">
          <h2>个人中心</h2>
          <el-divider />
          <van-divider style="opacity: 0"></van-divider>
          <!-- 个人信息 -->
          <div class="all">
            <div class="info">
              <el-row class="clock">
                <el-row >
                  <el-col :offset="1" :span="22" :xs="22">
                    <div style="display:flex;flex-direction: column;align-items: center;">
                      <div>
                        <el-avatar :size="100" style="font-size:40px" >
                          {{userInfo.userPhone.slice(-4)}}
                        </el-avatar>
                      </div>
                    </div>
                    <div style="display:flex;flex-direction: column;align-items: center;">
                      <div style="text-align: left;width: 100%">UID: {{ userInfo.userId }}</div><br>
                      <div style="text-align: left;width: 100%">手机号: {{ userInfo.userPhone }}</div><br>
                      <div style="text-align: left;width: 100%">积分: {{ userInfo.userPoints }}</div><br>
                      <!--<div class="user-points"> 容  量  : {{ userInfo.userCapacity }}</div>-->
                    </div>
                  </el-col>
                  <el-col :span="1" :xs="1">
                    <div class="zhan" style="height: 10px;">
                      <p style="opacity: 0">.</p>
                    </div>
                    <!-- 购买积分按钮 点击后跳转到购买页面buy.vue -->
                  </el-col>
                </el-row>
              </el-row>
              <el-divider/>
            </div>
            <div style="width: 100%">
              <el-row v-if="userUpdate==false">
                <el-row>
                  <el-button type="text" @click="userUpdate=true" class="text-button">
                    修改信息
                  </el-button>

                </el-row>
                <van-divider class="info-separate" />
                <el-row @click.native="order" >
                 <el-button type="text" class="text-button">
                   我的订单
                 </el-button>
                </el-row>
                <van-divider class="info-separate" />
<!--                <el-row @click.native="upload" >-->
<!--                 <el-button type="text" class="text-button">-->
<!--                   我的上传-->
<!--                 </el-button>-->
<!--                </el-row>-->
<!--                <van-divider class="info-separate" />-->
                <el-row>
                  <el-button type="text" class="text-button">
                    <router-link to="/buy/buy">套餐购买</router-link>
                  </el-button>
                </el-row>
                <van-divider class="info-separate" />
                <el-row>
                  <el-button  type="text" @click="showCancel=true;phone=userInfo.userPhone" class="text-button">
                    注销账号
                  </el-button>
                </el-row>
                <van-divider class="info-separate" />
                <el-row>
                  <el-button  type="text" @click="logout" class="text-button">
                    退出登录
                  </el-button>
                </el-row>
                <el-divider class="info-separate" />
              </el-row>
              <el-row v-if="userUpdate==true">
                <user-modify :user-info="userInfo" @toInfo="toInfo"></user-modify>
              </el-row>
            </div>
          </div>

        </el-col>
      </el-row>
      <el-dialog
        title="注销账号"
        :visible.sync="showCancel"
      center="true">
        <template >
          <el-form label-position="top"  label-width="80px">
            <br>
              <el-form-item label="旧手机号" required>
                <el-input style="max-width: 200px;padding-right: 10px" disabled v-model="phone">
                </el-input>
                <el-button @click="getCode(phone);startCountdown()" :disabled="phone==null||phone==''||countdown > 0" >
                  {{ countdown > 0 ? `${countdown}秒后重试` : '获取' }}
                </el-button>
              </el-form-item>
              <el-form-item label="验证码" required>
                <el-input style="max-width: 175px;padding-right: 10px"  v-model="code">
                </el-input>
              </el-form-item>
          </el-form>
        </template>
        <template slot="footer">
          <div style="display: flex;justify-content: space-around">
            <el-button @click="showCancel = false">取 消</el-button>
            <el-button type="primary" :disabled="code==null||code==''||code.length<4" @click="cancel">确 定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import userModify from "@/views/user/userModify";
export default {
  components:{
    userModify:userModify,
  },
  data() {
    return {
      userInfo: {
        userId: 1,
        userPhone: '2134',
        userPoints: '11',
      },
      avatarSize:100,
      userUpdate:false,
      showCancel:false,
      phone:'',
      code:null,
      countdown:0,
      // dialogVisible: false
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getCode(phone){
      console.log("验证码")
      this.$message({
        type:"warning",
        message:""+phone+" 用户，您的验证码为1111"
      })
    },
    startCountdown() {
      if (this.countdown > 0 ) {
        return; // 防止重复点击发送
      }
      this.countdown = 10;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    cancel(){
      this.logout()
    },
    order(){
      this.$router.push('/order/order')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 使用axios 连接后端api，获取用户信息 /user/echo/{userId}
    getUserInfo() {
      const userId = 3
      const url = 'http://localhost:8081/user/echo/' + userId
      axios.get(url).then(res => {
        this.userInfo = res.data.data
      })
    },
    toInfo(val){
      this.userUpdate=val
    },
    // 点击编辑资料按钮，可以跳出对话框，修改用户名，手机号
    editUserInfo() {
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.clock{
  /*background-color: #005dba;*/
  border-radius: 10px;
  padding: 30px 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.all{
  display: flex;
  flex-direction: row;
}
.info{
  margin-right: 30px;
  width: 20%;
}
.info-separate{
  border-color: #c4cacb;
  margin: 10px 0;
}
.text-button{
  color: #6891b8;
  font-size: 19px;
  font-weight: bold;
  margin-left: 15px;
}
::v-deep .el-dialog{
  width: 30%;
  margin-bottom: 15px;
}
@media screen and (max-width: 767px) {
  .info {
    width: 100%;
  }
  .all{
    flex-direction: column;
  }
  ::v-deep .el-dialog{
      width: 90%;
      margin-bottom: 15px;
  }
}

</style>
