<script setup lang="ts">
const {
  isAuthenticated,
  user,
} = useAuth()

// Greeting message
const greetingMessage = computed(() => {
  if (!isAuthenticated.value)
    return "Hello Guest"
  return `Hello ${user.value?.user_metadata.user_name}`
})
</script>

<template>
  <h2 class="text-lg text-gray-800 dark:text-gray-200 uppercase wrap-normal">
    {{ greetingMessage }}
  </h2>
</template>
