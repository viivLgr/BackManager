<template>
  <div class="container">
    <div class="header clearfix">
      <h2>商户列表</h2>
    </div>
    <!-- 查询 -->
    <div class="detail-input" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini" label-width="100px">
            <el-form-item label="商户号">
                <el-input v-model="searchForm.merchantId" placeholder="请输入商户号"></el-input>
            </el-form-item>
            <el-form-item label="商户名称">
                <el-input v-model="searchForm.merchantName" placeholder="请输入商户名称"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.status" placeholder="请选择状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="btn-item">
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
      <!-- 添加 - 当前 -->
      <div class="table-btn" v-if="pageRight.add">
          <el-button size="mini" type="success" @click="handleMerchant()">添加</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="merchantId" label="商户号" fixed min-width="120"></el-table-column>
        <el-table-column align="center" prop="merchantName" label="商户名称" fixed min-width="120"></el-table-column>
        <el-table-column align="center" prop="merchantTypeDesc" label="商户类型"></el-table-column>
        <el-table-column align="center" prop="linkmanName" label="联系人姓名" min-width="100"></el-table-column>
        <el-table-column align="center" prop="linkmanPhone" label="联系人手机号" min-width="100"></el-table-column>
        <el-table-column align="center" prop="linkmanEmail" label="联系人邮箱" min-width="150"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="商户状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="入网时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="agentMerchantName" label="代理商户" min-width="120"></el-table-column>
        <el-table-column align="center" prop="amount" label="商户余额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="freezingAmount" label="冻结金额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" fixed="right" min-width="480" v-if="pageRight.operate">
          <template slot-scope="scope">
            <el-button v-if="pageRight.productList" @click="goProductList(scope.row)" type="warning" size="mini">产品列表</el-button>
            <el-button v-if="scope.row.operate.add && pageRight.addItem" @click="handleMerchant(scope.row, 'add')" type="success" size="mini">添加</el-button>
            <el-button v-if="pageRight.updateItem" @click="handleMerchant(scope.row, 'update')" type="warning" size="mini">修改</el-button>
            <el-button v-if="pageRight.addUser" @click="handleAddUser(scope.row)" type="success" size="mini">添加用户</el-button>
            <el-button v-if="pageRight.updateAppInfo" @click="handleAppInfo(scope.row)" type="warning" size="mini">修改应用信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" 
        v-if="page.totalPages > 1"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-size="page.rows" 
        :total="page.total"
      />
    </div>
    <!-- 添加、修改商户 -->
    <el-dialog
      v-show="addShow"
      :visible.sync="addShow"
      :title="form.title"
      width="75%"
      :before-close="addClose"
      center
      >
      <div class="detail-input">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" size="small" label-width="105px">
          <div class="el-form-line">
            <el-form-item label="商户号" prop="merchantId">
              <el-input v-model="form.merchantId" placeholder="请输入商户号" :disabled="form.title==='修改'"></el-input>
            </el-form-item>
            <el-form-item label="商户名称" prop="merchantName">
              <el-input v-model="form.merchantName" placeholder="请输入商户名称"></el-input>
            </el-form-item>
            <el-form-item label="商户类型" prop="merchantType">
              <el-select v-model="form.merchantType" placeholder="请选择商户类型">
                  <el-option v-for="(item, index) in merchantTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-form-line">
            <el-form-item label="联系人姓名" prop="linkmanName">
              <el-input v-model="form.linkmanName" placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号" prop="linkmanPhone">
              <el-input v-model="form.linkmanPhone" placeholder="请输入联系人手机号"></el-input>
            </el-form-item>
            <el-form-item label="联系人邮箱" prop="linkmanEmail">
              <el-input v-model="form.linkmanEmail" placeholder="请输入联系人邮箱"></el-input>
            </el-form-item>
          </div>
          <div class="el-form-line">
            <el-form-item label="代理商户名称" prop="merchantAgentName">
              <el-input v-model="form.merchantAgentName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="银行卡类型" prop="cardType">
              <el-select v-model="form.cardType" placeholder="请选择银行卡类型">
                  <el-option v-for="(item, index) in cardAccountTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                  <!-- <el-option label="借记卡" value="DEBIT"></el-option>
                  <el-option label="对公账户" value="CORPORATE"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="银行卡号" prop="bankCardNo">
              <el-input v-model="form.bankCardNo" placeholder="请输入银行卡号"></el-input>
            </el-form-item>
          </div>
          <div class="el-form-line">
            <el-form-item label="账户名称" prop="accountName">
              <el-input v-model="form.accountName" placeholder="请输入账户名称"></el-input>
            </el-form-item>
            <el-form-item label="开户行名称" prop="bankName">
              <el-input v-model="form.bankName" placeholder="请输入开户行名称"></el-input>
            </el-form-item>
            <el-form-item label="联行号" prop="branchNo">
              <el-input v-model="form.branchNo" placeholder="请输入联行号"></el-input>
            </el-form-item>
          </div>
          <div class="el-form-line">
            <el-form-item label="支付密码" prop="payPassword">
              <el-input v-model="form.payPassword" placeholder="请输入支付密码"></el-input>
            </el-form-item>
            <el-form-item label="应用密钥" prop="md5Key">
              <el-input v-model="form.md5Key" placeholder="请输入应用密钥"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-form-line">
            <el-form-item label="IP地址" prop="ipWhiteList">
              <el-input v-model="form.ipWhiteList" placeholder="请输入IP地址"></el-input>
              <span class="tips">（IP地址可以是多个，多个用英文逗号（“,”)隔开，也可以是IP地址段，如：115.12.113.33-78）</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog
      v-show="addUserShow"
      :visible.sync="addUserShow"
      title="添加用户"
      width="30%"
      :before-close="addUserClose"
      center
      >
      <div>
        <el-form ref="addUserForm" :model="addUserForm" :rules="addUserRules" size="small" label-width="105px">
          <el-form-item label="商户">
            <el-input v-model="addUserForm.merchantName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="addUserForm.roleId" placeholder="请选择角色">
                <el-option v-for="(role, index) in roleList" :key="index" :label="role.roleName" :value="role.roleId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="linkmanName">
            <el-input v-model="addUserForm.linkmanName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="addUserForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="addUserForm.nickName" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="addUserForm.password" type="password" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="addUserForm.checkPass" type="password" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="linkmanPhone">
            <el-input v-model="addUserForm.linkmanPhone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="linkmanEmail">
            <el-input v-model="addUserForm.linkmanEmail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="addUserForm.qq" placeholder="请输入QQ"></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="wechat">
            <el-input v-model="addUserForm.wechat" placeholder="请输入微信号"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="addUserForm.status" placeholder="请选择状态">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addUserShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addUserSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改应用信息 -->
    <el-dialog
      v-show="updateAppInfoShow"
      :visible.sync="updateAppInfoShow"
      title="修改应用信息"
      width="30%"
      :before-close="updateAppInfoClose"
      center
      >
      <div>
        <el-form ref="appInfoForm" :model="appInfoForm" :rules="appInfoRules" size="small" label-width="105px">
          <el-form-item label="APPID">
            <el-input v-model="appInfoForm.appId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商户号">
            <el-input v-model="appInfoForm.merchantId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="md5密钥">
            <el-input type="textarea" v-model="appInfoForm.md5Key"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="appInfoForm.status" placeholder="请选择状态">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="updateAppInfoShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="appSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { axiosMixin, listMixin, validMixin } from "static/js/mixin.js";
import { getStatusName, setMerchantType, getmerchantTypeName } from "static/js/cache.js";
import { trim } from 'static/js/format.js';
import _merchant from "service/merchant-service.js";
import _user from "service/user-service.js";
import _common from "service/common-service.js";
export default {
  mixins: [axiosMixin, listMixin, validMixin],
  data() {
    const checkBranchNo = (rule, value, callback) => {
      value = trim(value);
      if (this.form.cardType === this.pubCardAccountTypeCode && !value) {
        callback(new Error("对公账户必须输入联行号"));
      } else {
        callback();
      }
    };
    // const checkPayPassword = (rule, value, callback) => {
    //   if (this.form.title === "添加" && value === "") {
    //     callback(new Error("支付密码不能为空"));
    //   } else {
    //     callback();
    //   }
    // };
    // const checkMd5Key = (rule, value, callback) => {
    //   if (this.form.title === "添加" && value === "") {
    //     callback(new Error("应用密钥不能为空"));
    //   } else {
    //     callback();
    //   }
    // };
    const validatePass = (rule, value, callback) => {
      if (this.addUserForm.checkPass !== "") {
        this.$refs.addUserForm.validateField("checkPass");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addUserForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      addUserShow: false,
      updateAppInfoShow: false,
      merchantAppInfo: {},
      searchForm: {
        merchantId: "",
        merchantName: "",
        status: ""
      },
      form: {},
      rules: {
        merchantId: [
          { required: true, message: "请输入商户号", trigger: "blur" }
        ],
        merchantName: [
          { required: true, message: "请输入商户名称", trigger: "blur" }
        ],
        merchantType: [
          { required: true, message: "请选择商户类型", trigger: "blur" }
        ],
        linkmanName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        linkmanPhone: [
          { required: true, message: "请输入联系人手机号", trigger: "blur" },
          { validator: this.checkPhone, trigger: "blur" }
        ],
        linkmanEmail: [
          { required: true, message: "请输入联系人邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确格式的邮箱邮箱",
            trigger: "blur"
          }
        ],
        agentMerchantName: [
          { required: false, message: "请输入代理商名称", trigger: "blur" }
        ],
        cardType: [
          { required: true, message: "请选择卡类型", trigger: "blur" }
        ],
        bankCardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
          {
            min: 16,
            max: 19,
            message: "银行卡号长度必须在16到19位之间",
            trigger: "blur"
          }
        ],
        accountName: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { validator: this.checkChinese, trigger: "blur" }
        ],
        bankName: [
          { required: true, message: "请输入开户行名称", trigger: "blur" }
        ],
        // 对公账户必须输入联行号
        branchNo: [{ validator: checkBranchNo, trigger: "blur" }],
        payPassword: [
          { required: true, message: "请输入支付密码", trigger: "blur" },
          // { validator: checkPayPassword, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "支付密码长度必须在6到16位之间",
            trigger: "blur"
          }
        ],
        md5Key: [
          { required: true, message: "请输入应用密钥", trigger: "blur" }
          // { validator: checkMd5Key, trigger: "blur" }
        ],
        ipWhiteList: [
          { required: true, message: "请输入IP地址", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      appInfoForm: {},
      appInfoRules: {},
      addUserForm: {},
      addUserRules: {
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
        linkmanName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        linkmanPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: this.checkPhone, trigger: "blur" }
        ],
        linkmanEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确格式的邮箱邮箱",
            trigger: "blur"
          }
        ],
        qq: [
          { required: true, message: "请输入QQ号", trigger: "blur" },
          { validator: this.checkQQ, trigger: "blur" }
        ],
        wechat: [
          { required: true, message: "请输入微信号", trigger: "blur" },
          { validator: this.checkWechat, trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      roleList: [],
      merchantTypeList: [],
      cardAccountTypeList: [],
      pubCardAccountTypeCode: ''
    };
  },
  methods: {
    init() {
      this.initPageRight("商户管理", "商户列表");
      this._renderTableDate();
      this.getMerchantTypeList();
      this.getCardAccountTypeList();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "查询" && item.status === "VALID") {
          this.pageRight.search = true;
        }
        if (item.funcName === "添加-当前" && item.status === "VALID") {
          this.pageRight.add = true;
        }
        if (item.funcName === "添加-指定" && item.status === "VALID") {
          this.pageRight.addItem = true;
        }
        if (item.funcName === "添加用户" && item.status === "VALID") {
          this.pageRight.addUser = true;
        }
        if (item.funcName === "修改" && item.status === "VALID") {
          this.pageRight.updateItem = true;
        }
        if (item.funcName === "修改应用信息" && item.status === "VALID") {
          this.pageRight.updateAppInfo = true;
        }
        if (item.funcName === "产品列表" && item.status === "VALID") {
          this.pageRight.productList = true;
        }
      });
      const pageRight = this.pageRight;
      if (pageRight.addItem || pageRight.addUser || pageRight.updateItem || pageRight.productList || pageRight.updateAppInfo) {
        this.pageRight.operate = true;
      }
    },
    // 获取列表
    _renderTableDate(data) {
      const _this = this;
      _this.loading = true;
      _merchant.getMerchantList(data).then(
        res => {
          _this.renderTableDate(res, (item, index) => {
            return {
              no: index + 1,
              id: item.id,
              merchantId: item.merchantId,
              merchantName: item.merchantName,
              linkmanName: item.linkmanName,
              linkmanPhone: item.linkmanPhone,
              linkmanEmail: item.linkmanEmail,
              merchantType: item.merchantType,
              merchantTypeDesc: getmerchantTypeName(item.merchantType),
              merchantAgentId: item.merchantAgentId,
              agentMerchantName: item.agentMerchantName,
              amount: item.amount,
              freezingAmount: item.freezingAmount,
              status: item.status,
              statusDesc: getStatusName(item.status),
              createTime: item.createTime,
              operate: {
                add: item.merchantType === "MER_AGENT",
                update: true
              }
            };
          });
        },
        err => {
          console.log("err", err);
        }
      );
    },
    // 查询
    searchSubmit(searchForm) {
      this.$refs[searchForm].validate(valid => {
        if (valid) {
          this._renderTableDate(this.searchForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加商户
    handleMerchant(row, type) {
      const _this = this;
      if (row instanceof Object) {
        if (type && type === "update") {
          // 修改
          _this.getMerchantInfo(row.id);
        } else {
          _this.form = {
            title: "添加",
            merchantAgentId: row.merchantId,
            merchantAgentName: row.merchantName
          };
        }
      } else {
        _this.form = {
          title: "添加"
        };
      }
      _this.addShow = true;
    },
    // 获取商户详细信息
    getMerchantInfo(id) {
      const _this = this;
      _merchant.getMerchantDetailInfo(id).then(res => {
        _this.filterAxios(res, res => {
          _this.form = {
            ...res,
            title: "修改"
          };
        });
      });
    },
    addSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.title === "添加") {
            delete this.form.title;
            this.form.agentMerchantName && delete this.form.agentMerchantName;
            _merchant.addStroreUser(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            // 修改
            delete this.form.title;
            this.form.agentMerchantName && delete this.form.agentMerchantName;
            _merchant.updateStroreUser(this.form.id, this.form).then(res => {
              this.formatResult(res, "修改成功");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    formClose() {
      this.addShow = false;
      this.$refs["form"].resetFields();
      this.form = {};
    },
    formatResult(res, msg) {
      this.formClose();
      this.filterAxios(res, res => {
        this.successTips(msg);
        this._renderTableDate();
      });
    },
    // 修改应用信息
    handleAppInfo(row) {
      this.appInfoForm = {};
      this.getAppInfo(row.merchantId);
      this.updateAppInfoShow = true;
    },
    updateAppInfoClose() {
      this.updateAppInfoShow = false;
      this.$refs["appInfoForm"].resetFields();
      this.appInfoForm = {};
    },
    appSubmit() {
      _merchant
        .updateAppInfo(this.appInfoForm.merchantId, this.appInfoForm)
        .then(res => {
          this.filterAxios(res, res => {
            this.successTips("应用信息修改成功");
            this.updateAppInfoClose();
          });
        });
    },
    // 获取应用信息详细信息
    getAppInfo(merchantId) {
      _merchant.getMerchantAppInfo(merchantId).then(res => {
        this.filterAxios(res, res => {
          this.merchantAppInfo = res;
          this.appInfoForm = {
            merchantId: this.merchantAppInfo.merchantId,
            appId: this.merchantAppInfo.appId,
            id: this.merchantAppInfo.id,
            md5Key: this.merchantAppInfo.md5Key,
            status: this.merchantAppInfo.status
          };
        });
      });
    },
    // 去产品列表页面
    goProductList(row) {
      this.$router.push({
        path: "/product_list",
        query: {
          merchantId: row.merchantId,
          merchantName: row.merchantName,
          agentMerchantName: row.agentMerchantName
        }
      });
    },
    // 添加用户
    handleAddUser(row) {
      const _this = this;
      _this.addUserForm = {
        merchantId: row.merchantId,
        merchantName: row.merchantName
      };
      this.roleList.length <= 0 && this.getRoleList();
      _this.addUserShow = true;
    },
    addUserClose() {
      this.addUserShow = false;
      this.addUserForm = {};
      this.$refs["addUserForm"] && this.$refs["addUserForm"].resetFields();
    },
    addUserSubmit() {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          delete this.form.checkPass; // 去掉确认密码属性
          _user.addUser(this.addUserForm).then(res => {
            this.filterAxios(res, res => {
              this.successTips("添加用户成功");
              this.addUserClose();
              this._renderTableDate();
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取角色列表
    getRoleList() {
      _user.getRoleList().then(res => {
        this.filterAxios(res, res => {
          this.roleList = res;
        });
      });
    },
    // 获取商户类型
    getMerchantTypeList() {
      _common.getDictionaryList("MERCHANT_TYPE").then(res => {
        this.filterAxios(res, res => {
          this.merchantTypeList = res;
          setMerchantType(res);
        });
      });
    },
    // 获取银行账户列表
    getCardAccountTypeList() {
      _common.getDictionaryList("BANK_ACCOUNT_TYPE").then(res => {
        this.filterAxios(res, res => {
          this.cardAccountTypeList = res;
          this.pubCardAccountTypeCode = res.filter(item => {
            return item.dicName === '对公账户'
          })[0].dicCode;
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table .table-btn {
  padding: 0 20px 20px 0;
  margin-top: -20px;
}
.el-form-line .el-input {
  width: inherit;
}
.tips {
  display: inline-block;
}
</style>
