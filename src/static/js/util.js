import {BankCardList} from './bankList'
// 格式化金额
export function formatMoney (x) {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return false
  }
  f = Math.round(x * Math.pow(10, 2)) / Math.pow(10, 2) // pow 幂
  let s = f.toString()
  let rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  s = s.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
  return s
}

// 格式化年-月-日 时间方法
export function formatDate (date, fmt) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  date = (typeof date === 'number') ? new Date(date) : date
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
// 不足两位补0
function padLeftZero (str) {
  str = String(str)
  return ('00' + str).substr(str.length)
}

// 格式化银行卡
export function formatBankCard (card) {
  card = card.split('')
  let val = ''
  for (let i = 0; i < card.length; i = i + 4) {
    for (let j = 0; j < 4; j++) {
      val += card[i + j] ? card[i + j] : ''
    }
    val += ' '
  }
  return val
}

// 去除空格
export function myTrim (str, isglobal) {
  let result = str.replace(/(^\s+)|(\s+$)/g, '')
  if (isglobal && isglobal.toLowerCase() === 'g') {
    result = result.replace(/\s/g, '')
  }
  return result
}

// 校验手机号
export function checkPhone (rule, value, callback) {
  const reg = /^0?1[35784][0-9][0-9]{8}$/
  if (!(reg.test(value))) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

// 校验纯中文
export function checkChinses (rule, value, callback) {
  const reg = /^[\u4E00-\u9FA5]+$/
  if (!(reg.test(value))) {
    callback(new Error('请输入中文'))
  } else {
    callback()
  }
}
// 校验费率
export function checkRate (rule, value, callback) {
  if (isNaN(value)) {
    callback(new Error('请输入数字'))
  } else if (value < 0) {
    callback(new Error('费率不得为负值'))
  } else if (value > 0.6) {
    callback(new Error('费率不得超过0.60'))
  } else {
    callback()
  }
}

// 校验不能为纯数字
export function checkNotAllNum (rule, value, callback) {
  const reg = /^\d+$/g // 手机号正则表达
  if (reg.test(value)) {
    callback(new Error('不能纯数字'))
  } else {
    callback()
  }
}
// 校验为纯数字
export function checkAllNum (rule, value, callback) {
  const reg = /^\d+$/g // 手机号正则表达
  if (!reg.test(value)) {
    callback(new Error('只能是数字'))
  } else {
    callback()
  }
}

// 校验身份证
export function checkIDCard (rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 手机号正则表达
  if (!(reg.test(value))) {
    callback(new Error('请输入正确的身份证号码'))
  } else {
    callback()
  }
}

// 校验营业执照
export function checkLicense (rule, value, callback) {
  const reg = /^\d{15}$/ // 手机号正则表达
  if (!(reg.test(value))) {
    callback(new Error('请输入正确的营业执照号码'))
  } else {
    callback()
  }
}

// 密码强度
// passwordLevel(value) != 1 必须有字母和数字
export function passwordLevel (password) {
  var Modes = 0
  for (let i = 0; i < password.length; i++) {
    Modes |= CharMode(password.charCodeAt(i))
  }
  return bitTotal(Modes)

  // CharMode函数
  function CharMode (iN) {
    if (iN >= 48 && iN <= 57) {
      return 1 // 数字
    } else if (iN >= 65 && iN <= 90) {
      return 2 // 大写字母
    } else if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) {
      return 4 // 大小写
    } else {
      return 8 // 特殊字符
    }
  }

  // bitTotal函数
  function bitTotal (num) {
    let modes = 0
    for (let i = 0; i < 4; i++) {
      if (num & 1) modes++
      num >>>= 1
    }
    return modes
  }
}

// 校验邮政编码
export function checkPostalCode (rule, value, callback) {
  const reg = /^[1-9]\\d{5}$/
  if (!(reg.test(value))) {
    callback(new Error('请输入正确的邮政编码'))
  } else {
    callback()
  }
}

// 校验QQ
export function checkQQ (rule, value, callback) {
  const reg = /^[1-9]\\d{4,14}$/
  if (!(reg.test(value))) {
    callback(new Error('请输入正确的QQ号码'))
  } else {
    callback()
  }
}
// 校验Email
export function checkEmail (rule, value, callback) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!(reg.test(value))) {
    callback(new Error('请输入正确的Email'))
  } else {
    callback()
  }
}
// 校验Fax固话
export function checkFax (rule, value, callback) {
  const reg = /^0?(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))$/
  if (!(reg.test(value))) {
    callback(new Error('请输入正确的Fax号码'))
  } else {
    callback()
  }
}

// 校验银行账号所属银行
export function checkBankCardAttribution (card) {
  card = myTrim(card, 'g')
  console.log(card)
  const r = /^[1-9]\d{15,18}$/
  let result = {bankName: '', bankCode: '', cardType: ''}
  if (!r.test(card)) {
    result = {bankName: '请输入正确的银行卡号', bankCode: '', cardType: ''}
  }
  BankCardList.forEach((item) => {
    const {bankName, bankCode, patterns} = item
    patterns.forEach((i) => {
      const {reg, cardType} = i
      if (new RegExp(reg).test(card)) {
        result = {bankName, bankCode, cardType}
      }
    })
  })
  return result
}
