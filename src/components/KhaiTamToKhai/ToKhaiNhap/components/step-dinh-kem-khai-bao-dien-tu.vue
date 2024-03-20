<template>
  <div>
    <p style="font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #686868;
    margin-bottom: 12px;"
    >
      Có thể nhập tối đa 03 loại đính kèm khai báo điện tử
    </p>
    <el-form label-position="top" label-width="100px" :model="formModel" size="mini"
             :rules="formModel" ref="formModel"
    >

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
                Phân loại đính kèm
              </el-col>
              <el-col :span="11" style="word-break: break-word;">
                Số đính kèm
              </el-col>
            </el-row>
          </div>

          <div
              v-if="!formModel.electronicAttachment || formModel.electronicAttachment.length === 0"
              class="el-table__empty-block"
              style="height: 100%; width: 100%;"
          >
            <span class="el-table__empty-text">Không có dữ liệu</span>
          </div>

          <el-form
              v-else
              ref="formToKhaiTriGia"
              :model="formModel"
              :rules="ruleFormDinhKemKhaiBao"
              style="padding-top: 0px"
              size="mini"
              label-width="0px"
              label-position="top"

          >
            <el-row
                v-for="(value, index) in formModel.electronicAttachment"
                :key="index"
                :gutter="10"
                class="border-bot"
                style="padding: 15px 0 0 0; margin-top: 0px;"
            >

              <el-col :span="1" style="padding-top: 5px">
                {{ index + 1 }}
              </el-col>

              <input-select
                  :rules="ruleFormDinhKemKhaiBao.classificationElectronicAttachment"
                  style="margin-top: -1.4em; "
                  :prop="'electronicAttachment[' + index + '].classificationElectronicAttachment'"
                  label=" "
                  :v-model.sync="formModel.electronicAttachment[index].classificationElectronicAttachment"
                  :list-option-select="listHq"
                  :number-gird-responsive="11"
              >
              </input-select>

              <input-text
                  :rules="ruleFormDinhKemKhaiBao.electronicAttachmentNo"
                  style="margin-top: -1.4em"
                  label=" "
                  :prop="'electronicAttachment[' + index + '].electronicAttachmentNo'"
                  :v-model.sync="formModel.electronicAttachment[index].electronicAttachmentNo"
                  maxlength="21"
                  :number-gird-responsive="11"
              ></input-text>

              <el-col :span="1" class="text-center">
                <el-tooltip :open-delay="400" content="Xóa" effect="light" placement="top">
                  <div class="custom-delete-button" style="font-size: medium">
                    <el-button
                        size="mini"
                        icon="el-icon-error"
                        @click="delItem(formModel.electronicAttachment, index, validateDinhKem)"
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
                :disabled="formModel.electronicAttachment.length >= 3"
                icon="el-icon-circle-plus-outline"
                @click="addNewItem(formModel.electronicAttachment, DEFAULT_VALUE_DINH_KEM_KHAI_BAO, 'formModel', )"
            >
              <span>Thêm loại đính kèm</span>
            </el-button>
          </div>

          <div class="EmptyBox20"></div>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";
import {listHq} from "@/untils/listCategory";
import {addNewItem, delItem, validateField} from "@/untils/untils";
import {numberRule, requiredRule} from "@/untils/validate";

const DEFAULT_VALUE_DINH_KEM_KHAI_BAO = {
  giayPhepMa: '',
  giayPhepNgay: '',
  giayPhepNgayCap: '',
  giayPhepNgayHh: '',
  giayPhepNguoiCap: '',
  giayPhepNoiCap: '',
  giayPhepSo: '',
  giayPhepTen: ''
}


export default {
  name: "step-dinh-kem-khai-bao-dien-tu",
  components: {
    inputText,
    inputSelect
  },
  data() {
    return {
      formModel: {
        electronicAttachment: []
      },
      ruleFormDinhKemKhaiBao: {
        electronicAttachmentNo: [requiredRule('Số đính kèm'), numberRule('Số đính kèm')],
        classificationElectronicAttachment: [requiredRule('Phân loại đính kèm'), {
          validator: this.validateDuplicatePlDinhKemDt,
          trigger: ['change', 'blur']
        }]
      },
      listHq: listHq,
      DEFAULT_VALUE_DINH_KEM_KHAI_BAO,
      methods: {
        addNewItem,
        delItem,
        validateDinhKem(i) {
          if (this.formModel.electronicAttachment[i].electronicAttachmentNo) validateField('formModel', 'electronicAttachment[' + i + '].electronicAttachmentNo')
        },
        validateDuplicatePlDinhKemDt(info, value, callback) {
          this.validateDuplicateMa(info, value, callback, this.formModel.electronicAttachment, 'electronicAttachment', 'classificationElectronicAttachment', 'Phân loại đính kèm')
        },
      },
    }
  },
  methods: {
    delItem,
    addNewItem,
    validateDinhKem(i) {
      if (this.formModel.electronicAttachment[i].electronicAttachmentNo) this.validateField('formModel', 'electronicAttachment[' + i + '].electronicAttachmentNo')
    },
  },
}
</script>

<style scoped>
.el-form-item__label::before {
  content: '';
}

.el-form-item__label::after {
  content: '';
}
</style>
