import { defineStore } from 'pinia'
import type { PostMove } from '~/types'
import { getLatestOrderAndPostMoveActions } from '~/utils'

export const usePostListHistory = defineStore('postList', () => {
  const stack = useStack<PostMove>()
  const initialOrder: Ref<number[] | undefined> = ref(undefined)

  return {
    initialOrder: initialOrder.value,
    setInitialOrder: (order: number[]) => (initialOrder.value = order),

    moves: stack.toArray(),
    addMove: (move: PostMove) => stack.push(move),
    deleteFromIndex: (index: number) => stack.deleteFromIndex(index),

    latestOrderAndMoveActions: computed(() =>
      getLatestOrderAndPostMoveActions(initialOrder.value, stack.toArray())
    )
  }
})
