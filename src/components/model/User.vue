<template>
  <div class="user_wrap">
    <a-dropdown
      :getPopupContainer="
        triggerNode => {
          return triggerNode.parentNode || document.body
        }
      "
    >
      <a class="ant-dropdown-link">
        <div class="usericon">
          <a-avatar :size="30" icon="user" />
          <i class="arrow_"></i>
        </div>
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <span>{{ account.username }}</span>
        </a-menu-item>
        <a-menu-item>
          <span @click="logOut">Drop out</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import * as Storage from '@/utils/auth'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      account: state => state.login.account
    })
  },
  methods: {
    logOut() {
      Storage.clear()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="less">
.user_wrap {
  width: 100%;
  height: 100%;
  .ant-dropdown-link {
    display: block;
    width: 100%;
    height: 100%;
    .usericon {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i.arrow_ {
        display: block;
        width: 6px;
        height: 4px;
        background: url(../../assets/images/arrow_down.svg) no-repeat center;
        background-size: contain;
        transition: all 0.5s;
      }
    }
  }
  .ant-dropdown-link.ant-dropdown-open {
    .usericon {
      i.arrow_ {
        transform: rotate(-90deg);
      }
    }
  }
  .ant-dropdown {
    ul {
      transform: translateX(28px);
      padding: 0;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      li {
        padding: 0;
        span {
          padding: 0;
          margin: 0;
          display: block;
          width: 136px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          font-weight: 400;
          color: @color6;
          padding: 0 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      li.ant-dropdown-menu-item:hover {
        background: rgba(242, 242, 242, 1);
        span {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
}
</style>
