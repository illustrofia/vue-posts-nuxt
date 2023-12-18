<template>
  <div class="purple-background min-h-full w-screen font-body">
    <ThePostSection />
  </div>
</template>

<style>
body {
  background: rgb(241 245 249);
}

.purple-background::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;

  background: linear-gradient(
    90deg,
    rgba(85, 52, 163, 0.8) 0%,
    rgba(85, 52, 163, 0.9) 50%,
    rgba(85, 52, 163, 1) 100%
  );

  transform: translateY(-85%) skewY(-10deg);
}
</style>
