import { _axios } from "static/js/axios.js";
const _router = {
  // 渠道列表
  getChannelList: function (data) {
    return _axios('/business/route/channel/pageList', 'POST', data);
  },
  // 获取渠道详情
  getChannelDetail: function (pathChannelId) {
    return _axios('/business/route/channel/' + pathChannelId);
  },
  // 添加渠道
  addChannel: function (data) {
    return _axios('/business/route/channel/add', 'POST', data);
  },
  // 修改渠道
  updateChannel: function (pathchannelId, data) {
    return _axios('/business/route/channel/update/' + pathchannelId, 'POST', data);
  },
  // 渠道支持银行列表
  getSupportBankList: function (data) {
    return _axios('/business/route/channel/supportBank/pageList', 'POST', data);
  },
  // 添加渠道支持银行
  addSupportBankList: function (data) {
    return _axios('/business/route/channel/supportBank/add', 'POST', data);
  },
  // 修改渠道支持银行
  updateSupportBankList: function (pathid, data) {
    return _axios('/business/route/channel/supportBank/update/' + pathid, 'POST', data);
  },
  // 商户渠道列表
  getStoreChannelList: function (data) {
    return _axios('/business/route/merchant/channel/pageList', 'POST', data);
  },
  // 校验商户号以及回显商户名称
  validMerchantId: function(pathMerchantlId) {
    return _axios('/business/route/merchant/name/' + pathMerchantlId);
  },
  // 添加商户渠道
  addStoreChannelList: function (data) {
    return _axios('/business/route/merchant/channel/add', 'POST', data);
  },
  // 修改商户渠道
  updateStoreChannelList: function (pathMerchantChannelId, data) {
    return _axios('/business/route/channel/update/' + pathMerchantChannelId, 'POST', data);
  },
  // 卡bin管理
  cardBinList: function (data) {
    return _axios('/business/route/cardBin/pageList', 'POST', data);
  },
  // 银行列表
  getBankList: function (data) {
    return _axios('/business/route/bank/pageList', 'POST', data);
  }
}

export default _router;
