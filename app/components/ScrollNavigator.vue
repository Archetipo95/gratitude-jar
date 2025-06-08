<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}

// Show/hide based on scroll position
const isVisible = ref(false)

const checkScrollPosition = () => {
  isVisible.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', checkScrollPosition)
  checkScrollPosition()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollPosition)
})
</script>

<template>
  <div 
    v-if="isVisible"
    class="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
  >
    <!-- Scroll to Top -->
    <UButton
      @click="scrollToTop"
      color="neutral"
      variant="solid"
      size="lg"
      class="p-3 border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      :ui="{
        base: 'font-bold',
      }"
      aria-label="Scroll to top"
    >
      <UIcon name="lucide-lab:escalator-arrow-up-right" class="size-5" />
    </UButton>

    <!-- Scroll to Bottom -->
    <UButton
      @click="scrollToBottom"
      color="neutral"
      variant="solid"
      size="lg"
      class="p-3 border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      :ui="{
        base: 'font-bold',
      }"
      aria-label="Scroll to bottom"
    >
      <UIcon name="lucide-lab:escalator-arrow-down-left" class="size-5" />
    </UButton>
  </div>
</template> 
