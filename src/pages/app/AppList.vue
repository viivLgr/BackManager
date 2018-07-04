<template>
  <div class="container">
    <div class="header clearfix">
      <h2>应用列表</h2>
    </div>
    <!-- 搜索 -->
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="应用ID" prop="appId">
                <el-input v-model="searchForm.appId" placeholder="请输入应用ID"></el-input>
            </el-form-item>
            <el-form-item label="商户号" prop="merchantId">
                <el-input v-model="searchForm.merchantId" placeholder="请输入商户号"></el-input>
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
    <!-- 内容 -->
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" min-width="100" fixed></el-table-column>
        <el-table-column align="center" prop="appId" label="应用ID" fixed min-width="250"></el-table-column>
        <el-table-column align="center" prop="merchantId" label="商户号" min-width="120"></el-table-column>
        <el-table-column align="center" prop="md5Key" label="md5密钥" min-width="150"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" min-width="160"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" min-width="160"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" fixed="right" min-width="180" v-if="pageRight.operate">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operate.update && pageRight.update" @click="handleForm(scope.row)" type="warning" size="mini">修改</el-button>
            <el-button v-if="pageRight.interfaceList" @click="handelInterface(scope.row)" type="success" size="mini">接口列表</el-button>
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
        <el-form ref="updateForm" :model="updateForm" :rules="updateRules" size="small" label-width="105px">
          <el-form-item label="商户号">
            <el-input v-model="updateForm.merchantId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商户名称">
            <el-input v-model="updateForm.merchantName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="APPID">
            <el-input v-model="updateForm.appId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="IP地址" prop="ipWhiteList">
            <el-input v-model="updateForm.ipWhiteList" placeholder="请输入IP地址"></el-input>
            <span class="tips">IP地址可以是多个，多个用英文逗号（“,”)隔开，也可以是IP地址段，如：115.12.113.33-78</span>  
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
import { getStatusName } from "static/js/cache.js";
import _app from "service/app-service.js";
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
        ipWhiteList: [
          { required: true, message: "请输入IP地址", trigger: "blur" }
        ],
        md5Key: [{ required: true, message: "请输入md5密钥", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  methods: {
    init() {
      this.initPageRight("应用管理", "应用列表");
      this._renderTableDate();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "查询" && item.status === "VALID") {
          this.pageRight.search = true;
        }
        if (item.funcName === "修改" && item.status === "VALID") {
          this.pageRight.update = true;
        }
        if (item.funcName === "接口列表" && item.status === "VALID") {
          this.pageRight.interfaceList = true;
        }
      });
      const pageRight = this.pageRight;
      if (pageRight.update || pageRight.interfaceList) {
        this.pageRight.operate = true;
      }
    },
    // 获取应用列表
    _renderTableDate(data) {
      this.loading = true;
      _app.getList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            id: item.id,
            appId: item.appId,
            merchantId: item.merchantId,
            md5Key: item.md5Key,
            status: getStatusName(item.status),
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
          id: row.id,
          merchantId: row.merchantId,
          appId: row.appId
        }
      });
    },
    // 获取应用详细信息
    getAppDetail(id) {
      return _app.getAppDetail(id).then(res => {
        this.filterAxios(res, res => {
          this.updateForm = res;
        });
      });
    },
    // 修改应用信息
    handleForm(row) {
      this.getAppDetail(row.id).then(res => {
        this.updateForm.id = row.id;
        this.updateShow = true;
      });
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
