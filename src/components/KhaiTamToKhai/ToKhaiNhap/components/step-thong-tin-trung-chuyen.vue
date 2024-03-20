<template>
  <el-form
      label-position="top"
      label-width="100px"
      :model="formModel"
      size="mini"
      :rules="ruleFormThongTinTrungChuyen"
  >

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item
            label="Ngày được phép nhập kho đầu tiên"
            prop="initialPermitCarryWarehouseDate"
        >
          <el-date-picker
              clearable
              v-model="formModel.initialPermitCarryWarehouseDate"
              format="dd-MM-yyyy"
              style="width: 100%"
              type="date"
              placeholder="Ngày được phép nhập kho đầu tiên"
              :picker-options="notAfterTodayPickerOptions"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item
            label="Ngày khởi hành vận chuyển"
            prop="startDateOfTransport"
        >
          <el-date-picker
              clearable
              v-model="formModel.startDateOfTransport"
              format="dd-MM-yyyy"
              style="width: 100%"
              placeholder="Ngày khởi hành vận chuyển"
              type="date"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item
            label="Ngày dự kiến đến địa điểm đích"
            prop="arrivalDateOfTransport"
            :rules="formModel.startDateOfTransport ? ruleFormThongTinTrungChuyen.arrivalDateOfTransport : []"
        >
          <el-date-picker
              clearable
              v-model="formModel.arrivalDateOfTransport"
              format="dd-MM-yyyy"
              style="width: 100%"
              type="date"
              :picker-options="notBeforeNgayKhoiHanh"
              :disabled="!formModel.startDateOfTransport"
              placeholder="Ngày dự kiến đến địa điểm đích"
          />
        </el-form-item>
      </el-col>

      <input-select
          :rules="formModel.startDateOfTransport ? ruleFormThongTinTrungChuyen.arrivalDateOfTransport : []"
          prop="destinationBondedTransport"
          label="Địa điểm đích cho vận chuyển bảo thuế"
          :v-model.sync="formModel.destinationBondedTransport"
          :list-option-select="listHq"
          is-remote-search
          :disabled="!formModel.startDateOfTransport"
          :number-gird-responsive="8"
      ></input-select>
    </el-row>

    <p style="font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 19px;
    color: #555555;
    margin: 10px 0;"
    >
     Thông tin trung chuyển
    </p>

    <el-row :gutter="20">
      <el-col :span="16">
        <div
            class="border-el-table"
            style="vertical-align: middle"
        >
          <el-row :gutter="20" class="text-center table-header-edit">
            <el-col :span="1" style="word-break: break-word; text-align: center">
              STT
            </el-col>
            <el-col :span="7" style="word-break: break-word; text-align: center">
              Mã địa điểm
            </el-col>
            <el-col :span="7" style="word-break: break-word; text-align: center">
              Ngày dự kiến đến (Địa điểm trung chuyển)
            </el-col>
            <el-col :span="7" style="word-break: break-word; text-align: center">
              Ngày khởi hành (Địa điểm trung chuyển)
            </el-col>
          </el-row>
        </div>

        <div
            v-if="!formModel.transitInfos || formModel.transitInfos.length === 0"
            class="el-table__empty-block"
            style="height: 100%; width: 100%;"
        >
          <span class="el-table__empty-text">Không có dữ liệu</span>
        </div>
        <el-form
            v-else
            ref="formModel"
            :model="formModel"
            :rules="ruleFormThongTinTrungChuyen"
            style="padding-top: 0px"
            size="mini"
            label-width="0px"
            label-position="top"

        >
          <el-row
              v-for="(value, index) in formModel.transitInfos"
              :key="index"
              :gutter="10"
              class="border-bot"
              style="padding: 15px 0 0 0; margin-top: 0px;"
          >

            <el-col :span="1" style="padding-top: 5px">
              {{ index + 1 }}
            </el-col>

            <input-text
                :rules="ruleFormThongTinTrungChuyen.transitLocationBondedTransport"
                :prop="'transitInfos[' + index + '].transitLocationBondedTransport'"
                :v-model.sync="formModel.transitInfos[index].transitLocationBondedTransport"
                maxlength="21"
                :number-gird-responsive="8"
            ></input-text>


            <el-col :span="7">
              <el-form-item
                  label=""
                  :prop="'transitInfos[' + index + '].transitArrivalDateOfTransport'"
                  :rules="ruleFormThongTinTrungChuyen.transitArrivalDateOfTransport"
              >
                <el-date-picker
                    v-model="formModel.transitInfos[index].transitArrivalDateOfTransport"
                    format="dd-MM-yyyy"
                    style="width: 100%"
                    type="date"
                    :clearable="false"
                />
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item
                  label=""
                  :prop="'transitInfos[' + index + '].transitStartDateOfTransport'"
                  :rules="ruleFormThongTinTrungChuyen.transitArrivalDateOfTransport"
              >
                <el-date-picker
                    v-model="formModel.transitInfos[index].transitStartDateOfTransport"
                    format="dd-MM-yyyy"
                    style="width: 100%"
                    type="date"
                    :clearable="false"
                />
              </el-form-item>
            </el-col>

            <el-col :span="1" class="text-center">
              <el-tooltip :open-delay="400" content="Xóa" effect="light" placement="top">
                <div class="custom-delete-button" style="font-size: medium">
                  <el-button
                      size="mini"
                      icon="el-icon-error"
                      @click="delItem(formModel.transitInfos, index, validateThongTinTrungChuyen)"
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
              @click="addNewItem(formModel.transitInfos, DEFAULT_VALUE_THONG_TIN_TRUNG_CHUYEN, 'formModel', true)"
          >
            <span>Thêm thông tin trung chuyển</span>
          </el-button>
        </div>

        <div class="EmptyBox20"></div>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
import {listHq} from "@/untils/listCategory";
import {notAfterTodayPickerOptions, requiredRule} from "@/untils/validate";
import {addNewItem, delItem, validateField} from "@/untils/untils";
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";

const DEFAULT_VALUE_THONG_TIN_TRUNG_CHUYEN= {
  transitLocationBondedTransport: '',
  transitArrivalDateOfTransport: '',
  transitStartDateOfTransport: ''
}

export default {
  name: "step-thong-tin-trung-chuyen",
  components: {
    inputText,
    inputSelect
  },
  methods: {
    addNewItem,
    delItem,
    validateThongTinTrungChuyen(i) {
      if (this.formModel.transitInfos[i].transitLocationBondedTransport) validateField('formModel', 'transitInfos[' + i + '].transitLocationBondedTransport')
    },
  },
  computed: {
    notAfterTodayPickerOptions() {
      return notAfterTodayPickerOptions
    },
    notBeforeNgayKhoiHanh() {
      const ngayKhoiHanhVc = this.formModel.ngayKhoiHanhVc
          ? new Date(this.formModel.ngayKhoiHanhVc)
          : new Date()
      ngayKhoiHanhVc.setHours(0, 0, 0, 0)
      return {
        disabledDate(date) {
          return date < ngayKhoiHanhVc
        }
      }
    },
  },
  data() {
    return {
      formModel: {
        initialPermitCarryWarehouseDate: '',
        startDateOfTransport: '',
        arrivalDateOfTransport: '',
        destinationBondedTransport: '',
        transitInfos: [],
      },
      ruleFormThongTinTrungChuyen: {
        arrivalDateOfTransport: requiredRule('Ngày dự kiến đến địa điểm đích'),
        destinationBondedTransport: requiredRule('Địa điểm đích cho vận chuyển bảo thuế'),
        transitLocationBondedTransport: requiredRule('Mã địa điểm'),
        transitArrivalDateOfTransport: requiredRule('Ngày dự kiến đến (Địa điểm trung chuyển)'),
        transitStartDateOfTransport: requiredRule('Ngày khởi hành (Địa điểm trung chuyển)'),



      },
      listHq: listHq,
      DEFAULT_VALUE_THONG_TIN_TRUNG_CHUYEN
    }
  },
}
</script>

<style scoped>

</style>
