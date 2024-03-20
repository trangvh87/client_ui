<template>
  <div>
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
            <el-col :span="7" style="word-break: break-word;text-align: center">
              Phân loại CTDT
            </el-col>
            <el-col :span="7" style="word-break: break-word;text-align: center">
              Số chứng từ
            </el-col>
            <el-col :span="7" style="word-break: break-word;text-align: center">
              Năm chứng từ
            </el-col>
          </el-row>
        </div>

        <div
            v-if="!formModel.lstDinhKemCtdt || formModel.lstDinhKemCtdt.length === 0"
            class="el-table__empty-block"
            style="height: 100%; width: 100%;"
        >
          <span class="el-table__empty-text">Không có dữ liệu</span>
        </div>

        <el-form
            v-else
            ref="formModel"
            :model="formModel"
            :rules="ruleFormDinhKemDanhSachCTDT"
            style="padding-top: 0px"
            size="mini"
            label-width="0px"
            label-position="top"

        >
          <el-row
              v-for="(value, index) in formModel.lstDinhKemCtdt"
              :key="index"
              :gutter="10"
              class="border-bot"
              style="padding: 15px 0 0 0; margin-top: 0px;"
          >

            <el-col :span="1" style="padding-top: 5px">
              {{ index + 1 }}
            </el-col>

            <input-select
                :rules="ruleFormDinhKemDanhSachCTDT.classificationElectronicAttachment"
                :prop="`lstDinhKemCtdt[${index}].classificationElectronicAttachment`"
                :v-model.sync="formModel.lstDinhKemCtdt[index].classificationElectronicAttachment"
                :list-option-select="listMaPlCtdt"
                :number-gird-responsive="7"
            >
            </input-select>

            <input-text
                :rules="ruleFormDinhKemDanhSachCTDT.regCustomsId"
                :prop="`lstDinhKemCtdt[${index}].regCustomsId`"
                :v-model.sync="formModel.lstDinhKemCtdt[index].regCustomsId"
                maxlength="21"
                :number-gird-responsive="7"
            ></input-text>

            <el-col :span="7">
              <el-form-item
                  :prop="`lstDinhKemCtdt[${index}].regYear`"
                  :rules="ruleFormDinhKemDanhSachCTDT.regYear">
                <el-date-picker
                    v-model="formModel.lstDinhKemCtdt[index].regYear"
                    format="yyyy"
                    style="width: 100%"
                    type="year"
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
                      @click="delItem(formModel.lstDinhKemCtdt, index, validateDinhKem)"
                  />
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <div class="EmptyBox20"></div>
        </el-form>

        <div class="text-left">
          <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-circle-plus-outline"
              @click="addNewItem"
          >
            <span>Thêm loại CTDT</span>
          </el-button>
        </div>

        <div class="EmptyBox20"></div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import {delItem} from "@/untils/untils";
import {numberRule, requiredRule} from "@/untils/validate";
import {listMaPlCtdt,} from "@/untils/listCategory";
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";
import {cloneDeep} from "lodash";

const DEFAULT_VALUE_KHAI_BAO_DIEN_TU = {
  regCustomsId: '',
  classificationElectronicAttachment: '',
  regYear: ''

}
export default {
  name: "step-dinh-kem-danh-sach-ctdt",
  components: {
    inputText,
    inputSelect
  },
  data() {
    return {
      formModel: {
        licenses: [],
        commercialInvoices: [],
        lstDinhKemCtdt: [
          /*        {
                classificationElectronicAttachment: '9308', regYear: new Date()
              }*/
        ]
      },
      ruleFormDinhKemDanhSachCTDT: {
        regCustomsId: [requiredRule('Số chứng từ'), numberRule('Số chứng từ'), {
          trigger: ['change', 'blur']
        }],
        classificationElectronicAttachment: [requiredRule('Phân loại CTDT'), {
          trigger: ['change', 'blur']
        }],
        regYear: [requiredRule('Năm chứng từ')]
      },
      DEFAULT_VALUE_KHAI_BAO_DIEN_TU,
      listMaPlCtdt: listMaPlCtdt
    }
  },
  methods: {
    delItem,
    addNewItem() {
      if (this.formModel.lstDinhKemCtdt && this.formModel.lstDinhKemCtdt.length === 0) {
        this.formModel.lstDinhKemCtdt.push(_.cloneDeep(DEFAULT_VALUE_KHAI_BAO_DIEN_TU))
      } else {
        this.$refs['formModel'].validate((valid) => {
          if (!valid) return false
          this.formModel.lstDinhKemCtdt.push(_.cloneDeep(DEFAULT_VALUE_KHAI_BAO_DIEN_TU))
        })
      }
      this.convertListCtdt('9308', this.formModel.licenses);

      this.convertListCtdt('9310', this.formModel.commercialInvoices);
    },
    validateDinhKem(i) {
      if (this.formModel.lstDinhKemCtdt[i].regCustomsId) this.validateField('formModel', 'lstDinhKemCtdt[' + i + '].regCustomsId')
    },
    convertListCtdt(valueMaPl, lstLoaiCtdt) {
      const lstCtdtPl = this.formModel.lstDinhKemCtdt.filter(ele =>
          ele.classificationElectronicAttachment !== "" && ele.classificationElectronicAttachment === valueMaPl)
      if (lstCtdtPl && lstCtdtPl.length > 0) {
        const cloneLst = cloneDeep(lstCtdtPl)
        cloneLst.forEach(e => {
          delete e.classificationElectronicAttachment
          lstLoaiCtdt.push(e)
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
