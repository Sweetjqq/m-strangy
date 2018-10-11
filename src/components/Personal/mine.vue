<template>
  <div class="Mine">
    <Header ref="header" :headerObj="headerObj"></Header>
    <div class="MyList">
      <van-cell-group>
          <van-cell title="注册手机号" :value="phone" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="修改密码" is-link value="" @click="Msg" />
      </van-cell-group>

      <div id="qrcode" v-if="userQrcodeType">
      <!-- <img id="qrCodeIco" src="../assets/me.png" style="position: absolute;width: 30px; height: 30px;top:50%;left:50%; transform: translate(-50%,-50%);" /> -->
      </div>
      <div  v-if="userQrcodeType" style="text-align: center;
    margin-bottom: 0.373rem;">授权注册二维码</div>

      <div class="van-hairline--top-bottom">
        <!-- <span class="logout" @click="logout">退出登录</span> -->
        <span class="logout" @click="logoutState">退出登录</span>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div class="loginOutStyle">
        <!-- <div class="font_logout">退出后不会删除任何历史数据，下次登录依然可以使用本账号。</div> -->
        <div class="van-hairline--top" style="
        width: 100%;
        height: 1.333rem;
        font-size: .4rem;
        color: #F23E4C;
        letter-spacing: 0;
        text-align: center;
        line-height:1.333rem;
        background:white !important;
        " @click="logout">确认</div>

        <div class="cancel" @click="logoutState">取消</div>
      </div>
    </van-popup>
    <Bottombar></Bottombar>
  </div>

</template>

<script>
import $ from "jquery";
import qrcode from "jquery.qrcode";
import { Button, Cell, CellGroup, NavBar, Dialog, Popup, Toast } from "vant";
import Bottombar from "../common/Bottombar.vue";
import Header from "../common/Header.vue";
import { getCookie, removeCookie } from "../../config/index";
export default {
  components: {
    Bottombar,
    Header
  },
  data() {
    return {
      userQrcodeType:true,
      show: false,
      headerObj: {
        name: "我的"
      },
      loginType: "",
      UserData: {
        customerInfo: {}
      }, //用户详细信息
      phone: getCookie("AccountId"),
      userQrcode: ""
    };
  },
  methods: {
    Msg() {
      this.$router.push("/EditPsd");
    },
    changeValue(value) {
      if (value) {
        return value.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      }
    },

    logoutState() {
      this.show = !this.show;
    },
    qrcodereg() {
      this.$router.push("/Sign");
    },
    getUserData() {
          Toast.loading({
      duration: "0",
      mask: true,
      message: "正在加载..."
    });
      axios({
        method: "get",
        url: "/v1/customer/getUserDetail",
        headers: {
          Authorization: "bearer " + getCookie("Token")
        },
        params: {
          // "Authorization":getCookie("Token"),
        }
      }).then(response => {
        if (response.data.status == 401) {
          Dialog.alert({
            message: "Token已经过期"
          }).then(() => {
            // on close
          });
          if (getCookie("Token")) {
            removeCookie("Token");
          }
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
        if (response.data.status == 200) {
          console.log(response.data, " 获取用户信息");
          this.loginType = response.data.data.customerInfo.type;
          this.userQrcode = response.data.data.customerInfo.code;
          console.log(this.loginType, "loginType");
          console.log(this.userQrcode, "userQrcode");
          if(this.loginType == 1){
            this.getcode(this.userQrcode);
            Toast.clear();
          }else{
            this.userQrcodeType = false
            Toast.clear();
          }
        } else {
          Dialog.alert({
            message: response.data.msg
          }).then(() => {
            // on close
          });
            Toast.clear();
        }
      });
    },
    logout() {
      if (getCookie("Token")) {
        axios({
          method: "post",
          url: "/tc/user/exit",
          headers: {
            Authorization: "bearer " + getCookie("Token")
          },
          data: {
            token: getCookie("Token")
          },
          transformRequest: [
            function(data) {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            }
          ]
        }).then(response => {
          if (response.data.status == 401) {
            Dialog.alert({
              message: "Token已经过期"
            }).then(() => {
              // on close
            });
            if (getCookie("Token")) {
              removeCookie("Token");
            }

            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }
          if (response.data.status == 200) {
            console.log(response.data, " 登出");
            removeCookie("Token");
            removeCookie("bAuth");
            $("#mobile_icon_div").remove();
            this.$router.push("/");
          } else {
            // Dialog.alert({
            //   message: '<span style="text-align: center;display:block">Token错误</span>'
            // }).then(() => {
            //   // on close
            // });
          }
        });
      } else {
        Dialog.alert({
          message:
            '<span style="text-align: center;display:block">Token不存在</span>'
        }).then(() => {
          // on close
        });
      }
    },
    getcode(userQrcode) {
      console.log(
        "http://localhost:7070/#/Register?Token=" +
          getCookie("Token") +
          "&&pathCode="
      );
      console.log(
        "http://10.21.10.171:8085/#/Register?Token=" +
          getCookie("Token") +
          "&&pathCode="
      );

      console.log(
        "https://strategy.fw-fintech.com/#/Register?Token=" +
          getCookie("Token") +
          "&&pathCode="
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
      console.log(
      
        "perereeee"
      );

      const text =   regUrl +

      "/#/Register?" +
      "pathCode=" +
      userQrcode;
      console.log(text);    
      $("#qrcode").qrcode({
        width: 200, //宽度
        height: 200, //高度
        render: "canvas",
        text: text
      });
    }
  },
  created() {
    this.getUserData();
  },
  mounted() {
  
  }
};
</script>
<style>
.Mine .van-popup {
  z-index: 100000 !important;
}
</style>
<style scoped>
.Mine {
  background: #f8f8f8;
}

.van-cell {
  margin: 0.373rem 0;
}

.logout {
  width: 100%;
  height: 1.093rem;
  display: block;
  background: white;
  text-align: center;
  line-height: 1.093rem;
  font-size: 0.333rem;
}

.loginOutStyle {
  width: 100%;
  overflow: hidden;
  /* height: 4rem; */
  background: #f8f8f8;
}

.loginOutStyle .font_logout {
  width: 100%;
  height: 1.573rem;
  text-align: center;
  font-size: 0.16rem;
  color: #8e8e93;
  letter-spacing: 0;
  line-height: 1.573rem;
  background: white;
}

.cancel {
  width: 100%;
  height: 1.333rem;
  line-height: 1.333rem;
  text-align: center;
  font-size: 0.4rem;
  margin-top: 0.2rem;
  background: white;
}

#qrcode {
  text-align: center;
  position: relative;
  margin-bottom: 0.373rem;
}
</style>
