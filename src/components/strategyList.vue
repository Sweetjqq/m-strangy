<template>
<div class="searchList" id="List" style="
    height: 100%;
    background: #fff;
">
  <Header ref="header" :headerObj="headerObj"></Header>
  <div class="">
    <form action="/">

      <van-search placeholder="search" v-model="value" @focus="onSearch()"/>
      </van-search>

    </form>
  </div>


  <!--  -->
  <van-list style="margin-bottom: 3.4rem;" v-model="loading" v-if="listData.length>0" :finished="finished" @load="onLoad" :loading-text="loadingtext">
    <Lists ref="list" :listData="listData"></Lists>
  </van-list>

  <div class="van-list__loading" v-else>
    <div class="van-loading van-loading--circular van-loading--black"><span class="van-loading__spinner van-loading__spinner--circular"></span></div><span class="van-list__loading-text">暂无更多数据</span></div>

  <Bottombar></Bottombar>
</div>
</template>

<script>
import Header from "./common/Header.vue";
import { List } from "vant";
import Bottombar from "./common/Bottombar.vue";
import Lists from "./common/List.vue";
import { parseUrl } from "../config";
import { NavBar } from "vant";
import { Dialog } from "vant";
import { Search } from "vant";
import { AddressEdit } from "vant";
import { Swipe, SwipeItem } from "vant";
import { getCookie } from "../config";
export default {
  components: {
    Bottombar,
    Lists,
    Header
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      value: "",
      areaList: {},
      searchResult: [],
      listData: [],
      loadingtext: "",
      page: 2,
      searchvalue: ""
    };
  },
  created() {
    this.headerObj = {
      name: "搜索结果"
    };
    const queryObj = {};
    parseUrl(queryObj);
    console.log(queryObj.searchvalue, "searchvalue");
    this.searchvalue = queryObj.searchvalue;
    axios({
      method: "get",
      headers: {
        Authorization: "bearer " + getCookie("Token")
      },
      url: "/v2/StrategyApi/SearchStrategyPaged_CEndInf",
      params: {
        AccountId: getCookie("AccountId"),
        m_PageSize: "8",
        m_PageNum: "1",
        m_StrategyName: this.searchvalue
      }
    })
      .then(res => {
        if(res.data.ResultCode== 200){
        console.log(res.data.ReturnParam, "res");
        if (res.data.ReturnParam.length > 0) {
          this.listData = res.data.ReturnParam;
          this.loading = false;
          this.finished = true;
          this.onLoad();
        } else {
          this.loadingtext = "暂无更多数据";
          this.loading = false;
          this.finished = true;

        }
      }else if (res.data.status== 401) {
        Dialog.alert({
          message: "Token已经过期"
        }).then(() => {
          // on close
        });
        this.$router.push("/");
      }else if(res.data.ResultCode == 5051){
          this.listData = res.data.ReturnParam;
          this.loading = false;
          this.finished = true;
          this.onLoad();
      }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onLoad() {
      console.log(this.page, "page");
      axios
        .get("/v2/StrategyApi/SearchStrategyPaged_CEndInf", {
          headers: {
            Authorization: "bearer " + getCookie("Token")
          },
          params: {
            AccountId: getCookie("AccountId"),
            m_PageSize: "8",
            m_PageNum: this.page,
            m_StrategyName: this.searchvalue
          }
        })
        .then(res => {
          if(res.data.ResultCode== 200){
          res.data.ReturnParam.map(item => {
            this.listData.push(item);
          });
          this.page++;
          }else if(res.data.status == 401){
            Dialog.alert({
              message: "Token已经过期"
            }).then(() => {
              // on close
            });
            this.$router.push("/");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSearch() {
      this.$router.push("/SearchPage");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swipe {
  height: 4rem;
}

.van-search {
  padding: 0.21rem 0.43rem;
}
</style>
