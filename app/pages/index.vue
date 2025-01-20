<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="space-y-4">
    <CountDown v-if="user" />
    <DisclamerMessage v-else />

    <WeekGrid />
  </div>
</template>
