<script setup lang="ts">
import type { Database } from '~~/types/database.types'

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

const modal = useModal()

type ModelMessageProps = {
  weekNumber: number
  isSubmitting: boolean
  selectedYear: number
}

const { weekNumber, selectedYear } = defineProps<ModelMessageProps>()

defineEmits(['closeModal', 'submitMessage'])

// Modal state management
const isSubmitting = ref(false)
const newMessage = ref<string>('')

// Submit new message
async function submitMessage() {
  if (weekNumber && newMessage.value) {
    isSubmitting.value = true
    try {
      const { data, error } = await client.from('gratitude_messages').insert([
        {
          week: weekNumber,
          year: selectedYear,
          message: newMessage.value,
          user_id: user.value?.id,
        },
      ])

      if (error) {
        console.error('Error inserting message:', error)
      } else {
        console.log('Message inserted successfully:', data)
        // Optionally, update the local messages state or refetch data
        modal.close()
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    } finally {
      newMessage.value = ''
      isSubmitting.value = false
    }
  }
}
</script>

<template>
  <UModal :title="`Add New Message for Week ${weekNumber}`">
    <template #body>
      <UTextarea class="w-full" v-model="newMessage" placeholder="Enter your message here" />
      <br />
      <small class="disclaimer">Your message is not editable and not viewable until the end of the year</small>
    </template>
    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" label="Close" @click="modal.close()" />
        <UButton label="Submit" :disabled="isSubmitting" @click="submitMessage" />
      </div>
    </template>
  </UModal>
</template>
