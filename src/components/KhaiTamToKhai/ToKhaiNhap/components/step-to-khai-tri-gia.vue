<template>
  <div>
    <el-form :label-position="'top'" label-width="100px" :model="formModel" size="mini"
             :rules="rulesFormToKhaiTriGia" ref="formModel"
    >

      <el-row :gutter="20">
        <input-select
            prop="valuationDemarcationCode"
            label="Mã phân loại khai trị giá"
            :v-model.sync="formModel.valuationDemarcationCode"
            :list-option-select="listHq"
            :number-gird-responsive="8"
        ></input-select>

        <input-text
            prop="valuationComprehensiveRefNo"
            label="Số tiếp nhận tờ khai trị giá tổng hợp"
            :v-model.sync="formModel.valuationComprehensiveRefNo"
            maxlength="9"
            :number-gird-responsive="8"
        ></input-text>
      </el-row>

      <el-row :gutter="20">
        <input-select
            prop="freightDemarcationCode"
            label="Mã phân loại phí vận chuyển"
            :v-model.sync="formModel.freightDemarcationCode"
            :list-option-select="listHq"
            :number-gird-responsive="16"
        ></input-select>

        <el-col v-bind="objReponsive(8)">
          <append-two-input
              is-remove-star-second
              :span-props = '[0, 12, 12]'
          >
            <div slot="input">
              <el-form-item label="Phí vận chuyển" prop="freightAmount">
                <el-input
                    prop="freightAmount"
                    v-model="formModel.freightAmount"
                    maxlength="21"
                    placeholder="Phí vận chuyển"
                    show-word-limit
                    clearable
                ></el-input>
              </el-form-item>
            </div>
            <div slot="suffix">
              <el-form-item label=" " prop="freightCurrencyCode">
                <el-select
                    v-model="formModel.freightCurrencyCode"
                    placeholder="Mã tiền tệ của phí vận chuyển"
                    clearable
                    style="width: 100%"
                >
                  <el-option
                      v-for="item in listHq"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </append-two-input>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <input-select
            prop="insuranceDemarcationCode"
            label="Mã phân loại bảo hiểm"
            :v-model.sync="formModel.insuranceDemarcationCode"
            :list-option-select="listHq"
            :number-gird-responsive="8"
        ></input-select>

        <input-text
            prop="registrationNoOfComprehensiveInsurance"
            label="Số đăng ký bảo hiểm tổng hợp"
            :v-model.sync="formModel.registrationNoOfComprehensiveInsurance"
            maxlength="9"
            :number-gird-responsive="8"
        ></input-text>

        <el-col v-bind="objReponsive(8)">
          <append-two-input
              is-remove-star-second
          >
            <div slot="first">
              <el-form-item label="Phí bảo hiểm" prop="insuranceAmount">
                <el-input
                    prop="insuranceAmount"
                    :v-model.sync="formModel.insuranceAmount"
                    maxlength="21"
                    placeholder="Phí bảo hiểm"
                    show-word-limit
                    clearable
                ></el-input>
              </el-form-item>
            </div>
            <div slot="second">
              <el-form-item label=" " prop="insuranceCurrencyCode">
                <el-select
                    v-model="formModel.insuranceCurrencyCode"
                    placeholder="Mã tiền tệ của phí vận chuyển"
                    clearable
                    style="width: 100%"
                >
                  <el-option
                      v-for="item in listHq"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </append-two-input>
        </el-col>
      </el-row>

      <p style="font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 19px;
    color: #555555;
    margin: 10px 0;"
      >
        Khoản điều chỉnh
      </p>

      <p style="font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #686868;
    margin-bottom: 10px;"
      >
        Có thể nhập tối đa 5 khoản điều chỉnh
      </p>
      <div
          class="border-el-table"
          style="vertical-align: middle"
      >
        <el-row :gutter="20" class="text-center table-header-edit">
          <el-col :span="1" style="word-break: break-word;">
            STT
          </el-col>
          <el-col :span="5" style="word-break: break-word;">
            Mã tên khoản điều chỉnh
          </el-col>
          <el-col :span="4" style="word-break: break-word;">
            Mã phân loại
          </el-col>
          <el-col :span="4" style="word-break: break-word;">
            Mã tiền tệ
          </el-col>
          <el-col :span="4" style="word-break: break-word;">
            Trị giá khoản điều chỉnh
          </el-col>
          <el-col :span="5" style="word-break: break-word;">
            Tổng hệ số phân bổ trị giá
          </el-col>
        </el-row>
      </div>

      <div
          v-if="!formModel.valuationAdjustments || formModel.valuationAdjustments.length === 0"
          class="el-table__empty-block"
          style="height: 100%; width: 100%;"
      >
        <span class="el-table__empty-text">Không có dữ liệu</span>
      </div>
      <el-form
          v-else
          ref="formModel"
          :model="formModel"
          :rules="rulesFormToKhaiTriGia"
          style="padding-top: 0px"
          size="mini"
          label-width="0px"
          label-position="top"

      >
        <el-row
            v-for="(value, index) in formModel.valuationAdjustments"
            :key="index"
            :gutter="10"
            class="border-bot"
            style="padding: 15px 0 0 0; margin-top: 0px;"
        >
          <el-col :span="1" style="padding-top: 5px">
            {{ index + 1 }}
          </el-col>

          <input-select
              :prop="'valuationAdjustments[' + index + '].codeValuationTitle'"
              :v-model.sync="formModel.valuationAdjustments[index].codeValuationTitle"
              :list-option-select="listHq"
              :number-gird-responsive="5"
          >
          </input-select>

          <input-select
              :prop="'valuationAdjustments[' + index + '].valuationAdjustmentCode'"
              :v-model.sync="formModel.valuationAdjustments[index].valuationAdjustmentCode"
              :list-option-select="listHq"
              :number-gird-responsive="4"
          >
          </input-select>

          <input-select
              :prop="'valuationAdjustments[' + index + '].currencyCodeEvaluated'"
              :v-model.sync="formModel.valuationAdjustments[index].currencyCodeEvaluated"
              :list-option-select="listHq"
              :number-gird-responsive="4"
          >
          </input-select>

          <input-text
              :prop="'valuationAdjustments[' + index + '].evaluatedAmount'"
              :v-model.sync="formModel.valuationAdjustments[index].evaluatedAmount"
              maxlength="21"
              :number-gird-responsive="4"
          ></input-text>

          <input-text
              :prop="'valuationAdjustments[' + index + '].totalDistributionEevaluatedAmount'"
              :v-model.sync="formModel.valuationAdjustments[index].totalDistributionEevaluatedAmount"
              maxlength="21"
              :number-gird-responsive="5"
          ></input-text>

          <el-col :span="1" class="text-center">
            <el-tooltip :open-delay="400" content="Xóa" effect="light" placement="top">
              <div class="custom-delete-button" style="font-size: medium">
                <el-button
                    size="mini"
                    icon="el-icon-error"
                    @click="delItem(formModel.valuationAdjustments, index,  validateTriGia)"
                />
              </div>
            </el-tooltip>
          </el-col>
        </el-row>
        <div class="EmptyBox20"></div>
      </el-form>

      <div class="text-left">
        <el-button
            type="primary"
            size="mini"
            plain
            icon="el-icon-circle-plus-outline"
            @click="addNewItem(formModel.valuationAdjustments, DEFAULT_VALUE_KHOAN_DIEU_CHINH, 'formModel', true)"
        >
          <span>Thêm khoản điều chỉnh</span>
        </el-button>
      </div>

      <div class="EmptyBox20"></div>

      <el-row :gutter="20">
        <input-text
            prop="detailsOfValuation"
            label="Chi tiết khai trị giá"
            :v-model.sync="formModel.detailsOfValuation"
            maxlength="300"
            type="textarea"
            :number-gird-responsive="16"
        ></input-text>

        <input-text
            prop="totalDistributionOnTaxValue"
            label="Tổng hệ số phân bổ trị giá tính thuế"
            :v-model.sync="formModel.totalDistributionOnTaxValue"
            maxlength="21"
            :number-gird-responsive="8"
        ></input-text>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {numberRule, requiredRule, validateRegex} from "@/untils/validate";
import {addNewItem, delItem, objReponsive, validateField} from "@/untils/untils";
import {PATTERN} from "@/untils/constant";
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";
import appendTwoInput from "@/components/InputEtc/append-two-input.vue";
import {listHq} from "@/untils/listCategory";

const DEFAULT_VALUE_KHOAN_DIEU_CHINH = {
  // stt
  dcTriGiaTongHsPhanBo: undefined,
  valuationAdjustmentCode: undefined,
  currencyCodeEvaluated: undefined,
  evaluatedAmount: undefined,
  totalDistributionEevaluatedAmount: undefined
}

export default {
  name: "step-to-khai-tri-gia",
  components: {
    inputText,
    inputSelect,
    appendTwoInput
  },
  data() {
    return{
      listHq: listHq,
      formModel: {
        valuationDemarcationCode: '',
        valuationComprehensiveRefNo: '',
        freightDemarcationCode: '',
        freightAmount: '',
        freightCurrencyCode: '',
        insuranceDemarcationCode: '',
        registrationNoOfComprehensiveInsurance: '',
        insuranceAmount: '',
        insuranceCurrencyCode: '',
        valuationAdjustments: [],
      },
      rulesFormToKhaiTriGia: {
        // valuationDemarcationCode: [requiredRule('Mã phân loại tờ khai trị giá', ['change', 'blur'])],
        valuationComprehensiveRefNo: [numberRule('Số tiếp nhận tờ khai giá trị tổng hợp')],
        insuranceAmount: [],
        insuranceCurrencyCode: [],
        insuranceDemarcationCode: [],
        freightDemarcationCode: [],
        freightAmount: [numberRule('Phí vận chuyển')],
      // , validateRegex(PATTERN.REGEX_20_DECIMAL_4, 'Phí vận chuyển')
        freightCurrencyCode: [],
        codeValuationTitle: [requiredRule('Mã tên khoản điều chỉnh', ['change', 'blur']), {
          validator: this.validateDuplicateTriGiaMa,
          trigger: ['change', 'blur']
        }],
        valuationAdjustmentCode: [requiredRule('Mã phân loại', ['change', 'blur']), {
          validator: this.validateDuplicateTriGiaMaPl,
          trigger: ['change', 'blur']
        }],
        evaluatedAmount: [requiredRule('Trị giá khoản điều chỉnh', ['change', 'blur']), numberRule('Trị giá khoản điều chỉnh'), validateRegex(PATTERN.REGEX_20_DECIMAL_4, 'Trị giá khoản điều chỉnh')],
        currencyCodeEvaluated: [requiredRule('Mã tiền tệ', ['change', 'blur'])],
        totalDistributionEevaluatedAmount: [requiredRule('Tổng hệ số phân bổ trị giá', ['change', 'blur']), numberRule('Tổng hệ số phân bổ trị giá'), validateRegex(PATTERN.REGEX_20_DECIMAL_4, 'Tổng hệ số phân bổ trị giá'),
          {
            validator: this.validateDcTriGiaTongHsPhanBo,
            trigger: ['blur', 'change']
          }],
        // validateRegex(PATTERN.REGEX_20_DECIMAL_4, 'Tổng hệ số phân bổ trị giá tính thuế'),
        totalDistributionOnTaxValue: [numberRule('Tổng hệ số phân bổ trị giá tính thuế'),
          {
            validator: this.validateTongHsPhanBoTg,
            trigger: ['blur', 'change']
          }],
        detailsOfValuation: [requiredRule('Chi tiết khai trị giá', ['change', 'blur'])],
        // registrationNoOfComprehensiveInsurance: [validateRegex(PATTERN.REGEX_NOT_TV_SPECIAL, 'Số đăng ký bảo hiểm tổng hợp')]
      },
      DEFAULT_VALUE_KHOAN_DIEU_CHINH
    }
  },
  methods: {
    addNewItem, delItem, objReponsive,
    validateTriGia(i) {
      if (this.formModel.valuationAdjustments[i].codeValuationTitle) validateField('formModel', 'valuationAdjustments[' + i + '].codeValuationTitle')
    },
    validateDuplicateTriGiaMaPl(info, value, callback) {
      this.validateDuplicateMa(info, value, callback, 'valuationDemarcationCode')
    },
    validateDcTriGiaTongHsPhanBo(info, value, callback) {
      if (this.formModel.totalDistributionEevaluatedAmount) {
        if (Number(value) > Number(this.formModel.totalDistributionEevaluatedAmount)) {
          callback(new Error('Tổng hệ số phân bổ trị giá khoản điều chỉnh không được nhập lớn hơn Tổng hệ số phân bổ trị giá tính thuế'))
          return
        }
        callback()
      } else {
        callback()
      }
    },
    validateTongHsPhanBoTg(info, value, callback) {
      if (this.formModel.totalDistributionEevaluatedAmount) {
        for (const ele of this.formModel.lstTkKdc) {
          if (Number(value) < Number(ele.dcTriGiaTongHsPhanBo)) {
            callback(new Error('Tổng hệ số phân bổ trị giá tính thuế không được nhập nhỏ hơn Tổng hệ số phân bổ trị giá khoản điều chỉnh'))
            return
          }
        }
        callback()
      } else {
        callback()
      }
    },
  },
}
</script>

<style scoped>

</style>
