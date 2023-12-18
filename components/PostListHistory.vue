<template>
  <div
    class="flex flex-col rounded border border-slate-100 bg-white drop-shadow-md md:min-w-[27.5rem]"
  >
    <div class="p-4">
      <h2 class="text-lg font-medium">List of actions commited</h2>
    </div>
    <div class="h-full bg-slate-100 p-4">
      <span v-if="postMoveActions.length === 0"> No actions available</span>

      <TransitionGroup
        class="flex flex-col rounded drop-shadow-md"
        tag="ul"
        name="activity-history"
      >
        <!-- TODO: animate list item leave -->
        <PostListHistoryAction
          v-for="(postAction, index) in postMoveActions"
          :key="index"
          :post-move-action="postAction"
          @click-time-travel="
            () =>
              postListOrderHistory.deleteFromIndex(
                postMoveActions.length - index - 1
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
const postMoveActions = computed(
  () => postListOrderHistory.latestOrderAndMoveActions.postMoveActions
)
</script>
