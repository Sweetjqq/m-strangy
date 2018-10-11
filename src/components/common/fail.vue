<template>
  <div class="FailBox">
    <Header ref="header" :headerObj="headerObj"></Header>
    <img src="../../../static/image/fail_button.png"/>
    <span class="Fail_msg" >{{msg}}<span v-if="!show">&nbsp;请重新扫码注册</span></span>
    <van-button v-if="show" size="normal" type="primary" @click="backReg()">确定</van-button>
    <Bottombar></Bottombar>
  </div>

</template>

<script>
import {
  parseUrl
} from '../../config'
import Header from './Header.vue'
import {
  getStore,removeStore,
  setStore,getCookie,setCookie
} from '../../config'
   import { Button } from 'vant';
   import Bottombar from './Bottombar.vue'
export default {
  components: {
    Bottombar,Header
  },
  data(){
   return{
     show:false
   }
  },
    created(){
        if(getStore('codeFail') == '验证码无效'){
          this.show = true;
        }else{
          this.show = false;
        }
        console.log(JSON.parse(getStore('userRegInfo')))
        let obj = JSON.parse(getStore('userRegInfo'));
        // removeStore('userRegInfo',obj)
        console.log(obj)
      if(getStore('codeFail')){
        this.msg = getStore('codeFail')
      }

      this.headerObj = {
        name: '操作失败'
      }
    },
    methods: {
      backReg(){
        this.$router.push("/Register?pathCode="+getStore('pathCode'));
      }
    }
}
</script>
<style scoped>
  .FailBox{
    text-align: center;
  }
.FailBox img{
  width: 1.867rem;
  height: 1.867rem;
  margin: 3.653rem auto .4rem;
}
.Fail_msg{
  display: block;
  text-align: center;
  color: #4A4A4A;
  font-size: .427rem;
  line-height: .533rem
}
.van-button{
  width: 6.907rem;
  height: 1.173rem;
  border-radius: .987rem;
  background:#4A90E2;
  border-color: #4A90E2;
  font-size: .373rem;
  margin: 1.067rem auto;
}
</style>
