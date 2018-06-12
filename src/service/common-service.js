import { _axios } from "static/js/axios.js";
const _common = {
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
  }
}

export default _common;
