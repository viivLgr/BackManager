
// 计算费率显示
export function computedRateDesc(rate, type) {
  if (type === "1") {
    return rate + "元";
  } else if (type === "2") {
    return rate * 100 + "%";
  }
}

// 计算状态显示
export function computedStatusDesc(status) {
  if (status === "VALID") {
    return '生效';
  } else if (status === "INVALID") {
    return '失效';
  }
}

// 计算状态值
export function computedStatus(statusDesc) {
  if (statusDesc === "生效") {
    return 'VALID';
  } else if (statusDesc === "失效") {
    return 'INVALID';
  }
}
// 计算代理类型描述
export function computedAgentDesc(agentType) {
  if (agentType === "MER_AGENT") {
    return '代理商';
  } else if (agentType === "COMMON") {
    return '普通商户';
  }
}

// 计算费率类型Desc
export function computedRateTypeDesc(rateType) {
  if (rateType === "1") {
    return '按笔收费，单位：元';
  } else if (rateType === "2") {
    return '按百分比，小数格式';
  }
}

// 格式化金额
export function formatMoney(x) {
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

// 获得时间戳
export function getTimestamps(date) {
  return new Date(date).getTime();
}

// 格式化年-月-日 时间方法
export function formatDate(date, fmt) {
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
function padLeftZero(str) {
  str = String(str)
  return ('00' + str).substr(str.length)
}

// 格式化银行卡
export function formatBankCard(card) {
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
