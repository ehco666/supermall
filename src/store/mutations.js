import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // mutations惟一的目的就是修改state中的状态, 且可以跟踪
  // mutations中的每个方法尽可能完成的时间比较单一 一点
    // 数量加一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}