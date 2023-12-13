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
      <PostList v-else-if="postList" :post-list="postList" />
    </div>
    <div class="basis-1/3 max-w-md">
      <PostListHistory />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/@types'
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
</script>
