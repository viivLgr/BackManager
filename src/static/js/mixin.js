/*
 * @Author: viivLgr
 * @Date: 2018-06-01 14:16:31
 * @Last Modified by: viivLgr
 * @Last Modified time: 2018-06-29 11:07:29
 */

import {
  ERR_OK,
  NEED_LOGIN
} from "service/config.js";
import {
  getPageRight,
  getUserInfo,
  setStatus,
  getStatus
} from 'static/js/cache.js';
import {
  // passwordLevel,
  validQQ,
  validWechat,
  validPhone,
  validBankNo,
  validChinses
} from "static/js/validate.js";
import { mapGetters } from 'vuex';
import _common from 'service/common-service.js';

// 请求mixin
export const axiosMixin = {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.userInfo = getUserInfo();
  },
  methods: {
    filterAxios: function (res, callback, failback) {
      res = res.data;
      if (res.errCode === ERR_OK) {
        typeof callback === 'function' && callback(res.result);
      } else if (res.errCode === NEED_LOGIN) {
        this.$router.push('/login?redirect=' + this.$route.fullPath);
      } else {
        (!failback || typeof failback !== 'function') && this.errorTips(res.errMsg);
        typeof failback === 'function' && failback(res.errMsg);
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
      statusList: [],
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
  computed: {
    ...mapGetters([
      'userRight'
    ])
  },
  created() {
    this.statusList = getStatus();
    if (!this.statusList) {
      this.getStatusList();
    }
    this.init();
  },
  watch: {
    userRight() {
      this.init();
    }
  },
  methods: {
    init() {},
    // 初始化页面权限
    initPageRight(lv1, lv2) {
      this.pageRight = getPageRight(lv1, lv2);
      if (!this.pageRight.length) {
        this.errorTips("您没有权限查看本页面");
      } else {
        this.computedRight();
      }
    },
    // 计算当前页操作权限
    computedRight() {
    },
    // 获取状态列表
    getStatusList() {
      _common.getDictionaryList('RECORD_STATUS').then(res => {
        this.filterAxios(res, res => {
          this.statusList = res;
          setStatus(res);
        })
      })
    },
    // 翻页
    handleCurrentChange(val) {
      this._renderTableDate({
        ...this.searchForm,
        pageNum: val
      });
    },
    // 整理tableData
    renderTableDate: function (res, callback) {
      this.filterAxios(res, res => {
        const list = res.list;
        let tempList = [];
        list.forEach((item, index) => {
          let temp = callback(item, index);
          tempList.push(temp);
        });
        this.tableData = tempList;
        this.loading = false;
        this.page = {
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
