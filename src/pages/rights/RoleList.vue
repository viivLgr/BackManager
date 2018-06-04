<template>
  <div class="container">
    <div class="header clearfix">
      <h2>角色列表</h2>
    </div>
    <div class="table">
        <div class="table-btn">
            <el-button size="mini" type="success" @click="handleForm('add')">添加角色</el-button>
        </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="roleId" label="序号"></el-table-column>
        <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="150">
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
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option label="有效" value="VALID"></el-option>
                  <el-option label="无效" value="INVALID"></el-option>
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
import _user from "service/user-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      form: {},
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        remark: [{ required: false, message: "请输入备注", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  created() {
    this._renderTableDate();
  },
  methods: {
    // 获取角色列表
    _renderTableDate(data) {
      const _this = this;
      _this.loading = true;
      _user.roleList(data).then(res => {
        _this.renderTableDate(res, item => {
          return {
            roleId: item.roleId,
            roleName: item.roleName,
            remark: item.remark,
            status: item.status === "VALID" ? "生效" : "失效",
            createTime: item.createTime,
            updateTime: item.modifiedTime,
            operate: {
              add: true,
              update: true
            }
          };
        });
      });
    },
    // 获取角色详情
    getRoleDetail(roleId) {
      _user.getRoleDetail(roleId).then(res => {
        this.filterAxios(res, res => {
          this.form = {
            ...this.form,
            ...res
          };
        });
      });
    },
    // 添加/修改角色
    handleForm(row) {
      this.addShow = true;
      if (typeof row === "object") {
        this.getRoleDetail(row.roleId);
        this.form = {
          ...this.form,
          title: "修改"
        };
      } else {
        this.form = {
          title: "添加"
        };
      }
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.title === "添加") {
            delete this.form.title;
            _user.addRole(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.title;
            _user.updateRole(this.form.roleId, this.form).then(res => {
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