<template>
  <div class="container">
    <div class="header clearfix">
      <h2>产品列表</h2>
    </div>
    <div class="operating">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
             <el-form-item label="状态" prop="status">
                <el-select v-model="searchForm.status" placeholder="请选择">
                    <el-option label="正常" value="VALID"></el-option>
                    <el-option label="失效" value="INVALID"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <div class="table-btn">
            <el-button size="mini" type="success" @click="handleForm('add')">添加</el-button>
        </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="merchantId" label="商户号" fixed></el-table-column>
        <el-table-column align="center" prop="merchantName" label="商户名称"></el-table-column>
        <el-table-column align="center" prop="productName" label="产品名称" width="150"></el-table-column>
        <el-table-column align="center" prop="rateTypeDesc" label="产品费率类型" width="94"></el-table-column>
        <el-table-column align="center" prop="rateDesc" label="产品费率" width="70"></el-table-column>
        <el-table-column align="center" prop="agentName" label="代理商名称" width="84"></el-table-column>
        <el-table-column align="center" prop="agentRateType" label="代理商费率类型" width="110"></el-table-column>
        <el-table-column align="center" prop="agentRate" label="代理商费率" width="100"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="100"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="160"></el-table-column>
        <el-table-column align="center" prop="createTime" label="修改时间" width="160"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="100" fixed="right">
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
      :title="form.formTitle"
      width="30%"
      :before-close="addClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="105px">
          <el-form-item label="商户号">
            <el-input v-model="form.merchantId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商户名称">
            <el-input v-model="form.merchantName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="代理商名称">
            <el-input v-model="form.agentName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品" prop="productCode">
            <el-select v-model="form.productCode" placeholder="请选择产品">
                <el-option v-for="(item, index) in selectProductList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="rateType">
            <el-select v-model="form.rateType" placeholder="请选择类型">
                <el-option v-for="(item, index) in selectTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理商费率" prop="rate">
            <el-input type="number" v-model="form.rate" placeholder="请输入代理商费率"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option label="有效" value="VALID"></el-option>
                  <el-option label="无效" value="INVALID"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="formSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { axiosMixin, listMixin, validMixin } from "static/js/mixin.js";
import { formatDate } from "static/js/format.js";
import _product from "service/product-service.js";
export default {
  mixins: [axiosMixin, listMixin, validMixin],
  data() {
    return {
      storeInfo: {},
      searchForm: {
        merchantId: "",
        status: ""
      },
      rules: {
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
      form: {
        formTitle: "添加"
      },
      selectProductList: [],
      selectTypeList: []
    };
  },
  created() {
    this.storeInfo = this.$route.query;
    this.searchForm.merchantId = this.storeInfo.merchantId;
    this._renderTableDate({ merchantId: this.storeInfo.merchantId });
    this.getProductAndTypeList();
  },
  methods: {
    // 获取产品列表
    _renderTableDate(data) {
      const _this = this;
      _this.loading = true;
      _product.getList(data).then(res => {
        _this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            id: item.id,
            merchantId: item.merchantId,
            merchantName: item.merchantName,
            productCode: item.productCode,
            productName: item.productName,
            rateType: item.rateType,
            rateTypeDesc: item.rateTypeDesc,
            rate: item.rate,
            rateDesc: item.rate + (item.rateType === "1" ? "元" : ''),
            agentName: item.agentName,
            agentRateType: item.agentRateType,
            agentRate: item.agentRate,
            status: item.status === "VALID" ? "生效" : "失效",
            createTime: formatDate(item.createTime),
            updateTime: formatDate(item.modifiedTime),
            operate: {
              update: true
            }
          };
        });
      });
    },
    // 查询
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
    formClose() {
      this.addShow = false;
      this.form = {};
      this.$refs["form"] && this.$refs["form"].resetFields();
    },
    // 添加 修改
    handleForm(row) {
      const _this = this;
      if (row instanceof Object) {
        _this.form = {
          formTitle: "修改",
          id: row.id,
          merchantId: row.merchantId,
          merchantName: row.merchantName,
          agentName: row.agentName,
          productCode: row.productCode,
          rateTypeCode: row.rateTypeCode,
          rateType: row.rateType,
          rate: row.rate,
          status: row.status === "生效" ? "VALID" : "INVALID"
        };
      } else {
        _this.form = {
          formTitle: "添加",
          merchantId: _this.storeInfo.merchantId,
          merchantName: _this.storeInfo.merchantName,
          agentName: _this.storeInfo.agentName
        };
      }
      _this.addShow = true;
    },
    formSubmit() {
      const _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          delete _this.form.merchantName;
          delete _this.form.agentName;
          if (_this.form.formTitle === "添加") {
            delete _this.form.formTitle;
            _product.add(_this.form).then(res => {
              _this.formatResult(res, "添加成功");
            });
          } else {
            delete _this.form.formTitle;
            delete _this.form.merchantId;
            _product.update(_this.form).then(res => {
              _this.formatResult(res, "修改成功");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    formatResult(res, msg) {
      const _this = this;
      _this.formClose();
      _this.filterAxios(res, res => {
        _this.successTips(msg);
        _this._renderTableDate({ merchantId: this.storeInfo.merchantId });
      });
    },
    // 获取可选择产品和类型列表
    getProductAndTypeList() {
      const _this = this;
      _product
        .getProductAndTypeList({ merchantId: _this.merchantId })
        .then(res => {
          _this.filterAxios(res, res => {
            _this.selectProductList = res.PRODUCT_CODE;
            _this.selectTypeList = res.PROD_RATE_TYPE;
          });
        });
    }
  }
};
</script>