import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add() {
      this.state.count++;
    }
  },
  actions: {
    add({commit}){
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
   
  },
  modules: {
  }
})
