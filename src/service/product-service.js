import { _axios } from "static/js/axios.js";
const _product = {
  // 产品列表
  getList: function (data) {
    return _axios('/business/merchant/merchantProduct/pageList', 'POST', data);
  },
  // 添加产品前查询产品列表和类型
  getAgentProductList(merchantId) {
    return _axios('/business/merchant/merchantProduct/agentProductList?merchantId=' + merchantId);
  },
  add: function (data) {
    return _axios('/business/merchant/merchantProduct/add?merchantId=' + data.merchantId, 'POST', data);
  },
  update: function (id, data) {
    return _axios('/business/merchant/merchantProduct/' + id + '/update', 'POST', data);
  }
}

export default _product;
