/*
 * @Author: viivLgr
 * @Date: 2018-06-01 17:35:18
 * @Last Modified by: viivLgr
 * @Last Modified time: 2018-06-15 18:26:38
 */
import { _axios } from "static/js/axios.js";
const _app = {
  // 应用列表
  getList: function (data) {
    return _axios('/business/merchant/openApp/pageList', 'POST', data);
  },
  // 应用详情
  getAppDetail: function (id) {
    return _axios('/business/merchant/openApp/' + id + '/detail');
  },
  // 修改应用信息
  updateApp: function (id, data) {
    return _axios('/business/merchant/openApp/' + id + '/update', 'POST', data);
  },
  // 商户应用接口列表
  getInterfaceList: function (id, data) {
    return _axios('/business/merchant/openApp/interface/pageList?id=' + id, 'POST', data);
  },
  // 商户应用接口添加
  addInterfaceList: function (data) {
    return _axios('/business/merchant/openApp/interface/add?appId=' + data.appId, 'POST', data);
  },
  // 商户应用接口修改
  updateInterfaceList: function (id, data) {
    return _axios('/business/merchant/openApp/interface/' + id + '/update', 'POST', data);
  },
  // 获取可选择接口列表
  getCanUseInterfaceList: function (appId) {
    return _axios('/business/merchant/openApp/availableInterfaceList?appId=' + appId);
  },
  // 开发平台接口列表
  getOpenAppList: function (data) {
    return _axios('/business/interface/pageList', 'POST', data);
  },
  addOpenAppList: function (data) {
    return _axios('/business/interface/add', 'POST', data);
  },
  updateOpenAppList: function (interfaceId, data) {
    return _axios('/business/interface/' + interfaceId + '/update', 'POST', data);
  }
}

export default _app;
