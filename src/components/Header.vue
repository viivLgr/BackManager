<template>
  <div class="header">
    <div class="logo"><span><i class="unionPay"></i>运营</span><i class="line">|</i>商户平台</div>
    <div class="user-info">
      <el-button type="text"><img width="14" src="../static/img/icon-user.png" />{{name}}</el-button>
      <el-button type="text" @click="showAnnouncement"><img width="20" src="../static/img/icon-msg.png" />公告</el-button>
      <el-button type="text"><img width="14" src="../static/img/icon-setting.png" />设置</el-button>
      <el-button type="text" @click="logout"><img width="14" src="../static/img/icon-logout.png" />退出</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        name: 'linxin'
      }
    },
//    computed: {
//      username () {
//        let username = localStorage.getItem('ms_username')
//        return username ? username : this.name
//      }
//    },
    methods: {
      showAnnouncement () {
        this.$router.push('/announcementlist')
//        if (command === 'loginout') {
//          localStorage.removeItem('ms_username')
//          this.$router.push('/login')
//        }
      },
      logout () {
        this.$router.push('/login')
      }
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
    background-color: #fff;
  }
  .header .logo{
    float: left;
    width: 200px;
    text-align: center;
    background: #199ef2;
    font-size: 16px;
  }
  .header .logo .unionPay{
    display: inline-block;
    width: 32px;
    height: 20px;
    background: url("../static/img/unionPay.png") no-repeat;
    background-size: cover;
    margin: 0 10px;
    vertical-align: middle;
  }
  .header .logo .line{
    display: inline-block;
    margin: 0 10px;
  }
  .user-info {
    float: right;
    padding-right: 20px;
    font-size: 16px;
    color: #ff4400;
  }
  .user-info img{
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
  }
</style>
