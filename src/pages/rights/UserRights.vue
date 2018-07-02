<template>
  <div class="container">
    <div class="header clearfix">
      <h2>用户权限列表</h2>
    </div>
    <div class="operating" v-if="pageRight.search">
        <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" class="demo-form-inline" size="mini">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="searchForm.userName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit('searchForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="small"
        border
        header-cell-class-name="table-th"
        style="width: 100%">
        <el-table-column align="center" prop="no" label="序号"></el-table-column>
        <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
        <el-table-column align="center" prop="linkmanPhone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="roleName" label="角色"></el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="150" v-if="pageRight.update">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operate.update && pageRight.update" @click="handleUpdate(scope.row)" type="warning" size="mini">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" 
        v-if="page.totalPages > 1"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-size="page.rows" 
        :total="page.total"
      />
    </div>
    <!-- 修改权限 -->
    <el-dialog
      v-show="updateShow"
      :visible.sync="updateShow"
      title="修改权限"
      width="30%"
      :before-close="updateClose"
      center
      >
      <div class="feature-checked-wrap">
        <div class="operate-list" v-for="(lv1, id1) in rightsList" :key="id1">
          <template v-if="lv1.list">
            <div class="operate-title">
              <i :class="!lv1.show ? 'el-icon-arrow-right':'el-icon-arrow-down'" @click="lv1.show = !lv1.show"></i>
              <el-checkbox v-model="lv1.checked">{{lv1.funcName}}</el-checkbox>
            </div>
            <div class="operate-body" v-show="lv1.show">
              <div class="operate-list" v-for="(lv2, id2) in lv1.list" :key="id2">
                <template v-if="lv2.list">
                  <div class="operate-title">
                    <i :class="!lv2.show ? 'el-icon-arrow-right':'el-icon-arrow-down'" @click="lv2.show = !lv2.show"></i>
                    <el-checkbox v-model="lv2.checked" :disabled="!lv1.checked">{{lv2.funcName}}</el-checkbox>
                  </div>
                  <div class="operate-body" v-show="lv2.show">
                    <div class="operate-list" v-for="(lv3, id3) in lv2.list" :key="id3">
                      <template v-if="lv3.list">
                        <div class="operate-title">
                          <i :class="!lv3.show ? 'el-icon-arrow-right':'el-icon-arrow-down'" @click="lv3.show = !lv3.show"></i>
                          <el-checkbox v-model="lv3.checked" :checked="!lv2.checked || lv1.checked">{{lv3.funcName}}</el-checkbox>
                        </div>
                        <div class="operate-body" v-show="lv3.show">
                          <el-checkbox v-for="(lv4, id4) in lv3.list" :key="id4" :disabled="!lv3.checked || !lv2.checked || !lv1.checked" v-model="lv4.checked">{{lv4.funcName}}</el-checkbox>
                        </div>
                      </template>
                      <template v-else>
                        <el-checkbox v-model="lv3.checked" :disabled="!lv2.checked || !lv1.checked">{{lv3.funcName}}</el-checkbox>
                      </template>
                    </div>
                  </div>
                </template> 
                <template v-else>
                  <el-checkbox v-model="lv2.checked" :disabled="!lv1.checked">{{lv2.funcName}}</el-checkbox>
                </template>
              </div>
            </div>
          </template>
          <template v-else>
            <el-checkbox v-model="lv1.checked" @change="handleCheckedOperateChange(lv1)">{{lv1.funcName}}</el-checkbox>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="updateShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="updateSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { axiosMixin, listMixin } from "static/js/mixin.js";
import { getStatusName } from "static/js/cache.js";
import { mapActions } from 'vuex';
import _user from "service/user-service.js";
export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      searchForm: {
        userName: ""
      },
      searchRules: {
        userName: [
          { required: false, message: "请输入用户名", trigger: "blur" }
        ]
      },
      rightsList: [],
      updateInfo: {}
    };
  },
  methods: {
    init() {
      this.initPageRight("权限管理", "用户权限列表");
      this._renderTableDate();
    },
    computedRight() {
      this.pageRight[0].children.map(item => {
        if (item.funcName === "搜索" && item.status === "VALID") {
          this.pageRight.search = true;
        }
        if (item.funcName === "修改" && item.status === "VALID") {
          this.pageRight.update = true;
        }
      });
    },
    // 查询
    searchSubmit(searchForm) {
      this.$refs[searchForm].validate(valid => {
        if (valid) {
          let username = this.$refs[searchForm].model.userName;
          this._renderTableDate({ userName: username });
        }
      });
    },
    // 获取用户列表
    _renderTableDate(data) {
      this.loading = true;
      _user.userRightUserList(data).then(res => {
        this.renderTableDate(res, (item, index) => {
          return {
            no: index + 1,
            userId: item.userId,
            userName: item.userName,
            roleName: item.roleName,
            linkmanPhone: item.linkmanPhone,
            status: item.status,
            statusDesc: getStatusName(item.status),
            updateTime: item.modifiedTime,
            operate: {
              update: true
            }
          };
        });
      });
    },
    // 点击修改权限按钮,获得用户权限
    handleUpdate(row) {
      this.updateInfo = {
        userId: row.userId
      };
      _user.getUserRight(this.updateInfo.userId).then(res => {
        this.filterAxios(res, res => {
          const list = res;
          this._renderRightList(list);
        });
      });
      this.updateShow = true;
    },
    updateClose() {
      this.updateShow = false;
      this.rightsList = [];
    },
    updateSubmit() {
      this.formatUpdateResult();
      _user
        .updateUserRight(this.updateInfo.userId, {
          funcIds: this.updateInfo.funcIds
        })
        .then(res => {
          this.updateClose();
          this.filterAxios(res, res => {
            this.successTips("修改成功");
            this.resetUserRight();
          });
        });
    },
    // 格式化修改数据
    formatUpdateResult() {
      const result = [];
      this.rightsList.forEach(lv1 => {
        if (lv1.checked) {
          result.push(lv1.funcId);
          lv1.list &&
            lv1.list.forEach(lv2 => {
              if (lv2.checked) {
                result.push(lv2.funcId);
                lv2.list &&
                  lv2.list.forEach(lv3 => {
                    if (lv3.checked) {
                      result.push(lv3.funcId);
                      lv3.list &&
                        lv3.list.forEach(lv4 => {
                          lv4.checked && result.push(lv4.funcId);
                        });
                    }
                  });
              }
            });
        }
      });
      this.updateInfo.funcIds = JSON.stringify(result);
    },
    // 渲染用户权限
    _renderRightList(list) {
      const root = [];
      const _this = this;
      list.forEach((lv1, id1) => {
        // 第一级
        const lv1Temp = _this.setItem(lv1, id1 + "");
        if (lv1.children && lv1.children.length > 0) {
          const lv1TempChildren = [];
          lv1.children.forEach((lv2, id2) => {
            // 第二级
            const lv2Temp = _this.setItem(lv2, id1 + "-" + id2);
            if (lv2.children && lv2.children.length > 0) {
              const lv2TempChildren = [];
              lv2.children.forEach((lv3, id3) => {
                // 第三级
                const lv3Temp = _this.setItem(lv3, id1 + "-" + id2 + "-" + id3);
                if (lv3.children && lv3.children.length > 0) {
                  const lv3TempChildren = [];
                  lv3.children.forEach((lv4, id4) => {
                    // 第四级
                    const lv4Temp = _this.setItem(
                      lv4,
                      id1 + "-" + id2 + "-" + id3 + "-" + id4
                    );
                    lv3TempChildren.push(lv4Temp);
                  });
                  lv3Temp.children = lv3TempChildren;
                }
                lv2TempChildren.push(lv3Temp);
              });
              lv2Temp.list = lv2TempChildren;
            }
            lv1TempChildren.push(lv2Temp);
          });
          lv1Temp.list = lv1TempChildren;
        }
        root.push(lv1Temp);
      });
      _this.rightsList = root;
    },
    // 设置元素
    setItem(item, level) {
      return {
        level: level,
        funcName: item.funcName,
        funcId: item.funcId,
        checked: item.flag,
        channelId: item.funcLevel,
        parendId: item.funcLevel - 1,
        show: false
      };
    },
    // 重新获取用户权限
    resetUserRight() {
      _user.getRightTree().then(res => {
        this.filterAxios(res, res => {
          this.saveUserRight(res);
        })
      })
    },
    ...mapActions([
      'saveUserRight'
    ])
  }
};
</script>