import { PATTERN } from './constant'
import _ from 'lodash'
export const notBeforeTodayPickerOptions = {
  disabledDate(date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }
}

export const notAfterTodayPickerOptions = {
  disabledDate(date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date > today
  }
}


export function validateForm($this, indexStep) {
  console.log('$this', $this)
  setTimeout(() => {
    if (indexStep === 0) {
      $this.$refs[$this.formName]?.clearValidate()
    } else {
      $this.$refs[$this.formName]?.validate()
    }
    indexStep++
  }, 200)
}

export function notVnCharAndSpecial(label, trigger) {
  return {
    pattern: PATTERN.NAME_NON_VI,
    message: `${label} không đúng định dạng`,
    trigger: trigger || ['change', 'blur']
  }
}

export function requiredRule(label, trigger) {
  return {
    required: true,
    message: `${label} bắt buộc`,
    trigger: trigger || ['change', 'blur']
  };
}

export function numberRule(label, trigger) {
  return {
    validator: (_rule, value, cb) => {
      if (value && isNaN(value)) {
        cb(new Error(`${label} là kiểu số`))
      } else {
        cb()
      }
    },
    trigger: trigger || ['change', 'blur']
  };
}

export function checkPropertyValueExists(arr, value, property) {
  return !_.isNil(
    _.find(arr, elem => {
      return elem[property] ? elem[property] === value : false
    })
  )
}

export function validateField($this, formName, fieldName) {
  this.$refs[$this.formName].validateField(fieldName)
}

export function decimalRule(label, whole, fraction) {
  return {
    validator: (rule, value, callback) =>
      validateDecimal(rule, value, callback, label, whole, fraction),
    trigger: ['change', 'blur']
  }
}

export function validateDecimal(rule,
  value,
  callback,
  label,
  whole = 16,
  fraction = 4) {
  if (value) {
    if (!(value + '').match('^[0-9.]*$')) {
      callback(new Error(`${label} là kiểu số`))
      return
    } else if (
      !(value + '').match(`^\\d{1,${whole}}(\\.\\d{1,${fraction}})?$`)
    ) {
      callback(new Error(`${label} không đúng định dạng`))
      return
    }
  }
  callback()
}

export function validateRegex(regex, label, trigger) {
  return {
    pattern: regex,
    message: `${label} không đúng định dạng`,
    trigger: trigger || ['change', 'blur']
  }
}

export function nonViAllowSpecialRules(label, required, trigger) {
  const rules = [notVnChar(label, trigger)]
  if (required) {
    const rqRule = requiredRule(label, trigger || ['change', 'blur'])
    rules.unshift(rqRule)
  }
  return rules
}

export function notVnChar(label, trigger) {
  return {
    pattern: PATTERN.NAME_NON_VIETNAMESE_WITH_SPECIAL,
    message: `${label} không đúng định dạng`,
    trigger: trigger || ['change', 'blur']
  }
}
export function onPreventSpecialChar($event) {
  const pattern = /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/.,]/gi
  // const isBack = pattern.test(String.fromCharCode($event.keyCode))
  const isBack = pattern.test($event.key)
  if (isBack) {
    $event.preventDefault()
  }
}




