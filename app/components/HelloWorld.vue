<template>
  <div>
    <div class="navbar">
      <h1>{{ greatingMessage }}</h1>
      <button v-if="!!user" @click="client.auth.signOut()">Log Out</button>
      <div v-else>
        <button @click="client.auth.signInWithOAuth({ provider: 'github' })">Log In with GitHub</button>
        <button @click="client.auth.signInWithOAuth({ provider: 'google' })">Log In with Google</button>
      </div>
    </div>

    <div v-if="!!user">
      <div class="year-select-container">
        <label for="year-select">Select Year:</label>
        <select id="year-select" v-model="selectedYear">
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

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
import { calculateWeeks } from '~/utils/TimeUtils'

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

// Greeting message
const greatingMessage = computed(() => {
  if (!user.value) return 'Hello World'
  return `Hello ${user.value.user_metadata.user_name}`
})

// Available years for selection
const currentYear = new Date().getFullYear()
// calculate availableYears from 2024 to currentYear
const availableYears = ref(Array.from({ length: currentYear - 2023 }, (_, i) => currentYear - i))

// Reactive variable for selected year
const selectedYear = ref(currentYear)

// Modal state management
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const modalWeekNumber = ref<number>()
const newMessage = ref<string>('')

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
/* Base styles for the navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
}

/* Base styles for all screen sizes */
.grid-container {
  display: grid;
  gap: 10px;
  padding: 10px;
}

/* Styles for larger screens (desktops) */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(8, 1fr);
  }
}

/* Styles for medium screens (tablets) */
@media (min-width: 768px) and (max-width: 1023px) {
  .grid-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* Styles for small screens (mobile) */
@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* General styles for buttons and other elements */
button {
  padding: 8px 16px;
  font-size: 16px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.year-select-container {
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  margin-top: 10px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

select {
  padding: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
