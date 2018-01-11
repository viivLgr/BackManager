<template>
  <div class="dashboard">
    <InfoList v-for="(item, index) in dashboardData"
              :key="index"
      :title="item.title"
      :icon="item.icon"
      :list="item.list"></InfoList>
  </div>
</template>
<script type="text/ecmascript-6">
  import InfoList from 'components/InfoList'
  import userinfoIcon from 'static/img/icon-userinfo.png'
  import dataIcon from 'static/img/icon-data.png'
  import {formatMoney} from 'static/js/util'
  export default {
    data () {
      return {
        dashboardData: [
          {
            title: '基本信息',
            icon: userinfoIcon,
            list: [
              {
                tit: '代理商名称',
                txt: '杭州转折科技'
              },
              {
                tit: '代理商地址',
                txt: '浙江省滨江区南环路源越大厦'
              },
              {
                tit: '联系人电话',
                txt: '13456789389'
              },
              {
                tit: '联系人邮箱',
                txt: 'viiv_lgr@163.com'
              },
              {
                tit: '我的推广码',
                txt: `<img src="${'static/img/icon-userinfo.png'}" />`
              }
            ]
          },
          {
            title: '数据汇总',
            icon: dataIcon,
            list: [
              {
                tit: '交易总笔数',
                txt: '0笔'
              },
              {
                tit: '交易总金额',
                txt: '0.00元'
              }
            ]
          }
        ]
      }
    },
    created () {
      const num = 10
      const money = formatMoney(1234567890)
      this.dashboardData[1].list[0].txt = num + '笔'
      this.dashboardData[1].list[1].txt = money + '元'
    },
    components: {
      InfoList
    }
  }
</script>
<style>
</style>
