<template>
  <div>
    <h2>Sortable Post List</h2>

    <span v-if="pending">Loading...</span>

    <span v-if="error">Error when loading posts: {{ error.message }}</span>

    <ul v-if="!pending && !error" class="list-none flex flex-col gap-4">
      <li v-for="post in posts" :key="post.id" class="flex justify-between py-4 px-2 w-64">
        <h3>Post {{ post.id }}</h3>
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

// Fetch posts and store them in a reactive state
const { data, pending, error } = useLazyFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts',
  {
    server: false,
    transform: (data) => data.slice(0, 5)
  }
)

const posts = ref<Post[]>([])

watch(data, (value) => {
  posts.value = value ?? []
})
</script>
