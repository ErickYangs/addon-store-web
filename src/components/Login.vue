<template>
  <div class="login_layout">
    <div class="title"></div>
    <div class="tips _tps_top">
      Already have Account.
      <span @click="$router.push({path: 'register'})">Sign up.</span>
    </div>
    <div class="qrcode">
      <img src alt />
    </div>
    <div class="tips _tps_btm">
      Log in using
      <span>Authenticator</span> scan code
    </div>
    <div class="download">
      <span class="link">Download Authenticator App</span>
    </div>
  </div>
</template>
<script>
export default {

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
    background: url(../assets/images/login.png) no-repeat;
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
