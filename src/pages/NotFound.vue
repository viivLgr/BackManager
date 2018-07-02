<template>
  <div class="container">
    <div class="header clearfix">
      <h2>出错啦~</h2>
    </div>
    <div class="not-found">
        <i class="fa fa-frown-o"></i>
        <p>找不到该路径，<router-link to="/dashboard">点我返回首页</router-link></p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
  }
</script>
<style lang="scss" scoped>
.not-found{
    text-align: center;
    padding: 50px 80px 0;
    .fa{
        display: inline-block;
        font-size: 130px;
        width: 130px;
    }
    p{
        // color: #ccc;
        font-size: 12px;
        padding-top: 30px;
        a{
            color:#1ABC9C;
        }
    }
}
</style>

