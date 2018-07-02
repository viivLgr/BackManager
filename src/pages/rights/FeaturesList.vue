<template>
  <div class="container">
    <div class="header clearfix">
      <h2>功能列表</h2>
    </div>
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="功能" prop="funcName">
                <el-input v-model="searchForm.funcName"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
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
    <!-- 表格 -->
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" width="100"></el-table-column>
        <el-table-column align="center" prop="funcName" label="功能" width="150"></el-table-column>
        <el-table-column align="center" prop="funcLevel" label="级别"></el-table-column>
        <el-table-column align="center" prop="funcPath" label="URL" width="320"></el-table-column>
        <el-table-column align="center" prop="parentName" label="上级"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" width="160"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" v-if="pageRight.add || pageRight.update" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operate.add && pageRight.add" @click="handleAdd(scope.row)" type="success" size="mini">添加</el-button>
            <el-button v-if="scope.row.operate.update && pageRight.update" @click="handleUpdate(scope.row)" type="warning" size="mini">修改</el-button>
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
    <!-- 添加 -->
    <el-dialog
      v-show="addShow"
      :visible.sync="addShow"
      title="添加"
      width="30%"
      :before-close="addClose"
      center
      >
      <div>
        <el-form ref="addForm" :model="addForm" size="small" label-width="105px">
          <el-form-item label="上级功能">
            <el-input v-model="addForm.parentName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="功能">
            <el-input v-model="addForm.funcName"></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input v-model="addForm.funcPath"></el-input>
          </el-form-item>
          <el-form-item label="级别">
              <el-select v-model="addForm.funcLevel" placeholder="请选择级别">
                  <el-option v-for="(item, index) in levelList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="状态">
              <el-select v-model="addForm.status" placeholder="请选择状态">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      v-show="updateShow"
      :visible.sync="updateShow"
      title="修改"
      width="30%"
      :before-close="updateClose"
      center
      >
      <div>
        <el-form ref="updateForm" :model="updateForm" size="small" label-width="105px">
          <el-form-item label="功能">
            <el-input v-model="updateForm.funcName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input v-model="updateForm.funcPath" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="状态">
              <el-select v-model="updateForm.status" placeholder="请选择状态">
                  <el-option v-for="(item, index) in statusList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="updateShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="updateSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { axiosMixin, listMixin } from "static/js/mixin.js";
import { getStatusName } from "static/js/cache.js";
import _feature from "service/feature-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      levelList: [1, 2, 3, 4],
      searchForm: {
        funcName: "",
        status: ""
      },
      searchRules: {
        funcName: [
          { required: false, message: "请输入功能名称", trigger: "blur" }
        ],
        status: [{ required: false, message: "请选择状态", trigger: "change" }]
      }
    };
  },
  methods: {
    init() {
      this.initPageRight("权限管理", "功能列表");
      this._renderTableDate();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "搜索" && item.status === "VALID") {
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
    // 获取功能列表
    _renderTableDate(data) {
      this.loading = true;
      _feature.getList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            funcId: item.funcId,
            funcName: item.funcName,
            funcLevel: item.funcLevel,
            funcPath: item.funcPath,
            parentFuncId: item.parentFuncId,
            parentName: item.parentName,
            status: item.status,
            statusDesc: getStatusName(item.status),
            updateTime: item.modifiedTime,
            operate: {
              add: item.funcLevel < 4 && item.status === "VALID",
              update: true
            }
          };
        });
      });
    },
    // 查询
    searchSubmit(searchForm) {
      this.$refs[searchForm].validate(valid => {
        console.log("valid", valid);
        if (valid) {
          let funcName = this.$refs[searchForm].model.funcName;
          let status = this.$refs[searchForm].model.status;
          this._renderTableDate({
            funcName: funcName,
            status: status
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 打开add弹窗
    handleAdd(row) {
      this.addShow = true;
      const level = row.funcLevel;
      this.levelList = this.levelList.filter(item => {
        return item > level;
      });
      this.addForm = {
        parentFuncId: row.funcId,
        parentName: row.funcName
      };
    },
    addClose() {
      this.levelList = [1, 2, 3, 4];
      this.addShow = false;
      this.$refs["addForm"] && this.$refs["addForm"].resetFields();
    },
    // 添加
    addSubmit() {
      _feature.add(this.addForm).then(res => {
        this.formatResult(res, this.updateClose, "添加成功");
        this.addClose();
      });
    },
    // 打开修改弹窗
    handleUpdate(row) {
      this.updateShow = true;
      this.updateForm = {
        funcId: row.funcId,
        funcName: row.funcName,
        funcPath: row.funcPath,
        // funcLevel: row.funcLevel,
        // parentFuncId: row.parentFuncId,
        status: row.status
      };
    },
    // 修改
    updateSubmit() {
      const funcId = this.updateForm.funcId;
      delete this.updateForm.funcId;
      _feature.update(funcId, this.updateForm).then(res => {
        this.formatResult(res, this.updateClose, "修改成功");
        this.updateClose();
      });
    },
    formatResult(res, callback, msg) {
      typeof callback === "function" && callback();
      this.filterAxios(res, res => {
        this.successTips(msg);
        this._renderTableDate();
      });
    }
  }
};
</script>