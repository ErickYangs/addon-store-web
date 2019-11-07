<template>
  <div class="account_layout">
    <div class="end_bg">
      <div class="end_left"></div>
      <div class="end_right"></div>
    </div>
    <div class="mid_bg">
      <div class="bg1"></div>
      <div class="bg2"></div>
    </div>
    <div class="tp_box">
      <div class="tp_home">
        <div class="logo"></div>
        <div class="lang_layout">
          <lang-div></lang-div>
        </div>
      </div>
    </div>
    <div class="desc_lay">
      <div class="content">
        <div class="desc_bx">
          <span>DDXF</span> is a decentralized data exchange and collaboration framework. DDXF is able to tokenize any valuable data and provides data traceability and cross-system data processing.
        </div>
      </div>
    </div>
    <div class="center_layout">
      <div class="_left"></div>
      <div class="_right">
        <div class="account_msg">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import langDiv from '../components/model/LangB'
export default {
  components: {
    langDiv
  }
}
</script>

<style lang="less" scoped>
.account_layout {
  width: 100%;
  height: 100%;
  position: relative;
  .end_bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1;
    .end_left {
      height: 100%;
      flex: 2;
      background: #1787eb;
    }
    .end_right {
      height: 100%;
      flex: 1;
      background: #fff;
    }
  }
  .mid_bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    .bg1 {
      width: 252px;
      height: 122px;
      background: url(../assets/images/bg1.png) no-repeat;
      background-size: contain;
      position: absolute;
      top: -10px;
      left: 10%;
    }
    .bg2 {
      width: 1563px;
      height: 263px;
      background: #000;
      background: url(../assets/images/bg2.png) no-repeat;
      background-size: contain;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  .tp_box {
    width: 100%;
    height: 30px;
    position: absolute;
    left: 0;
    top: 100px;
    z-index: 3;
  }
  .tp_home {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 178px;
      height: 28px;
      background: url(../assets/images/logo.png) no-repeat;
      background-size: contain;
      cursor: pointer;
    }
    .lang_layout {
      width: 160px;
      height: 30px;
    }
  }
  .desc_lay {
    width: 100%;
    height: 530px;
    position: absolute;
    left: 0;
    top: 26vh;
    z-index: 5;
    .content {
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .desc_bx {
        width: 614px;
        font-size: 32px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);
        line-height: 42px;
        span {
          color: rgba(255, 255, 255, 1);
          font-size: 42px;
          font-weight: 900;
        }
      }
    }
  }
  .center_layout {
    width: 100%;
    height: 530px;
    position: absolute;
    left: 0;
    top: 26vh;
    z-index: 5;
    display: flex;
    ._left,
    ._right {
      height: 100%;
    }
    ._left {
      height: 100%;
      flex: 2;
    }
    ._right {
      height: 100%;
      flex: 1;
      position: relative;
      .account_msg {
        width: 460px;
        height: 530px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        transform: translateX(-50%);
        position: absolute;
        // z-index: 9;
      }
    }
  }
}
@media only screen and (min-width: 1921px) {
  .account_layout {
    .tp_home {
      max-width: 1440px;
    }
  }
}
@media only screen and (min-width: 1350px) and (max-width: 1680px) {
  .account_layout {
    .desc_lay {
      .content {
        .desc_bx {
          width: 580px;
        }
      }
    }
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1349px) {
  .account_layout {
    .desc_lay {
      .content {
        .desc_bx {
          width: 520px;
        }
      }
    }
  }
}
@media only screen and (min-width: 960px) and (max-width: 1119px) {
  .account_layout {
    .desc_lay {
      .content {
        .desc_bx {
          width: 420px;
        }
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .tp_home,
  .content {
    padding: 0 20px;
  }
}
@media only screen and (max-width: 1000px) {
  .account_layout {
    .desc_lay {
      .content {
        .desc_bx {
          width: 380px;
        }
      }
    }
  }
}
</style>

