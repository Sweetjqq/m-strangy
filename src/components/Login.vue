<template>
  <div class="loginBox">
    <img class="img_logo" src="../../static/image/logo.png"></img>

    <!-- 账号密码登录 -->
    <div class="password_login" v-if='user_psd'>
      <div class="login_msg">
        <div class="van-hairline--bottom">
          <input v-model="username" type="number" placeholder="请输入手机号码" />
        </div>
        <div class="van-hairline--bottom">
          <input v-model="password" type="password" placeholder="请输入登录密码" @keyup.enter="login" />
        </div>
      </div>
      <van-button size="normal" type="primary" @click="login">登录</van-button>
      <van-checkbox v-model="checked" class="Re_psd">记住密码</van-checkbox>
      <div class="forget" @click='LoginStates'>验证码登录</div>
    </div>

    <!-- 验证码登录 -->
    <div class="password_login" v-else>
      <div class="login_msg">
        <div class="van-hairline--bottom">
          <input v-model="username" type="number" placeholder="请输入手机号码" />
        </div>
        <div class="van-hairline--bottom" style="position: relative">
          <input v-model="Code_password" type="password" placeholder="请输入短信验证码" />
          <van-button size="mini" style="width: 2.347rem;height: .453rem;" class="getCode" @click='getCode' ref='time'
            :disabled='isdisabled' :text='text'></van-button>
        </div>
      </div>
      <van-button size="normal" type="primary" @click="CodeLogin">登录</van-button>
      <div class="forget" @click='LoginStates'>账号密码登录</div>
    </div>

  </div>

</template>

<script>
  import {
    setCookie,
    getCookie,
    removeCookie
  } from '../config'
  import {
    Field,
    Button,
    Dialog,
    Checkbox,
    Toast
  } from 'vant';
  export default {
    data() {
      return {
        username: '',
        password: '',
        Code_password: '',
        checked: true,
        user_psd: true,
        isdisabled: false,
        text: '获取验证码'
      }
    },
    computed: {

    },
    beforeCreate: function () {
      $('#mobile_icon_div').remove();
      if (getCookie('Token')) {
        this.$router.push("/HomePage");
      }
    },
    mounted: function () {
      if (getCookie('RemberPsd')) {
        this.username = getCookie('AccountId');
        this.password = getCookie('password');
      }
    },
    methods: {
      LoginStates() {
        this.user_psd = !this.user_psd;
      },
      // 60s倒计时
      Countdown() {
        console.log(this.$refs.time, "aaaaaaaaaaaaaaaaa");
        let time = 60;
        let RunTime = setInterval(() => {
          if (time > 0) {
            this.isdisabled = true;
            time--;
            this.text = time + '秒后重新发送';
          } else {
            this.isdisabled = false;
            this.text = '重新发送';
            clearInterval(RunTime);
          }
        }, 1000)
      },

      getCode() {
        if (this.isPoneAvailable(this.username)) {
          this.sendVerificationCode();
        } else {
          Dialog.alert({
            message: '<span style="text-align: center;display:block">请输入合法的手机号</span>',
          }).then(() => {});
        }
      },
      isPoneAvailable(str) {
        var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (!myreg.test(str)) {
          return false;
        } else {
          return true;
        }
      },
      // 获取验证码
      sendVerificationCode() {
        axios({
          method: 'post',
          url: '/tc/user/sendVerificationCode',
          headers: {
            // 'Authorization': "bearer " + getCookie("Token"),
          },
          data: {
            'mobile': this.username,
          },
          transformRequest: [
            function (data) {
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
            if (getCookie('Token')) {
              removeCookie('Token');
            }
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }
          if (response.data.status == 200) {
            this.Countdown();
            // clearInterval(this.Countdown);
            // this.text = '已成功发送';
            Toast('验证码已发送，请注意查收');
            // this.Code_password=response.data.data;

          } else {
            Dialog.alert({
              message: '<span style="text-align: center;display:block">' + response.data.msg + '</span>'
            }).then(() => {
              // on close
            });

          }
        })
      },
      // 验证码登陆
      CodeLogin() {
        if (this.Code_password.length > 0 && this.isPoneAvailable(this.username)) {
          axios({
            method: 'post',
            url: '/tc/user/login',
            headers: {
              // 'Authorization': "bearer " + getCookie("Token"),
            },
            data: {
              "username": this.username,
              "verificationCode": this.Code_password,
            },
            transformRequest: [
              function (data) {
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
              if (getCookie('Token')) {
                removeCookie('Token');
              }
              setTimeout(() => {
                this.$router.push("/");
              }, 2000);
            }
            if (response.data.status == 200) {
              clearInterval(this.Countdown);
              console.log(response.data, "验证码登陆");
              let token = response.data.data.access_token;
              setCookie("Token", token);
              setCookie("AccountId", this.username);
              setCookie("bAuth", true);
              this.$router.push("/HomePage");
            } else {
              Dialog.alert({
                message: '<span style="text-align: center;display:block">' + response.data.msg + '</span>'
              }).then(() => {
                // on close
              });
            }
          })
        } else {
          Dialog.alert({
            message: '<span style="text-align: center;display:block">请输入合法的手机号和正确的验证码</span>'
          }).then(() => {
            // on close
          });
        }
      },
      // 密码登录
      login() {
        if (this.isPoneAvailable(this.username) && this.password.length > 0) {
          axios({
            method: 'post',
            url: "/tc/user/login",
            headers: {
              // 'Authorization': "bearer " + getCookie("Token"),
            },
            data: {
              "username": this.username,
              "password": this.password,
            },
            transformRequest: [
              function (data) {
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
            if (response.data.status == 200) {
              console.log(response.data.data, " 登录");
              let token = response.data.data.access_token;
              setCookie("Token", token);
              setCookie("AccountId", this.username);
              setCookie("bAuth", true);
              setCookie("password", this.password);
              if (this.checked) {
                setCookie("RemberPsd", true);
              } else {
                if (getCookie('RemberPsd')) {
                  removeCookie('RemberPsd');
                }
              }
              console.log(response.data.data.UserDetail, ')))))')
              setCookie('UserDetail', response.data.data.UserDetail)
              this.$router.push("/HomePage");
            } else {
              Dialog.alert({
                message: '<span style="text-align: center;display:block">您的账号/密码不正确</span>'
              }).then(() => {});
            }
          })
        } else {
          Dialog.alert({
            message: '<span style="text-align: center;display:block">请输入合法的手机号和正确的密码</span>',
          }).then(() => {});
        }
      }
    }
  }

</script>
<style>
  .van-dialog__confirm,
  .van-dialog__confirm:active {
    color: #007AFF;
  }

  .van-dialog {
    width: 6.56rem;
    /* height: 4.24rem; */
    border-radius: .147rem;
  }

  .Re_psd .van-checkbox--round {
    border-radius: .027rem;
    width: .373rem;
    height: .373rem;
    background-color: #007AFF;
    border-color: #007AFF;
  }
  .van-checkbox__icon--checked .van-icon{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Re_psd .van-checkbox__icon {
    line-height: .373rem;
  }

</style>
<style scoped>
  .loginBox {
    text-align: center;
    width: 100%;
    height: 100%;
    background-image: url("../../static/image/login_bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
  }

  .img_logo {
    height: .373rem;
    margin: 2.747rem auto 1.547rem;
  }

  .login_msg {
    width: 8.133rem;
    margin: 0 auto;
  }

  .login_msg input {
    width: 8.16rem;
    height: 1.493rem;
    background: transparent;
    border: none;
    color: white;
    padding-left: .333rem;
    box-sizing: border-box;
    font-size: .32rem;
  }

  .van-button {
    width: 8.16rem;
    height: .96rem;
    margin: .96rem auto .28rem;
    background: #4A90E2;
    border-color: #4A90E2;
    font-size: .373rem;
  }

  .forget {
    width: 100%;
    position: absolute;
    color: #66CBFF;
    text-align: center;
    font-size: .32rem;
    bottom: .64rem;
  }

  .Re_psd {
    text-align: left;
    font-size: .32rem;
    color: #9DCCFF;
    margin-left: .933rem;
  }

  .getCode {
    display: inline-block;
    font-size: .32rem;
    color: #66CBFF;
    letter-spacing: 0;
    text-align: center;
    position: absolute;
    right: 0;
    bottom: .2rem;
    background: none;
    border-width: 0;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  }

</style>
