<script setup lang="ts">
import type { Database } from '~~/types/database.types'
import { calculateWeeks } from '~/utils/TimeUtils'

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

// Greeting message
const greatingMessage = computed(() => {
  if (!user.value) return 'Hello Guest'
  return `Hello ${user.value.user_metadata.user_name}`
})

// Available years for selection
const currentYear = new Date().getFullYear()
// calculate availableYears from 2024 to currentYear
const availableYears = ref(Array.from({ length: currentYear - 2023 }, (_, i) => currentYear - i))

const selectedYear = ref(currentYear)

const { weeks, changeYear } = useWeek()

watch(selectedYear, () => {
  changeYear(selectedYear.value)
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center p-4 border-b bg-white dark:bg-gray-800 shadow-sm">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Gratitude Jar</h1>
      <h2 class="text-lg text-gray-600 dark:text-gray-300">{{ greatingMessage }}</h2>
      <div class="flex items-center space-x-4">
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

    <div>
      <CountDown />
    </div>

    <div v-if="!!user" class="space-y-4">
      <div class="year-select-container flex items-center space-x-2">
        <label for="year-select" class="text-lg font-medium text-gray-700 dark:text-gray-300">Select Year:</label>
        <select
          id="year-select"
          v-model="selectedYear"
          class="p-2 border rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        <WeekTile v-for="week in weeks" :key="week.number" :week="week" :selected-year="selectedYear" :current-year="currentYear" />
      </div>
    </div>

    <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-md shadow-md">
      <p class="explanation text-lg text-gray-700 dark:text-gray-300 mb-4">
        Welcome to the Gratitude Jar! This app allows you to reflect on your week and note down things you're grateful for. Each week, add a message to capture your thoughts, and at the end of the
        year, review all the positive moments you've recorded.
      </p>

      <p class="text-gray-700 dark:text-gray-300">
        <strong class="font-semibold text-gray-800 dark:text-gray-100">Instructions:</strong> Select a year from the dropdown above, and click on the "Add New Message" button for each week to add a
        message. Your messages are private and will only be visible to you at the end of the year.

        <br />
        <em class="block mt-2 text-sm text-gray-600 dark:text-gray-400"
          >Disclaimer: This app is for demonstration purposes only. Currently, the messages are stored in plain text and are NOT encrypted. Please do NOT store sensitive information.</em
        >
      </p>
    </div>
  </div>
</template>
