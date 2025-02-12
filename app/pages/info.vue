<script setup>
useHead({
  title: 'Info & Disclaimers',
  meta: [
    {
      name: 'description',
      content: 'Information about the app and its future development.',
    },
  ],
})
</script>

<template>
  <div class="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
    <DisclaimerMessage />

    <div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">TODO</h2>
      <pre class="bg-white dark:bg-gray-800 p-4 rounded-md shadow-inner text-gray-700 dark:text-gray-300">
- Implement encrypted messages:
  - End-to-End (E2E) encryption using a user password.
  - Option for encryption with a master password.

- Develop a reminders feature:
  - Send a weekly summary email at the end of each week.

- Create a "Cheer Me Up" feature:
  - Add motivational or uplifting content. ✨

- Enable groups/shared lists for expressions of gratitude.

- Write and execute comprehensive tests for all features.

- Explore and integrate Storybook:
  - Utilize the Storybook test suite for component testing.

- Implement internationalization (i18n) for multilingual support.

- Delete account.
      </pre>
    </div>

    <div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Stack</h2>
      <pre class="bg-white dark:bg-gray-800 p-4 rounded-md shadow-inner text-gray-700 dark:text-gray-300">
- Nuxt
- Nuxt UI 3 (Tailwind CSS 4, Nuxt Fonts, Nuxt Icons)
- Nuxt Supabase
      </pre>
    </div>
  </div>
</template>
