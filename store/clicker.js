export const state = () => ({
  count: 0,
  SpC: 1
})

export const actions = {
  increment ({ commit }, data) {
    commit('increment', data)
  },
  reset ({ commit }) {
    commit('setCount', 0)
  },
  setSpC ({ commit }, data) {
    commit('setSpC', data)
  }
}

export const mutations = {
  setCount (state, data) {
    state.count = data
  },
  increment (state, data) {
    state.count += data
  },
  setSpC (state, data) {
    state.SpC = data
  }
}

export const getters = {
  count: (state) => {
    return state.count
  },
  SpC: (state) => {
    return state.SpC
  }
}
