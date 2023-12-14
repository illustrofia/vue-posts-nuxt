<template>
  <div class="flex flex-col gap-4 flex-grow">
    <h2 class="font-medium text-xl text-white">Sortable Post List</h2>

    <TransitionGroup tag="ul" name="post-list" class="flex flex-col gap-4">
      <slot />
    </TransitionGroup>
  </div>
</template>
