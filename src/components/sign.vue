<template>
<div class="" style="height: 100%;background:  #fff;">
  <Header ref="header" :headerObj="headerObj"></Header>
     <div style="" ><img id="refesh" @click="refesh()" src="../assets/refesh.png" alt="" style="
    width:  20px;
    position:  absolute;
    right: 24px;
    margin-top: 12px;
"></div> 
  <div class="" >
 
  <div id="qrcode" style="text-align:  center;position:relative;margin-top:1.2rem;">
      <!-- <img id="qrCodeIco" src="../assets/me.png" style="position: absolute;width: 30px; height: 30px;top:50%;left:50%; transform: translate(-50%,-50%);" /> -->
    </div>
  </div>


  <!-- <div class="qrcodeNum">
    <div>授权码 {{authcode}}</div>
    <div class="warninfo">【注：为了你的个人信息的安全，不要将授权码透露给其他人】</div>
  </div> -->
  <Bottombar ref="Bottombar" :Bottombar="Bottombar"></Bottombar>

</div>
</template>

<script>
import { getCookie, setCookie } from "../config";
import Bottombar from "./common/Bottombar.vue";
import Header from "./common/Header.vue";
import { Dialog, Button } from "vant";
import { Field } from "vant";
import $ from "jquery";
import qrcode from "jquery.qrcode";
import "../assets/animate.css";
export default {
  components: {
    Header,
    Bottombar
  },
  data() {
    return {
      username: "",
      password: "",
      authcode: ""
    };
  },
  created() {
    this.headerObj = {
      name: "信用债策略用户注册二维码"
    };
    this.Bottombar = {
      name: "注册二维码"
    };
    this.getcode();
  },
  mounted() {},
  methods: {
    getcode() {
      axios({
        method: "post",
        url: "/v1/customer/createRegAuth",
        headers: {
          Authorization: "bearer " + getCookie("Token")
        }
      })
        .then(res => {
          if (res.data.status == 200) {
            $("#qrcode").empty();
            this.authcode = res.data.data.authCode;
            this.pathCode = res.data.data.pathCode;
            setCookie("pathCode", res.data.data.pathCode);
            console.log(
              "http://localhost:7070/#/Register?Token=" +
                getCookie("Token") +
                "&&pathCode=" +
                this.pathCode
            );
            console.log(
              "http://10.21.10.171:8085/#/Register?Token=" +
                getCookie("Token") +
                "&&pathCode=" +
                this.pathCode
            );

            console.log(
              "https://strategy.fw-fintech.com/#/Register?Token=" +
                getCookie("Token") +
                "&&pathCode=" +
                this.pathCode
            );
            let regUrl;
            if (HOST == "http://10.21.10.170:9187") {
              regUrl = "http://10.21.10.171:8085";
            } else if (HOST == "http://10.21.10.192:80") {
              regUrl = "http://10.21.10.171:8085";
            } else if (HOST == "http://192.168.10.91:80") {
              regUrl = "http://192.168.10.90:84";
            } else if (HOST == "https://api.fw-fintech.com") {
              regUrl = "https://strategy.fw-fintech.com";
            }
            console.log(regUrl, "perereeee");
            $("#qrcode").qrcode({
              render: "canvas",
              mode: 4,
              correctLevel: 0,
              text:
                regUrl +
                "/#/Register?Token=" +
                getCookie("Token") +
                "&&pathCode=" +
                this.pathCode
            });
          } else if (res.data.status == 401) {
            Dialog.alert({
              message:
                '<span style="text-align: center;display:block">身份认证失败</span>'
            });
          } else {
            Dialog.alert({
              message:
                '<span style="text-align: center;display:block">获取二维码失败</span>'
            });
          }
          $("#refesh").removeClass("animated rotateOut");
        })
        .catch(res => {});
    },
    refesh() {
      console.log("11");
      $("#refesh").addClass("animated rotateOut");
      this.getcode();
    },
    qrcode() {},
    login() {
      this.$router.push("/HomePage");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.qrcodeNum {
  padding-top: 1.41rem;
  padding-left: 0.8rem;
  font-size: 0.36rem;
}

.warninfo {
  padding-top: 0.4rem;
  padding-right: 0.8rem;
  color: red;
}

table {
  margin: auto !important;
}
</style>
