<template>
  <div class="register_layout">
    <div class="title"></div>
    <div class="tips _tps_top">
      {{$t('signup.tips1')}}
      <span @click="$router.push({ path: 'login' })">{{$t('signup.signin')}}</span>
    </div>
    <div class="center_box">
      <div class="acc_bx" v-if="!isQrcode">
        <div class="input_area">
          <input @keyup.enter="sendName" :placeholder="langTip.placehodler" v-model="accountName" />
        </div>
        <div class="btn" @click="sendName">{{$t('signup.next')}}</div>
      </div>
      <div class="qrcode" v-else>
        <img :src="url" alt />
      </div>
    </div>

    <div class="download">
      <span class="link" @click="$utils.openLink(applink)"
        >Download Authenticator App</span
      >
    </div>
  </div>
</template>
<script>
import * as Storage from '@/utils/auth'
export default {
  data() {
    return {
      langTip: {
        placehodler: this.$t('signup.createTip')
      },
      isQrcode: false,
      applink: 'https://authenticator.ont.io/',
      accountName: '',
      url: '',
      dataId: '',
      checkTimer: null
    }
  },
  methods: {
    async sendName() {
      if (!this.accountName) {
        this.$message.error('Please Enter Yours Account Name!')
        return false
      }
      try {
        this.isDisable = true
        let params = {
          userName: this.accountName
        }
        let res = await this.$http.Account.postRegister(params)
        // console.log('res', res)
        if (res.desc !== 'SUCCESS') {
          this.$message.error(res.desc)
          return false
        }
        let qrcodeParams = res.result.qrcode
        this.dataId = res.result.appId
        this.isQrcode = true
        this.url = await this.$utils.createQRcode(qrcodeParams)
        clearInterval(this.checkTimer)
        this.checkTimer = setInterval(() => {
          this.checkResult()
        }, 3000)
      } catch (error) {
        throw error
      }
    },
    async checkResult() {
      try {
        let res = await this.$http.Account.checkRegister(this.dataId)
        // // console.log('checkout', res)
        if (res.desc !== 'SUCCESS') {
          clearInterval(this.checkTimer)
          this.$message.error('Sign Up Fail!')
          return false
        }
        if (res.result.result === '1') {
          this.$message.success('Sign Up Success!')
          clearInterval(this.checkTimer)
          Storage.setToken(res.result.token)
          Storage.setNews('ontid', res.result.ontid)
          Storage.setNews('userName', res.result.userName)
          this.$router.push({ path: '/' })
          return true
        } else if (res.result.result === '0') {
          clearInterval(this.checkTimer)
          this.$message.error('Sign Up Fail!')
          return false
        } else if (res.result.result === '2') {
          clearInterval(this.checkTimer)
          this.isQrcode = false
          this.url = ''
          this.$message.error('Already Registed!')
          return false
        } else {
        }
      } catch (error) {
        clearInterval(this.checkTimer)
        this.$message.error(error)
        return false
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.checkTimer)
  }
}
</script>

<style lang="less">
.register_layout {
  height: 530px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    width: 134px;
    height: 49px;
    background: url(../assets/images/signup.png) no-repeat;
    background-size: contain;
  }
  .tips {
    font-size: @14px;
    color: #636363;
    line-height: 16px;
  }
  ._tps_top {
    margin: 30px 0 40px;
    span {
      color: @theme-color;
      cursor: pointer;
      transition: all 0.5s;
      text-decoration: underline;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .center_box {
    width: 200px;
    height: 200px;
    margin-bottom: 60px;
    .qrcode {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 164px;
        height: 164px;
      }
    }
    .acc_bx {
      .input_area {
        width: 100%;
        height: 30px;
        margin: 40px 0 80px;
        input {
          border: none;
          outline: none; /*去掉选中状态边框*/
          background-color: rgba(0, 0, 0, 0); /*透明背景*/
          width: 100%;
          height: 30px;
          line-height: 22px;
          padding-left: 4px;
          padding-top: 4px;
          padding-bottom: 4px;
          font-size: @14px;
          border-bottom: 1px solid #e4e4e4;
          font-weight: 400;
          caret-color: #1684e6;
          &::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            font-size: 16px;
            color: rgba(204, 204, 204, 1);
            line-height: 16px;
            padding-left: 4px;
            font-weight: 400;
          }
          &:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            font-size: 16px;
            color: rgba(204, 204, 204, 1);
            line-height: 16px;
            padding-left: 4px;
            font-weight: 400;
          }
          &::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            font-size: 16px;
            color: rgba(204, 204, 204, 1);
            line-height: 16px;
            padding-left: 4px;
            font-weight: 400;
          }
          &:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            font-size: 16px;
            color: rgba(204, 204, 204, 1);
            line-height: 16px;
            padding-left: 4px;
            font-weight: 400;
          }
        }
      }
      .btn {
        width: 200px;
        height: 50px;
        background: linear-gradient(
          90deg,
          rgba(11, 134, 240, 1) 0%,
          rgba(60, 204, 251, 1) 100%
        );
        border-radius: 25px;
        font-size: 18px;
        line-height: 50px;
        font-weight: 900;
        color: #fff;
        cursor: pointer;
        transition: all 0.6s;
        text-align: center;
        &:hover {
          opacity: 0.95;
        }
      }
    }
  }

  ._tps_btm {
    margin: 58px 0 30px;
    span {
      font-weight: 900;
    }
  }
  .download {
    line-height: 20px;
    span {
      font-size: @14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      text-decoration: underline;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
