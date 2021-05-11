import * as types from './mutation_types'

export default {
  [types.TOGGLE_LOADING](state) {
    Object.assign(state, { error: '', isLoading: !state.isLoading })
  },
  [types.RESET](state) {
    Object.assign(state, {
      created: null,
      error: '',
      isLoading: false,
      violations: null,
    })
  },
}
