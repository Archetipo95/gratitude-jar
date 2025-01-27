<script setup lang="ts">
import type { Database } from '~~/types/database.types'
import type { ModalMessageProps } from './ModalMessage.props'

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

const modal = useModal()

const { weekNumber, selectedYear } = defineProps<ModalMessageProps>()

const emit = defineEmits(['messageSubmitted', 'failedSubmit'])

// Modal state management
const isSubmitting = ref(false)
const newMessage = ref<string>('')

// Submit new message
async function submitMessage() {
  if (weekNumber && newMessage.value) {
    isSubmitting.value = true
    try {
      const { error } = await client.from('gratitude_messages').insert([
        {
          week: weekNumber,
          year: selectedYear,
          message: newMessage.value,
          user_id: user.value?.id,
        },
      ])

      if (error) {
        onFailedSubmit()
      } else {
        toast.add({ title: 'Message submitted' })
        newMessage.value = ''
        emit('messageSubmitted')
        modal.close()
      }
    } catch (err) {
      onFailedSubmit()
    } finally {
      isSubmitting.value = false
    }
  }
}

const onFailedSubmit = () => {
  emit('failedSubmit')
  toast.add({ title: 'Failed to submit message', color: 'error' })
}

const closeModal = () => {
  newMessage.value = ''
  modal.close()
}

const toast = useToast()
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
        <UButton color="neutral" label="Close" @click="closeModal" />
        <UButton label="Submit" :disabled="isSubmitting" @click="submitMessage" />
      </div>
    </template>
  </UModal>
</template>
