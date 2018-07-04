<template>
  <div class="container">
    <div class="header clearfix">
      <v-back path="back"/>
      <h2>接口列表</h2>
    </div>
    <!-- 内容 -->
    <div class="table">
      <!-- 添加 -->
      <div class="table-btn" v-if="pageRight.add">
          <el-button size="mini" type="success" @click="handleForm('add')">添加</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号" min-width="100" fixed></el-table-column>
        <el-table-column align="center" prop="interfaceName" label="接口名称" fixed></el-table-column>
        <el-table-column align="center" prop="interfaceVersion" label="接口版本号"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" min-width="160"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" min-width="160"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" min-width="100" fixed="right" v-if="pageRight.update">
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
        <el-form ref="form" :model="form" size="small" label-width="105px">
          <el-form-item label="商户号">
            <el-input v-model="form.merchantId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="APPID">
            <el-input v-model="form.appId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="接口名称">
            <template v-if="form.formTitle==='添加'">
              <el-select v-model="form.interfaceId" placeholder="请选择接口">
                <el-option v-for="(item, index) in interfaceList" :key="index" :label="item.interfaceName + '-' +  item.interfaceVersion" :value="item.interfaceId"></el-option>
              </el-select>
            </template>
            <template v-else-if="form.formTitle==='修改'">
              <el-input v-model="form.interfaceName" :disabled="true"></el-input>
            </template> 
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
import vBack from "components/Back.vue";
import { axiosMixin, listMixin, validMixin } from "static/js/mixin.js";
import { getStatusName } from "static/js/cache.js";
import _app from "service/app-service.js";
export default {
  mixins: [axiosMixin, listMixin, validMixin],
  components: {
    vBack
  },
  data() {
    return {
      searchForm: {},
      form: {},
      interfaceList: []
    };
  },
  methods: {
    init() {
      this.initPageRight("应用管理", "应用列表");
      const data = this.$route.query;
      this.searchForm = {
        ...this.searchForm,
        id: data.id
      };
      this.appId = data.appId;
      this.merchantId = data.merchantId;
      this._renderTableDate(this.searchForm);
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "接口列表-添加" && item.status === "VALID") {
          this.pageRight.add = true;
        }
        if (item.funcName === "接口列表-修改" && item.status === "VALID") {
          this.pageRight.update = true;
        }
      });
    },
    // 获取接口列表
    _renderTableDate(data) {
      this.loading = true;
      _app.getInterfaceList(this.searchForm.id, data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            id: item.id,
            interfaceId: item.interfaceId,
            interfaceName: item.interfaceName,
            interfaceVersion: item.interfaceVersion,
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
    // 添加 修改
    handleForm(row) {
      if (row instanceof Object) {
        this.form = {
          formTitle: "修改",
          id: row.id,
          appId: this.appId,
          merchantId: this.merchantId,
          interfaceId: row.interfaceId,
          interfaceName: row.interfaceName,
          interfaceVersion: row.interfaceVersion,
          status: row.status
        };
      } else {
        this.getInterfaceList();
        this.form = {
          formTitle: "添加",
          appId: this.appId,
          merchantId: this.merchantId
        };
      }
      this.addShow = true;
    },
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.formTitle === "添加") {
            delete this.form.formTitle;
            _app.addInterfaceList(this.form).then(res => {
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.formTitle;
            _app.updateInterfaceList(this.form.id, this.form).then(res => {
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
      this.interfaceList = [];
      this.form = {};
      this.$refs["form"] && this.$refs["form"].resetFields();
    },
    formatResult(res, msg) {
      this.formClose();
      this.filterAxios(res, res => {
        this.successTips(msg);
        this._renderTableDate(this.searchForm);
      });
    },
    // 可选接口列表
    getInterfaceList() {
      _app.getCanUseInterfaceList(this.appId).then(res => {
        this.filterAxios(res, res => {
          this.interfaceList = res;
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table .table-btn {
  margin-top: -30px;
}
</style>