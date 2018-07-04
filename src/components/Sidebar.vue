<template>
  <div class="sidebar">
    <el-menu
      :default-active="route"
      class="el-menu-vertical-demo"
      background-color="#FCFCFC"
      text-color="#666666"
      active-text-color="#1ABC9C"
      unique-opened router
      v-show="show"
    >
      <template v-for="(item,index) in items" >
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="index" v-if="item.show">
            <template slot="title" v-if="item.icon">
              <i :class="item.icon" />{{item.title}}
            </template>
            <template v-for="(sub,idx) in item.subs">
              <el-menu-item-group text-color="#fff" :key="idx" v-if="sub.show">
                <template slot="title" v-if="item.icon">
                  <i :class="sub.icon" />
                  <span style="color:#666666;font-size:14px;">{{sub.title}}</span>
                </template>
                <template v-for="(list,i) in sub.list">
                  <el-menu-item :index="list.index" :key="i" router v-if="list.show">
                    <i :class="list.icon" />{{list.title}}
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </template>
          </el-submenu>
        </template>
        <template v-else-if="item.list">
          <el-submenu :index="item.index" :key="index" router v-if="item.show">
            <template slot="title" v-if="item.icon">
              <i :class="item.icon" />{{item.title}}
            </template>
            <template v-for="(list, i) in item.list">
              <el-menu-item :index="list.index" :key="i" router v-if="list.show">
                <i :class="list.icon" />{{list.title}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="index" v-if="item.show">
            <i :class="item.icon" />{{item.title}}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { axiosMixin, listMixin } from "static/js/mixin.js";
import { mapActions, mapGetters } from "vuex";
import { deepClone } from "static/js/util.js";

export default {
  mixins: [axiosMixin, listMixin],
  data() {
    return {
      route: "dashbard",
      show: false,
      defaultItems: [
        {
          icon: "fa fa-area-chart",
          index: "dashboard",
          title: "首页概览",
          show: true
        },
        {
          icon: "fa fa-key",
          index: "2",
          title: "权限管理",
          show: false,
          list: [
            {
              icon: "fa fa-dashboard",
              index: "features_list",
              title: "功能列表"
            },
            {
              icon: "fa fa-user-secret",
              index: "user_rights",
              title: "用户权限列表"
            },
            {
              icon: "fa fa-user-plus",
              index: "user_list",
              title: "用户列表"
            },
            {
              icon: "fa fa-shield",
              index: "role_list",
              title: "角色列表"
            }
          ]
        },
        {
          icon: "fa fa-cogs",
          index: "3",
          title: "系统参数",
          list: [
            {
              icon: "fa fa-anchor",
              index: "code_manage",
              title: "码值管理"
            },
            {
              icon: "fa fa-bug",
              index: "error_code_manage",
              title: "错误码管理"
            }
          ]
        },
        {
          icon: "fa fa-sitemap",
          index: "4",
          title: "交易管理",
          list: [
            {
              icon: "fa fa-handshake-o",
              index: "trade_list",
              title: "交易列表"
            },
            // {
            //   icon: "fa fa-lightbulb-o",
            //   index: "trade_suspicious",
            //   title: "可疑交易"
            // },
            // {
            //   icon: "fa fa-check-square-o",
            //   index: "reconciliation",
            //   title: "对账"
            // },
            {
              icon: "fa fa-gavel",
              index: "error_handling",
              title: "差错交易"
            },
            {
              icon: "fa fa-cubes",
              index: "reports",
              title: "报表"
            }
          ]
        },
        {
          icon: "fa fa-university",
          index: "merchant_list",
          title: "商户管理",
          list: [
            {
              icon: "fa fa-users",
              index: "merchant_list",
              title: "商户列表"
            }
          ]
        },
        {
          icon: "fa fa-sliders",
          index: "6",
          title: "路由管理",
          list: [
            {
              icon: "fa fa-share-alt",
              index: "channel_manage",
              title: "渠道列表"
            },
            {
              icon: "fa fa-share-alt-square",
              index: "merchant_channel_list",
              title: "商户渠道列表"
            },
            {
              icon: "fa fa-credit-card",
              index: "card_bin_list",
              title: "卡bin管理"
            },
            {
              icon: "fa fa-bank",
              index: "bank_list",
              title: "银行列表"
            }
          ]
        },
        {
          icon: "fa fa-briefcase",
          index: "7",
          title: "应用管理",
          list: [
            {
              icon: "fa fa-tags",
              index: "app_list",
              title: "应用列表"
            },
            {
              icon: "fa fa-share-square-o",
              index: "open_app_list",
              title: "开放平台接口列表"
            }
          ]
        },
        {
          icon: "fa fa-tasks",
          index: "8",
          title: "定时任务管理",
          list: [
            {
              icon: "fa fa-thumb-tack",
              index: "scheduled-task",
              title: "定时任务"
            }
          ]
        }
      ],
      items: []
    };
  },
  computed: {
    ...mapGetters(["userRight"])
  },
  watch: {
    userRight() {
      this.computedSideMenu();
    }
  },
  created() {
    this.route = this.$route.path.replace("/", "");
    this.initSideBar();
  },
  methods: {
    initSideBar() {
      this.computedSideMenu();
    },
    // 根据权限树计算菜单显示
    computedSideMenu() {
      this.items = [];
      this.show = false;
      const items = deepClone(this.defaultItems);
      const rightList = this.userRight;
      for (let i = 0, iLen = items.length; i < iLen; i++) {
        for (let j = 0, jLen = rightList.length; j < jLen; j++) {
          if (this.computedItemValid(items[i], rightList[j])) {
            items[i].show = true;
            if (items[i].list.length && rightList[j].children.length) {
              const item2 = items[i].list;
              const rightList2 = rightList[j].children;
              for (let i2 = 0, i2Len = item2.length; i2 < i2Len; i2++) {
                for (let j2 = 0, j2Len = rightList2.length; j2 < j2Len; j2++) {
                  if (this.computedItemValid(item2[i2], rightList2[j2])) {
                    items[i].list[i2].show = true;
                  }
                }
              }
            }
          }
        }
      }
      this.items = items;
      this.show = true;
    },
    // 逐个比较计算
    computedItemValid(item, rightItem) {
      return rightItem.funcName === item.title && rightItem.status === "VALID";
    },
    ...mapActions(["saveUserRight"])
  }
};
</script>

<style scoped>
.el-menu li.is-opened .el-submenu__title,
.el-menu li.is-opened .el-menu,
.el-menu li.is-opened .el-menu-item {
  background-color: #fff !important;
}
.el-submenu .el-menu-item {
  padding-left: 60px !important;
}
.sidebar {
  display: block;
  position: absolute;
  width: 201px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #fff;
}
.sidebar > ul {
  height: 100%;
  overflow-y: auto;
}
.sidebar > ul .el-menu-item img,
.sidebar > ul .el-submenu__title img {
  margin-right: 20px;
}
.sidebar > ul .el-submenu__title .title {
  color: #fff;
}
.sidebar > ul .el-menu-item-group__title img {
  margin-right: 10px;
}
.el-menu-item .dot {
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
}
.is-disabled {
  display: none;
}
</style>
