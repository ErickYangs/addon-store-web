<template>
  <div class="plugin_add_layout">
    <div class="main_tips">
      <div class="breadcrumb">
        <div class="bread_item">
          <span>DDXF</span>
        </div>
        <div class="bread_item">
          <span>Plug-in library</span>
        </div>
        <div class="bread_item">
          <span>Edit Addon</span>
        </div>
      </div>
      <div class="main_message_wrap">
        <div class="main_message_left">
          <div class="main_sub_title">Edit Addon</div>
        </div>
      </div>
    </div>
    <div class="plugin_content">
      <div class="addon_message">
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
          <div class="form_menu_item">
            <div class="label_name">Application Description</div>
            <textarea
              v-model="appNews.appDesc"
              placeholder="Please Input Application Description"
            ></textarea>
          </div>
        </div>
        <div class="_btn_wrap">
          <span class="hover6">Update</span>
        </div>
      </div>
      <div class="json_area"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appNews: {
        appName: 'Singing',
        appDesc: '',
        ontId: 'did:ont:ALQAmoUQwfupnDqkXQ1EEdGhhFkUNkS1uy',
        wif: 'ALQAmoUQwfupnDqkXQ1EEdGhhFkUNkS1uy',
        domain: 'ontology.com'
      },
      wifShow: false
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
  }
}
</script>

<style lang="less" scoped>
.main_tips {
  width: 100%;
  .breadcrumb {
    height: 42px;
    border-bottom: 1px solid #efefef;
    border-top: 1px solid #efefef;
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
        color: rgba(23, 135, 235, 1);
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
        color: rgba(0, 0, 0, 0.6);
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
        font-size: 14px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.6);
        line-height: 22px;
        margin-bottom: 6px;
      }
    }
  }
}
.plugin_content {
  width: 100%;
  padding: 20px 60px 20px 40px;
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
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
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
          font-size: 14px;
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
      span {
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
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        text-align: center;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .app_wif_wrap {
      line-height: 30px;
      border-bottom: 1px solid #e4e4e4;
      position: relative;
      padding-right: 20px;
      font-size: 14px;
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
  .json_area {
    width: 560px;
    height: 347px;
    background: rgba(233, 245, 255, 1);
  }
}
</style>
