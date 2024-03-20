<template>
  <el-col v-bind="objReponsive(numberGirdResponsive)">
    <el-form-item :label="label" :prop="prop" >
      <el-date-picker
          style="width: 100%"
          :id="id"
          v-model="val"
          :format="format || 'dd-MM-yyyy'"
          :type="dateType"
          :clearable="clearable"
          :disabled="disabled"
          :placeholder="label"
          :picker-options="pickerOptions"
          @change="$emit('change', event)"

      ></el-date-picker>
    </el-form-item>
  </el-col>
</template>

<script>
import { objReponsive } from '@/untils/untils'
export default {
  name: "input-date",
  props:  {
    id: String,
    format: String,
    vModel: {
      type: [String, Number, Date],
      default: ''
    },
    dateType: {
      type: Date,
      default: 'date'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: String,
    prop: String,
    numberGirdResponsive: {
      type: [String, Number],
      default: 24
    },
    pickerOptions: Object
  },
  data() {
    return {
      objReponsive
    }
  },
  computed: {
    val: {
      get() {
        return this.vModel
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
