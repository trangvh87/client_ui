
Vue.component('input-text', {
  props:  {
    id: String,
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
    type:{
      type: String,
      default: 'text'
    },
    label: String,
    prop: String,
    disabled: Boolean,
    maxlength: [String, Number],
    minlength: [String, Number],
    numberGirdResponsive: {
      type: [String, Number],
      default: 24
    },
    key: [String, Number]
  },
  template: `
<el-col v-bind="objReponsive(numberGirdResponsive)">
  <el-form-item :label="label" :prop="prop" :key="key">
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
      show-word-limit
      @focus="$emit('focus', $event)"
      @input="$emit('input', $event)"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
    >
</el-input>
  </el-form-item>
  </el-col>
`,
  computed: {
    val: {
      get() {
        let strValue = this.vModel ? `${this.vModel}` : ''
        return strValue.trimLeft()
      },
      set(value) {
        this.$emit('update:vModel', value);
        this.$emit('input', value)
      }
    }
  },
  methods: {
    objReponsive(number) {
      const covertNumber = Number(number)
      return {
        xs: 24,
        sm: 24,
        md: covertNumber,
        lg: covertNumber,
        xl: covertNumber
      }
    }
  }
});

Vue.component('input-select', {
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
  template: `
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
          :label="item.value + ' - ' + item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
    </el-form-item>
    </el-col>
  `,
  data() {
    return {
      filterable: false,
      remote: false,
      loading: false,
      dataSource: []
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
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.dataSource = [];
      }
    },
    objReponsive(number) {
      const covertNumber = Number(number)
      return {
        xs: 24,
        sm: 24,
        md: covertNumber,
        lg: covertNumber,
        xl: covertNumber
      }
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
  }
});

Vue.component('input-date', {
  props:  {
    id: String,
    format: String,
    value: {
      type: [String, Number, Date],
      default: ''
    },
    dateType: {
      type: String,
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
  template: `
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
`,
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
    objReponsive(number) {
      const covertNumber = Number(number)
      return {
        xs: 24,
        sm: 24,
        md: covertNumber,
        lg: covertNumber,
        xl: covertNumber
      }
    }
  }
});

Vue.component('date-range-picker', {
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
  template: `
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
`,
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
    objReponsive(number) {
      const covertNumber = Number(number)
      return {
        xs: 24,
        sm: 24,
        md: covertNumber,
        lg: covertNumber,
        xl: covertNumber
      }
    }
  }
});

Vue.component('append-two-input', {
  data() {
    return {
      withPrefix: false
    }
  },
  props:  {
    spanProps: {
      type: Array,
      default: () => [3, 18, 3]
    },
    isRemoveStarSecond: {
      type: Boolean,
      default: false
    },
    prefixText: {
      type: String,
      default: null
    }
  },
  template: `
 <el-row :gutter="0" class="append-two-component">
   <el-col :span="spanProps[0]" class="prefix">
      <el-button v-if="prefixText" class="prefix-text">
        {{ prefixText }}
      </el-button>
      <slot v-else name="prefix" />
    </el-col>
    <el-col :span="spanProps[1]" :class="{'with-prefix': withPrefix, 'without-prefix': !withPrefix }">
     <slot name="input" />
    </el-col>
    <el-col :span="spanProps[2]" class="suffix">
        <slot name="suffix" />
    </el-col>
  </el-row>
`,
});
