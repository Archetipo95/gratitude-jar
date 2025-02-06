<script setup lang="ts">
import type { Database } from '~~/types/database.types'

// Available years for selection
const currentYear = new Date().getFullYear()
// calculate availableYears from 2024 to currentYear
const availableYears = ref(Array.from({ length: currentYear - 2023 }, (_, i) => currentYear - i))

const selectedYear = ref(currentYear)

const { weeks, changeYear } = useWeek()

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

const {
  data: messages,
  refresh,
  status,
} = await useAsyncData(
  'messages',
  async () => {
    if (!user.value) return
    return await client.from('gratitude_messages').select('id, message, week, year').eq('user_id', user.value.id).order('week', { ascending: true })
  },
  { transform: (result) => (result ? result.data : []), watch: [user] }
)

const isSubmitting = ref(false)

watch(selectedYear, () => {
  changeYear(selectedYear.value)
})
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto">
    <div class="flex items-center justify-between flex-wrap gap-4 p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <label for="year-select" class="text-lg font-medium text-gray-700 dark:text-gray-300">Year Overview</label>
      <div class="flex items-center gap-3">
        <select
          id="year-select"
          v-model="selectedYear"
          class="px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 hover:border-gray-400 dark:hover:border-gray-500"
        >
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      <template v-if="status === 'pending'">
        <div
          v-for="week in weeks"
          :key="week.number"
          class="p-4 rounded-lg text-base shadow-sm min-h-[200px] animate-pulse bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-700"
        />
      </template>
      <template v-else>
        <WeekTile
          v-for="week in weeks"
          :key="week.number"
          :week="week"
          :selected-year="selectedYear"
          :current-year="currentYear"
          :messages="messages"
          :is-submitting="isSubmitting"
          @refresh="refresh"
        />
      </template>
    </div>
  </div>
</template>
