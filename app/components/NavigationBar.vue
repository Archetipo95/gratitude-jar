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
  <div class="flex justify-between items-center p-4 border-b bg-white dark:bg-gray-800 shadow-sm flex-wrap">
    <div class="gap-y-1 flex items-center gap-x-4 flex-wrap">
      <NuxtLink to="/" class="flex gap-0.5 items-center">
        <GratitudeLogo class="size-16 md:size-28" />
        <h1 class="text-2xl md:text-5xl font-bold text-gray-800 dark:text-white shrink-0">Gratitude Jar</h1>
      </NuxtLink>
    </div>
    <div class="flex items-center space-x-4">
      <h2 class="text-lg text-gray-600 dark:text-gray-300">{{ greetingMessage }}</h2>
      <UButton
        v-if="!!user"
        @click="client.auth.signOut()"
        class="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors dark:bg-red-600 dark:hover:bg-red-700"
        icon="lucide:log-out"
      >
        Log Out
      </UButton>
      <div v-else class="flex space-x-2">
        <UButton
          @click="client.auth.signInWithOAuth({ provider: 'github' })"
          class="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors dark:bg-gray-700 dark:hover:bg-gray-800"
          icon="lucide:github"
        >
          Log In with GitHub
        </UButton>
        <UButton
          @click="client.auth.signInWithOAuth({ provider: 'google' })"
          class="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
          icon="simple-icons:google"
        >
          Log In with Google
        </UButton>
      </div>
      <ColorModeButton />
    </div>
  </div>
</template>
