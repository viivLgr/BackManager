<template>
  <div class="sidebar">
    <el-menu
      :default-active="route"
      class="el-menu-vertical-demo"
      background-color="#FCFCFC"
      text-color="#666666"
      active-text-color="#1ABC9C"
      unique-opened router
    >
      <template v-for="(item,index) in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="index">
            <template slot="title" v-if="item.icon">
              <i :class="item.icon" />{{item.title}}
            </template>
            <template v-for="(sub,idx) in item.subs" >
              <el-menu-item-group text-color="#fff" :key="idx">
                <template slot="title" v-if="item.icon">
                  <i :class="sub.icon" />
                  <span style="color:#666666;font-size:14px;">{{sub.title}}</span>
                </template>
                <template v-for="(list,i) in sub.list">
                  <el-menu-item :index="list.index" :key="i" router>
                    <i :class="list.icon" />{{list.title}}
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </template>
          </el-submenu>
        </template>
        <template v-else-if="item.list">
          <el-submenu :index="item.index" :key="index">
            <template slot="title" v-if="item.icon">
              <i :class="item.icon" />{{item.title}}
            </template>
            <template v-for="(list, i) in item.list">
              <el-menu-item :index="list.index" :key="i" router>
                <i :class="list.icon" />{{list.title}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="index">
            <i :class="item.icon" />{{item.title}}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      route: "dashbard",
      items: [
        {
          icon: "el-icon-menu",
          index: "dashboard",
          title: "首页概览"
        },
        {
          icon: "fa fa-folder-o",
          index: "2",
          title: "权限管理",
          list: [
            {
              icon: "el-icon-document",
              index: "features_list",
              title: "功能列表"
            },
            {
              icon: "el-icon-document",
              index: "user_rights",
              title: "用户权限"
            },
            {
              icon: "el-icon-document",
              index: "user_list",
              title: "用户管理"
            },
            {
              icon: "el-icon-document",
              index: "role_list",
              title: "角色管理"
            }
          ]
        },
        {
          icon: "fa fa-folder-o",
          index: "3",
          title: "系统参数",
          list: [
            {
              icon: "el-icon-document",
              index: "code_manage",
              title: "码值管理"
            },
            {
              icon: "el-icon-document",
              index: "error_code_manage",
              title: "错误码管理"
            }
          ]
        },
        {
          icon: "fa fa-folder-o",
          index: "4",
          title: "交易管理",
          list: [
            {
              icon: "el-icon-document",
              index: "trade_list",
              title: "交易列表"
            },
            {
              icon: "el-icon-document",
              index: "trade_suspicious",
              title: "可疑交易"
            },
            {
              icon: "el-icon-document",
              index: "reconciliation",
              title: "对账"
            },
            {
              icon: "el-icon-document",
              index: "error_handling",
              title: "差错处理"
            },
            {
              icon: "el-icon-document",
              index: "reports",
              title: "报表"
            }
          ]
        },
        {
          icon: "fa fa-folder-o",
          index: "5",
          title: "商户管理",
          list: [
            {
              icon: "el-icon-document",
              index: "store_list",
              title: "商户列表"
            }
          ]
        },
        {
          icon: "fa fa-folder-o",
          index: "6",
          title: "路由管理",
          list: [
            {
              icon: "el-icon-document",
              index: "channel_manage",
              title: "渠道列表"
            },
            {
              icon: "el-icon-document",
              index: "store_channel_list",
              title: "商户渠道列表"
            },
            {
              icon: "el-icon-document",
              index: "card_bin_list",
              title: "卡bin管理"
            },
            {
              icon: "el-icon-document",
              index: "bank_list",
              title: "银行列表"
            }
          ]
        },
        {
          icon: "fa fa-folder-o",
          index: "7",
          title: "应用管理",
          list: [
            {
              icon: "el-icon-document",
              index: "app_list",
              title: "应用列表"
            },
            {
              icon: "el-icon-document",
              index: "open_app_list",
              title: "开放平台接口列表"
            }
          ]
        }
      ]
    };
  },
  created() {
    console.log("created", this.$route.path);
    this.route = this.$route.path.replace("/", "");
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
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
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
</style>
