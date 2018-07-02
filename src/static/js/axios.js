import axios from 'axios';
import { getToken, getUserInfo } from 'static/js/cache.js';

export function _axios(url, method, data) {
  // 去掉空字段和空对象
  deleteEmptyProperty(data);
  return axios({
    method: method || 'GET',
    url: process.env.BASE_API + url,
    headers: getHeader(),
    data: data || {}
  });
}

function getHeader() {
  let header = {
    "Accept": "application/json;charset=utf-8",
    "Content-Type": "application/json;charset=utf-8"
  }
  const token = getToken();
  if (token) {
    header = {
      ...header,
      token: token,
      userId: getUserInfo().userId
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
