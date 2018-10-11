<template>
  <div  id="productList" class=" productList ">
    <div class=" productListItems van-hairline--bottom" v-for="(item,i) in productList" :key="i" @click="enterList(item)">
    <div class="productBox" >
      <span class="productName">{{productName(item.productTitle)}}</span>
      <van-tag plain type="" class="tag" v-if="item.productStatus == 0">未知</van-tag>
      <van-tag plain type="" class="tag"  style="color:#f23e4c" v-if="item.productStatus == 1">建仓中</van-tag>
      <van-tag plain type="" class="tag" style="color:#a95fce" v-if="item.productStatus == 2">开户中</van-tag>
      <van-tag plain type="" class="tag" style="color:#f58200" v-if="item.productStatus == 3">备案中</van-tag>
      <van-tag plain type="primary" class="productTag tag" v-if="item.productStatus == 4">募集中</van-tag>
      <van-tag plain type="" class="tag" style="color:#83ad33" v-if="item.productStatus == 5">清盘中</van-tag>
      <van-tag plain type="" class="tag" style="color:#9b9b9b" v-if="item.productStatus == 6">已结束</van-tag>
      <div class="isRelease" v-if ="item.hasNewImageText"> <img id="releaseImg" src="../../../static/image/isrelease.png" alt="">&nbsp;<span >新的投顾观点已发布</span></div>
    </div>
    <div class="applies"> <span :class="netValueReturn(item.netValueReturn)">{{item.netValueReturn}}</span> <span class="netWorth">{{item.netValue}}</span></div>
    <div class="appliesLabel"> <span>涨跌幅</span> <span class="netWorthLabel">净值</span></div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie, removeCookie } from "../../config";
import fetch from "../../config/fetch";
export default {
  props: ["productList"],
  data() {
    return {
    };
  },
  created() {},
  computed: {},
  methods: {
     netValueReturn(netValueReturn) {
      if (netValueReturn.substr(0, 1) == "+") {
        return "red";
      } else if (netValueReturn.substr(0, 1) == "0") {
        return "black";
      } else if (netValueReturn.substr(0, 1) == "-") {
        return "green";
      }
    },
    async enterList(item) {
      if(item.hasNewImageText){
        let queryData = await fetch.post("/v1/tacticsC/readProductJM", {
            productCode :item.productCode,
            cname:getCookie('AccountId'),
          });
          if(queryData.data.status == 200){
            this.$router.push("/ProductDetail?id="+item.id+'&name='+item.productTitle+"&imageTextId="+item.imageTextId);
          }
      }else{
        this.$router.push("/ProductDetail?id="+item.id+'&name='+item.productTitle+"&imageTextId="+item.imageTextId);
      }
    },
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
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.productListItems {
  height: 109px;
  background: #fff !important;
}
.red {
  color: red;
}
.green {
  color: yellowgreen;
}

.productBox {
  padding-top: 0.213333rem;
  height: 0.8rem;
  padding-left: 0.64rem;
  padding-right: 0.373333rem;
  line-height: 0.8rem;
}
.productName {
  padding-right: 0.266667rem;
  font-family: PingFangSC-Regular;
  font-size: 0.426667rem;
  color: #000000;
  letter-spacing: 0;
}
.productTag {
  color: #4a90e2;
}

.isRelease {
  float: right;
  font-family: PingFangSC-Medium;
  font-size: 10px;
  color: #bbbbbb;
  letter-spacing: 0;
  text-align: right;
}

.applies {
  padding-left: 0.64rem;
  padding-top: 0.266667rem;
  font-family: HelveticaNeue;
  font-size: 0.64rem;
  color: #d0021b;
  line-height: 0.64rem;
}

.netWorth {
  padding-right: 2.8rem;
  float: right;
  font-family: HelveticaNeue;
  font-size: 0.6rem;
  color: #000000;
  letter-spacing: 0.005867rem;
  text-align: center;
  line-height: 0.64rem;
}

.appliesLabel {
  padding-top: 0.08rem;
  padding-bottom: 0.28rem;
  padding-left: 0.64rem;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 0.64rem;
}

.netWorthLabel {
  padding-left: 3.626667rem;
}

#releaseImg {
  display: inline-block;
  width: 0.32rem;
  height: 11px;
  vertical-align: middle;
}
.tag{
  height: .4rem;
}
</style>
