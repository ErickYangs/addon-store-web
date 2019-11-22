<template>
  <div class="add_new_app_wrap">
    <div class="main_tips">
      <div class="breadcrumb">
        <div class="bread_item">
          <span>App</span>
        </div>
        <div class="bread_item">
          <span>Add New App</span>
        </div>
      </div>
      <div class="main_message_wrap">
        <div class="main_message_left">
          <div class="main_sub_title">Add New App</div>
          <div class="main_sub_desc">
            DDXF is a decentralized data exchange and collaboration framework.
            DDXF is able to tokenize any valuable data and provides data
            traceability and cross-system data processing.
          </div>
        </div>
      </div>
    </div>
    <div class="add_content">
      <div class="steps">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" />
        </a-steps>
        <div class="steps-content">{{ steps[current].content }}</div>
        <div class="steps-action">
          <a-button
            v-if="current < steps.length - 1"
            type="primary"
            @click="next"
          >
            Next
          </a-button>
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="$message.success('Processing complete!')"
          >
            Done
          </a-button>
          <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
            Previous
          </a-button>
        </div>
      </div>
      <sdktable-div></sdktable-div>
      <!-- select sdk -->
      <div class="select_sdk">
        <div class="select_title">添加可以选择SDK插件</div>
        <div class="app_sdk_layout">
          <div class="sdk_ele">
            <img src="" alt="" />
          </div>
          <div class="sdk_ele add_btns hover6">
            <i class="add_b"></i>
            <i class="add_w"></i>
          </div>
        </div>
      </div>
      <!-- download sdk -->
      <div class="download_sdk">
        <div class="down_title">
          已为你生成add的专属sdk插件
        </div>
        <div class="link_body">
          <div class="link_title">sdk下载安装lis</div>
          <div class="link_cont">
            <span class="hover6">SDK Download Link</span>
            <span class="hover6">SDK Download Link</span>
            <span class="hover6">SDK Download Link</span>
            <span class="hover6">SDK Download Link</span>
          </div>
        </div>
      </div>
      <div v-if="current < steps.length - 1" class="next_btn hover6">
        Next
      </div>
      <div v-if="current == steps.length - 1" class="next_btn hover6">
        Back
      </div>
    </div>
  </div>
</template>

<script>
import sdktableDiv from '@/components/model/SdkTable'
export default {
  components: { sdktableDiv },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: 'First',
          content: 'First-content'
        },
        {
          title: 'Second',
          content: 'Second-content'
        },
        {
          title: 'Last',
          content: 'Last-content'
        }
      ]
    }
  },
  methods: {
    next() {
      this.current++
    },
    prev() {
      this.current--
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
.add_content {
  padding: 30px;
  .steps {
    width: 440px;
    margin-bottom: 40px;
  }
}
.select_sdk {
  .select_title {
    height: 24px;
    font-size: 16px;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
    margin-bottom: 20px;
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
        background: tomato;
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
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
.next_btn {
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

.steps-action {
  margin-top: 24px;
}
/deep/ .ant-steps-item-icon {
  width: 40px;
  height: 40px;
  line-height: 40px;
  span.ant-steps-icon {
    font-size: 20px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    line-height: 38px;
  }
}
/deep/ .ant-steps-item-wait .ant-steps-item-icon {
  background: rgba(248, 250, 252, 1);
  border-color: @theme-color;
  & > .ant-steps-icon {
    color: @theme-color;
  }
}
</style>
