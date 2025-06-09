<script setup lang="ts">
import { LazyModalMessage } from "#components"

import type { WeekTileProps } from "./WeekTile.props"

const props = defineProps<WeekTileProps>()

const emit = defineEmits<{
  refresh: []
  openModal: [value: number]
}>()

// Check if there's a message for the given week
function hasMessage(weekNumber: number) {
  return props.messages?.some(message => message.week === weekNumber && message.year === props.selectedYear)
}

// Reactive map to track visibility of messages
const messageVisibility = ref<Record<number, boolean>>({})

// Check if message is visible for a given week
function isMessageVisible(weekNumber: number) {
  return messageVisibility.value[weekNumber] || false
}

// Toggle message visibility for a given week
// function toggleMessage(weekNumber: number) {
//   messageVisibility.value[weekNumber] = !messageVisibility.value[weekNumber]
// }

// Get the message for the given week
function getMessage(weekNumber: number) {
  const message = props.messages?.find(message => message.week === weekNumber && message.year === props.selectedYear)
  return message ? message.message : ""
}

const overlay = useOverlay()

const modal = overlay.create(LazyModalMessage, {
  props: {
    weekNumber: props.week.number,
    selectedYear: props.selectedYear,
    isSubmitting: props.isSubmitting,
    onMessageSubmitted() {
      emit("refresh")
    },
  },
})

function openModal() {
  modal.open()
}

const { currentWeekNumber } = useWeek()

const weekTileConditions = computed(() => {
  return {
    hasMessage: hasMessage(props.week.number),
    isCurrentWeek: props.week.isCurrentWeek && props.selectedYear === props.currentYear,
    isPastWeek: !hasMessage(props.week.number) && (props.selectedYear < props.currentYear || (props.week.number <= currentWeekNumber.value && props.selectedYear === props.currentYear)),
    isFutureWeek: props.selectedYear > props.currentYear || (props.week.number > currentWeekNumber.value && props.selectedYear === props.currentYear),
  }
})

const weekTileClasses = computed(() => {
  return [
    "p-4 md:p-6 border-4 rounded-none text-base mb-6 transition-transform duration-200 hover:-translate-y-1 min-h-48 md:min-h-52 flex flex-col gap-4 justify-between relative",
    "dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]",
    {
      "border-green-600 bg-green-100 dark:bg-green-950 dark:border-green-400": weekTileConditions.value.hasMessage,
      "border-yellow-600 bg-yellow-100 dark:bg-yellow-950 dark:border-yellow-400": weekTileConditions.value.isCurrentWeek && !weekTileConditions.value.hasMessage,
      "border-red-600 bg-red-100 dark:bg-red-950 dark:border-red-400": weekTileConditions.value.isPastWeek,
      "border-gray-600 bg-gray-100 dark:bg-gray-900 dark:border-gray-500": weekTileConditions.value.isFutureWeek,
      "opacity-75 dark:opacity-50": weekTileConditions.value.isFutureWeek,
    },
  ]
})
</script>

<template>
  <div :class="weekTileClasses">
    <div>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div class="text-xl md:text-2xl font-black text-gray-900 dark:text-gray-100">
          WEEK {{ week.number }}
        </div>
      </div>

      <div class="mt-2 text-gray-700 dark:text-gray-300 text-xs md:text-base">
        <p>{{ week.weekStart.getDate() }} {{ getMonthName(week.weekStart) }} - {{ week.weekEnd.getDate() }} {{ getMonthName(week.weekEnd) }}</p>
      </div>

      <div v-if="isMessageVisible(week.number) && hasMessage(week.number)" class="mt-4 text-gray-800 dark:text-gray-200 p-3 bg-white dark:bg-gray-800 border-2 border-current">
        {{ getMessage(week.number) }}
      </div>
    </div>

    <UButton
      v-if="
        (week.number === currentWeekNumber && selectedYear === currentYear)
          || (!hasMessage(week.number) && (selectedYear < currentYear || (week.number <= currentWeekNumber && selectedYear === currentYear)))
      "
      :label="isSubmitting ? 'SUBMITTING...' : 'ADD NEW MESSAGE'"
      :ui="{
        base: ' uppercase tracking-wider',
      }"
      color="neutral"
      variant="solid"
      :disabled="isSubmitting"
      class="uppercase tracking-wider font-bold rounded-none px-2 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] border-2 border-current hover:-translate-y-0.5 transition-transform"
      @click="openModal"
    />

    <div class="font-bold mt-4 text-base md:text-lg uppercase">
      <p v-if="hasMessage(week.number)" class="text-green-700 dark:text-green-400 flex items-center gap-2">
        <span class="i-heroicons-check-circle-20-solid" /> Done!
      </p>
      <p v-else-if="week.isCurrentWeek && selectedYear === currentYear" class="text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
        <span class="i-heroicons-clock-20-solid" /> Current
      </p>
      <p
        v-else-if="!hasMessage(week.number) && (selectedYear < currentYear || (week.number <= currentWeekNumber && selectedYear === currentYear))"
        class="text-red-700 dark:text-red-400 flex items-center gap-2"
      >
        <span class="i-heroicons-exclamation-circle-20-solid" /> Missing
      </p>
    </div>
  </div>
</template>
