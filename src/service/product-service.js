import { _axios } from "static/js/axios.js";
const _product = {
  // 产品列表
  getList: function (data) {
    return _axios('/admin/merchant/productlist', 'POST', data);
  },
  // 添加产品前查询产品列表和类型
  getProductAndTypeList(data) {
    return _axios('/admin/merchant/productname', 'POST', data);
  },
  add: function (data) {
    return _axios('/admin/merchant/product/insert', 'POST', data);
  },
  update: function (data) {
    return _axios('/admin/merchant/product/update', 'POST', data);
  }
}

export default _product;
