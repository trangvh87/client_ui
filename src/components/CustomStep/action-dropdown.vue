<template>
  <div class="main-action">
    <el-link
        class="delete-link"
        type="danger"
        @click="onDelete"
    >
      {{ deleteBtnLabel }}
    </el-link>

    <el-dropdown
        class="main-dropdown"
        placement="top"
        trigger="click"
        @command="handleCommand"
    >
      <el-button class="save-btn" size="medium">
        <svg-icon class-name="save-icon" icon-class="save-icon"/>
        <span>{{ saveBtnLabel }}</span>
        <i class="el-icon-caret-top el-icon--right"/>
      </el-button>

      <el-dropdown-menu slot="dropdown" class="action-content">
        <el-dropdown-item disabled>
          <b class="choose-label">{{ chooseLabel }}</b>
        </el-dropdown-item>

        <el-divider/>

        <el-dropdown-item
            v-for="(item, index) in dropdownList"
            :key="index"
            :command="item.command"
            :disabled="item.disabled"
            :divided="item.divided"
        >
          <label class="label">{{ item.label }}</label>
          <div class="desc">{{ item.description }}</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button
        v-show="showSendBtn"
        :disabled="disabledSendBtn"
        icon="el-icon-check"
        size="medium"
        type="primary"
        @click.native="onSend"
    >
      <span class="send-btn">{{ sendBtnLabel }}</span>
    </el-button>
  </div>
</template>

<script>
import svgIcon from "@/components/SvgIcon/index.vue";
export default {
  name: "action-dropdown",
  components: {
    svgIcon
  },
  props: {
    deleteBtnLabel: {
      type: String,
      default: 'Xoá tờ khai'
    },
    saveBtnLabel: {
      type: String,
      default: 'Lưu tờ khai'
    },
    chooseLabel: {
      type: String,
      default: 'Lựa chọn'
    },
    sendBtnLabel: {
      type: String,
      default: 'Gửi tờ khai tạm'
    },
    disabledSendBtn: {
      type: Boolean,
      default: false
    },
    showSendBtn: {
      type: Boolean,
      default: true
    },
    dropdownList: {
      type: Array,
      default: () => {
        return [{}]
      }
    }
  },
  computed: {
    dropdownListIsShow() {
      return this.dropdownList
    }
  },
  methods: {
    onDelete() {
      this.$emit('onDelete')
    },
    onSend() {
      this.$emit('onSend')
    },
    handleCommand(command) {
      this.$emit('command', command)
    }
  }
}
</script>

<style scoped lang="scss">
.main-action {
  .delete-link {
    font-size: 15px;
    font-weight: 500;
  }

  .main-dropdown {
    margin: 0 15px 0 15px;

    .save-btn {
      color: #1472E6;
      border: 1px solid #1472E6;
      border-radius: 6px;

      .save-icon {
        margin-right: 10px;
      }

      span {
        font-weight: 500;
      }
    }
  }

  .send-btn {
    font-weight: 500;
  }

}

.choose-label {
  color: #313131 !important;
}

.action-content {
  .el-divider--horizontal {
    margin: 5px 0 !important;
  }

  .el-dropdown-menu__item {
    .label {
      color: #1472E6;
    }

    .desc {
      color: rgba(0, 0, 0, 0.4);
    }

    &:hover, .el-dropdown-menu__item:focus {
      background-color: #F6FAFF !important;
      color: #46a6ff !important;
    }
  }

  .el-dropdown-menu__item.is-disabled {
    .label {
      color: #b3b3b3;
    }

    .desc {
      color: #b3b3b3;
    }
  }
}
</style>
