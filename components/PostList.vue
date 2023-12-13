<template>
  <div class="flex flex-col gap-4 flex-grow">
    <h2 class="font-medium text-xl text-white">Sortable Post List</h2>

    <!-- TODO: style the loading and error texts -->
    <span v-if="pending" class="text-white">Loading...</span>
    <span v-else-if="error" class="text-white"
      >Error when loading posts: {{ error.message }}</span
    >

    <TransitionGroup
      v-if="!pending && !error"
      tag="ul"
      name="post-list"
      class="flex flex-col gap-4"
    >
      <li
        v-for="post in postListOrdered"
        :key="post.id"
        class="flex justify-between py-2 px-2 items-center h-16 drop-shadow-md transition-all border border-slate-100 rounded hover:drop-shadow-lg hover:border-slate-200 bg-white"
      >
        <h3 class="font-thin text-sm">Post {{ post.id }}</h3>
        <div
          :class="{
            'flex flex-col h-full': true,
            'justify-between':
              postListOrdered.indexOf(post) !== 0 &&
              postListOrdered.indexOf(post) !== postListOrdered.length - 1,
            'justify-center': !(
              postListOrdered.indexOf(post) !== 0 &&
              postListOrdered.indexOf(post) !== postListOrdered.length - 1
            )
          }"
        >
          <button
            v-if="postListOrdered.indexOf(post) !== 0"
            class="p-1 cursor-pointer transition-all hover:scale-125 active:scale-150"
            @click="() => movePost(post.id, 'up')"
          >
            <IconChevronUp class="max-h-2" />
          </button>

          <button
            v-if="postListOrdered.indexOf(post) !== postListOrdered.length - 1"
            class="p-1 cursor-pointer transition-all hover:scale-125 active:scale-150"
            @click="() => movePost(post.id, 'down')"
          >
            <IconChevronDown class="max-h-2" />
          </button>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/@types'
import { removeUndefined } from '~/@utils'
import { usePostActivityStore } from '~/store'
import IconChevronUp from '~/assets/icons/chevron-up.svg'
import IconChevronDown from '~/assets/icons/chevron-down.svg'

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
  store.addPostIdListOrderToHistory(0, initialPostListOrder)
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
