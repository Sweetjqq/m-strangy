<template>
  <div class="Mine">
    <Header ref="header" :headerObj="headerObj"></Header>
    <div class="MyList">
      <van-cell-group>
        <!-- <div style="position: relative"> -->
          <van-field v-model="firstpsd" clearable label="新密码" placeholder="请输入6位英文字母，数字" type="password" @keyup='changeNum'/>
          <!-- <van-icon name="password-not-view" style="position: absolute;right:.3rem;top: .293rem; z-index: 100;font-size: 16px;" />
        </div> -->
        <!-- <div style="position: relative"> -->
          <van-field v-model="secondpsd" clearable label="确认密码" placeholder="请再次输入新密码" type="password" @keyup='changeNum'/>
          <!-- <van-icon name="password-view" style="position: absolute;right:.3rem;top: .293rem; z-index: 100;font-size: 16px;" /> -->
        <!-- </div> -->
      </van-cell-group>

      <van-button v-if='disabledStates' type="default" class="dis_submit" style="width: 100%;border-left: none;border-right: none;color: #000" disabled>提交</van-button>
      <div v-else class="van-hairline--top-bottom submit" @click='CheckPassword'>提交</div>

    </div>
    <Bottombar></Bottombar>
  </div>

</template>

<script>
  import {
    Button,
    Cell,
    CellGroup,
    NavBar,
    Dialog,
    Field,
    Icon
  } from 'vant';
  import Bottombar from '../common/Bottombar.vue'
  import Header from '../common/Header.vue'
  import {
    getCookie,
    removeCookie
  } from '../../config/index'
  export default {
    components: {
      Bottombar,
      Header
    },
    data() {
      return {
        firstpsd: '',
        secondpsd: '',

        headerObj: {
          name: "修改密码"
        },
        disabledStates:true
      }
    },
    methods: {
      ispsd(str) {
        var myreg = /^[a-zA-Z\d]{6}$/;
        if (!myreg.test(str)) {
          return false;
        } else {
          return true;
        }
      },
      changeNum(){
        if (this.firstpsd.length>=6&&this.secondpsd.length>=6) {
          this.disabledStates=false;
        }else{
          this.disabledStates=true;
        }
      },
      CheckPassword() {
        if (this.firstpsd != this.secondpsd) {
          Dialog.alert({
            message: "<span style='text-align:center;display:block'>两次密码不一致，请重新输入</span>"
          }).then(() => {
            // on close
          });
        } else if (!this.ispsd(this.firstpsd)) {
          Dialog.alert({
            message: "<span style='text-align:center;display:block'>您输入的密码格式不正确</span>"
          }).then(() => {
            // on close
          });
        } else if (!this.ispsd(this.secondpsd)) {
          Dialog.alert({
            message: "<span style='text-align:center;display:block'>您输入的密码格式不正确</span>"
          }).then(() => {
            // on close
          });
        } else {
          this.updatePassword();
        }
      },
      // 修改密码
      updatePassword() {
        axios({
          method: 'post',
          url: '/v1/customer/updatePassword',
          headers: {
            'Authorization': "bearer " + getCookie("Token"),
          },
          data: {
            'newPassword': this.firstpsd,
            'confirmPassword': this.secondpsd
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
            removeCookie("Token");
            removeCookie("bAuth");
            this.$router.push("/");
          } else {
            Dialog.alert({
              message: "系统出错，请重新录入"
            }).then(() => {
              // on close
            });
            this.$router.push("/");
          }
        })
      }
    },
    created() {

    }
  }

</script>
<style>
  .MyList .van-field .van-cell__title {
    text-align: left !important;
  }

</style>
<style scoped>
  .MyList {
    margin-top: .107rem
  }

  .Mine {
    background: #F8F8F8;
  }

  .submit {
    height: 1.093rem;
    line-height: 1.093rem;
    text-align: center;
    color: #007AFF;
    font-size: .4rem;
    background: white;
    margin-top: 1.093rem;
  }
  .dis_submit{
    line-height: 1.093rem !important;
    text-align: center !important;
    font-size: .4rem !important;
    background: white !important;
    margin-top: 1.093rem !important;
  }
</style>
