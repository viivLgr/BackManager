<template>
  <div class="container">
    <div class="header clearfix">
      <h2>下级代理商查询</h2>
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
          show-overflow-tooltip
          align="center"
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
          <el-form-item label="代理商编号：" prop="agencyId">
            <el-input v-model="form.agencyId"></el-input>
          </el-form-item>
          <el-form-item label="代理商名称：" prop="agencyName">
            <el-input v-model="form.agencyName"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-checkbox-group v-model="form.status">
              <el-checkbox label="开通" name="type"></el-checkbox>
              <el-checkbox label="审核中" name="type"></el-checkbox>
              <el-checkbox label="审核不通过" name="type"></el-checkbox>
              <el-checkbox label="关闭" name="type"></el-checkbox>
              <el-checkbox label="永久关闭" name="type"></el-checkbox>
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
      title="下级代理商详细信息"
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
            prop: 'agencyId',
            label: '代理商编号'
          },
          {
            prop: 'agencyName',
            label: '代理商名称'
          },
          {
            prop: 'operatorId',
            label: '操作员ID'
          },
          {
            prop: 'area',
            label: '地区'
          },
          {
            prop: 'contactName',
            label: '业务联系人'
          },
          {
            prop: 'contactPhone',
            label: '业务联系电话'
          },
          {
            prop: 'status',
            label: '状态'
          },
          {
            prop: 'applyDate',
            label: '申请日期'
          }
        ],
        tableData: [
          {
            agencyId: 'AAAA123123',
            agencyName: 'GG1',
            operatorId: 'HD1233',
            area: '浙江省杭州市江干区九环路778号',
            contactName: '张倚天',
            contactPhone: '13212341234',
            status: '开通',
            applyDate: '2017-11-09'
          },
          {
            agencyId: 'AAAA123123',
            agencyName: 'GG1',
            operatorId: 'HD1233',
            area: '浙江省杭州市江干区九环路778号',
            contactName: '张倚天',
            contactPhone: '13212341234',
            status: '开通',
            applyDate: '2017-11-09'
          },
          {
            agencyId: 'AAAA123123',
            agencyName: 'GG1',
            operatorId: 'HD1233',
            area: '浙江省杭州市江干区九环路778号',
            contactName: '张倚天',
            contactPhone: '13212341234',
            status: '开通',
            applyDate: '2017-11-09'
          },
          {
            agencyId: 'AAAA123123',
            agencyName: 'GG1',
            operatorId: 'HD1233',
            area: '浙江省杭州市江干区九环路778号',
            contactName: '张倚天',
            contactPhone: '13212341234',
            status: '开通',
            applyDate: '2017-11-09'
          }
        ],
        userInfos: [
          {
            title: '基本信息',
            list: [
              {
                tit: '申请人名称',
                txt: '张倚天'
              },
              {
                tit: '申请人日期',
                txt: '2017-1017'
              },
              {
                tit: '代理商编号',
                txt: '123123'
              },
              {
                tit: '操作员ID',
                txt: '123123'
              },
              {
                tit: '代理商名称',
                txt: '大叔大婶多'
              },
              {
                tit: '联系人电话',
                txt: '132213123123'
              },
              {
                tit: '状态',
                txt: '张倚天'
              },
              {
                tit: '邮编',
                txt: '张倚天'
              },
              {
                tit: '实际地址',
                txt: '张倚天'
              }
            ]
          },
          {
            title: '注册信息',
            list: [
              {
                tit: '工商注册名称',
                txt: '张倚天'
              },
              {
                tit: '阻止机构代码',
                txt: '2017-1017'
              },
              {
                tit: '营业执照编号',
                txt: '123123'
              },
              {
                tit: '税务登记号',
                txt: '123123'
              },
              {
                tit: '注册资金',
                txt: '大叔大婶多'
              },
              {
                tit: '经营范围',
                txt: '132213123123'
              },
              {
                tit: '注册资金',
                txt: '张倚天'
              },
              {
                tit: '法人身份证',
                txt: '张倚天'
              }
            ]
          },
          {
            title: '账户信息',
            list: [
              {
                tit: '开户行联行号',
                txt: '张倚天'
              },
              {
                tit: '开户行名称',
                txt: '2017-1017'
              },
              {
                tit: '开户行账户名称',
                txt: '123123'
              },
              {
                tit: '开户行账号',
                txt: '123123'
              },
              {
                tit: '注册资金',
                txt: '大叔大婶多'
              }
            ]
          },
          {
            title: '成本费率',
            list: [
              {
                tit: '微信扫码',
                txt: '张倚天'
              },
              {
                tit: '支付宝扫码',
                txt: '2017-1017'
              },
              {
                tit: 'QQ扫码',
                txt: '123123'
              },
              {
                tit: '微信公众号',
                txt: '123123'
              },
              {
                tit: '支付宝服务窗',
                txt: '大叔大婶多'
              },
              {
                tit: '网关支付',
                txt: '132213123123'
              },
              {
                tit: '快捷支付',
                txt: '张倚天'
              },
              {
                tit: 'WAP支付',
                txt: '张倚天'
              }
            ]
          },
          {
            title: '联系方式',
            list: [
              {
                tit: '业务联系人',
                txt: '张倚天'
              },
              {
                tit: '业务联系电话',
                txt: '2017-1017'
              },
              {
                tit: '业务联系Email',
                txt: '123123'
              },
              {
                tit: '业务联系QQ/MSN',
                txt: '123123'
              },
              {
                tit: '传真',
                txt: '大叔大婶多'
              }
            ]
          }
        ],
        form: {
          agencyId: '',
          agencyName: '',
          status: []
        },
        rules: {
          agencyId: [
//            {required: true, message: '请输入代理商编号', trigger: 'blur'},
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
