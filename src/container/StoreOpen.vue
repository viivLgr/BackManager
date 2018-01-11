<template>
  <div class="container">
    <div class="header clearfix">
      <h2>商户开户</h2>
    </div>
    <div class="form-wrapper">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
        <div class="form-item">
          <h3><img src="../static/img/open-base.png" />基本信息</h3>
          <div class="context">
            <el-form-item label="商户名称" prop="storeName">
              <el-input v-model="form.storeName"></el-input>
            </el-form-item>
            <el-form-item label="商户简称" prop="shortName">
              <el-input v-model="form.shortName"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码" prop="postalCode">
              <el-input v-model="form.postalCode"></el-input>
            </el-form-item>
            <el-form-item label="商户地址" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="注册资金(元)" prop="registeredCapital">
              <el-input v-model="form.registeredCapital"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h3><img src="../static/img/open-account.png" />账户信息</h3>
          <div class="context">
            <el-form-item label="主账户开户行" prop="mainAccountBank">
              <el-select v-model="form.mainAccountBank" placeholder="请选择开户银行">
                <el-option v-for="(bank,index) in banklists" :label="bank.bankName" :key="index" :value="bank.bankCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主账户开户行名称" prop="bankName">
              <el-input v-model="form.bankName"></el-input>
            </el-form-item>
            <el-form-item label="主账户开户名" prop="bankAccountName">
              <el-input v-model="form.bankAccountName"></el-input>
            </el-form-item>
            <el-form-item label="主账户开户行账号" prop="bankAccount">
              <el-input v-model="form.bankAccount"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名" prop="legalPersonName">
              <el-input v-model="form.legalPersonName"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证号" prop="corporateIDNumber">
              <el-input v-model="form.corporateIDNumber"></el-input>
            </el-form-item>
            <el-form-item label="法人联系电话" prop="corporateIDPhone">
              <el-input v-model="form.corporateIDPhone"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h3><img src="../static/img/open-rate.png" />手续费信息</h3>
          <div class="context">
            <el-form-item label="微信费率(%)" prop="wechatRate">
              <el-input v-model="form.wechatRate"></el-input>
              <span class="tips">(注：费率类型为百分比，精确到万分位，填写格式如：0.30.)</span>
            </el-form-item>
            <el-form-item label="支付宝费率(%)" prop="alipayRate">
              <el-input v-model="form.alipayRate"></el-input>
              <span class="tips">(注：费率类型为百分比，精确到万分位，填写格式如：0.30.)</span>
            </el-form-item>
            <el-form-item label="支付宝服务窗费率(%)" prop="alipayServiceRate">
              <el-input v-model="form.alipayServiceRate"></el-input>
              <span class="tips">(注：费率类型为百分比，精确到万分位，填写格式如：0.30.)</span>
            </el-form-item>
            <el-form-item label="微信公众号费率(%)" prop="weChatPublicRate">
              <el-input v-model="form.weChatPublicRate"></el-input>
              <span class="tips">(注：费率类型为百分比，精确到万分位，填写格式如：0.30.)</span>
            </el-form-item>
            <el-form-item label="QQ费率(%)" prop="qqRate">
              <el-input v-model="form.qqRate"></el-input>
              <span class="tips">(注：费率类型为百分比，精确到万分位，填写格式如：0.30.)</span>
            </el-form-item>
            <el-form-item label="网关费率(%)" prop="gatewayRate">
              <el-input v-model="form.gatewayRate"></el-input>
              <span class="tips">(注：费率类型为百分比，精确到万分位，填写格式如：0.30.)</span>
            </el-form-item>
            <el-form-item label="快捷费率(%)" prop="quickRate">
              <el-input v-model="form.quickRate"></el-input>
              <span class="tips">(注：费率类型为百分比，精确到万分位，填写格式如：0.30.)</span>
            </el-form-item>
            <el-form-item label="WAP费率(%)" prop="wapRate">
              <el-input v-model="form.wapRate"></el-input>
              <span class="tips">(注：费率类型为百分比，精确到万分位，填写格式如：0.30.)</span>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h3><img src="../static/img/open-connect.png" />联系方式</h3>
          <div class="context">
            <el-form-item label="业务联系人" prop="businessContact">
              <el-input v-model="form.businessContact"></el-input>
            </el-form-item>
            <el-form-item label="业务联系QQ" prop="businessContactQQ">
              <el-input v-model="form.businessContactQQ"></el-input>
            </el-form-item>
            <el-form-item label="业务联系Email" prop="businessContactEmail">
              <el-input v-model="form.businessContactEmail"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-btn">
          <el-form-item size="small">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {
    formatMoney,
    checkPhone,
    checkPostalCode,
    checkAllNum,
    checkBankCardAttribution,
    checkRate,
    checkQQ,
    checkEmail,
    checkIDCard
  } from 'static/js/util'
  import { BankList } from 'static/js/bankList'

  export default {
    data () {
      return {
        areas: ['area1', 'area2', 'area3', 'area4', 'area5'],
        banklists: [],
        form: {
          storeName: '',
          shortName: '',
          postalCode: '',
          address: '',
          registeredCapital: '', // 注册资金
          mainAccountBank: '',
          bankName: '',
          bankAccountName: '',
          bankAccount: '',
          legalPersonName: '',
          corporateIDNumber: '',
          corporateIDPhone: '',
          wechatRate: '',
          alipayRate: '',
          alipayServiceRate: '',
          weChatPublicRate: '',
          qqRate: '',
          gatewayRate: '',
          quickRate: '',
          wapRate: '',
          businessContact: '',
          businessContactQQ: '',
          businessContactEmail: ''
        },
        rules: {
          storeName: [
            {required: true, message: '请填写商户名称', trigger: 'blur'},
            {min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur'}
          ],
          shortName: [
            {required: true, message: '请填写商户简称', trigger: 'blur'},
            {min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur'}
          ],
          postalCode: [
            {required: true, message: '请填写邮政编码', trigger: 'blur'},
            {validator: checkPostalCode, trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请填写实际地址', trigger: 'blur'}
          ],
          registeredCapital: [
            {required: true, message: '请填写注册资金', trigger: 'blur'},
            {validator: checkAllNum, trigger: 'blur'}
          ],
          mainAccountBank: [
            {required: true, message: '请选择主账户开户行', trigger: 'blur'}
          ],
          bankName: [
            {required: true, message: '请填写主账户开户行名称', trigger: 'blur'}
          ],
          bankAccountName: [
            {required: true, message: '请填写主账户开户名', trigger: 'blur'}
          ],
          bankAccount: [
            {required: true, message: '请填写主账户开户行账号', trigger: 'blur'}
          ],
          legalPersonName: [
            {required: true, message: '请填写法人姓名', trigger: 'blur'}
          ],
          corporateIDNumber: [
            {required: true, message: '请填写法人身份证号', trigger: 'blur'},
            {validator: checkIDCard, trigger: 'blur'}
          ],
          corporateIDPhone: [
            {required: true, message: '请填写法人联系电话', trigger: 'blur'},
            {validator: checkPhone, trigger: 'blur'}
          ],
          wechatRate: [
            {required: true, message: '请填写微信费率', trigger: 'blur'},
            {validator: checkRate, trigger: 'blur'}
          ],
          alipayRate: [
            {required: true, message: '请填写支付宝费率', trigger: 'blur'},
            {validator: checkRate, trigger: 'blur'}
          ],
          alipayServiceRate: [
            {required: true, message: '请填写支付宝服务窗费率', trigger: 'blur'},
            {validator: checkRate, trigger: 'blur'}
          ],
          weChatPublicRate: [
            {required: true, message: '请填写微信公众号费率', trigger: 'blur'},
            {validator: checkRate, trigger: 'blur'}
          ],
          qqRate: [
            {required: true, message: '请填写QQ费率', trigger: 'blur'},
            {validator: checkRate, trigger: 'blur'}
          ],
          gatewayRate: [
            {required: true, message: '请填写网关费率', trigger: 'blur'},
            {validator: checkRate, trigger: 'blur'}
          ],
          quickRate: [
            {required: true, message: '请填写快捷费率', trigger: 'blur'},
            {validator: checkRate, trigger: 'blur'}
          ],
          wapRate: [
            {required: true, message: '请填写WAP费率', trigger: 'blur'},
            {validator: checkRate, trigger: 'blur'}
          ],
          businessContact: [
            {required: true, message: '请填写业务联系人', trigger: 'blur'}
          ],
          businessContactQQ: [
//            {required: true, message: '请填写业务联系QQ', trigger: 'blur'},
            {validator: checkQQ, trigger: 'blur'}
          ],
          businessContactEmail: [
//            {required: true, message: '请填写业务联系Email', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.banklists = BankList
      this.form.wechatRate = formatMoney('0.4')
      const {bankName, bankCode, cardType} = checkBankCardAttribution('6226 6222 0674 6683')
      console.log(bankName, bankCode, cardType === 'DC' ? '借记卡' : '信用卡')
      this.form.mainAccountBank = bankName
    },
    methods: {
      onSubmit () {
        console.log('submit', this.form)
      }
    }
  }
</script>
<style>
</style>
