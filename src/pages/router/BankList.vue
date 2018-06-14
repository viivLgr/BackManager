<template>
  <div class="container">
    <div class="header clearfix">
      <h2>银行列表</h2>
    </div>
    <div class="operating">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="银行编码" prop="bankCode">
                <el-input v-model="searchForm.bankCode" placeholder="请输入银行编码"></el-input>
            </el-form-item>
            <el-form-item label="银行名称" prop="bankName">
                <el-input v-model="searchForm.bankName" placeholder="请输入银行名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <div class="table-btn">
            <el-button size="mini" type="success" @click="handleForm()">添加</el-button>
        </div>
      <el-table
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="bankCode" label="银行编码" fixed></el-table-column>
        <el-table-column align="center" prop="bankName" label="银行名称" fixed></el-table-column>
        <el-table-column align="center" prop="bankShortName" label="简称"></el-table-column>
        <el-table-column align="center" prop="bankShortNameEn" label="英文简称"></el-table-column>
        <el-table-column align="center" prop="bankBranchId" label="联行号" width="90"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="150"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" width="150"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="150" fixed="right">
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
      :title="form.title"
      width="30vw"
      :before-close="formClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="130px">
          <el-form-item label="银行编码" prop="bankCode">
            <el-input v-model="form.bankCode" placeholder="请输入银行编码"></el-input>
          </el-form-item>
          <el-form-item label="银行名称" prop="bankName">
            <el-input v-model="form.bankName" placeholder="请输入银行名称"></el-input>
          </el-form-item>
          <el-form-item label="简称" prop="bankShortName">
            <el-input v-model="form.bankShortName" placeholder="请输入简称"></el-input>
          </el-form-item>
          <el-form-item label="英文简称" prop="bankShortNameEn">
            <el-input v-model="form.bankShortNameEn" placeholder="请输入英文简称"></el-input>
          </el-form-item>
          <el-form-item label="联行号" prop="bankBranchId">
            <el-input v-model="form.bankBranchId" placeholder="请输入联行号"></el-input>
          </el-form-item>
          <el-form-item label="图片地址-大图" prop="bankPictureUrlBig">
            <el-input v-model="form.bankPictureUrlBig" placeholder="请输入图片地址-大图"></el-input>
          </el-form-item>
          <el-form-item label="图片地址-小图" prop="bankPictureUrlSmall">
            <el-input v-model="form.bankPictureUrlSmall" placeholder="请输入图片地址-小图"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option label="生效" value="VALID"></el-option>
                  <el-option label="无效" value="INVALID"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="formClose">取 消</el-button>
        <el-button size="small" type="primary" @click="formSubmit">确 定</el-button>
      </span>
    </el-dialog>
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
      form: {},
      rules: {
        bankCode: [{ required: true, message: "请输入银行编码", trigger: "blur" }],
        bankName: [{ required: true, message: "请输入银行名称", trigger: "blur" }],
        bankShortName: [{ required: true, message: "请输入简称", trigger: "blur" }],
        bankShortNameEn: [{ required: true, message: "请输入英文简称", trigger: "blur" }],
        bankBranchId: [{ required: true, message: "请选输入联行号", trigger: "blur" }],
        bankPictureUrlBig: [{ required: true, message: "请选输入图片地址-大图", trigger: "blur" }],
        bankPictureUrlSmall: [{ required: true, message: "请选输入图片地址-小图", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  created() {
    this._renderTableDate();
  },
  methods: {
    // 获取银行列表
    _renderTableDate(data) {
      const _this = this;
      _this.loading = true;
      _router.getBankList(data).then(res => {
        _this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            bankListId: item.bankListId,
            bankCode: item.bankCode,
            bankName: item.bankName,
            bankShortName: item.bankShortName,
            bankShortNameEn: item.bankShortNameEn,
            bankBranchId: item.bankBranchId,
            bankPictureUrlBig: item.bankPictureUrlBig,
            bankPictureUrlSmall: item.bankPictureUrlSmall,
            status: item.status === "VALID" ? "生效" : "失效",
            createTime: item.createTime,
            updateTime: item.modifiedTime,
            operate: {
              update: true
            }
          };
        });
      });
    },
    searchSubmit(searchForm) {
      this._renderTableDate(this.$refs[searchForm].model);
    },
    // 添加 修改
    handleForm(row) {
      const _this = this;
      if (row instanceof Object) {
        _this.form = {
          title: "修改",
          bankListId: row.bankListId,
          bankCode: row.bankCode,
          bankName: row.bankName,
          bankShortName: row.bankShortName,
          bankShortNameEn: row.bankShortNameEn,
          bankBranchId: row.bankBranchId,
          bankPictureUrlBig: row.bankPictureUrlBig,
          bankPictureUrlSmall: row.bankPictureUrlSmall,
          status: row.status === "生效" ? "VALID" : "INVALID"
        };
      } else {
        _this.form = {
          title: "添加"
        };
      }
      _this.addShow = true;
    },
    formClose() {
      this.addShow = false;
      this.form = {};
      this.$refs["form"] && this.$refs["form"].resetFields();
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.title === "添加") {
            delete this.form.title;
            _router.addBank(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.title;
            _router.updateBank(this.form.bankListId, this.form).then(res => {
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
        this._renderTableDate({ channelId: _this.channelId });
      });
    }
  }
};
</script>