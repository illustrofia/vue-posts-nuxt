<template>
  <li
    class="flex justify-between py-2 px-2 items-center h-16 drop-shadow-md transition-all border border-slate-100 rounded hover:drop-shadow-lg hover:border-slate-200 bg-white"
  >
    <h3 class="font-thin text-sm">Post {{ post.id }}</h3>
    <div
      :class="{
        'flex flex-col h-full': true,
        'justify-between': !(isFirst || isLast),
        'justify-center': isFirst || isLast
      }"
    >
      <PostListItemActionButton
        v-show="!isFirst"
        @click="$emit('move-post', post.id, 'up')"
      >
        <IconChevronUp class="max-h-2" />
      </PostListItemActionButton>

      <PostListItemActionButton
        v-show="!isLast"
        @click="$emit('move-post', post.id, 'down')"
      >
        <IconChevronDown class="max-h-2" />
      </PostListItemActionButton>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Post } from '~/@types'
import IconChevronDown from '~/assets/icons/chevron-down.svg'
import IconChevronUp from '~/assets/icons/chevron-up.svg'

defineProps<{
  post: Post
  isFirst: boolean
  isLast: boolean
}>()

defineEmits<{
  (e: 'move-post', postId: number, direction: 'up' | 'down'): void
}>()
</script>
