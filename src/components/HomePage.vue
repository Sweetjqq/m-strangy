<template>
  <div class="hello" style="height: 100%;background: #fff;">
    <Header ref="header" :headerObj="headerObj"></Header>


    <div class="scrollContent">

      <div class="" id="homeSeach">
        <van-search placeholder="search" v-model="value" @focus="onSearch()" />
        </van-search>
      </div>

    <!--  <van-swipe :autoplay="3000" class="swipe">
        <van-swipe-item>
          <img style="width:100%;height:100%;" src="../assets/lunpo1.jpg" />
        </van-swipe-item>
        <van-swipe-item>
          <img style="width:100%;height:100%;" src="../assets/lunpo2.jpg" />
        </van-swipe-item>
        <van-swipe-item>
          <img style="width:100%;height:100%;" src="../assets/lunpo3.jpg" />
        </van-swipe-item>
      </van-swipe> -->


      <div class="" style="margin-bottom: 1.4rem;background:#fff;">
        <!-- <van-list v-model="loading" v-if="listData.length>0" :finished="finished" @load="onLoad" :loading-text="loadingtext" :offset="offset">
          <Lists ref="list" :listData="listData"></Lists>
          <div v-if="review" class="" style="width: 100%;text-align:center;padding-bottom:1.2rem;">
            <van-button size="small" style=" height:  .64rem;width: 2.88rem;line-height:.69rem;border-radius: 0.987rem;margin: .32rem auto 0;"
              @click="reviewMore" :disabled="reviewDis">点击查看更多</van-button>

          </div>
          <div v-if="nomore" class="van-list__loading">
            <div class="van-loading van-loading--circular van-loading--black">
              <span class="van-loading__spinner van-loading__spinner--circular"></span>
            </div>
            <span class="van-list__loading-text">暂无更多数据</span>
          </div>

        </van-list> -->
  <van-list style="margin-bottom: .293rem" v-model="loading" v-if="listData.length>0" :finished="finished" @load="onLoad" :loading-text="loadingtext">
    <Lists ref="list" :listData="listData"></Lists>
    <div v-if="nomore" class="van-list__loading">
            <div class="van-loading van-loading--circular van-loading--black">
              <span class="van-loading__spinner van-loading__spinner--circular"></span>
            </div>
            <span class="van-list__loading-text">暂无更多数据</span>
          </div>
  </van-list>
   
      </div>
    </div>
    <div id="noconbox"></div>
    <Bottombar ref="Bottombar" :Bottombar="Bottombar"></Bottombar>
  </div>
</template>

<script>
import fetch from "../config/fetch";
import { Toast } from "vant";
import { Panel } from "vant";
import Header from "./common/Header.vue";
import Bottombar from "./common/Bottombar.vue";
import Lists from "./common/List.vue";
import { getCookie, removeCookie, showMsg } from "../config";
import { NavBar, Dialog } from "vant";

import { Search } from "vant";
import { AddressEdit } from "vant";
import { Swipe, SwipeItem } from "vant";
export default {
  components: {
    Header,
    Bottombar,
    Lists
  },
  data() {
    return {
      nomore: false,
      reviewDis: false,
      review: true,
      finished: false,
      loading: false,
      value: "",
      offset: 10,
      areaList: {},
      searchResult: [],
      listData: [],
      loadingtext: "",
      page: 2
    };
  },
  created() {
    this.headerObj = {
      name: "策略"
    };

    this.Bottombar = {
      name: "首页"
    };
    Toast.loading({
      mask: true,
      duration: 0,
      message: "加载中..."
    });
    this.query();
  },
  methods: {
    async query() {
      let queryData = await fetch.get(
        "/v2/StrategyApi/SearchStrategyPaged_CEndInf",
        {
          AccountId: getCookie("AccountId"),
          m_PageSize: "8",
          m_PageNum: "1",
          m_StrategyName: ""
        }
      );
      console.log(queryData, "queryData");
      if (queryData) {
        if (queryData.data && queryData.data.status == 401) {
          if (getCookie("Token")) {
            removeCookie("Token");
          }
          this.$router.push("/");
        } else if (queryData.data && queryData.data.ResultCode == 200) {
          console.log(queryData, "queryData.data.ReturnParam.length");
          this.listData = queryData.data.ReturnParam;
        }
        Toast.clear();
      } else {
        showMsg("接口异常");
        Toast.clear();
      }
    },
    onSearch() {
      this.$router.push("/SearchPage");
    },
    async onLoad() {
      let queryData = await fetch.get("/v2/StrategyApi/SearchStrategyPaged_CEndInf", {
        AccountId: getCookie("AccountId"),
        m_StrategyName: "",
        m_PageSize: "8",
        m_PageNum: this.page
      });
      console.log(queryData,'queryData')
      if (queryData.data.status == 401) {
        Dialog.alert({
          message: "Token已经过期"
        }).then(() => {
          // on close
        });
        if (getCookie("Token")) {
          removeCookie("Token");
        }
          this.$router.push("/");
      }
      if (queryData.data.ResultCode == 200 || queryData.data.ResultCode  == 5051) {
        queryData.data.ReturnParam.map(item => {
          this.listData.push(item);
        });
        if (queryData.data.ReturnParam.length > 0) {
          this.review = false;
          this.loading = false;
          this.finished = false;
          this.page++;
        } else {
          this.nomore = true;
          this.review = false;
          this.loading = false;
          this.finished = true;
        }
      }else{
        this.nomore = true;
        this.review = false;
        this.loading = false;
        this.finished = true;
        showMsg(queryData.data.ResultMessage);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swipe {
  position: relative;
  height: 5.97rem;
}

.hello .van-button::before {
  background: #fff;
  border-color: #fff;
}

.suggest {
  position: absolute;
}
                          
.van-search {
  padding: 0.21rem 0.43rem;
}

#noconbox{
  height: .666667rem;
}
</style>
