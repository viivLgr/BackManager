<template>
  <div class="container">
    <div class="header clearfix">
      <h2>码值管理</h2>
    </div>
    <!-- 搜索 -->
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="字典编码" prop="dicCode">
                <el-input v-model="searchForm.dicCode" placeholder="请输入字典编码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 内容 -->
    <div class="table">
        <div class="table-btn" v-if="pageRight.add">
            <el-button size="mini" type="success" @click="handleForm('add')">添加码</el-button>
        </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="dicCode" label="字典编码" fixed width="140"></el-table-column>
        <el-table-column align="center" prop="dicName" label="字典名称" fixed></el-table-column>
        <el-table-column align="center" prop="parentCode" label="上级字典编码" width="140"></el-table-column>
        <el-table-column align="center" prop="rootCode" label="根字典编码" width="140"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="150"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" width="150"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="150" fixed="right" v-if="pageRight.add || pageRight.update">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operate.add && pageRight.add" @click="handleForm(scope.row, '添加')" type="warning" size="mini">添加</el-button>
            <el-button v-if="scope.row.operate.update && pageRight.update" @click="handleForm(scope.row, '修改')" type="warning" size="mini">修改</el-button>
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
      :small="true"
      v-show="addShow"
      :visible.sync="addShow"
      :title="form.title"
      width="30%"
      :before-close="addClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="105px">
          <el-form-item label="根字典编码" prop="rootCode" v-if="form.rootCode">
            <el-input v-model="form.rootCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="上级字典编码" prop="parentCode" v-if="form.parentCode">
            <el-input v-model="form.parentCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="字典编码" prop="dicCode">
            <el-input v-model="form.dicCode" placeholder="请输入字典编码"></el-input>
          </el-form-item>
          <el-form-item label="字典名称" prop="dicName">
            <el-input v-model="form.dicName" placeholder="请输入字典名称"></el-input>
          </el-form-item>
          <el-form-item label="字典状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择字典状态">
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
import { axiosMixin, listMixin } from "static/js/mixin.js";
import { getStatusName } from "static/js/cache.js";
import _sys from "service/sys-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      searchForm: {},
      searchRules: {
        dicCode: [
          { required: false, message: "请输入字典编码", trigger: "blur" }
        ]
      },
      form: {},
      rules: {
        dicCode: [
          { required: true, message: "请输入字典编码", trigger: "blur" }
        ],
        dicName: [
          { required: true, message: "请输入字典名称", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  methods: {
    init() {
      this.initPageRight("系统参数", "码值管理");
      this._renderTableDate();
    },
    // 计算页面操作状态
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
    // 查询
    searchSubmit(searchForm) {
      this._renderTableDate(this.searchForm);
    },
    // 获取码值列表
    _renderTableDate(data) {
      this.loading = true;
      _sys.getDicList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            id: item.id,
            dicCode: item.dicCode,
            dicName: item.dicName,
            parentCode: item.parentCode,
            parentName: item.parentName,
            rootCode: item.rootCode,
            createTime: item.createTime,
            updateTime: item.modifiedTime,
            status: item.status,
            statusDesc: getStatusName(item.status),
            operate: {
              update: true,
              add: true
            }
          };
        });
      });
    },
    // 添加/修改
    handleForm(row, type) {
      if (typeof row === "object") {
        if (type === "添加") {
          this.form = {
            ...this.form,
            title: "添加",
            parentCode: row.dicCode,
            rootCode: row.rootCode || row.dicCode
          };
        } else {
          this.form = {
            ...this.form,
            title: "修改",
            id: row.id,
            dicCode: row.dicCode,
            dicName: row.dicName,
            parentCode: row.parentCode,
            rootCode: row.rootCode,
            status: row.status
          };
        }
      } else {
        this.form = {
          title: "添加"
        };
      }
      this.addShow = true;
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.title === "添加") {
            delete this.form.title;
            _sys.addDictionary(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.title;
            _sys.updateDictionary(this.form.id, this.form).then(res => {
              this.formatResult(res, "修改成功");
            });
          }
        } else {
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
      this.formClose();
      this.filterAxios(res, res => {
        this.successTips(msg);
        this._renderTableDate();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table .table-btn {
  padding: 0 20px 20px 0;
  margin-top: -20px;
}
</style>
