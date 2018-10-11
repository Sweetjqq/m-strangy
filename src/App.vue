<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#sign .van-field__button{
  padding-left: 0px !important;
  
}
.van-hairline--top-bottom.van-tabbar.van-tabbar--fixed {
  z-index: 1000 !important;
}
#app {
  font-family: "PingFangSC-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-color: #f8f8f8; */
}
.Mine{
  height: 100%;
}

.van-dialog__confirm,
.van-dialog__confirm:active {
  color: #007aff;
}

.van-dialog {
  width: 6.56rem;
  /* height: 4.24rem; */
  border-radius: 0.147rem;
  z-index: 999999999 !important;
  color: #2c3e50;
}

#regForm .van-cell__value {
  padding-left: 0.42rem;
}

.aplayer-author {
  display: none !important;
}
.aplayer-controller .aplayer-time .aplayer-volume-wrap + .aplayer-icon,
.aplayer-controller .aplayer-time .aplayer-icon.inactive {
  display: none;
}

#reviewArgee .van-button::before {
  background-color: #fff !important;
  border-color: #fff !important;
}

#searchI .van-search__action {
  margin-left: 8px;
  margin-right: 8px;
}

.van-cell__value {
  text-overflow: ellipsis;
}

#homeSeach .van-search__action,
#List .van-search__action {
  padding-left: 10px;
  padding-right: 10px;
}
#regdialog .van-button::before {
  background-color: #fff;
}

#regdialog .van-dialog__content {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
#btn .van-button--large {
  background: #007aff;
  color: #fff;
  width: 70%;
}

#sign .van-cell {
  line-height: 30px !important;
}

.van-nav-bar .van-icon {
  color: #000;
}

#regdialog .van-dialog__confirm {
  color: #007aff;
}

.itemBox .van-field__control {
  padding-left: 0.18rem;
}

.van-field .van-cell__title {
  text-align: right;
  max-width: 2.2rem;
}

#xieyi .van-checkbox__icon--checked .van-icon {
  border-color: #007aff;
  background-color: #007aff;
}

#regForm .van-field__icon {
  transform: rotate(90deg) !important;
}

#regForm .van-button::before {
  background: #fff !important;
}
#regForm .van-button--default {
  border: 0px;
  color: red;
}

#historyValue .van-list__loading {
  background: #f8f8f8;
}

#shareItem [class*="van-hairline"]::after {
  border: 1px solid #eaeaea !important;
}

/*禁止下载*/

audio::-webkit-media-controls {
  overflow: hidden !important;
}
audio::-webkit-media-controls-enclosure {
  width: calc(100% + 32px);
  margin-left: auto;
}

.aplayer-title {
  display: none !important;
}

</style>
