export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export type PostListOrder = number[]

export interface PostListActivity {
  movedPostId: number
  order: PostListOrder
}

export type PostAction = {
  movedPostId: number
  timestamp: string
  from: number
  to: number
}
