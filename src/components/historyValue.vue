
<template>
    <div style="background:#fff;" id="historyValue">
         <Header ref="header" :headerObj="headerObj"></Header>
         <div id="">
        <div id="bodyBox">
          <van-row style="text-align:center">
            <van-col span="8">  <span @click="sort(true)">日期 <img style="vertical-align: middle;width: 9px;display:inline-block" :src="imgUrl" alt=""></span>  </van-col>
            <van-col span="5">  <span>单位净值</span>  </van-col>
            <van-col span="5">  <span>累计净值</span></van-col>
            <van-col span="6">  <span>日涨跌幅</span></van-col>
          </van-row>
        </div>
        <van-list
         id="historyValueBox"
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
        <div class="van-hairline--bottom bodyText" v-for="(item,i) in list" :key="i" :title="item + ''"  style="">
          <van-row style="text-align:center">
            <van-col span="8" style="" id="deadline"><span>{{item.date}}</span></van-col>
            <van-col span="5" class="fonthistory"><span>{{item.netValue}}</span></van-col>
            <van-col span="5" class="fonthistory"><span>{{item.accNetValue}}</span></van-col>
            <van-col span="6" class="fonthistory"><span :class="netValueReturn(item.netValueReturn)">{{item.netValueReturn}}</span></van-col>
          </van-row>
        </div>
      </van-list>
      </div>
    </div>
</template>

<script>
import fetch from "../config/fetch";
import { setCookie, getCookie, removeCookie, showMsg, parseUrl } from "../config";
import { List, Dialog, Toast } from "vant";
import Header from "./common/Header.vue";
export default {
  components: {
    Header
  },
  data() {
    return {
      applies: "green",
      down: "../../static/image/down.png",
      imgUrl: this.down,
      up: "../../static/image/up.png",
      list: [],
      loading: false,
      finished: false,
      queryObj: {
        page: 1,
        pageSize: 20,
        order: "desc"
      },
      pagefen: "1",
      renderFinisih: false,
      parseUrl:{}
    };
  },
  created() {
    this.getHeaderName();
    this.imgUrl = this.down;
    console.log(parseUrl());
    this.parseUrl = parseUrl()
  },
  mounted(){
   console.log(this.GetLocalIPAddr() + "<br/>");
  },
  methods: {
    GetLocalIPAddr() {
      var oSetting = null;
      var ip = null;
      try {
        oSetting = new ActiveXObject("rcbdyctl.Setting");
        ip = oSetting.GetIPAddress;
        if (ip.length == 0) {
          return "没有连接到Internet";
        }
        oSetting = null;
      } catch (e) {
        return ip;
      }
      return ip;
    },
    getHeaderName() {
      this.headerObj = {
        name: "历史净值"
      };
    },
    netValueReturn(netValueReturn) {
      if (netValueReturn.substr(0, 1) == "+") {
        return "red";
      } else if (netValueReturn.substr(0, 1) == "0") {
        return "black";
      } else if (netValueReturn.substr(0, 1) == "-") {
        return "green";
      }
    },
    sort(flag) {
      //特效
      if(flag){
        if (this.imgUrl == this.up) {
          this.imgUrl = this.down;
          this.queryObj.order = "desc";
          this.pagefen = 1;
          this.list = [];
          this.onLoad();
        } else {
          this.imgUrl = this.up;
          this.queryObj.order = "asc";
          this.pagefen = 1;
          this.list = [];
          this.onLoad();
        }
      }
    },
    async onLoad() {
      let queryData = await fetch.get("/v1/tacticsC/getHistoryNetValueList", {
        productCode: this.parseUrl.productCode,
        page: this.pagefen,
        pageSize: this.queryObj.pageSize,
        order: this.queryObj.order
      });
      if (queryData.data.status == 200) {
        if(queryData.data.data && queryData.data.data.length >0 ){
            this.loading = false;
            this.pagefen++;
            queryData.data.data.map(item => {
              this.list.push(item);
            });
        }else{
          // 没有数据
            this.sort(false);
            this.finished = true;
            $(".van-list__loading-text").text("暂无更多数据");
            $(".van-loading__circular").remove();
        }
      } else {
        showMsg("请求数据失败");
      }
    }
  }
};
</script>

<style scoped>
#historyValueBox, .van-list__loading{
  background: #fff !important;
}

.black {
  color: black;
}
#bodyBox {
  height: 0.8rem;
  line-height: 0.8rem;
  background: #f8f8f8;
}
.bodyText {
  background: #fff;
  line-height: 1.12rem;
}
#deadline {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #666666;
  letter-spacing: 0;
  line-height: 1.093333rem;
}
.red {
  color: red;
}
.green {
  color: yellowgreen;
}
.fonthistory {
  font-family: HelveticaNeue;
  font-size: 14px;
  color: #666666;
  text-align: center;
  line-height: 1.093333rem;
}
</style>
