<template>
  <div class="flex basis-2/5 flex-col p-3 gap-4">
    <h2>List of actions commited</h2>
    <div class="flex flex-col gap-2">
      <div
        v-for="postAction in store.postActionHistory"
        :key="JSON.stringify(postAction)"
        class="flex items-center gap-2 p-2"
      >
        <span
          >Moved post {{ postAction.movedPostId }} from index {{ postAction.from }} to index
          {{ postAction.to }}</span
        >
        <button
          class="bg-green-300 text-blue-900 p-2 rounded"
          @click="() => store.revertToPostIdListOrder(postAction.timestamp)"
        >
          Time travel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostActivityStore } from '~/store'

const store = usePostActivityStore()
</script>
