<template>
  <div class="info-list">
    <h2><img :src="icon">{{title}}</h2>
    <ul class="clearfix">
      <li v-for="(item,index) in list" :key="index">
        <span class="tit">{{item.tit}}：</span>
        <span class="txt">{{item.txt}}</span>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      props: {
        title: {
          type: String,
          default: '基本信息'
        },
        icon: {
          type: String,
          default: '../static/img/icon-userinfo.png'
        },
        list: {
          type: Array,
          default () {
            return []
          }
        }
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
