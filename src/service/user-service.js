import { _axios } from "static/js/axios.js";

const _user = {
  login: function (data) {
    return _axios('/sys/user/login', 'POST', data);
  },
  logout: function () {
    return _axios('/sys/user/logout', 'POST');
  },
  // 登录后获取权限树，根据权限树生成左侧菜单
  getRightTree: function () {
    return _axios('/sys/user/menu/permissionTree');
  },
  // 用户权限用户列表
  userRightUserList: function (data) {
    return _axios('/sys/user/pageList/forPermission', 'POST', data);
  },
  // 获取用户权限
  getUserRight: function (pathUserId) {
    return _axios('/sys/user/' + pathUserId + '/permissionTree');
  },
  // 修改用户权限
  updateUserRight: function (pathUserId, data) {
    return _axios('/sys/user/' + pathUserId + '/permission/update', 'POST', data);
  },
  // 用户列表
  userList: function (data) {
    return _axios('/sys/user/pageList', 'POST', data);
  },
  // 添加用户获取所需角色列表，无权限
  getRoleList: function () {
    return _axios('/sys/role/list');
  },
  // 添加用户
  addUser: function (data) {
    return _axios('/sys/user/add', 'POST', data);
  },
  // 修改用户
  updateUser: function (pathUserId, data) {
    return _axios('/sys/user/' + pathUserId + '/update', 'POST', data);
  },
  // 获得用户详情
  getUserDetail: function (pathUserId) {
    return _axios('/sys/user/' + pathUserId);
  },
  // 角色列表
  roleList: function (data) {
    return _axios('/sys/role/pageList', 'POST', data);
  },
  // 添加角色
  addRole: function (data) {
    return _axios('/sys/role/add', 'POST', data);
  },
  // 获得角色详情
  getRoleDetail: function (roleId) {
    return _axios('/sys/role/' + roleId);
  },
  // 修改角色
  updateRole: function (roleId, data) {
    return _axios('/sys/role/' + roleId + '/update', 'POST', data);
  }
}

export default _user;
