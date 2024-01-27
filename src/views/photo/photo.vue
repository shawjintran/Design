<template>
  <div>
    <TakePhotos ref="TakePhotos" @refreshDataList="refreshDataList" />
  </div>
</template>
<script>
export default {
  // name: "photo",
  methods: {
    refreshDataList(imgSrc) {
      // 这里返回服务器图片的地址
      console.log(imgSrc)
    }
  }
}
</script>

<style scoped>

</style>
