<script lang="ts" setup>
useHead({
  title: 'Gratitude Jar',
  meta: [
    {
      name: 'description',
      content: 'A simple gratitude journal app built with Nuxt.js and Supabase',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
