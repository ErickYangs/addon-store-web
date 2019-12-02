<template>
  <a-form :form="form" :layout="formLayout">
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Name"
    >
      <a-input
        disabled
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your name' }] }
        ]"
        placeholder="Please input your name"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Nickname"
    >
      <a-input
        v-decorator="[
          'nickname',
          {
            rules: [
              { required: checkNick, message: 'Please input your nickname' }
            ]
          }
        ]"
        placeholder="Please input your nickname"
      />
    </a-form-item>
    <a-form-item
      :label-col="formTailLayout.labelCol"
      :wrapper-col="formTailLayout.wrapperCol"
    >
      <a-textarea
        v-decorator="['textareaText']"
        placeholder="Basic usage"
        :rows="4"
      />
    </a-form-item>
    <a-form-item
      :label-col="formTailLayout.labelCol"
      :wrapper-col="formTailLayout.wrapperCol"
    >
      <a-button type="primary" @click="check">
        Check
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
const formItemLayout = {}
const formTailLayout = {}
export default {
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      formLayout: 'vertical'
    }
  },
  methods: {
    check() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.info('success')
          console.log('values', values)
        }
      })
    },
    handleChange(e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    }
  },
  mounted() {
    this.form.setFieldsValue({
      username: 'username'
    })
  }
}
</script>

<style lang="less">
.ant-form {
  .ant-form-item {
    .ant-form-item-label {
      line-height: 30px;
      label {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
      }
      .ant-form-item-required::before {
        content: '';
        margin: 0;
      }
      .ant-form-item-required::after {
        display: inline-block;
        margin-left: 4px;
        color: #f5222d;
        font-size: 14px;
        font-weight: 400;
        content: '*';
      }
    }
    .ant-form-item-control-wrapper {
      .ant-form-item-control {
        .ant-input {
          border: none;
          border-bottom: 1px solid #f2f2f2;
          border-radius: 0;
          color: #000;
          padding-left: 0;
          resize: none;
        }
        .ant-input:focus {
          box-shadow: none;
          border-bottom-color: #ccc;
        }
        textarea {
          border: 1px solid #f2f2f2 !important;
        }
        textarea:focus {
          border: 1px solid #ccc !important;
        }
        .ant-input-disabled {
          background: #fff;
          border-bottom: none;
        }
      }
    }
  }
}
</style>
