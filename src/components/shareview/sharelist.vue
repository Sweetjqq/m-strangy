<template>
<div>
    <Header  ref="header" :headerObj="headerObj"></Header>
    <div  id="sharelist" class=" shareItem ">
      <ShareItem :ShareItemObj="ShareItemObj"></ShareItem>
    </div>
    <div id="noconbox"></div>
  <Bottombar></Bottombar>
</div>
</template>

<script>
import fetch from "../../config/fetch";

import {
  setCookie,
  getCookie,
  removeCookie,
  showMsg,
  parseUrl
} from "../../config";
import Bottombar from "../common/Bottombar.vue";
import { List } from "vant";
import ShareItem from "./shareitem";
import Header from "../common/Header.vue";
export default {
  components: {
    Bottombar,
    ShareItem,
    Header
  },
  props: ["shareItem"],
  data() {
    return {
      productCode: "",
      ShareItemObj: {}
    };
  },
  created() {
    //截取路由参数
    console.log(parseUrl());
    this.parseUrl = parseUrl();
    this.headerObj = {
      name: this.productName(this.parseUrl.productTitle)
    };
    if (!this.parseUrl) {
      showMsg("产品code为空");
    } else {
      this.query();
    }
  },
  methods: {
    productName(itemName) {
      if (itemName.length <= 4) {
        var second = itemName.substr(0, 1);
        var lastsecond = itemName.substr(itemName.length - 1, itemName.length);
        console.log(second, lastsecond);
      } else {
        var second = itemName.substr(0, 2);
        var lastsecond = itemName.substr(itemName.length - 2, itemName.length);
        console.log(second, lastsecond);
      }
      return second + "****" + lastsecond;
    },
    async query() {
      let queryData = await fetch.get(
        "/v1/tacticsC/getImageTextByProductCodeJM",
        {
          productCode: this.parseUrl.productCode,
          cname: getCookie("AccountId")
        }
      );
      console.log(queryData);
      if (queryData.data.status == 200) {
        this.ShareItemObj = queryData.data.data;
      } else {
        showMsg("请求数据失败");
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sharelist {
  height: 100%;
  background: #fff !important;
  margin-bottom: 1.4rem;
}

#noconbox {
  height: 0.666667rem;
}
</style>

