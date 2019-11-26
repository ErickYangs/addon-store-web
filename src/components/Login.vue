<template>
  <div class="login_layout">
    <div class="title"></div>
    <div class="tips _tps_top">
      Already have Account.
      <span @click="$router.push({ path: 'register' })">Sign up.</span>
    </div>
    <div class="qrcode">
      <img :src="imgUrl" alt />
    </div>
    <div class="tips _tps_btm">
      Log in using
      <span>Authenticator</span> scan code
    </div>
    <div class="download_box">
      <div class="media_btn hoveraction" @click="openNewPage(appstoreUrl)">
        <img src="../assets/images/apple.svg" alt />
      </div>
      <div
        class="media_btn ml21 hoveraction"
        @click="openNewPage(googleplayUrl)"
      >
        <img src="../assets/images/google.svg" alt />
      </div>
      <div
        class="qrcode_box ml21"
        @mouseenter="flag && fadeIn()"
        @mouseleave="flag && fadeLeave()"
      >
        <img class="s_code_img" src="../assets/images/qrcode.svg" alt />
        <div class="qrcode" ref="qrcode_l" id="qrcode_d">
          <img src="../assets/images/qrcode2.png" alt srcset />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Storage from '@/utils/auth'
import $ from 'jquery'

export default {
  data() {
    return {
      applink: 'https://authenticator.ont.io/',
      imgUrl: '',
      checkTimer: null,
      dataId: '',
      flag: true,
      appstoreUrl:
        'https://apps.apple.com/cn/app/ontology-authenticator/id1483309693',
      googleplayUrl:
        'https://play.google.com/store/apps/details?id=com.github.ontio.ontoauth'
    }
  },
  methods: {
    async getLogParams() {
      try {
        let result = await this.$http.Account.getSignMsg()
        if (result.desc !== 'SUCCESS') {
          this.$message.error('Get Message Fail!')
          return false
        }
        let info = result.result.qrcode
        this.dataId = result.result.appId
        this.imgUrl = await this.$utils.createQRcode(info)
        // Check
        clearInterval(this.checkTimer)
        this.checkTimer = setInterval(() => {
          this.getLoginResult()
        }, 3000)
      } catch (error) {
        throw error
      }
    },
    async getLoginResult() {
      try {
        let res = await this.$http.Account.checkSign(this.dataId)
        // // console.log('getLoginResult', res.result.result)
        if (res.desc !== 'SUCCESS') {
          this.$message.error('Get Sign In Result Fail!')
          clearInterval(this.checkTimer)
          return false
        }
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
      } catch (error) {
        clearInterval(this.checkTimer)
        throw error
      }
    },
    fadeIn: function() {
      $('#qrcode_d')
        .stop(false, true)
        .fadeIn()
    },
    fadeLeave: function() {
      $('#qrcode_d')
        .stop(false, true)
        .hide()
    },
    openNewPage(url) {
      window.open(url, '_blank')
    }
  },
  mounted() {
    this.getLogParams()
  },
  beforeDestroy() {
    clearInterval(this.checkTimer)
  }
}
</script>

<style lang="less" scoped>
.login_layout {
  min-height: 550px;
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
    margin: 58px 0 40px;
    span {
      font-weight: 900;
    }
  }
  .download_box {
    display: flex;
    justify-content: center;

    .media_btn {
      width: 100px;
      height: 30px;
      cursor: pointer;
      transition: all 0.5s;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .media_btn.hoveraction:hover {
      background: #fafafa;
    }
    .apkbtn {
      display: none;
    }
    .qrcode_box {
      width: 30px;
      height: 30px;
      cursor: pointer;
      position: relative;
      transition: all 0.5s;
      &:hover {
        background: #fafafa;
      }
      .s_code_img {
        width: 100%;
      }
    }
    .qrcode {
      position: absolute;
      left: -180%;
      top: 130%;
      width: 140px;
      height: 140px;
      background: #fff;
      transform: translateX(4%);
      display: none;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 10px #dfdfdf;
      img {
        display: block;
        width: 120px;
        height: 120px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .ml21 {
      margin-left: 20px;
    }
  }
}
</style>
