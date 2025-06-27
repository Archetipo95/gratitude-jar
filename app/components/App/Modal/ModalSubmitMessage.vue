<script setup lang="ts">
import type { ModalSubmitMessageProps } from "./ModalSubmitMessage.props"

const {
  weekNumber,
  selectedYear,
} = defineProps<ModalSubmitMessageProps>()
const emit = defineEmits(["messageSubmitted", "failedSubmit", "close"])

// Use composables for business logic
const { isAuthenticated } = useAuth()
const { submitMessage: submitGratitudeMessage } = useGratitudeMessages()

// Modal state management with composable
const {
  isSubmitting,
  formData,
  setSubmitting,
  updateFormData,
  closeModal: closeModalState,
} = useModal()

// Initialize form data
const newMessage = computed({
  get: () => formData.value.message || "",
  set: value => updateFormData("message", value),
})

// Submit new message
async function submitMessage() {
  if (!isAuthenticated.value) {
    onFailedSubmit()
    return
  }

  if (weekNumber && newMessage.value.trim()) {
    setSubmitting(true)
    try {
      await submitGratitudeMessage(weekNumber, selectedYear, newMessage.value)
      closeModalState()
      emit("messageSubmitted")
      emit("close")
    }
    catch (error) {
      console.error(error)
      onFailedSubmit()
    }
    finally {
      setSubmitting(false)
    }
  }
}

function onFailedSubmit() {
  emit("failedSubmit")
}

function closeModal() {
  closeModalState()
  emit("close")
}
</script>

<template>
  <UModal
    class="border-4 dark:border-gray-600 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
    :ui="{
      overlay: 'bg-gray-950/50 dark:bg-gray-950/75',
      content: 'overflow-visible',
      header: 'p-6 border-b-4 dark:border-gray-600',
      body: 'p-6',
      footer: 'p-6 border-t-4 dark:border-gray-600 flex justify-end gap-4',
      title: 'text-xl font-black uppercase text-gray-900 dark:text-gray-100',
      close: 'hover:-translate-y-0.5 transition-transform',
    }"
    :title="`Add Message - Week ${weekNumber}`"
    :close="{ onClick: () => emit('close', false) }"
  >
    <template #close>
      <AppButton
        icon="lucide:x"
        variant="outline"
        class="py-2 ml-auto"
        aria-label="Close modal"
        @click="closeModal"
      />
    </template>
    <template #body>
      <UTextarea
        v-model="newMessage"
        class="w-full rounded-none border-4 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-0 focus:border-current transition-transform hover:-translate-y-0.5"
        placeholder="What are you grateful for this week?"
        :rows="6"
      />
      <p class="mt-4 text-sm text-gray-600 dark:text-gray-400 border-l-4 border-current pl-4">
        Your message will be sealed until the end of the year
      </p>
    </template>

    <template #footer>
      <AppButton
        label="Cancel"
        variant="secondary"
        size="lg"
        class="px-6 py-2"
        aria-label="Cancel and close modal"
        @click="closeModal"
      />
      <AppButton
        label="Submit"
        variant="primary"
        size="lg"
        :loading="isSubmitting"
        :disabled="isSubmitting || !newMessage"
        class="px-6 py-2"
        aria-label="Submit gratitude message"
        @click="submitMessage"
      />
    </template>
  </UModal>
</template>
