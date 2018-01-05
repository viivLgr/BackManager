<template>
  <i class="icon"><img :src="img" alt=""></i>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      img: {
        type: String,
        default: '../static/img/unionPay.png'
      }
    }
  }
</script>
<style scoped>
  .icon{
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px;
    width: 20px;
    height: 20px;
  }
  .icon img{
    width: 100%;
  }
</style>
