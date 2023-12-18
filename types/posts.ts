export interface Post {
  body: string
  id: number
  title: string
  userId: number
}

export type PostMove = [from: number, to: number]

export type PostListOrder = number[]

export type PostMoveAction = {
  from: number
  index: number
  movedPostId: number
  to: number
}
