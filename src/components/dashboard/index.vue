<template>
  <div class="dashboard">
    <div class="word_bg"></div>
    <div class="slogin">
      <div class="main_slogin">
        <p>
          {{ $t('dashboard.main_title') }}
        </p>
        <p>
          {{ $t('dashboard.sass') }}
        </p>
      </div>
      <div class="go_tips" v-if="$i18n.locale === 'en'">
        {{ $t('dashboard.letgo') }}
      </div>
      <a-button
        class="get_start_btn"
        @click="$router.push({ name: 'Application' })"
        >{{ $t('dashboard.start') }}</a-button
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  background: @theme-color;
  position: relative;
  margin-top: -60px;
  .word_bg {
    position: absolute;
    width: 610px;
    height: 358px;
    right: 120px;
    top: 200px;
    background: url(../../assets/images/home.svg) no-repeat center;
    background-size: contain;
  }
  .slogin {
    position: absolute;
    left: 140px;
    top: 200px;
    .main_slogin {
      font-size: 60px;
      line-height: 70px;
      margin-bottom: 20px;
      p {
        font-weight: 900;
        color: rgba(255, 255, 255, 1);
      }
    }
    .go_tips {
      height: 50px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
    }
    .get_start_btn {
      margin-top: 60px;
      border: none;
      width: 140px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border-radius: 25px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      font-weight: 900;
      color: @theme-color;
    }
  }
}
</style>
