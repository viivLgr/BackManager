<template>
  <div class="container">
    <div class="header clearfix">
      <h2>码值管理</h2>
    </div>
    <div class="table">
        <div class="table-btn">
            <el-button size="mini" type="success" @click="addShow = true">添加码</el-button>
        </div>
      <el-table
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="id" label="序号"></el-table-column>
        <el-table-column align="center" prop="code" label="码值"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operate.update" @click="handleUpdate(scope.row)" type="warning" size="mini">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-show="addShow"
      :visible.sync="addShow"
      title="添加码"
      width="30%"
      :before-close="addClose"
      center
      >
      <div>
        <el-form ref="addForm" :model="addForm" size="small" label-width="105px">
          <el-form-item label="码值">
            <el-input v-model="addForm.code" placeholder="请输入码值"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addForm.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="状态">
              <el-select v-model="addForm.status" placeholder="请选择状态">
                  <el-option label="有效" value="1"></el-option>
                  <el-option label="无效" value="0"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
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
          <el-form-item label="码值">
            <el-input v-model="updateForm.code" placeholder="请输入码值"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="updateForm.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="状态">
              <el-select v-model="updateForm.status" placeholder="请选择状态">
                  <el-option label="有效" value="1"></el-option>
                  <el-option label="无效" value="0"></el-option>
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
export default {
  data() {
    return {
      addShow: false,
      addForm: {},
      updateShow: false,
      updateForm: {},
      tableData: [
        {
          id: "1",
          code: "code",
          remark: "remark",
          status: 1,
          createTime: "2018-04-30",
          updateTime: "2018-04-30",
          operate: {
            update: true
          }
        },
        {
          id: "2",
          code: "code",
          remark: "remark",
          status: 1,
          createTime: "2018-04-30",
          updateTime: "2018-04-30",
          operate: {
            update: true
          }
        },
        {
          id: "3",
          code: "code",
          remark: "remark",
          status: 1,
          createTime: "2018-04-30",
          updateTime: "2018-04-30",
          operate: {
            update: true
          }
        }
      ]
    };
  },
  methods: {
    addClose() {
      this.addShow = false;
      this.$refs["addForm"].resetFields();
    },
    addSubmit() {
      console.log("addSubmit!");
    },
    updateClose() {
      this.updateShow = false;
      this.$refs["updateForm"].resetFields();
    },
    updateSubmit() {
      console.log("updateSubmit!");
    },
    handleAdd(row) {
      let id = row.id;
      this.addShow = true;
      this.addForm = {};
      console.log("handleAdd!", row, id);
    },
    handleUpdate(row) {
      let id = row.id;
      this.updateShow = true;
      this.updateForm = {
        code: row.code,
        remark: row.remark,
        status: row.status
      };
      console.log("handleUpdate!", row, id);
    }
  }
};
</script>