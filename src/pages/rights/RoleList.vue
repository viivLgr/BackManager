<template>
  <div class="container">
    <div class="header clearfix">
      <h2>角色列表</h2>
    </div>
    <div class="table">
        <div class="table-btn" v-if="pageRight.add">
            <el-button size="mini" type="success" @click="handleForm('add')">添加角色</el-button>
        </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号"></el-table-column>
        <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" min-width="150" v-if="pageRight.update">
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
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="105px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
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
import { getStatusName } from "static/js/cache.js";
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
  methods: {
    init() {
      this.initPageRight("权限管理", "角色列表");
      this._renderTableDate();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "添加" && item.status === "VALID") {
          this.pageRight.add = true;
        }
        if (item.funcName === "修改" && item.status === "VALID") {
          this.pageRight.update = true;
        }
      });
    },
    // 获取角色列表
    _renderTableDate(data) {
      this.loading = true;
      _user.roleList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            roleId: item.roleId,
            roleName: item.roleName,
            remark: item.remark,
            status: item.status,
            statusDesc: getStatusName(item.status),
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
.table .table-btn{
  margin-top: -30px;
}
</style>