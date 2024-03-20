<template>
  <el-form
      ref="formModel"
      label-position="top"
      label-width="100px"
      :model="formModel"
      size="mini"
      :rules="ruleFormThongTinKhac">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="Số tờ khai xuất khẩu tại chỗ tương ứng">
          <el-row :gutter="20">
            <el-col
                v-for="(onSpotExportdeclarationNo, idx) in formModel.onSpotExportdeclarationNo"
                :key="idx"
                v-bind="objReponsive(8)"
            >
              <div class="custom_error">
                <el-form-item
                    :rules="ruleFormThongTinKhac.onSpotExportdeclarationNo"
                    :prop="'onSpotExportdeclarationNo[' + idx + '].soTkXktc'"
                    label-width="50px"
                >
                  <append-two-input
                      :prefix-text="(idx + 1).toString()"
                  >
                    <div slot="input">
                      <el-input
                          v-model="formModel.onSpotExportdeclarationNo[idx].soTkXktc"
                          placeholder="Số tờ khai xuất khẩu tại chỗ"
                          maxlength="12"
                          show-word-limit
                          clearable
                      ></el-input>
                    </div>
                    <div slot="suffix">
                      <div class="custom-delete-button">
                        <el-button
                            size="mini"
                            icon="el-icon-error"
                            @click="delItem(formModel.onSpotExportdeclarationNo, idx, validateThongTinKhac)"
                        />
                      </div>
                    </div>
                  </append-two-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div style="float: left">
              <el-button
                  v-if="checkShowFields.buttonAdd"
                  icon="el-icon-circle-plus-outline"
                  size="mini"
                  plain
                  type="primary"
                  :disabled="isAddLegalButtonDisabled"
                  @click="addNewItem(formModel.onSpotExportdeclarationNo, {soTkXktc: ''}, 'formModel', false)"
              >Thêm số tờ khai
              </el-button>
            </div>
          </el-row>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <input-select
          label="Phân loại hàng hóa đặc thù"
          :v-model.sync="formModel.classificationOfSpecificGoods"
          prop="classificationOfSpecificGoods"
          :list-option-select="listPhanLoaiHangHoaDacThu"
          :number-gird-responsive="8"
      >
      </input-select>

      <input-text
          prop="enterpriseInternalNumber"
          label="Số quản lý của nội bộ doanh nghiệp"
          :v-model.sync="formModel.enterpriseInternalNumber"
          maxlength="20"
          :number-gird-responsive="8"
      ></input-text>
    </el-row>

    <el-row :gutter="20">
      <input-text
          prop="notes"
          label="Ghi chú"
          :v-model.sync="formModel.notes"
          type="textarea"
          maxlength="500"
          :number-gird-responsive="16"
      ></input-text>
    </el-row>
  </el-form>
</template>

<script>
import {addNewItem, delItem, objReponsive, validateField} from "@/untils/untils";
import {FIELDS, listPhanLoaiHangHoaDacThu} from "@/untils/listCategory";
import {checkPropertyValueExists, numberRule, requiredRule, validateRegex} from "@/untils/validate";
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";
import appendTwoInput from "@/components/InputEtc/append-two-input.vue";
import {PATTERN} from "@/untils/constant";

export default {
  name: "step-thong-tin-khac",
  components: {
    inputSelect,
    inputText,
    appendTwoInput
  },
  data() {
    return {
      formModel: {
        onSpotExportdeclarationNo: [],
        classificationOfSpecificGoods: '',
        notes: '',
        enterpriseInternalNumber: '',
      },
      ruleFormThongTinKhac: {
        enterpriseInternalNumber: [validateRegex(PATTERN.REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Số quản lý nội bộ của doanh nghiệp')],
        onSpotExportdeclarationNo: [requiredRule('Số tờ khai xuất khẩu tại chỗ tương ứng'), numberRule('Số tờ khai xuất khẩu tại chỗ tương ứng'),
          {min: 12, max: 12, message: 'Số tờ khai xuất khẩu tại chỗ tương ứng gồm 12 chữ số'},
          {
            validator: this.validateDuplicateSoTk,
            trigger: ['change', 'blur']
          }
        ]
      },
      listPhanLoaiHangHoaDacThu: listPhanLoaiHangHoaDacThu
    }
  },
  computed: {
    isDeleteLegalButtonDisabled() {
      return this.onSpotExportdeclarationNo.onSpotExportdeclarationNo && this.onSpotExportdeclarationNo.onSpotExportdeclarationNo.length === 0
    },
    isAddLegalButtonDisabled() {
      if (!this.formModel.onSpotExportdeclarationNo || this.formModel.onSpotExportdeclarationNo.length === 0) {
        return false
      }
      const index = this.formModel.onSpotExportdeclarationNo.length - 1
      if (!this.formModel.onSpotExportdeclarationNo[index]) return false
      return (
          !this.formModel.onSpotExportdeclarationNo[index].soTkXktc
      )
    },
    checkShowFields() {
      return _.cloneDeep(FIELDS)
    },
  },
  methods: {
    addNewItem,
    delItem,
    objReponsive,
    validateDuplicateSoTk(info, value, callback) {
      this.validateDuplicateMa(info, value, callback, this.formModel.onSpotExportdeclarationNo, 'onSpotExportdeclarationNo', 'soTkXktc', 'Số tờ khai xuất khẩu tại chỗ tương ứng')
    },
    validateThongTinKhac(i) {
      if (this.formModel.onSpotExportdeclarationNo[i].soTkXktc) validateField('formThongTinTrungChuyen', 'onSpotExportdeclarationNo[' + i + '].soTkXktc')
    },
    validateDuplicateMa(info, value, callback, arr, labelArr, propField, labelField) {
      const checkArr = [...arr]
      // checkArr.pop()
      // const indexLength = 1 + info.field.length - lengthField
      const index = info.field.substring(info.field.indexOf('[') + 1, info.field.indexOf(']'))
      _.pullAt(checkArr, index)
      if (_.size(checkArr) > 0) {
        if (checkPropertyValueExists(checkArr, value, propField)) {
          callback(new Error(`${labelField} [${value}] bị trùng lặp`))
        } else {
          // this.$refs.lstTkHhMkdc.clearValidate(`${labelArr}[${index}].${propField}`)
        }
      }
      return callback()
    },
  }
}
</script>

<style scoped>

</style>
