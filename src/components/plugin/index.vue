<template>
  <div class="plugin_wrap">
    <div class="main_tips">
      <div class="breadcrumb">
        <div class="bread_item">
          <span>{{ $t('plugin.main_title1') }}</span>
        </div>
      </div>
      <div class="main_message_wrap">
        <div class="main_message_left">
          <div class="main_sub_title">{{ $t('plugin.main_title1') }}</div>
          <div class="main_sub_desc">
            DDXF is a decentralized data exchange and collaboration framework.
            DDXF is able to tokenize any valuable data and provides data
            traceability and cross-system data processing.
          </div>
        </div>
        <!-- <div class="main_message_right">
          <div class="left_m">
            <div class="sun_title1">Dosage</div>
            <div class="sun_title2">Name</div>
            <div class="sun_title3">authsaas</div>
            <div class="sun_title3">ddxf</div>
          </div>
          <div class="right_s">
            <div class="sun_title1">The plug-in has been created</div>
            <div class="sun_title2">The amount of</div>
            <div class="sun_title3 number_style">548,210</div>
            <div class="sun_title3 number_style">375,32</div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="plugin_body">
      <!-- Cydia -->
      <div class="lib_wrap">
        <div class="lib_title">{{ $t('plugin.main_title2') }}</div>
        <div class="lib_wrap">
          <div
            @click="
              $router.push({ name: 'AddonDetail', query: { id: item.id } })
            "
            class="lib_item hover6"
            v-for="(item, index) in commonAddon"
            :key="index"
          >
            <div class="lib_item_title hover6">{{ item.addonName }}</div>
            <div class="lib_item_desc hover6">{{ item.description }}</div>
          </div>
        </div>
      </div>
      <!-- Custom plug-inia -->
      <div class="lib_wrap">
        <div class="lib_title">{{ $t('plugin.main_title3') }}</div>
        <div class="lib_wrap">
          <div
            @click="$router.push({ name: 'CreateArticle' })"
            class="lib_item hover6 add_plugin_wrap"
          >
            <div class="lib_item_add_wrap hover6">
              <i class="add_b"></i>
              <i class="add_w"></i>
            </div>
            <div class="lib_item_add_tips hover6">
              {{ $t('plugin.addBtn') }}
            </div>
          </div>
          <div
            @click="
              $router.push({ name: 'EditArticle', query: { id: item.id } })
            "
            class="lib_item hover6"
            v-for="(item, index) in customAddon"
            :key="index"
          >
            <div class="lib_item_title hover6">{{ item.addonName }}</div>
            <div class="lib_item_desc">{{ item.description }}</div>
            <div class="lib_item_config">{{ $t('plugin.detail') }}</div>
            <div class="lib_item_edit">
              <i class="edit_b"></i>
              <i class="edit_w"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      account: state => state.login.account,
      commonAddon: state => state.login.commonAddon,
      customAddon: state => state.login.customAddon
    })
  },
  data() {
    return {}
  },
  methods: {},
  created() {}
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
      width: 300px;
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
.plugin_wrap {
  .plugin_body {
    padding: 30px;
    .lib_wrap {
      .lib_title {
        font-size: 20px;
        font-weight: 600;
        color: @color6;
        line-height: 28px;
        padding-left: 10px;
      }
      .lib_wrap {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .lib_item {
          width: 250px;
          height: 150px;
          background: rgba(248, 250, 252, 1);
          border-radius: 10px;
          margin-bottom: 20px;
          margin-right: 20px;
          overflow: hidden;
          padding: 20px;
          position: relative;
          cursor: pointer;
          .lib_item_title {
            width: 180px;
            height: 28px;
            font-size: 20px;
            font-weight: 600;
            color: @theme-color;
            line-height: 28px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-bottom: 6px;
          }
          .lib_item_desc {
            width: 100%;
            height: 40px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.4);
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .lib_item_config {
            background: #fff;
            position: absolute;
            left: 20px;
            bottom: 20px;
            width: 70px;
            height: 24px;
            border: 1px solid @theme-color;
            font-size: @14px;
            color: @theme-color;
            line-height: 22px;
            text-align: center;
            border-radius: 12px;
          }
          .lib_item_edit {
            position: absolute;
            right: 20px;
            top: 20px;
            width: 18px;
            height: 16px;
            i {
              display: block;
              width: 100%;
              height: 100%;
              background-size: contain;
            }
            i.edit_b {
              background: url(../../assets/images/edit_b.svg) no-repeat center;
            }
            i.edit_w {
              background: url(../../assets/images/edit_w.svg) no-repeat center;
              display: none;
            }
          }
          &:hover {
            background: @theme-color;
            box-shadow: 0 0 6px @theme-color;
            .lib_item_title {
              color: #fff;
            }
            .lib_item_desc {
              color: rgba(255, 255, 255, 0.4);
            }
            .lib_item_edit {
              i.edit_b {
                display: none;
              }
              i.edit_w {
                display: block;
              }
            }
          }
        }
      }
      .add_plugin_wrap {
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
}
</style>
