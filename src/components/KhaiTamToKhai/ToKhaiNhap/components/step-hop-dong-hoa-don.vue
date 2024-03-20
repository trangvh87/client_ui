<template>
  <div>
    <el-form :label-position="'top'" label-width="100px" :model="formModel" size="mini"
             :rules="rulesFormHopDong" ref="formModel"
    >

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Mã văn bản pháp quy khác">
            <el-row :gutter="0">
              <div>
                <div
                    v-for="(otherLawCodes, idx) in formModel.otherLawCodes"
                    :key="idx"
                    style=" float: left"
                >
                  <el-col :span="18" style="padding-right: 10px">
                    <el-form-item label="" label-width="0"
                                  :prop="'otherLawCodes[' + idx + '].maVb'"
                    >
                      <el-select v-model="formModel.otherLawCodes[idx].maVb"
                                 placeholder="Mã văn bản pháp quy khác" style="width: 100%"
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

<!--                    <el-form-item
                        :label="'(' + (idx + 1).toString() + ')'"
                        label-width="60px"
                    >-->
                    <div style="display: flex; justify-content: flex-start" v-if="formModel.otherLawCodes.length">
                      <div  style="margin-right: 0.5em">
                        <el-tag>{{ formModel.otherLawCodes[idx].maVb }}</el-tag>
                      </div>
                      <el-button
                          class="custom-delete-button"
                          size="mini"
                          icon="el-icon-delete"
                          plain
                          type="danger"
                          circle
                          :disabled="isDeleteLegalButtonDisabled"
                          @click="deleteLegal(idx)"
                      />
                    </div>

<!--                    </el-form-item>-->
                  </el-col>
                  <el-col :span="3">

                  </el-col>
                </div>
                <div>
                  <el-button
                      size="mini"
                      type="primary"
                      plain
                      icon="el-icon-circle-plus-outline"
                      :disabled="isAddLegalButtonDisabled"
                      style="float: left"
                      @click="addLegal"
                  >Thêm mã văn bản
                  </el-button>
                </div>
              </div>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <custom-collapse title="Giấy phép nhập khẩu" default-open icon-class="collapse-icon">
        <el-row :gutter="20">
          <el-col :span="16">
            <div
                class="border-el-table"
                style="vertical-align: middle"
            >
              <el-row :gutter="20" class="text-center table-header-edit">
                <el-col :span="1" style="word-break: break-word;">
                  STT
                </el-col>
                <el-col :span="11" style="word-break: break-word;">
                  Phân loại giấy phép nhập khẩu
                </el-col>
                <el-col :span="11" style="word-break: break-word;">
                  Số giấy phép nhập khẩu
                </el-col>
              </el-row>
            </div>

            <div
                v-if="!formModel.permits || formModel.permits.length === 0"
                class="el-table__empty-block"
                style="height: 100%; width: 100%;"
            >
              <span class="el-table__empty-text">Không có dữ liệu</span>
            </div>
            <el-form
                v-else
                ref="formModel"
                :model="formModel"
                :rules="rulesFormHopDong"
                style="padding-top: 0px"
                size="mini"
                label-width="0px"
                label-position="top"
            >
              <el-row
                  v-for="(value, index) in formModel.permits"
                  :key="index"
                  :gutter="10"
                  class="border-bot"
                  style="padding: 15px 0 0 0; margin-top: 0px;"
              >

                <el-col :span="1" style="padding-top: 5px">
                  {{ index + 1 }}
                </el-col>

                <input-select
                    style="margin-top: -1.7em"
                    :prop="'permits[' + index + '].permitType'"
                    label=" "
                    :v-model.sync="formModel.permits[index].permitType"
                    :list-option-select="listHq"
                    :number-gird-responsive="11"
                >
                </input-select>

                <input-text
                    style="margin-top: -1.7em"
                    label=" "
                    :prop="'permits[' + index + '].permitLicenseNo'"
                    :v-model.sync="formModel.permits[index].permitLicenseNo"
                    maxlength="35"
                    :number-gird-responsive="11"
                ></input-text>

                <el-col :span="1" class="text-center">
                  <el-tooltip :open-delay="400" content="Xóa" effect="light" placement="top">
                    <div class="custom-delete-button" style="font-size: medium">
                      <el-button
                          size="mini"
                          icon="el-icon-error"
                          @click="deleteItemGiayPhepNhapKhau(index)"
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
                  @click="addNewItemGiayPhepNhapKhau"
              >
                <span>Thêm giấy phép nhập khẩu</span>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </custom-collapse>

      <custom-collapse title="Hợp đồng, hóa đơn" default-open icon-class="collapse-icon">
        <el-row :gutter="20">
          <input-text
              :key="keyHdSo"
              label="Số hợp đồng GC"
              prop="processContractNo"
              :v-model.sync="formModel.processContractNo"
              maxlength="20"
              :number-gird-responsive="8"

          />
<!--          @blur="blurHopDongSo"
          @input="inputHopDongSo"-->

          <el-col :span="8">
            <el-form-item label="Ngày hợp đồng GC" prop="processContractDate" :key="keyHdNgay">
              <el-date-picker
                  v-model="formModel.processContractDate"
                  placeholder="Thời hạn tái xuất"
                  format="dd-MM-yyyy"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  type="date"
                  :clearable="false"

              />
<!--              @blur="blurHopDongNgay"
              @input="inputHopDongNgay"-->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <input-select
              label="Phân loại hình thức hóa đơn"
              prop="invoiceClassificationCode"
              :v-model.sync="formModel.invoiceClassificationCode"
              :number-gird-responsive="8"
              :list-option-select="listHinhThucHoaDon"
          />

          <input-text
              label="Số tiếp nhận hóa đơn điện tử"
              prop="electronicInvoiceRefNo"
              :v-model.sync="formModel.electronicInvoiceRefNo"
              maxlength="20"
              :number-gird-responsive="8"
          />

          <input-text
              label="Số hóa đơn"
              prop="invoiceNo"
              :v-model.sync="formModel.invoiceNo"
              maxlength="20"
              :number-gird-responsive="8"
          />
        </el-row>

        <el-row :gutter="20">
          <input-select
              label="Phương thức thanh toán"
              prop="termOfPayment"
              :v-model.sync="formModel.termOfPayment"
              :number-gird-responsive="8"
              :list-option-select="listHinhThucHoaDon"
          />

          <input-select
              label="Mã phân loại giá hóa đơn"
              prop="invoicePriceKindCode"
              :v-model.sync="formModel.invoicePriceKindCode"
              :number-gird-responsive="8"
              :list-option-select="listHinhThucHoaDon"
          />

          <input-select
              label="Mã điều kiện giá hóa đơn"
              prop="invoicePriceConditionCode"
              :v-model.sync="formModel.invoicePriceConditionCode"
              :number-gird-responsive="8"
              :list-option-select="listHinhThucHoaDon"
          />

        </el-row>

        <el-row :gutter="20">
          <input-text
              label="Tổng trị giá hóa đơn"
              prop="totalInvoicePrice"
              :v-model.sync="formModel.totalInvoicePrice"
              maxlength="20"
              :number-gird-responsive="8"
          />

          <input-select
              label="Mã tiền tệ của hóa đơn"
              prop="invoiceCurrencyCode"
              :v-model.sync="formModel.invoiceCurrencyCode"
              :number-gird-responsive="8"
              :list-option-select="listHinhThucHoaDon"
          />

          <el-col :span="8">
            <el-form-item label="Ngày phát hành hoá đơn" prop="invoiceDate">
              <el-date-picker
                  v-model="formModel.invoiceDate"
                  placeholder="Ngày phát hành hoá đơn"
                  format="dd-MM-yyyy"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  type="date"
                  :clearable="false"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </custom-collapse>
    </el-form>
  </div>
</template>

<script>
import {objReponsive} from "@/untils/untils";
import { listHinhThucHoaDon } from "@/untils/listCategory";
import {decimalRule, notVnChar, requiredRule, validateRegex} from "@/untils/validate";
import {cloneDeep} from "lodash";
import customCollapse from "@/components/CustomCollapse/custom-collapse.vue";
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";

const REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL = /^[`A-Z0-9~!@#$%^&*()_|+\-=?;:'"ºÞÛ»½¾¿¼Ü<>{}\[\]\\\/., ]+$/
export default {
  name: "step-hop-dong-hoa-don",
  components: {
    customCollapse,
    inputText,
    inputSelect
  },
  data() {
    return {
      keyHdSo: 0,
      keyHdNgay: 0,
      formModel: {
        otherLawCodes: [],
        permits: [],
        processContractNo: undefined,
        processContractDate: undefined,
        invoiceClassificationCode: undefined,
        electronicInvoiceRefNo: undefined,
        invoiceNo: undefined,
        termOfPayment: undefined,
        invoicePriceKindCode:undefined,
        totalInvoicePrice: undefined,
        invoiceCurrencyCode: undefined,
        invoiceDate:undefined,
        invoicePriceConditionCode: undefined,
      },
      rulesFormHopDong: {
        'otherLawCodes.maVb': [requiredRule('Mã văn bản pháp quy khác'), {
          validator: this.validateDuplicateMaVb,
          trigger: ['change', 'blur']
        }],
        'objTk.hopDongSo': [],
        'objTk.hopDongNgay': [],
        invoicePriceConditionCode: [requiredRule('Mã điều kiện giá hóa đơn')],
        totalInvoicePrice: [requiredRule('Tổng trị giá hóa đơn'), validateRegex(REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Số hóa đơn')],
        termOfPayment: [requiredRule('Phương thức thanh toán')],
        invoicePriceKindCode: [requiredRule('Mã phân loại giá hóa đơn')],
        'objTk.tongTgKb': [requiredRule('Tổng giá trị hóa đơn'), decimalRule('Tổng giá trị hóa đơn')],
        permitType: [requiredRule('Phân loại giấy phép nhập khẩu'), {
          validator: this.validateDuplicatePhanLoai,
          trigger: ['change', 'blur']
        }],
        permitLicenseNo: [requiredRule('Số giấy phép nhập khẩu'), notVnChar('Số giấy phép nhập khẩu'), {
          validator: this.validateDuplicateSoGiayPhep,
          trigger: ['change', 'blur']
        }],
        'objTk.maGiaoHang': [requiredRule('Mã điều kiện giá hóa đơn')],
        invoiceCurrencyCode: [requiredRule('Mã tiền tệ hóa đơn')],
        invoiceClassificationCode: [requiredRule('Phân loại hình thức hóa đơn')]
      },
      listHq: [
        {value: 'Chi cục Hải quan Hậu Giang', id: '54CE'},
        {value: 'Chi cục Cảnh Chân Trâu', id: '88ZZ'},
      ],
      listHinhThucHoaDon: listHinhThucHoaDon
    }
  },
  computed: {
    isDeleteLegalButtonDisabled() {
      return this.formModel.otherLawCodes && this.formModel.otherLawCodes.length === 0
    },
    addLegal() {
      const lastIndex = this.formModel.otherLawCodes.length - 1
      /*    if (lastIndex >= 0) {
            if (!checkValidFields(this.$refs['formModel'], [
              `otherLawCodes[${lastIndex}].maVb`
            ])) {
              return
            }
          }*/
      this.formModel.otherLawCodes.push(_.cloneDeep({
        'stt': null,
        'maVb': ''
      }))
    },

    deleteLegal(index) {
      this.formModel.otherLawCodes.splice(index, 1)
      // this.validateCacFieldVanBan(-1)
    },
    isAddLegalButtonDisabled() {
      if (!this.formModel.otherLawCodes || this.formModel.otherLawCodes.length === 0) {
        return false
      }
      return (
          this.formModel.otherLawCodes.length === 5 ||
          !this.formModel.otherLawCodes[this.formModel.otherLawCodes.length - 1].maVb
      )
    },

  },
  methods: {
    objReponsive,
 /*   handleClick(idx) {
      this.showTagArr.splice(idx, 1, false)
    },*/
    validateDuplicateSoGiayPhep(info, value, callback) {
      this.validateDuplicateGiayPhep(info, value, callback, 'permitLicenseNo')
    },
    validateDuplicateMaVb(info, value, callback) {
      this.validateDuplicateMa(info, value, callback, this.formModel.otherLawCodes, 'otherLawCodes', 'maVb', 'Mã văn bản pháp quy khác')
    },
    validateDuplicateGiayPhep(info, value, callback, propValue) {
      const lst = this.formModel.permits
      const checkArr = [...lst]
      const index = info.field.substring(info.field.indexOf('[') + 1, info.field.indexOf(']')) * 1
      _.pullAt(checkArr, index)
      if (_.size(checkArr) > 0) {
        const lstThue = cloneDeep(lst)
        const giayPhepMaCheck = lst[index].permitType
        const giayPhepSoCheck = lst[index].permitLicenseNo
        lstThue.splice(index, 1)
        const arrCheck = propValue === 'permitType' ? lstThue.filter(el => el.permitType === giayPhepMaCheck) : lstThue.filter(el => el.permitLicenseNo === giayPhepSoCheck)
        for (const ele of arrCheck) {
          if (ele.permitType === this.formModel.permits[index].permitType && ele.permitLicenseNo === this.formModel.permits[index].permitLicenseNo) {
            callback(new Error(`Phân loại giấy phép nhập khẩu/Giấy phép nhập khẩu [<${lst[index]?.permitType}>/<${lst[index]?.permitLicenseNo}>] bị trùng lặp`))
          }
        }
      }
      return callback()
    },
    validateDuplicatePhanLoai(info, value, callback) {
      this.validateDuplicateGiayPhep(info, value, callback, 'permitType')
    },
  /*  inputHopDongNgay(val) {
      if (!val) {
        setTimeout(() => {
          this.blurHopDongNgay()
        })
      }
    },
    inputHopDongSo(val) {
      if (!val) {
        setTimeout(() => {
          this.blurHopDongSo()
        })
      }
    },
    blurHopDongSo() {
      this.keyHdSo++
      setTimeout(() => {
        this.validateField('objTk.hopDongSo')
      })
    },
    blurHopDongNgay() {
      this.keyHdNgay++
      setTimeout(() => {
        this.validateField('objTk.hopDongNgay')
      })
    },*/
    validateField(fieldName) {
      let result
      this.$refs[this.formName].validateField(fieldName, valid => {
        result = valid // valid là mess
      })
      return result
    },
    deleteItemGiayPhepNhapKhau(index) {
      this.formModel.permits.splice(index, 1)
      // this.validateCacFieldGiayPhep(-1)
    },
    addNewItemGiayPhepNhapKhau() {
      if (this.formModel.permits.length === 0) {
        this.formModel.permits.push(_.cloneDeep({
          'permitType': '',
          'permitLicenseNo': '',
        }))
      } else {
        this.$refs.formModel.validate((valid) => {
          if (!valid) return false
          this.formModel.permits.push(_.cloneDeep({
            'permitType': '',
            'permitLicenseNo': '',
          }))
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
