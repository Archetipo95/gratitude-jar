<script setup lang="ts">
import type { Database } from "~~/types/database.types"

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()
</script>

<template>
  <UButton
    v-if="!!user"
    color="error"
    variant="solid"
    size="lg"
    class="border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]"
    :ui="{
      base: 'uppercase tracking-wider font-bold px-4 py-2',
    }"
    @click="client.auth.signOut()"
  >
    <UIcon name="lucide:log-out" />
    Log Out
  </UButton>
  <div v-else class="flex gap-2 flex-wrap">
    <UButton
      color="neutral"
      variant="solid"
      size="lg"
      :ui="{
        base: 'uppercase tracking-wider font-bold px-4 py-2',
      }"
      class="border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      @click="client.auth.signInWithOAuth({ provider: 'github' })"
    >
      <UIcon name="lucide:github" />
      GitHub Login
    </UButton>
    <UButton
      color="neutral"
      variant="solid"
      size="lg"
      :ui="{
        base: 'uppercase tracking-wider font-bold px-4 py-2',
      }"
      class="border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      @click="client.auth.signInWithOAuth({ provider: 'google' })"
    >
      <UIcon name="simple-icons:google" />
      Google Login
    </UButton>
  </div>
</template>
