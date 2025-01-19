<script setup lang="ts">
import type { Database } from '~~/types/database.types'
import { LazyModalMessage } from '#components'
import type { WeekTileProps } from './WeekTile.props'

const { selectedYear, currentYear, isSubmitting, week } = defineProps<WeekTileProps>()

defineEmits<{
  openModal: [value: number]
}>()

function getCurrentWeekNumber() {
  const weeks = calculateWeeks(currentYear)
  const today = new Date()

  for (const week of weeks) {
    const weekStart = new Date(week.start)
    const weekEnd = new Date(week.end)

    // Add 24 hours to include the entire end day
    weekEnd.setHours(weekEnd.getHours() + 24)

    if (today >= weekStart && today <= weekEnd) {
      return week.number
    }
  }

  // If today's date is not found within the weeks, return 0 or handle as needed
  return 0
}

// Check if there's a message for the given week
function hasMessage(weekNumber: number) {
  return messages.value?.some((message) => message.week === weekNumber && message.year === selectedYear)
}

// Check if message is visible for a given week
function isMessageVisible(weekNumber: number) {
  return messageVisibility.value[weekNumber] || false
}

// Reactive map to track visibility of messages
const messageVisibility = ref<Record<number, boolean>>({})

// Toggle message visibility for a given week
// function toggleMessage(weekNumber: number) {
//   messageVisibility.value[weekNumber] = !messageVisibility.value[weekNumber]
// }

// Get the message for the given week
function getMessage(weekNumber: number) {
  const message = messages.value?.find((message) => message.week === weekNumber && message.year === selectedYear)
  return message ? message.message : ''
}

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

// Fetch messages from Supabase
const { data: messages } = await useAsyncData(
  'messages',
  async () => {
    if (isSubmitting) return
    if (!user.value) return
    return await client.from('gratitude_messages').select('id, message, week, year').eq('user_id', user.value.id).order('week', { ascending: true })
  },
  { transform: (result) => (result ? result.data : []), watch: [user, () => isSubmitting] }
)

const modal = useModal()

function openModal() {
  modal.open(LazyModalMessage, {
    weekNumber: week.number,
    selectedYear,
    isSubmitting,
    // successSubmit() {
    //   // TODO: add toast message
    // },
    // failedSubmit() {
    //   // TODO: add toast message
    // },
  })
}
</script>

<template>
  <div
    :class="[
      'week-square p-2 border rounded-md text-sm mb-2 text-black',
      {
        '!bg-green-200': hasMessage(week.number),
        'bg-yellow-100': week.number === getCurrentWeekNumber() && selectedYear === currentYear,
        'bg-red-200': !hasMessage(week.number) && (selectedYear < currentYear || (week.number <= getCurrentWeekNumber() && selectedYear === currentYear)),
        'bg-gray-400': selectedYear > currentYear || (week.number > getCurrentWeekNumber() && selectedYear === currentYear),
      },
    ]"
  >
    <div>Week {{ week.number }}</div>
    <div class="date-range">
      <p>From {{ formatDate(week.start) }}</p>
      <p>to {{ formatDate(week.end) }}</p>
    </div>
    <!-- <button v-if="hasMessage(week.number)" @click="toggleMessage(week.number)">{{ isMessageVisible(week.number) ? 'Hide' : 'Show' }} Message</button> -->
    <div v-if="hasMessage(week.number)">DONE!</div>
    <div v-if="isMessageVisible(week.number) && hasMessage(week.number)">
      {{ getMessage(week.number) }}
    </div>

    <UButton
      v-if="!hasMessage(week.number) && (selectedYear < currentYear || (week.number <= getCurrentWeekNumber() && selectedYear === currentYear))"
      :label="isSubmitting ? 'Submitting...' : 'Add New Message'"
      color="neutral"
      variant="subtle"
      @click="openModal"
      :disabled="isSubmitting"
    />

    <div v-if="isSubmitting || !messages" class="mt-2 text-sm">Loading...</div>
  </div>
</template>
