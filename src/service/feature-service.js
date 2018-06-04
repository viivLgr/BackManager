/*
 * @Author: viivLgr
 * @Date: 2018-06-01 17:35:07
 * @Last Modified by:   viivLgr
 * @Last Modified time: 2018-06-01 17:35:07
 */
import { _axios } from "static/js/axios.js";
const _feature = {
  getList: function (data) {
    return _axios('/sys/function/pageList', 'POST', data);
  },
  add: function (data) {
    return _axios('/sys/function/add', 'POST', data);
  },
  update: function (funcId, data) {
    return _axios('/sys/function/' + funcId + '/update', 'POST', data);
  }
}

export default _feature;
