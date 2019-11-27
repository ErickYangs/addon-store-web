<template>
  <div class="application_wrap">
    <div class="main_tips">
      <div class="breadcrumb">
        <div class="bread_item">
          <span>{{ $t('application.lg_title') }}</span>
        </div>
      </div>
      <div class="main_message_wrap">
        <div class="main_message_left">
          <div class="main_sub_title">{{ $t('application.lg_title') }}</div>
          <div class="main_sub_desc">
            DDXF is a decentralized data exchange and collaboration framework.
            DDXF is able to tokenize any valuable data and provides data
            traceability and cross-system data processing.
          </div>
        </div>
      </div>
    </div>
    <div class="app_body">
      <div @click="CreateApp" class="app_item add_app_wrap hover6">
        <div class="lib_item_add_wrap hover6">
          <i class="add_b"></i>
          <i class="add_w"></i>
        </div>
        <div class="lib_item_add_tips hover6">{{$t('application.create')}}</div>
      </div>
      <div
        @click="
          $router.push({ name: 'ApplicationDetail', query: { id: item.id } })
        "
        class="app_item hover6"
        v-for="(item, index) in appList"
        :key="index"
      >
        <div class="add_download_wrap">
          <i class="down_b"></i>
          <i class="down_w"></i>
        </div>
        <div class="app_msg">
          <img src="../../assets/images/app_icon.svg" alt="" />
          <div class="app_name single_ellipsis hover6">{{ item.appName }}</div>
        </div>
        <div class="btn_wrap">
          <span>{{ $t('application.lg_detail') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as Store from '@/utils/auth'

export default {
  computed: {
    ...mapState({
      account: state => state.login.account
    })
  },
  data() {
    return {
      appList: []
    }
  },
  methods: {
    async getAppList() {
      try {
        let result = await this.$http.Application.queryAppList(
          this.account.ontid
        )
        // console.log('app list', result)
        if (result.desc !== 'SUCCESS') return false
        this.appList = result.result
      } catch (error) {
        this.appList = []
        throw error
      }
    },
    showDeleteConfirm() {
      let _self = this
      this.$confirm({
        title:
          'The last addition has not been completed. Do you want to continue?',
        content: '',
        okText: 'Yes',
        okType: 'success',
        cancelText: 'No',
        onOk() {
          // console.log(_self)
          _self.$router.push({ name: 'CreateApp' })
        },
        onCancel() {
          Store.removeNews('undoneInfo')
          _self.$router.push({ name: 'CreateApp' })
        }
      })
    },
    CreateApp() {
      let info = Store.getNews('undoneInfo')
      if (info) {
        this.showDeleteConfirm()
      } else {
        this.$router.push({ name: 'CreateApp' })
      }
    }
  },
  created() {
    this.getAppList()
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
.application_wrap {
  .app_body {
    width: 100%;
    padding: 60px 30px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .app_item {
      width: 250px;
      height: 150px;
      border-radius: 10px;
      background: rgba(248, 250, 252, 1);
      margin-right: 40px;
      margin-bottom: 40px;
      cursor: pointer;
      padding: 20px;
      position: relative;
      .add_download_wrap {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 20px;
        top: 20px;
        i {
          display: block;
          width: 100%;
          height: 100%;
          background-size: contain;
        }
        i.down_b {
          background: url(../../assets/images/down_b.svg) no-repeat center;
        }
        i.down_w {
          display: none;
          background: url(../../assets/images/down_w.svg) no-repeat center;
        }
      }
      .app_msg {
        padding: 10px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 5px;
          overflow: hidden;
        }
        .app_name {
          flex: 1;
          padding-left: 20px;
          padding-right: 10px;
          font-size: 20px;
          font-weight: 600;
          color: @theme-color;
          height: 40px;
          line-height: 40px;
        }
      }
      .btn_wrap {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 20px;
        span {
          background: #fff;
          display: block;
          margin: 0 auto;
          width: 71px;
          height: 24px;
          border: 1px solid @theme-color;
          border-radius: 12px;
          line-height: 22px;
          text-align: center;
          font-size: @14px;
          color: @theme-color;
        }
      }
      &:hover {
        background: @theme-color;
        box-shadow: 0 0 6px @theme-color;
        .add_download_wrap {
          i.down_b {
            display: none;
          }
          i.down_w {
            display: block;
          }
        }
        .app_msg {
          .app_name {
            color: #fff;
          }
        }
      }
    }
    .add_app_wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .lib_item_add_wrap {
        width: 22px;
        height: 22px;
        margin: 10px 0 20px;
        i {
          display: block;
          width: 100%;
          height: 100%;
          background-size: contain;
        }
        i.add_b {
          background: url(../../assets/images/add_b.svg) no-repeat center;
        }
        i.add_w {
          display: none;
          background: url(../../assets/images/add_w.svg) no-repeat center;
        }
      }
      .lib_item_add_tips {
        height: 20px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.4);
        line-height: 20px;
      }
      &:hover {
        .lib_item_add_wrap {
          i.add_b {
            display: none;
          }
          i.add_w {
            display: block;
          }
        }
        .lib_item_add_tips {
          color: #fff;
        }
      }
    }
  }
}
</style>
