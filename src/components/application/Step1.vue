<template>
  <div class="step1_wrap">
    <div class="select_sdk">
      <div class="app_form">
        <div class="form_area">
          <div class="form_menu_item">
            <div class="label_name">Application Name</div>
            <input
              v-model="appNews.appName"
              type="text"
              placeholder="Please Input Application Name"
            />
          </div>
          <div class="form_menu_item">
            <div class="label_name">Application Description</div>
            <textarea
              v-model="appNews.description"
              placeholder="Please Input Application Description"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="select_title">添加可以选择SDK插件</div>
      <div class="app_sdk_layout">
        <div class="sdk_ele" v-for="(item, index) in plgindata" :key="index">
          <img src="../../assets/images/sdk_icon.svg" alt="" />
        </div>
        <div @click="openDialog" class="sdk_ele add_btns hover6">
          <i class="add_b"></i>
          <i class="add_w"></i>
        </div>
      </div>
    </div>
    <a-button
      type="primary"
      :loading="loading"
      class="next_btn hover6"
      @click="create"
    >
      Next
    </a-button>
    <dialog-div
      ref="dialogRadil"
      :commonAddonList="commonAddon"
      :customAddonList="customAddon"
      @handlerSelectData="handlerSelectData"
    ></dialog-div>
  </div>
</template>

<script>
import dialogDiv from '@/components/model/DialogRadio'
import * as Store from '@/utils/auth'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      commonAddon: state => state.login.commonAddon,
      customAddon: state => state.login.customAddon,
      account: state => state.login.account
    }),
    plgindata() {
      return [...this.commonAddonIds, ...this.customAddonIds]
    }
  },
  components: {
    dialogDiv
  },
  data() {
    return {
      appNews: {
        appName: '',
        description: ''
      },
      commonAddonIds: [],
      customAddonIds: [],
      loading: false
    }
  },
  methods: {
    openDialog() {
      this.$refs.dialogRadil.showModal()
    },
    handlerSelectData(data) {
      // console.log(data)
      const { commonAddonIds, customAddonIds } = data
      this.commonAddonIds = commonAddonIds
      this.customAddonIds = customAddonIds
    },
    async create() {
      if (!this.appNews.appName) {
        this.$message.error('Please Input Application Name!')
        return false
      }
      if (!this.plgindata.length) {
        this.$message.error('Please Select Add-on!')
        return false
      }
      if (!this.commonAddonIds.length) {
        this.$message.error('Please select at least one common plugin!')
        return false
      }
      let params = {
        ...this.appNews,
        commonAddonIds: [...this.commonAddonIds],
        customAddonIds: [...this.customAddonIds],
        ontid: this.account.ontid
      }
      // console.log('params', params)
      try {
        this.loading = true
        let result = await this.$http.Application.registerApp(params)
        if (result.desc !== 'SUCCESS') {
          this.loading = false
          this.$message.error(result.desc)
          return false
        }
        this.loading = false
        Store.setNews('undoneInfo', JSON.stringify(result.result))
        this.$store.commit('createApp/CHANGE_STEP_ADD')
      } catch (error) {
        this.loading = false
        this.$message.error('Creat failed, please try again!')
        throw error
      }
    }
  }
}
</script>

<style lang="less" scoped>
.step1_wrap {
  .select_sdk {
    .select_title {
      height: 24px;
      font-size: 16px;
      color: rgba(0, 0, 0, 1);
      line-height: 24px;
      margin-bottom: 20px;
    }
    .app_form {
      width: 400px;
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
    .app_sdk_layout {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .sdk_ele {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        border: 1px solid rgba(242, 242, 242, 1);
        margin-right: 40px;
        margin-bottom: 40px;
        cursor: pointer;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .add_btns {
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          display: block;
          width: 22px;
          height: 22px;
          background-size: contain;
        }
        i.add_b {
          background: url(../../assets/images/add_b.svg) no-repeat center;
        }
        i.add_w {
          display: none;
          background: url(../../assets/images/add_w.svg) no-repeat center;
        }
        &:hover {
          background: @theme-color;
          i.add_b {
            display: none;
          }
          i.add_w {
            display: block;
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
