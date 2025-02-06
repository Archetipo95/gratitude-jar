<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="space-y-4">
    <CountDown />
    <DisclaimerMessage v-if="!user" />

    <WeekGrid v-if="user" />
  </div>
</template>
