<template>
  <a-locale-provider :locale="antLocal">
    <div id="app" :class="'lang_' + classLang">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'

export default {
  data() {
    return {
      locale: zhCN
      // classLang: 'en'
    }
  },
  computed: {
    antLocal() {
      let temp
      switch (this.$i18n.locale) {
        case 'ch':
          temp = zhCN
          break
        default:
          temp = enUS
          break
      }
      return temp
    },
    classLang() {
      let temp
      switch (this.$i18n.locale) {
        case 'ch':
          temp = 'ch'
          break
        default:
          temp = 'en'
          break
      }
      return temp
    }
  }
}
</script>

<style lang="less">
/deep/ .ant-menu-submenu.ant-menu-submenu-popup {
  left: 60px !important;
}
.ant-menu-dark .ant-menu-sub {
  background: #fff !important;
  overflow: hidden;
  .ant-menu-item {
    color: #000;
    margin: 0 !important;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-family: 'PingFangSC-Regular', 'Arial', '黑体', sans-serif;
    &:hover {
      color: #fff;
      background: #0076df;
    }
  }
  .ant-menu-item.ant-menu-item-selected {
    color: #fff;
  }
}
.ant-tooltip-content {
  .ant-tooltip-inner {
    span {
      color: #fff !important;
      font-family: 'PingFangSC-Regular', 'Arial', '黑体', sans-serif;
    }
  }
}
</style>
