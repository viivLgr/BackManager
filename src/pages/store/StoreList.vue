<template>
  <div class="container">
    <div class="header clearfix">
      <h2>商户列表</h2>
    </div>
    <!-- 查询 -->
    <div class="detail-input">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini" label-width="100px">
            <el-form-item label="商户号">
                <el-input v-model="searchForm.merchantId" placeholder="请输入商户号"></el-input>
            </el-form-item>
            <el-form-item label="商户名称">
                <el-input v-model="searchForm.merchantName" placeholder="请输入商户名称"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.status" placeholder="请选择状态">
                    <el-option label="正常" value="VALID"></el-option>
                    <el-option label="失效" value="INVALID"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="btn-item">
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <div class="table-btn">
            <el-button size="mini" type="success" @click="handleStore()">添加</el-button>
        </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="merchantId" label="商户号" fixed width="120"></el-table-column>
        <el-table-column align="center" prop="merchantName" label="商户名称" fixed width="120"></el-table-column>
        <el-table-column align="center" prop="merchantType" label="商户类型"></el-table-column>
        <el-table-column align="center" prop="linkmanName" label="联系人姓名" width="100"></el-table-column>
        <el-table-column align="center" prop="linkmanPhone" label="联系人手机号" width="100"></el-table-column>
        <el-table-column align="center" prop="linkmanEmail" label="联系人邮箱" width="150"></el-table-column>
        <el-table-column align="center" prop="status" label="商户状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="入网时间" width="150"></el-table-column>
        <el-table-column align="center" prop="agentName" label="代理商户" width="120"></el-table-column>
        <el-table-column align="center" prop="amount" label="商户余额"></el-table-column>
        <el-table-column align="center" prop="freezingAmount" label="冻结金额"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" fixed="right" width="480">
          <template slot-scope="scope">
            <el-button @click="goProductList(scope.row)" type="warning" size="mini">产品列表</el-button>
            <el-button  v-if="scope.row.operate.add" @click="handleStore(scope.row, 'add')" type="success" size="mini">添加</el-button>
            <el-button @click="handleStore(scope.row, 'update')" type="warning" size="mini">修改</el-button>
            <el-button @click="handleAddUser(scope.row)" type="success" size="mini">添加用户</el-button>
            <el-button @click="handleAppInfo(scope.row)" type="warning" size="mini">修改应用信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
          <div>
            <el-form-item label="商户号" prop="merchantId">
              <el-input v-model="form.merchantId" placeholder="请输入商户号" :disabled="form.title==='修改'"></el-input>
            </el-form-item>
            <el-form-item label="商户名称" prop="merchantName">
              <el-input v-model="form.merchantName" placeholder="请输入商户名称"></el-input>
            </el-form-item>
            <el-form-item label="商户类型" prop="merchantType">
              <el-select v-model="form.merchantType" placeholder="请选择商户类型">
                  <el-option label="普通商户" value="COMMON"></el-option>
                  <el-option label="代理商户" value="AGENT"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
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
          <div>
            <el-form-item label="代理商户名称" prop="agentName">
              <el-input v-model="form.agentName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="银行卡类型" prop="cardType">
              <el-select v-model="form.cardType" placeholder="请选择银行卡类型">
                  <el-option label="借记卡" value="PSN_DEBIT"></el-option>
                  <el-option label="对公账户" value="PUB"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行卡号" prop="bankCardNo">
              <el-input v-model="form.bankCardNo" placeholder="请输入银行卡号"></el-input>
            </el-form-item>
          </div>
          <div>
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
          <div>
            <el-form-item label="支付密码" prop="payPassword">
              <el-input v-model="form.payPassword" placeholder="请输入支付密码"></el-input>
            </el-form-item>
            <el-form-item label="应用密钥" prop="md5Key">
              <el-input v-model="form.md5Key" placeholder="请输入应用密钥"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option label="正常" value="VALID"></el-option>
                  <el-option label="失效" value="INVALID"></el-option>
              </el-select>
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
        <el-form ref="form" :model="addUserForm" :rules="addUserRules" size="small" label-width="105px">
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
                  <el-option label="有效" value="VALID"></el-option>
                  <el-option label="无效" value="INVALID"></el-option>
                  <!-- <el-option label="冻结" value="2"></el-option> -->
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
                  <el-option label="有效" value="VALID"></el-option>
                  <el-option label="无效" value="INVALID"></el-option>
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
import { formatMoney, formatDate } from "static/js/format.js";
import _store from "service/store-service.js";
import _user from "service/user-service.js";
export default {
  mixins: [axiosMixin, listMixin, validMixin],
  data() {
    const checkBranchNo = (rule, value, callback) => {
      if (this.form.cardType === "PUB" && value === "") {
        callback(new Error("对公账户必须输入联行号"));
      } else {
        callback();
      }
    };
    const checkPayPassword = (rule, value, callback) => {
      if (this.form.title === "添加" && value === "") {
        callback(new Error("支付密码不能为空"));
      } else {
        callback();
      }
    };
    const checkMd5Key = (rule, value, callback) => {
      if (this.form.title === "添加" && value === "") {
        callback(new Error("应用密钥不能为空"));
      } else {
        callback();
      }
    };
    return {
      addUserShow: false,
      updateAppInfoShow: false,
      storeAppInfo: {},
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
        agentName: [
          { required: true, message: "请输入代理商名称", trigger: "blur" }
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
          { validator: checkPayPassword, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "支付密码长度必须在6到16位之间",
            trigger: "blur"
          }
        ],
        md5Key: [
          { validator: checkMd5Key, trigger: "blur" }
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
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: this.checkPass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: this.checkPass2, trigger: "blur" }
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
      roleList: []
    };
  },
  created() {
    this._renderTableDate();
    this.getRoleList();
  },
  methods: {
    // 获取列表
    _renderTableDate(data) {
      const _this = this;
      _this.loading = true;
      _store.getStoreList(data).then(
        res => {
          _this.renderTableDate(res, (item, index) => {
            return {
              no: index + 1,
              agentName: item.agentName,
              merchantId: item.merchantId,
              merchantName: item.merchantName,
              linkmanName: item.linkmanName,
              linkmanPhone: item.linkmanPhone,
              linkmanEmail: item.linkmanEmail,
              merchantType:
                item.merchantType === "AGENT" ? "代理商户" : "普通商户",
              merchantAgentId: item.merchantAgentId,
              amount: formatMoney(item.amount),
              freezingAmount: formatMoney(item.freezingAmount),
              status: item.status === "VALID" ? "生效" : "失效",
              createTime: formatDate(item.createTime),
              operate: {
                add: item.merchantType === "AGENT",
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
      const _this = this;
      _this.$refs[searchForm].validate(valid => {
        if (valid) {
          let username = this.$refs[searchForm].model.feature;
          _this._renderTableDate(_this.searchForm);
          console.log("submit!", username);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加商户
    handleStore(row, type) {
      const _this = this;
      _this.addShow = true;
      if (row instanceof Object) {
        if (type && type === "update") {
          // 修改
          _this.getStoreInfo(row.merchantId);
        } else {
          _this.form = {
            title: "添加",
            merchantAgentId: row.merchantId,
            agentName: row.agentName
          };
        }
      } else {
        _this.form = {
          title: "添加",
          merchantAgentId: localStorage.getItem("ms_userId"),
          agentName: localStorage.getItem("ms_userName")
        };
      }
    },
    // 获取商户详细信息
    getStoreInfo(merchantId) {
      const _this = this;
      _store.getStoreDetailInfo({ merchantId: merchantId }).then(res => {
        _this.filterAxios(
          res,
          res => {
            _this.form = {
              title: "修改",
              merchantId: res.merchantId,
              merchantName: res.merchantName,
              merchantType: res.merchantType,
              linkmanName: res.linkmanName,
              linkmanPhone: res.linkmanPhone,
              linkmanEmail: res.linkmanEmail,
              merchantAgentId: res.merchantAgentId + "",
              agentName: res.agentName,
              cardType: res.cardType,
              bankCardNo: res.bankCardNo,
              accountName: res.accountName,
              bankName: res.bankName,
              branchNo: res.branchNo,
              payPassword: res.payPassword,
              md5Key: res.md5Key,
              status: res.status
            };
          },
          res => {
            console.log("err", res);
          }
        );
      });
    },
    addSubmit() {
      const _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          if (_this.form.title === "添加") {
            delete _this.form.title;
            _this.form.agentName && delete _this.form.agentName;
            _store.addStroreUser(_this.form).then(res => {
              _this.formatResult(res, "添加成功");
            });
          } else {
            // 修改
            delete _this.form.title;
            _this.form.agentName && delete _this.form.agentName;
            _store.updateStroreUser(_this.form).then(res => {
              _this.formatResult(res, "修改成功");
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
      const _this = this;
      _this.formClose();
      _this.filterAxios(res, res => {
        _this.successTips(msg);
        _this._renderTableDate();
      });
    },
    // 修改应用信息
    handleAppInfo(row) {
      const _this = this;
      _this.appInfoForm = {};
      _this.getAppInfo(row.merchantId);
      _this.updateAppInfoShow = true;
    },
    updateAppInfoClose() {
      this.updateAppInfoShow = false;
      this.$refs["appInfoForm"].resetFields();
      this.appInfoForm = {};
    },
    appSubmit() {
      const _this = this;
      delete _this.appInfoForm.merchantId;
      _store.updateAppInfo(_this.appInfoForm).then(res => {
        _this.filterAxios(res, res => {
          _this.successTips("应用信息修改成功");
          _this.updateAppInfoClose();
        });
      });
    },
    // 获取应用信息详细信息
    getAppInfo(merchantId) {
      const _this = this;
      _store.getStoreAppInfo({ merchantId: merchantId }).then(res => {
        _this.filterAxios(res, res => {
          _this.storeAppInfo = res;
          _this.appInfoForm = {
            merchantId: _this.storeAppInfo.merchantId,
            appId: _this.storeAppInfo.appId,
            id: _this.storeAppInfo.id,
            md5Key: _this.storeAppInfo.md5Key,
            status: _this.storeAppInfo.status
          };
        });
      });
    },
    // 去产品列表页面
    goProductList(row) {
      //  "/product_list?merchantId=" + row.merchantId
      this.$router.push({
        path: "/product_list",
        query: {
          merchantId: row.merchantId,
          merchantName: row.merchantName,
          agentName: row.agentName
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
      _this.addUserShow = true;
      console.log("handleForm", row);
    },
    addUserClose() {
      this.addUserShow = false;
      this.addUserForm = {};
      this.$refs["addUserForm"] && this.$refs["addUserForm"].resetFields();
    },
    addUserSubmit() {
      const _this = this;
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          _user.addUser(_this.form).then(res => {
            _this.filterAxios(res, res => {
              _this.successTips("添加用户成功");
              _this.addUserClose();
              _this._renderTableDate();
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取roleList
    getRoleList() {
      const _this = this;
      _user.roleList().then(res => {
        _this.filterAxios(res, res => {
          this.roleList = res.list;
        });
      });
    }
  }
};
</script>