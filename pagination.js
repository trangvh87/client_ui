Vue.component('pagination', {
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    },
    popperClass: {
      type: String,
      default: ''
    }
  },
  template: `
<div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
        v-bind="$attrs"
        :background="background"
        :popper-class="popperClass"
        :current-page.sync="currentPage"
        :layout="layout"
        :page-size.sync="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
`,
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('update:page', 0)
      this.$emit('pagination', {page: 0, limit: val})
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', {page: val, limit: this.pageSize})
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
})
