<template>
  <div class="container">
    <div class="header clearfix">
      <h2>定时任务</h2>
    </div>
    <!-- 搜索 -->
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="任务类型">
                <el-select v-model="searchForm.taskType" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="(item, index) in jobTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务名称">
                <el-input v-model="searchForm.jobName" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="任务分组">
                <el-input v-model="searchForm.jobGroup" placeholder="请输入任务分组"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.jobStatus" placeholder="请选择">
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
      <div class="table-btn" v-if="pageRight.topOperate">
          <el-button v-if="pageRight.add" size="mini" type="success" @click="handleForm('add')">添加</el-button>
          <el-button v-if="pageRight.batchDelete" size="mini" type="danger" @click="handleBatch('delete')">删除</el-button>
          <el-button v-if="pageRight.batchActivat" size="mini" type="success" @click="handleBatch('activat')">激活</el-button>
          <el-button v-if="pageRight.batchClose" size="mini" type="warning" @click="handleBatch('close')">关闭</el-button>
          <el-button v-if="pageRight.runStatus" size="mini" type="success" @click="handleBatch('runStatus')">获取最新运行状态</el-button>
          <el-button v-if="pageRight.singleExec" size="mini" type="success" @click="handleBatch('singleExec')">单次执行</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
            fixed
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column align="center" prop="no" label="序号" fixed></el-table-column>
        <el-table-column align="center" prop="jobTypeDesc" label="任务类型" fixed width="100"></el-table-column>
        <el-table-column align="center" prop="jobName" label="任务名称" width="140" fixed></el-table-column>
        <el-table-column align="center" prop="jobClass" label="任务类名" width="350"></el-table-column>
        <el-table-column align="center" prop="jobProcTime" label="运行时间表达式" width="140"></el-table-column>
        <el-table-column align="center" prop="jobGroup" label="任务分组" width="140"></el-table-column>
        <el-table-column align="center" prop="jobParam" label="任务参数" width="140"></el-table-column>
        <el-table-column align="center" prop="jobStatusDesc" label="状态"></el-table-column>
        <el-table-column align="center" prop="lastGetRunstatusTime" label="最新运行状态获取时间" width="150"></el-table-column>
        <el-table-column align="center" prop="runStatus" label="运行状态"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="200" fixed="right" v-if="pageRight.operate">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operate.update && pageRight.update" @click="handleForm(scope.row, '修改')" type="warning" size="mini">修改</el-button>
            <el-button v-if="pageRight.taskList" @click="goHistoryTaskList(scope.row.taskId)" type="info" size="mini">运行历史任务</el-button>
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
      :small="true"
      v-show="addShow"
      :visible.sync="addShow"
      :title="form.title"
      width="30%"
      :before-close="addClose"
      center
      >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
          <el-form-item label="任务类型" prop="jobType">
            <el-select v-model="form.jobType" placeholder="请选择任务类型">
             <el-option v-for="(item, index) in jobTypeList" :key="index" :label="item.dicName" :value="item.dicCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称" prop="jobName">
            <el-input v-model="form.jobName" placeholder="请输入任务名称"></el-input>
          </el-form-item>
          <el-form-item label="任务类名" prop="jobClass">
            <el-input v-model="form.jobClass" placeholder="请输入任务类名"></el-input>
          </el-form-item>
          <el-form-item label="运行时间表达式" prop="jobProcTime">
            <el-input v-model="form.jobProcTime" placeholder="请输入运行时间表达式"></el-input>
          </el-form-item>
          <el-form-item label="任务分组" prop="jobGroup">
            <el-input v-model="form.jobGroup" placeholder="请输入任务分组"></el-input>
          </el-form-item>
          <el-form-item label="参数" prop="jobParam">
            <el-input v-model="form.jobParam" placeholder="请输入参数"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="jobStatus">
              <el-select v-model="form.jobStatus" placeholder="请选择状态">
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
import _task from "service/task-service.js";
import _common from "service/common-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      searchForm: {},
      jobTypeList: [],
      multipleSelection: [],
      form: {},
      rules: {
        jobType: [
          { required: true, message: "请选择任务分组", trigger: "blur" }
        ],
        jobName: [
          { required: true, message: "请输入任务名称", trigger: "blur" }
        ],
        jobClass: [
          { required: true, message: "请输入任务类名", trigger: "blur" }
        ],
        jobProcTime: [
          {
            required: true,
            message: "请输入任务运行时间表达式",
            trigger: "blur"
          }
        ],
        jobGroup: [
          { required: true, message: "请输入任务分组", trigger: "blur" }
        ],
        jobParam: [{ required: true, message: "请输入参数", trigger: "blur" }],
        jobStatus: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  methods: {
    init() {
      this.initPageRight("定时任务管理", "定时任务");
      this.getJobTypeList().then(() => {
        this._renderTableDate();
      });
    },
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
        if (item.funcName === "批量删除" && item.status === "VALID") {
          this.pageRight.batchDelete = true;
        }
        if (item.funcName === "批量激活" && item.status === "VALID") {
          this.pageRight.batchActivat = true;
        }
        if (item.funcName === "批量关闭" && item.status === "VALID") {
          this.pageRight.batchClose = true;
        }
        if (item.funcName === "单次执行" && item.status === "VALID") {
          this.pageRight.singleExec = true;
        }
        if (item.funcName === "获取最新运行状态" && item.status === "VALID") {
          this.pageRight.runStatus = true;
        }
        if (item.funcName === "运行记录" && item.status === "VALID") {
          this.pageRight.taskList = true;
        }
      });
      const pageRight = this.pageRight;
      if (
        pageRight.add ||
        pageRight.batchDelete ||
        pageRight.batchActivat ||
        pageRight.batchClose ||
        pageRight.singleExec ||
        pageRight.runStatus
      ) {
        this.pageRight.topOperate = true;
      }
      if (pageRight.update || pageRight.taskList) {
        this.pageRight.operate = true;
      }
    },
    // 查询
    searchSubmit(searchForm) {
      this._renderTableDate(this.searchForm);
    },
    // 计算多选勾选项
    handleSelectionChange(val) {
      const list = [];
      if (val.length) {
        val.map(item => {
          list.push(item.taskId);
        });
      }
      this.multipleSelection = list;
    },
    // 获取列表
    _renderTableDate(data) {
      this.loading = true;
      _task.getScheduledTaskList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            taskId: item.taskId,
            jobName: item.jobName,
            jobType: item.jobType,
            jobTypeDesc: this.cumputedJobTypeDesc(item.jobType),
            jobClass: item.jobClass,
            jobProcTime: item.jobProcTime,
            jobGroup: item.jobGroup,
            jobParam: item.jobParam,
            lastGetRunstatusTime: item.lastGetRunstatusTime,
            jobStatus: item.jobStatus,
            jobStatusDesc: getStatusName(item.jobStatus),
            runStatus: getStatusName(item.runStatus),
            operate: {
              update: true
            }
          };
        });
      });
    },
    // 添加/修改
    handleForm(row, type) {
      if (typeof row === "object") {
        this.form = {
          title: "修改",
          taskId: row.taskId,
          jobName: row.jobName,
          jobType: row.jobType,
          jobClass: row.jobClass,
          jobProcTime: row.jobProcTime,
          jobGroup: row.jobGroup,
          jobParam: row.jobParam,
          jobStatus: row.jobStatus
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
            _task.addScheduledTask(this.form).then(res => {
              this.formClose();
              this.formatResult(res, "添加成功");
            });
          } else {
            delete this.form.title;
            _task.updateScheduledTask(this.form.taskId, this.form).then(res => {
              this.formClose();
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
      this.filterAxios(res, res => {
        this.successTips(msg);
        this._renderTableDate();
      });
    },
    // 批量操作
    handleBatch(type) {
      if (!this.multipleSelection.length) {
        this.errorTips("请选择您要操作条目");
      } else {
        const data = { taskIdList: this.multipleSelection };
        if (type === "delete") {
          _task.batchDeleteScheduledTask(data).then(res => {
            this.formatResult(res, "删除成功");
          });
        } else if (type === "activat") {
          _task.batchActivatScheduledTask(data).then(res => {
            this.formatResult(res, "激活成功");
          });
        } else if (type === "close") {
          _task.batchCloseScheduledTask(data).then(res => {
            this.formatResult(res, "关闭成功");
          });
        } else if (type === "runStatus") {
          _task.runStatusScheduledTask(data).then(res => {
            this.formatResult(res, "获取最新运行状态成功");
          });
        } else if (type === "singleExec") {
          _task.singleExecScheduledTask(data).then(res => {
            this.formatResult(res, "单次执行成功");
          });
        }
        console.log("您选择的条目有：", this.multipleSelection);
      }
    },
    // 去运行历史任务列表
    goHistoryTaskList(taskId) {
      this.$router.push({
        path: "/history_task_list",
        query: {
          taskId: taskId
        }
      });
    },
    // merchantTypeList
    getJobTypeList() {
      return _common.getDictionaryList("JOB_TYPE").then(res => {
        this.filterAxios(res, res => {
          this.jobTypeList = res;
        });
      });
    },
    // 计算任务类型
    cumputedJobTypeDesc(type) {
      const jobType = this.jobTypeList.filter(item => {
        return item.dicCode === type;
      });
      return jobType[0].dicName;
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
