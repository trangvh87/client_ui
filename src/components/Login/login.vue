<template>
  <div>
    <div class="side-container" />
    <div class="main-form">
      <el-card>
        <el-row class="row-container">
          <div class="left-content">
            <div class="header">
              <div>
                <img alt="client-hq" src="/logo-hq.png">
                <h1>KHAI BÁO HẢI QUAN VNCDS</h1>
              </div>
            </div>
          </div>

          <el-col :lg="8" :md="9" :push="13" :sm="11" :xl="8" :xs="11" class="right-content">
            <h2 style="text-align: center; margin-top: -0.9em;">Đăng nhập hệ thống</h2>
            <el-form
                size="large"
                class="login-form"
                :model="model"
                :rules="rules"
                ref="form"
                @submit.native.prevent="login"
            >
              <el-form-item prop="username">
                <el-input v-model="model.username" placeholder="Tên đăng nhập" prefix-icon="el-icon-user">
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                    v-model="model.password"
                    placeholder="Mật khẩu"
                    type="password"
                    prefix-icon="el-icon-lock"
                ></el-input>
              </el-form-item>
              <div style="height: 1.5em"/>
              <el-form-item>
                <el-button
                    :loading="loading"
                    class="login-button"
                    type="primary"
                    size="medium"
                    native-type="submit"
                    block
                >Đăng nhập</el-button>
              </el-form-item>
              <el-link class="forgot-password" :underline="false" type="primary">Quên mật khẩu ?</el-link>
<!--              <a class="forgot-password" ></a>-->
            </el-form>
          </el-col>
        </el-row>
      </el-card>

    </div>
  </div>
</template>

<script>

import SvgIcon from '@/components/SvgIcon/index.vue'
import {requiredRule} from "@/untils/validate";

export default {
  name: 'LoginEnt',
  components: {
    SvgIcon
/*    LoginVnEId: () => import('./LoginVnEId'),
    Captcha: () => import('@/views/login/CaptchaKey')*/
  },
  data() {
    const label = labelInput => {
      return `${labelInput} bắt buộc`
    }

    const validatePassword = (_rule, value, callback) => {
      if (!value) {
        callback(new Error(label('Mật khẩu')))
      } else if (value.length < 8 || value.length > 50) {
        callback(new Error('Mật khẩu từ 8 -> 50 ký tự'))
      } else {
        callback()
      }
    }
    return {
      validCredentials: {
        username: "lightscope",
        password: "lightscope"
      },
      model: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [requiredRule('Tên đăng nhập')],
        password: [
          requiredRule('Mật khẩu'),
          {
           validator: validatePassword, trigger: ['change', 'blur']
          }
        ]
      }
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      if (
          this.model.username === this.validCredentials.username &&
          this.model.password === this.validCredentials.password
      ) {
        this.$message.success("Login successfull");
      } else {
        this.$message.error("Username or password is invalid");
      }
    }
  }
}
</script>

<style lang="scss" >

.side-container {
  background-color: #1472E6;
  position: absolute;
  height: 100%;
  width: 345px;
  z-index: 1;
}

.main-form {
  border-radius: 12px;
  padding: 35px 150px 40px 150px;
  position: relative;
  z-index: 2;
}

.container-content {
  position: absolute;
  left: 50%;
  top: 65%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 23%;
  height: 113%;
}

.header {
  padding: 20px 20px;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login {
  width: 100%;
  height: 60%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 6px
}

.login-button {
  width: 100%;
  margin-top: 40px;
  height: 32px;
  border-radius: 5px;
  border: 1px solid #ebebeb;
}

.forgot-password {
  font-size: 20px !important;
  margin-top: 10px;
}

.login .header {
  padding: 10px 20px;
  .logo {
    font-family: "Open Sans";
    letter-spacing: 3px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo .part-2 {
    color: #d64545;
  }
}

.login .el-input__inner {
  width: 25em;
  height: 3em;
  border-radius: 5px;
  border: 1px solid #ebebeb;
}

.login .el-form-item__content {
padding-bottom: 15px;
}

.login .el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}

$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__inner:focus {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}

@media (max-height: 1080px) {
  .row-container {
    min-height: calc(100vh - 85px);
  }
}

.left-content {
  position: absolute;
  height: 100%;
  width: 40%;
  background: linear-gradient(1deg, rgba(58, 105, 197, 0) 0%, #3992FF 90.86%) center top, linear-gradient(180deg, rgba(58, 105, 197, 0) 0%, #1472E6 90.86%) center top, url(../../assets/images/customs-bg.png) bottom no-repeat;
  background-size: cover;
  border-radius: 12px 0 0 12px;
  padding: 25px 10px 10px 25px;
  overflow: auto;

  .header {
    h1 {
      color: white;
      display: inline-block;
      vertical-align: middle;
      margin: -3em 0 0 1em;
      font-family: 'UTM Avo', sans-serif;
      font-weight: 700;
      font-size: 30px;
    }
  }

  .um-btn {
    width: 267px;
    height: 45px;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    color: #FFFFFF;
    font-weight: 500;
    font-size: 16px;

    &:hover {
      background: rgb(0, 0, 0, 0.3);
    }

    .view-um-btn {
      h4 {
        vertical-align: middle;
        display: inline-block;
        margin: -1.2em 0 0 5px;
        font-weight: 500;
      }
    }
  }

  @media (max-width: 1366px) {
    padding: 20px 20px 10px 20px;

    .header {
      h1 {
        margin: -3em 0 0 1em;
        font-size: 18px;
      }

      img {
        width: 70px;
        height: 70px;
      }
    }

    .um-btn {
      width: 230px;
      height: 45px;
      font-size: 14px;
    }
  }

  @media (max-width: 1440px) {
    padding: 20px 20px 10px 20px;

    .header {
      h1 {
        margin: -3em 0 0 1em;
        font-size: 18px;
      }

      img {
        width: 70px;
        height: 70px;
      }
    }

    .um-btn {
      width: 230px;
      height: 45px;
      font-size: 14px;
    }
  }

  @media (max-width: 1280px) {
    padding: 10px 10px 10px 10px;

    .header {
      h1 {
        margin: -3em 0 0 1em;
        font-size: 16px;
      }

      img {
        width: 60px;
        height: 60px;
      }
    }

    .um-btn {
      width: 200px;
      height: 45px;
      font-size: 12px;
    }
  }
}

.right-content {
  border-radius: 12px 0 0 12px;
  padding: 30px 50px 0 50px;
  margin-top: 4em;

 /* .login-form {
    position: relative;
    left: 56em;
  }*/

  .el-input {
    transition: all 0.3s;
    position: relative;
    font-size: 15px;
  }

  .el-input__inner {
    border: 0;
    border-bottom: 1px solid #E0E0E0;
    margin-top: 10px;
    height: 40px;
    outline: none;
    width: 100%;
    font-size: 14px;
    transition: all 0.3s;
  }

  .el-form-item__error {
    padding-top: 9px;
  }

  .el-input__inner:focus {
    border-color: #3992FF;
    box-shadow: 1px 2px 2px hsl(220deg 60% 50% / 0.2),
    1px 1px 1px hsl(220deg 60% 50% / 0.2),
    2px 2px 2px hsl(220deg 60% 50% / 0.2),
    4px 4px 4px hsl(220deg 60% 50% / 0.2),
    8px 8px 8px hsl(220deg 60% 50% / 0.2);
  }

  .el-input--prefix .el-input__inner {
    padding-left: 30px;
  }

  .el-input__prefix {
    font-size: 20px;
    position: absolute;
    top: 4px;
    height: 100%;
    color: #c0c4cc;
    text-align: center;
    left: 5px;
  }

  .el-input__suffix {
    position: absolute;
    top: 15px;
    height: 100%;
    color: #c0c4cc;
    text-align: right;
    left: 5px;
  }

  .default {
    .el-input__suffix {
      top: 5px !important;
    }
  }

  @media (max-width: 1366px) {
    padding: 10px 20px 10px 20px;

    .el-input {
      font-size: 13px;
    }

    .el-input__inner {
      margin-top: 11px;
      height: 35px;
      font-size: 13px;
    }

    .el-form-item__error {
      padding-top: 7px;
    }

    .el-input--prefix .el-input__inner {
      padding-left: 25px;
    }
  }

  @media (max-width: 1440px) {
    padding: 10px 20px 10px 20px;

    .el-input {
      font-size: 13px;
    }

    .el-input__inner {
      margin-top: 11px;
      height: 35px;
      font-size: 13px;
    }

    .el-form-item__error {
      padding-top: 7px;
    }

    .el-input--prefix .el-input__inner {
      padding-left: 25px;
    }
  }

  @media (max-width: 1280px) {
    padding: 10px 20px 10px 20px;

    .el-input {
      font-size: 13px;
    }

    .el-input__inner {
      margin-top: 16px;
      height: 28px;
      font-size: 12px;
    }

    .el-form-item__error {
      padding-top: 7px;
    }

    .el-input--prefix .el-input__inner {
      padding-left: 22px;
    }
  }
}

.el-card {
  border-radius: 30px 0 0 12px;
  border: none;
  padding: 0 !important;

  .el-card__body {
    padding: 0 !important;
  }
}


</style>
