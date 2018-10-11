// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import Vuex from 'vuex'
import store from './store'
import 'vant/lib/vant-css/index.css';
import 'lib-flexible/flexible.js'
import {getCookie} from './config/index'
Vue.use(Vant);
Vue.use(Vuex)

Vue.config.productionTip = false
// axios全局配置
axios.defaults.baseURL = HOST;
console.log(HOST,'HOST');


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {      // 下一个页面需要登录
   if(getCookie("bAuth")) {        // 已登录
       next()                       // 访问下一个页面
     } else {                       // 未登录
       next('/')                    // 回到登录界面
     }
   } else {                         //下一个页面不需要登录
     next()                         // 访问下一个页面
   }
 })
