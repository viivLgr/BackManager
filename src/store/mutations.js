import * as types from './mutations-types'

const mutations = {
  [types.SET_USER_RIGHT](state, userRight) {
    state.userRight = userRight
  }
}

export default mutations
