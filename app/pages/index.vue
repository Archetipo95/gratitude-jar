<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="space-y-4">
    <CountDown />
    <DisclamerMessage v-if="!user" />

    <WeekGrid v-if="user" />
  </div>
</template>
