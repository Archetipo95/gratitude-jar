<script setup lang="ts">
type ModelMessageProps = {
  isModalOpen: boolean
  modalWeekNumber?: number
  isSubmitting: boolean
}

defineProps<ModelMessageProps>()

defineEmits(['closeModal', 'submitMessage'])

const newMessage = defineModel<string>({ required: true })
</script>

<template>
  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('closeModal')">&times;</span>
      <h2>Add New Message for Week {{ modalWeekNumber }}</h2>
      <textarea v-model="newMessage" placeholder="Enter your message here"></textarea>
      <small class="disclaimer">Your message is not editable and not viewable until the end of the year</small>
      <button :disabled="isSubmitting" @click="$emit('submitMessage')">Submit</button>
    </div>
  </div>
</template>

<style scoped>
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
  position: relative;
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

.disclaimer {
  font-size: 12px;
  color: red;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
