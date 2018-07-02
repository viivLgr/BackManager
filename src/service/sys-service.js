/*
 * @Author: viivLgr
 * @Date: 2018-06-15 10:48:13
 * @Last Modified by: viivLgr
 * @Last Modified time: 2018-06-15 11:04:30
 */

import { _axios } from "static/js/axios.js";
const _sys = {
  /**
   * 获取字典表
   * CARD_TYPE-卡类型
   * CHANNEL_TYPE-渠道类型
   * MERCHANT_TYPE-商户类型
   * PAY_TYPE-支付方式
   * PRODUCT_CODE-产品编码
   * PROD_RATE_TYPE-商户产品费率类型
   * RECORD_STATUS-记录状态
   * TRADE_STATUS-交易状态
   * TRADE_TYPE-交易类型
   */
  getDictionaryList: function (parentCode) {
    return _axios('/sys/dic/' + parentCode + '/list');
  },
  // 字典列表分页查询
  getDicList: function (data) {
    return _axios('/sys/dic/pageList', 'POST', data);
  },
  // 字典添加
  addDictionary: function (data) {
    return _axios('/sys/dic/add', 'POST', data);
  },
  // 字典修改
  updateDictionary: function (id, data) {
    return _axios('/sys/dic/' + id + '/update', 'POST', data);
  },
  // 错误码列表分页查询
  getErrorCodeList: function (data) {
    return _axios('/sys/errorCode/pageList', 'POST', data);
  },
  // 错误码添加
  addErrorCode: function (data) {
    return _axios('/sys/errorCode/add', 'POST', data);
  },
  // 错误码批量添加
  batchAddErrorCode: function (data) {
    return _axios('/sys/errorCode/batchAdd', 'POST', data);
  },
  // 错误码修改
  updateErrorCode: function (id, data) {
    return _axios('/sys/errorCode/' + id + '/update', 'POST', data);
  }
}

export default _sys;
