import * as types from './mutations-types'
import { setUserRight } from 'static/js/cache'

export const saveUserRight = function({commit}, userRight) {
  commit(types.SET_USER_RIGHT, setUserRight(userRight));
}
