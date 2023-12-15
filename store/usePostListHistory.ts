import { defineStore } from 'pinia'
import type { PostListOrderMoveTuple, PostMoveAction } from '~/types'

interface State {
  initialOrder: number[] | undefined
  stack: PostListOrderMoveTuple[]
}

export const usePostListHistory = defineStore('postList', {
  state: (): State => {
    return {
      initialOrder: undefined,
      // By all means, this should've been a proper stack class, but apparently Vue + custom classes + reactiviy = 💔
      stack: []
    }
  },
  getters: {
    postMoveActionList(state) {
      return state.stack
    },
    activityHistory(state) {
      const activityHistory: PostMoveAction[] = []
      const initialOrder = state.initialOrder
      const postListMoves = state.stack

      if (!initialOrder) {
        return {
          activityHistory: [],
          latestOrder: []
        }
      }

      const latestOrder = [...initialOrder]

      postListMoves.forEach((activity) => {
        const [from, to] = activity
        const movedPostId = latestOrder.splice(from, 1)[0]
        latestOrder.splice(to, 0, movedPostId)

        activityHistory.unshift({
          movedPostId,
          from,
          to
        })
      })

      return { activityHistory, latestOrder }
    }
  },
  actions: {
    setInitialOrder(order: number[]) {
      this.initialOrder = order
    },
    addMoveAction(move: PostListOrderMoveTuple) {
      this.stack.push(move)
    },
    deleteFromIndex(index: number) {
      this.stack.splice(index)
    }
  }
})
