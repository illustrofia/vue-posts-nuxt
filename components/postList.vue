<template>
  <div>
    <h2>Sortable Post List</h2>

    <span v-if="pending">Loading...</span>

    <span v-if="error">Error when loading posts: {{ error.message }}</span>

    <ul v-if="!pending && !error" class="list-none flex flex-col gap-4">
      <li
        v-for="post in postListOrdered"
        :key="post.id"
        class="flex justify-between py-4 px-2 w-64"
      >
        <h3>Post {{ post.id }}</h3>
        <div class="flex flex-col gap-1">
          <span v-if="postListOrdered.indexOf(post) !== 0" @click="() => movePost(post.id, 'up')"
            >move up</span
          >
          <span
            v-if="postListOrdered.indexOf(post) !== postListOrdered.length - 1"
            @click="() => movePost(post.id, 'down')"
            >move down</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/@types'
import { removeUndefined } from '~/@utils'
import { usePostActivityStore } from '~/store'

const store = usePostActivityStore()

// Fetch posts and store them in a reactive state
const {
  data: fetchedPostList,
  pending,
  error
} = useLazyFetch<Post[]>('https://jsonplaceholder.typicode.com/posts', {
  server: false,
  transform: (data) => data.slice(0, 5)
})
watch(fetchedPostList, (fetchedPostList) => {
  if (!fetchedPostList) {
    return
  }
  const initialPostListOrder = fetchedPostList.map((post) => post.id)
  store.addPostIdListOrderToHistory(initialPostListOrder)
})

// compute posts based on latestPostListOrder
const postListOrdered = computed(() => {
  const posts = fetchedPostList.value
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

const movePost = (id: number, direction: 'up' | 'down') => {
  if (!store.latestPostIdListOrder) {
    return
  }

  const index = postListOrdered.value.findIndex((post) => post.id === id)
  if (index === -1) {
    return
  }

  const newPostIdListOrder = [...store.latestPostIdListOrder]
  newPostIdListOrder.splice(index, 1)
  newPostIdListOrder.splice(direction === 'up' ? index - 1 : index + 1, 0, id)

  store.addPostIdListOrderToHistory(newPostIdListOrder)
}
</script>
