<!-- 个人中心页面 展示用户头像,用户iduserId,手机号userPhone,用户积分userPoints -->
<template>
  <div id="app">
    <div>
      <el-row>
        <el-col :span="1">
          <div><p style="color:white;">.</p></div>
        </el-col>
        <!-- 页面主题内容 -->
        <el-col :span="22">
          <h2>个人中心</h2>
          <el-divider />
          <!-- 个人信息 -->
          <div class="all">
            <div class="info">
              <el-row class="clock">
                <el-row >
                  <el-col :span="1" :xs="1"><div><p style="color:white;">.</p></div></el-col>
                  <el-col :span="22" :xs="22">
                    <div style="display:flex;flex-direction: column;align-items: center;">
                      <el-avatar :size="100" :src="require('@/icons/svg/logo.png')" />
                    </div>
                    <div style="display:flex;flex-direction: column;align-items: center;">
                      <div style="text-align: left;width: 100%">用户名: {{ userInfo.userName }}</div><br>
                      <div style="text-align: left;width: 100%">手机号: {{ userInfo.userPhone }}</div><br>
                      <div style="text-align: left;width: 100%">积分: {{ userInfo.userPoints }}</div><br>
                      <!--<div class="user-points"> 容  量  : {{ userInfo.userCapacity }}</div>-->
                    </div>
                  </el-col>
                  <el-col :span="1" :xs="1">
                    <div class="zhan" style="height: 10px;"><p style="color:white;">.</p></div>
                    <!-- 购买积分按钮 点击后跳转到购买页面buy.vue -->
                  </el-col>
                </el-row>
              </el-row>
              <el-divider/>
            </div>
            <div style="width: 100%">
              <el-row>
                编辑信息
              </el-row>
              <el-divider />
              <el-row>
                我的小组
              </el-row>
              <el-divider />
              <el-row>
                <el-button type="text">
                  <router-link to="/buy/buy">购买积分</router-link>
                </el-button>
              </el-row>
              <el-divider />
              <el-row>
                <el-button  type="text">
                  <router-link to="/lphone">退出登录</router-link>
                </el-button>
              </el-row>
              <el-divider />
            </div>
          </div>


        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userInfo: {
        userName: '',
        userId: '',
        userPhone: '',
        userPoints: '',
      },
      avatarSize:100
      // dialogVisible: false
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 使用axios 连接后端api，获取用户信息 /user/echo/{userId}
    getUserInfo() {
      const userId = 3
      const url = 'http://localhost:8081/user/echo/' + userId
      axios.get(url).then(res => {
        this.userInfo = res.data.data
      })
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
<style>
.clock{
  /*background-color: #005dba;*/
  border-radius: 10px;
  padding: 10px;
  padding-top: 30px;
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
@media screen and (max-width: 767px) {
  .info {
    width: 100%;
  }
  .all{
    flex-direction: column;
  }
}

</style>
