<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="space-y-4">
    <CountDown v-if="!user" />
    <DisclaimerMessage v-if="!user" />

    <WeekGrid v-if="user" />
  </div>
</template>
