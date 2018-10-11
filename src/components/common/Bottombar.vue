
<template>
  <div class="">
    <van-tabbar v-model="active">
      <van-tabbar-item @click="HomePage">
        <span :class="active1">策略</span>
        <template slot="icon">
            <!-- <img :src="active ? me.active : me.normal" /> -->
            <img  :src="HomePageactive" />
          </template>
      </van-tabbar-item>
         <van-tabbar-item @click="Product">
        <span  :class="active2">产品</span>
        <template slot="icon">
            <img  :src="productactive" />
          </template>
      </van-tabbar-item>
      <van-tabbar-item @click="MyMsg">
        <span  :class="active3">我</span>
        <template slot="icon">
            <img  :src="Mineactive" />
          </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
  </template>

  <script>
import { Dialog } from "vant";
import { picture } from "../../config/static.js";
import { Tabbar, TabbarItem } from "vant";
import { parseUrl } from "../../config";
export default {
  props: ["Bottombar"],
  data() {
    return {
      active: 0,
      auth: false,
      HomePageactive: "",
      Mineactive: "",
      productactive: "",
      picture: {},
      active1: "blue",
      active2: "black",
      active3: "black",
      product: {
        normal: picture.product.normal,
        active: picture.product.active
      },
      strategy: {
        normal: picture.strategy.normal,
        active: picture.strategy.active
      },
      me: {
        normal: picture.me.normal,
        active: picture.me.active
      }
    };
  },
  created() {
    this.$store.dispatch("bottom");

    if (
      this.getCaption(location.href).toLowerCase() == "/searchpage" ||
      this.getCaption(location.href).toLowerCase() == "/homepage" ||
      this.getCaption(location.href).split("?")[0].toLowerCase() == "/strategydetail" ||
      this.getCaption(location.href).split("?")[0].toLowerCase() == "/issuerdetail" ||
      this.getCaption(location.href).split("?")[0].toLowerCase() == "/bonddetail" ||
      this.getCaption(location.href).toLowerCase() == "/strategydetail"
    ) {
      this.handleactive(1);
    } else if (
      this.getCaption(location.href).toLowerCase() == "/mine" ||
      this.getCaption(location.href).split("?")[0].toLowerCase() == "/register" ||
      this.getCaption(location.href).toLowerCase() == "/mymsg" ||
      this.getCaption(location.href).toLowerCase() == "/sign" ||
      this.getCaption(location.href).split("?")[0].toLowerCase() == "/fail" ||
      this.getCaption(location.href).toLowerCase() == "/success" ||
      this.getCaption(location.href).toLowerCase() == "/editpsd"
    ) {
      this.handleactive(3);
    } else if (
      this.getCaption(location.href).split("?")[0].toLowerCase() == "/productdetail" ||
      this.getCaption(location.href).split("?")[0].toLowerCase() == "/holdinganalysis" ||
      this.getCaption(location.href).toLowerCase() == "/productList" ||
      this.getCaption(location.href).toLowerCase() == "/productlist" ||
      this.getCaption(location.href).split("?")[0].toLowerCase() == "/shareview" ||
      this.getCaption(location.href).toLowerCase() == "/holdinganalysis"
    ) {
      this.handleactive(2);
    }
  },
  methods: {
    regFirst() {
      Dialog.alert({
        message:
          '<span style="text-align: center;display:block">请先注册</span>'
      }).then(() => {});
    },
    HomePage() {
      if (
        this.getCaption(location.href).split("?")[0] == "/Register" ||
        this.getCaption(location.href).split("?")[0] == "/Fail"
      ) {
        this.regFirst();
      } else {
        this.handleactive(1);
        this.$router.push("/HomePage");
      }
    },
    MyMsg() {
      if (
        this.getCaption(location.href).split("?")[0] == "/Register" ||
        this.getCaption(location.href).split("?")[0] == "/Fail"
      ) {
        this.regFirst();
      } else {
        this.handleactive(3);
        this.$router.push("/Mine");
      }
    },
    Product() {
      if (
        this.getCaption(location.href).split("?")[0] == "/Register" ||
        this.getCaption(location.href).split("?")[0] == "/Fail"
      ) {
        this.regFirst();
      } else {
        this.handleactive(2);
        this.$router.push("/productList");
      }
    },
    handleactive(params) {
      if (params == 1) {
        this.active1 = "blue";
        this.active2 = "black";
        this.active3 = "black";
        this.HomePageactive = this.strategy.active;
        this.productactive = this.product.normal;
        this.Mineactive = this.me.normal;
      } else if (params == 2) {
        this.active2 = "blue";
        this.active3 = "black";
        this.active1 = "black";
        this.HomePageactive = this.strategy.normal;
        this.productactive = this.product.active;
        this.Mineactive = this.me.normal;
      } else if (params == 3) {
        this.active3 = "blue";
        this.active2 = "black";
        this.active1 = "black";
        this.HomePageactive = this.strategy.normal;
        this.productactive = this.product.normal;
        this.Mineactive = this.me.active;
      }
    },
    getCaption(obj) {
      var index = obj.lastIndexOf("#");
      obj = obj.substring(index + 1, obj.length);
      return obj;
    }
  }
};
</script>

  <style scoped>
.blue {
  color: #38f;
}

.black {
  color: black;
}
</style>
