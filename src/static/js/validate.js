import {
  BankCardList
} from './bankList'

// 去除空格
export function myTrim(str, isglobal) {
  let result = str.replace(/(^\s+)|(\s+$)/g, '')
  if (isglobal && isglobal.toLowerCase() === 'g') {
    result = result.replace(/\s/g, '')
  }
  return result
}

// 校验手机号
export function validPhone(value) {
  return /^0?1[35784][0-9][0-9]{8}$/.test(value);
}

// 校验纯中文
export function validChinses(value) {
  return /^[\u4E00-\u9FA5]+$/.test(value);
}

// 校验费率
export function validRate(rule, value, callback) {
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
export function validNotAllNum(value) {
  return /^\d+$/g.test(value);
}

// 校验为纯数字
export function validAllNum(value) {
  return !/^\d+$/g.test(value);
}

// 校验身份证
export function validIDCard(value) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
}

// 校验营业执照
export function validLicense(rule, value, callback) {
  return /^\d{15}$/.test(value);
}

// 密码强度
// passwordLevel(value) != 1 必须有字母和数字
export function passwordLevel(password) {
  var Modes = 0
  for (let i = 0; i < password.length; i++) {
    Modes |= CharMode(password.charCodeAt(i))
  }
  return bitTotal(Modes)

  // CharMode函数
  function CharMode(iN) {
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
  function bitTotal(num) {
    let modes = 0
    for (let i = 0; i < 4; i++) {
      if (num & 1) modes++
      num >>>= 1
    }
    return modes
  }
}

// 校验邮政编码
export function validPostalCode(value) {
  return /^[1-9]\d{5}$/.test(value);
}

// 校验QQ
export function validQQ(value) {
  return /^[1-9]\d{4,14}$/.test(value);
}

// 校验wechat
export function validWechat(value) {
  return /^[1-9]\d{4,14}$/.test(value);
}

// 校验Email
export function validEmail(value) {
  // /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
}
// 校验Fax固话
export function validFax(value) {
  return /^0?(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))$/.test(value);
}

// 银行卡号Luhn校验算法
// luhn校验规则：16位银行卡号（19位通用）
// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。

// bankno为银行卡号
function luhnCheck(bankno) {
  var lastNum = bankno.substr(bankno.length - 1, 1); // 取出最后一位（与luhn进行比较）

  var first15Num = bankno.substr(0, bankno.length - 1); // 前15或18位
  var newArr = [];
  for (var i = first15Num.length - 1; i > -1; i--) { // 前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }
  var arrJiShu = []; // 奇数位*2的积 <9
  var arrJiShu2 = []; // 奇数位*2的积 >9

  var arrOuShu = []; // 偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 === 1) { // 奇数位
      if (parseInt(newArr[j]) * 2 < 9) {
        arrJiShu.push(parseInt(newArr[j]) * 2);
      } else {
        arrJiShu2.push(parseInt(newArr[j]) * 2);
      }
    } else { // 偶数位
      arrOuShu.push(newArr[j]);
    }
  }

  var jishuChild1 = []; // 奇数位*2 >9 的分割之后的数组个位数
  var jishuChild2 = []; // 奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishuChild1.push(parseInt(arrJiShu2[h]) % 10);
    jishuChild2.push(parseInt(arrJiShu2[h]) / 10);
  }

  var sumJiShu = 0; // 奇数位*2 < 9 的数组之和
  var sumOuShu = 0; // 偶数位数组之和
  var sumJiShuChild1 = 0; // 奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0; // 奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0;
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }

  for (var p = 0; p < jishuChild1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishuChild1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishuChild2[p]);
  }
  // 计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

  // 计算luhn值
  var k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10;
  var luhn = 10 - k;

  if (lastNum === luhn) {
    console.log("验证通过");
    return true;
  } else {
    console.log("银行卡号必须符合luhn校验");
    return false;
  }
}

// 检查银行卡号
export function validBankNo(value) {
  value = value.replace(/\s/g, '');
  // 开头6位
  var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
  if (strBin.indexOf(value.substring(0, 2)) === -1) {
    console.log("银行卡号开头6位不符合规范");
    return false;
  }
  // Luhn校验
  if (!luhnCheck(value)) {
    return false;
  }
  return true;
}

// 校验银行账号所属银行
export function validBankCardAttribution(card) {
  card = myTrim(card, 'g')
  console.log(card)
  const r = /^[1-9]\d{15,18}$/
  let result = {
    bankName: '',
    bankCode: '',
    cardType: ''
  }
  if (!r.test(card)) {
    result = {
      bankName: '请输入正确的银行卡号',
      bankCode: '',
      cardType: ''
    }
  }
  BankCardList.forEach((item) => {
    const {
      bankName,
      bankCode,
      patterns
    } = item
    patterns.forEach((i) => {
      const {
        reg,
        cardType
      } = i
      if (new RegExp(reg).test(card)) {
        result = {
          bankName,
          bankCode,
          cardType
        }
      }
    })
  })
  return result
}
