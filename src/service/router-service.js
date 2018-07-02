import { _axios } from "static/js/axios.js";
const _router = {
  // 渠道列表
  getChannelList: function (data) {
    return _axios('/business/route/channel/pageList', 'POST', data);
  },
  // 获取渠道详情
  getChannelDetail: function (channelId) {
    return _axios('/business/route/channel/' + channelId + '/detail');
  },
  // 添加渠道
  addChannel: function (data) {
    return _axios('/business/route/channel/add', 'POST', data);
  },
  // 修改渠道
  updateChannel: function (channelId, data) {
    return _axios('/business/route/channel/' + channelId + '/update', 'POST', data);
  },
  // 渠道支持银行列表
  getSupportBankList: function (data) {
    return _axios('/business/route/channel/supBank/pageList?channelId=' + data.channelId, 'POST', data);
  },
  // 渠道可添加银行列表
  getValidBankList: function (channelId) {
    return _axios('/business/route/channel/supBank/availableBankList?channelId=' + channelId);
  },
  // 添加渠道支持银行
  addSupportBankList: function (data) {
    return _axios('/business/route/channel/supBank/add?channelId=' + data.channelId, 'POST', data);
  },
  // 修改渠道支持银行
  updateSupportBankList: function (id, data) {
    return _axios('/business/route/channel/supBank/' + id + '/update', 'POST', data);
  },
  // 商户渠道列表
  getMerchantChannelList: function (data) {
    return _axios('/business/route/merchant/channel/pageList', 'POST', data);
  },
  // 根据商户号回显商户列表
  validMerchantId: function(merchantId) {
    return _axios('/business/route/merchant/channel/availableMerchantList?merchantId=' + merchantId);
  },
  // 添加商户渠道
  addMerchantChannelList: function (data) {
    return _axios('/business/route/merchant/channel/add', 'POST', data);
  },
  // 修改商户渠道
  updateMerchantChannelList: function (merchantChannelId, data) {
    return _axios('/business/route/merchant/channel/' + merchantChannelId + '/update', 'POST', data);
  },
  // 卡bin管理
  cardBinList: function (data) {
    return _axios('/business/route/cardBin/pageList', 'POST', data);
  },
  // 银行列表
  getBankList: function (data) {
    return _axios('/business/route/bank/pageList', 'POST', data);
  },
  // 添加银行
  addBank: function (data) {
    return _axios('/business/route/bank/add', 'POST', data);
  },
  // 修改银行
  updateBank: function (bankListId, data) {
    return _axios('/business/route/bank/' + bankListId + '/update', 'POST', data);
  }
}

export default _router;
