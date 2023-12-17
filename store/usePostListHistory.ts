import { defineStore } from 'pinia'
import type { PostMove } from '~/types'
import { getPostMoveActionsAndLatestOrder } from '~/utils'

interface State {
  initialOrder: number[] | undefined
  stack: PostMove[]
}

export const usePostListHistory = defineStore('postList', {
  state: (): State => {
    return {
      // This should've been a proper stack class, but Vue reactivity + custom classes = 💔
      stack: [],
      initialOrder: undefined
    }
  },
  getters: {
    moves(state) {
      return state.stack
    },
    moveActionsAndLatestOrder(state) {
      // we put these two together because the latest order
      // is the result of applying all the moves to the initial order
      return getPostMoveActionsAndLatestOrder(state.initialOrder, state.stack)
    }
  },
  actions: {
    setInitialOrder(order: number[]) {
      this.initialOrder = order
    },
    addMove(move: PostMove) {
      this.stack.push(move)
    },
    deleteFromIndex(index: number) {
      this.stack.splice(index)
    }
  }
})
