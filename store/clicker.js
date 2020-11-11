export const state = () => ({
  count: 0
})

export const actions = {
  increment ({ commit }, data) {
    commit('increment', data)
  },
  reset ({ commit }) {
    commit('setCount', 0)
  }
}

export const mutations = {
  setCount (state, data) {
    state.count = data
  },
  increment (state, data) {
    state.count += data
  }
}

export const getters = {
  count: (state) => {
    return state.count
  }
}
