<template>
<div class="SuccessBox">
  <Header ref="header" :headerObj="headerObj"></Header>
  <div style="margin-top:60px;">
    <img id="button" src="../../../static/image/success_button.png" />
    <span class="Success_msg">操作成功！</span>
  </div>
  
  <img id="unlogo" src="../../../static/unlogo.jpg" alt="">
  <div>扫描二维码关注公众号，点击</div>
  <div>菜单栏“眼火策略”进入系统</div>
  <van-button size="normal" type="primary" @click="goLogin">确定</van-button>
  <Bottombar></Bottombar>
</div>
</template>

<script>
import { removeStore, setStore } from "../../config";
import Header from "./Header.vue";

import { Button } from "vant";
import Bottombar from "./Bottombar.vue";
export default {
  components: {
    Bottombar,
    Header
  },
  data() {
    return {};
  },
  created() {
    this.headerObj = {
      name: "操作成功"
    };
  },
  methods: {
    goLogin() {
      removeStore("userRegInfo");
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.SuccessBox {
  text-align: center;
}

#button {
  display: inline-block;
  height: .8rem;
  vertical-align: middle;
}

.Success_msg {
  vertical-align: middle;
  display: inline-block;
  text-align: center;
  color: #4a4a4a;
  font-size: 0.427rem;
  line-height: 0.533rem;
}

.van-button {
  width: 6.907rem;
  height: 1.173rem;
  border-radius: 0.987rem;
  background: #4a90e2;
  border-color: #4a90e2;
  font-size: 0.373rem;
  margin: 1.067rem auto;
}

#unlogo {
  width: 200px;
  height: 200px;
  margin: 0px;
}
</style>
