export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export type PostMove = [from: number, to: number]

export type PostListOrder = number[]

export type PostMoveAction = {
  movedPostId: number
  from: number
  to: number
}
