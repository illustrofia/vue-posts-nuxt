export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export type PostListOrderMoveTuple = [number, number]

export type PostListOrder = number[]

export type PostMoveAction = {
  movedPostId: number
  from: number
  to: number
}
