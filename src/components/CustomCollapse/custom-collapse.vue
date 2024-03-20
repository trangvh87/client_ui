<template>
  <div class="collapse-container">
    <el-collapse v-model="activeName" accordion @change="onCollapse">
      <el-collapse-item name="1">
        <template slot="title">
          <svg-icon
              :class="classObj"
              icon-class="collapse-icon"
          />
          <span class="title">{{ title }}</span>
        </template>

        <slot/>
      </el-collapse-item>

      <el-divider v-if="borderBottom && isActive"/>
    </el-collapse>
  </div>
</template>

<script>
import svgIcon from "@/components/SvgIcon/index.vue";
export default {
  name: 'CustomCollapse',
  components: {
    svgIcon
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
    }
  },
  data() {
    return {
      isActive: this.defaultOpen,
      activeName: this.defaultOpen ? '1' : null
    }
  },
  computed: {
    classObj() {
      return {
        'custom-collapse': true,
        'is-collapse': !this.isActive
      }
    }
  },
  methods: {
    onCollapse(e) {
      this.isActive = e
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse-container {
  .el-collapse {
    border-top: none;
    border-bottom: none;

    .el-collapse-item__header .is-active {
      .el-collapse-item__arrow {
        visibility: hidden;
      }
    }

    .el-collapse-item {
      .el-collapse-item__wrap {
        border-bottom: none !important;
      }
    }
  }

  .custom-collapse {
    font-size: 32px;
    margin-right: 10px;
    transition: transform .2s;
  }

  .is-collapse {
    transform: rotate(-90deg);
  }
}

.title {
  font-size: 16px;
  font-weight: 700;
}

::v-deep .el-divider--horizontal {
  margin: 2px 0;
}

::v-deep .el-collapse-item__wrap {
  border-top: none;
  border-bottom: none;
}

::v-deep .el-collapse-item__arrow {
  visibility: hidden;
}

::v-deep .el-collapse-item__header {
  border-bottom: none;
}

::v-deep .el-collapse-item__content {
  padding-bottom: 5px;
}
</style>
