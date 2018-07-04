<template>
  <div class="container">
    <div class="header clearfix">
      <h2>差错交易</h2>
    </div>
    <!-- 搜索 -->
    <div class="detail-input" v-if="pageRight.search">
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
    <!-- 内容 -->
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
        <el-table-column align="center" prop="channelMerchantId" label="渠道商户号" min-width="90"></el-table-column>
        <el-table-column align="center" prop="channelOrderNo" label="渠道订单号" min-width="90"></el-table-column>
        <el-table-column align="center" prop="sendChannelOrderNo" label="平台上送订单号" min-width="110"></el-table-column>
        <el-table-column align="center" prop="channelName" label="交易时间"></el-table-column>
        <el-table-column align="center" prop="tradeAmount" label="支付金额(单位:分)" min-width="150"></el-table-column>
        <el-table-column align="center" prop="fees" label="手续费(单位:分)" min-width="120"></el-table-column>
        <el-table-column align="center" prop="tradeStatus" label="渠道交易状态" min-width="100"></el-table-column>
        <el-table-column align="center" prop="status" label="平台交易状态" min-width="100"></el-table-column>
        <el-table-column align="center" prop="outRespCode" label="渠道返回码" min-width="90"></el-table-column>
        <el-table-column align="center" prop="outRespDesc" label="渠道返回描述" min-width="100"></el-table-column>
        <el-table-column align="center" prop="processFlag" label="处理状态"></el-table-column>
        <el-table-column align="center" prop="processResult" label="处理结果"></el-table-column>
        <el-table-column align="center" prop="platTradeTime" label="创建时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="tradeFinishTime" label="修改时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" fixed="right" v-if="pageRight.deal">
          <template slot-scope="scope">
            <el-button @click="handleForm(scope.row)" type="warning" size="mini">处理</el-button>
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
      v-show="formShow"
      :visible.sync="formShow"
      title="处理结果"
      width="30%"
      :before-close="formClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="105px">
          <el-form-item label="处理结果" prop="processResult">
            <el-input type="textarea" v-model="form.processResult" placeholder="请描述处理结果,说明差错原因，最多255个字符" max="255" rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="formClose()">取 消</el-button>
        <el-button size="small" type="primary" @click="formSubmit">确 定</el-button>
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
      formShow: false,
      form: {},
      rules: {
        processResult: [
          { required: true, message: "请输入处理描述", trigger: "blur" },
          { max: 255, message: "处理描述不得大于255个字符", trigger: "change" }
        ]
      },
      searchForm: {}
    };
  },
  methods: {
    init() {
      this.initPageRight("交易管理", "差错交易");
      this._renderTableDate();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "搜索" && item.status === "VALID") {
          this.pageRight.search = true;
        }
        if (item.funcName === "处理" && item.status === "VALID") {
          this.pageRight.deal = true;
        }
      });
    },
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
    formClose() {
      this.formShow = false;
      this.$refs["form"].resetFields();
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          _trade
            .updatePayCheckUpErrorList(this.detailForm.errorId, this.detailForm)
            .then(res => {
              this.filterAxios(res, res => {
                this.successTips("处理成功");
              });
            });
        } else {
          return false;
        }
      });
    },
    handleForm(row) {
      this.formShow = true;
      this.formForm = {
        errorId: row.errorId,
        processFlag: true,
        processResult: row.processResult
      };
    }
  }
};
</script>