<template>
  <div class="container">
    <div class="header clearfix">
      <h2>交易列表</h2>
    </div>
    <!-- 搜索 -->
    <div class="detail-input" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini" label-width="84px">
            <div class="row">
                <el-form-item label="商户号">
                    <el-input v-model="searchForm.merchantId" placeholder="请输入商户号"></el-input>
                </el-form-item>
                <el-form-item label="商户名称">
                    <el-input v-model="searchForm.merchantName" placeholder="请输入商户名称"></el-input>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="searchForm.orderId" placeholder="请输入订单号"></el-input>
                </el-form-item>
                <el-form-item label="商户订单号">
                    <el-input v-model="searchForm.orderNo" placeholder="请输入商户订单"></el-input>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="交易时间">
                    <el-date-picker
                    v-model="searchForm.tradeTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="交易状态">
                    <el-select v-model="searchForm.status" placeholder="请选择交易状态">
                        <el-option value="">全部</el-option>
                        <el-option v-for="(item, index) in tradeStatusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易类型">
                    <el-select v-model="searchForm.tradeType" placeholder="请选择交易类型">
                        <el-option value="">全部</el-option>
                        <el-option v-for="(item, index) in tradeTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付产品">
                    <el-select v-model="searchForm.productCode" placeholder="请选择支付产品">
                        <el-option value="">全部</el-option>
                        <el-option v-for="(item, index) in productCodeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="渠道编码">
                    <el-input v-model="searchForm.channelCode" placeholder="请输入渠道编码"></el-input>
                </el-form-item>
                <el-form-item label="渠道名称">
                    <el-input v-model="searchForm.channelName" placeholder="请输入渠道名称"></el-input>
                </el-form-item>
                <el-form-item label="收款人姓名">
                    <el-input v-model="searchForm.payeeName" placeholder="请输入收款人姓名"></el-input>
                </el-form-item>
                <el-form-item label="付款人姓名">
                    <el-input v-model="searchForm.payerName" placeholder="请输入付款人姓名"></el-input>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="银行卡号">
                    <el-input v-model="searchForm.payerAccount" placeholder="请输入银行卡号"></el-input>
                </el-form-item>
                <el-form-item class="btn-item">
                    <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
                </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
            </div>
        </el-form>
    </div>
    <!-- 内容 -->
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="merchantId" label="商户号" fixed min-width="120"></el-table-column>
        <el-table-column align="center" prop="merchantName" label="商户名称" fixed></el-table-column>
        <el-table-column align="center" prop="orderId" label="订单号" fixed min-width="160"></el-table-column>
        <el-table-column align="center" prop="orderNo" label="商户订单号" min-width="170"></el-table-column>
        <el-table-column align="center" prop="tradeTypeName" label="交易类型"></el-table-column>
        <el-table-column align="center" prop="productName" label="支付产品"></el-table-column>
        <el-table-column align="center" prop="channelName" label="渠道名称" min-width="150"></el-table-column>
        <el-table-column align="center" prop="payAmount" label="交易金额(单位:分)" min-width="150"></el-table-column>
        <el-table-column align="center" prop="fee" label="手续费(单位:分)" min-width="120"></el-table-column>
        <el-table-column align="center" prop="statusName" label="交易状态"></el-table-column>
        <el-table-column align="center" prop="payerName" label="付款人姓名" min-width="100"></el-table-column>
        <el-table-column align="center" prop="payeeName" label="收款人姓名" min-width="100"></el-table-column>
        <el-table-column align="center" prop="payerAccount" label="银行卡号" min-width="100"></el-table-column>
        <el-table-column align="center" prop="createTime" label="交易创建时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="completeTime" label="交易完成时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" fixed="right" v-if="pageRight.detail">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="warning" size="mini">详情</el-button>
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
    <!-- 详情 -->
    <el-dialog
      v-show="detailShow"
      :visible.sync="detailShow"
      title="交易详情"
      width="66vw"
      :before-close="detailClose"
      center
      >
      <div class="detail-input">
        <el-form :inline="true" ref="detailForm" :model="detailForm" size="mini" label-width="105px">
            <div class="row">
                <el-form-item label="商户号">
                    <el-input v-model="detailForm.merchantId" readonly></el-input>
                </el-form-item>
                <el-form-item label="商户名称">
                    <el-input v-model="detailForm.merchantName" readonly></el-input>
                </el-form-item>
                <el-form-item label="商户费率">
                    <el-input v-model="detailForm.merchantRate" readonly>
                        <el-button slot="append">分</el-button>
                    </el-input>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="渠道编码">
                    <el-input v-model="detailForm.channelCode" readonly></el-input>
                </el-form-item>
                <el-form-item label="渠道名称">
                    <el-input v-model="detailForm.channelName" readonly></el-input>
                </el-form-item>
                <el-form-item label="渠道费率">
                    <el-input v-model="detailForm.channelRate" readonly>
                        <el-button slot="append">分</el-button>
                    </el-input>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="订单号">
                    <el-input v-model="detailForm.orderId" readonly></el-input>
                </el-form-item>
                <el-form-item label="商户订单号">
                    <el-input v-model="detailForm.orderNo" readonly></el-input>
                </el-form-item>
                <el-form-item label="渠道订单号">
                    <el-input v-model="detailForm.sendChannelOrderNo" readonly></el-input>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="订单类型">
                    <el-input v-model="detailForm.tradeTypeName" readonly></el-input>
                </el-form-item>
                <el-form-item label="支付产品">
                    <el-input v-model="detailForm.productName" readonly></el-input>
                </el-form-item>
                <el-form-item label="交易状态">
                    <el-input v-model="detailForm.statusName" readonly></el-input>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="交易总金额">
                    <el-input v-model="detailForm.totalAmount" readonly>
                        <el-button slot="append">分</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="实际金额">
                    <el-input v-model="detailForm.payAmount" readonly>
                        <el-button slot="append">分</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="手续费">
                    <el-input v-model="detailForm.fee" readonly>
                        <el-button slot="append">分</el-button>
                    </el-input>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="交易发生时间">
                    <el-input v-model="detailForm.createTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="发送渠道时间">
                    <el-input v-model="detailForm.sendChannelTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="交易完成时间">
                    <el-input v-model="detailForm.completeTime" readonly></el-input>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="收款人姓名">
                    <el-input v-model="detailForm.payeeName" readonly></el-input>
                </el-form-item>
                <el-form-item label="付款人姓名">
                    <el-input v-model="detailForm.payerName" readonly></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input v-model="detailForm.payerAccount" readonly></el-input>
                </el-form-item>
            </div>
            <div class="row">
                <el-form-item label="分润人姓名">
                    <el-input v-model="detailForm.profitName" readonly></el-input>
                </el-form-item>
                <el-form-item label="分润人金额">
                    <el-input v-model="detailForm.profitAmount" readonly>
                        <el-button slot="append">分</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item></el-form-item>
            </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="detailShow = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { axiosMixin, listMixin } from "static/js/mixin.js";
import _trade from "service/trade-service.js";
import _common from "service/common-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      detailShow: false,
      detailForm: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchForm: {},
      tableData: [],
      productCodeList: [],
      tradeStatusList: [],
      tradeTypeList: []
    };
  },
  methods: {
    init() {
      this.initPageRight("交易管理", "交易列表");
      this._renderTableDate();
      this.getProductCodeList();
      this.getTradeStatusList();
      this.getTradeTypeList();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "搜索" && item.status === "VALID") {
          this.pageRight.search = true;
        }
        if (item.funcName === "交易详情" && item.status === "VALID") {
          this.pageRight.detail = true;
        }
      });
    },
    // 获取交易列表
    _renderTableDate(data) {
      this.loading = true;
      _trade.getList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            merchantId: item.merchantId,
            merchantName: item.merchantName,
            orderId: item.orderId,
            orderNo: item.orderNo,
            tradeTypeName: item.tradeTypeName,
            productName: item.productName,
            channelName: item.channelName,
            payAmount: item.payAmount,
            fee: item.fee,
            statusName: item.statusName,
            payerName: item.payerName,
            payeeName: item.payeeName,
            payerAccount: item.payerAccount,
            createTime: item.createTime,
            completeTime: item.completeTime
          };
        });
      });
    },
    // 获取产品编码
    getProductCodeList() {
      _common.getDictionaryList("PRODUCT_CODE").then(res => {
        this.filterAxios(res, res => {
          this.productCodeList = res;
        });
      });
    },
    // 获取交易状态
    getTradeStatusList() {
      _common.getDictionaryList("TRADE_STATUS").then(res => {
        this.filterAxios(res, res => {
          this.tradeStatusList = res;
        });
      });
    },
    // 获取交易类型
    getTradeTypeList() {
      _common.getDictionaryList("TRADE_TYPE").then(res => {
        this.filterAxios(res, res => {
          this.tradeTypeList = res;
        });
      });
    },
    // 查询
    searchSubmit() {
      if (this.searchForm.tradeTime && this.searchForm.tradeTime.length === 2) {
        this.searchForm.createTimeStart =
          this.searchForm.tradeTime[0] + " 00:00:00";
        this.searchForm.createTimeEnd =
          this.searchForm.tradeTime[1] + " 23:59:59";
      }
      this._renderTableDate(this.searchForm);
    },
    detailClose() {
      this.$refs["detailForm"].resetFields();
      this.detailShow = false;
    },
    handleDetail(row) {
      _trade.getDetail(row.orderId).then(res => {
        this.filterAxios(res, res => {
          this.detailForm = res;
        });
      });
      this.detailShow = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  .el-form-item {
    flex: 1;
  }
}
</style>
