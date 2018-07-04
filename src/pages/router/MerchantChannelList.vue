<template>
  <div class="container">
    <div class="header clearfix">
      <h2>商户渠道列表</h2>
    </div>
    <!-- 搜索 -->
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="商户号" prop="merchantId">
                <el-input v-model="searchForm.merchantId" placeholder="请输入商户号"></el-input>
            </el-form-item>
            <el-form-item label="商户名称" prop="merchantName">
                <el-input v-model="searchForm.merchantName" placeholder="请输入商户名称"></el-input>
            </el-form-item>
            <el-form-item label="渠道名称" prop="channelName">
                <el-input v-model="searchForm.channelName" placeholder="请输入渠道名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 内容 -->
    <div class="table">
      <!-- 添加 -->
      <div class="table-btn" v-if="pageRight.add">
          <el-button size="mini" type="success" @click="handleForm()">添加</el-button>
      </div>
      <el-table
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="merchantId" label="商户号" fixed></el-table-column>
        <el-table-column align="center" prop="merchantName" label="商户名称" fixed></el-table-column>
        <el-table-column align="center" prop="channelCode" label="渠道编码"></el-table-column>
        <el-table-column align="center" prop="channelName" label="渠道名称" min-width="120"></el-table-column>
        <el-table-column align="center" prop="productCodeName" label="产品类型" min-width="90"></el-table-column>
        <el-table-column align="center" prop="merSingleMinAmount" label="商户最小限额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="merSingleMaxAmount" label="商户最大限额(单位:分)" min-width="140"></el-table-column>
        <el-table-column align="center" prop="validTime" label="生效时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="invalidTime" label="失效时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" min-width="150"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" min-width="150" fixed="right" v-if="pageRight.update">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operate.update" @click="handleForm(scope.row)" type="warning" size="mini">修改</el-button>
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
    <!-- 添加 / 修改 -->
    <el-dialog
      v-show="addShow"
      :visible.sync="addShow"
      :title="form.title"
      width="560px"
      :before-close="formClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
          <template v-if="form.title === '添加'">
            <el-form-item label="商户号" prop="addMerchantId">
              <el-input v-model="form.addMerchantId" placeholder="请输入商户号"></el-input>
            </el-form-item>
            <el-form-item label="商户" v-if="merchantList.length > 0" prop="merchantId">
              <el-select v-model="form.merchantId" placeholder="请选择商户">
                  <el-option v-for="(item, index) in merchantList" :key="index" :label="item.merchantName" :value="item.merchantId"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="商户号" prop="merchantId">
              <el-input v-model="form.merchantId" placeholder="请输入商户号" :disabled="form.disabled"></el-input>
            </el-form-item>
            <el-form-item label="商户名称" prop="merchantName">
              <el-input v-model="form.merchantName" placeholder="请输入商户名称" :disabled="true"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="渠道" prop="channelId">
              <el-select v-model="form.channelId" placeholder="请选择渠道">
                  <el-option v-for="(item, index) in channelList" :key="index" :label="item.channelName" :value="item.channelId"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="商户最小限额" prop="merSingleMinAmount">
            <el-input type="number" v-model="form.merSingleMinAmount" placeholder="请输入商户最小限额"></el-input>
          </el-form-item>
          <el-form-item label="商户最大限额" prop="merSingleMaxAmount">
            <el-input type="number" v-model="form.merSingleMaxAmount" placeholder="请输入商户最大限额"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" prop="validTimeList">
            <el-date-picker
                v-model="form.validTimeList"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="-"
                :clearable="false"
                value-format="timestamp"
                start-placeholder="请选择生效时间"
                end-placeholder="请选择失效时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
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
import { getStatusName } from "static/js/cache.js";
import { getTimestamps, formatDate } from "static/js/format.js";
import _router from "service/router-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    const _this = this;
    // 根据商户号得到商户列表
    const validAddMerchantId = (rule, value, callback) => {
      if (this.form.title === "添加") {
        if (value === "") {
          this.merchantList = [];
          callback(new Error("请输入商户号"));
        } else {
          _router.validMerchantId(value).then(res => {
            this.filterAxios(res, res => {
              if (res === undefined) {
                this.merchantList = [];
                callback(new Error("没有找到您输入的商户号，请重新输入"));
              } else {
                this.merchantList = res;
                callback();
              }
            });
          });
        }
      }
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
      form: {
        title: ""
      },
      channelList: [],
      rules: {
        addMerchantId: [{ validator: validAddMerchantId, trigger: "change" }],
        merchantId: [
          { required: true, message: "请输入商户号", trigger: "blur" }
        ],
        channelId: [
          { required: true, message: "请选择渠道", trigger: "blur" }
        ],
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
      merchantList: []
    };
  },
  methods: {
    init() {
      this.initPageRight("路由管理", "商户渠道列表");
      this._renderTableDate();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "查询" && item.status === "VALID") {
          this.pageRight.search = true;
        }
        if (item.funcName === "添加" && item.status === "VALID") {
          this.pageRight.add = true;
        }
        if (item.funcName === "修改" && item.status === "VALID") {
          this.pageRight.update = true;
        }
      });
    },
    // 获取商户渠道列表
    _renderTableDate(data) {
      this.loading = true;
      _router.getMerchantChannelList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            merchantChannelId: item.merchantChannelId,
            channelId: item.channelId,
            channelCode: item.channelCode,
            channelName: item.channelName,
            merchantId: item.merchantId,
            merchantName: item.merchantName,
            merSingleMinAmount: item.merSingleMinAmount,
            merSingleMaxAmount: item.merSingleMaxAmount,
            merDayMaxAmount: item.merDayMaxAmount,
            productCode: item.productCode,
            productCodeName: item.productCodeName,
            status: item.status,
            statusDesc: getStatusName(item.status),
            validTimeList: [
              getTimestamps(item.validTime),
              getTimestamps(item.invalidTime)
            ],
            validTime: item.validTime,
            invalidTime: item.invalidTime,
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
      _router.getChannelList().then(res => {
        this.filterAxios(res, res => {
          this.channelList = res.list;
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
    },
    // 添加 修改
    handleForm(row) {
      if (!this.channelList.length) {
        this.getChannelList();
      }
      if (row instanceof Object) {
        console.log("channelId", row);
        this.form = {
          title: "修改",
          disabled: true,
          merchantChannelId: row.merchantChannelId,
          merchantId: row.merchantId,
          merchantName: row.merchantName,
          channelId: row.channelId,
          merSingleMinAmount: row.merSingleMinAmount,
          merSingleMaxAmount: row.merSingleMaxAmount,
          validTimeList: row.validTimeList,
          status: row.status
        };
      } else {
        this.form = {
          title: "添加",
          disabled: false
        };
      }
      this.addShow = true;
    },
    formClose() {
      this.addShow = false;
      this.form = {};
      this.merchantList = [];
      this.$refs["form"] && this.$refs["form"].resetFields();
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          delete this.form.disabled;
          delete this.form.merchantName;
          this.form.validTime = formatDate(this.form.validTimeList[0]);
          this.form.invalidTime = formatDate(this.form.validTimeList[1]);
          delete this.form.validTimeList;
          if (this.form.title === "添加") {
            delete this.form.title;
            _router.addMerchantChannelList(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.title;
            _router
              .updateMerchantChannelList(this.form.merchantChannelId, this.form)
              .then(res => {
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
      this.formClose();
      this.filterAxios(res, res => {
        this.successTips(msg);
        this._renderTableDate({ channelId: this.channelId });
      });
    }
  }
};
</script>