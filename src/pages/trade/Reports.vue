<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="交易报表-日" name="report-day"></el-tab-pane>
        <el-tab-pane label="交易报表-月" name="report-month"></el-tab-pane>
        <el-tab-pane label="交易报表-商户-日" name="report-merchant-day"></el-tab-pane>
        <el-tab-pane label="交易报表-商户-月" name="report-merchant-month"></el-tab-pane>
        <el-tab-pane label="交易报表-渠道-日" name="report-channel-day"></el-tab-pane>
        <el-tab-pane label="交易报表-渠道-月" name="report-channel-month"></el-tab-pane>
        <el-tab-pane label="交易报表-利润-日" name="report-profit-day"></el-tab-pane>
        <el-tab-pane label="交易报表-利润-月" name="report-profit-month"></el-tab-pane>
    </el-tabs>
    <div class="detail-input">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini" label-width="100px">
            <template v-if="activeName === 'report-day' 
                || activeName === 'report-merchant-day' 
                || activeName === 'report-channel-day' 
                || activeName === 'report-profit-day'">
                <el-form-item label="交易时间">
                    <el-date-picker
                        v-model="searchForm.tradeTime"
                        type="daterange"
                        align="left"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
            </template>
            <template v-if="activeName === 'report-month' 
                || activeName === 'report-merchant-month' 
                || activeName === 'report-channel-month' 
                || activeName === 'report-profit-month'">
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="searchForm.tradeDateStart"
                        align="left"
                        type="month"
                        placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="searchForm.tradeDateEnd"
                        align="left"
                        type="month"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
            </template>
            <el-form-item class="btn-item">
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 普通、 商户 -->
    <div class="table" v-if="activeName === 'report-day' || activeName === 'report-month' || activeName === 'report-merchant-day' || activeName === 'report-merchant-month'">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="tradeDate" label="交易时间"></el-table-column>
        <template v-if="activeName === 'report-merchant-day' || activeName === 'report-merchant-month'">
            <el-table-column align="center" prop="merchantName" label="商户"></el-table-column>
        </template>
        <el-table-column align="center" prop="totalRecords" label="交易总笔数"></el-table-column>
        <el-table-column align="center" prop="successRecords" label="成功笔数"></el-table-column>
        <el-table-column align="center" prop="failRecords" label="失败笔数"></el-table-column>
        <el-table-column align="center" prop="totalAmount" label="交易总金额(单位:分)" width="140"></el-table-column>
        <el-table-column align="center" prop="successAmount" label="成功总金额(单位:分)" width="140"></el-table-column>
        <el-table-column align="center" prop="failAmount" label="失败总金额(单位:分)" width="140"></el-table-column>
        <el-table-column align="center" prop="merchantTotalFee" label="商户手续费(单位:分)" width="140"></el-table-column>
        <el-table-column align="center" prop="agentTotalFee" label="代理商手续费(单位:分)" width="140"></el-table-column>
      </el-table>
    </div>
    <!-- 渠道 -->
    <div class="table" v-if="activeName === 'report-channel-day' || activeName === 'report-channel-month'">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="tradeDate" label="交易时间"></el-table-column>
        <el-table-column align="center" prop="channelName" label="渠道"></el-table-column>
        <el-table-column align="center" prop="totalRecords" label="交易总笔数"></el-table-column>
        <el-table-column align="center" prop="successRecords" label="成功笔数"></el-table-column>
        <el-table-column align="center" prop="failRecords" label="失败笔数"></el-table-column>
        <el-table-column align="center" prop="totalAmount" label="交易总金额(单位:分)" width="140"></el-table-column>
        <el-table-column align="center" prop="successAmount" label="成功总金额(单位:分)" width="140"></el-table-column>
        <el-table-column align="center" prop="failAmount" label="失败总金额(单位:分)" width="140"></el-table-column>
        <el-table-column align="center" prop="totalFee" label="手续费总金额(单位:分)" width="140"></el-table-column>
      </el-table>
    </div>
    <!-- 利润 -->
    <div class="table" v-if="activeName === 'report-profit-day' || activeName === 'report-profit-month'">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="tradeDate" label="交易时间"></el-table-column>
        <el-table-column align="center" prop="totalAmount" label="交易总金额(单位:分)"></el-table-column>
        <el-table-column align="center" prop="successAmount" label="成功总金额(单位:分)"></el-table-column>
        <el-table-column align="center" prop="failAmount" label="失败总金额(单位:分)"></el-table-column>
        <el-table-column align="center" prop="merchantFee" label="商户手续费(单位:分)"></el-table-column>
        <el-table-column align="center" prop="agentFee" label="代理商手续费(单位:分)"></el-table-column>
        <el-table-column align="center" prop="channelFee" label="渠道手续费(单位:分)"></el-table-column>
        <el-table-column align="center" prop="profit" label="利润(单位:分)"></el-table-column>
      </el-table>
    </div>
    <!-- <div class="total-wrap" v-show="activeName === 'report-day' || activeName === 'report-month'">
        <p>
            <span>总金额：{{totalInfo.amount}}元</span>
            <span>总笔数：{{totalInfo.count}}</span>
        </p>
    </div> -->
  </div>
</template>
<script type="text/ecmascript-6">
import { axiosMixin, listMixin } from "static/js/mixin.js";
import _trade from "service/trade-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      activeName: "report-day",
      totalInfo: {
        amount: "1000.00",
        count: "1000"
      },
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
      tableData: []
    };
  },
  created() {
    this._renderTableDate();
  },
  methods: {
    // 切换tab
    handleClick(tab) {
      this.activeName = tab.name;
      this._renderTableDate();
      this.$refs["searchForm"].resetFields();
      this.searchForm = {};
    },
    // 获取交易列表
    _renderTableDate(data) {
      this.loading = true;
      const activeName = this.activeName;
      // 交易报表-日
      if (activeName === "report-day") {
        _trade.getReportDay(data).then(res => {
          this.renderTableDate(res, (item, index) => {
            return this.renderReport(item, index);
          });
        });
        // 交易报表-月
      } else if (activeName === "report-month") {
        _trade.getReportMonth(data).then(res => {
          this.renderTableDate(res, (item, index) => {
            return this.renderReport(item, index);
          });
        });
        // 商户-日
      } else if (activeName === "report-merchant-day") {
        _trade.getReportMerchantDay(data).then(res => {
          this.renderTableDate(res, (item, index) => {
            return this.renderMerchantReport(item, index);
          });
        });
        // 商户-月
      } else if (activeName === "report-merchant-month") {
        _trade.getReportMerchantMonth(data).then(res => {
          this.renderTableDate(res, (item, index) => {
            return this.renderMerchantReport(item, index);
          });
        });
        // 渠道-日
      } else if (activeName === "report-channel-day") {
        _trade.getReportChannelDay(data).then(res => {
          this.renderTableDate(res, (item, index) => {
            return this.renderChannelReport(item, index);
          });
        });
        // 渠道-月
      } else if (activeName === "report-channel-month") {
        _trade.getReportChannelMonth(data).then(res => {
          this.renderTableDate(res, (item, index) => {
            return this.renderChannelReport(item, index);
          });
        });
        // 利润-日
      } else if (activeName === "report-profit-day") {
        _trade.getReportProfitDay(data).then(res => {
          this.renderTableDate(res, (item, index) => {
            return this.renderProfitReport(item, index);
          });
        });
        // 利润-月
      } else if (activeName === "report-profit-month") {
        _trade.getReportProfitMonth(data).then(res => {
          this.renderTableDate(res, (item, index) => {
            return this.renderProfitReport(item, index);
          });
        });
      }
    },
    // 渲染普通交易列表
    renderReport(item, index) {
      return {
        no: index + 1,
        tradeDate: item.tradeDate,
        totalRecords: item.totalRecords,
        successRecords: item.successRecords,
        failRecords: item.failRecords,
        totalAmount: item.totalAmount,
        successAmount: item.successAmount,
        failAmount: item.failAmount,
        merchantTotalFee: item.merchantTotalFee,
        agentTotalFee: item.agentTotalFee
      };
    },
    // 渲染商户列表
    renderMerchantReport(item, index) {
      return {
        no: index + 1,
        tradeDate: item.tradeDate,
        id: item.id,
        merchantName: item.merchantName,
        totalRecords: item.totalRecords,
        successRecords: item.successRecords,
        failRecords: item.failRecords,
        totalAmount: item.totalAmount,
        successAmount: item.successAmount,
        failAmount: item.failAmount,
        merchantTotalFee: item.merchantTotalFee,
        agentTotalFee: item.agentTotalFee
      };
    },
    // 渲染渠道列表
    renderChannelReport(item, index) {
      return {
        no: index + 1,
        tradeDate: item.tradeDate,
        channelName: item.channelName,
        totalRecords: item.totalRecords,
        successRecords: item.successRecords,
        failRecords: item.failRecords,
        totalAmount: item.totalAmount,
        successAmount: item.successAmount,
        failAmount: item.failAmount,
        totalFee: item.totalFee
      };
    },
    // 渲染利润列表
    renderProfitReport(item, index) {
      return {
        no: index + 1,
        tradeDate: item.tradeDate,
        totalAmount: item.totalAmount,
        successAmount: item.successAmount,
        failAmount: item.failAmount,
        merchantFee: item.merchantFee,
        agentFee: item.agentFee,
        channelFee: item.channelFee,
        profit: item.profit
      };
    },
    searchSubmit(searchForm) {
      console.log(searchForm);
      console.log(this.searchForm);
      const tradeTime = this.searchForm.tradeTime;
      if (tradeTime && tradeTime.length === 2) {
        this.searchForm.tradeDateStart = tradeTime[0];
        this.searchForm.tradeDateEnd = tradeTime[1];
      }
      console.log(this.searchForm);
      this._renderTableDate(this.searchForm);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  .el-tabs {
    .el-tabs__nav {
      .el-tabs__item {
        color: rgb(102, 102, 102) !important;
      }
    }
  }
  .detail-input {
    padding-top: 20px;
    .el-input__inner {
      width: inherit;
    }
  }
  .total-wrap {
    text-align: right;
    padding: 20px;
    span {
      margin-left: 20px;
      color: rgb(102, 102, 102);
    }
  }
}
</style>
