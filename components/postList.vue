<template>
  <div>
    <h2>Sortable Post List</h2>

    <span v-if="pending">Loading...</span>

    <span v-if="error">Error when loading posts: {{ error.message }}</span>

    <ul v-if="!pending && !error" class="list-none flex flex-col gap-4">
      <li v-for="post in posts" :key="post.id" class="flex justify-between py-4 px-2 w-64">
        <h3>Post {{ post.id }}</h3>
        <div class="flex flex-col gap-1">
          <span v-if="posts.indexOf(post) !== 0" @click="() => movePost(post.id, 'up')"
            >move up</span
          >
          <span
            v-if="posts.indexOf(post) !== posts.length - 1"
            @click="() => movePost(post.id, 'down')"
            >move down</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const posts = ref<Post[]>([])

// Fetch posts and store them in a reactive state
const { data, pending, error } = useLazyFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts',
  {
    server: false,
    transform: (data) => data.slice(0, 5)
  }
)
watch(data, (value) => {
  posts.value = value ?? []
})

const movePost = (id: number, direction: 'up' | 'down') => {
  const index = posts.value.findIndex((post) => post.id === id)
  if (index === -1) {
    return
  }
  const post = posts.value[index]
  posts.value.splice(index, 1)
  posts.value.splice(index + (direction === 'up' ? -1 : 1), 0, post)
}
</script>
