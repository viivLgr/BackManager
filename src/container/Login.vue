<template>
  <div class="login-wrap">
    <div class="login-bg"><img src="../static/img/login_bg.jpg"></div>
    <div class="ms-title"><span><i class="unionPay"></i>运营</span><i class="line">|</i>商户平台</div>
    <div class="ms-login">
      <h2 class="form-title">登录</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" clearable></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <div class="login-tips">
          <el-checkbox v-model="checked">记住我</el-checkbox>
        </div>
      </el-form>
    </div>
    <div class="ms-footer">Copyright &copy; 2017.All Right Reserved</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          var phoneReg = /^0?1[35784][0-9][0-9]{8}$/
          if (!phoneReg.test(value)) {
            callback(new Error('请输入正确的手机号'))
          }
          callback()
        }
      }
      var checkPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (value.length < 6 || value.length > 16) {
            callback(new Error('密码长度在6-16位之间'))
          }
          callback()
        }
      }
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          password: [
            { validator: checkPwd, trigger: 'blur' }
          ]
        },
        checked: false
      }
    },
    methods: {
      submitForm (formName) {
        const self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
            localStorage.setItem('ms_username', self.ruleForm.username)
            self.$router.push('/dashboard')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
  }
  .login-bg{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .login-bg img{
    width: 100%;
  }
  .ms-title{
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 24px;
    color: #fff;
  }
  .ms-title .unionPay{
    display: inline-block;
    width: 64px;
    height: 40px;
    background: url("../static/img/unionPay.png") no-repeat;
    background-size: cover;
    margin: 0 10px;
    vertical-align: middle;
  }
  .ms-title .line{
    display: inline-block;
    margin: 0 10px;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    height:220px;
    margin:-150px 0 0 -190px;
    padding:20px 40px 40px;
    border-radius: 5px;
    background: #fff;
  }
  .form-title{
    text-align: center;
    font-size: 16px;
    margin-bottom: 20px;
    color: #606266;
    font-weight: normal;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
  .login-tips{
    margin: 16px 10px;
  }
  .ms-footer{
    position: absolute;
    bottom:20%;
    width:100%;
    text-align: center;
    font-size:30px;
    color: #fff;
    font-size: 12px;
  }
</style>
