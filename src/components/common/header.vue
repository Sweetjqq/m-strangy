<template>
  <div class="hello">
    <!-- 控制左按钮 -->
    <div v-if="!Controlright">
      <van-nav-bar style="font-family: 'Microsoft YaHei';font-weight: bold;" v-if="headerObj && arrow" :title="headerObj.name"
        left-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
      <van-nav-bar style="font-family: 'Microsoft YaHei';font-weight: bold;" v-else-if="headerObj && !arrow" :title="headerObj.name"
        left-text="" @click-left="onClickLeft" @click-right="onClickRight" />
    </div>
    <!-- 控制右按钮 -->
    <div v-else>
      <van-nav-bar style="font-family: 'Microsoft YaHei';font-weight: bold;" v-if="headerObj" :title="headerObj.name"
        left-text="" :right-text=rightText left-arrow @click-left="onClickLeft" @click-right="onClickRight(url)">
        <!-- <van-icon name="arrow" slot="right" /> -->
        <van-button size="small" slot="right">{{rightText}}</van-button>

      </van-nav-bar>
    </div>
  </div>
</template>

<script>
  import {
    NavBar,
    Icon
  } from "vant";
  import {
    getCookie,
    removeCookie
  } from "../../config/index.js";
  export default {
    props: ["headerObj", "Controlright", "rightText", "url"], //Controlright控制右侧按钮是否显示,rightText右侧按钮的文案，url点击右侧按钮，要跳转的url
    data() {
      return {
        value: "",
        areaList: {},
        searchResult: [],
        isshow: Boolean,
        arrow: true,
        UserDetail: getCookie("UserDetail")
      };
    },
    beforeCreate() {
      // removeCookie('210022092162');
      // removeCookie('53gid0');
      // removeCookie('53gid1');
      // removeCookie('53gid2');
      // removeCookie('53kf_72182653_from_host');
      // removeCookie('53kf_72182653_keyword');
      // removeCookie('53kf_72182653_land_page');
      // removeCookie('53revisit');
      // removeCookie('53uvid');
      // removeCookie('SESSION_COOKIE');
      // removeCookie('SESSION_COOKIE');
      // removeCookie('YGXSID_p10182653_10290731');
      // removeCookie('customer_service_language');
      // removeCookie('from_page_72182653');
      // removeCookie('guest_id');
      // removeCookie('kf_72182653_land_page_ok');
      // removeCookie('kf_sign_72182653');
      // removeCookie('land_page_72182653');
      // removeCookie('lastKfid6d_72182653');
      // removeCookie('onliner_zdfq72182653');
      // removeCookie('visitor_type');
    },
    created() {
      console.log(this.enterPage(), 'msg')
      if (this.getCaption(location.href).split("?")[0] == "/HomePage" || this.getCaption(location.href).split("?")[0] ==
        "/StrategyDetail") {
        (function () {
          var _53code = document.createElement("script");
          _53code.src = "https://tb.53kf.com/code/code/10182653/1";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(_53code, s);
        })();
        const msg =
          `机构：${
        JSON.parse(this.UserDetail).customerInfo.orgName
      },分支机构：${JSON.parse(this.UserDetail).customerInfo.branchOrg},当前页面-${this.enterPage()}`;
        const name = getCookie("AccountId")
        console.log(msg, 'msg')
        console.log(name, 'name')

        function open53() {
          var api = $53.createApi();
          api.push('cmd', 'member');
          api.push('id', name);
          api.push('name', name);
          api.push('phone', name);
          api.push('notes', msg);
          api.query();
          // api.push('id','');
          // api.push('email', ''); 
          // api.push('qq', ''); 
          // api.push('company', ''); 
          // api.push('address', ''); 
          // api.push("name", getCookie("AccountId"));
          // api.push("phone", getCookie("AccountId"));
          // api.push("notes", msg);
          // api.query();
        }
        setTimeout(open53, 1000);
      } else if (this.getCaption(location.href).split("?")[0] == "/productList" || this.getCaption(location.href) ==
        "/historyValue" || this.getCaption(location.href).split("?")[0] == "/shareview" || this.getCaption(location.href)
        .split("?")[0] == "/HistoryValue" || this.getCaption(location.href).split("?")[0] == '/sharepage' || this.getCaption(
          location.href).split("?")[0] == '/ProductDetail' || this.getCaption(
          location.href).split("?")[0] == '/HoldingAnalysis') {
        (function () {
          var _53code = document.createElement("script");
          _53code.src = "https://tb.53kf.com/code/code/10182653/2";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(_53code, s);
        })();
        const msg =
          `机构：${
        JSON.parse(this.UserDetail).customerInfo.orgName
      },分支机构：${JSON.parse(this.UserDetail).customerInfo.branchOrg},当前页面-${this.enterPage()}`;
        const name = getCookie("AccountId")
        console.log(msg, 'msg')
        console.log(name, 'name')

        function open53() {
          var api = $53.createApi();
          api.push('cmd', 'member');
          api.push('id', name);
          api.push('name', name);
          api.push('phone', name);
          api.push('notes', msg);
          api.query();
          // api.push('cmd', 'member'); 
          // api.push('id','');
          // api.push('email', ''); 
          // api.push('qq', ''); 
          // api.push('company', ''); 
          // api.push('address', ''); 
          // api.push("name", getCookie("AccountId"));
          // api.push("phone", getCookie("AccountId"));
          // api.push("notes", msg);
          // api.query();
        }
        setTimeout(open53, 1000);
      } else {
        $('#mobile_icon_div').remove();
      }
      if (
        this.getCaption(location.href).split("?")[0] == "/Register" ||
        this.getCaption(location.href).split("?")[0] == "/HomePage" ||
        this.getCaption(location.href).split("?")[0] == "/Mine" ||
        this.getCaption(location.href).split("?")[0] == "/sharepageto"
      ) {
        console.log("111");
        this.arrow = false;
      } else {
        this.arrow = true;
      }
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf("micromessenger") != -1;
      console.log(ua);
      if (isWeixin) {
        return (this.isshow = false);
      } else {
        return (this.isshow = true);
      }
    },
    methods: {
      enterPage() {
        let page = this.getCaption(location.href);
        console.log(page.split('?')[0]);

        let enterPageName;
        if (page) {
          switch (page) {
            case '/HomePage':
              return enterPageName = "策略列表";
              break;
            case '/productList':
              return enterPageName = "产品列表";
              break;
          }
        }
        if (page.split('?')[0]) {
          switch (page.split('?')[0]) {
            case '/StrategyDetail':
              return enterPageName = `策略详情-${getCookie("strategyName")}`;
              break;
          }
        }
        if (page.split('?')[0]) {
          switch (page.split('?')[0]) {
            case '/HoldingAnalysis':
              return enterPageName = `持仓分析-${getCookie("productName")}`;
              break;

            case '/ProductDetail':
              return enterPageName = `产品详情-${getCookie("productName")}`;
              break;
            case '/HistoryValue':
              return enterPageName = `历史净值-${getCookie("productName")}`;
              break;
            case '/shareview':
              return enterPageName = `投顾观点-${getCookie("productName")}`;
              break;
            case '/sharepage':
              return enterPageName = `投顾详情-${getCookie("productName")}`;
              break;
          }
          console.log(enterPageName, 'enterPageName')
          return enterPageName
        }
      },
      onClickLeft() {
        history.go(-1);
      },
      onClickRight(data) {
        console.log(data, "*******url*******")
        this.$router.push(data);
      },
      i() {
        console.log("获取焦点");
        this.$router.push("/SearchPage");
      },
      getCaption(obj) {
        var index = obj.lastIndexOf("#");
        obj = obj.substring(index + 1, obj.length);
        return obj;
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 0.13rem;
  }

  a {
    color: #42b983;
  }

</style>
