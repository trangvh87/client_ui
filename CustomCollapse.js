Vue.component('CustomCollapse', {
  data() {
    return {
      isActive: this.defaultOpen,
      activeName: this.defaultOpen ? '1' : null
    }
  },
  props: {
    title: String,
    defaultOpen: {
      type: Boolean,
      default: true
    },
    borderBottom: {
      type: Boolean,
      default: false
    },
    iconClass: {
      type: String
    }
  },
  template: `<div class="collapse-container">
    <el-collapse v-model="activeName" accordion @change="onCollapse">
      <el-collapse-item name="1">
        <template slot="title">
        <svg v-on="$listeners" :class="classObj" :id="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
  <!--        <svg-icon
              :class="classObj"
              icon-class="collapse-icon"
          />-->
          <span class="title">{{ title }}</span>
        </template>

        <slot/>
      </el-collapse-item>

      <el-divider v-if="borderBottom && isActive"/>
    </el-collapse>
  </div>`,
  computed: {
    classObj() {
      return {
        'custom-collapse': true,
        'is-collapse': !this.isActive
      }
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
  },
  methods: {
    onCollapse(e) {
      this.isActive = e
      this.$emit('change', e)
    }
  }
})


Vue.component('svg-icon', {
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  template: `<div v-if="isExternal" v-on="$listeners" :style="styleExternalIcon" class="svg-external-icon svg-icon"/>
  <svg v-else v-on="$listeners" :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>`,
  computed: {
    isExternal() {
      return this.isExternal(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  },
  methods: {
    isExternal(path) {
      return /^(https?:|mailto:|tel:|.\/|..\/)/.test(path)
    }
  }
})
