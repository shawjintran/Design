<template>
  <div id="app">
    <van-tabs v-model="active">
      <van-tab title="文献上传" >
        <upload @tosum="tosum"></upload>
      </van-tab>
      <van-tab title="文献进程" >
        <sumfile></sumfile>
      </van-tab>
    </van-tabs>
    <router-view></router-view>
  </div>
</template>

<script>

import upload from "@/views/upload/upload";
import sumfile from "@/views/summary/sumfile";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {
    upload:upload,
    sumfile:sumfile,
  },
  data() {
    return {
      active: 1
    }
  },
  methods: {
    tosum(val){
      console.log(val)
      this.active = val
    }
  },
}
</script>

<style scoped>

</style>
