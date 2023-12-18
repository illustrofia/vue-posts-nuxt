import { defineStore } from 'pinia'
import type { PostMove } from '~/types'
import { useStack } from '~/composables'
import { getLatestOrderAndPostMoveActions } from '~/utils'

export const usePostListHistory = defineStore('postList', () => {
  const stack = useStack<PostMove>()
  const initialOrder: Ref<number[] | undefined> = ref(undefined)

  return {
    moves: computed(() => stack.toArray()),
    addMove: (move: PostMove) => stack.push(move),
    deleteFromIndex: (index: number) => stack.deleteFromIndex(index),

    initialOrder: computed(() => initialOrder.value),
    setInitialOrder: (order: number[]) => (initialOrder.value = order),

    latestOrderAndMoveActions: computed(() =>
      getLatestOrderAndPostMoveActions(initialOrder.value, stack.toArray())
    )
  }
})
