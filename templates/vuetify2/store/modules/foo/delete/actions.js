import fetch from '@/utils/fetch'
import * as types from './mutation_types'
import API from '@/config/_routes'

export const del = ({ commit }, item) => {
  commit(types.TOGGLE_LOADING)
// {{{name}}}
  return fetch(API.parse(API.{{{uc}}}, item), { method: 'DELETE' })
    .then(() => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_DELETED, item)
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.RESET)
}
