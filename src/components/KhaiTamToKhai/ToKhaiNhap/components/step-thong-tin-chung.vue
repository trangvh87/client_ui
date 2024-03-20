<template>
  <el-form
      :ref="formName"
      :model="formModel"
      :rules="rules"
      label-position="top"
  >
    <el-row :gutter="gutter">
      <input-text
          label="Số TK đầu tiên"
          prop="firstDeclarationNo"
          id="first-item"
          :v-model.sync="formModel.firstDeclarationNo"
          maxlength="12"
          :number-gird-responsive="8"
      />
      <input-text
          prop="branchNoOfDividedDeclaration"
          :v-model.sync="formModel.branchNoOfDividedDeclaration"
          label="Số nhánh/Tổng số"
          maxlength="2"
          :number-gird-responsive="5"
      />
      <input-text
          prop="noOfDividedDeclaration"
          label="  "
          :v-model.sync="formModel.noOfDividedDeclaration"
          maxlength="2"
          :number-gird-responsive="3"
          label-width="120px"
      />
    </el-row>

        <el-row :gutter="gutter">
          <select-ma-hq
              is-get-all
              :is-show-option-all="false"
              label="HQ tiếp nhận khai báo"
              :s-cusid.sync="formModel.acceptanceOffice"
              prop-form="acceptanceOffice"
              :clearable="false"
              default-first-option
              @blur="validateField('objTk.maHq')"
              :number-gird-responsive="8"
          />


<!--
            <input-select
                label="HQ tiếp nhận khai báo"
                :v-model.sync="formModel.acceptanceOffice"
                prop="acceptanceOffice"
                :list-option-select="listHq"
                :number-gird-responsive="8"

            />
-->

          <input-select
              label="Mã bộ phận xử lý tờ khai (NK)"
              :v-model.sync="formModel.customsSubSection"
              prop="customsSubSection"
              :list-option-select="listMaBp"
              :number-gird-responsive="8"
          />

          <input-select
              label="Kênh khai báo"
              :v-model.sync="formModel.declarantChannel"
              prop="declarantChannel"
              :list-option-select="listKenhKhaiBao"
              :number-gird-responsive="8"
          />
        </el-row>

        <el-row :gutter="gutter">
          <el-col v-bind="objReponsive(8)" >
          <el-form-item label="Ngày khai báo dự kiến" prop="issueDate">
            <el-date-picker
                v-model="formModel.issueDate"
                placeholder="Ngày khai báo (dự kiến)"
                format="dd-MM-yyyy"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                type="date"
                :clearable="false"
                :picker-options="notBeforeToday"
            />
          </el-form-item>
          </el-col>

<!--          <input-date
              label="Ngày khai báo dự kiến"
              v-model="formModel.issueDate"
              prop="issueDate"
              :number-gird-responsive="8"
              :picker-options="notBeforeToday"
          />-->

          <input-select
              label="Mã loại hình"
              :v-model.sync="formModel.declarationKindCode"
              prop="declarationKindCode"
              :list-option-select="listLoaHinh"
              :number-gird-responsive="8"
          />

          <input-select
              label="Phân loại cá nhân/tổ chức"
              :v-model.sync="formModel.classificationIndividualOrganization"
              prop="classificationIndividualOrganization"
              :list-option-select="listCaNhan"
              :number-gird-responsive="8"
          />
        </el-row>

    <el-row :gutter="gutter">
      <input-select
          label="Mã phân loại HH"
          :v-model.sync="formModel.cargoClassificationCode"
          prop="cargoClassificationCode"
          :list-option-select="listHangHoa"
          :number-gird-responsive="8"
      />

      <input-select
          label="Mã hiệu phương thức VC"
          :v-model.sync="formModel.meansOfTransportationCode"
          prop="meansOfTransportationCode"
          :list-option-select="listPhuongThuc"
          :number-gird-responsive="8"
      />

      <input-text
          prop="declarationNoTentative"
          label="Số TK TNTX tương ứng"
          :v-model.sync="formModel.declarationNoTentative"
          maxlength="12"
          :number-gird-responsive="8"
      ></input-text>

    </el-row>

    <el-row :gutter="gutter">
      <el-col v-bind="objReponsive(8)" >
        <el-form-item label="Thời hạn tái xuất" prop="timeLimitReExport">
          <el-date-picker
              v-model="formModel.timeLimitReExport"
              placeholder="Thời hạn tái xuất"
              format="dd-MM-yyyy"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              type="date"
              :clearable="false"
              :picker-options="notBeforeNgayKhaiDuKien"
          />
        </el-form-item>
      </el-col>

      <input-text
          prop="declarantCode"
          label="Mã người khai HQ"
          :v-model.sync="formModel.declarantCode"
          disabled
          :number-gird-responsive="8"
      />

      <input-text
          prop="declarantName"
          label="Tên người khai HQ"
          :v-model.sync="formModel.declarantName"
          disabled
          :number-gird-responsive="8"
      />
    </el-row>
  </el-form>
</template>

<script>
import moment from 'moment'

import { notVnCharAndSpecial, requiredRule, numberRule } from '@/untils/validate'
import { LIST_KENH_KHAI_BAO, LIST_NHOM_LOAI_HINH, LOAI_TO_KHAI_NHAP_XUAT } from '@/untils/constant'
import { notBeforeTodayPickerOptions , validateForm } from '@/untils/validate'
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";
import inputDate from "@/components/InputEtc/input-date.vue";
import {FORM_MODE} from '@/untils/constant';
import {cloneDeep} from 'lodash';
import {objReponsive} from "@/untils/untils";
import SelectMaHq from "@/components/SelectListMaHq/SelectListMaHq.vue";



const FIELDS = {
  firstDeclarationNo: true,
  branchNoOfDividedDeclaration: true,
  acceptanceOffice: true,
  customsSubSection: true,
  declarantChannel: true,
  issueDate: true,
  declarationKindCode: true,
  classificationIndividualOrganization: true,
  cargoClassificationCode: true,
  meansOfTransportationCode: true,
  declarationNoTentative: true,
  timeLimitReExport: true
}

export function removeProp(obj, arrPropRemove) {
  Object.keys(obj).forEach(s => {
    if (arrPropRemove.includes(s)) {
      obj[s] = []
    }
  })
  return obj
}

export function setRuleToEmpty(rules) {
  Object.keys(rules).forEach(s => {
    if (rules[s].length > 0 && rules[s][0].constructor === Array) {
      setRuleToEmpty(rules[s])
    } else {
      rules[s] = []
    }
  })
}


const RULES = {
    'firstDeclarationNo': [notVnCharAndSpecial('Số TK đầu tiên')],
    'branchNoOfDividedDeclaration': [numberRule('Số nhánh')],
    'noOfDividedDeclaration': [numberRule('Tổng số')],
    'nhomLoaiHinh': [requiredRule('Nhóm loại hình')],
    'declarantChannel': [requiredRule('Kênh khai báo')],
    'acceptanceOffice': [requiredRule('Hải quan tiếp nhận KB')],
    'declarationNoTentative': [numberRule('Số TK TNTX tương ứng'),
      { min: 12, max: 12, message: 'Số TK TNTX tương ứng gồm 12 chữ số' }],
    'cargoClassificationCode': [],
    'declarationKindCode': [requiredRule('Mã loại hình')],
    'classificationIndividualOrganization': [requiredRule('Phân loại cá nhân tổ chức')],
    'meansOfTransportationCode': [requiredRule('Phương thức vận chuyển')],
    'customsSubSection': [requiredRule('Mã bộ phận xử lý từ khai')],
    'huyMaLyDo': [requiredRule('Mã lý do')],
    'huyLyDo': [requiredRule('Lý do hủy')]
}

export default {
  name: 'step-thong-tin-chung',
  components: {
    SelectMaHq,
    inputText,
    inputSelect,
    inputDate
  },
  props: {
    loaiKhaiBaoDaChon: {
      type: String,
      default: ''
    },
    stepIndex: {
      type: Number,
      default: 0
    },
    touched: {
      type: Boolean,
      default: false
    },
    module: {
      type: String,
      default: 'ktttk/kttknDk'
    }
  },
  data() {
    return {
      gutter: 20,
      formName: 'formBuoc1',
      rules: {
        'firstDeclarationNo': [notVnCharAndSpecial('Số TK đầu tiên')],
        'branchNoOfDividedDeclaration': [numberRule('Số nhánh')],
        'noOfDividedDeclaration': [numberRule('Tổng số')],
        'nhomLoaiHinh': [requiredRule('Nhóm loại hình')],
        'declarantChannel': [requiredRule('Kênh khai báo')],
        'acceptanceOffice': [requiredRule('Hải quan tiếp nhận KB')],
        'declarationNoTentative': [numberRule('Số TK TNTX tương ứng'),
          { min: 12, max: 12, message: 'Số TK TNTX tương ứng gồm 12 chữ số' }],
        'cargoClassificationCode': [],
        'declarationKindCode': [requiredRule('Mã loại hình')],
        'classificationIndividualOrganization': [requiredRule('Phân loại cá nhân tổ chức')],
        'meansOfTransportationCode': [requiredRule('Phương thức vận chuyển')],
        'customsSubSection': [requiredRule('Mã bộ phận xử lý từ khai')],
        'huyMaLyDo': [requiredRule('Mã lý do')],
        'huyLyDo': [requiredRule('Lý do hủy')],
        'issueDate':  [requiredRule('Ngày khai dự kiến'), {
          validator: this.validateNgayKhaiBao,
          trigger: ['change', 'blur']
        }],
        'timeLimitReExport':  [{
          validator: this.validateThoiHanTnTx,
          trigger: ['change', 'blur']
        }],
      },
      formModel: {
        firstDeclarationNo: '',
        branchNoOfDividedDeclaration: '',
        noOfDividedDeclaration: '',
        acceptanceOffice: '54CE',
        customsSubSection: '00',
        declarantChannel: '1',
        issueDate: new Date(),
        declarationKindCode: 'A11',
        classificationIndividualOrganization: '1',
        cargoClassificationCode: '1',
        meansOfTransportationCode: '1',
        declarationNoTentative: '',
        timeLimitReExport: undefined,
        declarantCode: '0106753003',
        declarantName: 'Tên doanh nghiệp 0106753003'
      },
      listMaBp: [
        { id: '00', value: '00' },
      ],
      listKenhKhaiBao: LIST_KENH_KHAI_BAO,
      listLoaHinh: LIST_NHOM_LOAI_HINH,
      listCaNhan: [
        { value: 'Cá nhân', id: '1' },
        { value: 'Tổ chức', id: '2' }
      ],
      listHangHoa: [
        { id: 'NPL', value: '1' },
        { id: 'SP', value: '2' }
      ],
      listNuocXuatXu: [
        { label: 'Sierra', value: 'SL' },
        { label: 'San Marino', value: 'SM' },
        { label: 'Senegal', value: 'SN' },
        { label: 'Somalia', value: 'SO' }
      ],
      listMienGiamMa: [
        { label: 'Hàng hóa', value: 'XN190' },
        { label: 'San Marino', value: 'XN103' },
      ],
      listNgoaiHanNgach: [
        { label: 'Biểu thuế nhập khẩu ưu đãi', value: 'B01' },
        { label: 'Chương 98 (1) - Biểu thuế nhập khẩu ưu đãi', value: 'B02' },
      ],
      listXdThueNkTheoLuong: [
        { label: 'ô tô 9 chỗ', value: '1' },
        { label: 'ô tô 16 chỗ', value: '2' },
      ],
      listDvt: [
        { label: 'Số', value: 'SO' },
        { label: 'VNĐ', value: 'VND' },
      ],
      listTienTe: [
        { label: 'Bảng anh', value: 'BA' },
        { label: 'Rúp Nga', value: 'RUB' },
      ],
      listMaBieuThue: [
        { label: 'Nhập khẩu quá số lượng hạn ngạch', value: 'X' },
      ],
      listHoaHoc: [
        { label: 'Hàng biếu, quà tặng', value: 'A' },
        { label: 'Hàng an ninh, quốc phòng', value: 'B' }
      ],
      listPhuongThuc: [
        { id: 'Đường không', value: '1' },
        { id: 'Đường biển', value: '2' }
      ],
      notBeforeToday: notBeforeTodayPickerOptions,
    }
  },
  computed: {
    checkShowFields() {
      const fields = cloneDeep(FIELDS)
      if (this.mode !== FORM_MODE.VIEW) {
        return fields
      } else {
        Object.keys(fields).forEach(s => {
          fields[s] = false
        })
      }
      /*   }*/
      return fields
    },
    // ...mapFieldsProp('module', ['mode', 'formModel', 'functionCode', 'first']),
    /*    declarantCode() {
          return this.$store.getters.org
        },
        declarantName() {
          return this.$store.state.user.userInfo.orgName
        },*/
    notBeforeNgayKhaiDuKien() {
      const issueDate = this.formModel.issueDate
          ? new Date(this.formModel.issueDate)
          : new Date()
      issueDate.setHours(0, 0, 0, 0)
      return {
        disabledDate(date) {
          return date < issueDate
        }
      }
    }
  },
  mounted() {
    this.initForm()
    validateForm(this, 1)
  },
  methods: {
    objReponsive,
    validateNgayKhaiBao(_info, value, callback) {
      if (value) {
        let diff = moment(value).startOf('day').diff(moment(new Date()).startOf('day'))
        if ((diff < 0)) {
          return callback(new Error(`Ngày khai báo dự kiến không được nhập ${'nhỏ hơn'} ${'Ngày hiện tại'}`))
        }
        if (this.formModel.timeLimitReExport) {
          diff = moment(value).startOf('day').diff(moment(this.formModel.timeLimitReExport).startOf('day'))
          if ((diff > 0)) {
            return callback(new Error(`Ngày khai báo dự kiến không được nhập ${'lớn hơn'} ${'Thời hạn tái xuất'}`))
          } else {
            setTimeout(() => {
              this.$refs[this.formName]?.validateField('timeLimitReExport')
            })
          }
        }
        return callback()
      }
      callback()
    },
    validateThoiHanTnTx(_info, value, callback) {
      if (value && this.formModel.issueDate) {
        const diff = moment(value).startOf('day').diff(moment(this.formModel.issueDate).startOf('day'))
        if ((diff < 0)) {
          return callback(new Error(`Thời hạn tái xuất không được nhập ${'nhỏ hơn'} ${'Ngày khai báo dự kiến'}`))
        } else {
          setTimeout(() => {
            this.$refs[this.formName]?.validateField('issueDate')
          })
        }
        return callback()
      }
      callback()
    },
    initForm() {
             document.getElementById('first-item').focus()
    },
    validateField(fieldName) {
      this.$refs[this.formName].validateField(fieldName)
    }
  }
}
</script>



