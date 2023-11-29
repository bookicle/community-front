// 校验正则表达式
const reg = {
  // number
  number: /^[0-9]*$/,
  // 邮箱
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
  // 密码，长度6-18位，可以包含特殊字符和字母大小写
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
}
const verify = (rule, value, reg, callback) => {
  if (value) {
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error(rule.message))
    }
  } else {
    callback();
  }
}

export default {
  email: (rule, value, callback) => {
    verify(rule, value, reg.email, callback)
  },
  number: (rule, value, callback) => {
    verify(rule, value, reg.number, callback)
  },
  password: (rule, value, callback) => {
    verify(rule, value, reg.password, callback)
  },

}
