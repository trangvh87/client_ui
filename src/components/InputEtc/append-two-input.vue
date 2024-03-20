<template>
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
</template>

<script>
export default {
  name: "append-two-input",
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
  data() {
    return {
      withPrefix: false
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.append-two-component {
  .first {
    .el-button {
      width: 100%;
      border-radius: 4px 0px 0px 4px;
      //border-right: 0px;
    }

    .el-input__inner {
      width: 100%;
      border-radius: 4px 0px 0px 4px;
      //border-right: 0px;
    }
  }

  .second {
    .el-button {
      width: 100%;
      border-radius: 0px 4px 4px 0px;
      border-left: 0px;
    }

    .el-input__inner {
      width: 100%;
      border-radius: 0px 4px 4px 0px;
      border-left: 0px;
      margin-top:0.5px
    }

    .remove-required {
      .el-form-item.is-required .el-form-item__label::after {
        content: "*";
        padding-left: 5px;
        color: transparent;
      }
    }
  }
}
</style>
<style scoped>
@media only screen and (max-width: 1366px) {
  .append-two-component .second{
    margin-top:0.03rem
  }
}
</style>
