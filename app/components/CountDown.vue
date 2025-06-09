<script setup lang="ts">
// This component is a countdown timer for the end of the year.
// It will display the number of days, hours, minutes, and seconds until the end of the year.
// It also displays the number of weeks remaining in the year.

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1)

function updateCountdown() {
  const now = new Date()
  const diff = endOfYear.getTime() - now.getTime()

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  countdown.value.days = days
  countdown.value.hours = hours
  countdown.value.minutes = minutes
  countdown.value.seconds = seconds
}

let intervalId: NodeJS.Timeout

onMounted(() => {
  // Call updateCountdown immediately to set the initial state
  updateCountdown()

  // Update the countdown every second
  intervalId = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  // Clear the interval when the component is unmounted
  clearInterval(intervalId)
})

const { totalWeeks, currentWeekNumber } = useWeek()
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between md:items-center p-6 bg-white dark:bg-gray-800 border-4 dark:border-gray-600 gap-y-6 gap-x-16" data-test-id="countdown-timer">
    <div class="text-gray-800 dark:text-gray-200">
      <h2 class="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100 uppercase">
        Time Until New Year
      </h2>
      <p class="text-xl md:text-2xl font-bold tracking-wide flex flex-wrap gap-2" data-test-id="countdown">
        <span class="whitespace-nowrap">
          <span class="tabular-nums" data-test-id="countdown-days">{{ countdown.days }}</span> days,
        </span>
        <span class="whitespace-nowrap">
          <span class="tabular-nums" data-test-id="countdown-hours">{{ countdown.hours }}</span> hours,
        </span>
        <span class="whitespace-nowrap">
          <span class="tabular-nums" data-test-id="countdown-minutes">{{ countdown.minutes }}</span> minutes and
        </span>
        <span class="whitespace-nowrap">
          <span class="tabular-nums" data-test-id="countdown-seconds">{{ countdown.seconds }}</span> seconds
        </span>
      </p>
    </div>
    <div class="text-gray-800 dark:text-gray-200 flex md:flex-col md:items-end gap-1">
      <div class="text-lg md:text-xl font-bold uppercase" data-test-id="weeks">
        <div class="w-fit md:ml-auto">
          <span class="text-yellow-700 dark:text-yellow-400" data-test-id="current-week">Week {{ currentWeekNumber }}</span>
          <span class="text-gray-700 dark:text-gray-300" data-test-id="total-weeks"> of {{ totalWeeks }}</span>
        </div>
        <div class="text-base text-gray-600 dark:text-gray-400 whitespace-nowrap" data-test-id="weeks-remaining">
          ({{ totalWeeks - currentWeekNumber }} weeks remaining)
        </div>
      </div>
    </div>
  </div>
</template>
