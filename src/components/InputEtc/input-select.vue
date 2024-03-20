<template>
  <el-col v-bind="objReponsive(numberGirdResponsive)">
    <el-form-item :label="label" :prop="prop" :rules="rules">
      <el-select
          v-model="value"
          @input="$emit('update:value', $event)"
          :placeholder="isRemoteSearch ? 'Nhập tối thiểu 3 ký tự để tìm kiếm' : label"
          :clearable="clearable"
          :disabled="disabled"
          :filterable="filterable"
          :remote="remote"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="onChange"
          style="width: 100%"
      >
        <el-option
            v-for="item in dataSource"
            :key="item.value"
            :label="item.value + ' - ' + item.id"
            :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-col>
</template>

<script>
import { objReponsive } from '@/untils/untils'
export default {
  name: "inputSelect",
  props:  {
    vModel: {
      type: [String, Number],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    label: String,
    prop: String,
    disabled: Boolean,
    listOptionSelect: Array,
    isRemoteSearch: {
      type: Boolean,
      default: false
    },
    numberGirdResponsive: {
      type: [String, Number],
      default: 24
    },
    rules: [Object, Array]
  },
  data() {
    return {
      filterable: false,
      remote: false,
      loading: false,
      dataSource: [],
      objReponsive
    }
  },
  computed: {
    value: {
      get() {
        return this.vModel
      },
      set(val) {
        this.$emit('update:vModel', val)
        const text = this.dataSource.find(ele => ele.text)
        this.$emit('update:text', text)
      }
    }
  },
  mounted() {
    this.dataSource = this.isRemoteSearch ? [] : this.listOptionSelect
    if(this.isRemoteSearch) {
      this.filterable = true;
      this.remote = true
    }
  },
  methods: {
    onChange(event) {
      this.$emit('change', event)
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.dataSource = this.listOptionSelect.filter(item => {
            return item.id.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.dataSource = [];
      }
    },
  },
}
</script>

<style scoped>

</style>
