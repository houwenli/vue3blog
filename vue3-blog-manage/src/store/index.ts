import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    name: 'houwenli'
  },
  getters: { 
    getCount (state) {
      return state.count
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
  modules: {
  }
})
