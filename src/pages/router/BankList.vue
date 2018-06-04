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
      width="40%"
      :before-close="formClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
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
          <el-form-item label="图片地址大图" prop="bankPictureUrlBig">
            <el-upload
                class="upload-uploader"
                :show-file-list="false"
                drag
                accept="image/*"
                action="https://jsonplaceholder.typicode.com/posts/">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div v-else>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </div>
                </el-upload>
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
    const _this = this;
    const validMerchantId = (rule, value, callback) => {
      _router.validMerchantId({ merchantId: value }).then(res => {
        _this.filterAxios(
          res,
          res => {
            _this.form = {
              ..._this.form,
              merchantName: res.merchantName
            };
            console.log("_this.form", _this.form);
            callback();
          },
          errMsg => {
            callback(new Error(errMsg));
          }
        );
      });
    };
    const validMerSingleMinAmount = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("最小限额必须大于0"));
      } else if (_this.form.merSingleMaxAmount !== "") {
        _this.$refs.form.validateField("merSingleMaxAmount");
      }
      callback();
    };
    const validMerSingleMaxAmount = (rule, value, callback) => {
      if (value <= _this.form.merSingleMinAmount) {
        callback(new Error("最大限额必须大于最小限额"));
      } else if (value > 999999999999) {
        callback(new Error("最大限额不得大于999999999999"));
      } else {
        callback();
      }
    };
    return {
      searchForm: {},
      form: {},
      channelList: [],
      rules: {
        merchantId: [
          { required: true, message: "请输入商户号", trigger: "blur" },
          { validator: validMerchantId, trigger: "blur" }
        ],
        channelId: [{ required: true, message: "请选择渠道", trigger: "blur" }],
        merSingleMinAmount: [
          { required: true, message: "请输入商户最小限额", trigger: "blur" },
          { validator: validMerSingleMinAmount, trigger: "blur" }
        ],
        merSingleMaxAmount: [
          { required: true, message: "请输入商户最大限额", trigger: "blur" },
          { validator: validMerSingleMaxAmount, trigger: "blur" }
        ],
        validTimeList: [
          { required: true, message: "请选择生效时间", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      imageUrl: ""
    };
  },
  created() {
    this._renderTableDate();
  },
  methods: {
    // 获取渠道列表
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
    // 获取渠道列表
    getChannelList() {
      const _this = this;
      _router.getChannelList().then(res => {
        _this.filterAxios(res, res => {
          _this.channelList = res.list;
        });
      });
    },
    searchSubmit(searchForm) {
      const _this = this;
      this.$refs[searchForm].validate(valid => {
        if (valid) {
          _this._renderTableDate(_this.$refs[searchForm].model);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加 修改
    handleForm(row) {
      const _this = this;
      if (!_this.channelList.length) {
        this.getChannelList();
      }
      if (row instanceof Object) {
        console.log("channelId", row);
        _this.form = {
          title: "修改",
          disabled: true,
          merchantChannelId: row.merchantChannelId,
          merchantId: row.merchantId,
          merchantName: row.merchantName,
          channelId: row.channelId,
          merSingleMinAmount: row.merSingleMinAmount,
          merSingleMaxAmount: row.merSingleMaxAmount,
          validTimeList: row.validTimeList,
          status: row.status === "生效" ? "VALID" : "INVALID"
        };
      } else {
        _this.form = {
          title: "添加",
          disabled: false
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
      const _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          delete _this.form.disabled;
          delete _this.form.merchantName;
          _this.form.validTime = _this.form.validTimeList[0];
          _this.form.invalidTime = _this.form.validTimeList[1];
          delete _this.form.validTimeList;
          if (_this.form.title === "添加") {
            delete _this.form.title;
            _router.addStoreChannelList(_this.form).then(res => {
              _this.formatResult(res, "添加成功");
            });
          } else {
            delete _this.form.title;
            delete _this.form.merchantId;
            _router.updateStoreChannelList(_this.form).then(res => {
              _this.formatResult(res, "修改成功");
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