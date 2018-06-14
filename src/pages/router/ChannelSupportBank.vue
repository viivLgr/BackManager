<template>
  <div class="container">
    <div class="header clearfix">
      <v-back path="back"/>
      <h2>渠道支持银行列表</h2>
    </div>
    <div class="operating">
        <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="银行编码" prop="bankCode">
                <el-input v-model="searchForm.bankCode" placeholder="请输入银行编码"></el-input>
            </el-form-item>
            <el-form-item label="银行名称" prop="bankName">
                <el-input v-model="searchForm.bankName" placeholder="请输入银行名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <div class="table-btn">
            <el-button size="mini" type="success" @click="handleForm()">添加</el-button>
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
        <el-table-column align="center" prop="bankCode" label="银行编码" fixed></el-table-column>
        <el-table-column align="center" prop="bankName" label="银行名称" fixed></el-table-column>
        <el-table-column align="center" prop="bankShortName" label="简称"></el-table-column>
        <el-table-column align="center" prop="bankShortNameEn" label="英文简称"></el-table-column>
        <el-table-column align="center" prop="supportiveBankTypeName" label="支持银行卡类型" width="120"></el-table-column>
        <el-table-column align="center" prop="bankBranchId" label="联行号" width="150"></el-table-column>
        <el-table-column align="center" prop="singleMinAmount" label="单笔最低金额(单位:分)" width="140"></el-table-column>
        <el-table-column align="center" prop="singleMaxAmount" label="单笔最高金额(单位:分)" width="140"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="150"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" width="150"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operate.update" @click="handleForm(scope.row)" type="warning" size="mini">修改</el-button>
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
    <el-dialog
      v-show="addShow"
      :visible.sync="addShow"
      :title="form.title"
      width="30%"
      :before-close="formClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" size="small" label-width="110px">
          <el-form-item label="渠道编码">
            <el-input v-model="form.channelId" placeholder="请输入渠道编码" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="渠道名称">
            <el-input v-model="form.channelName" placeholder="请输入渠道名称" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="银行">
              <el-select v-model="form.bankListId" placeholder="请选择银行">
                  <el-option v-for="(item, index) in bankList" :key="index" :label="item.bankName" :value="item.bankListId"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="单笔最低限额">
            <el-input v-model="form.singleMinAmount" placeholder="请输入单笔最低限额">
              <el-button slot="append">分</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="单笔最高限额">
            <el-input v-model="form.singleMaxAmount" placeholder="请输入单笔最高限额">
              <el-button slot="append">分</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="支持银行卡类型">
              <el-select v-model="form.supportiveBankType" placeholder="请选择银行卡类型">
                  <el-option v-for="(item, index) in cardTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="formClose">取 消</el-button>
        <el-button size="small" type="primary" @click="formSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import vBack from "components/Back.vue";
import { axiosMixin, listMixin } from "static/js/mixin.js";
import _router from "service/router-service.js";
import _common from "service/common-service.js";
import { computedStatusDesc, computedStatus } from "static/js/format.js";
export default {
  mixins: [axiosMixin, listMixin],
  components: {
    vBack
  },
  data() {
    return {
      searchForm: {
        bankCode: "",
        bankName: ""
      },
      form: {},
      bankList: [],
      cardTypeList: [],
      rules: {
        bankCode: [
          { required: false, message: "请输入银行编码", trigger: "blur" }
        ],
        bankName: [
          {
            required: false,
            message: "请输入银行名称(支持模糊查询)",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.searchForm.channelId = this.$route.query.channelId;
    this.searchForm.channelName = this.$route.query.channelName;
    this._renderTableDate({ channelId: this.searchForm.channelId });
  },
  methods: {
    // 获取渠道列表
    _renderTableDate(data) {
      const _this = this;
      _this.loading = true;
      _router.getSupportBankList(data).then(res => {
        _this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            id: item.id,
            channelId: this.searchForm.channelId,
            channelCode: item.channelCode,
            channelName: item.channelName,
            bankListId: item.bankListId,
            bankCode: item.bankCode,
            bankName: item.bankName,
            bankShortName: item.bankShortName,
            bankShortNameEn: item.bankShortNameEn,
            supportiveBankType: item.supportiveBankType,
            supportiveBankTypeName: item.supportiveBankTypeName,
            bankBranchId: item.bankBranchId,
            singleMinAmount: item.singleMinAmount,
            singleMaxAmount: item.singleMaxAmount,
            status: computedStatusDesc(item.status),
            createTime: item.createTime,
            updateTime: item.modifiedTime,
            operate: {
              update: true
            }
          };
        });
      });
    },
    // 查询卡类型
    getCardType() {
      const _this = this;
      _common.getDictionaryList("CARD_TYPE").then(res => {
        _this.filterAxios(res, res => {
          _this.cardTypeList = res;
        });
      });
    },
    // 添加时获取银行列表
    getValidBankList() {
      return _router.getValidBankList(this.searchForm.channelId).then(res => {
        this.filterAxios(res, res => {
          if (res === undefined) {
            this.errorTips("没有可添加的银行");
            this.bankList = [];
            return;
          }
          this.bankList = res;
        });
      });
    },
    // 修改时获取银行列表
    getAllBankList() {
      return _router.getBankList().then(res => {
        this.filterAxios(res, res => {
          this.bankList = [];
          res.list.map(item => {
            this.bankList.push({
              bankListId: item.bankListId,
              bankName: item.bankName
            });
          });
        });
      });
    },
    searchSubmit(searchForm) {
      const _this = this;
      this.$refs[searchForm].validate(valid => {
        if (valid) {
          _this._renderTableDate(_this.$refs[searchForm].model);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加 修改
    handleForm(row) {
      if (!this.cardTypeList.length) {
        this.getCardType();
      }
      if (row instanceof Object) {
        this.getAllBankList().then(res => {
          this.form = {
            title: "修改",
            id: row.id,
            channelId: row.channelId,
            channelName: row.channelName,
            bankListId: +row.bankListId,
            singleMinAmount: row.singleMinAmount,
            singleMaxAmount: row.singleMaxAmount,
            supportiveBankType: row.supportiveBankType,
            status: computedStatus(row.status)
          };
          if (this.bankList.length > 0) this.addShow = true;
        });
      } else {
        this.getValidBankList().then(res => {
          this.form = {
            title: "添加",
            channelId: this.searchForm.channelId,
            channelName: this.searchForm.channelName
          };
          if (this.bankList.length > 0) this.addShow = true;
        });
      }
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
          delete this.form.channelName;
          if (this.form.title === "添加") {
            delete this.form.title;
            _router.addSupportBankList(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.title;
            delete this.form.channelId;
            _router.updateSupportBankList(this.form.id, this.form).then(res => {
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
        this._renderTableDate({ channelId: this.searchForm.channelId });
      });
    }
  }
};
</script>