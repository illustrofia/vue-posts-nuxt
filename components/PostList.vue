<template>
  <div class="flex flex-grow flex-col gap-4">
    <h2 class="text-xl font-medium text-white">Sortable Post List</h2>

    <TransitionGroup tag="ul" name="post-list" class="flex flex-col gap-4">
      <slot />
    </TransitionGroup>
  </div>
</template>
