<template>
  <div class="container">
    <div class="header clearfix">
      <h2>微信会员信息</h2>
      <div class="right">
        <el-button type="primary" size="small" @click="searchOpen">查询</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        size="mini"
        header-cell-class-name="table-th"
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
          <el-form-item label="会员编号：" prop="id">
            <el-input v-model="form.storeId"></el-input>
          </el-form-item>
          <el-form-item label="会员姓名：" prop="name">
            <el-input v-model="form.storeName"></el-input>
          </el-form-item>
          <el-form-item label="会员手机号：" prop="phone">
            <el-input v-model="form.shortName"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码：" prop="IDcard">
            <el-input v-model="form.shortName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="searchShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {
    checkPhone,
    checkIDCard
  } from 'static/js/util'

  export default {
    data () {
      return {
        infoShow: false,
        searchShow: false,
        table: [
          {
            prop: 'id',
            label: '会员编号'
          },
          {
            prop: 'wechatName',
            label: '微信用户昵称'
          },
          {
            prop: 'name',
            label: '会员姓名'
          },
          {
            prop: 'phone',
            label: '会员手机号码'
          },
          {
            prop: 'IDcard',
            label: '身份证号码'
          },
          {
            prop: 'createTime',
            label: '关注时间'
          },
          {
            prop: 'province',
            label: '省份'
          }
        ],
        tableData: [
          {
            id: 'M000052',
            wechatName: 'dfefsk099',
            name: '高佳健',
            phone: '1328489569',
            IDcard: '332181199806071233',
            createTime: '2017-12-01',
            province: '江苏省'
          },
          {
            id: 'M000052',
            wechatName: 'dfefsk099',
            name: '高佳健',
            phone: '1328489569',
            IDcard: '332181199806071233',
            createTime: '2017-12-01',
            province: '江苏省'
          },
          {
            id: 'M000052',
            wechatName: 'dfefsk099',
            name: '高佳健',
            phone: '1328489569',
            IDcard: '332181199806071233',
            createTime: '2017-12-01',
            province: '江苏省'
          },
          {
            id: 'M000052',
            wechatName: 'dfefsk099',
            name: '高佳健',
            phone: '1328489569',
            IDcard: '332181199806071233',
            createTime: '2017-12-01',
            province: '江苏省'
          }
        ],
        form: {
          id: '',
          name: '',
          phone: '',
          IDCard: ''
        },
        rules: {
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          IDCard: [
            {validator: checkIDCard, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      searchOpen () {
        this.searchShow = true
      },
      searchClose () {
        this.searchShow = false
        this.$refs['form'].resetFields()
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
