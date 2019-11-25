<template>
  <div class="step3">
    <div class="download_sdk">
      <div class="down_title">
        已为你生成add的专属sdk插件
      </div>
      <div class="link_body">
        <div class="link_title">sdk下载安装lis</div>
        <div class="link_cont">
          <span
            class="hover6"
            @click="$utils.openLink(item.sdkUrl, '_self')"
            v-for="(item, index) in linkList"
            :key="index"
            >{{ item.addonName }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Store from '@/utils/auth'
export default {
  data() {
    return {
      appId: null,
      linkList: []
    }
  },
  methods: {
    async getLinkList() {
      try {
        let result = await this.$http.Addon.queryAppAddonStatus(this.appId)
        console.log(result)
        if (result.desc === 'SUCCESS') {
          result.result.map((item, index) => {
            if (item.register) {
              this.linkList.push(item)
            }
          })
        }
      } catch (error) {
        throw error
      }
    }
  },
  created() {
    this.appId = Store.getNews('appId')
    this.getLinkList()
  }
}
</script>

<style lang="less" scoped>
.download_sdk {
  .down_title {
    height: 24px;
    font-size: 16px;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
    margin-bottom: @14px;
  }
  .link_body {
    color: @theme-color;
    .link_title {
      height: 28px;
      font-size: 20px;
      font-weight: 600;
      color: @theme-color;
      line-height: 28px;
      margin-bottom: 20px;
    }
    .link_cont {
      span {
        display: block;
        width: 140px;
        height: 22px;
        font-size: @14px;
        color: @theme-color;
        line-height: 22px;
        margin: 10px 0;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
