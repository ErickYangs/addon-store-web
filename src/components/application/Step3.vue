<template>
  <div class="step3">
    <div class="download_sdk">
      <div class="down_title">
        {{ $t('application.addApp.sub_tips') }}
      </div>
      <div class="link_body">
        <div class="link_title">{{ $t('application.addApp.downBtn') }}</div>
        <div class="link_cont">
          <div
            class="link_c"
            @click="$utils.openLink(item.sdkUrl, '_self')"
            v-for="(item, index) in linkList"
            :key="index"
          >
            <span class="hover6"> {{ item.addonName }}</span>
          </div>
        </div>
        <div>
          <a-button
            @click="$router.push({ name: 'Application' })"
            class="next_btn hover6"
            >{{ $t('common.complete') }}</a-button
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
        // console.log(result)
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
      .link_c {
        display: block;
        width: 140px;
        height: 22px;
        font-size: @14px;
        color: @theme-color;
        line-height: 22px;
        margin: 10px 0;
        span {
          position: relative;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
          &::after {
            position: absolute;
            content: '';
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            width: 14px;
            height: 14px;
            background: url(../../assets/images/down_b.svg) no-repeat center;
            background-size: contain;
          }
        }
      }
    }
  }
  .next_btn {
    border: none;
    margin-top: 60px;
    cursor: pointer;
    width: 120px;
    height: 40px;
    background: linear-gradient(
      90deg,
      rgba(11, 134, 240, 1) 0%,
      rgba(60, 204, 251, 1) 100%
    );
    border-radius: 20px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: @14px;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
