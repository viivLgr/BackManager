<template>
  <div class="announcement">
    <h2>{{title}}</h2>
    <div class="container">
      <p class="greetings">各位用户：</p>
      <p class="context">{{content}}</p>
      <p class="right">公告ID：{{id}}</p>
      <p class="right">{{createTime}}</p>
    </div>
    <div class="back-btn">
      <el-button type="primary" size="small" @click="goback">返回</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          id: '',
          title: '支付系统升级通知',
          content: '接到银行通知，支付系统有一些变动升级，具体有以下几点：电话为合肥地区阿达大双卡双待福建师范地缝和鸡尾酒可温柔可能四大发明你说的附件为科技健康水的冯矿伟日文和忍耐少女时代飞机文副科级。',
          createTime: '2017-10-05',
          readed: true
        }
      },
      created () {
        console.log(this.$route)
        this.id = this.$route.query.id
      },
      methods: {
        goback () {
          this.$router.go(-1)
        }
      }
    }
</script>
<style scoped>
  .announcement h2{
    padding: 30px 0 20px;
    color: #333;
    font-size: 16px;
    text-align: center;
  }
  .container{
    font-size: 14px;
    color: #4d4d4d;
    padding: 0 40px;
  }
  .container .greetings{
    padding: 0 0 10px;
  }
  .container .context{
    text-indent: 20px;
    padding: 10px 0 40px;
    line-height: 24px;
  }
  .container .right{
    text-align: right;
    line-height: 30px;
  }
  .back-btn{
    padding-top: 100px;
    text-align: center;
  }
</style>
