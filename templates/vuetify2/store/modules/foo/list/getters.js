export const itemsSearch = state => {
  return Object.keys(state.itemsSearch).map(i => {
    const it = state.itemsSearch[i]
    return { ...it, value: it.id }
  })
}
