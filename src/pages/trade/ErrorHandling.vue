<template>
  <div class="container">
    <div class="header clearfix">
      <h2>差错交易</h2>
    </div>
    <div class="detail-input">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini" label-width="100px">
            <div>
                <el-form-item label="处理状态">
                    <el-select v-model="searchForm.processFlag" placeholder="请选择处理状态">
                        <el-option value="">全部</el-option>
                        <el-option v-for="(item, index) in processFlagList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="btn-item">
                    <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="id" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="platTradeTime" label="交易日期" fixed></el-table-column>
        <el-table-column align="center" prop="channelCode" label="渠道编码" fixed></el-table-column>
        <el-table-column align="center" prop="channelName" label="渠道名称"></el-table-column>
        <el-table-column align="center" prop="channelMerchantId" label="渠道商户号" width="90"></el-table-column>
        <el-table-column align="center" prop="channelOrderNo" label="渠道订单号" width="90"></el-table-column>
        <el-table-column align="center" prop="sendChannelOrderNo" label="平台上送订单号" width="110"></el-table-column>
        <el-table-column align="center" prop="channelName" label="交易时间"></el-table-column>
        <el-table-column align="center" prop="tradeAmount" label="支付金额"></el-table-column>
        <el-table-column align="center" prop="fees" label="手续费"></el-table-column>
        <el-table-column align="center" prop="tradeStatus" label="渠道交易状态" width="100"></el-table-column>
        <el-table-column align="center" prop="status" label="平台交易状态" width="100"></el-table-column>
        <el-table-column align="center" prop="outRespCode" label="渠道返回码" width="90"></el-table-column>
        <el-table-column align="center" prop="outRespDesc" label="渠道返回描述" width="100"></el-table-column>
        <el-table-column align="center" prop="processFlag" label="处理状态"></el-table-column>
        <el-table-column align="center" prop="processResult" label="处理结果"></el-table-column>
        <el-table-column align="center" prop="platTradeTime" label="创建时间" width="150"></el-table-column>
        <el-table-column align="center" prop="tradeFinishTime" label="修改时间" width="150"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="warning" size="mini">处理</el-button>
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
      v-show="detailShow"
      :visible.sync="detailShow"
      title="交易详情"
      width="66%"
      :before-close="detailClose"
      center
      >
      <div class="detail-input">
        <el-form :inline="true" ref="detailForm" :model="detailForm" size="mini" label-width="105px">
            <div>
                <el-form-item label="商户号">
                    <el-input v-model="detailForm.storeId"></el-input>
                </el-form-item>
                <el-form-item label="商户名称">
                    <el-input v-model="detailForm.storeName"></el-input>
                </el-form-item>
                <el-form-item label="商户费率">
                    <el-input v-model="detailForm.storeFees"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="渠道编码">
                    <el-input v-model="detailForm.channelCode"></el-input>
                </el-form-item>
                <el-form-item label="渠道名称">
                    <el-input v-model="detailForm.channelName"></el-input>
                </el-form-item>
                <el-form-item label="渠道费率">
                    <el-input v-model="detailForm.channelFees"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="订单号">
                    <el-input v-model="detailForm.orderId"></el-input>
                </el-form-item>
                <el-form-item label="商户订单号">
                    <el-input v-model="detailForm.storeOrderId"></el-input>
                </el-form-item>
                <el-form-item label="渠道订单号">
                    <el-input v-model="detailForm.channelOrderId"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="订单类型">
                    <el-input v-model="detailForm.tradeType"></el-input>
                </el-form-item>
                <el-form-item label="支付产品">
                    <el-input v-model="detailForm.payProduct"></el-input>
                </el-form-item>
                <el-form-item label="交易状态">
                    <el-input v-model="detailForm.tradeStatus"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="交易总金额">
                    <el-input v-model="detailForm.tradeTotalAmount"></el-input>
                </el-form-item>
                <el-form-item label="实际金额">
                    <el-input v-model="detailForm.tradeAmount"></el-input>
                </el-form-item>
                <el-form-item label="手续费">
                    <el-input v-model="detailForm.fees"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="交易发生时间">
                    <el-input v-model="detailForm.tradeCreateTime"></el-input>
                </el-form-item>
                <el-form-item label="发送渠道时间">
                    <el-input v-model="detailForm.sendChannelTime"></el-input>
                </el-form-item>
                <el-form-item label="交易完成时间">
                    <el-input v-model="detailForm.tradeFinishTime"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="收款人姓名">
                    <el-input v-model="detailForm.payeeName"></el-input>
                </el-form-item>
                <el-form-item label="付款人姓名">
                    <el-input v-model="detailForm.payerName"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input v-model="detailForm.bankCardNumber"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="分润人姓名">
                    <el-input v-model="detailForm.profitName"></el-input>
                </el-form-item>
                <el-form-item label="分润人金额">
                    <el-input v-model="detailForm.profitAmount"></el-input>
                </el-form-item>
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
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      processFlagList: [
        { dicCode: true, dicName: "处理" },
        { dicCode: false, dicName: "未处理" }
      ],
      detailShow: false,
      detailForm: {},
      searchForm: {},
      tableData: []
    };
  },
  created() {
    this._renderTableDate();
  },
  methods: {
    // 获取列表
    _renderTableDate(data) {
      this.loading = true;
      _trade.getPayCheckUpErrorList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            channelCode: item.channelCode,
            channelMerchantId: item.channelMerchantId,
            channelName: item.channelName,
            channelOrderNo: item.channelOrderNo,
            channelStatus: item.channelStatus,
            errorId: item.errorId,
            fee: item.fee,
            outRespCode: item.outRespCode,
            outRespDesc: item.outRespDesc,
            payAmount: item.payAmount,
            platTradeTime: item.platTradeTime,
            processFlag: item.processFlag,
            processResult: item.processResult,
            sendChannelOrderNo: item.sendChannelOrderNo,
            status: item.status,
            statusName: item.statusName
          };
        });
      });
    },
    // 查询
    searchSubmit(searchForm) {
      this._renderTableDate(this.searchForm);
    },
    detailClose() {
      this.detailShow = false;
      this.$refs["detailForm"].resetFields();
    },
    detailSubmit() {
      console.log("detailSubmit!");
      _trade.updatePayCheckUpErrorList(this.detailForm.orderId).then(res => {
        this.filterAxios(res, res => {
          console.log("res", res);
        });
      });
    },
    handleDetail(row) {
      let id = row.id;
      this.detailShow = true;
      this.detailForm = {
        orderId: row.orderId,
        processFlag: row.processFlag,
        processResult: row.processResult
      };
      console.log("handleDetail!", row, id);
    }
  }
};
</script>