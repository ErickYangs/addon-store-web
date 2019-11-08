<template>
  <div class="dropdown">
    <a-dropdown
      :getPopupContainer="
          triggerNode => {
            return triggerNode.parentNode || document.body;
          }
        "
    >
      <a class="ant-dropdown-link" href="#">
        {{this.$i18n.locale | langStyle}}
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <span @click="changeLang('ch')">中文</span>
        </a-menu-item>
        <a-menu-item>
          <span @click="changeLang('en')">English</span>
        </a-menu-item>
        <!-- <a-menu-item>
          <span @click="changeLang('ko')">한국어</span>
        </a-menu-item> -->
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: this.$i18n.locale
    }
  },
  filters: {
    langStyle: function (value) {
      if (value === 'ch') {
        return '中文'
      } else if (value === 'ko') {
        return '한국어'
      } else {
        return 'English'
      }
    }
  },
  methods: {
    changeLang(lang) {
      let self = this
      self.$i18n.locale = lang
      localStorage.setItem('user_lang', lang)
      // self.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.dropdown {
  .ant-dropdown-link {
    display: block;
    width: 110px;
    height: 26px;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    color: rgba(23, 135, 235, 1);
    line-height: 26px;
    padding-left: 26px;
    padding-right: 26px;
    position: relative;
    // border: 1px solid #000;
    &::before {
      content: "";
      width: 14px;
      height: 14px;
      background: url(../../assets/images/lang_ball.svg) no-repeat;
      background-size: contain;
      position: absolute;
      left: 2px;
      top: 50%;
      transform: translateY(-50%);
    }
    &::after {
      content: "";
      width: 6px;
      height: 4px;
      background: url(../../assets/images/lang_down.svg) no-repeat;
      background-size: contain;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  /deep/ .ant-dropdown {
    //
    ul {
      transform: translateX(-16px);
      padding: 0;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      li {
        padding: 0;
        span {
          padding: 0;
          margin: 0;
          display: block;
          width: 136px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
        }
      }
      li.ant-dropdown-menu-item:hover {
        background: rgba(242, 242, 242, 1);
        span {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
}
</style>
