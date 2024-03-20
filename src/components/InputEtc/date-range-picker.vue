<template>
  <el-col v-bind="objReponsive(numberGirdResponsive)">
    <el-form-item :label="label" :prop="prop">
      <el-date-picker
          ref="datePicker"
          v-model="val"
          :clearable="clearable"
          :disabled="disabled"
          :format="format || 'dd-MM-yyyy'"
          :picker-options="pickerOptions"
          :unlink-panels="true"
          end-placeholder="Đến ngày"
          popper-class="fixSizeWhenScale"
          range-separator="Đến"
          start-placeholder="Từ ngày"
          style="width: 100%"
          type="daterange"
          @blur="onBlur"
          @change="onChange"
          @focus="onFocus"
          @input="onInput"
      />
    </el-form-item>
  </el-col>
</template>

<script>
import { objReponsive } from '@/untils/untils'
export default {
  name: "date-range-picker",
  props:  {
    id: String,
    value: {
      type: [Array],
      default: () => {
        return []
      }
    },
    format: String,
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pickerOptions: Object,
    label: String,
    prop: String,
    numberGirdResponsive: {
      type: [String, Number],
      default: 24
    }
  },
  data() {
    return {
      objReponsive
    }
  },
  computed: {
    val: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    onChange(val) {
      this.$emit('change', val)
    },
    onBlur(val) {
      this.$emit('blur', val)
    },
    onFocus(val) {
      this.$emit('focus', val)
    },
    onInput(val) {
      if (!val) {
        this.$emit('input', [])
      }
    },
  }
}
</script>

<style scoped>

</style>
