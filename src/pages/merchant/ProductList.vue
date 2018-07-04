<template>
  <div class="container">
    <div class="header clearfix">
      <v-back path="back"/>
      <h2>产品列表</h2>
    </div>
    <!-- 搜索 -->
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
             <el-form-item label="状态" prop="status">
                <el-select v-model="searchForm.status" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <div class="table-btn" v-if="pageRight.add">
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
        <el-table-column align="center" prop="merchantName" label="商户名称" fixed min-width="100"></el-table-column>
        <el-table-column align="center" prop="productName" label="产品名称" fixed min-width="100"></el-table-column>
        <el-table-column align="center" prop="rateTypeDesc" label="产品费率类型" min-width="140"></el-table-column>
        <el-table-column align="center" prop="rateDesc" label="产品费率" min-width="70"></el-table-column>
        <template v-if="merchantInfo.agentMerchantName">
          <el-table-column align="center" prop="merchantAgentName" label="代理商名称" min-width="84"></el-table-column>
          <el-table-column align="center" prop="merchantAgentRateTypeDesc" label="代理商费率类型" min-width="140"></el-table-column>
          <el-table-column align="center" prop="merchantAgentRateDesc" label="代理商费率" min-width="100"></el-table-column>
        </template>
        <el-table-column align="center" prop="statusDesc" label="状态" min-width="100"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" min-width="160"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" min-width="160"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" min-width="100" fixed="right" v-if="pageRight.update">
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
          <el-form-item label="代理商名称" v-if="merchantInfo.agentMerchantName">
            <el-input v-model="merchantInfo.agentMerchantName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品" prop="productValue">
            <el-select v-model="form.productValue" placeholder="请选择产品" @change="handleProductCodeChange">
              <el-option v-for="(item, index) in selectProductList" :key="index" :label="item.dicName" :value="item.value || item.dicCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="费率类型" prop="rateType">
            <el-select v-model="form.rateType" :placeholder="this.merchantInfo.agentMerchantName ? '' : '请选择费率类型'" :disabled="this.merchantInfo.agentMerchantName ? true : false">
              <el-option v-for="(item, index) in rateTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="费率" prop="rate">
            <el-input type="number" v-model="form.rate" placeholder="请输入费率">
              <el-button slot="append">{{form.rateType === '1' ? '元' : '分'}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="代理商费率" v-if="merchantInfo.agentMerchantName">
            <el-input type="number" v-model="form.merchantAgentRate" :disabled="true">
              <el-button slot="append">{{form.rateType === '1' ? '元' : '分'}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
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
import vBack from "components/Back.vue";
import { axiosMixin, listMixin } from "static/js/mixin.js";
import { getStatusName } from "static/js/cache.js";
import _product from "service/product-service.js";
import _common from "service/common-service.js";
import { computedRateDesc } from "static/js/format.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    const checkRate = (rule, value, callback) => {
      if (
        this.merchantInfo.agentMerchantName &&
        this.form.merchantAgentRate < value
      ) {
        callback(new Error("费率须小于代理商费率"));
      }
      if (value < 0) {
        callback(new Error("费率不得小于0"));
      }
      callback();
    };
    return {
      merchantInfo: {},
      searchForm: {
        merchantId: "",
        status: ""
      },
      rules: {
        productValue: [
          { required: true, message: "请选择产品", trigger: "blur" }
        ],
        // rateType: [
        //   { required: true, message: "请选择费率类型", trigger: "blur" }
        // ],
        rate: [
          { required: true, message: "请输入费率", trigger: "blur" },
          { validator: checkRate, trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      form: {
        formTitle: "添加"
      },
      selectProductList: [],
      rateTypeList: []
    };
  },
  methods: {
    init() {
      this.initPageRight("商户管理", "商户列表");
      this.merchantInfo = this.$route.query;
      this.searchForm.merchantId = this.merchantInfo.merchantId;
      this.getProductList();
      this.getRateTypeList().then(res => {
        this._renderTableDate({ merchantId: this.merchantInfo.merchantId });
      });
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "产品查询" && item.status === "VALID") {
          this.pageRight.search = true;
        }
        if (item.funcName === "产品-添加" && item.status === "VALID") {
          this.pageRight.add = true;
        }
        if (item.funcName === "产品-修改" && item.status === "VALID") {
          this.pageRight.update = true;
        }
      });
    },
    // 获取产品列表
    _renderTableDate(data) {
      this.loading = true;
      _product.getList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          const typeDescList = this.rateTypeList.map(item => item.dicName);
          return {
            no: index + 1,
            id: item.id,
            merchantId: item.merchantId,
            merchantName: item.merchantName,
            productCode: item.productCode,
            productName: item.productName,
            rateType: item.rateType,
            rateTypeDesc: typeDescList[item.rateType - 1],
            rate: item.rate || "",
            rateDesc: computedRateDesc(item.rate, item.rateType),
            merchantAgentName: item.merchantAgentName,
            merchantAgentRateType: item.merchantAgentRateType,
            merchantAgentRateTypeDesc:
              typeDescList[item.merchantAgentRateType - 1],
            merchantAgentRate: item.merchantAgentRate || "",
            merchantAgentRateDesc: computedRateDesc(item.merchantAgentRate, item.merchantAgentRateType),
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
    // 查询
    searchSubmit(searchForm) {
      this._renderTableDate(this.$refs[searchForm].model);
    },
    formClose() {
      this.addShow = false;
      this.form = {};
      this.$refs["form"] && this.$refs["form"].resetFields();
    },
    // 添加 修改
    handleForm(row) {
      if (row instanceof Object) {
        this.form = {
          formTitle: "修改",
          id: row.id,
          merchantId: row.merchantId,
          merchantName: row.merchantName,
          merchantAgentName: row.merchantAgentName,
          merchantAgentRate: row.merchantAgentRate,
          productCode: row.productCode,
          productValue: this.merchantInfo.agentMerchantName
            ? (row.productCode + "-" + row.merchantAgentRate + "-" + row.rateType)
            : row.productCode,
          rateType: row.rateType,
          rate: row.rate,
          status: row.status
        };
      } else {
        this.form = {
          formTitle: "添加",
          merchantId: this.merchantInfo.merchantId,
          merchantName: this.merchantInfo.merchantName,
          agentMerchantName: this.merchantInfo.agentMerchantName
        };
      }
      console.log('form', this.form);
      this.addShow = true;
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          delete this.form.merchantName;
          delete this.form.agentName;
          if (this.form.formTitle === "添加") {
            delete this.form.formTitle;
            delete this.form.merchantName;
            delete this.form.agentMerchantName;
            delete this.form.merchantAgentRate;
            delete this.form.merchantAgentRateType;
            _product.add(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.formTitle;
            delete this.form.merchantId;
            _product.update(this.form.id, this.form).then(res => {
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
      const _this = this;
      _this.formClose();
      _this.filterAxios(res, res => {
        _this.successTips(msg);
        _this._renderTableDate({ merchantId: this.merchantInfo.merchantId });
      });
    },
    // 获取可选择产品列表
    getProductList() {
      // 如果有代理商，可选择的产品列表为代理商已有的
      if (this.merchantInfo.agentMerchantName) {
        _product.getAgentProductList(this.merchantInfo.merchantId).then(res => {
          this.filterAxios(res, res => {
            res.map(item => {
              this.selectProductList.push({
                ...item,
                value:
                  item.dicCode +
                  "-" +
                  item.merchantAgentRate +
                  "-" +
                  item.merchantAgentRateType
              });
            });
          });
        });
      } else {
        // 没有代理商，字典表里所有产品均可选择
        _common.getDictionaryList("PRODUCT_CODE").then(res => {
          this.filterAxios(res, res => {
            this.selectProductList = res;
          });
        });
      }
    },
    // 获取可选择费率类型列表
    getRateTypeList() {
      return _common.getDictionaryList("PROD_RATE_TYPE").then(res => {
        this.filterAxios(res, res => {
          this.rateTypeList = res;
        });
      });
    },
    // 根据商户号和产品code查询费率类型
    handleProductCodeChange() {
      // 有代理商的时候查询代理商费率
      if (this.merchantInfo.agentMerchantName) {
        const productValueList = this.form.productValue.split("-");
        this.form.productCode = productValueList[0];
        this.form.merchantAgentRate = productValueList[1];
        this.form.rateType = productValueList[2];
      } else {
        this.form.productCode = this.form.productValue;
      }
    }
  },
  components: {
    vBack
  }
};
</script>