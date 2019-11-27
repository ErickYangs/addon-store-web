<template>
  <div class="home">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="160"
        collapsedWidth="60"
        breakpoint="lg"
      >
        <div class="logo">
          <h2 v-if="!collapsed" class="logo_icon"></h2>
          <i
            v-else
            class="logo_close"
            @click="() => (collapsed = !collapsed)"
          ></i>
        </div>
        <a-menu
          theme="dark"
          mode="inline"
          :defaultSelectedKeys="[currentKey]"
          @click="handlerClick"
          :openKeys.sync="openKeys"
          :selectedKeys="[currentKey]"
        >
          <a-menu-item key="Dashboard">
            <div class="sub_wrap">
              <i class="all_icon"></i>
              <span>home</span>
            </div>
          </a-menu-item>
          <!-- <a-sub-menu key="ddxf">
            <span slot="title"
              ><i class="ddxf_icon"></i> <span>DDXF</span></span
            >
            <a-menu-item key="Plugin">
              <span class="home_sun_title">插件库</span>
            </a-menu-item>
            <a-menu-item key="Application"><span>App库</span></a-menu-item>
          </a-sub-menu> -->
          <a-menu-item key="Plugin">
            <div class="sub_wrap">
              <i class="ddxf_icon"></i>
              <span>插件库</span>
            </div>
          </a-menu-item>
          <a-menu-item key="Application">
            <div class="sub_wrap">
              <i class="app_icon"></i>
              <span>App库</span>
            </div>
          </a-menu-item>
        </a-menu>
        <div class="trigger">
          <i
            class="menu_open"
            v-if="collapsed"
            @click="() => (collapsed = !collapsed)"
          ></i>
          <i
            class="menu_clsoe"
            v-else
            @click="() => (collapsed = !collapsed)"
          ></i>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0;">
          <div class="header_wrap">
            <div class="lang_wrap">
              <langw-div></langw-div>
            </div>
            <div class="user_center">
              <user-div></user-div>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content
          :style="{
            background: '#fff',
            minHeight: '280px'
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import userDiv from '@/components/model/User.vue'
import langwDiv from '@/components/model/LangW.vue'
import * as Store from '@/utils/auth'

export default {
  name: 'home',
  components: {
    userDiv,
    langwDiv
  },
  data() {
    return {
      collapsed: false,
      openKeys: [],
      ddxfArr: ['Plugin', 'Application']
    }
  },
  methods: {
    handlerClick(option) {
      // console.log(option)
      this.$router.push({ name: option.key })
    }
  },
  computed: {
    currentKey: {
      get() {
        let route = this.$route
        // console.log(route)
        const { meta, name } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return name
      },
      set() {}
    }
  },
  mounted() {
    // let names = this.$route.name
    // if (this.ddxfArr.includes(names)) {
    //   this.openKeys = ['ddxf']
    // }
    // console.log('this.$route.', this.$route)

    let route = this.$route
    const { meta, name } = route
    // if set path, the sidebar will highlight the path you set
    let current = meta.activeMenu ? meta.activeMenu : name
    if (this.ddxfArr.includes(current)) {
      this.openKeys = ['ddxf']
    }
    this.$nextTick(() => {
      this.currentKey = 'Plugin'
    })
  },
  watch: {
    openKeys(val) {
      // console.log('openKeys', val)
    },
    getPath() {
      console.log(this.$route.path)
    }
  },
  async created() {
    let account = {
      ontid: Store.getNews('ontid'),
      username: Store.getNews('userName'),
      token: Store.getNews('token')
    }
    this.$store.commit('login/SET_ACCOUNT', account)
    await this.$store.dispatch('login/getCustomAddon')
    await this.$store.dispatch('login/getCommonAddon')
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .ant-layout {
    height: 100%;
    .ant-layout-sider {
      background: @theme-color;
    }
    .ant-layout-header {
      height: 60px;
      line-height: 60px;
      .header_wrap {
        height: 60px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 60px;
        .lang_wrap {
          width: 90px;
          height: 30px;
          margin-right: 40px;
        }
        .user_center {
          width: 60px;
          height: 50px;
        }
      }
    }
    .ant-layout-content {
      overflow-y: auto;
    }
    .ant-menu {
      li.ant-menu-item {
        margin-top: 10px;
        height: 60px !important;
        padding: 0 35px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        .sub_wrap {
          width: 100%;
          height: 30px !important;
          line-height: 30px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          transition: all 0.6s;
          border-radius: 15px;
          span {
            color: #fff !important;
            transition: all 0.6s;
          }
          i {
            display: block;
            width: 12px;
            height: 12px;
            transition: all 0.6s;
          }
          .all_icon {
            background: url(../assets/images/homeIcon_w.svg) no-repeat center;
            background-size: contain;
          }
          .ddxf_icon {
            background: url(../assets/images/ddxf_w.svg) no-repeat center;
            background-size: contain;
          }
          .app_icon {
            background: url(../assets/images/all_w.svg) no-repeat center;
            background-size: contain;
          }
        }
      }
      li.ant-menu-item-active {
        .sub_wrap {
          background: #fff;

          i.all_icon {
            background: url(../assets/images/homeIcon_b.svg) no-repeat center !important;
            background-size: contain !important;
          }
          i.ddxf_icon {
            background: url(../assets/images/ddxf_b.svg) no-repeat center !important;
            background-size: contain !important;
          }
          .app_icon {
            background: url(../assets/images/all_b.svg) no-repeat center;
            background-size: contain;
          }
          span {
            color: @theme-color !important;
          }
        }
      }
      li.ant-menu-item-selected {
        background: none !important;
        .sub_wrap {
          background: #fff;
          border-radius: 15px;
          i.all_icon {
            background: url(../assets/images/homeIcon_b.svg) no-repeat center !important;
            background-size: contain !important;
          }
          i.ddxf_icon {
            background: url(../assets/images/ddxf_b.svg) no-repeat center !important;
            background-size: contain !important;
          }
          i.app_icon {
            background: url(../assets/images/all_b.svg) no-repeat center !important;
            background-size: contain !important;
          }
          span {
            color: @theme-color !important;
          }
        }
      }
      /deep/ li.ant-menu-submenu.ant-menu-submenu-inline {
        margin-bottom: 10px;
        div.ant-menu-submenu-title {
          padding: 0 35px !important;
          height: 60px !important;
          line-height: 60px !important;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          & > span {
            width: 100%;
            height: 30px !important;
            line-height: 30px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            transition: all 0.7s;
            border-radius: 15px;
            color: #fff !important;
            i.ddxf_icon {
              display: block;
              width: 14px;
              height: 14px;
              background: url(../assets/images/ddxf_w.svg) no-repeat;
              background-size: contain;
            }
            span {
              color: #fff !important;
            }
          }
          &:hover > span {
            background: #fff;
            border-radius: 15px;
            i.ddxf_icon {
              display: block;
              width: 14px;
              height: 14px;
              background: url(../assets/images/ddxf_b.svg) no-repeat;
              background-size: contain;
            }
            span {
              color: @theme-color !important;
            }
          }
        }
        & > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after {
          background: linear-gradient(to right, #fff, #fff);
        }
        & > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before {
          background: linear-gradient(to right, #fff, #fff);
        }
        & > .ant-menu-submenu-title .ant-menu-submenu-arrow {
          transform: translateY(1px);
        }
        .ant-menu-sub {
          li.ant-menu-item {
            margin: 0;
            span {
              display: block;
              width: 100%;
              height: 30px;
              line-height: 30px;
              border-radius: 15px;
              text-align: center;
              transition: all 0.6s;
              color: #fff;
              &:hover {
                background: #fff;
                color: @theme-color;
              }
            }
          }
          li.ant-menu-item-selected {
            background: none;
            span {
              background: #fff;
              color: @theme-color;
            }
          }
        }
      }
      /deep/ li.ant-menu-submenu-open {
        & > .ant-menu-submenu-title .ant-menu-submenu-arrow {
          transform: translateY(-2px) !important;
        }
        & > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow {
          transform: translateY(-6px);
        }
      }
    }
    .ant-menu-dark,
    .ant-menu-dark .ant-menu-sub {
      background: @theme-color;
    }
    .ant-menu.ant-menu-inline-collapsed > .ant-menu-item {
      padding: 0 17px !important;
      .sub_wrap {
        width: 26px;
        height: 26px !important;
        line-height: 26px;
        background: #0076df;
        span {
          display: none;
        }
      }
    }
    // 收缩
    /deep/ .ant-menu.ant-menu-inline-collapsed {
      .ant-menu-item {
        .sub_wrap {
          border-radius: 50%;
          transition: all 0.6s;
          i.all_icon {
            transition: all 0.6s;
          }
        }
      }
      .ant-menu-item.ant-menu-item-selected {
        .sub_wrap {
          background: #fff;
        }
      }
      .ant-menu-item.ant-menu-item-active {
        .sub_wrap {
          background: #fff;
          i.all_icon {
            background: url(../assets/images/homeIcon_b.svg) no-repeat center !important;
            background-size: contain !important;
          }
          i.ddxf_icon {
            background: url(../assets/images/ddxf_b.svg) no-repeat center;
            background-size: contain;
          }
          i.app_icon {
            background: url(../assets/images/all_b.svg) no-repeat center !important;
            background-size: contain !important;
          }
        }
      }
      .ant-menu-submenu {
        padding: 0 17px !important;
        .ant-menu-submenu-title {
          padding: 0 !important;
          width: 100%;
          height: 60px;
          line-height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          & > span {
            width: 26px;
            height: 26px;
            // background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            transition: all 0.6s;
            i {
              display: block;
              width: 14px;
              height: 14px;
              background: url(../assets/images/ddxf_w.svg) no-repeat;
              background-size: contain;
              transition: all 0.6s;
            }
            span {
              display: none;
            }
            &:hover {
              background: #fff;
              i {
                background: url(../assets/images/ddxf_b.svg) no-repeat;
                background-size: contain;
              }
            }
          }
        }
      }
      .ant-menu-submenu-active {
        .ant-menu-submenu-title {
          & > span {
            background: #fff;
            i {
              background: url(../assets/images/ddxf_b.svg) no-repeat;
              background-size: contain;
            }
          }
        }
      }
      .ant-menu-submenu-selected {
        .ant-menu-submenu-title {
          & > span {
            background: #fff;
            i {
              background: url(../assets/images/ddxf_b.svg) no-repeat;
              background-size: contain;
            }
          }
        }
      }
    }
    .ant-menu-item-selected {
      .sub_wrap {
        background: #fff;
        border-radius: 15px;
        i.all_icon {
          background: url(../assets/images/homeIcon_b.svg) no-repeat center !important;
          background-size: contain !important;
        }
        i.ddxf_icon {
          background: url(../assets/images/ddxf_b.svg) no-repeat center !important;
          background-size: contain !important;
        }
        i.app_icon {
          background: url(../assets/images/all_b.svg) no-repeat center !important;
          background-size: contain !important;
        }
        span {
          color: @theme-color !important;
        }
      }
    }
  }
}

/deep/ .ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background: #0076df !important;
  box-shadow: none;
}
#components-layout-demo-custom-trigger .trigger {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.3s;
  position: absolute;
  right: 0;
  bottom: 0;
  i {
    width: 20px;
    height: 19px;
  }
  i.menu_open {
    background: url(../assets/images/menu_close.svg) no-repeat center;
    background-size: contain;
  }
  // to do
  i.menu_clsoe {
    background: url(../assets/images/menu_open.svg) no-repeat center;
    background-size: contain;
  }
}

.ant-menu-inline-collapsed {
  width: 60px !important;
}

#components-layout-demo-custom-trigger .trigger:hover {
  opacity: 0.8;
}

#components-layout-demo-custom-trigger .logo {
  height: 60px;
  background: rgba(250, 250, 250, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  h2.logo_icon {
    width: 84px;
    height: 14px;
    background: url(../assets/images/home_logo.svg) no-repeat;
    background-size: contain;
  }
  i.logo_close {
    width: 30px;
    height: 30px;
    background: url(../assets/images/top_icon.svg) no-repeat;
    background-size: contain;
    cursor: pointer;
    transition: all 0.8s;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
