/*
 * @Author: viivLgr
 * @Date: 2018-06-01 17:39:38
 * @Last Modified by: viivLgr
 * @Last Modified time: 2018-06-01 17:40:32
 */
import { _axios } from "static/js/axios.js";
const _trade = {
  // 交易列表
  getList: function (data) {
    return _axios('/business/trade/pageList', 'POST', data);
  }
}

export default _trade;
