<template>
  <div class="addon_detail_wrap">
    <div class="main_tips">
      <div class="breadcrumb">
        <div class="bread_item">
          <span>Plug-in library</span>
        </div>
        <div class="bread_item">
          <span>Add-on</span>
        </div>
      </div>
      <div class="main_message_wrap">
        <div class="main_message_left">
          <div class="main_sub_title">Add New Addon</div>
          <div class="main_sub_desc">
            DDXF is a decentralized data exchange and collaboration framework.
            DDXF is able to tokenize any valuable data and provides data
            traceability and cross-system data processing.
          </div>
        </div>
      </div>
    </div>
    <div class="plugin_detail_wrap">
      <div class="form_area">
        <div class="form_menu_item">
          <div class="label_name">Add-on Name</div>
          <div class="app_wif_wrap">{{ addonDetail.addonName }}</div>
        </div>
        <div class="form_menu_item">
          <div class="label_name">Add-on Description</div>
          <div class="app_wif_wrap no_line">{{ addonDetail.description }}</div>
        </div>
        <div class="form_menu_item">
          <div class="label_name">Add-on CreateTime</div>
          <div class="app_wif_wrap">
            {{ $utils.formatTime(addonDetail.createTime) }}
          </div>
        </div>
        <div class="form_menu_item">
          <div class="label_name">Add-on SDK Link</div>
          <div class="app_wif_wrap link no_line">
            <span class="hover6" @click="openLink(addonDetail.sdkUrl)"
              >SDK Download Link</span
            >
          </div>
        </div>
        <div class="form_menu_item">
          <div class="label_name">Add-on Template</div>
          <div class="app_wif_wrap no_line" id="templateid">
            <v-jsoneditor
              ref="editor"
              v-model="jsonConfig"
              :plus="false"
              height="400px"
              @error="onError"
              @onChange="changes"
            ></v-jsoneditor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'
import moment from 'moment'

export default {
  data() {
    return {
      appId: '',
      addonDetail: {
        addonName: '',
        createTime: '',
        description: '',
        sdkUrl: '',
        template: '{}'
      },

      jsonConfig: {}
    }
  },
  methods: {
    async getAddonDetail() {
      try {
        let result = await this.$http.Addon.queryCommonAddonDetail(this.appId)
        // console.log('add-on detail', result)
        if (result.desc !== 'SUCCESS') return false
        this.addonDetail = result.result
        this.jsonConfig = JSON.parse(this.addonDetail.template)
      } catch (error) {
        throw error
      }
    },
    openLink(url) {
      window.open(url)
    },
    changes(a) {
      console.log(a)
    },
    onError() {}
  },
  created() {
    this.appId = this.$route.query.id
    console.log(this.appId)
    this.getAddonDetail()
  },
  filters: {
    formatObj(val) {
      if (!val) return ''
      var objStr = JSON.stringify(val, null, 4)
      let html = objStr.replace(/\n/g, '<br>').replace(/\s/g, ' ')
      console.log(html)
      return html
    }
    // return moment(time).format('LLL')
  },
  components: {
    VJsoneditor
  }
}
</script>

<style lang="less" scoped>
.main_tips {
  width: 100%;
  .breadcrumb {
    height: 42px;
    border-bottom: 1px solid #fafafa;
    border-top: 1px solid #fafafa;
    display: flex;
    justify-content: flex-start;
    .bread_item {
      line-height: 40px;
      padding: 0 30px;
      position: relative;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      &::after {
        content: '';
        width: 12px;
        height: 40px;
        background: url(../../assets/images/border_arrow.svg) no-repeat center;
        position: absolute;
        right: -12px;
        top: 0;
      }
    }
  }
  .main_message_wrap {
    width: 100%;
    padding: 0 40px 26px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .main_message_left {
      margin-top: 32px;
      width: 300px;
      margin-bottom: 40px;
      .main_sub_title {
        font-weight: 900;
        font-size: 38px;
        line-height: 46px;
        color: @theme-color;
        margin-bottom: 10px;
      }
      .main_sub_desc {
        width: 380px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.3);
        line-height: 20px;
      }
    }
    .main_message_right {
      min-width: 320px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      .left_m {
        margin-right: 60px;
      }
      .right_s {
      }
      .sun_title1 {
        font-size: 16px;
        color: @color6;
        line-height: 24px;
        margin-bottom: 12px;
      }
      .sun_title2 {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.3);
        line-height: 20px;
        margin-bottom: 4px;
      }
      .sun_title3 {
        font-size: @14px;
        font-weight: 600;
        color: @color6;
        line-height: 22px;
        margin-bottom: 6px;
      }
    }
  }
}
.plugin_detail_wrap {
  padding: 40px;
  .form_area {
    width: 600px;
    .app_wif_wrap.link {
      span {
        color: @theme-color;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .app_wif_wrap.no_line {
      border: none;
    }
  }
}
.form_area {
  .form_menu_item {
    margin-bottom: 40px;
    .label_name {
      height: 16px;
      font-size: @14px;
      color: @color6;
      line-height: 16px;
      margin-bottom: 10px;
    }
    .app_wif_wrap {
      line-height: 30px;
      border-bottom: 1px solid #e4e4e4;
      position: relative;
      padding-right: 20px;
      font-size: @14px;
    }
  }
}
</style>
