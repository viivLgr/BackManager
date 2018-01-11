<template>
  <div class="header">
    <div class="logo"><span><i class="unionPay"></i>运营</span><i class="line">|</i>商户平台</div>
    <div class="user-info">
      <el-button type="text"><img width="14" src="../static/img/icon-user.png" />{{name}}</el-button>
      <el-button type="text" @click="showAnnouncement"><img width="20" src="../static/img/icon-msg.png" />公告</el-button>
      <el-button type="text"  @click="searchOpen"><img width="14" src="../static/img/icon-setting.png" />设置</el-button>
      <el-button type="text" @click="logout"><img width="14" src="../static/img/icon-logout.png" />退出</el-button>
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
  import {passwordLevel} from 'static/js/util'
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6 || value.length > 16) {
          callback(new Error('密码长度在6-16位之间'))
        } else if (passwordLevel(value) <= 1) {
          callback(new Error('密码必须包含数字和字母'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        name: 'linxin',
        searchShow: false,
        form: {
          userid: 'askdasd',
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
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
      },
      searchOpen () {
        this.searchShow = true
      },
      searchClose () {
        this.searchShow = false
        this.$refs['form'].resetFields()
      },
      submitForm () {
        console.log('form')
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const {userid, pass, checkPass} = this.form
            console.log('submit!', this.form, {userid, pass, checkPass})
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
    margin: 0 14px 0 0;
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
