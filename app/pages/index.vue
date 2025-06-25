<script setup lang="ts">
const { isAuthenticated } = useAuth()

const title = computed(() => {
  return isAuthenticated.value ? "Weekly Planner" : "Welcome"
})

useHead({
  title: title.value,
  meta: [
    {
      name: "description",
      content: "Weekly planner to help you organize your week.",
    },
  ],
})
</script>

<template>
  <div class="space-y-4">
    <CountDown v-if="isAuthenticated" />
    <DisclaimerMessage v-if="!isAuthenticated" />

    <WeekGrid v-if="isAuthenticated" />
  </div>
</template>
