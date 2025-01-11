<template>
  <div>
    <h1>{{ greatingMessage }}</h1>
    <button v-if="!!user" @click="client.auth.signOut()">Log Out</button>
    <button v-else @click="client.auth.signInWithOAuth({ provider: 'github' })">Log In</button>

    <div v-if="!!user">
      <label for="year-select">Select Year:</label>
      <select id="year-select" v-model="selectedYear">
        <option v-for="year in availableYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>

      <div class="grid-container">
        <WeekTile v-for="week in weeks" :week :selected-year :current-year @open-modal="openModal($event)" />
      </div>
    </div>

    <!-- Modal for Adding a New Message -->
    <ModalMessage :is-modal-open :modal-week-number :is-submitting v-model="newMessage" @close-modal="closeModal" @submit-message="submitMessage" />
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

// Available years for selection
const currentYear = new Date().getFullYear()
const availableYears = ref([currentYear - 1, currentYear, currentYear + 1])

// Reactive variable for selected year
const selectedYear = ref(currentYear)

// Modal state management
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const modalWeekNumber = ref<number>()
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
    isSubmitting.value = true
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
    } finally {
      isSubmitting.value = false
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  padding: 10px;
}
</style>
