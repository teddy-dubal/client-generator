import fetch from '@/utils/fetch'
import * as types from './mutation_types'
import API from '@/config/_routes'
import querystring from 'query-string'

const items = ({ commit }, opt = { query: { page: 1 }, data: {} }) => {
  commit(types.TOGGLE_LOADING)
// API_ROUTE [{{{uc}}}: '/{{{name}}}',]
  const page =
    `${API.{{{uc}}} }?` +
    querystring.stringify(opt.query || {})
      return fetch(API.parse(page, opt.data))
    .then(response => response.data)
    .then(data => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ITEMS, data._embedded.items)
      commit(types.SET_VIEW, {
        ...data._links,
        page: data.page,
        page_count: data.page_count,
        page_size: data.page_size,
        total_items: data.total_items
      })
    })
    .catch(e => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ERROR, e.message)
    })
}

export const search = ({ commit }, val) => {
  commit(types.TOGGLE_LOADING_SEARCH)
// API_ROUTE [{{{uc}}}: '/{{{name}}}',]
  return fetch(API.parse(`${API.{{{uc}}}_SEARCH}?q=${val}`))
    .then(response => response.data)
    .then(data => {
      commit(types.TOGGLE_LOADING_SEARCH)
      commit(types.SET_ITEMS_SEARCH, data)
    })
    .catch(e => {
      commit(types.TOGGLE_LOADING_SEARCH)
      commit(types.SET_ERROR, e.message)
    })
}

export default items
