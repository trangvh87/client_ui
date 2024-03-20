<template>
  <div>
    <div style="border-bottom: 1px solid #E8E8E8; border-top: 1px solid #E8E8E8;">
      <div class="EmptyBox20" />
      <el-form
        ref="mauTk"
        :model="formMau"
        :rules="rules"
        label-position="top"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item class="long-input-70" label="Mã mẫu" prop="maMau">
              <el-input-etc
                v-model="formMau.maMau"
                clearable
                maxlength="50"
                placeholder="Mã mẫu"
                @keypress.native="onPreventSpecialChar"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="long-input-70" label="Tên mẫu" prop="tenMau">
              <el-input-etc
                v-model="formMau.tenMau"
                clearable
                maxlength="255"
                placeholder="Tên mẫu"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="EmptyBox10" />
    </div>
    <div class="EmptyBox20" />
    <div style="display: flex; justify-content: center;">
      <el-button
        icon="el-icon-close"
        @click="closeDialog()"
      >
        Hủy bỏ
      </el-button>
      <el-button
        icon="el-icon-check"
        type="primary"
        @click="save()"
      >
        Lưu thông tin
      </el-button>
    </div>
  </div>
</template>

<script>

import {onPreventSpecialChar, requiredRule} from "@/untils/validate";
import {PATTERN} from "@/untils/constant";


export default {
  name: 'LuuMau',
  data() {
    return {
      formMau: {},
      rules: {
        maMau: [requiredRule('Mã mẫu'),
          {
            pattern: PATTERN.NAME_NON_VI,
            message: 'Mã mẫu không đúng định dạng',
            trigger: ['blur', 'change']
          }],
        tenMau: [requiredRule('Tên mẫu')]
      }
    }
  },
  methods: {
    onPreventSpecialChar,
    save() {
      this.$refs.mauTk.validate((valid) => {
        if (!valid) return false
        this.$emit('closeDialog', this.formMau)
      })
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>

</style>
