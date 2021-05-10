import * as types from './mutation_types'

export default {
  [types.RESET](state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      items: [],
      view: [],
      itemsSearch: [],
      isLoadingSearch: false
    })
  },

  [types.SET_ITEMS](state, items) {
    Object.assign(state, {
      error: '',
      items,
    })
  },

  [types.TOGGLE_LOADING](state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },
  [types.SET_ITEMS_SEARCH] (state, itemsSearch) {
    Object.assign(state, { itemsSearch })
  },
  [types.TOGGLE_LOADING_SEARCH](state) {
    Object.assign(state, { isLoadingSearch: !state.isLoadingSearch })
  },
}
