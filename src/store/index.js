import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const state = {};

//getter 抛出去的数据
const getters = {};

//action 异步的操作
const actions = {
    bottom(context) {
    console.log(context)
    context.commit("BOTTOM");
    },
};

//mutation
const mutations = {
    BOTTOM(state) {
      console.log(state)
    }
};

export default new Vuex.Store ({
  state:state,
  mutations: mutations,
  actions: actions,
  getters,
})
