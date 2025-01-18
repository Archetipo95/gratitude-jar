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

// Reactive variable for selected year
const selectedYear = ref(currentYear)

// Reactive calculation of weeks based on selected year
const weeks = computed(() => calculateWeeks(selectedYear.value))
</script>

<template>
  <div>
    <div class="flex justify-between items-center p-2 border">
      <h1>Gratitude Jar</h1>
      <h2>{{ greatingMessage }}</h2>
      <UButton v-if="!!user" @click="client.auth.signOut()">Log Out</UButton>
      <div v-else>
        <UButton @click="client.auth.signInWithOAuth({ provider: 'github' })">Log In with GitHub</UButton>
        <UButton @click="client.auth.signInWithOAuth({ provider: 'google' })">Log In with Google</UButton>
      </div>
      <ColorModeButton />
    </div>

    <div>
      <p class="explanation">
        Welcome to the Gratitude Jar! This app allows you to reflect on your week and note down things you're grateful for. Each week, add a message to capture your thoughts, and at the end of the
        year, review all the positive moments you've recorded.
      </p>

      <p>
        <strong>Instructions:</strong> Select a year from the dropdown above, and click on the "Add New Message" button for each week to add a message. Your messages are private and will only be
        visible to you at the end of the year.

        <br />
        <em>Disclaimer: This app is for demonstration purposes only. Currently, the messages are stored in plain text and are NOT encrypted. Please do NOT store sensitive information.</em>
      </p>
    </div>

    <div v-if="!!user">
      <div class="year-select-container">
        <label for="year-select">Select Year:</label>
        <select id="year-select" v-model="selectedYear">
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
        <WeekTile v-for="week in weeks" :week :selected-year :current-year />
      </div>
    </div>
  </div>
</template>
