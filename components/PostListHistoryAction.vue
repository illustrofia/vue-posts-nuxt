<template>
  <li
    class="flex flex-col items-center justify-between gap-4 border border-slate-100 bg-white p-3 transition-all first:rounded-t last:rounded-b sm:flex-row"
  >
    <span class="text-xs text-gray-700 sm:text-sm">
      Moved post {{ postMoveAction.movedPostId }} from index
      {{ postMoveAction.from }} to index {{ postMoveAction.to }}
    </span>
    <button
      class="shrink-0 rounded border border-green-400 bg-green-300 px-2 py-1 text-xs font-semibold text-green-900 drop-shadow-sm transition-all hover:border-green-300 hover:bg-green-200 hover:text-green-800 hover:drop-shadow-md active:border-green-400 active:bg-green-400 active:text-green-900 sm:px-4 sm:py-2 sm:text-sm"
      @click="$emit('click-time-travel')"
    >
      Time travel
    </button>
  </li>
</template>

<script setup lang="ts">
import type { PostMoveAction } from '~/types'

defineProps<{
  postMoveAction: PostMoveAction
}>()

defineEmits<{
  (e: 'click-time-travel'): void
}>()
</script>
