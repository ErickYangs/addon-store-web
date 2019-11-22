<template>
  <div class="dialog_box">
    <a-button type="primary" @click="showModal">Open Modal</a-button>
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
            <a-checkbox-group @change="onChange">
              <a-checkbox value="A">Singning</a-checkbox>
              <a-checkbox value="B">Singning</a-checkbox>
              <a-checkbox value="C">Claim</a-checkbox>
              <a-checkbox value="D">Singning</a-checkbox>
              <a-checkbox value="E">E</a-checkbox>
            </a-checkbox-group>
          </div>
        </div>
        <div class="plugin_onwer">
          <div class="onwer_title">Custom Plug-in</div>
          <div class="plg_wrap">
            <a-checkbox-group @change="onChange">
              <a-checkbox value="A">Singning</a-checkbox>
              <a-checkbox value="B">Singning</a-checkbox>
              <a-checkbox value="C">Claim</a-checkbox>
              <a-checkbox value="D">Singning</a-checkbox>
              <a-checkbox value="E">E</a-checkbox>
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
  data() {
    return {
      visible: true,
      loading: true,
      centered: true
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
    },
    handleCancel(e) {
      this.visible = false
    },
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
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
