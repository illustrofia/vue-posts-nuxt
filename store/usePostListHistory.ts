import { defineStore } from 'pinia'

import type { PostMove } from '~/types'

import { getLatestOrderAndPostMoveActions } from '~/utils'

export const usePostListHistory = defineStore('postList', () => {
  const stack = useStack<PostMove>()
  const initialOrder: Ref<number[] | undefined> = ref(undefined)

  return {
    addMove: (move: PostMove) => stack.push(move),
    deleteFromIndex: (index: number) => stack.deleteFromIndex(index),

    initialOrder: initialOrder.value,
    latestOrderAndMoveActions: computed(() =>
      getLatestOrderAndPostMoveActions(initialOrder.value, stack.toArray())
    ),
    moves: stack.toArray(),

    setInitialOrder: (order: number[]) => (initialOrder.value = order)
  }
})
