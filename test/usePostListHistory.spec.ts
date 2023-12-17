// usePostListHistory.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostListHistory } from '~/store'
import type { PostMove } from '~/types'

describe('usePostListHistory', () => {
  beforeEach(() => {
    // Resets Pinia store before each test
    setActivePinia(createPinia())
  })

  it('initializes with the correct default state', () => {
    const postListHistory = usePostListHistory()
    expect(postListHistory.initialOrder).toBeUndefined()
    expect(postListHistory.stack).toEqual([])
  })

  it('sets the initial order correctly', () => {
    const postListHistory = usePostListHistory()
    const initialOrder = [1, 2, 3, 4, 5]
    postListHistory.setInitialOrder(initialOrder)
    expect(postListHistory.initialOrder).toEqual(initialOrder)
  })

  it('adds a move to the stack', () => {
    const postListHistory = usePostListHistory()
    const move: PostMove = [0, 1]
    postListHistory.addMove(move)
    expect(postListHistory.stack).toHaveLength(1)
    expect(postListHistory.stack[0]).toEqual(move)
  })

  it('deletes from the stack starting at a specific index', () => {
    const postListHistory = usePostListHistory()
    postListHistory.setInitialOrder([1, 2, 3, 4, 5])
    postListHistory.addMove([0, 1])
    postListHistory.addMove([1, 2])
    postListHistory.deleteFromIndex(1)
    expect(postListHistory.stack).toHaveLength(1)
  })

  it('handles a sequence of moves and time travel', () => {
    const postListHistory = usePostListHistory()
    const initialOrder = [1, 2, 3, 4, 5]

    // Set the initial order
    postListHistory.setInitialOrder(initialOrder)

    // Simulate moving Post 2 below Post 3
    postListHistory.addMove([1, 2])

    // Simulate moving Post 4 below Post 5
    postListHistory.addMove([3, 4])

    // Simulate moving Post 3 above Post 1
    postListHistory.addMove([1, 0])

    // Now, the store should reflect the state after all the moves
    expect(postListHistory.latestOrderAndMoveActions.latestOrder).toEqual([
      3, 1, 2, 5, 4
    ])

    // Simulate time travel by deleting the second action (index 1, since arrays are zero-indexed)
    postListHistory.deleteFromIndex(1)

    // After time travel, the store should reflect the state before the second move
    expect(postListHistory.latestOrderAndMoveActions.latestOrder).toEqual([
      1, 3, 2, 4, 5
    ])

    // The remaining moves in the stack should only be the first move
    expect(postListHistory.moves).toHaveLength(1)
    expect(postListHistory.moves[0]).toEqual([1, 2])
  })
})
