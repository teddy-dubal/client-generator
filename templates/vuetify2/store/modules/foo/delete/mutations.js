import * as types from './mutation_types'

export default {

  [types.TOGGLE_LOADING] (state) {
    Object.assign(state, { error: '', isLoading: !state.isLoading })
  },

  [types.RESET] (state) {
    Object.assign(state, {
      deleted: null,
      error: '',
      isLoading: false,
    })
  },
}
