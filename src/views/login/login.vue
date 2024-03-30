<template>
  <el-container style="width: 100%; height: 100%;
   background-image:url('https://cdn.pixabay.com/photo/2023/12/01/22/00/floral-8424595_1280.png');
   background-position:center top;">

    <el-main class="container">
      <div>
        <el-row>
          <!--      <el-col :offset="16-1" :xs="{offset:6}">-->
          <!--        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 24 24" aria-labelledby="userIconTitle" stroke="#D3D3D3" stroke-width="0.24" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#D3D3D3">-->
          <!--          <path stroke-linecap="round" d="M5.5,19.5 C7.83333333,18.5 9.33333333,17.6666667 10,17 C11,16 8,16 8,11 C8,7.66666667 9.33333333,6 12,6 C14.6666667,6 16,7.66666667 16,11 C16,16 13,16 14,17 C14.6666667,17.6666667 16.1666667,18.5 18.5,19.5"/>-->
          <!--          <circle cx="12" cy="12" r="10"/> </svg>-->
          <!--      </el-col>-->
          <el-row>
            <van-divider style="opacity: 0"></van-divider>
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
      </div>
      <div class="login" >
        <el-row>
          <el-row>
            <van-divider style="opacity: 0"></van-divider>
          </el-row>
          <el-row>
            <el-col :xs={offset:1,span:33-11}>
              <van-tabs active="a" color="#c35c0f">
                <van-tab title="登 录" name="a">
                  <van-form @submit="handleLogin" ref='loginForm'>
                    <van-cell-group >
                      <van-divider style="opacity: 0"></van-divider>
                      <van-field
                        v-model="loginForm.userPhone"
                        name="phone"
                        type="tel"
                        left-icon="manager-o"
                        required
                        placeholder="手机号"
                        :rules="[{ required: true, message: '请正确填写手机号',validator:userPhoneValidate }]"
                        style="margin: 5px 5px 5px 0px;"
                      />
                      <van-divider style="opacity: 0"></van-divider>
                      <van-field
                        v-model="loginForm.passWord"
                        :type="passWordType"
                        name="password"
                        left-icon="label-o"
                        required
                        placeholder="密码"
                        :rules="[{ required: true, message: '用户密码最低6位',validator:passWordValidate}]"
                        style="margin: 5px 5px 5px 0px;"
                      >
                        <template slot="right-icon">
                          <span  @click="switchPasswordType">
                               <van-icon name="eye-o" v-if="passWordType=='password'"/>
                               <van-icon name="closed-eye" v-else />
                          </span>
                        </template>
                      </van-field>

                    </van-cell-group>
                    <span style="opacity: 0">.</span>
                    <el-checkbox v-model="checkbox">
                      我已阅读并同意
                      <el-button type="text"  @click="showDialog"> 服务协议 </el-button>
                    </el-checkbox>
                    <div style="margin: 16px;">
                      <van-button round block type="primary" native-type="submit" plain :loading="loading">
                        登 录
                      </van-button>
                    </div>
                  </van-form>
                </van-tab>
                <van-tab title="注 册 / 更 改 密 码" name="b">
                  <van-form @submit="handleRegister" ref="registerForm">
                    <van-divider style="opacity: 0"></van-divider>
                    <van-field
                      v-model="registerForm.userPhone"
                      name="phone"
                      type="tel"
                      label="手机号"
                      placeholder="请输入"
                      required
                      :rules="[{ required: true, message: '请正确填写手机号',validator:userPhoneValidate }]"
                      style="margin: 5px 5px 5px 0px;"
                    />
                    <van-divider style="opacity: 0"></van-divider>
                    <van-field
                      v-model="registerForm.code"
                      name="phone"
                      type="tel"
                      label="验证码"
                      required
                      placeholder="请输入"
                      :rules="[{ required: true,message: '请注意验证码格式',validator:codeValidate}]"
                      style="margin: 5px 5px 5px 0px;"
                    >
                      <template #button>
                        <van-button native-type="button" size="small" type="info" @click="sendCode">发送验证码</van-button>
                      </template>
                    </van-field>
                    <van-divider style="opacity: 0"></van-divider>
                    <van-field
                      v-model="registerForm.passWord"
                      :type="RpassWordType"
                      name="password"
                      required
                      label="密码 / 新密码"
                      placeholder="请输入"
                      :rules="[{ required: true, message: '用户密码最低6位',validator:passWordValidate}]"
                      style="margin: 5px 5px 5px 0px;"
                    >
                      <template slot="right-icon">
                          <span  @click="switchRPasswordType">
                               <van-icon name="eye-o" v-if="RpassWordType=='password'"/>
                               <van-icon name="closed-eye" v-else />
                          </span>
                      </template>
                    </van-field>
                    <div style="margin: 16px;">
                      <van-button round block plain type="warning" native-type="submit">注 册/更 改</van-button>
                    </div>
                  </van-form>
                </van-tab>
              </van-tabs>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </el-main>

<!--    <el-row>-->
<!--      <el-col :offset="1">-->
<!--        <h2>Welcome!-->
<!--        </h2>-->
<!--        <h4></h4>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-divider></el-divider>-->

    <van-dialog v-model="showService" @confirm="dialogClose" @close="dialogClose">
      <el-row>
        <el-col :offset="1" :span="33-11">
          <h1>服务协议</h1>
          欢迎使用！“xx服务”是由xx提供的互联网技术服务（包括但不限于文档、知识管理等）。
          <h2>一、协议的范围与确认</h2>
          1. 服务协议（以下简称“本协议”）由服务提供者与用户（以下简称“用户”或“您”)就服务等相关事项所订立的有效合约。您通过网络页面点击确认或以其他方式选择接受本协议的，即表示您与我们已达成本协议并同意接受本协议的全部约定内容。
          <h2>二、帐号的注册与安全</h2>
          1. 您在使用服务前需要注册一个帐号。您须对注册信息的真实性、合法性承担全部责任，并依法核验您的注册信息；
          <br/>2. 您有责任妥善保管帐号及密码信息的安全，且您需要对帐号的行为承担法律责任。因您的原因造成的账户、密码等信息被非法使用，由此引起的一切风险自行承担。
          <br/>3. 您在注册帐号中的昵称、头像、数据等必须遵守法律法规、公序良俗、社会公德，否则我们可能会取消您的账号。
        </el-col>
      </el-row>
    </van-dialog>
  </el-container>
</template>

<script>
import {Message, MessageBox} from "element-ui";

export default {
  name: "phone",
  data(){
    return{
      passWordType: 'password',//输入框类型
      RpassWordType: 'password',//输入框类型
      loginForm: {
        userPhone:"18398511880",
        passWord: "111111",
      },
      checkbox:false,
      registerForm:{
        userPhone:"",
        code:"",
        passWord: "",
      },
      showService:false,
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    switchPasswordType() {
      this.passWordType = this.passWordType == 'password' ? 'text' : 'password'
    },
    switchRPasswordType() {
      this.RpassWordType = this.RpassWordType == 'password' ? 'text' : 'password'
    },
    userPhoneValidate(val){
      let a=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(val);
      console.log(a)
      return a
    },
    passWordValidate(val){
      if(val.length<6)
        return false;
      return true;
    },
    codeValidate(val){
      if(val.length!=4)
        return false;
      return true;
    },
    handleLogin() {
      if (this.checkbox == false) {
        console.log("未选择")
        this.$message(
          {
            message:'请同意服务条款',
            type:"warning"
          })
        return;
      }
      this.$refs.loginForm.validate().then(() => {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({path: '/search/search'})
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
      }).catch(() => {
        console.log('error submit!!')
        return false
      })
    },
    sendCode(){
      console.log("验证码")
      this.$message({
        message:"【文献系统】您的验证码为"+"1111",
        type: "info"
      })
    },
    handleRegister(){
      this.$refs.registerForm.validate().then(() => {
        console.log("注册")
      }).catch(() => {
        console.log('error register')
        return false
      })
    },
    showDialog(){
      this.showService=true
    },
    dialogClose(){
      this.loginForm.checkbox=true
      this.showService=false
    },
  }
  }
</script>
<style scoped>

.container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 0px;
  overflow-x: hidden;
}
.login{
  border-radius: 40px 40px 0 0;
  height: 100%;
  background-color: #ffffff; opacity: 0.95;
  box-shadow: -10px -10px 10px -10px rgba(0,0,0,0.56),10px -10px 10px -10px rgba(0,0,0,0.56);
  margin-right: 30px;
  width: 55%;
  max-width: 685px;
}
@media screen and (max-width: 767px) {
  .login {
    width: 100%;
  }
  .container{
    flex-direction: column;
  }
}
</style>
