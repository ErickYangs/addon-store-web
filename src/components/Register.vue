<template>
  <div class="register_layout">
    <div class="title"></div>
    <div class="tips _tps_top">
      Already have Account.
      <span @click="$router.push({path: 'login'})">Sign in.</span>
    </div>
    <div class="center_box">
      <div class="acc_bx">
        <div class="input_area">
          <input placeholder="Please enter name" />
        </div>
        <div class="btn">Next</div>
      </div>
      <div class="qrcode" v-if="isQrcode">
        <img src alt />
      </div>
    </div>

    <div class="download">
      <span class="link">Download Authenticator App</span>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            isQrcode: false
        }
    },
}
</script>

<style lang="less">
.register_layout {
  height: 100%;
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
          font-size: 14px;
          border-bottom: 1px solid #e4e4e4;
          font-weight: 400;
          caret-color: #1684E6;
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
      font-size: 14px;
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
