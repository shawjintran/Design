<template>
  <div id="app">
    <van-tabs :active="active">
      <van-tab title="文献归档" >
        <File></File>
      </van-tab>
      <van-tab title="文献分析" >
        <Chart></Chart>
      </van-tab>
    </van-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import File from '../file/file'
import Chart from '../chart/chart.vue'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { File, Chart },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
