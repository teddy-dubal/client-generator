import SubmissionError from '../../../../error/SubmissionError'
import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const reset = ({ commit }) => {
  commit(types.RESET)
}

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


export const update = ({ commit, state }, payload) => {
  commit(types.SET_ERROR, '')
  commit(types.TOGGLE_LOADING)
// {{{name}}}
  return fetch(API.parse(API.{{{uc}}}, { id: state.retrieved.id }), {
    method: 'PUT',
    body: state.retrieved,
  })
    .then(response => response.data)
    .then((data) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_UPDATED, data)
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)

      if (e.name === 'SubmissionError') {
        commit(types.SET_VIOLATIONS, e.errors._violations)
        // eslint-disable-next-line
        commit(types.SET_ERROR, e.errors._error)

        return
      }

      // eslint-disable-next-line
      commit(types.SET_ERROR, e.errors._error)
    })
}

export const updateRetrieved = ({ commit }, updated) => {
  commit(types.UPDATE_RETRIEVED, updated)
}
