<template>
  <div v-loading="loading">
    <el-dialog
        :title="titleDialogHangHoa"
        :visible.sync="dialogHangHoaVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
        top="5vh"
        :width="windowHeight <= 1366 ? (windowHeight <= 1200 ? '70%' : '60%') : '55%'"
    >
      <el-form
          label-position="top"
          label-width="100px"
          size="mini"
          ref="formThemMoiHangHoa"
          :model="formThemMoiHangHoa"
          :rules="rules"

      >
        <el-card class="box-card content-dialog-hanghoa" shadow="never">

          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" id="icon-collapse-icon">
            <rect width="26" height="26" rx="6" fill="#F4F9FF"></rect>
            <path d="M18 11L13 16L8 11" stroke="#1472E6" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"
            ></path>
          </symbol>

          <el-row :gutter="20">
            <el-col v-bind="objReponsive(12)">
              <el-form-item label="">
                <el-checkbox
                    v-model="tuDongTinh"
                    style="border: 1px solid #E8E8E8; border-radius: 5px;padding: 3px 6px;"
                >
                  Tự động tính Trị giá = SL * Đơn giá hoặc Đơn giá = Trị giá / SL
                </el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <custom-collapse title="Thông tin chung" default-open icon-class="collapse-icon">
            <el-row :gutter="20">
              <input-text
                  prop="commodityCode"
                  label="Mã hàng hóa (NPL, SP, TB, HM)"
                  :v-model.sync="formThemMoiHangHoa.commodityCode"
                  maxlength="50"
                  :number-gird-responsive="12"
              ></input-text>

              <input-select
                  label="Loại hàng hoá"
                  :v-model.sync="formThemMoiHangHoa.commodityType"
                  prop="commodityType"
                  :list-option-select="listHangHoa"
                  :number-gird-responsive="12"
              >
              </input-select>
            </el-row>

            <el-row :gutter="20">
              <input-text
                  prop="itemName"
                  label="Mô tả hàng hoá"
                  :v-model.sync="formThemMoiHangHoa.itemName"
                  maxlength="500"
                  type="textarea"
                  :number-gird-responsive="24"
              ></input-text>
            </el-row>

            <el-row :gutter="20">
              <input-text
                  prop="hsCode"
                  label="Mã số hàng hoá"
                  :v-model.sync="formThemMoiHangHoa.hsCode"
                  maxlength="12"
                  :number-gird-responsive="12"
              ></input-text>

              <input-select
                  label="Mã nước xuất xứ"
                  :v-model.sync="formThemMoiHangHoa.originCode"
                  prop="originCode"
                  :list-option-select="listNuocXuatXu"
                  :number-gird-responsive="12"
              >
              </input-select>
            </el-row>

            <el-row :gutter="20">
              <input-select
                  label="Mã ngoài hạn ngạch"
                  :v-model.sync="formThemMoiHangHoa.tariffQuotaClassification"
                  prop="tariffQuotaClassification"
                  :list-option-select="listNgoaiHanNgach"
                  :number-gird-responsive="12"
              >
              </input-select>

              <input-text
                  prop="materialCode"
                  label="Mã quản lý riêng"
                  :v-model.sync="formThemMoiHangHoa.materialCode"
                  maxlength="7"
                  :number-gird-responsive="12"
              ></input-text>
            </el-row>
          </custom-collapse>

          <h3>Thông tin thuế</h3>

          <custom-collapse title="Thông tin thuế" default-open icon-class="collapse-icon">
            <el-row :gutter="20">
              <input-select
                  label="Mã biểu thuế nhập khẩu"
                  :v-model.sync="formThemMoiHangHoa.importTaxClassificationCode"
                  prop="importTaxClassificationCode"
                  :list-option-select="listNgoaiHanNgach"
                  :number-gird-responsive="12"
              >
              </input-select>

              <input-select
                  label="Mã áp dụng mức thuế tuyệt đối"
                  :v-model.sync="formThemMoiHangHoa.perUnitTaxCode"
                  prop="perUnitTaxCode"
                  :list-option-select="listHq"
                  :number-gird-responsive="12"
              >
              </input-select>
            </el-row>

            <el-row :gutter="20">
              <input-text
                  prop="dutyRate"
                  label="Thuế suất"
                  :v-model.sync="formThemMoiHangHoa.dutyRate"
                  maxlength="21"
                  :number-gird-responsive="6"
              ></input-text>

              <input-text
                  prop="absoluteTariffRate"
                  label="Mức thuế tuyệt đối"
                  :v-model.sync="formThemMoiHangHoa.absoluteTariffRate"
                  maxlength="21"
                  :number-gird-responsive="6"
              ></input-text>


              <input-select
                  label="Đơn vị tính"
                  :disabled="!formThemMoiHangHoa.absoluteTariffRate"
                  :v-model.sync="formThemMoiHangHoa.unitAbsoluteDutyRate"
                  prop="unitAbsoluteDutyRate"
                  :list-option-select="listDvt"
                  :number-gird-responsive="6"
              >
              </input-select>

              <input-select
                  label="Đơn vị tiền tệ"
                  :disabled="!formThemMoiHangHoa.absoluteTariffRate"
                  :v-model.sync="formThemMoiHangHoa.currencyAbsoluteDutyRate"
                  prop="currencyAbsoluteDutyRate"
                  :list-option-select="listTienTe"
                  :number-gird-responsive="6"
              >
              </input-select>
            </el-row>
          </custom-collapse>

          <custom-collapse title="Số lượng" default-open icon-class="collapse-icon">
            <el-row :gutter="20"
                    style="margin: 10px;
                  padding: 15px;
                  background: #E2EFFF;
                  border-radius: 6px;"
            >

              <input-text
                  prop="quantity_1"
                  label="Số lượng (1)"
                  :v-model.number.sync="formThemMoiHangHoa.quantity_1"
                  maxlength="21"
                  :number-gird-responsive="5"
              ></input-text>

              <input-select
                  label="Đơn vị tính (1)"
                  :v-model.sync="formThemMoiHangHoa.quantityUnitCode_1"
                  prop="quantityUnitCode_1"
                  :list-option-select="listDvt"
                  :number-gird-responsive="6"
              >
              </input-select>

              <el-col :span="3">
                <div class="text-center">
                  <el-form-item label=" ">
                    <el-button
                        icon="el-icon-document-copy"
                        size="mini"
                        @click="onCopyQuantity1To2()"
                    >
                      Copy <i class="el-icon-arrow-right el-icon-right"></i>
                    </el-button>
                  </el-form-item>
                </div>
              </el-col>

              <input-text
                  prop="quantity_2"
                  label="Số lượng (2)"
                  :v-model.sync="formThemMoiHangHoa.quantity_2"
                  maxlength="21"
                  :number-gird-responsive="5"
              ></input-text>

              <input-select
                  label="Đơn vị tính (2)"
                  :v-model.sync="formThemMoiHangHoa.quantityUnitCode_2"
                  :disabled="!formThemMoiHangHoa.quantity_2"
                  prop="quantityUnitCode_2"
                  :list-option-select="listHq"
                  :number-gird-responsive="5"
              >
              </input-select>
            </el-row>
          </custom-collapse>

          <h3>Hóa đơn</h3>
          <custom-collapse title="Hóa đơn" default-open icon-class="collapse-icon">
            <el-row :gutter="20">
              <input-text
                  prop="invoiceValue"
                  label="Trị giá hóa đơn"
                  :v-model.sync="formThemMoiHangHoa.invoiceValue"
                  maxlength="21"
                  :number-gird-responsive="6"
                  @blur="onCalcDonGia"
              ></input-text>

              <input-text
                  prop="invoiceUnitPrice"
                  label="Đơn giá hóa đơn"
                  :v-model.sync="formThemMoiHangHoa.invoiceUnitPrice"
                  maxlength="21"
                  :number-gird-responsive="6"
                  @blur="onCalcTriGia"
              ></input-text>

              <input-select
                  label="Đơn vị tiền tệ"
                  :disabled="!formThemMoiHangHoa.invoiceUnitPrice"
                  :v-model.sync="formThemMoiHangHoa.unitPriceCurrencyCode"
                  prop="unitPriceCurrencyCode"
                  :list-option-select="listTienTe"
                  :number-gird-responsive="6"
              ></input-select>

              <input-select
                  label="Đơn vị tính"
                  :disabled="!formThemMoiHangHoa.invoiceUnitPrice"
                  :v-model.sync="formThemMoiHangHoa.unitPriceQuantity"
                  prop="unitPriceQuantity"
                  :list-option-select="listDvt"
                  :number-gird-responsive="6"
              ></input-select>
            </el-row>

            <el-row :gutter="20">
              <input-text
                  prop="taxValue"
                  label="Trị giá tính thuế"
                  :v-model.sync="formThemMoiHangHoa.taxValue"
                  maxlength="21"
                  :number-gird-responsive="6"
              ></input-text>

              <input-select
                  label="Đơn vị tiền tệ"
                  :disabled="!formThemMoiHangHoa.taxValue"
                  :v-model.sync="formThemMoiHangHoa.taxValueCurrencyCode"
                  prop="taxValueCurrencyCode"
                  :list-option-select="listDvt"
                  :number-gird-responsive="6"
              >
              </input-select>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="Số của mục khai khoản điều chỉnh">
                  <div>
                    <el-form
                        v-if="formThemMoiHangHoa.valuationNos && formThemMoiHangHoa.valuationNos.length > 0"
                        ref="valuationNos"
                        :model="formThemMoiHangHoa"
                        size="mini"
                        :rules="rules"
                    >
                      <div>
                        <div
                            v-for="(value, index) in formThemMoiHangHoa.valuationNos"
                            :key="index"
                            style="width: 30%; float: left; margin-right: 15px; min-width: 220px;"
                        >
                          <el-form-item :prop="'valuationNos[' + index + '].soDc'" style="margin-top: 1em">
                            <append-two-input
                                is-remove-star-second
                                :span-props="[0, 16, 5]"
                            >
                              <div slot="input">

                                <el-input
                                    prop="soDc"
                                    v-model="formThemMoiHangHoa.valuationNos[index].soDc"
                                    maxlength="1"
                                    placeholder="Số của mục khai khoản điều chỉnh"
                                    show-word-limit
                                    clearable
                                ></el-input>
                              </div>
                              <div slot="suffix">
                                <div class="custom-delete-button">
                                  <el-button
                                      size="mini"
                                      icon="el-icon-error"
                                      @click="delItem(formThemMoiHangHoa.valuationNos, index, validateKhoanDc)"
                                  />
                                </div>
                              </div>
                            </append-two-input>
                          </el-form-item>
                        </div>
                      </div>
                    </el-form>
                  </div>

                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <div>
                <el-button
                    type="primary"
                    plain
                    size="mini"
                    icon="el-icon-circle-plus-outline"
                    @click="addNewItem( formThemMoiHangHoa.valuationNos, DEFAULT_VALUE_KHOAN_DC, 'valuationNos')"
                >
                  <span>Thêm số mục</span>
                </el-button>
              </div>
            </el-row>
          </custom-collapse>

          <custom-collapse title="Danh mục hàng" default-open icon-class="collapse-icon">
            <el-row :gutter="20">
              <input-text
                  prop="lineNumberTentative"
                  label="STT của dòng hàng trên tờ khai TNTX tương ứng"
                  :v-model.sync="formThemMoiHangHoa.lineNumberTentative"
                  maxlength="2"
                  :number-gird-responsive="12"
              ></input-text>
            </el-row>

            <el-row :gutter="20">
              <input-text
                  prop="taxExemptionNo"
                  label="Số đăng ký danh mục miễn thuế NK"
                  :v-model.sync="formThemMoiHangHoa.taxExemptionNo"
                  maxlength="21"
                  :number-gird-responsive="12"
              ></input-text>

              <input-text
                  prop="lineNumberTaxExemption"
                  label="Số dòng tương ứng trong danh mục"
                  :v-model.sync="formThemMoiHangHoa.lineNumberTaxExemption"
                  :disabled="!(formThemMoiHangHoa.taxExemptionNo !== null && formThemMoiHangHoa.taxExemptionNo !== undefined && `${formThemMoiHangHoa.taxExemptionNo}`.length > 0)"
                  :number-gird-responsive="12"
              ></input-text>
            </el-row>

            <el-row :gutter="20">
              <input-select
                  label="Mã miễn/giảm/không chịu thuế NK"
                  :v-model.sync="formThemMoiHangHoa.exemptionImportTaxCode"
                  prop="exemptionImportTaxCode"
                  :list-option-select="listMienGiamMa"
                  :number-gird-responsive="12"
              >
              </input-select>
              <input-text
                  prop="reductionImportTaxAmount"
                  label="Số tiền giảm thuế nhập khẩu"
                  :v-model.sync="formThemMoiHangHoa.reductionImportTaxAmount"
                  :number-gird-responsive="12"
              ></input-text>
            </el-row>
          </custom-collapse>

          <custom-collapse title="Thuế và thu khác" default-open icon-class="collapse-icon">
            <div
                class="border-el-table"
            >
              <el-row :gutter="20" class="text-center table-header-edit">
                <el-col :span="2" style="word-break: break-word;">
                  STT
                </el-col>
                <el-col :span="7" style="word-break: break-word;">
                  Mã áp dụng thuế suất/Mức thuế
                </el-col>
                <el-col :span="7" style="word-break: break-word;">
                  Mã miễn/giảm/không chịu thuế
                </el-col>
                <el-col :span="7" style="word-break: break-word;">
                  Số tiền giảm thuế
                </el-col>
              </el-row>
            </div>

            <div
                v-if="!formThemMoiHangHoa.otherTaxs || formThemMoiHangHoa.otherTaxs.length === 0"
                class="el-table__empty-block"
                style="height: 100%; width: 100%;"
            >
              <span class="el-table__empty-text">Không có dữ liệu</span>
            </div>

            <el-form
                v-else
                ref="thueThuKhac"
                :model="formThemMoiHangHoa"
                :rules="rules"
                style="padding-top: 0px"
                size="mini"
                label-width="0px"
                label-position="top"

            >
              <el-row
                  v-for="(value, index) in formThemMoiHangHoa.otherTaxs"
                  :key="index"
                  :gutter="10"
                  class="border-bot"
                  style="padding: 15px 0 0 0; margin-top: 0px;"
              >
                <el-col :span="1" style="padding-top: 5px; text-align: center">
                  {{ index + 1 }}
                </el-col>

                <input-select
                    :v-model.sync="formThemMoiHangHoa.otherTaxs[index].typeCode"
                    :prop="'otherTaxs[' + index + '].typeCode'"
                    :list-option-select="listHq"
                    :number-gird-responsive="7"
                >
                </input-select>

                <input-select
                    :v-model.sync="formThemMoiHangHoa.otherTaxs[index].exemptionOtherCode"
                    :prop="'otherTaxs[' + index + '].exemptionOtherCode'"
                    :list-option-select="listHq"
                    :number-gird-responsive="7"
                >
                </input-select>

                <input-text
                    :prop="'otherTaxs[' + index + '].reductionOtherTaxAmount'"
                    :v-model.sync="formThemMoiHangHoa.otherTaxs[index].reductionOtherTaxAmount"
                    maxlength="21"
                    :number-gird-responsive="7"
                ></input-text>

                <el-col :span="2" class="text-center">
                  <el-tooltip :open-delay="400" content="Xóa" effect="light" placement="top">
                    <div class="custom-delete-button">
                      <el-button
                          size="mini"
                          icon="el-icon-error"
                          @click="delItem(formThemMoiHangHoa.otherTaxs, index, validateThueThuKhac)"
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
                  @click="addNewItem(formThemMoiHangHoa.otherTaxs, DEFAULT_VALUE_THUE_THU_KHAC, 'thueThuKhac', true)"
              >
                <span>Thêm thuế và thu khác</span>
              </el-button>
            </div>
          </custom-collapse>

          <custom-collapse title="Chứng từ chứng nhận xuất xứ C/O" default-open icon-class="collapse-icon">
            <el-row :gutter="20">
              <input-select
                  prop="certificateType"
                  label="Chế độ ưu đãi thuế (Loại C/O (Form A, D, E, AK))"
                  :v-model.sync="certificateType"
                  :list-option-select="listHq"
                  :number-gird-responsive="12"
                  @change="onChangeCoLoai"
              ></input-select>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="24">
                <div
                    v-for="(value, index) in formThemMoiHangHoa.certificateOfOrigins"
                    :key="index"
                >
                  <div class="custom-delete-button">
                    <el-button
                        v-show="formThemMoiHangHoa.certificateOfOrigins.length"
                        icon="el-icon-error"
                        style=" font-size: x-large; margin: -12px; padding-top: 0px; position: absolute; right: 1.4em;"
                        type="text"
                        @click="delItem(this, formThemMoiHangHoa.certificateOfOrigins, index, validateCo)"
                    >
                    </el-button>
                  </div>
                  <el-card shadow="never" style="width: 98%">
                    <el-row :gutter="20">
                      <input-text
                          :prop="'certificateOfOrigins[' + index + '].certNo'"
                          label="Số C/O"
                          :v-model.sync="formThemMoiHangHoa.certificateOfOrigins[index].certNo"
                          maxlength="50"
                          :number-gird-responsive="12"
                          @blur="validateCacField(formThemMoiHangHoa.certificateOfOrigins, index, validateCo)"
                          @input="validateCacField(formThemMoiHangHoa.certificateOfOrigins, index, validateCo)"
                      ></input-text>

                      <input-text
                          :prop="'certificateOfOrigins[' + index + '].certIssuer'"
                          label="Người cấp C/O"
                          :v-model.sync="formThemMoiHangHoa.certificateOfOrigins[index].certIssuer"
                          maxlength="50"
                          :number-gird-responsive="12"
                      ></input-text>

                      <input-text
                          :prop="'certificateOfOrigins[' + index + '].certLocation'"
                          label="Nơi cấp C/O"
                          :v-model.sync="value.certLocation"
                          maxlength="255"
                          type="textarea"
                          :number-gird-responsive="24"
                      ></input-text>

                      <el-col :span="12">
                      <el-form-item label="Ngày cấp C/O" :prop="'certificateOfOrigins[' + index + '].certDate'">
                        <el-date-picker
                            v-model="value.certDate"
                            placeholder="Ngày cấp C/O"
                            format="dd-MM-yyyy"
                            value-format="yyyy-MM-dd"
                            style="width: 100%"
                            type="date"
                            :clearable="false"
                        />
                      </el-form-item>
                      </el-col>


<!--                      <input-date
                          label="Ngày cấp C/O"
                          :prop="'certificateOfOrigins[' + index + '].certDate'"
                          v-model="value.certDate"
                          :number-gird-responsive="12"
                      >
                      </input-date>-->

                      <el-col :span="12">
                      <el-form-item label="Ngày hết hạn C/O" :prop="'certificateOfOrigins[' + index + '].certExpire'">
                        <el-date-picker
                            v-model="value.certExpire"
                            placeholder="Ngày hết hạn C/O"
                            format="dd-MM-yyyy"
                            value-format="yyyy-MM-dd"
                            style="width: 100%"
                            type="date"
                            :clearable="false"
                        />
                      </el-form-item>
                      </el-col>

<!--                      <input-date
                          label="Ngày hết hạn C/O"
                          v-model="value.certExpire"
                          :prop="'certificateOfOrigins[' + index + '].certExpire'"
                          :number-gird-responsive="12"
                      >
                      </input-date>-->
                    </el-row>
                  </el-card>
                  <div class="EmptyBox20"></div>
                </div>
              </el-col>
            </el-row>

            <div class="EmptyBox20"></div>
            <el-row class="text-left">
              <el-button
                  :disabled="isAddButtonDisabledCo"
                  size="mini"
                  type="primary"
                  plain
                  icon="el-icon-circle-plus-outline"
                  @click="addNewItemCo"
              >
                <span>Thêm chứng từ</span>
              </el-button>
            </el-row>
          </custom-collapse>


        </el-card>
        <div style="margin-top: 1.5em;text-align: center">
          <el-button icon="el-icon-close" size="small" @click="handleClose">Hủy bỏ</el-button>
          <el-button icon="el-icon-check" size="small" type="primary" @click="onAddItemHangHoa">Lưu</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {FORM_MODE, PATTERN, SUCCESS, windowHeight} from "@/untils/constant";
import {addNewItem, delItem, objReponsive, showAlert, showConfirm, validateField} from "@/untils/untils";
import {
  checkPropertyValueExists,
  decimalRule,
  notVnCharAndSpecial,
  numberRule,
  requiredRule,
  validateRegex
} from "@/untils/validate";
import {cloneDeep} from "lodash";
import CustomCollapse from "@/components/CustomCollapse/custom-collapse.vue";
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";
import appendTwoInput from "@/components/InputEtc/append-two-input.vue";
import inputDate from "@/components/InputEtc/input-date.vue";

const FORM_DEFAULT = {
  commodityCode: '',
  commodityType: '',
  itemName: '',
  hsCode: '',
  originCode: '',
  tariffQuotaClassification: '',
  materialCode: '',
  importTaxClassificationCode: '',
  perUnitTaxCode: '',
  dutyRate: '',
  absoluteTariffRate: '',
  unitAbsoluteDutyRate: '',
  currencyAbsoluteDutyRate: '',
  quantity_1: '',
  quantityUnitCode_1: '',
  quantity_2: '',
  quantityUnitCode_2: '',
  invoiceValue: '',
  invoiceUnitPrice: '',
  unitPriceCurrencyCode: '',
  unitPriceQuantity: '',
  taxValue: '',
  taxValueCurrencyCode: '',
  valuationNos: [],
  lineNumberTentative: '',
  taxExemptionNo: '',
  lineNumberTaxExemption: '',
  exemptionImportTaxCode: '',
  reductionImportTaxAmount: '',
  otherTaxs: [],
  certificateOfOrigins: [],
  certificateType: ''
}

const DEFAULT_VALUE_KHOAN_DC = {
  'sttHang': null,
  'stt': null,
  'soDc': null
}

const DEFAULT_VALUE_THUE_THU_KHAC = {
  'sttHang': null,
  'sttThue': null,
  'thue': null,
  'thueDvtTt': '',
  'reductionImportTaxAmount': null,
  'importTaxClassificationCode': '',
  'thueMaNtTt': '',
  'thueMien': null,
  'thueMienGiamDieuKhoan': '',
  'exemptionImportTaxCode': '',
  'thueMienGiamMaNt': '',
  'typeCode': '',
  'thuePlMienGiam': '',
  'thuePlTs': '',
  'thueSoLuongTt': null,
  'thueTriGiaTt': null,
  'thueTs': null,
  'thueTsKhac': '',
  'thueTsTuyetDoi': null,
  'thueTsVnaccs': '',
  'tsMaNt': ''
}

const DEFAULT_VALUE_CO = {
  'stt': null,
  'sttHang': null,
  'coIsNo': 0,
  'certificateType': '',
  'coMaNuocNk': '',
  'coMaNuocXk': '',
  'coMoTaHangHoa': '',
  'certDate': new Date(),
  'certExpire': new Date(),
  'certIssuer': '',
  'coNguoiNk': '',
  'coNguoiXk': '',
  'coNuocCap': '',
  'certNo': '',
  'certLocation': ''
}
export default {
  name: "dialog-them-moi-hang-hoa",
  components: {
    CustomCollapse,
    inputText,
    inputSelect,
    appendTwoInput,
    inputDate
  },
  props: {
    mode: {
      type: FORM_MODE,
      default: FORM_MODE.CREATE
    },
    isShowDialog: {
      type: Boolean,
      default: false
    },
    formProp: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      windowHeight: windowHeight,
      certificateType: '',
      tuDongTinh: false,
      formThemMoiHangHoa: cloneDeep(FORM_DEFAULT),
      rules: {
        quantityUnitCode_1: [requiredRule('Đơn vị tính')],
        quantityUnitCode_2: [],
        commodityCode: [notVnCharAndSpecial('Mã hàng hóa (NPL, SP, TB, HM)')],
        commodityType: [],
        itemName: [requiredRule('Mô tả hàng hóa')],
        hsCode: [requiredRule('Mã số hàng hóa'), numberRule('Mã số hàng hóa')],
        materialCode: [notVnCharAndSpecial('Mã quản lý riêng')],
        originCode: [requiredRule('Mã nước xuất xứ')],
        dutyRate: [decimalRule('Thuế suất')],
        absoluteTariffRate: [decimalRule('Mức thuế tuyệt đối')],
        unitAbsoluteDutyRate: [],
        currencyAbsoluteDutyRate: [],
        quantity_1: [requiredRule('Số lượng (1)'), decimalRule('Số lượng (1)')],
        quantity_2: [decimalRule('Số lượng (2)')],
        invoiceValue: [decimalRule('Trị giá hóa đơn')],
        invoiceUnitPrice: [decimalRule('Đơn giá hóa đơn')],
        taxValue: [decimalRule('Trị giá tính thuế')],
        valuationNos: [
          {
            soDc: [requiredRule('Số của mục khai khoản điều chỉnh'), {
              validator: this.validateDuplicateMaSoDc,
              trigger: ['blur', 'change']
            }, numberRule('Số của mục khai khoản điều chỉnh')]
          },
          {
            soDc: [requiredRule('Số của mục khai khoản điều chỉnh'), {
              validator: this.validateDuplicateMaSoDc,
              trigger: ['blur', 'change']
            }, numberRule('Số của mục khai khoản điều chỉnh')]
          },
          {
            soDc: [requiredRule('Số của mục khai khoản điều chỉnh'), {
              validator: this.validateDuplicateMaSoDc,
              trigger: ['blur', 'change']
            }, numberRule('Số của mục khai khoản điều chỉnh')]
          },
          {
            soDc: [requiredRule('Số của mục khai khoản điều chỉnh'), {
              validator: this.validateDuplicateMaSoDc,
              trigger: ['blur', 'change']
            }, numberRule('Số của mục khai khoản điều chỉnh')]
          },
          {
            soDc: [requiredRule('Số của mục khai khoản điều chỉnh'), {
              validator: this.validateDuplicateMaSoDc,
              trigger: ['blur', 'change']
            }, numberRule('Số của mục khai khoản điều chỉnh')]
          }
        ],
        lineNumberTentative: [numberRule('STT của dòng hàng trên tờ khai TNTX tương ứng')],
        taxExemptionNo: [notVnCharAndSpecial('Số đăng ký danh mục miễn thuế NK')],
        lineNumberTaxExemption: [numberRule('Số dòng tương ứng trong danh mục')],
        reductionImportTaxAmount: [decimalRule('Số tiền giảm thuế nhập khẩu')],
        otherTaxs: [
          {
            typeCode: [requiredRule('Mã áp dụng thuế suất/Mức thuế'), {
              validator: this.validateDuplicateThueMst,
              trigger: ['blur', 'change']
            }],
            exemptionImportTaxCode: [{
              validator: this.validateDuplicateThueMienGiamMa,
              trigger: ['blur', 'change']
            }],
            reductionImportTaxAmount: [decimalRule('Số tiền giảm thuế')]
          },
          {
            typeCode: [requiredRule('Mã áp dụng thuế suất/Mức thuế'), {
              validator: this.validateDuplicateThueMst,
              trigger: ['blur', 'change']
            }],
            exemptionImportTaxCode: [{
              validator: this.validateDuplicateThueMienGiamMa,
              trigger: ['blur', 'change']
            }],
            reductionImportTaxAmount: [decimalRule('Số tiền giảm thuế')]
          },
          {
            typeCode: [requiredRule('Mã áp dụng thuế suất/Mức thuế'), {
              validator: this.validateDuplicateThueMst,
              trigger: ['blur', 'change']
            }],
            exemptionImportTaxCode: [{
              validator: this.validateDuplicateThueMienGiamMa,
              trigger: ['blur', 'change']
            }],
            reductionImportTaxAmount: [decimalRule('Số tiền giảm thuế')]
          },
          {
            typeCode: [requiredRule('Mã áp dụng thuế suất/Mức thuế'), {
              validator: this.validateDuplicateThueMst,
              trigger: ['blur', 'change']
            }],
            exemptionImportTaxCode: [{
              validator: this.validateDuplicateThueMienGiamMa,
              trigger: ['blur', 'change']
            }],
            reductionImportTaxAmount: [decimalRule('Số tiền giảm thuế')]
          },
          {
            typeCode: [requiredRule('Mã áp dụng thuế suất/Mức thuế'), {
              validator: this.validateDuplicateThueMst,
              trigger: ['blur', 'change']
            }],
            exemptionImportTaxCode: [{
              validator: this.validateDuplicateThueMienGiamMa,
              trigger: ['blur', 'change']
            }],
            reductionImportTaxAmount: [decimalRule('Số tiền giảm thuế')]
          }
        ],
        certNo: [requiredRule('Số C/O'), {
          validator: this.validateDuplicateSoCo,
          trigger: ['blur', 'change']
        }, validateRegex(PATTERN.NAME_NON_VIETNAMESE_WITH_SPECIAL, 'Số C/O')],
        certIssuer: [requiredRule('Người cấp C/O')],
        certLocation: [requiredRule('Nơi cấp C/O')],
        certDate: [requiredRule('Ngày cấp C/O'), {
          validator: this.validateNgayCo,
          trigger: ['change', 'blur']
        }],
        certExpire: [requiredRule('Ngày hết hạn C/O'), {
          validator: this.validateNgayHhCo,
          trigger: ['change', 'blur']
        }]
      },
      loading: false,
      listMienGiamMa: [
        {id: 'Hàng hóa', value: 'XN190'},
        {id: 'San Marino', value: 'XN103'},
      ],
      listHangHoa: [
        {id: 'NPL', value: '1'},
        {id: 'SP', value: '2'}
      ],
      listNuocXuatXu: [
        {id: 'Sierra', value: 'SL'},
        {id: 'San Marino', value: 'SM'},
        {id: 'Senegal', value: 'SN'},
        {id: 'Somalia', value: 'SO'}
      ],
      listNgoaiHanNgach: [
        {id: 'Biểu thuế nhập khẩu ưu đãi', value: 'B01'},
        {id: 'Chương 98 (1) - Biểu thuế nhập khẩu ưu đãi', value: 'B02'},
      ],
      listHq: [
        {value: 'Chi cục Hải quan Hậu Giang', id: '54CE'},
        {value: 'Chi cục Cảnh Chân Trâu', id: '88ZZ'},
      ],
      listDvt: [
        {id: 'Số', value: 'SO'},
        {id: 'VNĐ', value: 'VND'},
      ],
      listTienTe: [
        {id: 'Bảng anh', value: 'BA'},
        {id: 'Rúp Nga', value: 'RUB'},
      ],
      DEFAULT_VALUE_KHOAN_DC,
      DEFAULT_VALUE_THUE_THU_KHAC,
      DEFAULT_VALUE_CO
    }
  },
  watch: {
    'formThemMoiHangHoa.absoluteTariffRate': {
      // immediate: true,
      handler: function (val) {
        if (val !== null &&
            val !== undefined &&
            `${val}`.length > 0) {
          this.rules.unitAbsoluteDutyRate = [requiredRule('Đơn vị tính')]
          this.rules.currencyAbsoluteDutyRate = [requiredRule('Đơn vị tiền tệ')]
        } else {
          this.formThemMoiHangHoa.unitAbsoluteDutyRate = ''
          this.formThemMoiHangHoa.currencyAbsoluteDutyRate = ''
          this.rules.unitAbsoluteDutyRate = []
          this.$refs['formThemMoiHangHoa']?.clearValidate('unitAbsoluteDutyRate')
          this.rules.currencyAbsoluteDutyRate = []
          this.$refs['formThemMoiHangHoa']?.clearValidate('currencyAbsoluteDutyRate')
        }
      }
    },
    'formThemMoiHangHoa.invoiceUnitPrice': {
      immediate: true,
      handler: function (val) {
        if (val !== null &&
            val !== undefined &&
            `${val}`.length > 0) {
          this.rules.unitPriceQuantity = [requiredRule('Đơn vị tiền tệ')]
          this.rules.unitPriceCurrencyCode = [requiredRule('Đơn vị tính')]
        } else {
          this.formThemMoiHangHoa.unitPriceQuantity = ''
          this.formThemMoiHangHoa.unitPriceCurrencyCode = ''
          this.rules.unitPriceQuantity = []
          this.$refs['formThemMoiHangHoa']?.clearValidate('unitPriceQuantity')
          this.rules.unitPriceCurrencyCode = []
          this.$refs['formThemMoiHangHoa']?.clearValidate('unitPriceCurrencyCode')
        }
      }
    },
    'formThemMoiHangHoa.taxValue': {
      immediate: true,
      handler: function (val) {
        if (val !== null &&
            val !== undefined &&
            `${val}`.length > 0) {
          this.rules.taxValueCurrencyCode = [requiredRule('Mã tiền tệ')]
        } else {
          this.formThemMoiHangHoa.taxValueCurrencyCode = ''
          this.rules.taxValueCurrencyCode = []
          this.$refs['formThemMoiHangHoa']?.clearValidate('taxValueCurrencyCode')
        }
      }
    },
    mode: {
      handler(val) {
        if (val === FORM_MODE.CREATE) {
          this.formThemMoiHangHoa = cloneDeep(FORM_DEFAULT)
        } else {
          try {
            this.loading = true;
            new Promise((resolve, reject) => {
              resolve(this.formThemMoiHangHoa = cloneDeep(this.formProp));
            })
          } catch (e) {
            console.log('e', e)
          } finally {
            this.loading = false
          }
        }
      },
      immediate: true,
    }
  },
  computed: {
    titleDialogHangHoa() {
      let title = '';
      if (this.mode === FORM_MODE.CREATE || this.mode === FORM_MODE.DEFAULT) {
        title = 'Thêm mới'
      } else if (this.mode === FORM_MODE.EDIT) {
        title = 'Sửa'
      }
      return `${title} hàng hóa`
    },
    dialogHangHoaVisible: {
      get() {
        return this.isShowDialog
      },
      set(val) {
        this.$emit('update: isShowDialog', val)
      }
    },
    isAddButtonDisabledCo() {
      if (!this.certificateType) return true
      if (
          !this.formThemMoiHangHoa.certificateOfOrigins ||
          this.formThemMoiHangHoa.certificateOfOrigins.length === 0
      ) {
        return false
      }
      const lastIndex = this.formThemMoiHangHoa.certificateOfOrigins.length - 1
      return (
          !this.formThemMoiHangHoa.certificateOfOrigins[lastIndex].certNo ||
          !this.formThemMoiHangHoa.certificateOfOrigins[lastIndex].certExpire ||
          !this.formThemMoiHangHoa.certificateOfOrigins[lastIndex].certDate ||
          !this.formThemMoiHangHoa.certificateOfOrigins[lastIndex].certLocation ||
          !this.formThemMoiHangHoa.certificateOfOrigins[lastIndex].certIssuer
      )
    },
  },
  methods: {
    addNewItem,
    delItem,
    onCalcDonGia() {
      if (this.tuDongTinh && this.formThemMoiHangHoa.quantity_1 && !isNaN(this.formThemMoiHangHoa.invoiceValue) && !isNaN(this.formThemMoiHangHoa.quantity_1)) {
        if (Number(this.formThemMoiHangHoa.quantity_1) === 0) return
        const invoiceUnitPrice = this.formThemMoiHangHoa.invoiceValue / this.formThemMoiHangHoa.quantity_1
        if (invoiceUnitPrice.toString().indexOf('.') !== -1 && invoiceUnitPrice.toString().length - invoiceUnitPrice.toString().indexOf('.') > 4) {
          this.formThemMoiHangHoa.invoiceUnitPrice = `${invoiceUnitPrice.toFixed(4)}`
          if (this.formThemMoiHangHoa.invoiceUnitPrice === '0.0000') this.formThemMoiHangHoa.invoiceUnitPrice = '0'
        } else {
          this.formThemMoiHangHoa.invoiceUnitPrice = `${invoiceUnitPrice}`
        }
        this.$forceUpdate()
      }
    },

    onCalcTriGia() {
      if (this.tuDongTinh && this.formThemMoiHangHoa.quantity_1 && !isNaN(this.formThemMoiHangHoa.quantity_1) && !isNaN(this.formThemMoiHangHoa.invoiceUnitPrice)) {
        if (Number(this.formThemMoiHangHoa.quantity_1) === 0) return
        const invoiceValue = this.formThemMoiHangHoa.invoiceUnitPrice * this.formThemMoiHangHoa.quantity_1
        if (invoiceValue.toString().indexOf('.') !== -1 && invoiceValue.toString().length - invoiceValue.toString().indexOf('.') > 4) {
          this.formThemMoiHangHoa.invoiceValue = `${invoiceValue.toFixed(4)}`
        } else {
          this.formThemMoiHangHoa.invoiceValue = `${invoiceValue}`
        }
        this.$forceUpdate()
      }
    },

    onCopyQuantity1To2() {
      if (this.formThemMoiHangHoa.quantity_1) {
        this.formThemMoiHangHoa.quantity_2 = this.formThemMoiHangHoa.quantity_1
      }
      if (this.formThemMoiHangHoa.quantityUnitCode_1) {
        this.formThemMoiHangHoa.quantityUnitCode_2 = this.formThemMoiHangHoa.quantityUnitCode_1
      }
    },

    objReponsive,

    handleClose(done) {
      showConfirm(this, 'Tất cả thông tin đã điền sẽ không được lưu. Tiếp tục?', () => {
        this.isShowDialog = false
      })
    },

    onAddItemHangHoa() {
      let valid = true
      let valid1 = true
      let valid2 = true
      this.$refs['formThemMoiHangHoa'].validate(isValid => {
        valid = isValid
      })
      this.$refs.thueThuKhac?.validate(isValid => {
        valid1 = isValid
      })
      this.$refs.valuationNos?.validate(isValid => {
        valid2 = isValid
      })
      if (!valid || !valid1 || !valid2) {
        this.$message({
          type: 'error',
          showClose: true,
          message: 'Thông tin hàng hoá chưa đầy đủ'
        })
        return
      }
      this.$emit('update-danh-sach-hang', this.formThemMoiHangHoa)
      showAlert(this, SUCCESS, 'Thêm mới thông tin hàng hóa thành công')
      this.isShowDialog = false
    },

    validateDuplicateMaSoDc(info, value, callback) {
      this.validateDuplicateMa(info, value, callback, this.formThemMoiHangHoa.valuationNos, 'valuationNos', 'soDc', 'Số của mục khai khoản điều chỉnh', this.$refs.valuationNos, 19)
    },

    validateDuplicateThueMienGiamMa(info, value, callback) {
      this.validateDuplicateMaSt(info, value, callback, 'exemptionImportTaxCode')
    },

    validateDuplicateSoCo(info, value, callback) {
      this.validateDuplicateMa(info, value, callback, this.formThemMoiHangHoa.certificateOfOrigins, 'certificateOfOrigins', 'certNo', 'Số C/O')
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
          // this.$refs.valuationNos.clearValidate(`${labelArr}[${index}].${propField}`)
        }
      }
      return callback()
    },

    validateDuplicateMaSt(info, value, callback, propValue) {
      const lst = this.formThemMoiHangHoa.otherTaxs
      const checkArr = [...lst]
      const index = info.field.substring(info.field.indexOf('[') + 1, info.field.indexOf(']')) * 1
      _.pullAt(checkArr, index)
      if (_.size(checkArr) > 0) {
        const lstThue = cloneDeep(lst)
        const thueMstCheck = lst[index].typeCode
        const thueMienGiamMaCheck = lst[index].exemptionImportTaxCode
        lstThue.splice(index, 1)
        const arrCheck = propValue === 'typeCode' ? lstThue.filter(el => el.typeCode === thueMstCheck) : lstThue.filter(el => el.exemptionImportTaxCode === thueMienGiamMaCheck)
        for (const ele of arrCheck) {
          if (ele.typeCode === this.formThemMoiHangHoa.otherTaxs[index].typeCode && ele.exemptionImportTaxCode === this.formThemMoiHangHoa.otherTaxs[index].exemptionImportTaxCode) {
            callback(new Error(`Mã áp dụng thuế suất/Mức thuế/Mã miễn/giảm/không chịu thuế [<${lst[index]?.typeCode}>/<${lst[index]?.exemptionImportTaxCode}>] bị trùng lặp`))
          } else {
            // this.$refs.otherTaxs.clearValidate(`otherTaxs[${index}].typeCode`)
            // this.$refs.otherTaxs.clearValidate(`otherTaxs[${index}].exemptionImportTaxCode`)
          }
        }
      }
      return callback()
    },

    validateKhoanDc(i) {
      if (this.formThemMoiHangHoa.valuationNos[i].soDc) validateField(this,'formThemMoiHangHoa', 'valuationNos[' + i + '].soDc')
    },

    validateThueThuKhac(i) {
      if (this.formThemMoiHangHoa.otherTaxs[i].typeCode) this.$refs.thueThuKhac.validateField('otherTaxs[' + i + '].typeCode')
      if (this.formThemMoiHangHoa.otherTaxs[i].exemptionImportTaxCode) this.$refs.thueThuKhac.validateField('otherTaxs[' + i + '].exemptionImportTaxCode')
    },

    validateCo(i) {
      if (this.formThemMoiHangHoa.certificateOfOrigins[i].certNo) this.validateField('formThemMoiHangHoa', 'certificateOfOrigins[' + i + '].certNo')
    },

    validateCacField(listItem, idx, handleValidate) {
      for (let i = 0; i < listItem.length; i++) {
        if (i !== idx) {
          handleValidate();
        }
      }
    },

    onChangeCoLoai() {
      if (!this.certificateType) {
        this.formThemMoiHangHoa.certificateOfOrigins = []
      }
      if (!!this.certificateType && this.formThemMoiHangHoa.certificateOfOrigins.length < 1) {
        this.addNewItemCo()
      }
      this.formThemMoiHangHoa.certificateOfOrigins.forEach(s => {
        s.certificateType = this.certificateType
      })
    },

    addNewItemCo() {
      const lastIndex = this.formThemMoiHangHoa.certificateOfOrigins.length - 1
      if (lastIndex >= 0) {
        if (!this.checkValidFields(this.$refs['formThemMoiHangHoa'], [
          `certificateOfOrigins[${lastIndex}].certNo`,
          `certificateOfOrigins[${lastIndex}].certIssuer`,
          `certificateOfOrigins[${lastIndex}].certLocation`,
          `certificateOfOrigins[${lastIndex}].certDate`,
          `certificateOfOrigins[${lastIndex}].certExpire`
        ])) {
          return
        }
      }
      const itemCo = _.cloneDeep(DEFAULT_VALUE_CO)
      itemCo.certificateType = this.certificateType
      this.formThemMoiHangHoa.certificateOfOrigins.push(itemCo)
    },
  }
}
</script>

<style scoped>

::v-deep .custom-delete-button .el-icon-error {
  color: red;
  margin: -1px;
  padding: 0;
}

::v-deep .custom-delete-button .el-button--mini .el-button--mini.is-round {
  padding: 4px 8px;
}

</style>
