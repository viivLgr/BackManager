<template>
  <div class="container">
    <div class="header clearfix">
      <h2>渠道列表</h2>
    </div>
    <!-- 搜索 -->
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="渠道编码" prop="channelCode">
                <el-input v-model="searchForm.channelCode"></el-input>
            </el-form-item>
            <el-form-item label="渠道名称" prop="channelName">
                <el-input v-model="searchForm.channelName"></el-input>
            </el-form-item>
            <el-form-item label="产品类型" prop="productCode">
                <el-select v-model="searchForm.productCode" placeholder="请选择">
                    <el-option label="全部" value="" />
                    <el-option v-for="(item, index) in productCodeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 内容 -->
    <div class="table">
      <!-- 添加渠道 -->
      <div class="table-btn" v-if="pageRight.add">
          <el-button size="mini" type="success" @click="handleForm()">添加渠道</el-button>
      </div>
      <el-table
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="channelCode" label="渠道编码" fixed></el-table-column>
        <el-table-column align="center" prop="channelName" label="渠道名称" fixed width="120"></el-table-column>
        <el-table-column align="center" prop="channelTypeName" label="渠道类型" width="100"></el-table-column>
        <el-table-column align="center" prop="productName" label="产品类型" width="100"></el-table-column>
        <el-table-column align="center" prop="gatewayGroup" label="网关组"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
        <el-table-column align="center" prop="sort" label="排序"></el-table-column>
        <el-table-column align="center" prop="allowTradeTime" label="渠道交易时间" width="150"></el-table-column>
        <el-table-column align="center" prop="dayMaxAmount" label="日限额(单元:分)" width="150"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="150"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" width="150"></el-table-column>
        <el-table-column align="center" label="操作" width="300" fixed="right" v-if="pageRight.operate">
          <template slot-scope="scope">
            <el-button v-if="pageRight.detail" @click="handleForm(scope.row, '详情')" type="warning" size="mini">详情</el-button>
            <el-button v-if="pageRight.bankList" @click="handleSupportBankList(scope.row.channelId, scope.row.channelName)" type="warning" size="mini">查看支持银行列表</el-button>
            <el-button v-if="scope.row.operate.update && pageRight.update" @click="handleForm(scope.row, '修改')" type="warning" size="mini">修改</el-button>
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
    <!-- 添加 / 修改 -->
    <el-dialog
      v-show="addShow"
      :visible.sync="addShow"
      :title="form.title"
      width="70vw"
      :before-close="formClose"
      center
      >
      <div class="detail-input">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" size="small" label-width="110px">
            <div>
                <el-form-item label="渠道编码" prop="channelCode">
                    <el-input v-model="form.channelCode" placeholder="请输入渠道编码" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="渠道名称" prop="channelName">
                    <el-input v-model="form.channelName" placeholder="请输入渠道名称" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="渠道类型" prop="channelType">
                    <el-select v-model="form.channelType" placeholder="请选择渠道类型" :disabled="form.disabled">
                        <el-option v-for="(item, index) in channelTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="产品类型" prop="productCode">
                    <el-select v-model="form.productCode" placeholder="请选择产品类型" :disabled="form.disabled">
                        <el-option v-for="(item, index) in productCodeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="网关分组" prop="gatewayGroup">
                    <el-input v-model="form.gatewayGroup" placeholder="请输入网关分组" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="渠道商户号" prop="channelMerId">
                    <el-input v-model="form.channelMerId" placeholder="请输入渠道商户号" :disabled="form.disabled"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="账户号" prop="accountNo">
                    <el-input v-model="form.accountNo" placeholder="请输入账户号" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="账户名" prop="accountName">
                    <el-input v-model="form.accountName" placeholder="请输入账户名" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="签名方式" prop="signType">
                    <el-select v-model="form.signType" placeholder="请选择签名方式" :disabled="form.disabled">
                        <el-option v-for="(item, index) in signTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="证书路径" prop="certPath">
                    <el-input v-model="form.certPath" placeholder="请输入证书路径" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="证书密码" prop="certPwd">
                    <el-input v-model="form.certPwd" placeholder="请输入证书密码" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="密钥" prop="secretKey">
                    <el-input v-model="form.secretKey" placeholder="请输入密钥" :disabled="form.disabled"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="渠道公钥" prop="channelPubKey">
                    <el-input v-model="form.channelPubKey" placeholder="请输入渠道公钥" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="转折公钥" prop="pubKey">
                    <el-input v-model="form.pubKey" placeholder="请输入转折公钥" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="转折私钥" prop="prvKey">
                    <el-input v-model="form.prvKey" placeholder="请输入转折私钥" :disabled="form.disabled"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="appid" prop="channelAppid">
                    <el-input v-model="form.channelAppid" placeholder="请输入appid" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="渠道日限额" prop="dayMaxAmount">
                    <el-input type="number" v-model="form.dayMaxAmount" placeholder="请输入渠道日限额" :disabled="form.disabled">
                      <el-button slot="append">分</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="渠道费率类型" prop="rateType">
                    <el-select v-model="form.rateType" placeholder="请选择渠道费率类型" :disabled="form.disabled">
                        <el-option v-for="(item, index) in rateTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="渠道费率" prop="rate">
                    <el-input v-model="form.rate" placeholder="请输入渠道费率" :disabled="form.disabled">
                      <el-button slot="append">{{form.rateType === '1' ? '元' : '分'}}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="渠道排序" prop="sort">
                    <el-input v-model="form.sort" placeholder="请输入渠道排序" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="结算方式" prop="settleType">
                    <el-select v-model="form.settleType" placeholder="请选择结算方式" :disabled="form.disabled">
                        <el-option v-for="(item, index) in settleTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="结算时间" prop="settleTime">
                    <el-time-picker
                      :disabled="form.disabled"
                      v-model="form.settleTime"
                      value-format="HH:mm:ss"
                      placeholder="请选择结算时间">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="渠道交易时间" prop="allowTradeTime">
                    <el-input v-model="form.allowTradeTime" placeholder="请输入渠道交易时间" :disabled="form.disabled"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择状态" :disabled="form.disabled">
                      <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="formClose">{{form.disabled ? '确 定' : '取 消'}}</el-button>
        <el-button size="small" v-if="!form.disabled" type="primary" @click="formSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { axiosMixin, listMixin } from "static/js/mixin.js";
import { getStatusName } from "static/js/cache.js";
import _router from "service/router-service.js";
import _common from "service/common-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    const checkSettleTime = (rule, value, callback) => {
      if (this.form.settleType === "T1" && value === "") {
        callback(new Error("结算方式为T1时，必须输入结算时间"));
      }
      if (this.form.settleType === "D0" && value !== "") {
        callback(new Error("结算方式为D0时，不必输入结算时间"));
      }
      callback();
    };
    return {
      searchForm: {},
      searchRules: {},
      form: {},
      rules: {
        channelCode: [
          { required: true, message: "请输入渠道编码", trigger: "blur" },
          { max: 8, message: "渠道编码最多8位", trigger: "change" }
        ],
        channelName: [
          { required: true, message: "请输入渠道名称", trigger: "blur" }
        ],
        channelType: [
          { required: true, message: "请选择渠道类型", trigger: "blur" }
        ],
        productCode: [
          { required: true, message: "请选择产品类型", trigger: "blur" }
        ],
        gatewayGroup: [
          { required: true, message: "请输入网关分组", trigger: "blur" }
        ],
        channelMerId: [
          { required: true, message: "请输入渠道商户号", trigger: "blur" }
        ],
        accountNo: [
          { required: true, message: "请输入账户号", trigger: "blur" }
        ],
        accountName: [
          { required: true, message: "请输入账户名", trigger: "blur" }
        ],
        signType: [
          { required: true, message: "请选择签名方式", trigger: "blur" }
        ],
        certPath: [
          { required: true, message: "请输入证书路径", trigger: "blur" }
        ],
        certPwd: [
          { required: true, message: "请输入证书密码", trigger: "blur" }
        ],
        secretKey: [{ required: true, message: "请输入密钥", trigger: "blur" }],
        channelPubKey: [
          { required: true, message: "请输入渠道公钥", trigger: "blur" }
        ],
        pubKey: [
          { required: true, message: "请输入转折公钥", trigger: "blur" }
        ],
        prvKey: [
          { required: true, message: "请输入转折私钥", trigger: "blur" }
        ],
        channelAppid: [
          { required: true, message: "请输入appid", trigger: "blur" }
        ],
        allowTradeTime: [
          { required: true, message: "请输入渠道交易时间", trigger: "blur" }
        ],
        dayMaxAmount: [
          { required: true, message: "请输入渠道日限额", trigger: "blur" }
        ],
        rate: [{ required: true, message: "请输入费率", trigger: "blur" }],
        rateType: [
          { required: true, message: "请选择费率类型", trigger: "blur" }
        ],
        settleType: [
          { required: true, message: "请选择结算方式", trigger: "blur" }
        ],
        settleTime: [{ validator: checkSettleTime, trigger: "blur" }],
        sort: [{ required: true, message: "请输入渠道排序", trigger: "blur" }],
        status: [{ required: true, message: "请选择渠道状态", trigger: "blur" }]
      },
      productCodeList: [],
      channelTypeList: [],
      rateTypeList: [],
      settleTypeList: [],
      signTypeList: []
    };
  },
  methods: {
    init() {
      this.initPageRight("路由管理", "渠道列表");
      this._renderTableDate();
      this.getProductCodeList();
      this.getChannelTypeList();
      this.getRateTypeList();
      this.getSettleTypeList();
      this.getSignTypeList();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "查询" && item.status === "VALID") {
          this.pageRight.search = true;
        }
        if (item.funcName === "添加渠道" && item.status === "VALID") {
          this.pageRight.add = true;
        }
        if (item.funcName === "详情" && item.status === "VALID") {
          this.pageRight.detail = true;
        }
        if (item.funcName === "修改" && item.status === "VALID") {
          this.pageRight.update = true;
        }
        if (item.funcName === "查看支持的银行列表" && item.status === "VALID") {
          this.pageRight.bankList = true;
        }
      });
      const pageRight = this.pageRight;
      if (pageRight.detail || pageRight.bankList || pageRight.update) {
        this.pageRight.operate = true;
      }
    },
    // 获取渠道列表
    _renderTableDate(data) {
      this.loading = true;
      _router.getChannelList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            channelId: item.channelId,
            channelCode: item.channelCode,
            channelName: item.channelName,
            channelType: item.channelType,
            channelTypeName: item.channelTypeName,
            productCode: item.productCode,
            productName: item.productName,
            gatewayGroup: item.gatewayGroup,
            sort: item.sort,
            allowTradeTime: item.allowTradeTime,
            dayMaxAmount: item.dayMaxAmount,
            status: item.status,
            statusDesc: getStatusName(item.status),
            createTime: item.createTime,
            updateTime: item.modifiedTime,
            operate: {
              update: true
            }
          };
        });
      });
    },
    // 获取产品类型
    getProductCodeList() {
      _common.getDictionaryList("PRODUCT_CODE").then(res => {
        this.filterAxios(res, res => {
          this.productCodeList = res;
        });
      });
    },
    // 获取渠道类型
    getChannelTypeList() {
      _common.getDictionaryList("CHANNEL_TYPE").then(res => {
        this.filterAxios(res, res => {
          this.channelTypeList = res;
        });
      });
    },
    // 获取费率类型
    getRateTypeList() {
      _common.getDictionaryList("PROD_RATE_TYPE").then(res => {
        this.filterAxios(res, res => {
          this.rateTypeList = res;
        });
      });
    },
    // 获取结算类型
    getSettleTypeList() {
      _common.getDictionaryList("SETTLE_TYPE").then(res => {
        this.filterAxios(res, res => {
          this.settleTypeList = res;
        });
      });
    },
    // 获取签名方式类型
    getSignTypeList() {
      _common.getDictionaryList("SIGN_TYPE").then(res => {
        this.filterAxios(res, res => {
          this.signTypeList = res;
        });
      });
    },
    // 查询
    searchSubmit(searchForm) {
      this.$refs[searchForm].validate(valid => {
        if (valid) {
          this._renderTableDate(this.$refs[searchForm].model);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加 修改
    handleForm(row, type) {
      if (row instanceof Object) {
        this.getChannelDetail(row.channelId, type);
      } else {
        this.form = {
          title: "添加"
        };
      }
      this.addShow = true;
    },
    // 获取渠道详情
    getChannelDetail(channelId, type) {
      _router.getChannelDetail(channelId).then(res => {
        this.filterAxios(res, res => {
          this.form = {
            channelId: channelId,
            channelCode: res.channelCode,
            channelName: res.channelName,
            channelType: res.channelType,
            productCode: res.productCode,
            productName: res.productName,
            gatewayGroup: res.gatewayGroup,
            channelMerId: res.channelMerId,
            signType: res.signType,
            accountName: res.accountName,
            accountNo: res.accountNo,
            certPwd: res.certPwd,
            certPath: res.certPath,
            secretKey: res.secretKey,
            channelPubKey: res.channelPubKey,
            pubKey: res.pubKey,
            prvKey: res.prvKey,
            channelAppid: res.channelAppid,
            allowTradeTime: res.allowTradeTime,
            dayMaxAmount: res.dayMaxAmount,
            rate: res.rate,
            rateType: res.rateType,
            settleType: res.settleType,
            settleTime: res.settleTime,
            sort: res.sort,
            status: res.status
          };
          if (type === "修改") {
            this.form.title = "修改";
            this.form.disabled = false;
          } else if (type === "详情") {
            this.form.title = "详情";
            this.form.disabled = true;
          }
        });
      });
    },
    formClose() {
      this.addShow = false;
      this.form = {};
      this.$refs["form"] && this.$refs["form"].resetFields();
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          delete this.form.disabled;
          if (this.form.title === "添加") {
            delete this.form.title;
            _router.addChannel(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.title;
            _router.updateChannel(this.form.channelId, this.form).then(res => {
              this.formatResult(res, "修改成功");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    formatResult(res, msg) {
      this.formClose();
      this.filterAxios(res, res => {
        this.successTips(msg);
        this._renderTableDate();
      });
    },
    // 查看支持银行列表
    handleSupportBankList(channelId, channelName) {
      this.$router.push({
        path: "/channel_support_bank",
        query: {
          channelId: channelId,
          channelName: channelName
        }
      });
    }
  }
};
</script>