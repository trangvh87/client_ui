<template>
<div>

  <el-form label-position="top" label-width="100px" :model="formModel" size="mini"
           :rules="rulesformModel"
           ref="formModel"
  >
    <custom-collapse title="Thông tin người nhập khẩu" default-open icon-class="collapse-icon">
      <el-row :gutter="20">
        <input-select
            label="Mã người nhập khẩu"
            :v-model.sync="formModel.importerCode"
            prop="importerCode"
            :list-option-select="listHq"
           :number-gird-responsive="8"
        >
        </input-select>

        <input-text
            prop="importerName"
            label="Tên người nhập khẩu"
            :v-model.sync="formModel.importerName"
            maxlength="200"
            type="textarea"
            is-custom-css-textarea
           :number-gird-responsive="16"
        ></input-text>
      </el-row>

      <el-row :gutter="20">
        <input-text
            prop="importerPostCode"
            label="Mã bưu chính người nhập khẩu"
            :v-model.sync="formModel.importerPostCode"
            maxlength="9"
           :number-gird-responsive="4"
        ></input-text>

        <input-text
            prop="importerTelephone"
            label="Điện thoại người nhập khẩu"
            :v-model.sync="formModel.importerTelephone"
            maxlength="20"
           :number-gird-responsive="4"
        ></input-text>

        <input-text
            prop="importerAddress"
            label="Địa chỉ người nhập khẩu"
            :v-model.sync="formModel.importerAddress"
            maxlength="200"
            type="textarea"
           :number-gird-responsive="16"
        ></input-text>
      </el-row>

      <el-row :gutter="20">
        <input-text
            prop="importContractorCode"
            label="Mã người ủy thác nhập khẩu"
            :v-model.sync="formModel.importContractorCode"
            maxlength="13"
           :number-gird-responsive="8"
        ></input-text>

        <input-text
            prop="importContractorName"
            label="Tên người ủy thác nhập khẩu"
            :v-model.sync="formModel.importContractorName"
            maxlength="200"
            type="textarea"
           :number-gird-responsive="16"
        ></input-text>
      </el-row>
    </custom-collapse>

    <custom-collapse title="Thông tin người xuất khẩu" default-open icon-class="collapse-icon">
      <el-row :gutter="20">
        <input-text
            prop="exporterCode"
            label="Mã người xuất khẩu"
            :v-model.sync="formModel.exporterCode"
            maxlength="13"
           :number-gird-responsive="8"
        ></input-text>

        <input-text
            prop="exporterName"
            label="Tên người xuất khẩu"
            :v-model.sync="formModel.exporterName"
            maxlength="200"
            type="textarea"
           :number-gird-responsive="16"
        ></input-text>
      </el-row>

      <el-row :gutter="20">
        <input-text
            prop="exporterAddress1"
            label="Địa chỉ người xuất khẩu"
            :v-model.sync="formModel.exporterAddress1"
            type="textarea"
            maxlength="200"
           :number-gird-responsive="8"
        ></input-text>

        <input-text
            prop="exporterAddress2"
            label="Tên đường và số nhà/số hòm thư bưu điện (P.O.BOX)"
            :v-model.sync="formModel.exporterAddress2"
            maxlength="200"
            type="textarea"
           :number-gird-responsive="8"
        ></input-text>
      </el-row>

      <el-row :gutter="20">
        <input-text
            prop="exporterAddress3"
            label="Tên thành phố"
            :v-model.sync="formModel.exporterAddress3"
            maxlength="200"
            type="textarea"
           :number-gird-responsive="8"
        ></input-text>

        <input-text
            prop="exporterAddress4"
            label="Tên nước"
            :v-model.sync="formModel.exporterAddress4"
            maxlength="200"
            type="textarea"
           :number-gird-responsive="8"
        ></input-text>
      </el-row>

      <el-row :gutter="20">
        <input-text
            prop="exporterPostCode"
            label="Mã bưu chính người xuất khẩu"
            :v-model.sync="formModel.exporterPostCode"
            maxlength="9"
           :number-gird-responsive="8"
        ></input-text>

        <input-select
            label="Mã nước người xuất khẩu"
            :v-model.sync="formModel.countryCode"
            prop="countryCode"
            :list-option-select="listHq"
           :number-gird-responsive="8"
        >
        </input-select>


        <input-text
            prop="agentCode"
            label="Mã đại lý hải quan"
            :v-model.sync="formModel.agentCode"
            maxlength="5"
           :number-gird-responsive="8"
        ></input-text>

      </el-row>

      <el-row :gutter="20">
        <input-text
            prop="exportConsignerName"
            label="Tên người ủy thác xuất khẩu"
            :v-model.sync="formModel.exportConsignerName"
            maxlength="200"
            type="textarea"
           :number-gird-responsive="16"
        ></input-text>
      </el-row>
    </custom-collapse>
  </el-form>
</div>
</template>

<script>
import CustomCollapse from "@/components/CustomCollapse/custom-collapse.vue";
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";
import {numberRule, requiredRule, validateRegex} from "@/untils/validate";
import {PATTERN} from "@/untils/constant";

export default {
  name: "step-don-vi-xuat-nhap-khau",
  components: {
    CustomCollapse,
    inputSelect,
    inputText
  },
  data() {
    return {
      formModel: {
        importerCode: '',
        importerName: '',
        importerPostCode: '',
        importerTelephone: '',
        importerAddress: '',
        importContractorCode: '',
        importContractorName: '',
        exporterCode: '',
        exporterName: '',
        exporterAddress1: '',
        exporterAddress2: '',
        exporterAddress3: '',
        exporterAddress4: '',
        exporterPostCode: '',
        countryCode: '',
        agentCode: '',
        exportConsignerName: ''
      },
      rulesformModel: {
        importerCode: [
          requiredRule('Mã người nhập khẩu')
        ],
        importerName: [requiredRule('Tên người nhập khẩu')],
        // importerPostCode: [validateRegex(PATTERN.REGEX_NOT_CHAR_ALLOW_SPECIAL, 'Mã bưu chính người nhập khẩu')],
        importerAddress: [requiredRule('Địa chỉ người nhập khẩu')],
        importerTelephone: [requiredRule('Điện thoại người nhập khẩu')],
        // , validateRegex(PATTERN.REGEX_NOT_CHAR_ALLOW_SPECIAL, 'Điện thoại người nhập khẩu')
        importContractorCode: [numberRule('Mã người ủy thác nhập khẩu')],
        importContractorName: [],
        exporterCode: [numberRule('Mã người xuất khẩu')],
        exporterName: [requiredRule('Tên người xuất khẩu'), validateRegex(PATTERN.REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Tên người xuất khẩu')],
        exporterAddress1: [requiredRule('Địa chỉ người xuất khẩu (1)'), validateRegex(PATTERN.REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Địa chỉ người xuất khẩu (1)')],
        exporterAddress2: [validateRegex(PATTERN.REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Địa chỉ người xuất khẩu (2)')],
        exporterAddress3: [validateRegex(PATTERN.REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Địa chỉ người xuất khẩu (3)')],
        exporterAddress4: [validateRegex(PATTERN.REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Địa chỉ người xuất khẩu (4)')],
        exporterPostCode: [validateRegex(PATTERN.REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL, 'Mã bưu chính người xuất khẩu')],
        // countryCode: [requiredRule('Mã nước người xuất khẩu')],
        exportConsignerName: [],
        // agentCode: [validateRegex(PATTERN.REGEX_NOT_TV_SPECIAL, 'Mã đại lý hải quan')]
      },
      listHq: [
        { value: 'Chi cục Hải quan Hậu Giang', id: '54CE' },
        { value: 'Chi cục Cảnh Chân Trâu', id: '88ZZ' },
      ],
    }
  },
}
</script>

<style scoped>

</style>
