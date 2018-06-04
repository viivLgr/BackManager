/*
 * @Author: viivLgr
 * @Date: 2018-06-01 17:35:18
 * @Last Modified by: viivLgr
 * @Last Modified time: 2018-06-04 11:18:22
 */
import { _axios } from "static/js/axios.js";
const _app = {
  // 应用列表
  getList: function (data) {
    return _axios('/sys/application/pageList', 'POST', data);
  },
  // 修改应用信息
  updateApp: function (data) {
    return _axios('/admin/permission/function/update', 'POST', data);
  },
  // app接口列表
  getInterfaceList: function (data) {
    return _axios('/sys/application/interface/pageList', 'POST', data);
  },
  addInterfaceList: function (data) {
    return _axios('/sys/application/interface/add', 'POST', data);
  },
  updateInterfaceList: function (data) {
    return _axios('/sys/application/interface/update', 'POST', data);
  },
  // 获取可选择接口列表
  getCanUseInterfaceList: function (data) {
    return _axios('/sys/application/uninterface', 'POST', data);
  },
  // 开发平台接口列表
  getOpenAppList: function (data) {
    return _axios('/sys/open/interface/pageList', 'POST', data);
  },
  addOpenAppList: function (data) {
    return _axios('/sys/open/interface/add', 'POST', data);
  },
  updateOpenAppList: function (pathInterfaceId, data) {
    return _axios('/sys/open/interface/update/' + pathInterfaceId, 'POST', data);
  }
}

export default _app;
