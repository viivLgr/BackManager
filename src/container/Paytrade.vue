<template>
  <div class="container">
    <div class="header clearfix">
      <h2>支付交易信息</h2>
      <div class="right">
        <span class="right-info">交易总金额 {{tradeAmount}}元</span>
        <span class="right-info">交易总笔数 {{tradeAmountNum}}元</span>
        <el-button type="primary" size="small">查询</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        size="mini"
        show-overflow-tooltip
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column
          v-for="(item,index) in table"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          header-align="center"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { formatMoney } from 'static/js/util'
  export default {
    data () {
      return {
        tradeAmount: 100,
        tradeAmountNum: 100,
        table: [
          {
            prop: 'orderId',
            label: '商户订单号'
          },
          {
            prop: 'storeId',
            label: '商户编号'
          },
          {
            prop: 'storeName',
            label: '商户名称'
          },
          {
            prop: 'agencyId',
            label: '所属代理商ID'
          },
          {
            prop: 'tradeMoney',
            label: '交易金额'
          },
          {
            prop: 'tradeStatus',
            label: '交易状态'
          },
          {
            prop: 'tradeWay',
            label: '支付渠道'
          },
          {
            prop: 'orderStatus',
            label: '订单清算状态'
          },
          {
            prop: 'orderStatus',
            label: '交易日期'
          }
        ],
        tableData: [
          {
            orderId: 'order123412',
            storeId: 'store12313',
            storeName: '杭州转折科技',
            agencyId: 'agency123123',
            tradeMoney: '12313.00',
            tradeStatus: '等待付款',
            tradeWay: '微信',
            orderStatus: '未清算',
            date: '2017-11-09'
          },
          {
            orderId: 'order123412',
            storeId: 'store12313',
            storeName: '杭州转折科技',
            agencyId: 'agency123123',
            tradeMoney: '12313.00',
            tradeStatus: '等待付款',
            tradeWay: '微信',
            orderStatus: '未清算',
            date: '2017-11-09'
          },
          {
            orderId: 'order123412',
            storeId: 'store12313',
            storeName: '杭州转折科技',
            agencyId: 'agency123123',
            tradeMoney: '12313.00',
            tradeStatus: '等待付款',
            tradeWay: '微信',
            orderStatus: '未清算',
            date: '2017-11-09'
          },
          {
            orderId: 'order123412',
            storeId: 'store12313',
            storeName: '杭州转折科技',
            agencyId: 'agency123123',
            tradeMoney: '12313.00',
            tradeStatus: '等待付款',
            tradeWay: '微信',
            orderStatus: '未清算',
            date: '2017-11-09'
          }
        ]
      }
    },
    created () {
      this.tradeAmount = formatMoney(100)
      this.tradeAmountNum = 100
    }
  }
</script>
