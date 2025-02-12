<script setup lang="ts">
const user = useSupabaseUser()

const title = computed(() => {
  return user.value ? 'Weekly Planner' : 'Welcome'
})

useHead({
  title: title.value,
  meta: [
    {
      name: 'description',
      content: 'Weekly planner to help you organize your week.',
    },
  ],
})
</script>

<template>
  <div class="space-y-4">
    <CountDown v-if="user" />
    <DisclaimerMessage v-if="!user" />

    <WeekGrid v-if="user" />
  </div>
</template>
