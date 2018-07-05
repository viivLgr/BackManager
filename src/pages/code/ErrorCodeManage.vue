<template>
  <div class="container">
    <div class="header clearfix">
      <h2>错误码管理</h2>
    </div>
    <!-- 搜索 -->
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="渠道错误码" prop="channelRespCode">
                <el-input v-model="searchForm.channelRespCode" placeholder="请输入渠道错误码"></el-input>
            </el-form-item>
            <el-form-item label="渠道错误描述" prop="channelRespDesc">
                <el-input v-model="searchForm.channelRespDesc" placeholder="请输入渠道错误码描述"></el-input>
            </el-form-item>
            <el-form-item label="平台错误码" prop="respCode">
                <el-input v-model="searchForm.respCode" placeholder="请输入平台错误码"></el-input>
            </el-form-item>
            <el-form-item label="平台错误描述" prop="respDesc">
                <el-input v-model="searchForm.respDesc" placeholder="请输入平台错误码描述"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 内容 -->
    <div class="table">
        <div class="table-btn" v-if="pageRight.add || pageRight.import">
          <el-button v-if="pageRight.add" size="mini" type="success" @click="handleForm('添加')">添加错误码</el-button>
          <div class="upload-wrap" v-if="pageRight.import">
            <el-form>
              <el-upload
                class="upload-demo"
                :headers="headers"
                name="file"
                :action="uploadUrl"
                :before-upload="beforeImport"
                :on-success="successImport"
                :show-file-list="false"
                accept="">
                <el-button size="mini" type="warning">导入错误码</el-button>
              </el-upload>
            </el-form>
          </div>
        </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="channelCode" label="渠道编码" fixed></el-table-column>
        <el-table-column align="center" prop="channelName" label="渠道名称" min-width="100" fixed></el-table-column>
        <el-table-column align="center" prop="channelRespCode" label="渠道错误码"></el-table-column>
        <el-table-column align="center" prop="channelRespDesc" label="渠道错误码描述" min-width="160"></el-table-column>
        <el-table-column align="center" prop="respCode" label="平台错误码"></el-table-column>
        <el-table-column align="center" prop="respDesc" label="平台错误码描述" min-width="160"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
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
      :small="true"
      v-show="addShow"
      :visible.sync="addShow"
      :title="form.title"
      width="30%"
      :before-close="addClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="125px">
          <el-form-item label="渠道编码" prop="channelCode">
            <el-select v-model="form.channelCode" placeholder="请选择渠道编码">
              <el-option v-for="(item, index) in channelList" :key="index" :label="item.channelName" :value="item.channelCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道错误码" prop="channelRespCode">
            <el-input v-model="form.channelRespCode" placeholder="请输入渠道错误码"></el-input>
          </el-form-item>
          <el-form-item label="渠道错误码描述" prop="channelRespDesc">
            <el-input v-model="form.channelRespDesc" placeholder="请输入渠道错误码描述"></el-input>
          </el-form-item>
          <el-form-item label="平台错误码" prop="respCode">
            <el-input v-model="form.respCode" placeholder="请输入平台错误码"></el-input>
          </el-form-item>
          <el-form-item label="平台错误码描述" prop="respDesc">
            <el-input v-model="form.respDesc" placeholder="请输入平台错误码"></el-input>
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
import { axiosMixin, listMixin } from "static/js/mixin.js";
import { getStatusName, getUserInfo } from "static/js/cache.js";
import _sys from "service/sys-service.js";
import _router from "service/router-service.js";

export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      searchForm: {},
      searchRules: {
        channelRespCode: [
          { required: false, message: "请输入渠道错误码", trigger: "blur" },
          { max: 6, message: "错误码不得超过6位", trigger: "blur" }
        ],
        channelRespDesc: [
          { required: false, message: "请输入渠道错误描述", trigger: "blur" }
        ],
        respCode: [
          { required: false, message: "请输入平台错误码", trigger: "blur" },
          { max: 6, message: "错误码不得超过6位", trigger: "blur" }
        ],
        respDesc: [
          { required: false, message: "请输入平台错误描述", trigger: "blur" }
        ]
      },
      form: {},
      rules: {
        channelCode: [
          { required: true, message: "请输入渠道编码", trigger: "blur" }
        ],
        channelRespCode: [
          { required: true, message: "请输入渠道错误码", trigger: "blur" },
          { max: 6, message: "错误码不得超过6位", trigger: "blur" }
        ],
        channelRespDesc: [
          { required: true, message: "请输入渠道错误描述", trigger: "blur" }
        ],
        respCode: [
          { required: true, message: "请输入平台错误码", trigger: "blur" },
          { max: 6, message: "错误码不得超过6位", trigger: "blur" }
        ],
        respDesc: [
          { required: true, message: "请输入平台错误码描述", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      channelList: [],
      headers: {
        token: localStorage.getItem("token"),
        userId: getUserInfo("userInfo").userId
      },
      uploadUrl: process.env.BASE_API + "/sys/errorCode/batchAdd"
    };
  },
  methods: {
    init() {
      this.initPageRight("系统参数", "错误码管理");
      this._renderTableDate();
      this.getChannelList();
    },
    // 计算页面操作状态
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "搜索" && item.status === "VALID") {
          this.pageRight.search = true;
        }
        if (item.funcName === "导入" && item.status === "VALID") {
          this.pageRight.import = true;
        }
        if (item.funcName === "添加" && item.status === "VALID") {
          this.pageRight.add = true;
        }
        if (item.funcName === "修改" && item.status === "VALID") {
          this.pageRight.update = true;
        }
      });
    },
    // 文件上传
    fileUpload() {
      this.$refs["uploadform"].submit();
    },
    // 查询
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
    // 获取列表
    _renderTableDate(data) {
      this.loading = true;
      _sys.getErrorCodeList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            id: item.id,
            channelCode: item.channelCode,
            channelName: item.channelName,
            channelRespCode: item.channelRespCode,
            channelRespDesc: item.channelRespDesc,
            respCode: item.respCode,
            respDesc: item.respDesc,
            createTime: item.createTime,
            updateTime: item.modifiedTime,
            status: item.status,
            statusDesc: getStatusName(item.status),
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
    // 添加/修改
    handleForm(row) {
      if (typeof row === "object") {
        this.form = {
          title: "修改",
          id: row.id,
          channelCode: row.channelCode,
          channelRespCode: row.channelRespCode,
          channelRespDesc: row.channelRespDesc,
          respCode: row.respCode,
          respDesc: row.respDesc,
          status: row.status
        };
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
            _sys.addErrorCode(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.title;
            _sys.updateErrorCode(this.form.id, this.form).then(res => {
              this.formatResult(res, "修改成功");
            });
          }
        } else {
          return false;
        }
      });
    },
    formClose() {
      this.$refs["form"] && this.$refs["form"].resetFields();
      this.addShow = false;
      this.form = {};
    },
    formatResult(res, msg) {
      this.formClose();
      this.filterAxios(res, res => {
        this.successTips(msg);
        this._renderTableDate();
      });
    },
    // 批量导入
    beforeImport(file, fileList) {
      const fileName = file.name;
      const fileType = fileName.substring(
        fileName.lastIndexOf("."),
        fileName.length
      );
      if (fileType === ".xls" || fileType === ".xlsx") {
        return true;
      } else {
        this.errorTips(
          "对不起，导入数据格式必须是xls格式文件哦，请您调整格式后重新上传，谢谢 ！"
        );
        return false;
      }
    },
    // 批量导入成功
    successImport() {
      this.successTips('导入成功');
      this._renderTableDate(this.searchForm);
    }
  }
};
</script>
<style lang="scss" scoped>
.table .table-btn {
  padding: 0 20px 20px 0;
  margin-top: -20px;
  .upload-wrap {
    display: inline-block;
    margin-left: 10px;
    .el-upload-list {
      display: inline-block;
    }
  }
}
</style>