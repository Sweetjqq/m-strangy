<template>
  <div class="search" style="height: 100%;background:  #fff;">
    <form action="/" id="searchI">

      <van-search v-model="searchvalue" show-action @search="onSearch()" placeholder="search">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>


    </form>

    <div class="seachHistory">
      <div class="seachHistoryLabel">
        历史搜索
      </div>
    </div>


    <div class="seachHistoryItem" style="padding:0px .36rem">
      <van-row>
        <van-col span="7" v-for="(item,i) in searchResult" :key="i" class="tagitem">
          <div @click="searchPlaceHolder(item)" class="">
            <div class="van-ellipsis" style="padding:0 .1rem;" v-if="item.searchvalue">{{item.searchvalue}}</div>
          </div>
        </van-col>
      </van-row>
    </div>


    <!-- <van-cell-group>
    <van-cell title="注册" is-link @click="reg" />
    <van-cell title="二维码" is-link @click="qrcode" />
  </van-cell-group> -->
    <Bottombar ref="Bottombar" :Bottombar="Bottombar"></Bottombar>

  </div>
</template>

<script>
import Bottombar from "./common/Bottombar.vue";
import { getStore, format, setStore, removeStore } from "../config";
import Header from "./common/Header.vue";
import { Search } from "vant";
import { Dialog } from "vant";
export default {
  components: {
    Header,
    Bottombar
  },
  data() {
    return {
      searchvalue: "",
      areaList: {},
      searchResult: []
    };
  },
  created() {
    this.headerObj = {
      name: "搜索"
    };
    this.Bottombar = {
      name: "搜索"
    };
    this.getLo();
  },
  mounted() {
       $('#mobile_icon_div').css('display','none')
  },
  methods: {
    getLo() {
      if (getStore("searchResult")) {
        this.searchResult = JSON.parse(getStore("searchResult"));
        this.searchResult = this.sort(this.searchResult);
        let NewArray = [];
        this.searchResult.forEach((value, index) => {
          if (this.Surplus(value.CreationTime) < 30) {
            NewArray.push(this.searchResult[index]);
          }
        });
        this.searchResult = NewArray;
        setStore("searchResult", JSON.stringify(this.searchResult));
      }
    },
    sort(data) {
      let allArr = [];
      for (var i = 0; i < data.length; i++) {
        var flag = true;
        for (var j = 0; j < allArr.length; j++) {
          if (data[i].searchvalue == allArr[j].searchvalue) {
            flag = false;
          }
        }
        if (flag) {
          allArr.push(data[i]);
        }
      }
      return allArr;
    },
    searchPlaceHolder(item) {
      this.searchvalue = item.searchvalue;
    },
    onCancel() {
      this.$router.push("/HomePage");
    },
    onSearch() {
      if ($.trim(this.searchvalue)) {
        const historyItem = {
          searchvalue: this.searchvalue,
          CreationTime: format()
        };
        this.searchResult.unshift(historyItem);
        console.log(this.searchResult, "this.searchResulthis.searchResul");
        setStore("searchResult", JSON.stringify(this.searchResult));
        setTimeout(() => {
          this.$router.push("/strategyList?searchvalue=" + this.searchvalue);
        }, 10);
      } else {
        Dialog.alert({
          message: `<span style="text-align: center;display:block">请输入搜索内容</span>`
        });
      }
    },
    // 剩余时间
    Surplus(value) {
      let days =
        (Date.parse(format()) - Date.parse(value)) / (24 * 3600 * 1000);
      return days;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.seachHistoryLabel {
  font-weight: 500;
  padding-top: 0.43rem;
  height: 0.85rem;
  line-height: 0.85rem;
  font-size: 0.26rem;
  text-align: left;
  padding-left: 0.43rem;
}

.tagitem {
  margin-left: 0.28rem;
  margin-top: 0.28rem;
  height: 0.69rem;
  line-height: 0.69rem;
  background-color: #f1f1f1;
  text-align: center;
}
</style>
