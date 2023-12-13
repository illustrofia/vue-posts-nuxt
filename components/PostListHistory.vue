<template>
  <div
    class="flex flex-col drop-shadow-md rounded border border-slate-100 bg-white md:min-w-[27.5rem]"
  >
    <div class="p-5">
      <h2 class="font-medium text-lg">List of actions commited</h2>
    </div>
    <div class="bg-slate-100 p-4 h-full">
      <span v-if="store.postActionHistory.length === 0">
        No actions available
      </span>

      <TransitionGroup
        class="flex flex-col drop-shadow-md rounded"
        tag="ul"
        name="activity-history"
      >
        <!-- TODO: animate list item leave -->
        <li
          v-for="postAction in store.postActionHistory"
          :key="JSON.stringify(postAction)"
          :class="{
            'flex flex-col sm:flex-row items-center gap-4 justify-between p-3 border border-slate-100 bg-white transition-all': true,
            'rounded-t': store.postActionHistory.indexOf(postAction) === 0,
            'rounded-b':
              store.postActionHistory.indexOf(postAction) ===
              store.postActionHistory.length - 1
          }"
        >
          <span class="text-sm text-gray-700">
            Moved post {{ postAction.movedPostId }} from index
            {{ postAction.from }} to index {{ postAction.to }}
          </span>
          <button
            class="bg-green-300 hover:bg-green-200 text-green-900 hover:text-green-800 border border-green-400 hover:border-green-300 py-2 px-4 text-sm font-semibold rounded transition-all drop-shadow-sm hover:drop-shadow-md active:bg-green-400 active:text-green-900 active:border-green-400 shrink-0"
            @click="() => store.revertToPostIdListOrder(postAction.timestamp)"
          >
            Time travel
          </button>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostActivityStore } from '~/store'

const store = usePostActivityStore()
</script>
