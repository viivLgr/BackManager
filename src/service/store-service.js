import { _axios } from "static/js/axios.js";
const _store = {
  getStoreList: function (data) {
    return _axios('/admin/merchant/list', 'POST', data);
  },
  // 添加商户
  addStroreUser: function (data) {
    return _axios('/admin/merchant/insert', 'POST', data);
  },
  // 添加商户
  updateStroreUser: function (data) {
    return _axios('/admin/merchant/update', 'POST', data);
  },
  // 查询商户详细信息
  getStoreDetailInfo: function(data) {
    return _axios('/admin/merchant/querybyid', 'POST', data);
  },
  // 查询应用信息详细信息
  getStoreAppInfo: function(data) {
    return _axios('/admin/merchant/apply', 'POST', data);
  },
  // 修改应用信息详细信息
  updateAppInfo: function(data) {
    return _axios('/admin/merchant/applyupdate', 'POST', data);
  }
}

export default _store;
