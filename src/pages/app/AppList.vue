<template>
  <div class="container">
    <div class="header clearfix">
      <h2>应用列表</h2>
    </div>
    <div class="operating">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="应用ID" prop="appId">
                <el-input v-model="searchForm.appId"></el-input>
            </el-form-item>
            <el-form-item label="商户号" prop="merchantId">
                <el-input v-model="searchForm.merchantId"></el-input>
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
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" width="100" fixed></el-table-column>
        <el-table-column align="center" prop="appId" label="应用ID" fixed width="250"></el-table-column>
        <el-table-column align="center" prop="merchantId" label="商户号"></el-table-column>
        <el-table-column align="center" prop="md5Key" label="md5密钥" width="150"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="160"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" width="160"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operate.update" @click="handleForm(scope.row)" type="warning" size="mini">修改</el-button>
            <el-button @click="handelInterface(scope.row)" type="success" size="mini">接口列表</el-button>
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
      v-show="updateShow"
      :visible.sync="updateShow"
      title="修改"
      width="30%"
      :before-close="updateClose"
      center
      >
      <div>
        <el-form ref="updateForm" :model="updateForm" :rules="updateRules" size="small" label-width="105px">
          <el-form-item label="应用id">
            <el-input v-model="updateForm.appId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商户号">
            <el-input v-model="updateForm.merchantId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="md5密钥" prop="md5Key">
            <el-input v-model="updateForm.md5Key" placeholder="请输入md5密钥"></el-input>
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
        <el-button size="small" type="primary" @click="updateSubmit()">确 定</el-button>
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
        appId: "",
        merchantId: "",
        status: ""
      },
      updateRules: {
        md5Key: [{ required: true, message: "请输入md5密钥", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  created() {
    this._renderTableDate();
  },
  methods: {
    // 获取应用列表
    _renderTableDate(data) {
      const _this = this;
      _this.loading = true;
      _app.getList(data).then(res => {
        _this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            id: item.id,
            appId: item.appId,
            merchantId: item.merchantId,
            md5Key: item.md5Key,
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
      this._renderTableDate(this.searchForm);
    },
    // 去接口列表
    handelInterface(row) {
      this.$router.push({
        path: "/interface_list",
        query: {
          merchantId: row.merchantId,
          appId: row.appId
        }
      });
    },
    // 修改应用信息
    handleForm(row) {
      this.updateShow = true;
      this.updateForm = {
        id: row.id,
        appId: row.appId,
        merchantId: row.merchantId,
        md5Key: row.md5Key,
        status: computedStatus(row.status)
      };
    },
    updateSubmit() {
      _app.updateApp(this.updateForm.id, this.updateForm).then(res => {
        this.filterAxios(res, res => {
          this.successTips("修改成功");
          this.updateClose();
          this._renderTableDate();
        });
      });
    }
  }
};
</script>