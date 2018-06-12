/*
 * @Author: viivLgr
 * @Date: 2018-06-01 17:39:38
 * @Last Modified by: viivLgr
 * @Last Modified time: 2018-06-11 16:39:23
 */
import { _axios } from "static/js/axios.js";
const _trade = {
  // 交易列表
  getList: function (data) {
    return _axios('/business/trade/pageList', 'POST', data);
  },
  // 交易详情
  getDetail: function (orderId) {
    return _axios('/business/trade/' + orderId + '/detail', 'POST');
  },
  // 差错账列表
  getPayCheckUpErrorList: function (data) {
    return _axios('/business/trade/payCheckUpError/pageList', 'POST', data);
  },
  // 差错账处理
  updatePayCheckUpErrorList: function (errorId) {
    return _axios('/business/trade/payCheckUpError/' + errorId + '/update', 'POST');
  },
  // 交易报表-日
  getReportDay: function (data) {
    return _axios('/business/trade/tradeOrderStatisticsDay/pageList', 'POST', data);
  },
  // 交易报表-月
  getReportMonth: function (data) {
    return _axios('/business/trade/tradeOrderStatisticsMonth/pageList', 'POST', data);
  },
  // 交易报表-商户-日
  getReportMerchantDay: function (data) {
    return _axios('/business/trade/tradeMerchantStatisticsDay/pageList', 'POST', data);
  },
  // 交易报表-商户-月
  getReportMerchantMonth: function (data) {
    return _axios('/business/trade/tradeMerchantStatisticsMonth/pageList', 'POST', data);
  },
  // 交易报表-渠道-日
  getReportChannelDay: function (data) {
    return _axios('/business/trade/tradeChannelStatisticsDay/pageList', 'POST', data);
  },
  // 交易报表-渠道-月
  getReportChannelMonth: function (data) {
    return _axios('/business/trade/tradeChannelStatisticsMonth/pageList', 'POST', data);
  },
  // 交易报表-利润-日
  getReportProfitDay: function (data) {
    return _axios('/business/trade/tradeProfitStatisticsDay/pageList', 'POST', data);
  },
  // 交易报表-利润-月
  getReportProfitMonth: function (data) {
    return _axios('/business/trade/tradeProfitStatisticsMonth/pageList', 'POST', data);
  }

}

export default _trade;
