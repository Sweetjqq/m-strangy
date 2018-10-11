<template>
    <div style="background:#fff;height:100%;" id="productList">
         <Header ref="header" :headerObj="headerObj"></Header>
         <div class="time" v-if="noProduct">最新清算时间：&nbsp;{{time}}</div>
         <div id="ProductListComponentBox" v-if="noProduct">
           <ProductListComponent :productList="productList"></ProductListComponent>
         </div>
         <div v-else style="color: rgb(51, 51, 51);
          font-size: 14px;
          padding: 6px 15px;
          position: absolute;
          top: 50%;
          color: #9b9b9b;
          left: 50%;
          transform: translate;
          transform: translate(-50%,-50%);
          width: 86%;
          font-family: 'PingFangSC-Regular'">您暂无关联的已成立产品，如有疑问，请点击右上角按钮联系客服</div>
         <div id ="nocontent"></div>
        <Bottombar></Bottombar>
    </div>
</template>

<script>
import { setCookie, getCookie, removeCookie ,showMsg} from "../../config";
import { List ,Toast} from "vant";
import fetch from "../../config/getData";
import Header from "../common/Header.vue";
import Bottombar from "../common/Bottombar.vue";
import ProductListComponent from "./productListcomponent";
export default {
  components: {
    Bottombar,
    Header,
    ProductListComponent
  },
  data() {
    return {
      noProduct:true,
      time: "",
      productList: Array
    };
  },
   created() {
    this.headerObj = {
      name: "我的产品"
    };
     this.query();
  },
  methods: {
   
    async query() {
      await Toast.loading({
        duration: "0",
        mask: true,
        message: "正在加载..."
      });
      let queryData = await fetch.get("/v1/tacticsC/getProductInfoJM", {
          cname: getCookie('AccountId')
      })
      if (queryData.data.status ==200) {
        if(Object.keys(queryData.data.data).length == 0){
          this.noProduct = false;
          Toast.clear();
        }
        console.log(queryData.data.data.productList)
        this.time = queryData.data.data.date;
        this.productList = queryData.data.data.productList;
        Toast.clear();
      }else{
        Toast.clear();
        showMsg('请求数据失败')
      }
    }
  }
};
</script>

<style scoped>
#nocontent{
  height: 1.4rem;
}
.time {
  background: #fafafa;
  height: 30px;
  font-size: 0.32rem;
  line-height: 30px;
  padding-left: 0.533333rem;
}

.ProductListComponentBox{
  margin-bottom: 1.4rem
}

</style>
