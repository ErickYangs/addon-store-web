<template>
  <a-locale-provider :locale="antLocal">
    <div id="app" :class="'lang_'+classLang">
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
      locale: zhCN,
      // classLang: 'en'
    };
  },
  computed: {
    antLocal() {
      let temp
      switch (this.$i18n.locale) {
        case 'ch':
          temp = zhCN
          break;
        default:
          temp = enUS
          break;
      }
      return temp
    },
    classLang() {
      let temp
      switch (this.$i18n.locale) {
        case 'ch':
          temp = 'ch'
          break;
        default:
          temp = 'en'
          break;
      }
      return temp
    }
  }
}
</script>

<style lang="less">
</style>
