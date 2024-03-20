<template>
<div>
  <div style="display: flex; justify-content: flex-end;">
    <el-button type="text" icon="el-icon-download">
      <span>Tải file Excel mẫu</span>
    </el-button>

    <el-button type="text" icon="el-icon-tickets" style="margin: 0 3.5em">
      <span>Thêm mới từ Excel</span>
    </el-button>
    <el-button type="text" icon="el-icon-plus" @click="onShowDialogHangHoa">
      <span>Thêm mới hàng hóa</span>
    </el-button>
  </div>
  <pagination
      style="float: right"
      v-show="syncTotal > 0"
      :limit.sync="size"
      :page.sync="page"
      :total="syncTotal"
      @pagination="pagination"
  ></pagination>

  <el-table
      border
      :data="formModel.goodsItems"
  >
    <el-table-column
        type="index"
        label="STT"
        width="50"
        align="center">
    </el-table-column>
    <el-table-column
        prop="commodityCode"
        label="Mã hàng hóa"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="itemName"
        label="Mô tả hàng hóa"
        width="180">
    </el-table-column>
    <el-table-column
        prop="hsCode"
        label="Mã số hàng hóa"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="originCode"
        label="Mã nước xuất xứ"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="quantity_1"
        label="Số lượng (1)"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="quantityUnitCode_1"
        label="Mã đơn vị tính (1)"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="quantity_2"
        label="Số lượng (2)"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="quantityUnitCode_2"
        label="Mã đơn vị tính (2)"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="importTaxClassificationCode"
        label="Mã biểu thuế NK"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="invoiceUnitPrice"
        label="Đơn giá hóa đơn"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="invoiceValue"
        label="Trị giá hóa đơn"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="taxValue"
        label="Trị giá tính thuế"
        summarize
        min-width="180">
    </el-table-column>
    <el-table-column
        align="center"
        fixed="right"
        label="Thao tác"
        min-width="200"
    >
      <!--                  v-if="checkShowBtnThaoTac(scope.row)"-->
      <template slot-scope="scope">
        <div>
          <el-button
              size="mini"
              icon="el-icon-delete"
              plain
              type="danger"
              title="Xoá hàng hóa"
              @click="onDeleteGoods(scope)"
          ></el-button>
          <el-button
              size="mini"
              icon="el-icon-document-copy"
              plain
              title="Sao chép"
              type="primary"
              @click="onCopyRow(scope)"
          ></el-button>
          <el-button
              size="mini"
              icon="el-icon-edit"
              plain
              title="Chỉnh sửa đơn hàng"
              type="primary"
              @click="onEditDetailGoods(scope)"
          ></el-button>
          <!-- <el-button
                   plain
                   title="Xem chi tiết"
                   type="primary"
                   @click="onViewDetail(scope)"
           >
             Xem
           </el-button>-->
        </div>
      </template>
    </el-table-column>
  </el-table>

  <dialog-them-moi-hang-hoa
  :is-show-dialog.sync="dialogHangHoaVisible"
  :mode="mode"
  :form-prop="formProp"
  @update-danh-sach-hang = "formModel.goodsItems.push($event)"
  />
</div>
</template>

<script>
import pagination from "@/components/Pagination/pagination.vue";
import {showAlert, showConfirm} from "@/untils/untils";
import {FORM_MODE, SUCCESS} from "@/untils/constant";
import dialogThemMoiHangHoa from "@/components/KhaiTamToKhai/ToKhaiNhap/components/dialog-them-moi-hang-hoa.vue";
export default {
  name: "step-thong-tin-hang",
  components: {
    pagination,
    dialogThemMoiHangHoa
  },
  data() {
    return {
      dialogHangHoaVisible: false,
      mode: null,
      formProp: {},
      formThemMoiHangHoa: {},
      formModel: {
        goodsItems: [
          { commodityCode: 113, itemName: '42ff', hsCode: 'ewqe', originCode: 'd3333', quantity_1: 'Man', quantityUnitCode_1: 0, quantity_2: 'Man', quantityUnitCode_2: 0, maDvt2: 'Shenzhen' },
        ],
      },

      page: 0,
      size: 20,
    }
  },
  computed: {
    syncTotal() {
      return this.formModel.goodsItems.length
    },
  },
  methods: {
    pagination() {
      this.syncLoadData = true
      const pageIndex = this.page === 0 ? 0 : this.page - 1
      if (pageIndex > (this.syncTotal / this.size)) {
        return
      }
      const pageData = this.formModel.goodsItems.slice(pageIndex * this.size, pageIndex * this.size + this.size)
      /*     if (this.calculateSumRow()) {
             pageData.push(this.calculateSumRow())
           }*/
      this.formModel.goodsItems = pageData
      this.syncTotal = this.formModel.goodsItems.length
      setTimeout(() => {
        this.syncLoadData = false
      }, 200)
    },
    onDeleteGoods(scope) {
      const index = this.formModel.goodsItems.indexOf(scope.row)
      showConfirm(this, 'Bạn có chắc chắn muốn xóa?', () => {
        this.formModel.goodsItems.splice(index, 1)
        showAlert(this, SUCCESS, 'Xóa thành công')
      })
    },
    onCopyRow(scope) {
      this.mode = FORM_MODE.DEFAULT  // set default = copy
      this.formProp = scope.row
      this.dialogHangHoaVisible = true
    },
    onEditDetailGoods(scope) {
      this.mode = FORM_MODE.EDIT
      this.formProp = scope.row
      this.dialogHangHoaVisible = true
    },
    onShowDialogHangHoa() {
      this.mode = FORM_MODE.CREATE
      this.dialogHangHoaVisible = true
    }
  }
}
</script>

<style scoped>

.pagination-container {
  background: #fff;
  padding: 15px;
}

.pagination-container.hidden {
  display: none;
}

.text {
  font-size: 14px;
}


</style>
