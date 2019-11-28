<template>
  <div class="plugin_add_layout">
    <div class="main_tips">
      <div class="breadcrumb">
        <div class="bread_item">
          <span>{{ $t('plugin.main_title1') }}</span>
        </div>
        <div class="bread_item">
          <span>{{ $t('plugin.addBtn') }}</span>
        </div>
      </div>
      <div class="main_message_wrap">
        <div class="main_message_left">
          <div class="main_sub_title">{{ $t('plugin.addBtn') }}</div>
        </div>
      </div>
    </div>
    <div class="plugin_content">
      <div class="addon_message">
        <div class="form_area">
          <div class="form_menu_item">
            <div class="label_name">{{ $t('plugin.addonDetail.addName') }}</div>
            <input
              v-model="appNews.appName"
              type="text"
              placeholder="Please Enter Add-on Name"
            />
          </div>
          <div class="form_menu_item">
            <div class="label_name">{{ $t('plugin.addonDetail.addDesc') }}</div>
            <textarea
              v-model="appNews.appDesc"
              placeholder="Please Enter Add-on Description"
            ></textarea>
          </div>
        </div>
        <div class="_btn_wrap">
          <a-button class="create_btn" @click="createAddon">{{
            $t('common.confirm')
          }}</a-button>
          <span class="cancel_btn" @click="$router.go(-1)">{{
            $t('common.back')
          }}</span>
        </div>
      </div>
      <!-- <div class="json_area"></div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      account: state => state.login.account
    })
  },
  data() {
    return {
      appNews: {
        appName: '',
        appDesc: ''
      },
      size: 'small'
    }
  },
  methods: {
    async createAddon() {
      if (!this.appNews.appName) {
        this.$message.error('Please Enter Add-on Name!')
        return false
      }
      let params = {
        addonName: this.appNews.appName,
        description: this.appNews.appDesc,
        ontid: this.account.ontid
      }
      try {
        let result = await this.$http.Addon.createCustomAdd(params)
        // // console.log('create custom add-on result', result)
        if (result.desc !== 'SUCCESS' || result.result !== 'SUCCESS') {
          this.$message.error('Create Add-on Fail, Please Try Again')
          return false
        }
        this.$message.success('Create Add-on Success!')
        await this.$store.dispatch('login/getCustomAddon')
        this.$router.push({ name: 'PluginLayout' })
      } catch (error) {
        // this.$message.error('Create Add-on Fail!')
        throw error
      }
    }
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
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .main_message_left {
      margin-top: 32px;
      width: 400px;
      margin-bottom: 30px;
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
.plugin_content {
  width: 100%;
  padding: 40px 60px 20px 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .addon_message {
    width: 400px;
    margin-right: 60px;
    margin-bottom: 60px;
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
        input {
          display: block;
          width: 100%;
          height: 30px;
          border: none;
          outline: none; /*去掉选中状态边框*/
          background-color: rgba(0, 0, 0, 0); /*透明背景*/
          line-height: 22px;
          padding-top: 4px;
          padding-bottom: 4px;
          font-size: @14px;
          border-bottom: 1px solid #e4e4e4;
          font-weight: 400;
          &::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            font-size: 16px;
            color: rgba(204, 204, 204, 1);
            line-height: 16px;
            // padding-left: 4px;
            font-weight: 400;
          }
          &:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            font-size: 16px;
            color: rgba(204, 204, 204, 1);
            line-height: 16px;
            // padding-left: 4px;
            font-weight: 400;
          }
          &::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            font-size: 16px;
            color: rgba(204, 204, 204, 1);
            line-height: 16px;
            // padding-left: 4px;
            font-weight: 400;
          }
          &:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            font-size: 16px;
            color: rgba(204, 204, 204, 1);
            line-height: 16px;
            // padding-left: 4px;
            font-weight: 400;
          }
        }
      }
    }
    textarea {
      display: block;
      width: 100%;
      height: 200px;
      outline: none;
      resize: none;
      background: transparent;
      padding: 10px;
      border-color: #e4e4e4 !important;
      &::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        font-size: 16px;
        color: rgba(204, 204, 204, 1);
        line-height: 16px;
        // padding-left: 4px;
        font-weight: 400;
      }
    }
    ._btn_wrap {
      margin-top: 60px;
      width: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      button.create_btn {
        border: none;
        display: block;
        width: 120px;
        height: 40px;
        background: linear-gradient(
          90deg,
          rgba(11, 134, 240, 1) 0%,
          rgba(60, 204, 251, 1) 100%
        );
        border-radius: 25px;
        cursor: pointer;
        font-size: @14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        text-align: center;
        &:hover {
          opacity: 0.8;
        }
      }
      .cancel_btn {
        margin-top: 20px;
        text-decoration: underline;
        color: @theme-color;
        font-size: @14px;
        cursor: pointer;
      }
    }
  }
  .json_area {
    width: 560px;
    height: 347px;
    background: rgba(233, 245, 255, 1);
  }
}
</style>
