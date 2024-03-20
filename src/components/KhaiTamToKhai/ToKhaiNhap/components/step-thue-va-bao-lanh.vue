<template>
  <el-form label-position="top" label-width="100px" :model="formModel" size="mini" :rules="ruleFormBaoLanh">
    <el-row :gutter="20">
      <input-select
          label="Người nộp thuế"
          :v-model.sync="formModel.nguoiNopThue"
          prop="nguoiNopThue"
          :list-option-select="listHq"
          :number-gird-responsive="8"
      />

      <input-select
          label="Mã lý do đề nghị BP"
          :v-model.sync="formModel.maLyDoBp"
          prop="maLyDoBp"
          :list-option-select="listHq"
          :number-gird-responsive="8"
      >
      </input-select>
    </el-row>

    <el-row :gutter="20">
      <input-select
          label="Mã xác định thời hạn nộp thuế"
          :v-model.sync="formModel.loaiAh"
          prop="loaiAh"
          :list-option-select="listHq"
          :number-gird-responsive="8"
      >
      </input-select>
    </el-row>

    <el-row :gutter="20">
      <input-select
          label="Mã ngân hàng trả thuế thay"
          :v-model.sync="formModel.maNh"
          prop="maNh"
          type="textarea"
          is-remote-search
          :number-gird-responsive="8"
      >
      </input-select>

<!--      <input-date
          label="Năm phát hành hạn mức"
          v-model="formModel.namNh"
          prop="namNh"
          date-type="year"
          format="yyyy"
          :number-gird-responsive="4"
      >
      </input-date>-->

      <el-col :span="4">
        <el-form-item label="Năm phát hành hạn mức" prop="namNh">
          <el-date-picker
              v-model="formModel.namNh"
              placeholder="Năm phát hành hạn mức"
              format="yyyy"
              value-format="yyyy"
              style="width: 100%"
              type="year"
              :picker-options="notAfterToday"
              :clearable="false"
          />
        </el-form-item>
      </el-col>

      <input-text
          prop="kyhieuNh"
          label="Ký hiệu chứng từ hạn mức"
          :v-model.sync="formModel.kyhieuNh"
          maxlength="12"
          :number-gird-responsive="4"
      ></input-text>

      <input-text
          prop="soNh"
          label="Số chứng từ hạn mức"
          :v-model.sync="formModel.soNh"
          maxlength="12"
          :number-gird-responsive="4"
      ></input-text>
    </el-row>

    <el-row :gutter="20">
      <input-select
          label="Mã ngân hàng bảo lãnh"
          :v-model.sync="formModel.maNhBl"
          prop="maNhBl"
          type="textarea"
          is-remote-search
          :list-option-select="listHq"
          :number-gird-responsive="8"
      >
      </input-select>

<!--      <input-date
          label="Năm phát hành bảo lãnh"
          v-model="formModel.namBl"
          prop="namBl"
          date-type="year"
          format="yyyy"
          :number-gird-responsive="4"
      >
      </input-date>-->

      <el-col :span="4">
        <el-form-item label="Năm phát hành bảo lãnh" prop="namBl">
          <el-date-picker
              v-model="formModel.namBl"
              placeholder="Năm phát hành bảo lãnh"
              format="yyyy"
              value-format="yyyy"
              style="width: 100%"
              type="year"
              :picker-options="notAfterToday"
              :clearable="false"
          />
        </el-form-item>
      </el-col>

      <input-text
          prop="kyhieuBl"
          label="Ký hiệu chứng từ bảo lãnh"
          :v-model.sync="formModel.kyhieuBl"
          maxlength="12"
          :number-gird-responsive="4"
      ></input-text>

      <input-text
          prop="soBl"
          label="Số chứng từ bảo lãnh"
          :v-model.sync="formModel.soBl"
          maxlength="12"
          :number-gird-responsive="4"
      ></input-text>
    </el-row>

  </el-form>
</template>

<script>
import {listHq} from "@/untils/listCategory";
import {notAfterTodayPickerOptions, requiredRule} from "@/untils/validate";
import inputText from "@/components/InputEtc/input-text.vue";
import inputSelect from "@/components/InputEtc/input-select.vue";

export default {
  name: "step-thue-va-bao-lanh",
  components: {
    inputSelect,
    inputText
  },
  data() {
    return {
      notAfterToday: notAfterTodayPickerOptions,
      listHq: listHq,
      formModel: {
        nguoiNopThue: '',
        maLyDoBp: '',
        loaiAh: '',
        maNh: '',
        namNh: '',
        kyhieuNh: '',
        soNh: '',
        maNhBl: '',
        namBl: '',
        kyhieuBl: '',
        soBl: '',
      },
      ruleFormBaoLanh: {
        nguoiNopThue: requiredRule('Người nộp thuế')
      },
    }
  }
}
</script>

<style scoped>

</style>
