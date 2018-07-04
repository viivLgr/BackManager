<template>
  <div class="header">
    <div class="logo">转折支付平台管理系统</div>
    <div class="user-info">
      <el-button type="text"><i class="fa fa-user"/>{{userInfo.userName}}</el-button>
      <!-- <el-button type="text"  @click="searchOpen">
        <i class="fa fa-gear"/>设置
      </el-button> -->
      <el-button type="text" @click="logout">
        <i class="fa fa-power-off"/>退出
      </el-button>
    </div>
    <el-dialog
      v-show="searchShow"
      title="修改密码"
      :visible.sync="searchShow"
      width="30%"
      :before-close="searchClose"
      center
    >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="105px">
          <el-form-item label="当前用户ID：" prop="userid">
            <el-input v-model="form.userid" disabled></el-input>
          </el-form-item>
          <el-form-item label="设置新密码：" prop="pass">
            <el-input v-model="form.pass"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="checkPass">
            <el-input v-model="form.checkPass"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="searchShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { validMixin, axiosMixin } from "static/js/mixin.js";
import { getUserInfo, removeAllStorage } from 'static/js/cache.js';
import _user from 'service/user-service.js';

export default {
  mixins: [validMixin, axiosMixin],
  data() {
    return {
      searchShow: false,
      userInfo: {},
      form: {
        userid: "askdasd",
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: this.checkPass, trigger: "blur" }],
        checkPass: [{ validator: this.checkPass2, trigger: "blur" }]
      }
    };
  },
  created() {
    this.userInfo = getUserInfo();
    this.form = {
      userid: this.userInfo.userid
    }
  },
  methods: {
    logout() {
      _user.logout().then(res => {
        this.filterAxios(res, res => {
          removeAllStorage();
          this.$router.push("/login");
        });
      })
    },
    searchOpen() {
      this.searchShow = true;
    },
    searchClose() {
      this.searchShow = false;
      this.$refs["form"].resetFields();
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const { userid, pass, checkPass } = this.form;
          console.log("submit!", this.form, { userid, pass, checkPass });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../static/css/common/_variables";
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: $font-light-color;
  background-color: $bar-color;
  .logo {
    float: left;
    width: 200px;
    text-align: center;
    color: #fff;
    background: $bar-color;
    font-size: 16px;
  }
  .user-info {
    float: right;
    padding-right: 20px;
    font-size: 16px;
    color: #fff;
    button {
      margin-right: 5px;
    }
    [class*=" el-icon-"],
    [class^="el-icon-"] {
      font-size: 20px;
      vertical-align: middle;
    }
    .el-button--text {
      color: $font-bar-color;
    }
  }
}
</style>
