<template>
<div class="sign" id="sign">
  <Header ref="header" :headerObj="headerObj"></Header>

<div id="contentBox">
  <div class="regForm" id="regForm">
    <form>
      <van-cell-group>
        <!-- <van-field v-model="validate.institutionsName" readonly  icon="arrow" id="institutionsName" label="机构" @click="showinstitutions" @blur="showBar" />

        <van-field v-model="institutionsSonName" type="text" label="分支机构" icon="close" @click-icon="clear" @focus="hideBar" @blur="showBar" />

        <van-field v-model="validate.username" type="text" id="username" label="姓名" @focus="hideBar" @blur="showBar" /> -->

        <van-field v-model="validate.phoneNum" maxlength="11" type="text" icon="close" @click-icon="clearPhoneNum" id="phoneNum" label="手机号"  />

        <van-field v-model="validate.password" maxlength="6"  placeholder="6位数字或密码，区分大小写" type="password" icon="close" @click-icon="clearPassword" id="password" label="密码" />
        

        <van-cell-group>
        <van-field
        v-model="validate.verificationCode"
        center
        label="短信验证码"
         
          maxlength="4"
          id="verificationCode"
        >
    <van-button slot="button" size="small" @click="getcode()" id="reg-btn">发送验证码</van-button>
  </van-field>
</van-cell-group>
        <!-- <van-field v-model="validate.requireCode" maxlength="6" type="text" id="requireCode" label="授权码" @focus="hideBar" @blur="showBar" /> -->
      </van-cell-group>
    </form>
  </div>




  <div class="xieyi" id="xieyi">
    <van-checkbox v-model="checked" class="selectedxieyi"></van-checkbox> <span>我已阅读 <label class="link" @click="showArgee">《耀之用户注册协议》</label></span>
  </div>

  <div class="btn" id="btn" style="
    text-align: center;
">
    <van-button size="large" v-if="checked" @click="sumbit" style="border-radius: .987rem;">提交</van-button>
    <van-button size="large" v-else disabled @click="sumbit" style="border-radius: .987rem;opacity: 0.7;" onclick="sumbit">提交</van-button>

  </div>


  <div class="hasAccount" style="
    text-align: center;
">
    <!-- <div class="" @click="goLogin">
      已有账号？去登录
    </div> -->
  </div>
</div>
  <!-- <van-dialog id="regdialog" style="padding-left:  .2rem;padding-right: .2rem;overflow-y: scroll;width: 85%;height: 93%;z-index: 2001;" v-model="show" :closeOnClickOverlay="closeOnClickOverlay" :before-close="beforeClose">
    <Argee></Argee>
  </van-dialog> -->
  

  <!-- <van-picker v-if="institutions" show-toolbar title="机构名称" :columns="columns" :key="columns.id" @cancel="onCancel" @confirm="onConfirm" /> -->
  <Bottombar v-if="showBottom"></Bottombar>
</div>
</template>

<script>
import { Picker } from "vant";
import { Dialog } from "vant";
import Argee from "./argee.vue";
import Bottombar from "./common/Bottombar.vue";
import {
  getStore,
  setStore,
  getCookie,
  setCookie,
  removeStore
} from "../config";
import { Checkbox, CheckboxGroup } from "vant";
import { Popup } from "vant";
import Header from "./common/Header.vue";
import { Toast } from "vant";
import { Field } from "vant";
import { parseUrl } from "../config";
// import { removeStore } from "../../../../../strategy/src/config/mUtils";
export default {
  components: {
    Argee,
    Header,
    Bottombar
  },
  data() {
    return {
      wait: 59,
      checked: true,
      showBottom: true,
      validate: {
        verificationCode: "",
        phoneNum: "",
        password: "",
        pathCode: ""
      }
    };
  },
  created() {
    this.institutions = false;
    this.headerObj = {
      name: "注册"
    };
    const queryObj = {};
    parseUrl(queryObj);
    this.validate.pathCode = queryObj.pathCode;
    // setCookie("Token", queryObj.Token);
    setStore("pathCode", queryObj.pathCode);
    console.log(getStore("userRegInfo"));
    if (getStore("userRegInfo")) {
      console.log(JSON.parse(getStore("userRegInfo")), "userRegInfo");
      const userRegInfo = JSON.parse(getStore("userRegInfo"));
      setTimeout(() => {
        this.validate.phoneNum = userRegInfo.phoneNum;
        this.validate.password = userRegInfo.password;
        this.validate.pathCode = queryObj.pathCode;
        this.validate.verificationCode = userRegInfo.verificationCode;
        this.validatePathCode();
      },0);
      console.log(this.validate.phoneNum);
    }
      setTimeout(() => {

      this.validatePathCode();
      },1);


    //axios
    // axios
    //   .get("/v1/customer/orgList", {
    //     headers: {
    //       Authorization: "bearer " + getCookie("Token")
    //     }
    //   })
    //   .then(response => {
    //     let arr = [];
    //     this.allorgCode = response.data.data;
    //     console.log(response.data.data, "!!!!!!!!!");
    //     response.data.data.map(item => {
    //       if (this.validate.institutionsName == item.orgName) {
    //         console.log(item.id);
    //         this.orgId = item.id;
    //       }
    //       arr.push(item.orgName);
    //     });
    //     console.log(arr);
    //     this.columns = arr;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     if (error == "TypeError: Cannot read property 'map' of undefined") {
    //       Dialog.alert({
    //         message: `<span style="text-align: center;display:block">数据机构为空</span>`
    //       });
    //     }
    //   });
    //axios
  },
  mounted() {},
  methods: {
    validatePathCode(){
             
      axios.get("/v1/customer/getRegAuth", {
        // headers: {
        //   Authorization: "bearer " + getCookie("Token")
        // },
           params: {
            pathCode :  this.validate.pathCode
          },
      }).then(res => {
        console.log(res);
        if(res.data.status !== 200){
             Dialog.alert({
              message: `<span style="text-align: center;display:block">授权码已使用，请重新扫码注册</span>`
            });
        }
      })
    },
    clearPhoneNum() {
      this.validate.phoneNum = "";
    },
    clearPassword() {
      this.validate.password = "";
    },
    getReg() {
      const a = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (a.test(this.validate.phoneNum)) {
        axios({
          url: "/v1/customer/reg/sendVerificationCode",
          method: "post",
          // headers: {
          //   Authorization: "bearer " + getCookie("Token")
          // },
          data: {
            mobile: this.validate.phoneNum
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
        }).then(res => {
          console.log(res, "2222222222243444");
          if (res.data.status == 200) {
            $("#reg-btn").attr("disabled", true);
            Dialog.alert({
              message: `<span style="text-align: center;display:block">验证码发送成功</span>`
            });
            this.time();
          } else {
            console.log(res.data.status)
            if(res.data.status == 5004){
               Dialog.alert({
              message: `<span style="text-align: center;display:block">${
                res.data.msg
              }</span>`
            }).then(()=>{
               this.$router.push("/");
            })
            }else{
              Dialog.alert({
              message: `<span style="text-align: center;display:block">${
                res.data.msg
              }</span>`
            });
            }
          }
        });
      } else if (this.validate.phoneNum === "") {
        Dialog.alert({
          message: `<span style="text-align: center;display:block">请输入手机号</span>`
        });
      } else {
        Dialog.alert({
          message: `<span style="text-align: center;display:block">请输入正确的手机号</span>`
        });
      }
    },
    //倒计时
    time() {
      this.wait = 59;
      const timer = setInterval(() => {
        if (this.wait == 0) {
          $("#reg-btn").attr("disabled", false);
          $("#reg-btn .van-button__text").text("获取验证码");
          clearInterval(timer);
          this.wait = 60;
        } else {
          $("#reg-btn").attr("disabled", true);
          $("#reg-btn .van-button__text").text(this.wait + "S后重新发送");
          this.wait--;
        }
      }, 1000);
    },
    getcode() {
      window.event.preventDefault();
      this.getReg();
    },
    // hideBar() {
    //   this.showBottom = false;
    // },
    // showBar() {
    //   this.showBottom = true;
    //   this.institutions = false;
    // },
    // clear() {
    //   this.institutionsSonName = "";
    // },
    // showinstitutions() {
    //   this.institutions = true;
    // },
    // onConfirm(value, index) {
    //   this.validate.institutionsName = value;
    //   console.log(this.allorgCode);

    //   this.allorgCode.map(item => {
    //     if (value == item.orgName) {
    //       this.orgId = item.id;
    //     }
    //   });
    //   this.onCancel();
    // },
    // onCancel() {
    //   this.institutions = false;
    // },
    // beforeClose(action, done) {
    //   if (action === "confirm") {
    //     done();
    //   } else {
    //     done();
    //   }
    // },
    goLogin() {
      this.$router.push("/");
    },
    showArgee() {
      // this.showBottom = false;
      const userRegInfo = {
        phoneNum: this.validate.phoneNum,
        password: this.validate.password,
        pathCode: this.validate.pathCode,
        verificationCode: this.validate.verificationCode
      };
      setStore("userRegInfo", userRegInfo);
      this.$router.push("/agree");
      this.show = true;
    },
    validator() {
      let errorMsg = "";
      const rule = {
        // institutionsName: {
        //   require: true,
        //   name: "机构名称"
        // },
        // username: {
        //   require: true,
        //   name: "姓名"
        //   // name1: '中英文均可，最长7个汉字或14个英文',
        // },
        phoneNum: {
          require: true,
          exp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
          name: "手机号"
        },
        password: {
          require: true,
          exp: /^[a-zA-Z0-9]{6}$/,
          name: "密码(仅限6位数字或字母)"
        },
          verificationCode: {
          require: true,
          exp: /^[a-zA-Z0-9]{4}$/,
          name: "验证码"
        }
        // requireCode: {
        //   require: true,
        //   exp: /^[a-zA-Z0-9]{6}$/,
        //   name: "授权码"
        // }
      };

      $.each(rule, key => {
        const elem = rule[key];
        if (elem.require) {
          if (!$(`#${key}`).val()) {
            errorMsg = `请输入${elem.name}`;
            return false;
          }
        }

        if (elem.exp) {
          if (!elem.exp.test($(`#${key}`).val())) {
            errorMsg = `请输入正确的${elem.name}`;
            return false;
          }
        }
      });
      return errorMsg;
    },

    sumbit() {
      const msg = this.validator();
      if (msg) {
        Dialog.alert({
          message: `<span style="text-align: center;display:block">${msg}</span>`
        });
        return false;
      }

      const userRegInfo = {
        phoneNum: this.validate.phoneNum,
        password: this.validate.password,
        pathCode: this.validate.pathCode,
        verificationCode: this.validate.verificationCode
      };
      setStore("userRegInfo", userRegInfo);

      //axios

      if (!this.pathCode) {
        this.pathCode = getStore("pathCode");
      }
      axios({
        url: "/v1/customer/createCustomer",
        method: "post",
        // headers: {
        //   Authorization: "bearer " + getCookie("Token")
        // },
        params: {
          user: this.validate.phoneNum,
          password: this.validate.password,
          pathCode: this.validate.pathCode,
          verificationCode: this.validate.verificationCode,
          orgId: "",
          branchOrg: "",
          name: "",
          authCode: ""
          // verificationCode :
        }
      })
        .then(response => {
          if (response.data.status == 200) {
            console.log(response.data.data.customerInfo.userType, "&&&");
            setCookie("userType", response.data.data.customerInfo.userType);
            this.$router.push("/Success");
          } else {
            // else if(response.data.status == 5003){

            // }
            setStore("codeFail", response.data.msg);
            console.log(response.data.msg);
            // Dialog.alert({
            //   message: `<span style="text-align: center;display:block">${
            //     response.data.msg
            //   }</span>`
            // });
            this.$router.push("/Fail?pathCode=" + this.pathCode);
          }
          // removeStore("userRegInfo");
        })
        .catch(error => {
          console.log(error);
        });
      //axios
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.van-picker {
  width: 100%;
  position: absolute;
  bottom: 1.2rem;
}

.hello {
  height: 100%;
}

.hasAccount {
  color: #50e3c2;
  height: 1.04rem;
  padding-bottom: 3rem;
}

.hasAccount {
  padding-top: 2.67rem;
}

.itemreg {
  height: 1.36rem;
  line-height: 1.33rem;
}

.xieyi {
  text-align: left;
  padding: 0.36rem 0.45rem 0px;
  line-height: 0.44rem;
}

.selectedxieyi {
  padding-right: 0.13rem;
  display: inline;
}

.btn {
  margin-top: 1rem;
}

.link {
  color: #007aff;
}
</style>
