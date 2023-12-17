import type { PostMove, PostMoveAction } from '~/types'

export const getPostMoveActionsAndLatestOrder = (
  initialOrder: number[] | undefined,
  postListMoves: PostMove[]
) => {
  const postMoveActions: PostMoveAction[] = []

  if (!initialOrder) {
    return {
      postMoveActions: [],
      latestOrder: []
    }
  }

  const latestOrder = [...initialOrder]

  postListMoves.forEach((activity) => {
    const [from, to] = activity
    const movedPostId = latestOrder.splice(from, 1)[0]
    latestOrder.splice(to, 0, movedPostId)

    postMoveActions.unshift({
      movedPostId,
      from,
      to
    })
  })

  return { postMoveActions, latestOrder }
}
