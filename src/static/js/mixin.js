/*
 * @Author: viivLgr
 * @Date: 2018-06-01 14:16:31
 * @Last Modified by: viivLgr
 * @Last Modified time: 2018-06-12 10:15:20
 */

import {
  ERR_OK,
  NEED_LOGIN
} from "service/config.js";
import {
  // passwordLevel,
  validQQ,
  validWechat,
  validPhone,
  validBankNo,
  validChinses
} from "static/js/validate.js";
import Util from 'util/util.js'

const _util = new Util();
// 请求mixin
export const axiosMixin = {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.userInfo = _util.getStorage('userInfo');
  },
  methods: {
    filterAxios: function (res, callback, failback) {
      const _this = this;
      res = res.data;
      if (res.errCode === ERR_OK) {
        callback && callback(res.result);
      } else if (res.errCode === NEED_LOGIN) {
        // 登录过期
        _this.$router.push('/login?redirect=' + this.$route.fullPath);
      } else {
        !failback && _this.errorTips(res.errMsg);
        failback && failback(res.errMsg);
      }
    },
    // 成功提示
    successTips: function (msg) {
      this.$message({
        message: msg || '恭喜你，操作成功！',
        type: 'success'
      });
    },
    // 错误提示
    errorTips: function (msg) {
      this.$message.error(msg || '哪里不对了~');
    }
  }
}

// list页面mixin
export const listMixin = {
  data() {
    return {
      loading: false,
      tableData: [],
      page: {
        page: 1,
        rows: 20,
        total: 1
      },
      addShow: false,
      addForm: {},
      updateShow: false,
      updateForm: {}
    }
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this._renderTableDate({
        ...this.searchForm,
        pageNum: val
      });
    },
    // 整理tableData
    renderTableDate: function (res, callback) {
      const _this = this;
      _this.filterAxios(res, res => {
        const list = res.list;
        let tempList = [];
        list.forEach((item, index) => {
          let temp = callback(item, index);
          tempList.push(temp);
        });
        _this.tableData = tempList;
        _this.loading = false;
        _this.page = {
          page: res.pageNum,
          rows: res.pageSize,
          total: res.total,
          totalPages: res.pages
        }
      });
    },
    // 关闭add弹窗
    addClose() {
      this.addShow = false;
      this.$refs["addForm"] && this.$refs["addForm"].resetFields();
    },
    // 关闭update弹窗
    updateClose() {
      this.updateShow = false;
      this.$refs["updateForm"] && this.$refs["updateForm"].resetFields();
    }
  }
}

// 校验mixin
export const validMixin = {
  methods: {
    checkPhone: function (rule, value, callback) {
      if (value && !validPhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    },
    checkPass: function (rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("密码长度在6-16位之间"));
        // } else if (passwordLevel(value) <= 1) {
        //   callback(new Error("密码必须包含数字和字母"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    },
    checkPass2: function (rule, value, callback) {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    checkQQ: function (rule, value, callback) {
      console.log('qq value', value);
      if (value && !validQQ(value)) {
        callback(new Error("请输入正确的QQ号"));
      } else {
        callback();
      }
    },
    checkWechat: function (rule, value, callback) {
      if (value && !validWechat(value)) {
        callback(new Error("请输入正确的微信号"));
      } else {
        callback();
      }
    },
    checkBankNo: function (rule, value, callback) {
      if (value && !validBankNo(value)) {
        callback(new Error("请输入正确的银行卡号"));
      } else {
        callback();
      }
    },
    checkChinese: function (rule, value, callback) {
      if (value && !validChinses(value)) {
        callback(new Error("只能是中文"));
      } else {
        callback();
      }
    }
  }
}
