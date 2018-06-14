<template>
  <div class="container">
    <div class="header clearfix">
      <h2>开放平台接口列表</h2>
    </div>
    <div class="operating">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="接口名称">
                <el-input v-model="searchForm.interfaceName"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.status" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <div class="table-btn">
            <el-button size="mini" type="success" @click="handleForm('add')">添加</el-button>
        </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="interfaceName" label="接口名称" fixed></el-table-column>
        <el-table-column align="center" prop="interfaceVersion" label="接口版本号"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="160"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" width="160"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="180" fixed="right">
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
      :title="form.formTitle"
      width="30%"
      :before-close="addClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="105px">
          <el-form-item label="接口名称" prop="interfaceName">
            <el-input v-model="form.interfaceName"></el-input>
          </el-form-item>
          <el-form-item label="版本号" prop="interfaceVersion">
            <el-input v-model="form.interfaceVersion"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="formSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { axiosMixin, listMixin, validMixin } from "static/js/mixin.js";
import _app from "service/app-service.js";
import { computedStatusDesc, computedStatus } from "static/js/format.js";
export default {
  mixins: [axiosMixin, listMixin, validMixin],
  data() {
    return {
      searchForm: {
        interfaceName: "",
        status: ""
      },
      rules: {
        interfaceName: [
          { required: true, message: "请输入接口名称", trigger: "blur" }
        ],
        interfaceVersion: [
          { required: true, message: "请输入版本号", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      form: {
        formTitle: "添加"
      },
      roleList: []
    };
  },
  created() {
    this._renderTableDate();
  },
  methods: {
    // 获取用户列表
    _renderTableDate(data) {
      const _this = this;
      _this.loading = true;
      _app.getOpenAppList(data).then(res => {
        _this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            interfaceId: item.interfaceId,
            interfaceName: item.interfaceName,
            interfaceVersion: item.interfaceVersion,
            status: computedStatusDesc(item.status),
            createTime: item.createTime,
            updateTime: item.modifiedTime,
            operate: {
              update: true
            }
          };
        });
      });
    },
    // 查询
    searchSubmit(searchForm) {
      const _this = this;
      _this._renderTableDate(_this.searchForm);
    },
    // 添加 修改
    handleForm(row) {
      const _this = this;
      if (row instanceof Object) {
        _this.form = {
          formTitle: "修改",
          interfaceId: row.interfaceId,
          interfaceName: row.interfaceName,
          interfaceVersion: row.interfaceVersion,
          status: computedStatus(row.status)
        };
      } else {
        _this.form = {
          formTitle: "添加",
          interfaceName: "",
          interfaceVersion: ""
        };
      }
      _this.addShow = true;
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.formTitle === "添加") {
            delete this.form.formTitle; // 去掉title
            _app.addOpenAppList(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.formTitle; // 去掉title
            _app.updateOpenAppList(this.form.interfaceId, this.form).then(res => {
              this.formatResult(res, "修改成功");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    formClose() {
      this.addShow = false;
      this.form = {};
      this.$refs["form"] && this.$refs["form"].resetFields();
    },
    formatResult(res, msg) {
      const _this = this;
      _this.formClose();
      _this.filterAxios(res, res => {
        _this.successTips(msg);
        _this._renderTableDate();
      });
    }
  }
};
</script>