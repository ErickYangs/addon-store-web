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
          <input v-model="appNews.ontId" type="text" disabled />
        </div>
        <div class="form_menu_item">
          <div class="label_name">Application Wif</div>
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
        <div class="table_box">
          <div class="table_body">
            <a-table
              :rowSelection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange
              }"
              :columns="columns"
              :dataSource="data"
              :pagination="false"
            >
              <!-- <template slot="sdklink" slot-scope="record">
                <span class="link_btn hover6">{{ record }}</span>
              </template> -->
              <template slot="action" slot-scope="">
                <i class="table_icon edit_icon"></i>
                <i class="table_icon delete_icon"></i>
              </template>
            </a-table>
          </div>
        </div>
        <div class="form_menu_item">
          <div class="label_name">Application Description</div>
          <textarea
            v-model="appNews.appDesc"
            placeholder="Please Input Application Description"
          ></textarea>
        </div>
      </div>
      <div class="policy hover6">
        I agree to the privacy policy
      </div>
    </div>
  </div>
</template>

<script>
import '@/styles/antReset.less'
export default {
  data() {
    const columns = [
      {
        title: 'Addon Name',
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' }
      },
      //   {
      //     title: 'SDK LINK',
      //     dataIndex: 'link',
      //     scopedSlots: { customRender: 'sdklink' }
      //   },
      {
        title: 'Action',
        dataIndex: 'action',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }
    ]
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        link: 32
      })
    }
    return {
      appNews: {
        appName: 'Singing',
        appDesc: '',
        ontId: 'did:ont:ALQAmoUQwfupnDqkXQ1EEdGhhFkUNkS1uy',
        wif: 'ALQAmoUQwfupnDqkXQ1EEdGhhFkUNkS1uy',
        domain: 'ontology.com'
      },
      wifShow: false,
      data,
      columns,
      selectedRowKeys: []
    }
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
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
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
      max-width: 900px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .form_menu_item {
        width: 420px;
        &:nth-last-of-type(1) {
          width: 100%;
        }
      }
      .table_box {
        width: 100%;
        .table_body {
          width: 400px;
        }
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
</style>
