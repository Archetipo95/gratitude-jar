<template>
  <div class="flex justify-between items-center p-4 border-t bg-white dark:bg-gray-800 shadow-sm">
    <p class="flex items-center gap-1" data-test="footer-made-by">
      Made with <UIcon name="lucide:heart" data-test="heart-icon" /> by
      <NuxtLink to="https://github.com/Archetipo95" data-test="github-link">Martin</NuxtLink>
    </p>

    <NuxtLink to="/info" class="flex items-center gap-1" data-test="info-link"> Info & Disclamers <UIcon name="lucide:badge-info" /> </NuxtLink>
  </div>
</template>
