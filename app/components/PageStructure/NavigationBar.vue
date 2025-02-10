<script setup lang="ts">
import type { Database } from '~~/types/database.types'

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

// Greeting message
const greetingMessage = computed(() => {
  if (!user.value) return 'Hello Guest'
  return `Hello ${user.value.user_metadata.user_name}`
})
</script>

<template>
  <div class="flex justify-between items-center p-4 md:p-6 border-b-4 dark:border-gray-600 bg-white dark:bg-gray-800 flex-wrap gap-4">
    <div class="gap-y-1 flex items-center gap-x-4 flex-wrap">
      <NuxtLink to="/" class="flex gap-0.5 items-center hover:-translate-y-0.5 transition-transform">
        <GratitudeLogo class="size-16 md:size-24" />
        <h1 class="text-2xl md:text-4xl font-black text-gray-900 dark:text-gray-100 uppercase">Gratitude Jar</h1>
      </NuxtLink>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <h2 class="text-lg text-gray-800 dark:text-gray-200 uppercase">{{ greetingMessage }}</h2>
      <UButton
        v-if="!!user"
        @click="client.auth.signOut()"
        color="error"
        variant="solid"
        size="lg"
        class="border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]"
        :ui="{
          base: 'uppercase tracking-wider font-bold px-4 py-2',
        }"
      >
        <UIcon name="lucide:log-out" />
        Log Out
      </UButton>
      <div v-else class="flex gap-2 flex-wrap">
        <UButton
          @click="client.auth.signInWithOAuth({ provider: 'github' })"
          color="neutral"
          variant="solid"
          size="lg"
          :ui="{
            base: 'uppercase tracking-wider font-bold px-4 py-2',
          }"
          class="border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <UIcon name="lucide:github" />
          GitHub Login
        </UButton>
        <UButton
          @click="client.auth.signInWithOAuth({ provider: 'google' })"
          color="neutral"
          variant="solid"
          size="lg"
          :ui="{
            base: 'uppercase tracking-wider font-bold px-4 py-2',
          }"
          class="border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <UIcon name="simple-icons:google" />
          Google Login
        </UButton>
      </div>
      <ColorModeButton />
    </div>
  </div>
</template>
