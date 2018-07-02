<template>
  <div class="container">
    <div class="header clearfix">
      <h2>对账</h2>
    </div>
    <div class="detail-input">
        <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm" class="demo-form-inline" size="mini" label-width="100px">
            <div>
                <el-form-item label="商户号" prop="merchantId">
                    <el-input v-model="searchForm.merchantId" placeholder="请输入商户号"></el-input>
                </el-form-item>
                <el-form-item label="商户名称" prop="merchantName">
                    <el-input v-model="searchForm.merchantName" placeholder="请输入商户名称"></el-input>
                </el-form-item>
                <el-form-item label="订单号" prop="orderId">
                    <el-input v-model="searchForm.orderId" placeholder="请输入订单号"></el-input>
                </el-form-item>
                <el-form-item label="商户订单号" prop="merchantOrderId">
                    <el-input v-model="searchForm.merchantOrderId" placeholder="请输入商户订单"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="交易时间" prop="tradeTime">
                    <el-date-picker
                    v-model="searchForm.tradeTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="交易状态" prop="tradeStatus">
                    <el-select v-model="searchForm.tradeStatus" placeholder="请选择交易状态">
                        <el-option label="成功" value="1"></el-option>
                        <el-option label="失败" value="4"></el-option>
                        <el-option label="处理中" value="2"></el-option>
                        <el-option label="待支付" value="3"></el-option>
                        <el-option label="关闭" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易类型" prop="tradeType">
                    <el-select v-model="searchForm.tradeType" placeholder="请选择交易类型">
                        <el-option label="充值" value="recharge"></el-option>
                        <el-option label="提现" value="withdraw"></el-option>
                        <el-option label="消费" value="consumption"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付产品" prop="payProduct">
                    <el-select v-model="searchForm.payProduct" placeholder="请选择支付产品">
                        <el-option label="快捷" value="fast"></el-option>
                        <el-option label="网关" value="gateway"></el-option>
                        <el-option label="代扣" value="withholding"></el-option>
                        <el-option label="支付宝" value="alipay"></el-option>
                        <el-option label="代付" value="payfor"></el-option>
                        <el-option label="微信" value="wechat"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="渠道编码" prop="channelCode">
                    <el-input v-model="searchForm.channelCode" placeholder="请输入渠道编码"></el-input>
                </el-form-item>
                <el-form-item label="渠道名称" prop="channelName">
                    <el-input v-model="searchForm.channelName" placeholder="请输入渠道名称"></el-input>
                </el-form-item>
                <el-form-item label="收款人姓名" prop="payeeName">
                    <el-input v-model="searchForm.payeeName" placeholder="请输入收款人姓名"></el-input>
                </el-form-item>
                <el-form-item label="付款人姓名" prop="payerName">
                    <el-input v-model="searchForm.payerName" placeholder="请输入付款人姓名"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="银行卡号" prop="bankCardNumber">
                    <el-input v-model="searchForm.bankCardNumber" placeholder="请输入银行卡号"></el-input>
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
        <el-table-column align="center" prop="merchantId" label="商户名" fixed width="120"></el-table-column>
        <el-table-column align="center" prop="merchantName" label="商户名称" fixed></el-table-column>
        <el-table-column align="center" prop="orderId" label="订单号" fixed width="160"></el-table-column>
        <el-table-column align="center" prop="merchantOrderId" label="商户订单号" width="170"></el-table-column>
        <el-table-column align="center" prop="tradeType" label="交易类型"></el-table-column>
        <el-table-column align="center" prop="payProduct" label="支付产品"></el-table-column>
        <el-table-column align="center" prop="channelName" label="渠道名称"></el-table-column>
        <el-table-column align="center" prop="tradeAmount" label="交易金额"></el-table-column>
        <el-table-column align="center" prop="fees" label="手续费"></el-table-column>
        <el-table-column align="center" prop="tradeStatus" label="交易状态"></el-table-column>
        <el-table-column align="center" prop="payerName" label="付款人姓名" width="100"></el-table-column>
        <el-table-column align="center" prop="payeeName" label="收款人姓名" width="100"></el-table-column>
        <el-table-column align="center" prop="bankCardNumber" label="银行卡号" width="100"></el-table-column>
        <el-table-column align="center" prop="tradeCreateTime" label="交易创建时间" width="150"></el-table-column>
        <el-table-column align="center" prop="tradeFinishTime" label="交易完成时间" width="150"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="warning" size="mini">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
                    <el-input v-model="detailForm.merchantId"></el-input>
                </el-form-item>
                <el-form-item label="商户名称">
                    <el-input v-model="detailForm.merchantName"></el-input>
                </el-form-item>
                <el-form-item label="商户费率">
                    <el-input v-model="detailForm.merchantFees"></el-input>
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
                    <el-input v-model="detailForm.merchantOrderId"></el-input>
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
export default {
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
      searchForm: {
        merchantId: "",
        merchantName: "",
        orderId: "",
        merchantOrderId: "",
        tradeStatus: "",
        tradeType: "",
        payProduct: "",
        channelCode: "",
        channelName: "",
        payeeName: "",
        payerName: "",
        bankCardNumber: "",
        tradeTime: ""
      },
      rules: {
        merchantId: [
          { required: false, message: "请输入商户号", trigger: "blur" }
        ],
        merchantName: [
          { required: false, message: "请输入商户名称", trigger: "blur" }
        ],
        orderId: [
          { required: false, message: "请输入订单号", trigger: "blur" }
        ],
        merchantOrderId: [
          { required: false, message: "请输入商户订单", trigger: "blur" }
        ],
        tradeStatus: [
          { required: false, message: "请选择交易状态", trigger: "blur" }
        ],
        tradeType: [
          { required: false, message: "请选择交易类型", trigger: "blur" }
        ],
        payProduct: [
          { required: false, message: "请选择支付产品", trigger: "blur" }
        ],
        channelCode: [
          { required: false, message: "请输入渠道编码", trigger: "blur" }
        ],
        channelName: [
          { required: false, message: "请输入渠道名称", trigger: "blur" }
        ],
        payeeName: [
          { required: false, message: "请输入收款人姓名", trigger: "blur" }
        ],
        payerName: [
          { required: false, message: "请输入付款人姓名", trigger: "blur" }
        ],
        bankCardNumber: [
          { required: false, message: "请输入银行卡号", trigger: "blur" }
        ],
        tradeTime: [
          { required: false, message: "请选择交易时间", trigger: "blur" }
        ]
      },
      tableData: [
        {
          id: "1",
          merchantId: "M201804200107",
          merchantName: "德御科技",
          orderId: "WDC2018042714452814",
          merchantOrderId: "WZLD2018042618522149",
          tradeType: "消费",
          payProduct: "网关",
          channelName: "XXXX",
          tradeAmount: "49896.00",
          fees: "2.00",
          tradeStatus: "成功",
          payerName: "--",
          payeeName: "张三",
          bankCardNumber: "6226*****3921",
          tradeCreateTime: "2018-04-30 11:32:20",
          tradeFinishTime: "2018-04-30 11:32:40"
        },
        {
          id: "2",
          merchantId: "M201804200107",
          merchantName: "德御科技",
          orderId: "WDC2018042714452814",
          merchantOrderId: "WZLD2018042618522149",
          tradeType: "消费",
          payProduct: "网关",
          channelName: "XXXX",
          tradeAmount: "49896.00",
          fees: "2.00",
          tradeStatus: "成功",
          payerName: "--",
          payeeName: "张三",
          bankCardNumber: "6226*****3921",
          tradeCreateTime: "2018-04-30 11:32:20",
          tradeFinishTime: "2018-04-30 11:32:40"
        }
      ]
    };
  },
  methods: {
    searchSubmit(searchForm) {
      this.$refs[searchForm].validate(valid => {
        if (valid) {
          let username = this.$refs[searchForm].model.feature;
          console.log("submit!", username);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    detailClose() {
      this.detailShow = false;
      this.$refs["detailForm"].resetFields();
    },
    detailSubmit() {
      console.log("detailSubmit!");
    },
    handleDetail(row) {
      let id = row.id;
      this.detailShow = true;
      this.detailForm = {
        merchantId: row.merchantId,
        merchantName: row.merchantName,
        merchantFees: row.merchantFees,
        channelCode: row.channelCode,
        channelName: row.channelName,
        channelFees: row.channelFees,
        orderId: row.orderId,
        merchantOrderId: row.merchantOrderId,
        channelOrderId: row.channelOrderId,
        tradeType: row.tradeType,
        payProduct: row.payProduct,
        tradeStatus: row.tradeStatus,
        tradeTotalAmount: row.tradeTotalAmount,
        tradeAmount: row.tradeAmount,
        fees: row.fees,
        tradeCreateTime: row.tradeCreateTime,
        sendChannelTime: row.sendChannelTime,
        tradeFinishTime: row.tradeFinishTime,
        payeeName: row.payeeName,
        payerName: row.payerName,
        bankCardNumber: row.bankCardNumber,
        profitName: row.profitName,
        profitAmount: row.profitAmount
      };
      console.log("handleDetail!", row, id);
    }
  }
};
</script>