import Vue from 'vue'
import Vuex from 'vuex'
import pathify from '@/plugins/vuex-pathify'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
  },
  plugins: [
    pathify.plugin
  ]
})
store.dispatch('app/init/initLoad')
export default store
export const ROOT_DISPATCH = Object.freeze({ root: true })
