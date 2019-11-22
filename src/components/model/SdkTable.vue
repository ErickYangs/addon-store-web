<template>
  <div class="sdk_table_wrap">
    <div class="title">配置专属sdk</div>
    <div class="table_body">
      <a-table
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :columns="columns"
        :dataSource="data"
        :pagination="false"
      >
        <template slot="sdklink" slot-scope="record">
          <span class="link_btn hover6">{{ record }}</span>
        </template>
        <template slot="action" slot-scope="">
          <i class="table_icon edit_icon"></i>
          <i class="table_icon delete_icon"></i>
        </template>
      </a-table>
    </div>
    <div class="descrip">
      <div class="lable_name">Application Description</div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="description"
      ></textarea>
    </div>
  </div>
</template>

<script>
import '@/styles/antReset.less'
const columns = [
  {
    title: 'Addon Name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'SDK LINK',
    dataIndex: 'link',
    scopedSlots: { customRender: 'sdklink' }
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 200,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    link: 32
  })
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [] // Check here to configure the default column
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style lang="less" scoped>
.sdk_table_wrap {
  width: 100%;
  max-width: 900px;
  .title {
    height: 24px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
    margin-bottom: 30px;
  }

  .descrip {
    .lable_name {
      height: 16px;
      font-size: @14px;
      font-weight: 400;
      color: @color6;
      line-height: 16px;
      margin-bottom: 20px;
    }
    textarea {
      display: block;
      width: 100%;
      height: 160px;
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
        font-weight: 400;
      }
    }
  }
}
// .table_body {
//   margin-bottom: 40px;
//   span.link_btn {
//     color: @theme-color;
//     text-decoration: underline;
//     cursor: pointer;
//     &:hover {
//       opacity: 0.8;
//     }
//   }
//   /deep/ .ant-table-body {
//     .ant-checkbox-inner {
//       border-radius: 50%;
//     }
//     .ant-checkbox-checked .ant-checkbox-inner::after {
//       width: 8px;
//       height: 8px;
//       transform: none;
//       background: @theme-color;
//       left: 50%;
//       top: 50%;
//       transform: translate(-50%, -50%);
//       border-radius: 50%;
//       border: none;
//     }
//     .ant-checkbox-checked .ant-checkbox-inner {
//       background: #fff;
//     }
//     .ant-table-thead {
//       tr {
//         th {
//           div {
//             color: @theme-color;
//             font-size: 16px;
//             font-weight: 600;
//           }
//         }
//       }
//     }
//   }
//   .table_icon {
//     display: inline-block;
//     width: 18px;
//     height: 16px;
//     margin: 0 10px;
//     cursor: pointer;
//   }
//   i.edit_icon {
//     background: url(../../assets/images/edit_b.svg) no-repeat center;
//   }
//   i.delete_icon {
//     background: url(../../assets/images/delete_icon.svg) no-repeat center;
//   }
//   /deep/ .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
//     background: #fafafa;
//   }
// }
</style>
