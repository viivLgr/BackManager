import storage from 'good-storage'

const TOKEN = '__token__';
const USER_INFO = '__userInfo__';
const USER_RIGHT = '__userRight__'
const SYS_STATUS_LIST = '__statusList__'
const MERCHANT_TYPE_LIST = '__merchantTypeList__'
const CARD_TYPE_LIST = '__cardTypeList__'
const RATE_TYPE_LIST = '__rateTypeList__'

/**
 * token
 */
export function setToken(token) {
  storage.set(TOKEN, token)
  return token;
}
export function getToken() {
  return storage.get(TOKEN)
}

/**
 * userinfo
 */
export function setUserInfo(userInfo) {
  storage.set(USER_INFO, userInfo)
  return userInfo;
}
export function getUserInfo() {
  return storage.get(USER_INFO)
}

/**
 * 权限树
 */
export function setUserRight(userRight) {
  storage.set(USER_RIGHT, userRight)
  return userRight;
}

export function getUserRight() {
  return storage.get(USER_RIGHT) || null
}

// 获取pageright
export function getPageRight(lv1, lv2) {
  return getUserRight() && getUserRight().filter(item => {
    return item.funcName === lv1;
  })[0]
  .children.filter(item => {
    return item.funcName === lv2;
  })
}

/**
 * 状态列表
 */
export function setStatus(statusList) {
  storage.set(SYS_STATUS_LIST, statusList);
  return statusList;
}
export function getStatus() {
  return storage.get(SYS_STATUS_LIST);
}
export function getStatusName(code) {
  return getDicName(SYS_STATUS_LIST, code);
}
export function getStatusCode(name) {
  return getDicCode(SYS_STATUS_LIST, name);
}

/**
 * 商户类型
 */
export function setMerchantType(merchantTypeList) {
  storage.set(MERCHANT_TYPE_LIST, merchantTypeList);
  return merchantTypeList;
}
export function getMerchantType() {
  return storage.get(MERCHANT_TYPE_LIST);
}
export function getmerchantTypeName(code) {
  return getDicName(MERCHANT_TYPE_LIST, code);
}
export function getmerchantTypeCode(name) {
  return getDicCode(MERCHANT_TYPE_LIST, name);
}

/**
 * 费率类型
 */
export function setRateType(rateTypeList) {
  storage.set(RATE_TYPE_LIST, rateTypeList);
  return rateTypeList;
}
export function getRateType() {
  return storage.get(RATE_TYPE_LIST);
}
export function getRateTypeName(code) {
  return getDicName(RATE_TYPE_LIST, code);
}
export function getRateTypeCode(name) {
  return getDicCode(RATE_TYPE_LIST, name);
}

/**
 * 银行卡类型
 */
export function setCardType(cardTypeList) {
  storage.set(CARD_TYPE_LIST, cardTypeList);
  return cardTypeList;
}
export function getCardType() {
  return storage.get(CARD_TYPE_LIST);
}
export function getCardTypeName(code) {
  return getDicName(CARD_TYPE_LIST, code);
}
export function getCardTypeCode(name) {
  return getDicCode(CARD_TYPE_LIST, name);
}

/**
 * 字典表查询
 */
function getDicName(type, code) {
  let list = getWhichList(type);
  const result = list.filter(item => (item.dicCode === code))
  return result.length && result[0].dicName;
}
function getDicCode(type, name) {
  let list = getWhichList(type);
  const result = list.filter(item => (item.dicName === name))
  return result.length && result[0].dicCode;
}
function getWhichList(type) {
  let list;
  switch (type) {
    case SYS_STATUS_LIST:
      list = getStatus()
      break;
    case MERCHANT_TYPE_LIST:
      list = getMerchantType()
      break;
    case RATE_TYPE_LIST:
      list = getRateType()
      break;
  }
  return list
}

/**
 *  删除所有缓存数据
 */
export function removeAllStorage() {
  storage.clear();
}
