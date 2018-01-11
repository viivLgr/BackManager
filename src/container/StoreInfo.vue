<template>
  <div class="container">
    <div class="header clearfix">
      <h2>商户信息查询</h2>
      <div class="right">
        <el-button type="primary" size="small" @click="searchOpen">查询</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        size="mini"
        header-cell-class-name="table-th"
        @row-click="rowClick"
        style="width: 100%">
        <el-table-column
          v-for="(item,index) in table"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          header-align="center"
          :class-name="index===0?'firstColumn':''"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        @current-change="currentChange"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      v-show="searchShow"
      title="查询"
      :visible.sync="searchShow"
      width="30%"
      :before-close="searchClose"
      center
    >
      <div>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="105px">
          <el-form-item label="商户编号：" prop="storeId">
            <el-input v-model="form.storeId"></el-input>
          </el-form-item>
          <el-form-item label="商户名称：" prop="storeName">
            <el-input v-model="form.storeName"></el-input>
          </el-form-item>
          <el-form-item label="商户简称：" prop="shortName">
            <el-input v-model="form.shortName"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-checkbox-group v-model="form.status">
              <el-checkbox label="开通" name="type"></el-checkbox>
              <el-checkbox label="未审核" name="type"></el-checkbox>
              <el-checkbox label="审核不通过" name="type"></el-checkbox>
              <el-checkbox label="关闭" name="type"></el-checkbox>
              <el-checkbox label="永久停用" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="searchShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-show="infoShow"
      title="商户详细信息"
      center
      :visible.sync="infoShow"
      width="50%"
      :before-close="infoClose"
    >
      <div class="dialog-list">
        <div v-for="info in userInfos" v-if="userInfos.length>0">
          <h3>{{info.title}}</h3>
          <ul class="info-list clearfix">
            <li v-for="(list,i) in info.list">
              <span class="tit">{{list.tit}}</span>：
              <span class="txt">{{list.txt}}</span>
            </li>
          </ul>
        </div>
        <div v-else>暂无信息</div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import { formatMoney } from 'static/js/util'
  export default {
    data () {
      return {
        infoShow: false,
        searchShow: false,
        table: [
          {
            prop: 'storeId',
            label: '商户编号'
          },
          {
            prop: 'storeTicket',
            label: '商户特约小票'
          },
          {
            prop: 'storeName',
            label: '商户名称'
          },
          {
            prop: 'shortName',
            label: '商户简称'
          },
          {
            prop: 'postalCode',
            label: '邮编'
          },
          {
            prop: 'address',
            label: '商户地址'
          },
          {
            prop: 'limit',
            label: '商户限额'
          },
          {
            prop: 'registeredCapital',
            label: '注册资金'
          },
          {
            prop: 'agencyId',
            label: '所属代理商ID'
          },
          {
            prop: 'status',
            label: '状态'
          },
          {
            prop: 'createTime',
            label: '申请日期'
          }
        ],
        tableData: [
          {
            storeId: 'AAAA123123',
            storeTicket: 'M00051',
            storeName: '杭州转折科技',
            shortName: 'GG1',
            postalCode: '311200',
            address: '浙江省杭州市江干区九环路778号',
            limit: '110000',
            registeredCapital: '110000',
            agencyId: 'A00839897',
            status: '开通',
            createTime: '2017-11-09'
          },
          {
            storeId: 'AAAA123123',
            storeTicket: 'M00051',
            storeName: '杭州转折科技',
            shortName: 'GG1',
            postalCode: '311200',
            address: '浙江省杭州市江干区九环路778号',
            limit: '110000',
            registeredCapital: '110000',
            agencyId: 'A00839897',
            status: '开通',
            createTime: '2017-11-09'
          },
          {
            storeId: 'AAAA123123',
            storeTicket: 'M00051',
            storeName: '杭州转折科技',
            shortName: 'GG1',
            postalCode: '311200',
            address: '浙江省杭州市江干区九环路778号',
            limit: '110000',
            registeredCapital: '110000',
            agencyId: 'A00839897',
            status: '开通',
            createTime: '2017-11-09'
          },
          {
            storeId: 'AAAA123123',
            storeTicket: 'M00051',
            storeName: '杭州转折科技',
            shortName: 'GG1',
            postalCode: '311200',
            address: '浙江省杭州市江干区九环路778号',
            limit: '110000',
            registeredCapital: '110000',
            agencyId: 'A00839897',
            status: '开通',
            createTime: '2017-11-09'
          },
          {
            storeId: 'AAAA123123',
            storeTicket: 'M00051',
            storeName: '杭州转折科技',
            shortName: 'GG1',
            postalCode: '311200',
            address: '浙江省杭州市江干区九环路778号',
            limit: '110000',
            registeredCapital: '110000',
            agencyId: 'A00839897',
            status: '开通',
            createTime: '2017-11-09'
          },
          {
            storeId: 'AAAA123123',
            storeTicket: 'M00051',
            storeName: '杭州转折科技',
            shortName: 'GG1',
            postalCode: '311200',
            address: '浙江省杭州市江干区九环路778号',
            limit: '110000',
            registeredCapital: '110000',
            agencyId: 'A00839897',
            status: '开通',
            createTime: '2017-11-09'
          }
        ],
        userInfos: [
          {
            title: '',
            list: [
              {
                tit: '商户编号',
                txt: 'M000051'
              },
              {
                tit: '商户特约小票',
                txt: 'M000051'
              },
              {
                tit: '商户名称',
                txt: '杭州转折科技'
              },
              {
                tit: '商户简称',
                txt: 'GG1'
              },
              {
                tit: '状态',
                txt: '开通'
              },
              {
                tit: '邮编',
                txt: '322100'
              },
              {
                tit: '注册资金',
                txt: '10000000'
              },
              {
                tit: '所属代理商ID',
                txt: 'A0909234'
              },
              {
                tit: '商户地址',
                txt: '浙江省杭州市江干区九环路778号浙江省杭州市江干区九环路778号浙江省杭州市江干区九环路778号'
              }
            ]
          }
        ],
        form: {
          storeId: '',
          storeName: '',
          shortName: '',
          status: []
        },
        rules: {
          storeId: [
            {required: true, message: '请输入商户编号', trigger: 'blur'},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.tradeAmount = formatMoney(100)
      this.tradeAmountNum = 100
    },
    methods: {
      searchOpen () {
        this.searchShow = true
      },
      searchClose () {
        this.searchShow = false
        this.$refs['form'].resetFields()
      },
      infoClose () {
        this.infoShow = false
      },
      rowClick (row, event, column) {
        const id = row.agencyId
        console.log(id)
        this.infoShow = true
      },
      currentChange (currentPage) {
        console.log('currentChange', currentPage)
      },
      submitForm () {
        console.log('form')
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const {agencyId, agencyName, status} = this.form
            console.log('submit!', this.form, {agencyId, agencyName, status})
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style>

</style>
