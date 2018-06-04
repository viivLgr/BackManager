import axios from 'axios';
import Util from 'util/util.js';

const _util = new Util();

export function _axios(url, method, data) {
  // 去掉空字段和空对象
  deleteEmptyProperty(data);
  return axios({
    method: method || 'GET',
    url: url,
    headers: getHeader(),
    data: data || {}
  });
}

function getHeader() {
  let header = {
    "Accept": "application/json;charset=utf-8",
    "Content-Type": "application/json;charset=utf-8"
  }
  const token = localStorage.getItem('token');
  if (token) {
    header = {
      ...header,
      token: token,
      userId: +_util.getStorage('userInfo').userId
    }
  }
  return header;
}

// 删除对象中的空字段和空对象
function deleteEmptyProperty(object) {
  for (var i in object) {
    var value = object[i];
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          delete object[i];
          continue;
        }
      }
      deleteEmptyProperty(value);
      if (isEmpty(value)) {
        delete object[i];
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i];
      } else {}
    }
  }
}

function isEmpty(object) {
  for (var name in object) {
    return false;
  }
  return true;
}
