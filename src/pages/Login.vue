<template>
  <div class="login-wrap">
    <!-- <div class="login-bg"><img src="../static/img/login_bg.jpg"></div> -->
    <div class="login">
      <h1>
        <!-- <img src="../static/img/unionPay.png" alt="转折科技"><br/> -->
        <img src="../static/img/logo.png" alt="转折科技"><br/>
        转折支付平台管理系统
      </h1>
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input prefix-icon="fa fa-user" v-model="ruleForm.userName" placeholder="请输入用户名" clearable></el-input>
          <div class="el-form-item__error">{{errMsg}}</div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="fa fa-lock" type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" clearable></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <!-- <div class="login-tips">
          <el-checkbox v-model="checked">记住我</el-checkbox>
        </div> -->
      </el-form>
    </div>
    <div class="footer">Copyright &copy; 2017.All Right Reserved</div>
  </div>
</template>
<script type="text/ecmascript-6">
import _user from "service/user-service.js";
import { axiosMixin } from "static/js/mixin.js";
import Util from "util/util.js";

const _util = new Util();

export default {
  mixins: [axiosMixin],
  data() {
    // var checkPhone = (rule, value, callback) => {
    //   this.errMsg = "";
    //   if (value === "") {
    //     callback(new Error("请输入用户名"));
    //   } else {
    //     var phoneReg = /^0?1[35784][0-9][0-9]{8}$/;
    //     if (!phoneReg.test(value) && value !== "admin") {
    //       callback(new Error("请输入正确的手机号"));
    //     }
    //     callback();
    //   }
    // };
    var checkPwd = (rule, value, callback) => {
      this.errMsg = "";
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6 || value.length > 16) {
          callback(new Error("密码长度在6-16位之间"));
        }
        callback();
      }
    };
    return {
      errMsg: "",
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        // userName: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: checkPwd, trigger: "blur" }]
      },
      checked: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          _user.login(this.ruleForm).then(res => {
            this.filterAxios(
              res,
              res => {
                _util.setStorage("userInfo", {
                  ...res,
                  userName: this.ruleForm.userName
                });
                _util.setStorage("token", res.token);
                const redirect = this.$route.query.redirect
                  ? decodeURIComponent(this.$route.fullPath.split("?redirect=")[1])
                  : null;
                this.$router.push(redirect || "/dashboard");
              },
              errMsg => {
                this.errMsg = errMsg;
              }
            );
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../static/css/common/_variables";
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .login-bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .login-bg img {
      width: 100%;
    }
  }
  .login {
    position: absolute;
    left: 50%;
    top: 45%;
    width: 300px;
    padding: 20px 40px 40px;
    border-radius: 5px;
    background: #fff;
    transform: translate(-50%, -50%);
    h1 {
      text-align: center;
      font-size: 20px;
      color: $color;
      padding: 10px 0;
      img {
        padding: 10px 0;
        width: 120px;
      }
    }
    .fa {
      color: $icon-font-color;
      font-size: $icon-font-size;
    }
    .login-btn {
      text-align: center;
      button {
        width: 100%;
        height: 36px;
        background-color: $color;
        border-color: $color;
      }
    }
    .login-tips {
      margin: 16px 10px;
    }
  }
  .footer {
    position: absolute;
    bottom: 10%;
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #fff;
    font-size: 12px;
  }
}
</style>
