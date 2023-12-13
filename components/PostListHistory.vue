<template>
  <div
    class="flex flex-col drop-shadow-md rounded border border-slate-100 bg-white md:min-w-[27.5rem]"
  >
    <div class="p-4">
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
        <PostListHistoryAction
          v-for="postAction in store.postActionHistory"
          :key="postAction.timestamp"
          :post-action="postAction"
          :is-first="store.postActionHistory.indexOf(postAction) === 0"
          :is-last="
            store.postActionHistory.indexOf(postAction) ===
            store.postActionHistory.length - 1
          "
          @time-travel="store.revertToPostIdListOrder"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostActivityStore } from '~/store'

const store = usePostActivityStore()
</script>
