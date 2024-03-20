<template>
  <el-col v-bind="objReponsive(numberGirdResponsive)">
    <el-form-item :label="label" :prop="prop" :label-width="labelWidth" :rules="rules">
      <el-input
          :id="id"
          v-model="val"
          :clearable="clearable"
          :disabled="disabled"
          :maxlength="maxlength"
          :minlength="minlength"
          :placeholder="label"
          :readonly="readonly"
          :type="type"
          :class="{ customTextarea: isCustomCssTextarea}"
          show-word-limit
          @focus="$emit('focus', $event)"
          @input="$emit('input', $event)"
          @blur="$emit('blur', $event)"
          @change="$emit('change', $event)"
      >
      </el-input>
    </el-form-item>
  </el-col>
</template>

<script>

import {objReponsive} from '@/untils/untils'

export default {
  name: "input-text",
  props: {
    id: String,
    value: {
      type: [String, Number],
      default: ''
    },
    vModel: {
      type: [String, Number],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    labelWidth: String,
    label: String,
    prop: String,
    disabled: Boolean,
    maxlength: [String, Number],
    minlength: [String, Number],
    numberGirdResponsive: {
      type: [String, Number],
      default: 24
    },
    isCustomCssTextarea: {
      type: Boolean,
      default: false
    },
    rules: [Object, Array]
  },
  data() {
    return {
      objReponsive
    }
  },
  computed: {
    val: {
      get() {
        let strValue = ''
        if (!this.vModel) {
          strValue = this.value ? String(this.value) : ''
        } else {
          strValue = this.vModel ? String(this.vModel) : ''
        }
        return strValue.trimLeft()
      },
      set(value) {
        this.$emit('update:vModel', value)
        this.$emit('input', value)
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.customTextarea {
  //height: 1em;
}
</style>
