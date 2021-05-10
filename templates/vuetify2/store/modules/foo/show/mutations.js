import * as types from './mutation_types'

export default {
  [types.RESET](state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null,
    })
  },

  [types.TOGGLE_LOADING](state) {
    Object.assign(state, { error: '', isLoading: !state.isLoading })
  },
}
