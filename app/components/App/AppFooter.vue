<template>
  <footer class="flex justify-between items-center p-4 md:p-6 border-t-4 dark:border-gray-600 bg-white dark:bg-gray-800 flex-wrap gap-4">
    <p class="flex items-center gap-2 text-gray-800 dark:text-gray-200" data-test="footer-made-by">
      Made with <UIcon
        name="lucide:heart"
        class="text-red-600 dark:text-red-400"
        data-test="heart-icon"
        size="20"
      /> by
      <NuxtLink
        to="https://github.com/Archetipo95"
        class="font-bold hover:underline decoration-4 underline-offset-4"
        data-test="github-link"
      >
        Martin
      </NuxtLink>
    </p>

    <NuxtLink
      to="/info"
      class="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:underline decoration-4 underline-offset-4"
      data-test="info-link"
    >
      Info & Disclaimers <UIcon name="lucide:badge-info" size="20" />
    </NuxtLink>
  </footer>
</template>
