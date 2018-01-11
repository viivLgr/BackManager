<template>
  <div class="sidebar">
    <el-menu
      :default-active="route"
      class="el-menu-vertical-demo"
      background-color="#363e42"
      text-color="#fff"
      active-text-color="#ff740e"
      unique-opened router
    >
      <template v-for="(item,index) in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title">
              <img :src="item.icon" />{{item.title}}
            </template>
            <template v-for="(sub,idx) in item.subs">
              <el-menu-item-group text-color="#fff">
                <template slot="title">
                  <img :src="sub.icon" />
                  <span style="color:#fff;font-size:14px;">{{sub.title}}</span>
                </template>
                <template v-for="(list,i) in sub.list">
                  <el-menu-item :index="list.index" router><span class="dot">·</span>{{list.title}}</el-menu-item>
                </template>
              </el-menu-item-group>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <img :src="item.icon" />{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
  import IconDashboard from 'static/img/icon-dashboard.png'
  import IconOperate from 'static/img/icon-operate.png'
  import IconTrade from 'static/img/icon-trade.png'
  import IconFile from 'static/img/icon-file.png'
  export default {
    data () {
      return {
        route: 'dashbard',
        items: [
          {
            icon: IconDashboard,
            index: 'dashboard',
            title: '首页概览'
          },
          {
            icon: IconOperate,
            index: '2',
            title: '运营管理',
            subs: [
              {
                icon: IconFile,
                title: '下级代理商管理',
                list: [
                  {
                    index: 'subinfo',
                    title: '下级代理商查询'
                  }, {
                    index: 'subopen',
                    title: '下级代理商开户'
                  }
                ]
              },
              {
                icon: IconFile,
                title: '商户管理',
                list: [
                  {
                    index: 'storeinfo',
                    title: '商户信息查询'
                  }, {
                    index: 'storeopen',
                    title: '商户开户'
                  }, {
                    index: 'wechatinfo',
                    title: '微信会员信息'
                  }, {
                    index: 'storecheck',
                    title: '商户审核'
                  }
                ]
              }
            ]
          },
          {
            icon: IconTrade,
            index: '3',
            title: '交易管理',
            subs: [
              {
                icon: IconFile,
                title: '支付交易管理',
                list: [
                  {
                    index: 'paytrade',
                    title: '支付交易信息'
                  }
                ]
              },
              {
                icon: IconFile,
                title: '结算交易管理',
                list: [
                  {
                    index: 'settletrade',
                    title: '结算交易信息'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    created () {
      console.log('created', this.$route.path)
      this.route = this.$route.path.replace('/', '')
    }
  }
</script>

<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    width: 201px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
  }
  .sidebar > ul {
    height: 100%;
  }
  .sidebar > ul .el-menu-item img,
  .sidebar > ul .el-submenu__title img{
    margin-right: 20px;
  }
  .sidebar > ul .el-submenu__title .title{
    color: #fff;
  }
  .sidebar > ul .el-menu-item-group__title img{
    margin-right: 10px;
  }
  .el-menu-item .dot{
    display: inline-block;
    margin-right: 10px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
