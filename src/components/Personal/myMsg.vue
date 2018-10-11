<template>
  <div class="Mine">
    <Header ref="header" :headerObj="headerObj"></Header>
    <div class="MyList">
      <van-cell-group>
        <!-- <van-cell title="姓名" :value="UserData.customerInfo.name" /> -->
        <van-cell title="手机号" :value="changeValue(UserData.cName)" />
        <van-cell title="修改密码" is-link value="" @click="Msg" />
        </route-link>
        <!-- <van-cell title="机构" :value="UserData.customerInfo.orgName" />
        <van-cell title="分支机构" :value="UserData.customerInfo.branchOrg" /> -->
      </van-cell-group>
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
    Dialog
  } from 'vant';
  import Bottombar from '../common/Bottombar.vue'
  import Header from '../common/Header.vue'
  import {
    getCookie,removeCookie
  } from '../../config/index'
  export default {
    components: {
      Bottombar,
      Header
    },
    data() {
      return {
        headerObj: {
          name: "账号"
        },
        UserData: {
          customerInfo: {},
        }, //用户详细信息
      }
    },
    methods: {
    
    },
    created() {
      this.getUserData();
    }
  }

</script>
<style scoped>
  .MyList {
    margin-top: .107rem
  }

  .Mine {
    background: #F8F8F8;
  }

</style>
