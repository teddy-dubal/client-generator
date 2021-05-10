import * as types from './mutation_types'

export default {
  [types.RESET](state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null,
      updated: null,
      violations: null,
    })
  },

  [types.TOGGLE_LOADING](state) {
    Object.assign(state, { error: '', isLoading: !state.isLoading })
  },

  [types.SET_UPDATED](state, updated) {
    Object.assign(state, { error: '', updated, violations: null })
  },

  [types.UPDATE_RETRIEVED](state, updated) {
    Object.assign(state.retrieved, updated)
  },
}
