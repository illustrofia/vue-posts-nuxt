import { describe, expect, it } from 'vitest'

import type { PostListOrder, PostMove } from '~/types'

import { getLatestOrderAndPostMoveActions } from '~/utils'

describe('getLatestOrderAndPostMoveActions', () => {
  it('returns an empty array for the latest order and no move actions if the initial order is undefined', () => {
    const result = getLatestOrderAndPostMoveActions(undefined, [])
    expect(result.latestOrder).toEqual([])
    expect(result.postMoveActions).toEqual([])
  })

  it('returns the correct latest order and move actions for a sequence of moves', () => {
    const initialOrder: PostListOrder = [1, 2, 3, 4, 5]
    const moves: PostMove[] = [
      [1, 2], // Move post with id 2 below post with id 3
      [3, 4], // Move post with id 4 below post with id 5
      [1, 0] // Move post with id 3 above post with id 1
    ]

    const result = getLatestOrderAndPostMoveActions(initialOrder, moves)
    expect(result.latestOrder).toEqual([3, 1, 2, 5, 4])
    expect(result.postMoveActions).toEqual([
      { from: 1, movedPostId: 3, to: 0 },
      { from: 3, movedPostId: 4, to: 4 },
      { from: 1, movedPostId: 2, to: 2 }
    ])
  })
})
