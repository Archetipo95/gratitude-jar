<script setup lang="ts">
import type { Database } from '~~/types/database.types'

// Available years for selection
const currentYear = new Date().getFullYear()
// calculate availableYears from 2024 to currentYear
const availableYears = ref(Array.from({ length: currentYear - 2023 }, (_, i) => currentYear - i))

const selectedYear = ref(currentYear)

const { weeks, changeYear, currentWeekNumber } = useWeek()

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

const showAllWeeks = ref(false)

const filteredWeeks = computed(() => {
  if (getCurrentYear() !== selectedYear.value || showAllWeeks.value) {
    return weeks.value
  }
  return weeks.value.filter((week) => week.number <= currentWeekNumber.value)
})
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto">
    <div class="flex items-center justify-between flex-wrap gap-4 p-6 bg-white dark:bg-gray-800 border-4 dark:border-gray-600">
      <label class="flex items-center space-x-2">
        <USelect
          aria-label="Select year"
          v-model="selectedYear"
          class="px-4 py-2 text-lg font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 dark:border-gray-600 focus:outline-none focus:ring-0 hover:-translate-y-0.5 transition-transform uppercase"
          :items="availableYears"
        />
        <span class="text-xl font-bold text-gray-800 dark:text-gray-200 uppercase">Year Overview</span>
      </label>
      <UCheckbox
        v-if="getCurrentYear() === selectedYear"
        v-model="showAllWeeks"
        label="Show All Weeks"
        size="xl"
        class="text-lg font-bold"
        :ui="{
          base: 'ring-2 dark:ring-gray-600',
        }"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      <template v-if="status === 'pending'">
        <div v-for="week in filteredWeeks" :key="week.number" class="p-6 min-h-[200px] animate-pulse bg-white dark:bg-gray-800 border-4 dark:border-gray-600" />
      </template>
      <template v-else>
        <WeekTile
          v-for="week in filteredWeeks"
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
