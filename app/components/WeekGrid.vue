<script setup lang="ts">
const user = useSupabaseUser()

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
</template>
