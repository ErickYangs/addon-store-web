<template>
  <div class="step2">
    <div class="step2_title">
      {{ $t('application.addApp.config') }}
    </div>
    <div class="sdk_area">
      <div class="form_area">
        <div class="form_menu_item">
          <div class="label_name">{{ $t('application.details.ontid') }}</div>
          <input
            v-model="appNews.appOntid"
            type="text"
            placeholder="Please Enter Application ONT ID"
            disabled
            class="no_border_bottom"
          />
        </div>
        <div class="form_menu_item">
          <div class="label_name">{{ $t('application.details.wif') }}</div>
          <div class="app_wif_wrap no_border_bottom" v-if="wifShow">
            {{ appNews.wif }}
            <span class="close" @click="wifShow = false"></span>
          </div>
          <div class="app_wif_wrap no_border_bottom" v-else>
            {{ appNews.wif | closeText }}
            <span class="open" @click="wifShow = true"></span>
          </div>
        </div>
        <div class="form_menu_item">
          <div class="label_name">{{ $t('application.details.domain') }}</div>
          <input
            v-model="appNews.domain"
            type="text"
            placeholder="Please Enter domain"
            disabled
            class="no_border_bottom"
          />
        </div>
      </div>
    </div>

    <!--  -->
    <div class="table_body">
      <a-table
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        :rowKey="setTableKey"
      >
        <!-- <template slot="sdklink" slot-scope="text, record">
          <span class="link_btn hover6">{{ text }}</span>
        </template> -->
        <template slot="action" slot-scope="text, record">
          <i @click="editConfig(record.id)" class="table_icon edit_icon"></i>
          <!-- <i class="table_icon delete_icon"></i> -->
        </template>
      </a-table>
    </div>
    <a-button
      type="primary"
      :loading="loading"
      class="next_btn hover6"
      @click="handlerUpdate"
    >
      {{ $t('application.addApp.sdkBtn') }}
    </a-button>
    <JsonCofig-div
      ref="jsonDialog"
      :jsonConfig="currentData.jsonConfig"
      @HandlerJsonConfig="HandlerJsonConfig"
    ></JsonCofig-div>
  </div>
</template>

<script>
import '@/styles/antReset.less'
import * as Store from '@/utils/auth'
import JsonCofigDiv from '@/components/model/DialogJson'
const columns = [
  {
    title: 'Add-ons',
    dataIndex: 'addonName',
    scopedSlots: { customRender: 'addonName' }
  },
  {
    title: 'Settings',
    dataIndex: 'action',
    width: 200,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data() {
    return {
      wifShow: false,
      appNews: {
        appName: '',
        appDesc: '',
        appOntid: '',
        wif: '',
        domain: ''
      },
      tableData: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      currentData: {
        jsonConfig: {}
      },
      appInfo: null,
      loading: false,
      dataParams: {
        id: '',
        addonConfig: []
      }
    }
  },
  components: {
    JsonCofigDiv
  },
  filters: {
    closeText(val) {
      let str = ''
      for (let i = 0; i < val.length; i++) {
        str += '*'
      }
      return str
    }
  },
  methods: {
    setTableKey(record) {
      return record.id
    },
    onSelectChange(selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    editConfig(data) {
      // console.log(data)
      this.getAddonInfo(data)
    },
    HandlerJsonConfig(data) {
      // console.log('json config', data)
      this.tableData.map((item, index) => {
        if (item.id === this.currentData.id) {
          item.template = JSON.stringify(data)
        }
      })
      this.appInfo.commonAddons = this.tableData
      Store.setNews('undoneInfo', JSON.stringify(this.appInfo))
    },
    async getAddonInfo(appId) {
      try {
        let result = await this.$http.Addon.queryCommonAddonDetail(appId)
        // // console.log('add-on detail', result)
        if (result.desc !== 'SUCCESS') return false
        this.currentData = result.result
        this.currentData.jsonConfig = JSON.parse(this.currentData.template)
        this.$refs.jsonDialog.showModal()
      } catch (error) {
        throw error
      }
    },
    async handlerUpdate() {
      let confarr = []
      this.tableData.map((item, index) => {
        let obj = {
          addonId: item.id,
          config: item.template
        }
        confarr.push(obj)
      })
      this.dataParams.addonConfig = [...confarr]
      this.dataParams.id = this.appNews.id
      // console.log('this.dataParams', this.dataParams)
      try {
        this.loading = true
        let result = await this.$http.Application.editApp(this.dataParams)
        // console.log('result config', result)
        if (result.desc === 'SUCCESS' || result.result === 'SUCCESS') {
          this.loading = false
          Store.removeNews('undoneInfo')
          Store.setNews('appId', this.appNews.id)
          this.$store.commit('createApp/CHANGE_STEP_ADD')
        } else {
          this.loading = false
          this.$message.error(result.desc)
        }
      } catch (error) {
        this.loading = false
        throw error
      }
    }
  },
  created() {
    this.appInfo = JSON.parse(Store.getNews('undoneInfo'))
    this.appNews = { ...this.appInfo.appInfo }
    this.tableData = this.appInfo.commonAddons
  }
}
</script>

<style lang="less" scoped>
.step2_title {
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
  margin-bottom: 40px;
}
.form_area {
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .form_menu_item {
    width: 460px;
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
  .app_wif_wrap {
    line-height: 30px;
    border-bottom: 1px solid #e4e4e4;
    position: relative;
    padding-right: 20px;
    font-size: @14px;
    span {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        opacity: 0.8;
      }
    }
    span.open {
      background: url(../../assets/images/eye_open.svg) no-repeat;
      background-size: contain;
    }
    span.close {
      background: url(../../assets/images/eye_close.svg) no-repeat;
      background-size: contain;
    }
  }
}
.table_body {
  width: 460px;
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
</style>
