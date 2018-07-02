import { _axios } from "static/js/axios.js";
const _merchant = {
  getMerchantList: function (data) {
    return _axios('/business/merchant/pageList', 'POST', data);
  },
  // 添加商户
  addStroreUser: function (data) {
    return _axios('/business/merchant/add', 'POST', data);
  },
  // 修改商户
  updateStroreUser: function (id, data) {
    return _axios('/business/merchant/' + id + '/update', 'POST', data);
  },
  // 查询商户详细信息
  getMerchantDetailInfo: function(id) {
    return _axios('/business/merchant/' + id + '/detail');
  },
  // 查询应用信息详细信息
  getMerchantAppInfo: function(merchantId) {
    return _axios('/business/merchant/' + merchantId + '/merchantOpenApp/detail');
  },
  // 修改应用信息详细信息
  updateAppInfo: function(merchantId, data) {
    return _axios('/business/merchant/' + merchantId + '/merchantOpenApp/update', 'POST', data);
  }
}

export default _merchant;
