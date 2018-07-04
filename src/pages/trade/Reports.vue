<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="交易报表-日" name="report-day" v-if="pageRight.day"></el-tab-pane>
        <el-tab-pane label="交易报表-月" name="report-month" v-if="pageRight.month"></el-tab-pane>
        <el-tab-pane label="交易报表-商户-日" name="report-merchant-day" v-if="pageRight.merchantDay"></el-tab-pane>
        <el-tab-pane label="交易报表-商户-月" name="report-merchant-month" v-if="pageRight.merchantMonth"></el-tab-pane>
        <el-tab-pane label="交易报表-渠道-日" name="report-channel-day" v-if="pageRight.channelDay"></el-tab-pane>
        <el-tab-pane label="交易报表-渠道-月" name="report-channel-month" v-if="pageRight.channelMonth"></el-tab-pane>
        <el-tab-pane label="交易报表-利润-日" name="report-profit-day" v-if="pageRight.profitDay"></el-tab-pane>
        <el-tab-pane label="交易报表-利润-月" name="report-profit-month" v-if="pageRight.profitMonth"></el-tab-pane>
    </el-tabs>
    <div class="detail-input" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini" label-width="100px" v-if="pageRight.search">
            <template v-if="(activeName === 'report-day' && pageRight.daySearch)
                || (activeName === 'report-merchant-day' && pageRight.merchantDaySearch)
                || (activeName === 'report-channel-day' && pageRight.channelDaySearch)
                || (activeName === 'report-profit-day' && pageRight.profitDaySearch)">
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
            <template v-if="(activeName === 'report-month' && pageRight.monthSearch)
                || (activeName === 'report-merchant-month' && pageRight.merchantMonthSearch)
                || (activeName === 'report-channel-month' && pageRight.channelMonthSearch)
                || (activeName === 'report-profit-month' && pageRight.profitMonthSearch)">
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
    <div class="table" v-if="((activeName === 'report-day' || activeName === 'report-month') && pageRight.default) || ((activeName === 'report-merchant-day' || activeName === 'report-merchant-month') && pageRight.merchant)">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="tradeDate" label="交易时间"></el-table-column>
        <template v-if="(activeName === 'report-merchant-day' || activeName === 'report-merchant-month') && pageRight.merchant">
            <el-table-column align="center" prop="merchantName" label="商户"></el-table-column>
        </template>
        <el-table-column align="center" prop="totalRecords" label="交易总笔数" min-width="90"></el-table-column>
        <el-table-column align="center" prop="successRecords" label="成功笔数"></el-table-column>
        <el-table-column align="center" prop="failRecords" label="失败笔数"></el-table-column>
        <el-table-column align="center" prop="totalAmount" label="交易总金额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="successAmount" label="成功总金额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="failAmount" label="失败总金额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="merchantTotalFee" label="商户手续费(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="agentTotalFee" label="代理商手续费(单位:分)" min-width="140"></el-table-column>
      </el-table>
    </div>
    <!-- 渠道 -->
    <div class="table" v-if="(activeName === 'report-channel-day' || activeName === 'report-channel-month') && pageRight.channel">
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
        <el-table-column align="center" prop="totalAmount" label="交易总金额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="successAmount" label="成功总金额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="failAmount" label="失败总金额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="totalFee" label="手续费总金额(单位:分)" min-width="140"></el-table-column>
      </el-table>
    </div>
    <!-- 利润 -->
    <div class="table" v-if="(activeName === 'report-profit-day' || activeName === 'report-profit-month') && pageRight.profit">
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
      tabs: [],
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
  methods: {
    init() {
      this.initPageRight("交易管理", "报表");
      this._renderTableDate();
    },
    computedRight() {
      this.tabs = [];
      this.pageRight[0].children.map(item => {
        // 报表
        if (item.funcName === "报表-日" && item.status === "VALID") {
          this.pageRight.day = true;
          this.tabs.push("report-day");
        }
        if (item.funcName === "报表-日-查询" && item.status === "VALID") {
          this.pageRight.daySearch = true;
        }
        if (item.funcName === "报表-月" && item.status === "VALID") {
          this.pageRight.month = true;
          this.tabs.push("report-month");
        }
        if (item.funcName === "报表-月-查询" && item.status === "VALID") {
          this.pageRight.monthSearch = true;
        }
        // 商户
        if (item.funcName === "报表-商户-日" && item.status === "VALID") {
          this.pageRight.merchantDay = true;
          this.tabs.push("report-merchant-day");
        }
        if (item.funcName === "报表-商户-日-查询" && item.status === "VALID") {
          this.pageRight.merchantDaySearch = true;
        }
        if (item.funcName === "报表-商户-月" && item.status === "VALID") {
          this.pageRight.merchantMonth = true;
          this.tabs.push("report-merchant-month");
        }
        if (item.funcName === "报表-商户-月-查询" && item.status === "VALID") {
          this.pageRight.merchantMonthSearch = true;
        }
        // 渠道
        if (item.funcName === "报表-渠道-日" && item.status === "VALID") {
          this.pageRight.channelDay = true;
          this.tabs.push("report-channel-day");
        }
        if (item.funcName === "报表-渠道-日-查询" && item.status === "VALID") {
          this.pageRight.channelDaySearch = true;
        }
        if (item.funcName === "报表-渠道-月" && item.status === "VALID") {
          this.pageRight.channelMonth = true;
          this.tabs.push("report-channel-month");
        }
        if (item.funcName === "报表-渠道-月-查询" && item.status === "VALID") {
          this.pageRight.channelMonthSearch = true;
        }
        // 利润
        if (item.funcName === "报表-利润-日" && item.status === "VALID") {
          this.pageRight.profitDay = true;
          this.tabs.push("report-profit-day");
        }
        if (item.funcName === "报表-利润-日-查询" && item.status === "VALID") {
          this.pageRight.profitDaySearch = true;
        }
        if (item.funcName === "报表-利润-月" && item.status === "VALID") {
          this.pageRight.profitMonth = true;
          this.tabs.push("report-profit-month");
        }
        if (item.funcName === "报表-利润-月-查询" && item.status === "VALID") {
          this.pageRight.profitMonthSearch = true;
        }
      });
      // search
      const pageRight = this.pageRight;
      if (
        pageRight.daySearch ||
        pageRight.monthSearch ||
        pageRight.merchantDaySearch ||
        pageRight.merchantMonthSearch ||
        pageRight.channelDaySearch ||
        pageRight.channelMonthSearch ||
        pageRight.profitDaySearch ||
        pageRight.profitMonthSearch
      ) {
        this.pageRight.search = true;
      }
      // content
      if (pageRight.day || pageRight.month) {
        this.pageRight.default = true;
      }
      if (pageRight.merchantDay || pageRight.merchantMonth) {
        this.pageRight.merchant = true;
      }
      if (pageRight.channelDay || pageRight.channelMonth) {
        this.pageRight.channel = true;
      }
      if (pageRight.profitDay || pageRight.profitMonth) {
        this.pageRight.profit = true;
      }
      // tab
      if (!this.tabs.length) {
        this.errorTips("您没有权限查看本页面");
      } else {
        this.activeName = this.tabs[0];
      }
    },
    // 切换tab
    handleClick(tab) {
      this.activeName = tab.name;
      this._renderTableDate();
      this.$refs["searchForm"] && this.$refs["searchForm"].resetFields();
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
