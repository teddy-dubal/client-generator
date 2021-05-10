import { make } from 'vuex-pathify'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  error: '',
  isLoading: false,
  items: [],
  view: [],
  itemsSearch: [],
  isLoadingSearch: false
}
export default {
  namespaced: true,
  state,
  actions: { ...make.actions(state), ...actions },
  getters: { ...make.getters(state), ...getters },
  mutations: { ...make.mutations(state), ...mutations }
}
