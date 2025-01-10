<template>
  <div>
    <h1>{{ greatingMessage }}</h1>
    <button v-if="!!user" @click="client.auth.signOut()">Log Out</button>
    <button v-else @click="client.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: '/redirect' } })">Log In</button>

    <div v-if="!!user">
      <label for="year-select">Select Year:</label>
      <select id="year-select" v-model="selectedYear">
        <option v-for="year in availableYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>

      <div class="grid-container">
        <div v-for="week in weeks" :key="+week.start" :class="['week-square', { 'has-message': hasMessage(week.number) }]">
          <div>Week {{ week.number }}</div>
          <div>{{ formatDate(week.start) }} - {{ formatDate(week.end) }}</div>
          <button v-if="hasMessage(week.number)" @click="toggleMessage(week.number)">{{ isMessageVisible(week.number) ? 'Hide' : 'Show' }} Message</button>
          <div v-if="isMessageVisible(week.number) && hasMessage(week.number)">
            {{ getMessage(week.number) }}
          </div>
          <button v-if="!hasMessage(week.number) && (selectedYear < currentYear || (week.number <= currentWeekNumber && selectedYear === currentYear))" @click="openModal(week.number)">
            Add New Message
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for Adding a New Message -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Add New Message for Week {{ modalWeekNumber }}</h2>
        <textarea v-model="newMessage" placeholder="Enter your message here"></textarea>
        <button @click="submitMessage">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~~/types/database.types'

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

// Greeting message
const greatingMessage = computed(() => {
  if (!user.value) return 'Hello World'
  return `Hello ${user.value.user_metadata.user_name}`
})

// Fetch messages from Supabase
const { data: messages } = await useAsyncData(
  'messages',
  async () => {
    if (!user.value) return
    return await client.from('gratitude_messages').select('id, message, week, year').eq('user_id', user.value.id).order('week', { ascending: true })
  },
  { transform: (result) => (result ? result.data : []), watch: [user] }
)

// Available years for selection
const currentYear = new Date().getFullYear()
const availableYears = ref([currentYear - 1, currentYear, currentYear + 1])

// Reactive variable for selected year
const selectedYear = ref(currentYear)

// Calculate the current week number
const today = new Date()
const startOfYear = new Date(today.getFullYear(), 0, 1)
const currentWeekNumber = Math.ceil(((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7)

// Reactive map to track visibility of messages
const messageVisibility = ref<Record<number, boolean>>({})

// Modal state management
const isModalOpen = ref(false)
const modalWeekNumber = ref<number | null>(null)
const newMessage = ref<string>('')

// Function to calculate weeks with start and end dates
function calculateWeeks(year: number) {
  const weeks = []
  let date = new Date(year, 0, 1) // Start from January 1st of the selected year

  // Calculate weeks
  let weekNumber = 1
  while (date.getFullYear() === year) {
    const start = new Date(date) // Start of the week

    // Move to the next Sunday (end of the week)
    date.setDate(date.getDate() + ((7 - date.getDay()) % 7))
    if (date.getFullYear() !== year) {
      date = new Date(year, 11, 31) // Ensure the last week ends on December 31st
    }
    const end = new Date(date)

    weeks.push({ number: weekNumber, start, end })

    // Move to the next Monday
    date.setDate(date.getDate() + 1)
    weekNumber++
  }

  return weeks
}

// Reactive calculation of weeks based on selected year
const weeks = computed(() => calculateWeeks(selectedYear.value))

// Function to format dates
function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

// Check if there's a message for the given week
function hasMessage(weekNumber: number) {
  return messages.value?.some((message) => message.week === weekNumber && message.year === selectedYear.value)
}

// Get the message for the given week
function getMessage(weekNumber: number) {
  const message = messages.value?.find((message) => message.week === weekNumber && message.year === selectedYear.value)
  return message ? message.message : ''
}

// Toggle message visibility for a given week
function toggleMessage(weekNumber: number) {
  messageVisibility.value[weekNumber] = !messageVisibility.value[weekNumber]
}

// Check if message is visible for a given week
function isMessageVisible(weekNumber: number) {
  return messageVisibility.value[weekNumber] || false
}

// Open modal to add a new message
function openModal(weekNumber: number) {
  modalWeekNumber.value = weekNumber
  isModalOpen.value = true
}

// Close modal
function closeModal() {
  isModalOpen.value = false
  newMessage.value = ''
}

// Submit new message
async function submitMessage() {
  if (modalWeekNumber.value && newMessage.value) {
    try {
      const { data, error } = await client.from('gratitude_messages').insert([
        {
          week: modalWeekNumber.value,
          year: selectedYear.value,
          message: newMessage.value,
          user_id: user.value?.id,
        },
      ])

      if (error) {
        console.error('Error inserting message:', error)
      } else {
        console.log('Message inserted successfully:', data)
        // Optionally, update the local messages state or refetch data
        closeModal()
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr); /* Adjust the number of columns as needed */
  gap: 10px;
  padding: 10px;
}

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

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
}
</style>
