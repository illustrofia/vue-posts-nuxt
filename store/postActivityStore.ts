import { defineStore } from 'pinia'
import type { PostListOrder } from '../@types'

interface State {
  postIdListOrderHistory: { [timestamp: string]: PostListOrder }
}

export const usePostActivityStore = defineStore('user', {
  state: (): State => {
    return {
      postIdListOrderHistory: {}
    }
  },
  getters: {
    latestPostIdListOrder(): PostListOrder | undefined {
      const keys = Object.keys(this.postIdListOrderHistory)
      if (keys.length === 0) {
        return undefined
      }

      const latestTimestamp = keys[keys.length - 1]
      return this.postIdListOrderHistory[latestTimestamp]
    }
  },
  actions: {
    addPostIdListOrderToHistory(order: PostListOrder) {
      this.postIdListOrderHistory[Date.now().toString()] = order
    },
    revertToPostIdListOrder(orderTimestamp: string) {
      const keys = Object.keys(this.postIdListOrderHistory)
      const orderTimestampIndex = keys.indexOf(orderTimestamp)
      if (orderTimestampIndex === -1) {
        return
      }

      const keysToBeRemoved = keys.slice(orderTimestampIndex + 1)
      keysToBeRemoved.forEach((key) => {
        delete this.postIdListOrderHistory[key]
      })
    }
  }
})
