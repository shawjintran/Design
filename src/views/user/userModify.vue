<template>
  <el-row>
    <el-col :span="12" :xs="24">
      <el-row>
        <el-col :offset="3-1-1" :xs="{offset:0}">
          <el-card>
            <el-form label-position="top" v-if="option=='password'">
              <span style="padding-right: 10px" @click="toInfo" >
                <i class="el-icon-arrow-left"></i><span style="padding-left: 15px">返回</span>
              </span>
              <br>
              <br>
              <el-form-item label="手机号" required>
                <el-input style="max-width: 210px;padding-right: 10px" disabled v-model="userInfo.userPhone" ></el-input>
                <el-button @click="toPhone">
                  修改 <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-form-item>
              <el-form-item label="旧密码" required>
                <el-input style="max-width: 250px;padding-right: 10px"  v-model="oldPassword"></el-input>
              </el-form-item>
              <el-form-item label="新密码" required>
                <el-input style="max-width: 250px;padding-right: 10px"  v-model="newPassword"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button style="width: 100px" type="primary" plain>保存修改</el-button>
              </el-form-item>

            </el-form>
            <el-form  label-position="top" label-width="70px" v-if="option=='phone'">
              <span style="padding-right: 10px" @click="option='password'" v-if="option=='phone'">
            <i class="el-icon-arrow-left"></i><span style="padding-left: 30px">修改密码</span>
      </span>
              <br>
              <br>
              <div v-if="checkResult==false">
                <el-form-item label="旧手机号" required>
                  <el-input style="max-width: 200px;padding-right: 10px" disabled v-model="oldPhone">
                  </el-input>
                  <el-button @click="getCode(oldPhone);startCountdown()" :disabled="oldPhone==null||oldPhone==''||countdown > 0" >
                    {{ countdown > 0 ? `${countdown}秒后重试` : '获取' }}
                  </el-button>
                </el-form-item>
                <el-form-item label="验证码" required>
                  <el-input style="max-width: 175px;padding-right: 10px"  v-model="oCode">
                  </el-input>
                  <el-button @click="checkOCode();" :disabled="oCode==null||oCode==''||oCode.length<4" type="warning" plain>验证</el-button>
                </el-form-item>
              </div>
              <div v-if="checkResult==true">
                <el-form-item label="新手机号" required>
                  <el-input style="max-width: 200px;padding-right: 10px"  v-model="newPhone">
                  </el-input>
                  <el-button @click="getCode(newPhone);startCountdown()" :disabled="newPhone==null||newPhone==''||countdown > 0">
                    {{ countdown > 0 ? `${countdown}秒后重试` : '获取' }}
                  </el-button>
                </el-form-item>
                <el-form-item label="验证码" required>
                  <el-input style="max-width: 175px;padding-right: 10px"  v-model="nCode">
                  </el-input>
                  <el-button @click="checkNCode();" :disabled="nCode==null||nCode==''||nCode.length<4" type="error" plain>验证</el-button>
                </el-form-item>
              </div>

            </el-form>
          </el-card>

        </el-col>
      </el-row>

    </el-col>

  </el-row>
</template>

<script>
export default {
  name: "userModify",
  props:["userInfo"],
  data(){
    return {
      oldPassword:'',
      newPassword:'',
      option:'password',
      newPhone:'',
      oldPhone:'',
      checkResult:false,
      oCode:'',
      nCode:'',
      countdown:0,
    }
  },
  methods:{
    toInfo(){
      this.$emit('toInfo',false)
    },
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
    toPhone(){
      this.oldPhone=this.userInfo.userPhone
      this.option='phone'
    },
    checkOCode(){
      this.checkResult=true
      this.oCode=''
      this.countdown=0
    },
    checkNCode(){
      this.countdown=0
      this.nCode=''
      this.userInfo.userPhone=this.newPhone
      this.checkResult=false
      this.toInfo()

    },
  },
}
</script>

<style scoped>

</style>
