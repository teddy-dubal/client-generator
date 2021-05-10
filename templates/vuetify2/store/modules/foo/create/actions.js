import fetch from '@/utils/fetch'
import * as types from './mutation_types'
import API from '@/config/_routes'

export const create = ({ commit }, values) => {
  commit(types.SET_ERROR, '')
  commit(types.TOGGLE_LOADING)
// {{{name}}}
  return fetch(API.parse(API.{{{uc}}}, values), { method: 'POST',  body: values })
    .then((response) => {
      commit(types.TOGGLE_LOADING)

      return response.data
    })
    .then((data) => {
      commit(types.SET_CREATED, data)
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)

      if (e.name === 'SubmissionError') {
        commit(types.SET_VIOLATIONS, e.errors._violations)
        // eslint-disable-next-line
        commit(types.SET_ERROR, e.errors._error)

        return
      }

      commit(types.SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.RESET)
}
