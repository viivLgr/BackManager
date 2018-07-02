import { _axios } from "static/js/axios.js";
const _task = {
  // 定时任务列表
  getScheduledTaskList: function (data) {
    return _axios('/business/task/pageList', 'POST', data);
  },
  // 添加
  addScheduledTask: function (data) {
    return _axios('/business/task/add', 'POST', data);
  },
  // 修改
  updateScheduledTask: function (taskId, data) {
    return _axios('/business/task/' + taskId + '/update', 'POST', data);
  },
  // 批量删除
  batchDeleteScheduledTask: function (data) {
    return _axios('/business/task/batchDelete', 'POST', data);
  },
  // 批量关闭
  batchCloseScheduledTask: function (data) {
    return _axios('/business/task/disableTaskList', 'POST', data);
  },
  // 批量激活
  batchActivatScheduledTask: function (data) {
    return _axios('/business/task/enableTaskList', 'POST', data);
  },
  // 获取最新运行状态
  runStatusScheduledTask: function (data) {
    return _axios('/business/task/getTaskJobRunStatus', 'POST', data);
  },
  // 单次执行
  singleExecScheduledTask: function (data) {
    return _axios('/business/task/doTaskListNow', 'POST', data);
  },
  // 运行历史记录
  recodeTaskList: function (taskId, data) {
    return _axios('/business/task/record/pageList?taskId=' + taskId, 'POST', data);
  }
}

export default _task;
