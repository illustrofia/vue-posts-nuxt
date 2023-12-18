import type { PostMove, PostMoveAction } from '~/types'

export const getLatestOrderAndPostMoveActions = (
  initialOrder: number[] | undefined,
  postListMoves: PostMove[]
) => {
  const postMoveActions: PostMoveAction[] = []

  if (!initialOrder) {
    return {
      latestOrder: [],
      postMoveActions: []
    }
  }

  const latestOrder = [...initialOrder]

  postListMoves.forEach((activity, index) => {
    const [from, to] = activity
    const movedPostId = latestOrder.splice(from, 1)[0]
    latestOrder.splice(to, 0, movedPostId)

    postMoveActions.unshift({
      from,
      index,
      movedPostId,
      to
    })
  })

  return { latestOrder, postMoveActions }
}
