<template>
  <div class="camera_outer" >

    <el-row id="cam">
      <el-col style="display:flex;justify-content: center">
        <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
        <canvas id="canvasCamera" style="display: none" :width="videoWidth" :height="videoHeight"></canvas>
      </el-col>
    </el-row>
    <van-divider style="opacity: 0"></van-divider>
    <el-row v-if="imgSrcs!=null&&imgSrcs.length>0">
      <div>
        <div v-for="(img,index) of imgSrcs" class="image-container">
          <el-image
                    style="width: 100px; height: 100px"
                    :src="img"
                    fit="contain"
                    :preview-src-list="[img]">
          </el-image>
          <i class="el-icon-delete delete-button "  @click="deleteImage(index)"></i>
        </div>

      </div>
    </el-row>


    <div id="btn">
    <el-row>
      <el-col :span="7" :offset="3">
        <el-button @click="getCompetence()" size="small">打开相机</el-button>
      </el-col>
      <el-col :span="7" >
        <el-button type="primary" @click="setImage()" size="small">拍摄</el-button>
      </el-col >
      <el-col :span="7" >
          <el-button type="primary" size="small" @click="pickPhoto">选取</el-button>
      </el-col>
    </el-row>
  </div>
  </div>
</template>
<script>
import store from '@/store'
// import { uploadImg } from '@/api/visitinfo'
export default {
  mounted() {
    // this.$EventBus.$on("close", (data) => {
    //   console.log(data)
    //   if (data==='1')
    //     this.stopNavigator()
    // });
  },
  beforeDestroy() {
    // this.$EventBus.$off("close")
  },
  data() {
    return {
      filelist:[],
      videoWidth: 300,
      videoHeight: 300,
      imgSrcs:[],
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      isShow:false,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token
      },
      docData:[],
      form:{
        author:'',
        docId:'',
        name:'',
      }
    }
  },

  destroyed() {
    this.stopNavigator()
  },
  methods: {
    pickPhoto(){
      this.$emit('getPhotoUrl', this.imgSrcs)
      this.$emit('getPhoto', this.filelist)
      // console.log(this.imgSrcs)
    },
    deleteImage(index){
      this.imgSrcs.splice(index,1)
      this.filelist.splice(index,1)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      this.$emit('refreshDataList', res.data.url)
    },
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this
      console.log(_this.thisVideo)
      this.thisCancas = document.getElementById('canvasCamera')
      this.thisContext = this.thisCancas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')
      console.log(this.thisVideo)
      console.log(_this.thisVideo)
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          console.log('undefined')
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      console.log(_this.thisVideo)
      console.log(this.thisVideo)
      console.log(this)
      console.log('--')
      var constraints = {
        audio: false,
        video: { width: this.videoWidth, height: this.videoHeight,facingMode: "user" } }
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        // 旧的浏览器可能没有srcObject
        console.log(_this.thisVideo)
        console.log(this)
        if ('srcObject' in _this.thisVideo) {
          _this.thisVideo.srcObject = stream
          console.log(1)
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          _this.thisVideo.src = window.URL.createObjectURL(stream)
        }
        _this.thisVideo.onloadedmetadata = function (e) {
          _this.thisVideo.play()
        }
      }).catch(err => {
        console.log(err)
        alert(err)
      })
    },
    //  绘制图片（拍照功能）
    setImage() {
      // console.log(this.thisContext)
      // this.thisContext.transform(-1)
      this.thisContext.drawImage(this.thisVideo, 0, 0, this.videoWidth, this.videoHeight)
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL('image/png')
      this.imgSrcs.push(image)
      const file = image
      const time = (new Date()).valueOf()
      const name = time
      const pic = this.base64ToFile(file, name)
      this.filelist.push(pic)
      console.log(pic)
      // uploadImg(data).then(res => {
      //   if (res.data.code == 0) {
      //     this.$emit('refreshDataList', res.data.data.url)
      //   }
      // })
    },
    // base64图片转file的方法（base64图片, 设置生成file的文件名）
    base64ToFile(file, fileName) {
      // 将file按照 , 进行分割 将前缀  与后续内容分隔开
      const data = file.split(',')
      // 利用正则表达式 从前缀中获取图片的类型信息（image/png、image/jpeg、image/webp等）
      const type = data[0].match(/:(.*?);/)[1]
      // 从图片的类型信息中 获取具体的文件格式后缀（png、jpeg、webp）
      const suffix = type.split('/')[1]
      // 使用atob()对file数据进行解码  结果是一个文件数据流 以字符串的格式输出
      const bstr = window.atob(data[1])
      // 获取解码结果字符串的长度
      let n = bstr.length
      // 根据解码结果字符串的长度创建一个等长的整形数字数组
      // 但在创建时 所有元素初始值都为 0
      const u8arr = new Uint8Array(n)
      // 将整形数组的每个元素填充为解码结果字符串对应位置字符的UTF-16 编码单元
      while (n--) {
        // charCodeAt()：获取给定索引处字符对应的 UTF-16 代码单元
        u8arr[n] = bstr.charCodeAt(n)
      }
      // 利用构造函数创建File文件对象
      // new File(bits, name, options)
      const picfile = new File([u8arr], `${fileName}.${suffix}`, {
        type: type
      })
      // 将File文件对象返回给方法的调用者
      return picfile
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop()
      this.imgSrcs=[]
    }
  }
}

</script>
<style lang="less" scoped>
.camera_outer {
  position: relative;
  overflow: hidden;
  // background: url("../../assets/img/user_0608_04.png") no-repeat center;
  background-size: 100%;


  .btn_camera {
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }

  .bg_r_img {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  .img_bg_camera {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;

    img {
      width: 300px;
      height: 300px;
    }

    .img_btn_camera {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);
      color: #ffffff;

      .loding_img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
.image-container {position: relative;display: inline-block;}
.delete-button {
  background-color: white;
  position: absolute;top: 10px;right: 10px;
}
</style>
