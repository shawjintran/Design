<template>
  <el-container style="width: 100%; height: 100%; background-image:url('https://cdn.pixabay.com/photo/2023/12/01/22/00/floral-8424595_1280.png');
   background-position:center top;">
    <el-row >
      <!--      <el-col :offset="16-1" :xs="{offset:6}">-->
      <!--        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 24 24" aria-labelledby="userIconTitle" stroke="#D3D3D3" stroke-width="0.24" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#D3D3D3">-->
      <!--          <path stroke-linecap="round" d="M5.5,19.5 C7.83333333,18.5 9.33333333,17.6666667 10,17 C11,16 8,16 8,11 C8,7.66666667 9.33333333,6 12,6 C14.6666667,6 16,7.66666667 16,11 C16,16 13,16 14,17 C14.6666667,17.6666667 16.1666667,18.5 18.5,19.5"/>-->
      <!--          <circle cx="12" cy="12" r="10"/> </svg>-->
      <!--      </el-col>-->
      <el-row>
        <van-divider style="opacity: 0"></van-divider>
        <van-divider style="opacity: 0"></van-divider>
      </el-row>
      <el-row>
        <el-col style="margin-top: 30px">
          <el-image
            :src="require('@/assets/document.png')">
          </el-image>
        </el-col>
      </el-row>
      <el-row>
        <van-divider style="opacity: 0"></van-divider>
        <van-divider style="opacity: 0"></van-divider>
        <van-divider style="opacity: 0"></van-divider>
      </el-row>
    </el-row>
    <el-main style="border-radius: 40px 40px 0 0;width: 100%; height: 100%; background-color: #ffffff; opacity: 0.9;box-shadow: -10px -10px 10px -10px rgba(0,0,0,0.56),10px -10px 10px -10px rgba(0,0,0,0.56)">
      <el-row>
        <el-row>
        </el-row>
        <el-row>
          <el-col :xs={offset:1,span:33-11}>
            <van-tabs active="a">
              <van-tab title="登 录" name="a">
                <van-form @submit="onLogin">
                  <van-cell-group >
                    <van-divider style="opacity: 0"></van-divider>
                    <van-field
                      v-model="loginForm.userPhone"
                      name="phone"
                      type="tel"
                      left-icon="manager-o"
                      required
                      placeholder="手机号"
                      :rules="[{ required: true, message: '请填写用户名' }]"
                      style="margin: 5px 5px 5px 0px;"
                    />
                    <van-divider style="opacity: 0"></van-divider>
                    <van-field
                      v-model="loginForm.passWord"
                      type="password"
                      name="password"
                      left-icon="label-o"
                      required
                      placeholder="密码"
                      :rules="[{ required: true, message: '请填写密码' }]"
                      style="margin: 5px 5px 5px 0px;"
                    />
                  </van-cell-group>
                  <el-checkbox v-model="loginForm.checkbox">我已阅读并同意
                    <el-button type="text" href="https://www.yuque.com/terms" target="_blank"> 服务协议 </el-button>
                    和
                    <el-button type="text" href="https://app.nlark.com/mobile-app/pages/privacy-policy.html" target="_blank"> 隐私权政策 </el-button>
                  </el-checkbox>
<!--                  <van-divider style="opacity: 0"></van-divider>-->
                  <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit" plain>
                      登 录
                    </van-button>
                  </div>

                </van-form>
              </van-tab>
              <van-tab title="注 册 / 更 改 密 码" name="b">
                <van-form @submit="onSubmit">
                  <van-divider style="opacity: 0"></van-divider>
                  <van-field
                    v-model="loginForm.userPhone"
                    name="phone"
                    type="tel"
                    label="手机号"
                    placeholder="请输入"
                    required
                    :rules="[{ required: true }]"
                    style="margin: 5px 5px 5px 0px;"
                  />
                  <van-divider style="opacity: 0"></van-divider>
                  <van-field
                    v-model="loginForm.userPhone"
                    name="phone"
                    type="tel"
                    label="验证码"
                    required
                    placeholder="请输入"
                    :rules="[{ required: true}]"
                    style="margin: 5px 5px 5px 0px;"
                  >
                    <template #button>
                    <van-button size="small" type="info">发送验证码</van-button>
                    </template>
                  </van-field>
                  <van-divider style="opacity: 0"></van-divider>
                  <van-field
                    v-model="loginForm.passWord"
                    type="password"
                    name="password"
                    required
                    label="密码 / 新密码"
                    placeholder="请输入"
                    :rules="[{ required: true }]"
                    style="margin: 5px 5px 5px 0px;"
                  />
                  <div style="margin: 16px;">
                    <van-button round block plain type="warning" native-type="submit">确 定</van-button>
                  </div>
                </van-form>
              </van-tab>
            </van-tabs>
          </el-col>
        </el-row>
      </el-row>
    </el-main>

<!--    <el-row>-->
<!--      <el-col :offset="1">-->
<!--        <h2>Welcome!-->
<!--        </h2>-->
<!--        <h4></h4>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-divider></el-divider>-->

<!--    <el-footer style="background-color: #ffffff">-->

<!--    </el-footer>-->
  </el-container>
</template>

<script>
export default {
  name: "phone",
  data(){
    return{
      loginForm: {
        userPhone:"",
        passWord: "",
        checkbox:"",
      },
      registerForm:{
        userPhone:"",
        code:"",
        passWord: "",
      },

      loginRules: {
        userPhone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    }
  },
  methods: {
    submitForm() {
      const userAccount = this.loginForm.account;
      const userPassword = this.loginForm.passWord;
      if (!userAccount) {
        return this.$message({
          type: "error",
          message: "账号不能为空！",
        });
      }
      if (!userPassword) {
        return this.$message({
          type: "error",
          message: "密码不能为空！",
        });
      }
      console.log("用户输入的账号为：", userAccount);
      console.log("用户输入的密码为：", userPassword);

    },
  }
  }
</script>

<style scoped>
. {
  border-radius: 15px;
  width: 100%;
  height: 100%;
  background-color: #20a0ff;
}
.login {
  width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  background-position: left top;
  background-color: #242645;
  color: #fff;
  position: relative;
}

.mylogin {
  width: 240px;
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: linear-gradient(
    230deg,
    rgba(53, 57, 74, 0) 0%,
    rgb(0, 0, 0) 100%
  );
}

.inps input {
  border: none;
  color: #fff;
  background-color: transparent;
  font-size: 12px;
}

.submitBtn {
  background-color: transparent;
  color: #39f;
  width: 200px;
}
</style>
