<template>
  <div class="dialog_box">
    <a-modal
      wrapClassName="out_dialog"
      width="890px"
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
          {{ $t('common.confirm') }}
        </a-button>
      </template>
      <div class="json_dialog_content">
        <v-jsoneditor
          ref="jsonEditor"
          v-model="jsonData"
          :plus="false"
          height="400px"
          @error="onError"
          @onChange="changes"
        ></v-jsoneditor>
      </div>
    </a-modal>
  </div>
</template>
<script>
import '@/styles/antReset.less'
import VJsoneditor from 'v-jsoneditor'
export default {
  props: {
    jsonConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    jsonConfig(val) {
      this.jsonData = val
    }
  },
  data() {
    return {
      visible: false,
      centered: true,
      jsonData: {}
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.$emit('HandlerJsonConfig', this.jsonData)
      this.visible = false
    },
    changes(a) {
      // console.log(a)
    },
    onError() {}
  },
  components: {
    VJsoneditor
  }
}
</script>

<style lang="less">
.json_dialog_content {
  width: 100%;
  height: 400px;
}
</style>
