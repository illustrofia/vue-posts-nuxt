<template>
  <li
    class="group flex h-16 items-center justify-between rounded border border-slate-100 bg-white px-2 py-2 drop-shadow-md transition-all hover:border-slate-200 hover:drop-shadow-lg"
  >
    <span class="text-sm"><slot /></span>
    <div
      class="flex h-full flex-col justify-between group-first:justify-center group-last:justify-center"
    >
      <PostListItemActionButton
        class="group-first:hidden"
        @click="$emit('click-arrow-up')"
      >
        <IconChevronUp class="max-h-2" />
      </PostListItemActionButton>

      <PostListItemActionButton
        class="group-last:hidden"
        @click="$emit('click-arrow-down')"
      >
        <IconChevronDown class="max-h-2" />
      </PostListItemActionButton>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Post } from '~/types'

import IconChevronDown from '~/assets/icons/chevron-down.svg'
import IconChevronUp from '~/assets/icons/chevron-up.svg'

defineProps<{
  post: Post
}>()

defineEmits<{
  (e: 'click-arrow-down'): void
  (e: 'click-arrow-up'): void
}>()
</script>
