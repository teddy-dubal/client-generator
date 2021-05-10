import fetch from '@/utils/fetch'
import * as types from './mutation_types'
import API from '@/config/_routes'

export const retrieve = ({ commit }, obj) => {
  commit(types.TOGGLE_LOADING)
// {{{name}}}
  return fetch(API.parse(API.{{{uc}}}, obj))
    .then(response => response.data)
    .then((data) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.RESET)
}
