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

const updateCountdown = () => {
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

onMounted(() => {
  // Call updateCountdown immediately to set the initial state
  updateCountdown()

  // Update the countdown every second
  setInterval(updateCountdown, 1000)
})

const { totalWeeks, currentWeekNumber } = useWeek()
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between md:items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md gap-4">
    <div class="text-gray-800 dark:text-gray-200">
      <p class="text-lg font-semibold">Countdown to the end of the year</p>
      <p class="text-xl" data-test-id="countdown">{{ countdown.days }} days, {{ countdown.hours }} hours, {{ countdown.minutes }} minutes, {{ countdown.seconds }} seconds</p>
    </div>
    <div class="text-gray-800 dark:text-gray-200 flex md:flex-col md:items-end gap-1">
      <p class="text-xl" data-test-id="weeks">{{ currentWeekNumber }}/{{ totalWeeks }} weeks</p>
    </div>
  </div>
</template>
