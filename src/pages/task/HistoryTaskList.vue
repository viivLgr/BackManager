<template>
  <div class="container">
    <div class="header clearfix">
      <v-back path="back"/>
      <h2>运行历史任务</h2>
    </div>
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号"></el-table-column>
        <el-table-column align="center" prop="taskId" label="任务ID"></el-table-column>
        <el-table-column align="center" prop="jobName" label="任务名称"></el-table-column>
        <el-table-column align="center" prop="jobClass" label="任务类名" min-width="450"></el-table-column>
        <el-table-column align="center" prop="runResult" label="运行结果"></el-table-column>
        <el-table-column align="center" prop="completeTime" label="完成时间"></el-table-column>
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
  </div>
</template>
<script type="text/ecmascript-6">
import vBack from "components/Back.vue";
import { axiosMixin, listMixin } from "static/js/mixin.js";
import _task from "service/task-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  components: {
    vBack
  },
  data() {
    return {};
  },
  methods: {
    init() {
      this.initPageRight("定时任务管理", "定时任务");
      this.taskId = this.$route.query.taskId;
      this._renderTableDate();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "搜索" && item.status === "VALID") {
          this.pageRight.search = true;
        }
      });
    },
    // 获取列表
    _renderTableDate(data) {
      this.loading = true;
      _task.recodeTaskList(this.taskId, data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            taskId: item.taskId,
            recordId: item.recordId,
            jobName: item.jobName,
            jobClass: item.jobClass,
            runResult: item.runResult,
            completeTime: item.completeTime
          };
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
