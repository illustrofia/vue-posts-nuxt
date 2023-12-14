<template>
  <div
    class="flex gap-10 p-10 flex-col md:flex-row md:justify-center md:items-start sm:gap-15 xl:gap-20"
  >
    <div class="basis-1/3 max-w-md">
      <!-- TODO: style the loading and error texts -->
      <span v-if="pendingPosts" class="text-white">Loading...</span>
      <span v-else-if="errorPosts" class="text-white"
        >Error when loading posts: {{ errorPosts.message }}</span
      >
      <PostList v-else-if="postListOrdered">
        <PostListItem
          v-for="post in postListOrdered"
          :key="post.id"
          :post="post"
          @click-arrow-up="movePost(post.id, 'up')"
          @click-arrow-down="movePost(post.id, 'down')"
          >Post {{ post.id }}</PostListItem
        >
      </PostList>
    </div>
    <div class="basis-1/3 max-w-md">
      <PostListHistory />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/@types'
import { removeUndefined } from '~/@utils'
import { usePostStore } from '~/store'

const store = usePostStore()

const {
  data: postList,
  pending: pendingPosts,
  error: errorPosts
} = useLazyFetch<Post[]>('https://jsonplaceholder.typicode.com/posts', {
  server: false,
  transform: (data) => data.slice(0, 5)
})

watch(postList, (postList) => {
  if (!postList) {
    return
  }
  const initialPostListOrder = postList.map((post) => post.id)
  store.addPostIdListOrderToHistory(0, initialPostListOrder)
})

const postListOrdered = computed(() => {
  const posts = postList.value
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
