<template>
  <el-form :label-position="'top'" label-width="100px" :model="formModel" size="mini"
           :rules="rulesformModel" ref="formModel"
  >
    <custom-collapse title="Danh sách vận đơn" default-open icon-class="collapse-icon">
      <div
          class="border-el-table"
          style="vertical-align: middle"
      >
        <el-row :gutter="20" class="text-center table-header-edit">
          <el-col :span="1" style="word-break: break-word;">
            STT
          </el-col>
          <el-col :span="3" style="word-break: break-word;">
            Số vận đơn
          </el-col>
          <el-col :span="3" style="word-break: break-word;">
            Ngày vận đơn
          </el-col>
          <el-col :span="3" style="word-break: break-word;">
            Số định danh
          </el-col>
          <el-col :span="3" style="word-break: break-word;">
            Số lượng kiện
          </el-col>
          <el-col :span="3" style="word-break: break-word;">
            Đơn vị tính số lượng kiện
          </el-col>
          <el-col :span="3" style="word-break: break-word;">
            Tổng trọng lượng
          </el-col>
          <el-col :span="3" style="word-break: break-word;">
            Đơn vị tính tổng trọng lượng
          </el-col>
        </el-row>
      </div>

      <div
          v-if="!formModel.cargoNos || formModel.cargoNos.length === 0"
          class="el-table__empty-block"
          style="height: 100%; width: 100%;"
      >
        <span class="el-table__empty-text">Không có dữ liệu</span>
      </div>
      <el-form
          v-else
          ref="formModel"
          :model="formModel"
          :rules="rulesformModel"
          style="padding-top: 0px"
          size="mini"
          label-width="0px"
          label-position="top"

      >
        <el-row
            v-for="(value, index) in formModel.cargoNos"
            :key="index"
            :gutter="10"
            class="border-bot"
            style="padding: 15px 0 0 0; margin-top: 0px;"
        >

          <el-col :span="1" style="padding-top: 5px">
            {{ index + 1 }}
          </el-col>

          <input-text
              :prop="'cargoNos[' + index + '].billNo'"
              :v-model.sync="formModel.cargoNos[index].billNo"
              maxlength="35"
              :number-gird-responsive="3"
          ></input-text>

          <el-col :span="3">
            <el-form-item :prop="'cargoNos[' + index + '].billDate'">
              <el-date-picker
                  v-model="value.billDate"
                  format="dd-MM-yyyy"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  type="date"
                  :clearable="false"
              />
            </el-form-item>
          </el-col>

          <input-text
              :prop="'cargoNos[' + index + '].cargoCtrlNo'"
              :v-model.sync="formModel.cargoNos[index].cargoCtrlNo"
              maxlength="50"
              :number-gird-responsive="3"
          ></input-text>

          <input-text
              :prop="'cargoNos[' + index + '].cargoPiece'"
              :v-model.sync="formModel.cargoNos[index].cargoPiece"
              maxlength="8"
              :number-gird-responsive="3"
          ></input-text>


          <input-select
              :prop="'cargoNos[' + index + '].pieceUnitCode'"
              :v-model.sync="formModel.cargoNos[index].pieceUnitCode"
              :list-option-select="listHq"
              :number-gird-responsive="3"
          >
          </input-select>

          <input-text
              :prop="'cargoNos[' + index + '].cargoWeightGross'"
              :v-model.sync="formModel.cargoNos[index].cargoWeightGross"
              maxlength="8"
              :number-gird-responsive="3"
          ></input-text>

          <input-select
              :prop="'cargoNos[' + index + '].weightUnitCode'"
              :v-model.sync="formModel.cargoNos[index].weightUnitCode"
              :list-option-select="listHq"
              :number-gird-responsive="3"
          >
          </input-select>
          <el-col :span="2" class="text-center">
            <el-tooltip :open-delay="400" content="Xóa" effect="light" placement="top">
              <div class="custom-delete-button" style="font-size: medium">
                <el-button
                    size="mini"
                    icon="el-icon-error"
                    @click="delItem(formModel.cargoNos, index, validateVanDon)"
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
            @click="addNewItem(formModel.cargoNos, DEFAULT_VALUE_CO, 'formModel', true)"
        >
          <span>Thêm số vận đơn</span>
        </el-button>
      </div>
    </custom-collapse>

    <custom-collapse title="Thông tin hàng" default-open icon-class="collapse-icon">
      <el-row :gutter="20">
        <el-col v-bind="objReponsive(8)">
          <append-two-input
              is-remove-star-second
              :span-props = "[0, 12, 12]"
          >
            <div slot="input">
              <input-text
                  prop="totalCargoPiece"
                  :v-model.sync="formModel.totalCargoPiece"
                  maxlength="8"
                  label="Số lượng"
              ></input-text>
            </div>
            <div slot="suffix">
              <input-select
                  label=" "
                  :v-model.sync="formModel.totalPieceUnitCode"
                  prop="totalPieceUnitCode"
                  :list-option-select="listDvt"
              ></input-select>
            </div>
          </append-two-input>
        </el-col>

        <el-col v-bind="objReponsive(8)">
          <append-two-input
              is-remove-star-second
              :span-props = "[0, 12, 12]"
          >
            <div slot="input">
              <input-text
                  prop="totalWeightGross"
                  :v-model.sync="formModel.totalWeightGross"
                  maxlength="21"
                  label="Tổng trọng lượng hàng (Gross)"
              ></input-text>

            </div>
            <div slot="suffix">
              <input-select
                  label=" "
                  :v-model.sync="formModel.totalWeightUnitCode"
                  prop="totalWeightUnitCode"
                  :list-option-select="listDvt"
              ></input-select>
            </div>

          </append-two-input>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <input-text
            prop="loadingVesselCode"
            label="Mã phương tiện vận chuyển"
            :v-model.sync="formModel.loadingVesselCode"
            maxlength="9"
            :number-gird-responsive="8"
        ></input-text>

        <input-text
            prop="loadingVesselName"
            label="Tên phương tiện vận chuyển"
            :v-model.sync="formModel.loadingVesselName"
            maxlength="200"
            type="textarea"
            :number-gird-responsive="16"
        ></input-text>
      </el-row>

      <el-row :gutter="20">
        <input-text
            prop="marksNumbers"
            label="Ký hiệu số và số hiệu bao bì"
            :v-model.sync="formModel.marksNumbers"
            type="textarea"
            maxlength="140"
            :number-gird-responsive="16"
        ></input-text>
      </el-row>

      <el-row :gutter="20">

        <el-col v-bind="objReponsive(8)" >
          <el-form-item label="Ngày hàng đến" prop="arrivalDate">
            <el-date-picker
                v-model="formModel.arrivalDate"
                placeholder="Ngày hàng đến"
                format="dd-MM-yyyy"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                type="date"
                :clearable="false"
            />
          </el-form-item>
        </el-col>

        <input-select
            is-remote-search
            prop="customsWarehouseCode"
            label="Địa điểm lưu kho chờ thông quan"
            :v-model.sync="formModel.customsWarehouseCode"
            :list-option-select="listHq"
            :number-gird-responsive="8"
        ></input-select>
      </el-row>

      <el-row :gutter="20">
        <input-select
            prop="unloadingPortCode"
            label="Địa điểm dỡ hàng"
            :v-model.sync="formModel.unloadingPortCode"
            :list-option-select="listHq"
            :number-gird-responsive="8"
        ></input-select>

        <input-select
            prop="unloadingPortName"
            label="Địa điểm dỡ hàng"
            :disabled="!formModel.unloadingPortCode"
            :v-model.sync="formModel.unloadingPortName"
            :list-option-select="listHq"
            :number-gird-responsive="8"
        ></input-select>
      </el-row>

      <el-row :gutter="20">
        <input-select
            prop="loadingPortCode"
            label="Địa điểm xếp hàng"
            :v-model.sync="formModel.loadingPortCode"
            :list-option-select="listHq"
            :number-gird-responsive="8"
        ></input-select>

        <input-select
            prop="loadingPortName"
            label="Địa điểm xếp hàng"
            :disabled="!formModel.loadingPortCode"
            :v-model.sync="formModel.loadingPortName"
            :list-option-select="listHq"
            :number-gird-responsive="8"
        ></input-select>
      </el-row>

      <el-row :gutter="20">
        <input-select
            label="Mã kết quả kiểm tra nội dung"
            :v-model.sync="formModel.resultInspectionCode"
            prop="resultInspectionCode"
            :list-option-select="listHq"
            :number-gird-responsive="8"
        >
        </input-select>

        <input-text
            prop="numberContainers"
            label="Số lượng container"
            :v-model.sync="formModel.numberContainers"
            maxlength="3"
            :number-gird-responsive="8"
        ></input-text>
      </el-row>
    </custom-collapse>
  </el-form>
</template>

<script>

import CustomCollapse from "@/components/CustomCollapse/custom-collapse.vue";
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";
import inputDate from "@/components/InputEtc/input-date.vue";
import appendTwoInput from "@/components/InputEtc/append-two-input.vue";
import {PATTERN} from "@/untils/constant";
import {decimalRule, nonViAllowSpecialRules, numberRule, requiredRule, validateRegex} from "@/untils/validate";
import {addNewItem, delItem, objReponsive} from "@/untils/untils";
import moment from "moment";

const REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL = /^[`A-Z\d~!@#$%^&*()_|+\-=?;:'"ºÞÛ»½¾¿¼Ü<>{}\[\]\\\/., \n]+$/

const DEFAULT_VALUE_CO = {
  'stt': null,
  'billNo': null,
  'billDate': new Date(),
  'cargoCtrlNo': '',
  'cargoPiece': '',
  'pieceUnitCode': '',
  'cargoWeightGross': '',
  'weightUnitCode':'',
}
export default {
  name: "step-van-don",
  methods: {
    objReponsive,
    delItem,
    addNewItem,
    validateVanDon(i) {
      if (this.formModel.cargoNos[i].billNo) this.validateField('formModel', 'cargoNos[' + i + '].billNo')
    },
    validateDuplicateVanDonSo(info, value, callback) {
      this.validateDuplicateMa(info, value, callback, this.formModel.cargoNos, 'cargoNos', 'billNo', 'Số vận đơn')
    },
    validateNgayHangDen(_info, value, callback) {
      if (value) {
        const diff = moment(value).startOf('day').diff(moment(new Date()).startOf('day'))
        if ((diff < 0)) {
          return callback(new Error(`Ngày hàng đến không được nhập ${'nhỏ hơn'} ${'Ngày hiện tại'}`))
        }
        return callback()
      }
      callback()
    },
  },
  components: {
    CustomCollapse,
    inputText,
    inputSelect,
    appendTwoInput,
    inputDate
  },
  data() {
    return {
      formModel: {
        cargoNos: [],
        totalCargoPiece: undefined,
        totalPieceUnitCode: undefined,
        totalWeightGross: undefined,
        totalWeightUnitCode: undefined,
        loadingVesselCode: undefined,
        loadingVesselName: undefined,
        marksNumbers: undefined,
        arrivalDate: undefined,
        customsWarehouseCode: undefined,
        unloadingPortCode: undefined,
        unloadingPortName: undefined,
        loadingPortCode: undefined,
        loadingPortName: undefined,
        resultInspectionCode: undefined,
        numberContainers: undefined,
      },
      rulesformModel: {
        cargoNos: {
          billNo: [requiredRule('Số vận đơn'), validateRegex(PATTERN.REGEX_NOT_TV_SPECIAL_EXCEPT_DASH, 'Số vận đơn'), {
            validator: this.validateDuplicateVanDonSo,
            trigger: ['change', 'blur']
          }],
          billDate: [requiredRule('Ngày vận đơn')],
          cargoCtrlNo: [requiredRule('Số định danh'), validateRegex(PATTERN.REGEX_NOT_TV_SPECIAL, 'Số định danh')],
          cargoPiece: [requiredRule('Số lượng kiện'), numberRule('Số lượng kiện')],
          pieceUnitCode: [requiredRule('Số lượng kiện đơn vị tính')],
          cargoWeightGross: [requiredRule('Tổng trọng lượng'), decimalRule('Tổng trọng lượng')],
          weightUnitCode: [requiredRule('Tổng trọng lượng đơn vị tính')]
        },

        totalCargoPiece: [requiredRule('Số lượng'), numberRule('Số lượng')],
        // totalPieceUnitCode: [requiredRule('Mã đơn vị tính số lượng')],
        totalWeightGross: [requiredRule('Tổng trọng lượng hàng (gross)'), decimalRule('Tổng trọng lượng hàng (gross)')],
        // totalWeightUnitCode: [requiredRule('Mã đơn vị tính tổng trọng lượng (Gross)')],
        customsWarehouseCode: [requiredRule('Địa điểm lưu kho chờ thông quan')],
        marksNumbers: [requiredRule('Ký hiệu số và số hiệu bao bì'), validateRegex(REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Ký hiệu số và số hiệu bao bì')],
        loadingVesselCode: [requiredRule('Mã phương tiện vận chuyển'), validateRegex(PATTERN.NAME_NON_VIETNAMESE_WITH_SPECIAL, 'Mã phương tiện vận chuyển')],
        loadingVesselName: [requiredRule('Tên phương tiện vận chuyển'), validateRegex(REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Tên phương tiện vận chuyển')],
        arrivalDate: [requiredRule('Ngày hàng đến'), {
          validator: this.validateNgayHangDen,
          trigger: ['change', 'blur']
        }],
        unloadingPortCode: [requiredRule('Địa điểm dỡ hàng')],
        unloadingPortName: nonViAllowSpecialRules('Tên địa điểm dỡ hàng', true),
        loadingPortCode: [requiredRule('Địa điểm xếp hàng')],
        loadingPortName: nonViAllowSpecialRules('Tên địa điểm xếp hàng', true),
        resultInspectionCode: [requiredRule('Mã kết quả kiểm tra nội dung')],
        numberContainers: [numberRule('Số lượng container')]
      },
      listDvt: [
        { id: 'Số', value: 'SO' },
        { id: 'VNĐ', value: 'VND' },
      ],
      listHq: [
        { value: 'Chi cục Hải quan Hậu Giang', id: '54CE' },
        { value: 'Chi cục Cảnh Chân Trâu', id: '88ZZ' },
      ],
      DEFAULT_VALUE_CO,
      REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL
    }
  },
}
</script>

<style scoped>

</style>
