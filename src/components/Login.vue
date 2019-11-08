<template>
  <div class="login_layout">
    <div class="title"></div>
    <div class="tips _tps_top">
      Already have Account.
      <span @click="$router.push({path: 'register'})">Sign up.</span>
    </div>
    <div class="qrcode">
      <img :src="imgUrl" alt />
    </div>
    <div class="tips _tps_btm">
      Log in using
      <span>Authenticator</span> scan code
    </div>
    <div class="download">
      <span class="link" @click="$utils.openLink(applink)">Download Authenticator App</span>
    </div>
  </div>
</template>
<script>
import * as Storage from '@/utils/auth'
export default {
  data() {
    return {
      applink: 'https://authenticator.ont.io/',
      imgUrl: '',
      checkTimer: null,
      dataId: ''
    }
  },
  methods: {
    async getLogParams() {
      try {
        let result = await this.$http.Account.getSignMsg()
        if (result.desc === 'SUCCESS') {
          let info = result.result.qrcode
          this.dataId = result.result.appId
          this.imgUrl = await this.$utils.createQRcode(info)
          // Check
          clearInterval(this.checkTimer)
          this.checkTimer = setInterval(() => {
            this.getLoginResult()
          }, 3000)
        } else {
          this.$message.error('Get Message Fail!')
          return false
        }
      } catch (error) {
        throw error
      }
    },
    async getLoginResult() {
      try {
        let res = await this.$http.Account.checkSign(this.dataId)
        // console.log('getLoginResult', res.result.result)
        if (res.desc === 'SUCCESS') {
          if (res.result.result === '1') {
            Storage.setToken(res.result.token)
            Storage.setNews('ontid', res.result.ontid)
            Storage.setNews('userName', res.result.userName)
            this.$message.success('Sign In Successful!')
            clearInterval(this.checkTimer)
            this.$router.push({ path: '/' })
            return true
          } else if (res.result.result === '2') {
            this.$message.error('Please Sign Up!')
            clearInterval(this.checkTimer)
            this.$router.push({ path: '/register' })
            return
          }
        } else {
          this.$message.error('Get Sign In Result Fail!')
          clearInterval(this.checkTimer)
          return false
        }
      } catch (error) {
        clearInterval(this.checkTimer)
        throw error
      }
    }
  },
  mounted() {
    this.getLogParams()
  },
  beforeDestroy() {
    clearInterval(this.checkTimer)
  },
}
</script>

<style lang="less" scoped>
.login_layout {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    width: 108px;
    height: 49px;
    background: url(../assets/images/login.svg) no-repeat;
    background-size: contain;
  }
  .tips {
    font-size: 14px;
    color: #636363;
    line-height: 16px;
  }
  ._tps_top {
    margin: 30px 0 40px;
    span {
      color: #1787eb;
      cursor: pointer;
      transition: all 0.5s;
      text-decoration: underline;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .qrcode {
    width: 164px;
    height: 164px;
    img {
      display: block;
      width: 100%;
      height: 100%;
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
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(23, 135, 235, 1);
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
