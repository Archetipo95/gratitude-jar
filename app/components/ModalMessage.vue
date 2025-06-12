<script setup lang="ts">
import type { Database } from "~~/types/database.types"

import type { ModalMessageProps } from "./ModalMessage.props"

const {
  weekNumber,
  selectedYear,
} = defineProps<ModalMessageProps>()
const emit = defineEmits(["messageSubmitted", "failedSubmit", "close"])
const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

// Modal state management
const isSubmitting = ref(false)
const newMessage = ref<string>("")

const toast = useToast()

// Submit new message
async function submitMessage() {
  if (weekNumber && newMessage.value) {
    isSubmitting.value = true
    try {
      const { error } = await client.from("gratitude_messages").insert([
        {
          week: weekNumber,
          year: selectedYear,
          message: newMessage.value,
          user_id: user.value?.id,
        },
      ])

      if (error) {
        onFailedSubmit()
      }
      else {
        toast.add({ title: "Message submitted" })
        newMessage.value = ""
        emit("messageSubmitted")
        emit("close")
      }
    }
    catch (error) {
      console.error(error)
      onFailedSubmit()
    }
    finally {
      isSubmitting.value = false
    }
  }
}

function onFailedSubmit() {
  emit("failedSubmit")
  toast.add({
    title: "Failed to submit message",
    color: "error",
  })
}

function closeModal() {
  newMessage.value = ""
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
      <AppStructureButton
        icon="lucide:x"
        variant="outline"
        class="py-2 ml-auto"
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
      <AppStructureButton
        label="Cancel"
        variant="secondary"
        size="lg"
        class="px-6 py-2"
        @click="closeModal"
      />
      <AppStructureButton
        label="Submit"
        variant="primary"
        size="lg"
        :loading="isSubmitting"
        :disabled="isSubmitting || !newMessage"
        class="px-6 py-2"
        @click="submitMessage"
      />
    </template>
  </UModal>
</template>
