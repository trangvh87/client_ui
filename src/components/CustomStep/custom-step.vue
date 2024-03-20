<template>
  <div >
    <div class="step-header-container" />
    <div class="declaration-container">
      <div class="step">
        <el-steps :active="active" :class="customClass" :space="space" align-center>
          <el-step
              v-for="(step, index) of steps"
              :key="step.title"
              icon="el-icon-plus"
              title=""
          >
            <el-popover
                ref="popover"
                slot="icon"
                :open-delay="400"
                :title="step.title"
                placement="top"
                popper-class="visible-tooltip"
                trigger="hover"
                width="auto"
            >
              <div
                  slot="reference"
                  :class="{'success': stepStatus[index] === 'success',
                       'error': stepStatus[index] === 'error'
                      }"
                  style="background-color: white"
              >
              <em
                  slot="reference"
                  :class="active === index ? `active ${step.icon}` : step.icon"
                  class="icon-wrapper"
                  @click="setActive(index)"
              >
                <em v-if="active === index" class="triangle"/>
                <em
                    v-else-if="stepStatus[index] === 'success'"
                    class="step-success el-icon-success"
                />
                <em
                    v-else-if="stepStatus[index] === 'error'"
                    class="step-failure el-icon-warning"
                />
              </em>
              </div>
            </el-popover>
          </el-step>
        </el-steps>

        <div class="step-content-container">
          <div class="step-title">
            {{ steps[active].title === 'Tờ khai' ? 'THÔNG TIN TỜ KHAI' : steps[active].title }}
          </div>
          <div v-if="steps[active]" class="step-content">
            <component
                :is="steps[active].component.default"
                ref="currentComponent"
                :so-tk="soTk"
                :step-index="active"
                :tk-id="tkId"
                :touched="touched[active]"
                v-bind="steps[active].props"
                @update-validation="onUpdateValidation"
            />
          </div>
        </div>
      </div>
      <div class="footer-button-container">
        <div>
          <el-button
              :disabled="active === 0"
              icon="el-icon-arrow-left"
              plain
              @click="setActive(active - 1)"
          >
            Quay lại
          </el-button>
          <span class="step-name">{{ prevStep }}</span>
        </div>
        <slot name="mid-action-dropdown" />
        <div :style="{ 'visibility': active !== steps.length - 1 ? 'visible': 'hidden', float: 'right' }">
          <span class="step-name">{{ nextStep }}</span>
          <el-button @click="setActive(active + 1)">
            Tiếp tục
            <em class="el-icon-arrow-right"/>
          </el-button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

import _ from 'lodash'

export default {
  name: 'CustomStep',
  components: {
  },
  props: {
    customClass: String, /* class css customize*/
    steps /* Danh sách steps component*/: {
      type: Array,
      default: () => [{
        title: '',
        icon: '',
        component: {},
        props: {}
      }],
      required: true
    },
    space /* Khoảng cách của mỗi step, sẽ responsive nếu không truyền. Hỗ trợ tỷ lệ phần trăm.*/: {
      type: [Number, String],
      default: () => undefined
    },
    showStepStatus /* Hiển thị trạng thái của step hay không*/: {
      type: Boolean,
      required: false,
      default: true
    },
    stepStatusPass /* Những step có trạng thái mặc định pass*/: {
      type: Array,
      required: false,
      default: () => []
    },
    tkId: [Number, String],
    soTk: [Number, String]
  },
  data() {
    return {
      maxStep: 0,
      active: 0
    }
  },
  computed: {
    prevStep() {
      if (this.active === 0) {
        return ''
      }
      return this.steps[this.active - 1]?.title
    },
    nextStep() {
      if (this.active === this.steps.length - 1) {
        return ''
      }
      return this.steps[this.active + 1]?.title
    },
    stepStatus() {
      if (_.size(this.stepStatusPass) === 0) {
        return new Array(this.steps.length).fill('wait')
      } else {
        return this.stepStatusPass
      }
    },
    touched() {
      return new Array(this.steps.length).fill(false)
    }
  },
  mounted() {
    this.maxStep = this.steps.length
  },
  methods: {
    isActive(index) {
      return this.active === index
    },

    async setActive(step) {
      if (step < 0 || step > this.maxStep + 1) {
        return
      }
    /*  if (this.showStepStatus) {
        this.onUpdateValidation(this.active, await this.validateCurrentComponent())
      }*/
      if (step > this.maxStep) {
        this.maxStep++
      }
      this.touched[this.active] = true
      this.stepStatus[step] = 'process'
      this.active = step
      this.$emit('emit-form', this.$refs.currentComponent.formModel)
    },
    onUpdateValidation(stepIndex, validationResult) {
      this.stepStatus.splice(
          stepIndex,
          1,
          validationResult ? 'success' : 'error'
      )
      this.$forceUpdate()
    },
    async validateCurrentComponent() {
      try {
        return await this.$refs.currentComponent.isValid()
      } catch (e) {
        return true
      }
    },
    // callback will return true or false
    validateAllStep(callback = () => {
    }) {
      try {
        this.$refs.currentComponent.validateComponent()
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
      if (this.stepStatus.filter((o, i) => i !== this.active).every(e => e === 'success')) {
        try {
          const valid = this.$refs.currentComponent.isValid()
          if (typeof valid === 'boolean') {
            callback(valid)
          } else {
            valid.then(v => {
              callback(v)
            }).catch(() => callback(false))
          }
        } catch (e) {
          callback(true)
        }
      } else {
        callback(false)
      }
    },
    setSuccessToAllSteps() {
      this.stepStatus.fill('success')
      this.touched.fill(true)
      this.$forceUpdate()
    },
    setWaitingToAllSteps() {
      this.active = 0
      this.touched.fill(false)
      this.stepStatus.fill('wait')
      this.$forceUpdate()
    },
    reRender() {
      this.active = -1
      setTimeout(() => {
        this.active = 0
        this.touched.fill(false)
        this.stepStatus.fill('wait')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.declaration-container {
  .active {
    background-color: #EAF3FF !important;
    border: 1px solid #7AB6FF;
    font-size: 25px !important;
    margin: 14px;
  }
}

.el-steps {
  width: 70%;
  margin: auto;
}

::v-deep .el-step.is-center .el-step__line {
  display: none !important;
}

.step-header-container {
  position: relative;
  height: 71px;
  margin: -20px -20px -50px;
  background-color: #FAFAFA;
}

.step-content {
  padding: 10px;
  height: calc(100vh - 390px);
  overflow-y: auto;
}


.step-failure, .step-success {
  position: absolute;
  top: 22px;
  right: -12px;
  font-size: 20px;
}

.step-failure {
  color: #ffba00;
}

.visible-tooltip {
  padding: 10px 10px 0 !important;
  min-width: auto !important;
}

.icon-wrapper {
  border:1px solid #e0e5ee;
  padding: 10px;
  border-radius: 8px;
  font-size: 25px;
}

.footer-button-container {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 15px -145px -17px -27px;
  background: #fafafa;
  padding: 12px 150px 12px 30px
}

.step-name {
  color: #777;
  margin: 10px;
  font-size: 14px;
  text-transform: uppercase;
}

</style>
