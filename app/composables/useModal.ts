export function useModal() {
  const isOpen = ref(false)
  const isSubmitting = ref(false)
  const formData = ref<Record<string, any>>({})

  const openModal = (initialData: Record<string, any> = {}) => {
    formData.value = { ...initialData }
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
    isSubmitting.value = false
    formData.value = {}
  }

  const setSubmitting = (value: boolean) => {
    isSubmitting.value = value
  }

  const updateFormData = (key: string, value: any) => {
    formData.value[key] = value
  }

  return {
    // State
    isOpen: readonly(isOpen),
    isSubmitting: readonly(isSubmitting),
    formData: readonly(formData),

    // Actions
    openModal,
    closeModal,
    setSubmitting,
    updateFormData,
  }
}
