<template>
  <div class="error_404_wrap">
    <div class="home_logo hover6" @click="$router.push({ path: '/' })"></div>
    <div class="cray"></div>
    <div class="lg_title">{{$t('pageNot.main_title')}}</div>
    <div class="md_desc">
      DDXF is a decentralized data exchange and collaboration framework. DDXF is
      able to tokenize any valuable data and provides data traceability and
      cross-system data processing.
    </div>
    <div class="btn_home">
      <span class="hover6" @click="$router.push({ path: '/' })"
        >{{$t('pageNot.return_home')}}</span
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.error_404_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .home_logo {
    width: 120px;
    height: 20px;
    background: url(../../assets/images/home_logo.svg) no-repeat center;
    background-size: contain;
    cursor: pointer;
    position: absolute;
    left: 30px;
    top: 20px;
    &:hover {
      opacity: 0.8;
    }
  }
  .cray {
    width: 120px;
    height: 120px;
    background: url(../../assets/images/cray.svg) no-repeat center;
    background-size: contain;
    margin-bottom: 60px;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-name: breathe;
    -webkit-animation-duration: 1500ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
  }
  .lg_title {
    height: 57px;
    font-size: 48px;
    font-weight: 900;
    color: rgba(0, 0, 0, 1);
    line-height: 57px;
    margin-bottom: 30px;
  }
  .md_desc {
    width: 100%;
    max-width: 620px;
    font-size: @14px;
    font-family: PingFangSC-Ultralight, PingFang SC;
    font-weight: 200;
    text-align: center;
    color: rgba(0, 0, 0, 1);
    line-height: 20px;
    margin-bottom: 80px;
  }
  .btn_home {
    span {
      display: block;
      width: 200px;
      height: 50px;
      background: linear-gradient(
        90deg,
        rgba(11, 134, 240, 1) 0%,
        rgba(60, 204, 251, 1) 100%
      );
      border-radius: 25px;
      font-size: 18px;
      font-weight: 900;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      cursor: pointer;
      text-align: center;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
@-webkit-keyframes breathe {
  0% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}
</style>
