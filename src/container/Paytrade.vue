<template>
  <div class="container">
    <div class="header clearfix">
      <h2>支付交易信息</h2>
      <div class="right">
        <span class="right-info">交易总金额 {{tradeAmount}}元</span>
        <span class="right-info">交易总笔数 {{tradeAmountNum}}笔</span>
        <el-button @click="searchOpen" type="primary" size="small">查询</el-button>
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
    <el-dialog
      v-show="searchShow"
      title="查询"
      :visible.sync="searchShow"
      width="30%"
      :before-close="searchClose"
      center
    >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="105px">
          <el-form-item label="商户订单号：" prop="orderId">
            <el-input v-model="form.orderId"></el-input>
          </el-form-item>
          <el-form-item label="交易状态" prop="tradeStatus">
            <el-select v-model="form.tradeStatus" placeholder="请选择交易状态">
              <el-option v-for="(item, index) in tradeStatus" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="清算状态" prop="liquidationStatus">
            <el-select v-model="form.liquidationStatus" placeholder="请选择清算状态">
              <el-option v-for="(item, index) in liquidationStatus" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付渠道" prop="payWay">
            <el-select v-model="form.payWay" placeholder="请选择清算状态">
              <el-option v-for="(item, index) in liquidationStatus" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属子代理商" prop="belongToAgency">
            <el-select v-model="form.belongToAgency" placeholder="请选择所属子代理商">
              <el-option v-for="(item, index) in belongToAgency" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易日期：" prop="daterange">
            <el-date-picker
              v-model="form.daterange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              default-value="2017-12-01">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="searchShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import { formatMoney } from 'static/js/util'
  export default {
    data () {
      return {
        searchShow: false,
        tradeAmount: 100,
        tradeAmountNum: 100,
        tradeStatus: [
          {
            value: '等待支付',
            label: '等待支付'
          },
          {
            value: '已付款',
            label: '已付款'
          }
        ],
        liquidationStatus: [
          {
            value: '等待清算',
            label: '等待清算'
          },
          {
            value: '已清算',
            label: '已清算'
          }
        ],
        payWay: [
          {
            value: 'alipay',
            label: '支付宝'
          },
          {
            value: 'wechat',
            label: '微信'
          },
          {
            value: 'alipayService',
            label: '支付宝服务窗'
          },
          {
            value: 'weChatPublic',
            label: '微信公众号'
          },
          {
            value: 'qq',
            label: 'QQ'
          },
          {
            value: 'gateway',
            label: '网关'
          },
          {
            value: 'quick',
            label: '快捷'
          },
          {
            value: 'wap',
            label: 'WAP'
          }
        ],
        belongToAgency: [
          {
            value: 'dailishang1',
            label: '代理商1'
          },
          {
            value: 'dailishang2',
            label: '代理商2'
          }
        ],
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
            prop: 'date',
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
        ],
        form: {
          orderId: '',
          tradeStatus: '',
          liquidationStatus: '',
          payWay: '',
          belongToAgency: '',
          daterange: ''
        },
        rules: {
          orderId: [
//            {required: true, message: '请输入商户订单号', trigger: 'blur'},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.tradeAmount = formatMoney(100)
      this.tradeAmountNum = 100
    },
    methods: {
      searchOpen () {
        this.searchShow = true
      },
      searchClose () {
        this.searchShow = false
        this.$refs['form'].resetFields()
      },
      submitForm () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const {orderId, tradeStatus, liquidationStatus, payWay, belongToAgency, daterange} = this.form
            console.log('submit!', this.form, {orderId, tradeStatus, liquidationStatus, payWay, belongToAgency, daterange})
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
