<script setup lang="ts">
type Week = {
  number: number
  start: Date
  end: Date
}

type WeekTileProps = {
  week: Week
  selectedYear: number
  currentYear: number
}

const { selectedYear } = defineProps<WeekTileProps>()

defineEmits<{
  openModal: [value: number]
}>()

// Calculate the current week number
const today = new Date()
const startOfYear = new Date(today.getFullYear(), 0, 1)

const currentWeekNumber = Math.ceil(((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7)

// Check if there's a message for the given week
function hasMessage(weekNumber: number) {
  return messages.value?.some((message) => message.week === weekNumber && message.year === selectedYear)
}

// Function to format dates
function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

// Check if message is visible for a given week
function isMessageVisible(weekNumber: number) {
  return messageVisibility.value[weekNumber] || false
}

// Reactive map to track visibility of messages
const messageVisibility = ref<Record<number, boolean>>({})

// Toggle message visibility for a given week
function toggleMessage(weekNumber: number) {
  messageVisibility.value[weekNumber] = !messageVisibility.value[weekNumber]
}

// Get the message for the given week
function getMessage(weekNumber: number) {
  const message = messages.value?.find((message) => message.week === weekNumber && message.year === selectedYear)
  return message ? message.message : ''
}

import type { Database } from '~~/types/database.types'

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

// Fetch messages from Supabase
const { data: messages } = await useAsyncData(
  'messages',
  async () => {
    if (!user.value) return
    return await client.from('gratitude_messages').select('id, message, week, year').eq('user_id', user.value.id).order('week', { ascending: true })
  },
  { transform: (result) => (result ? result.data : []), watch: [user] }
)
</script>

<template>
  <div :class="['week-square', { 'has-message': hasMessage(week.number) }]">
    <div>Week {{ week.number }}</div>
    <div>{{ formatDate(week.start) }} - {{ formatDate(week.end) }}</div>
    <button v-if="hasMessage(week.number)" @click="toggleMessage(week.number)">{{ isMessageVisible(week.number) ? 'Hide' : 'Show' }} Message</button>
    <div v-if="isMessageVisible(week.number) && hasMessage(week.number)">
      {{ getMessage(week.number) }}
    </div>
    <button v-if="!hasMessage(week.number) && (selectedYear < currentYear || (week.number <= currentWeekNumber && selectedYear === currentYear))" @click="$emit('openModal', week.number)">
      Add New Message
    </button>
  </div>
</template>

<style scoped>
.week-square {
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
}

.week-square.has-message {
  background-color: #d4f8d4; /* Light green color for boxes with messages */
}
</style>
