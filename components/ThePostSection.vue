<template>
  <div
    class="sm:gap-15 flex flex-col gap-10 p-10 md:flex-row md:items-start md:justify-center xl:gap-20"
  >
    <div class="max-w-md basis-1/3">
      <!-- TODO: style the loading and error texts -->
      <span v-if="pendingPosts" class="text-white">Loading...</span>
      <span v-else-if="errorPosts" class="text-white"
        >Error when loading posts: {{ errorPosts.message }}</span
      >
      <PostList v-else-if="postListOrdered.length > 0">
        <PostListItem
          v-for="(post, index) in postListOrdered"
          :key="post.id"
          :post="post"
          @click-arrow-up="movePost(index, 'up')"
          @click-arrow-down="movePost(index, 'down')"
          >Post {{ post.id }}</PostListItem
        >
      </PostList>
    </div>
    <div class="max-w-md basis-1/3">
      <ClientOnly>
        <PostListHistory />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types'

import { usePostListHistory } from '~/store'

const postListHistory = usePostListHistory()

const {
  data: postList,
  error: errorPosts,
  pending: pendingPosts
} = useLazyFetch<Post[]>('https://jsonplaceholder.typicode.com/posts', {
  server: false,
  transform: (data) => data.slice(0, 5)
})

watch(postList, (postList) => {
  if (!postList || postListHistory.initialOrder) {
    return
  }
  postListHistory.setInitialOrder(postList.map((post) => post.id))
})

const getPostListOrdered = (
  postList: Post[] | null,
  postListOrder: number[] | undefined
) => {
  if (!postList || !postListOrder) {
    return []
  }
  return postList.toSorted((a, b) => {
    if (!a || !b) {
      return 0
    }
    return postListOrder.indexOf(a.id) - postListOrder.indexOf(b.id)
  })
}

const postListOrdered = computed(() =>
  getPostListOrdered(
    postList.value,
    postListHistory.latestOrderAndMoveActions.latestOrder
  )
)

const movePost = (movedPostIndex: number, direction: 'down' | 'up') => {
  postListHistory.addMove([
    movedPostIndex,
    direction === 'up' ? movedPostIndex - 1 : movedPostIndex + 1
  ])
}
</script>
