import { _axios } from "static/js/axios.js";
const _common = {
  // 获取字典表
  getDictionaryList: function (data) {
    return _axios('/sys/dictionary/query', 'POST', data);
  }
}

export default _common;
