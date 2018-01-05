<template>
  <div class="header">
    <div class="logo"><span><i class="unionPay"></i>运营</span><i class="line">|</i>商户平台</div>
    <div class="user-info">
      <el-button type="text"><Icon :img="userImg" />sda{{name}}</el-button>
      <span class="el-dropdown-link">{{name}}</span>
    </div>
  </div>
</template>
<script>
  import Icon from 'components/Icon'
  export default {
    data () {
      return {
        name: 'linxin',
        userImg: '../static/img/unionPay.png'
      }
    },
    components: {
      Icon
    }
//    computed: {
//      username () {
//        let username = localStorage.getItem('ms_username')
//        return username ? username : this.name
//      }
//    },
//    methods: {
//      handleCommand (command) {
//        if (command === 'loginout') {
//          localStorage.removeItem('ms_username')
//          this.$router.push('/login')
//        }
//      }
//    }
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
  }
  .header .logo{
    float: left;
    width: 200px;
    text-align: center;
    background: #ff4400;
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
    padding-right: 50px;
    font-size: 16px;
    color: #ff4400;
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo{
    position: absolute;
    left:0;
    top:15px;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
