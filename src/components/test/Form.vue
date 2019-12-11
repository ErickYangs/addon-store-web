<template>
  <div class="formLayout">
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
              rules: [{ required: true, message: 'Please input your nickname' }]
            }
          ]"
          placeholder="Please input your nickname"
        />
      </a-form-item>

      <div class="test_label">
        Actions
        <a-button @click="addConfig" style="margin-left: 20px;"
          >Add Config</a-button
        >
      </div>
      <a-row v-for="(item, index) in configTemp.actions" :key="index">
        <!-- action -->
        <a-form-item
          label="Action"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <a-input
            placeholder="action"
            v-decorator="[
              `actions.${index}.action`,
              {
                initialValue: item.action,
                rules: [{ required: true, message: 'Please input your action' }]
              }
            ]"
          ></a-input>
        </a-form-item>
        <!-- callbackUrl -->
        <a-form-item
          label="callbackUrl"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              `actions.${index}.callbackUrl`,
              {
                initialValue: item.callbackUrl,
                rules: [
                  { required: true, message: 'Please input your callbackUrl' }
                ]
              }
            ]"
            placeholder="callbackUrl"
          ></a-input>
        </a-form-item>
        <!-- dataUrl -->
        <a-form-item
          label="dataUrl"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              `actions.${index}.dataUrl`,
              {
                initialValue: item.dataUrl,
                rules: [
                  { required: true, message: 'Please input your dataUrl' }
                ]
              }
            ]"
            placeholder="dataUrl"
          ></a-input>
        </a-form-item>
        <!-- Type -->
        <a-form-item
          label="Type"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="{ span: 6 }"
        >
          <a-select
            placeholder="Please select type"
            v-decorator="[
              `actions.${index}.type`,
              {
                initialValue: item.type,
                rules: [{ required: true, message: 'Please input your type' }]
              }
            ]"
          >
            <a-select-option value="ontid">ONT ID</a-select-option>
            <a-select-option value="address">Address</a-select-option>
          </a-select>
        </a-form-item>
        <!-- Network -->
        <a-form-item
          label="Network"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <a-radio-group
            v-decorator="[
              `actions.${index}.mainNet`,
              {
                initialValue: item.mainNet,
                rules: [
                  { required: true, message: 'Please input your Network' }
                ]
              }
            ]"
          >
            <a-radio :value="true">mainNet</a-radio>
            <a-radio :value="false">testNet</a-radio>
          </a-radio-group>
        </a-form-item>
        <!-- onchainRec -->
        <a-form-item
          label="onchainRec"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <a-radio-group
            v-decorator="[
              `actions.${index}.onchainRec`,
              {
                initialValue: item.onchainRec,
                rules: [
                  { required: true, message: 'Please input your onchainRec' }
                ]
              }
            ]"
          >
            <a-radio :value="true">True</a-radio>
            <a-radio :value="false">False</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-button
          v-if="configTemp.actions.length > 1"
          type="danger"
          @click="deleteItem(index)"
          >Delete</a-button
        >
      </a-row>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" @click="check">
          Check
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}
export default {
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      formLayout: 'horizontal',
      configTemp: {
        payerAddress: '',
        payerPrivateKey: '',
        actions: [
          {
            action: '',
            dataUrl: '',
            callbackUrl: '',
            type: 'ontid',
            onchainRec: true,
            mainNet: false
          }
        ]
      }
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
    addConfig() {
      this.configTemp.actions.push({
        action: '',
        dataUrl: '',
        callbackUrl: '',
        type: 'ontid',
        onchainRec: true,
        mainNet: false
      })
    },
    deleteItem(index) {
      this.configTemp.actions.splice(index, 1)
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
.test_label {
  margin-bottom: 20px;
}
.formLayout {
  width: 100%;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 20px;
}
.ant-form {
  .ant-form-item {
    .ant-form-item-label {
      line-height: 40px;
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
