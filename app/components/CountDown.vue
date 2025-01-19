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

  countdown.value.days = Math.floor(diff / (1000 * 60 * 60 * 24))
  countdown.value.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  countdown.value.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  countdown.value.seconds = Math.floor((diff % (1000 * 60)) / 1000)
}

onMounted(() => {
  // Update the countdown every second
  setInterval(updateCountdown, 1000)
})

const { remainingWeeks } = useWeek()
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between md:items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md gap-4">
    <div class="text-gray-800 dark:text-gray-200">
      <p class="text-lg font-semibold">Countdown to the end of the year:</p>
      <p class="text-xl">{{ countdown.days }} days, {{ countdown.hours }} hours, {{ countdown.minutes }} minutes, {{ countdown.seconds }} seconds</p>
    </div>
    <div class="text-gray-800 dark:text-gray-200 flex md:flex-col md:items-end gap-1">
      <p class="text-lg font-semibold">Countdown in weeks:</p>
      <p class="text-xl">{{ remainingWeeks }} weeks</p>
    </div>
  </div>
</template>
