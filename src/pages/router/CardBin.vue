<template>
  <div class="container">
    <div class="header clearfix">
      <h2>卡bin管理</h2>
    </div>
    <!-- 搜索 -->
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="银行卡号">
                <el-input v-model="searchForm.bankCardNo" placeholder="请输入银行卡号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
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
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="cardBin" label="卡bin" fixed></el-table-column>
        <el-table-column align="center" prop="bankCode" label="银行编码" fixed></el-table-column>
        <el-table-column align="center" prop="bankName" label="银行名称" min-width="200"></el-table-column>
        <el-table-column align="center" prop="cardName" label="银行卡名称" min-width="200"></el-table-column>
        <el-table-column align="center" prop="cardType" label="银行卡类型"></el-table-column>
        <el-table-column align="center" prop="cardLength" label="卡长度"></el-table-column>
        <el-table-column align="center" prop="binLength" label="卡bin长度"></el-table-column>
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
  </div>
</template>
<script type="text/ecmascript-6">
import { axiosMixin, listMixin } from "static/js/mixin.js";
import _router from "service/router-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      searchForm: {},
      cardType: ["", "借记卡", "贷记卡", "贷记卡", "预付卡"]
    };
  },
  methods: {
    init() {
      this.initPageRight("路由管理", "卡bin管理");
      this._renderTableDate();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "查询" && item.status === "VALID") {
          this.pageRight.search = true;
        }
      });
    },
    // 获取渠道列表
    _renderTableDate(data) {
      this.loading = true;
      _router.cardBinList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            cardBin: item.cardBin,
            bankCode: item.bankCode,
            bankName: item.bankName,
            cardName: item.cardName,
            cardType: this.cardType[item.cardType],
            cardLength: item.cardLength,
            binLength: item.binLength
          };
        });
      });
    },
    searchSubmit(searchForm) {
      this.$refs[searchForm].validate(valid => {
        if (valid) {
          this._renderTableDate(this.$refs[searchForm].model);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>