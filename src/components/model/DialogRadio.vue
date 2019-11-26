<template>
  <div class="dialog_box">
    <a-modal
      wrapClassName="out_dialog"
      width="890px"
      title="Addon Name"
      v-model="visible"
      @ok="handleOk"
      :centered="centered"
    >
      <template slot="footer">
        <a-button
          key="submit"
          type="primary"
          @click="handleOk"
          class="next_btn"
        >
          Next
        </a-button>
      </template>
      <div class="dialog_content">
        <div class="plugin_onwer">
          <div class="onwer_title">Plug-in</div>
          <div class="plg_wrap">
            <a-checkbox-group @change="onChangePlug">
              <a-checkbox
                v-for="(ele, index) in commonAddonList"
                :key="index"
                :value="ele.id"
                >{{ ele.addonName }}</a-checkbox
              >
            </a-checkbox-group>
          </div>
        </div>
        <div class="plugin_onwer">
          <div class="onwer_title">Custom Plug-in</div>
          <div class="plg_wrap">
            <a-checkbox-group @change="onChangeCustom">
              <a-checkbox
                v-for="(ele, index) in customAddonList"
                :key="index"
                :value="ele.id"
                >{{ ele.addonName }}</a-checkbox
              >
            </a-checkbox-group>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import '@/styles/antReset.less'
export default {
  props: {
    commonAddonList: {
      type: Array,
      default() {
        return []
      }
    },
    customAddonList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      loading: true,
      centered: true,
      commonAddonIds: [],
      customAddonIds: []
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      // console.log(e)
      this.$emit('handlerSelectData', {
        commonAddonIds: this.commonAddonIds,
        customAddonIds: this.customAddonIds
      })
      this.visible = false
    },
    handleCancel(e) {
      this.visible = false
    },
    onChangePlug(checkedValues) {
      // console.log('checked1 = ', checkedValues)
      this.commonAddonIds = [...checkedValues]
    },
    onChangeCustom(checkedValues) {
      // console.log('checked2 = ', checkedValues)
      this.customAddonIds = [...checkedValues]
    }
  }
}
</script>

<style lang="less">
.plugin_onwer {
  .onwer_title {
    font-size: 20px;
    font-weight: 600;
    color: @color6;
    line-height: 28px;
    margin-bottom: 40px;
  }
  padding-bottom: 20px;
}
</style>
