<template>
  <div class="application_detail_wrap">
    <div class="main_tips">
      <div class="breadcrumb">
        <div class="bread_item">
          <span>App</span>
        </div>
        <div class="bread_item">
          <span>Particulars</span>
        </div>
      </div>
      <div class="main_message_wrap">
        <div class="main_message_left">
          <div class="main_sub_title">Particulars</div>
          <div class="main_sub_desc">
            DDXF is a decentralized data exchange and collaboration framework.
            DDXF is able to tokenize any valuable data and provides data
            traceability and cross-system data processing.
          </div>
        </div>
        <!-- <div class="main_message_right">
          <div class="version_wrap">
            <div class="ver_layout">
              <div class="ver_main_title">
                版本号
              </div>
              <div class="version_box">
                <div class="version_ele">
                  <div class="ver_sub_box">
                    <span>4.2.1</span>
                    <span>一天</span>
                  </div>
                  <div class="ver_sub_body">
                    DDXF is a decentralized data exchange and collaboration
                    framework. DDXF is able to tokenize any valuable data and
                    provides data traceability and cross-system data processing.
                  </div>
                </div>
                <div class="version_ele">
                  <div class="ver_sub_box">
                    <span>4.2.2</span>
                    <span>@ The amount of 2.0</span>
                    <span>一周</span>
                  </div>
                  <div class="ver_sub_body">
                    DDXF is a decentralized data exchange and collaboration
                    framework. DDXF is able to tokenize any valuable data and
                    provides data traceability and cross-system data processing.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- Subject information  -->
    <div class="app_info_wrap">
      <div class="form_area">
        <div class="form_menu_item">
          <div class="label_name">Application Name</div>
          <input
            v-model="appNews.appName"
            type="text"
            placeholder="Please Input Application Name"
            disabled
          />
        </div>
        <div class="form_menu_item">
          <div class="label_name">Application ONT ID</div>
          <input v-model="appNews.appOntid" type="text" disabled />
        </div>
        <div class="form_menu_item wif_tips_area">
          <div class="label_name">
            Application Wif
            <div class="wif_tips">
              <span class="tips_icon"></span>
              <div class="tips_content">
                节点质押是用户将ONT质押到节点钟参与本体网络治理的行为，质押ONT是通过智能合约实现的，除了质押人，其他任何人无权触碰被质押的ONT，因此只要不丢失您的钱包私钥，您的ONT始终是安全，通过参与质押，您可以获取本体网络手续费分成奖励和基金会节点奖励
              </div>
            </div>
          </div>
          <div class="app_wif_wrap" v-if="wifShow">
            {{ appNews.wif }}
            <span class="close" @click="wifShow = false"></span>
          </div>
          <div class="app_wif_wrap" v-else>
            {{ appNews.wif | closeText }}
            <span class="open" @click="wifShow = true"></span>
          </div>
        </div>
        <div class="form_menu_item">
          <div class="label_name">Application Domain</div>
          <input v-model="appNews.domain" type="text" disabled />
        </div>
        <div class="form_menu_item">
          <div class="label_name">Application CreateTime</div>
          <div class="createTime_">
            {{ $utils.formatTime(appNews.createTime) }}
          </div>
        </div>
        <div class="form_menu_item desc_area">
          <div class="label_name">Application Description</div>
          <textarea
            v-model="appNews.description"
            placeholder="Please Input Application Description"
          ></textarea>
        </div>
        <div class="table_box">
          <div class="table_body">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              @select="handleSelect"
              @select-all="handleSelectAll"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="Addon Name" width="225">
                <template slot-scope="scope">{{
                  scope.row.addonName
                }}</template>
              </el-table-column>
              <el-table-column label="Action" show-overflow-tooltip width="120">
                <template slot-scope="scope">
                  <i
                    v-if="scope.row.register"
                    class="table_icon edit_icon"
                    @click="openModel(scope.row)"
                  >
                  </i>
                  <i
                    v-if="scope.row.isDel"
                    @click="deleteAdd(scope.row)"
                    class="table_icon delete_icon"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="link_body">
        <div class="link_title">sdk下载安装list</div>
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
      <div>
        <a-button @click="putAppDetail" :loading="loading" class="update_btn"
          >Update</a-button
        >
      </div>
      <div class="policy hover6">
        I agree to the privacy policy
      </div>
    </div>
    <!-- json -->
    <JsonCofig-div
      ref="jsonDialogs"
      :jsonConfig="jsonConfig"
      @HandlerJsonConfig="HandlerJsonConfig"
    ></JsonCofig-div>
  </div>
</template>

<script>
import '@/styles/antReset.less'
import JsonCofigDiv from '@/components/model/DialogJson'
export default {
  data() {
    return {
      appNews: {
        appName: '',
        description: '',
        appOntid: '',
        wif: '',
        domain: '',
        createTime: ''
      },
      wifShow: false,
      tableData: [],
      appId: null,
      multipleSelection: [],
      jsonConfig: {},
      currentData: {},
      loading: false,
      dataParams: {
        id: '',
        addonConfig: [],
        desc: ''
      },
      linkList: []
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
    async getAppDetail(id) {
      try {
        let result = await this.$http.Application.queryAppDetail(id)
        // // console.log(result)
        this.appNews = { ...result.result }
      } catch (error) {
        throw error
      }
    },
    async getAddList(id) {
      try {
        let result = await this.$http.Addon.queryAppAddonStatus(id)
        // // console.log(result)
        if (result.desc === 'SUCCESS') {
          this.tableData = result.result
          let arr = []
          result.result.map((item, index) => {
            if (item.register) {
              arr.push(item)
            }
          })
          this.linkList = [...arr]
          this.setSelectRow()
          this.setSel()
        }
      } catch (error) {
        throw error
      }
    },
    async putAppDetail() {
      this.loading = true
      let confarr = []
      this.multipleSelection.map((item, index) => {
        let obj = {
          addonId: item.id,
          config: item.config
        }
        confarr.push(obj)
      })
      this.dataParams.addonConfig = [...confarr]
      this.dataParams.id = this.appId
      this.dataParams.desc = this.appNews.description
      try {
        let result = await this.$http.Application.editApp(this.dataParams)
        // // console.log('result config', result)
        if (result.desc === 'SUCCESS' || result.result === 'SUCCESS') {
          this.loading = false
          this.$message.success('Update Successful!')
          await this.getAppDetail(this.appId)
          await this.getAddList(this.appId)
        } else {
          this.loading = false
          this.$message.error(result.desc)
          return false
        }
      } catch (error) {
        this.loading = false
        this.$message.error('Update fail!')
        throw error
      }
    },
    // 删除当前Addon
    async deleteAdd(data) {
      // // console.log('data', data)
      try {
        let result = await this.$http.Application.deleteAddon(
          this.appId,
          data.id
        )
        // // console.log('delete result', result)
        if (result.desc === 'SUCCESS') {
          this.$message.success('Delete Successful!')
          this.getAddList(this.appId)
        } else {
          this.$message.error(result.desc)
          return false
        }
      } catch (error) {
        throw error
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelect(selection, row) {
      this.tableData.forEach((item, index, arr) => {
        if (row.id == item.id) {
          arr[index].register = !arr[index].register
        }
      })
      this.setSelectRow()
    },
    handleSelectAll(selection) {
      let flag = true
      if (selection.length === 0) {
        flag = false
      }
      this.$nextTick(() => {
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].register = flag
          this.$refs.multipleTable.toggleRowSelection(this.tableData[i], flag)
        }
      })
    },
    // 设置删除
    setSel() {
      this.$nextTick(() => {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].register) {
            this.tableData[i].isDel = true
          }
        }
      })
    },
    // 设置选中
    setSelectRow() {
      this.$nextTick(() => {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].register) {
            this.$refs.multipleTable.toggleRowSelection(this.tableData[i], true)
          }
        }
      })
    },
    // 弹窗出现
    openModel(data) {
      // // console.log(data)
      this.currentData = data
      this.jsonConfig = JSON.parse(data.config)
      this.$refs.jsonDialogs.showModal()
    },
    HandlerJsonConfig(data) {
      // // console.log('json config', data)
      this.currentData.config = JSON.stringify(data)
      this.multipleSelection.map((item, index) => {
        if (item.id == this.currentData.id) {
          item = this.currentData
        }
      })
    }
  },
  created() {
    this.appId = this.$route.query.id
    this.getAppDetail(this.appId)
    this.getAddList(this.appId)
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
      .version_wrap {
        width: 100%;
        height: 140px;
        overflow-y: auto;
        .ver_layout {
          width: 300px;
          .ver_main_title {
            font-size: 16px;
            font-weight: 400;
            color: @color6;
            line-height: 24px;
            padding-bottom: 5px;
            border-bottom: 1px solid #fafafa;
          }
          .version_box {
            font-size: 12px;
            .version_ele {
              margin-bottom: 16px;
              padding-bottom: 6px;
              border-bottom: 1px solid #fafafa;
              .ver_sub_box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 20px;
                span {
                  color: rgba(0, 0, 0, 0.3);
                }
              }
              .ver_sub_body {
                line-height: 20px;
                color: rgba(0, 0, 0, 0.3);
              }
            }
          }
        }
        &::-webkit-scrollbar {
          width: 2px;
          height: 5px;
        }
        &::-webkit-scrollbar-track-piece {
          background-color: rgba(0, 0, 0, 0.05);
          -webkit-border-radius: 1px;
        }
        &::-webkit-scrollbar-thumb:vertical {
          height: 2px;
          background-color: @theme-color;
          -webkit-border-radius: 1px;
        }
        &::-webkit-scrollbar-thumb:horizontal {
          width: 2px;
          background-color: @theme-color;
          -webkit-border-radius: 1px;
        }
      }
    }
  }
}
.application_detail_wrap {
  .app_info_wrap {
    width: 100%;
    padding: 40px;
    .form_area {
      width: 100%;
      max-width: 1100px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .form_menu_item {
        width: 520px;
        .createTime_ {
          width: 100%;
          height: 30px;
          background-color: rgba(0, 0, 0, 0); /*透明背景*/
          line-height: 30px;
          font-size: @14px;
          border-bottom: 1px solid #e4e4e4;
        }
      }
      .form_menu_item.desc_area {
        width: 100%;
      }
      .form_menu_item.wif_tips_area {
        .label_name {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .wif_tips {
            margin-left: 10px;
            position: relative;
            cursor: pointer;
            span.tips_icon {
              display: block;
              width: 16px;
              height: 16px;
              background: url(../../assets/images/wifIcon.svg) no-repeat center;
              background-size: contain;
            }
            .tips_content {
              position: absolute;
              left: -750%;
              top: -650%;
              padding: 10px 20px;
              width: 510px;
              font-size: 12px;
              color: rgba(0, 0, 0, 0.3);
              line-height: 20px;
              background: rgba(250, 250, 250, 1);
              box-shadow: 0 0 10px #ddd;
              border-radius: 10px;
              display: none;
            }
            &:hover {
              .tips_content {
                display: block;
              }
            }
          }
        }
      }
      .table_box {
        width: 100%;
        .table_body {
          width: 400px;
        }
      }
    }
    button.update_btn {
      margin-top: 40px;
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
  }
  .policy {
    width: 280px;
    height: 24px;
    font-size: 16px;
    color: @theme-color;
    line-height: 24px;
    cursor: pointer;
    margin-top: 40px;
    text-decoration: underline;
    &:hover {
      opacity: 0.8;
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
.table_body {
  /deep/ .el-table {
    thead {
      tr {
        th {
          .cell {
            font-size: 16px;
            font-weight: 600;
            color: rgba(23, 135, 235, 1);
          }
        }
      }
    }
    tbody {
      tr {
        td {
          .cell {
            font-size: 16px;
            font-weight: 600;
            color: #000;
          }
        }
      }
    }
    .cell {
      .el-checkbox {
        .el-checkbox__input {
          .el-checkbox__inner {
            border-radius: 50%;
          }
        }
      }
      .is-checked {
        .el-checkbox__inner {
          background: #fff;
        }
        .el-checkbox__inner::after {
          transform: none;
          border: none;
          width: 6px;
          height: 6px;
          background: @theme-color;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .cell.el-tooltip {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
