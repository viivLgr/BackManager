<template>
  <div class="container">
    <div class="header clearfix">
      <h2>用户列表</h2>
    </div>
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="searchForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="linkmanName">
                <el-input v-model="searchForm.linkmanName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="linkmanPhone">
                <el-input v-model="searchForm.linkmanPhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="linkmanEmail">
                <el-input v-model="searchForm.linkmanEmail"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <div class="table-btn" v-if="pageRight.add">
            <el-button size="mini" type="success" @click="handleForm('add')">添加用户</el-button>
        </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" width="100" fixed></el-table-column>
        <el-table-column align="center" prop="userName" label="用户名" fixed></el-table-column>
        <el-table-column align="center" prop="linkmanName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="linkmanPhone" label="联系方式" width="120"></el-table-column>
        <el-table-column align="center" prop="merchantName" label="所属机构"></el-table-column>
        <el-table-column align="center" prop="linkmanEmail" label="邮箱" width="150"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="160"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="100" fixed="right" v-if="pageRight.update">
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
      :title="form.formTitle"
      width="30%"
      :before-close="addClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="105px">
          <el-form-item label="商户">
            <el-input v-model="form.merchantName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="form.roleId" placeholder="请选择角色">
                <el-option v-for="(role, index) in roleList" :key="index" :label="role.roleName" :value="role.roleId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="linkmanName">
            <el-input v-model="form.linkmanName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="form.checkPass" type="password" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="linkmanPhone">
            <el-input v-model="form.linkmanPhone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="linkmanEmail">
            <el-input v-model="form.linkmanEmail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="form.qq" placeholder="请输入QQ"></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="wechat">
            <el-input v-model="form.wechat" placeholder="请输入微信号"></el-input>
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
import { getStatusName } from "static/js/cache.js";
import _user from "service/user-service.js";
export default {
  mixins: [axiosMixin, listMixin, validMixin],
  data() {
    return {
      searchForm: {
        userName: "",
        linkmanName: "",
        linkmanPhone: "",
        linkmanEmail: ""
      },
      searchRules: {
        userName: [
          { required: false, message: "请输入用户名", trigger: "blur" }
        ],
        nickName: [{ required: false, message: "请输入昵称", trigger: "blur" }],
        linkmanName: [
          { required: false, message: "请输入姓名", trigger: "blur" }
        ],
        linkmanPhone: [
          { required: false, message: "请输入联系电话", trigger: "blur" }
        ],
        linkmanEmail: [
          { required: false, message: "请输入邮箱", trigger: "blur" }
        ]
      },
      rules: {
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
        linkmanName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: this.checkPass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: this.checkPass2, trigger: "blur" }
        ],
        linkmanPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: this.checkPhone, trigger: "blur" }
        ],
        linkmanEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确格式的邮箱邮箱",
            trigger: "blur"
          }
        ],
        qq: [
          { required: true, message: "请输入QQ号", trigger: "blur" },
          { validator: this.checkQQ, trigger: "blur" }
        ],
        wechat: [
          { required: true, message: "请输入微信号", trigger: "blur" },
          { validator: this.checkWechat, trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      form: {
        formTitle: "添加"
      },
      roleList: []
    };
  },
  methods: {
    init() {
      this.initPageRight("权限管理", "用户列表");
      this._renderTableDate();
      this.getRoleList();
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
    // 获取用户列表
    _renderTableDate(data) {
      this.loading = true;
      _user.userList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            userId: item.userId,
            userName: item.userName,
            nickName: item.nickName,
            merchantId: item.merchantId,
            merchantName: item.merchantName,
            linkmanName: item.linkmanName,
            linkmanPhone: item.linkmanPhone,
            linkmanEmail: item.linkmanEmail,
            roleId: item.roleId,
            wechat: item.wechat,
            qq: item.qq,
            status: item.status,
            statusDesc: getStatusName(item.status),
            createTime: item.createTime,
            operate: {
              add: true,
              update: true
            }
          };
        });
      });
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
    // 获取roleList
    getRoleList() {
      _user.getRoleList().then(res => {
        this.filterAxios(res, res => {
          this.roleList = res;
        });
      });
    },
    // 获取用户详情
    getUserDetail(userId) {
      _user.getUserDetail(userId).then(res => {
        this.filterAxios(res, res => {
          this.form = {
            ...this.form,
            ...res
          };
        });
      });
    },
    // 添加 修改
    handleForm(row) {
      if (row instanceof Object) {
        this.getUserDetail(row.userId);
        this.form = {
          ...this.form,
          formTitle: "修改"
        };
      } else {
        this.form = {
          formTitle: "添加",
          merchantId: this.userInfo.merchantId,
          merchantName: this.userInfo.merchantName
        };
      }
      this.addShow = true;
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          delete this.form.checkPass; // 去掉确认密码属性
          if (this.form.formTitle === "添加") {
            delete this.form.formTitle
            _user.addUser(this.form).then(res => {
              this.formatResult(res, "添加用户成功");
            });
          } else {
            delete this.form.merchantName;
            _user.updateUser(this.form.userId, this.form).then(res => {
              this.formatResult(res, "修改用户信息成功");
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
  padding: 0 20px 20px 0;
  margin-top: -20px;
}
</style>