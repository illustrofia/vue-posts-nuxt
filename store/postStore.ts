import { defineStore } from 'pinia'
import type { PostAction, PostListActivity, PostListOrder } from '~/@types'

interface State {
  postListActivityHistory: {
    [timestamp: string]: PostListActivity
  }
}

export const usePostStore = defineStore('user', {
  state: (): State => {
    return {
      postListActivityHistory: {}
    }
  },
  getters: {
    latestPostIdListOrder(): PostListOrder | undefined {
      const keys = Object.keys(this.postListActivityHistory)
      if (keys.length === 0) {
        return undefined
      }

      const latestTimestamp = keys[keys.length - 1]
      return this.postListActivityHistory[latestTimestamp].order
    },
    postActionHistory(): PostAction[] {
      const timestamps = Object.keys(this.postListActivityHistory)
      const history: PostAction[] = []
      timestamps.forEach((timestamp, index) => {
        if (index === 0) {
          return undefined
        }

        const previousTimestamp = timestamps[index - 1]
        const previousActivity = this.postListActivityHistory[previousTimestamp]
        const newActivity = this.postListActivityHistory[timestamp]
        const movedPostId = newActivity.movedPostId

        history.unshift({
          movedPostId,
          timestamp,
          from: previousActivity.order.indexOf(movedPostId),
          to: newActivity.order.indexOf(movedPostId)
        })
      })
      return history
    }
  },
  actions: {
    addPostIdListOrderToHistory(movedPost: number, order: PostListOrder) {
      this.postListActivityHistory[Date.now().toString()] = {
        movedPostId: movedPost,
        order
      }
    },
    revertToPostIdListOrder(orderTimestamp: string) {
      const keys = Object.keys(this.postListActivityHistory)
      const orderTimestampIndex = keys.indexOf(orderTimestamp)
      if (orderTimestampIndex === -1) {
        return
      }

      const keysToBeRemoved = keys.slice(orderTimestampIndex)
      keysToBeRemoved.forEach((key) => {
        delete this.postListActivityHistory[key]
      })
    }
  }
})
