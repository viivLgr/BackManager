<template>
  <div class="dashboard">
    <InfoList v-for="(item, index) in dashboardData"
              :key="index"
      :title="item.title"
      :icon="item.icon"
      :list="item.list"></InfoList>
    <div class="info-list">
      <h2><img src="../static/img/icon-userinfo.png">基本信息</h2>
      <ul class="clearfix">
        <li>
          <span class="tit">代理商名称：</span>
          <span class="txt">{{dashData.agencyName}}</span>
        </li>
        <li>
          <span class="tit">代理商地址：</span>
          <span class="txt">{{dashData.address}}</span>
        </li>
        <li>
          <span class="tit">联系人电话：</span>
          <span class="txt">{{dashData.phone}}</span>
        </li>
        <li>
          <span class="tit">联系人邮箱：</span>
          <span class="txt">{{dashData.email}}</span>
        </li>
        <li>
          <span class="tit">我的推广码：</span>
          <span class="txt"><img :src="dashData.code"/></span>
        </li>
      </ul>
    </div>
    <div class="info-list">
      <h2><img src="../static/img/icon-data.png">数据汇总</h2>
      <ul class="clearfix">
        <li>
          <span class="tit">交易总笔数：</span>
          <span class="txt">{{tradeAmountNum}}笔</span>
        </li>
        <li>
          <span class="tit">交易总金额：</span>
          <span class="txt">{{tradeAmount}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import InfoList from 'components/InfoList'
  import userinfoIcon from 'static/img/icon-userinfo.png'
//  import dataIcon from 'static/img/icon-data.png'
  import {formatMoney} from 'static/js/util'
  export default {
    data () {
      return {
        tradeAmount: 100,
        tradeAmountNum: 100,
        dashData: {
          agencyName: '杭州转折科技',
          address: '浙江省滨江区南环路源越大厦',
          phone: '13456789389',
          email: 'viiv_lgr@163.com',
          code: userinfoIcon
        }
      }
    },
    created () {
      this.tradeAmount = formatMoney(100)
      this.tradeAmountNum = 100
    },
    components: {
      InfoList
    }
  }
</script>
<style scoped>
  .info-list{
    padding-bottom: 20px;
  }
  .info-list h2{
    font-size: 14px;
    color: #ff740e;
    font-weight: bold;
  }
  .info-list h2 img{
    width: 16px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .info-list ul{
    list-style: none;
    padding: 20px 0;
  }
  .info-list ul li{
    float: left;
    width: 50%;
    font-size: 14px;
    padding-left: 50px;
    line-height: 40px;
    box-sizing: border-box;
  }
  .info-list ul li .tit{
    color: #666;
    font-size: 12px;
  }
</style>
