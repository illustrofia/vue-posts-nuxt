<template>
  <div
    class="flex flex-col drop-shadow-md rounded border border-slate-100 bg-white md:min-w-[27.5rem]"
  >
    <div class="p-4">
      <h2 class="font-medium text-lg">List of actions commited</h2>
    </div>
    <div class="bg-slate-100 p-4 h-full">
      <span v-if="activityHistory.length === 0"> No actions available</span>

      <TransitionGroup
        class="flex flex-col drop-shadow-md rounded"
        tag="ul"
        name="activity-history"
      >
        <!-- TODO: animate list item leave -->
        <PostListHistoryAction
          v-for="(postAction, index) in activityHistory"
          :key="index"
          :post-action="postAction"
          @click-time-travel="
            () =>
              postListOrderHistory.deleteFromIndex(
                activityHistory.length - index - 1
              )
          "
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostListHistory } from '~/store'

const postListOrderHistory = usePostListHistory()
const activityHistory = computed(
  () => postListOrderHistory.activityHistory.activityHistory
)
</script>
