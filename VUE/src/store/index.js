/**
 * Created by llb on 2018/10/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    isLoading: true
  },
  mutations: {
    updateIsLoading (state,loading) {
      state.isLoading = loading;
    }
  }
})

export default store;


