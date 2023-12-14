<template>
  <div class="flex flex-col gap-4 flex-grow">
    <h2 class="font-medium text-xl text-white">Sortable Post List</h2>

    <TransitionGroup tag="ul" name="post-list" class="flex flex-col gap-4">
      <PostListItem
        v-for="post in postListOrdered"
        :key="post.id"
        :post="post"
        @move-post="movePost"
        >Post {{ post.id }}</PostListItem
      >
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/@types'
import { removeUndefined } from '~/@utils'
import { usePostStore } from '~/store'

const store = usePostStore()

const props = defineProps<{
  postList: Post[]
}>()

const postListOrdered = computed(() => {
  const posts = props.postList
  if (!store.latestPostIdListOrder || !posts || posts.length === 0) {
    return []
  }

  return store.latestPostIdListOrder
    .map((id) => {
      const postIndex = posts.findIndex((post) => post.id === id)
      if (postIndex === -1) {
        return undefined
      }
      return posts[postIndex]
    })
    .filter(removeUndefined)
})

const movePost = (postId: number, direction: 'up' | 'down') => {
  if (!store.latestPostIdListOrder) {
    return
  }

  const index = postListOrdered.value.findIndex((post) => post.id === postId)
  if (index === -1) {
    return
  }

  const newPostIdListOrder = [...store.latestPostIdListOrder]
  newPostIdListOrder.splice(index, 1)
  newPostIdListOrder.splice(
    direction === 'up' ? index - 1 : index + 1,
    0,
    postId
  )

  store.addPostIdListOrderToHistory(postId, newPostIdListOrder)
}
</script>
