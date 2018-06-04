/*
 * @Author: viivLgr
 * @Date: 2018-06-01 10:42:09
 * @Last Modified by: viivLgr
 * @Last Modified time: 2018-06-01 13:43:39
 */
'use strict';

class Util {
  // 设置本地存储
  setStorage(name, value) {
    const valueType = typeof value;
    if (valueType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(value));
    } else if (['number', 'boolean', 'string'].indexOf(valueType) >= 0) {
      window.localStorage.setItem(name, value);
    } else {
      this.errorTips('不可存储此数据类型');
    }
  }
  // 获取本地存储
  getStorage(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }
  // 删除本地存储
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
  // 错误提示
  errorTips(errMsg) {
    alert(errMsg);
  }
}

export default Util;
