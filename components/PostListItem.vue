<template>
  <li
    class="flex justify-between py-2 px-2 items-center h-16 drop-shadow-md transition-all border border-slate-100 rounded hover:drop-shadow-lg hover:border-slate-200 bg-white group"
  >
    <span class="text-sm"><slot /></span>
    <div
      class="flex flex-col h-full justify-between group-first:justify-center group-last:justify-center"
    >
      <PostListItemActionButton
        class="group-first:hidden"
        @click="$emit('move-post', post.id, 'up')"
      >
        <IconChevronUp class="max-h-2" />
      </PostListItemActionButton>

      <PostListItemActionButton
        class="group-last:hidden"
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
}>()

defineEmits<{
  (e: 'move-post', postId: number, direction: 'up' | 'down'): void
}>()
</script>
