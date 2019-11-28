<template>
  <div class="add_new_app_wrap">
    <div class="main_tips">
      <div class="breadcrumb">
        <div class="bread_item">
          <span>{{ $t('application.lg_title') }}</span>
        </div>
        <div class="bread_item">
          <span>{{ $t('application.create') }}</span>
        </div>
      </div>
      <div class="main_message_wrap">
        <div class="main_message_left">
          <div class="main_sub_title">{{ stepTips }}</div>
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
        <a-steps :current="currentStep">
          <a-step v-for="item in steps" :key="item.title" />
        </a-steps>
      </div>
      <step1AddApp-div v-if="currentStep === 0"></step1AddApp-div>
      <step2EditApp-div v-else-if="currentStep === 1"></step2EditApp-div>
      <step3Link-div v-else></step3Link-div>
    </div>
  </div>
</template>

<script>
import sdktableDiv from '@/components/model/SdkTable'
import step1AddAppDiv from '@/components/application/Step1'
import step2EditAppDiv from '@/components/application/Step2'
import step3LinkDiv from '@/components/application/Step3'

import { mapState } from 'vuex'
import * as Store from '@/utils/auth'
export default {
  computed: {
    ...mapState({
      currentStep: state => state.createApp.currentStep
    }),
    stepTips() {
      let str = ''
      switch (this.currentStep) {
        case 0:
          str = this.$t('application.addApp.step1')
          break
        case 1:
          str = this.$t('application.addApp.step2')
          break
        case 2:
          str = this.$t('application.addApp.step3')
          break
        default:
          str = this.$t('application.addApp.step1')
          break
      }
      return str
    }
  },
  components: { sdktableDiv, step1AddAppDiv, step2EditAppDiv, step3LinkDiv },
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
      ],
      appNews: {
        appName: '',
        appDesc: ''
      }
    }
  },
  methods: {
    next() {
      this.$store.commit('createApp/CHANGE_STEP_ADD')
    },
    prev() {
      this.current--
    }
  },
  beforeDestroy() {
    this.$store.commit('createApp/RESERT_STEP')
  },
  created() {
    let info = JSON.parse(Store.getNews('undoneInfo'))
    if (info) {
      this.next()
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
.add_content {
  padding: 30px;
  .steps {
    width: 440px;
    margin-bottom: 60px;
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
