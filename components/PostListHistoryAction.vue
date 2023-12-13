<template>
  <li
    :class="{
      'flex flex-col sm:flex-row items-center gap-4 justify-between p-3 border border-slate-100 bg-white transition-all': true,
      'rounded-t': isFirst,
      'rounded-b': isLast
    }"
  >
    <span class="text-xs sm:text-sm text-gray-700">
      Moved post {{ postAction.movedPostId }} from index
      {{ postAction.from }} to index {{ postAction.to }}
    </span>
    <button
      class="bg-green-300 hover:bg-green-200 text-green-900 hover:text-green-800 border border-green-400 hover:border-green-300 py-1 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm font-semibold rounded transition-all drop-shadow-sm hover:drop-shadow-md active:bg-green-400 active:text-green-900 active:border-green-400 shrink-0"
      @click="$emit('time-travel', postAction.timestamp)"
    >
      Time travel
    </button>
  </li>
</template>

<script setup lang="ts">
import type { PostAction } from '~/@types'

defineProps<{
  postAction: PostAction
  isFirst: boolean
  isLast: boolean
}>()

defineEmits<{
  (e: 'time-travel', timestamp: string): void
}>()
</script>
