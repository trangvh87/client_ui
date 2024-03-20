<template>
  <div id="app-content">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" id="icon-collapse-icon">
      <rect width="26" height="26" rx="6" fill="#F4F9FF"></rect>
      <path d="M18 11L13 16L8 11" stroke="#1472E6" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"
      ></path>
    </symbol>
    <el-card>
      <template #header>
        <div class="card-header">
          <div style="padding-left: 10px;">
            <el-button type="text" icon="el-icon-back" style="padding-right: 20px; font-size: 14px">
              <span>Quay lại</span>
            </el-button>
            <span class="header-text-custom">Tờ khai nhập khẩu</span>
          </div>
          <div>
            <el-button type="text" icon="el-icon-connection" style="font-size: 14px">
              <span>Kết nối chữ ký số</span>
            </el-button>

            <el-button type="text" icon="el-icon-document" style="font-size: 14px">
              <span>Quản lý mẫu tờ khai</span>
            </el-button>

          </div>
        </div>
      </template>

      <custom-step
          v-if="isShowSteps"
          ref="steps"
          :show-step-status="mode !== FORM_MODE.VIEW"
          :step-status-pass="stepStatus"
          :steps="steps"
          @emit-form="getData"
      >
        <template slot="mid-action-dropdown">
          <action-dropdown
              :dropdown-list="actionDropdownList"
              @command="handleCommand"
              @onDelete="onXoa"
              @onSend="onLuuVaKhaiTam"
          />
        </template>
      </custom-step>

      <el-dialog
          :close-on-click-modal="false"
          :destroy-on-close="true"
          :visible.sync="isShowMauTk"
          title="Lưu mẫu tờ khai"
          width="40%"
          @close="closeDialogMau"
      >
        <luu-mau ref="formMau" @closeDialog="closeDialogMau($event)" />
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import {ACTION_CODE, ERROR, FORM_MODE, SUCCESS} from "@/untils/constant";
import customStep from "@/components/CustomStep/custom-step.vue";
import actionDropdown from "@/components/CustomStep/action-dropdown.vue";
import {showAlert, showConfirm} from "@/untils/untils";
import LuuMau from "@/components/LuuMauToKhai/luu-mau.vue";
import {cloneDeep} from "lodash";

export default {
  components: {
    LuuMau,
    customStep,
    actionDropdown
  },
  name: "them-sua-to-khai-nhap",
  data() {
    return {
      mode: 0,
      FORM_MODE,
      isShowSteps: true,
      stepStatus: new Array(11).fill('wait'),
      paramData: {
        content: {}
      },
      isShowMauTk: false,
      currentActionCode: ACTION_CODE.LUU_MAU,
    }
  },
  props: {
    loaiKhaiBao: {
      type: String,
      default: ''
    }
  },
  computed: {
    steps() {
      return [
        {
          title: 'Thông tin chung',
          icon: 'el-icon-info',
          component: require('./components/step-thong-tin-chung.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Danh sách hàng',
          icon: 'el-icon-s-order',
          component: require('./components/step-thong-tin-hang.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Đơn vị xuất nhập khẩu',
          icon: 'el-icon-suitcase-1',
          component: require('./components/step-don-vi-xuat-nhap-khau.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Vận đơn',
          icon: 'el-icon-document',
          component: require('./components/step-van-don.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Hợp đồng, Hóa đơn, Giấy phép',
          icon: 'el-icon-ship',
          component: require('./components/step-hop-dong-hoa-don.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Tờ khai trị giá',
          icon: 'el-icon-reading',
          component: require('./components/step-to-khai-tri-gia.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Thuế và bảo lãnh',
          icon: 'el-icon-document',
          component: require('./components/step-thue-va-bao-lanh.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Đính kèm khai báo điện tử',
          icon: 'el-icon-paperclip',
          component: require('./components/step-dinh-kem-khai-bao-dien-tu.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Đính kèm danh sách CTDT khai báo trước',
          icon: 'el-icon-receiving',
          component: require('./components/step-dinh-kem-danh-sach-ctdt.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Thông tin trung chuyển',
          icon: 'el-icon-truck',
          component: require('./components/step-thong-tin-trung-chuyen.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        },
        {
          title: 'Thông tin khác',
          icon: 'el-icon-chat-dot-square',
          component: require('./components/step-thong-tin-khac.vue'),
          props: {'step-index': this.stepIndex, loaiKhaiBaoDaChon: this.loaiKhaiBao}
        }
      ]
    },
    actionDropdownList() {
      return [
        {
          command: {command: 'onSave'},
          label: 'Lưu',
          description: 'Lưu thông tin tờ khai'
        },
        {
          command: {command: 'onSaveTemplate'},
          label: 'Lưu mẫu',
          description: 'Lưu thông tin tờ khai vào danh sách quản lý mẫu'
        },
        {
          command: {command: 'onLuuVaTaoMau'},
          label: 'Lưu và tạo mẫu',
          description: 'Lưu thông tin tờ khai vào hệ thống và danh sách quản lý mẫu'
        },
      ]
    },
  },
  methods: {
    handleCommand({command, params}) {
      this[command](params)
    },
    onSave() {
      this.$refs.steps.validateAllStep(valid => {
        if (!valid) {
          return showAlert(this, ERROR, 'Vui lòng kiểm tra lại thông tin ở tất cả các trang')
        }
        showConfirm(this, 'Bạn có chắc chắn muốn lưu?', this.actionSave)
      })
    },
    actionSave() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255,0.7)'
      })
      const _this = this;

      try {
        request(this.paramData, 'ToKhaiNhap_Insert ', function (obj) {
          if (obj.status && obj.status != 200 && obj.error) {
            showAlert(_this, ERROR, 'Thêm mới tờ khai tạm thất bại')
          } else {
            showAlert(_this, SUCCESS, 'Thêm mới thông tin khai tạm thành công')

          }
        });
      } catch (e) {
        console.log(e)
      } finally {
        loading.close()
      }
    },
    onSaveTemplate() {
      this.$refs.steps.validateAllStep(valid => {
        if (!valid) {
          return showAlert(this, ERROR, 'Vui lòng kiểm tra lại thông tin ở tất cả các trang')
        }
        this.currentActionCode = ACTION_CODE.LUU_MAU
        this.isShowMauTk = true
      })
    },
    onLuuVaTaoMau() {
      this.$refs.steps.validateAllStep(valid => {
        if (!valid) {
          return showAlert(this, ERROR, 'Vui lòng kiểm tra lại thông tin ở tất cả các trang')
        }
        this.currentActionCode = ACTION_CODE.LUU_VA_TAO_MAU
        this.isShowMauTk = true
      })
    },
    closeDialogMau(val) {
      if (val) {
        const mess = this.currentActionCode === ACTION_CODE.LUU_MAU ? 'Bạn có chắc chắn muốn lưu mẫu?' : 'Bạn có chắc chắn muốn lưu và tạo mẫu?'
        const successMess = this.currentActionCode === ACTION_CODE.LUU_MAU ? 'Lưu mẫu thành công' : 'Lưu và tạo mẫu thành công'
        // const api = this.currentActionCode === ACTION_CODE.LUU_MAU ? this.api.LUU_MAU : this.api.LUU_VA_TAO_MAU
        showConfirm(this, mess, () => {
          this.isShowMauTk = false
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(255,255,255,0.7)'
          })
          const _this = this;
          try {
            const objData = cloneDeep(this.paramData)
            objData.objQlMau = {
              'id': 0,
              // 'loaiCt': '',
              'maDnKb': this.paramData.maDnKb,
              'maDnXnk': this.paramData.dvXnkMa,
              'maMau': val.maMau,
              // 'mauCt': '',
              // 'ngayTao': '',
              // 'nguoiTao': '',
              'tenMau': val.tenMau
            }
            request(objData, this.currentActionCode === ACTION_CODE.LUU_MAU ? 'ToKhaiNhap_Insert ' : 'ToKhaiNhap_SaveAndCreateTemplate' , function (obj) {
              if (obj.status && obj.status != 200 && obj.error) {
                showAlert(_this, ERROR, 'Thêm mới tờ khai tạm thất bại')
              } else {
                showAlert(_this, SUCCESS, successMess)

              }
            });

          }catch (e) {
            console.log(e)
          }finally {
            loading.close()
          }

        })
      } else {
        this.isShowMauTk = false
      }
    },
    onXoa() {
      if (this.mode === FORM_MODE.VIEW) {
        this.onDelete()
      } else {
        this.onClearForm()
      }
    },
    onClearForm(callback) {
      showConfirm(this, 'Tất cả thông tin đã điền sẽ bị xoá. Tiếp tục?', () => {
        // this.clearForm()
        this.$message({
          type: 'success',
          showClose: true,
          message: 'Đã xoá thông tin'
        })
        if (typeof callback === 'function') {
          callback()
        }
      })
    },

    getData(e) {
      Object.assign(this.paramData.content, e)
    },
    onLuuVaKhaiTam() {
      console.log(this.paramData, 'vào')
      /*      const paramList = {
              lstTkHh : this.formThemMoiHangHoa.lstTkHh,
              lstTkVd: this.formVanDon.lstTkVd,
              lstTkVbpqKhac: this.formHopDong.lstTkVbpqKhac,
              lstTkGp: this.formHopDong.lstTkGp,
              lstTkKdc: this.formToKhaiTriGia.lstTkKdc,
              lstTkKbdt: this.formDinhKemKhaiBao.lstTkKbdt,
              lstTkTc: this.formThongTinTrungChuyen.lstTkTc,
              lstTkXktc: this.formThongTinKhac.lstTkXktc,
            }

            this.delListItem(this.formThemMoiHangHoa.lstTkHh)
            this.delListItem(this.formHopDong.lstTkGp)
            this.delListItem(this.formVanDon.lstTkVd)
            this.delListItem(this.formHopDong.lstTkVbpqKhac)
            this.delListItem(this.formToKhaiTriGia.lstTkKdc)
            this.delListItem(this.formDinhKemKhaiBao.lstTkKbdt)
            this.delListItem(this.formThongTinTrungChuyen.lstTkTc)
            this.delListItem(this.formThongTinKhac.lstTkXktc)


            const paramObjTk = {
              objTk: {
                ...this.formToKhai,
                ...this.formThemMoiHangHoa,
                ...this.formDonviXuatNhapKhau,
                ...this.formVanDon,
                ...this.formHopDong,
                ...this.formToKhaiTriGia,
                ...this.formThueBaoLanh,
                ...this.formDinhKemKhaiBao,
                ...this.formDinhKemDanhSachCTDT,
                ...this.formThongTinTrungChuyen,
                ...this.formThongTinKhac,
              }
            }

            const params = {
              ...paramList, ...paramObjTk
            }
            console.log('params', params)*/


      /*      this.$refs.steps.validateAllStep(valid => {
              if (!valid) {
                return showAlert(this, ERROR, 'Vui lòng kiểm tra lại thông tin ở tất cả các trang')
              }
              if (!this.selectedDigitalSignature) {
                return showAlert(this, ERROR, 'Phải kết nối thiết bị chữ ký số trước khi gửi tờ khai')
              }

              // co the ko can
              let enumEdocTypeVar
              let loaiKbVar
              if (this.enumPreEdocType === enumPreEdocType.KTTKN_DK && `${this.formDataModel.objTk.loaiSH}` === MA_CHUC_NANG_TK.SUA) {
                enumEdocTypeVar = enumPreEdocType.KTTKN_S
                loaiKbVar = MA_CHUC_NANG_TK.SUA
              } else {
                enumEdocTypeVar = this.enumPreEdocType
                loaiKbVar = this.loaiKb
              }
              // ko can

              showConfirm(this, 'Bạn có chắc chắn muốn lưu và gửi tờ khai?', () => {
                this.beforeSave()
                signSaveAndSend(this, ConstantAPI.KTTKN_DK.LUU_GUI, this.formDataModel, ConstantAPI.KTTKN_DK.GUI_NHIEU, 'Khai báo thành công', {
                  enumPreEdocType: enumEdocTypeVar,
                  loaiKb: loaiKbVar
                })
              })
            })*/
    },
  }
}
</script>

<style scoped>

body {
  font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app-content {
  font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
}

.header-text-custom {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #000000;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep .el-card .el-card__header {
  padding: 8px 12px;
}

::v-deep .el-form-item__label {
  font-weight: 500;
}

</style>
