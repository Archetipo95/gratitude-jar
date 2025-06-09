<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  })
}

// Show/hide based on scroll position
const isOnTop = ref(false)
const isOnBottom = ref(false)

function checkScrollPosition() {
  isOnTop.value = window.scrollY === 0
  isOnBottom.value = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight
}

onMounted(() => {
  window.addEventListener("scroll", checkScrollPosition)
  checkScrollPosition()
})

onUnmounted(() => {
  window.removeEventListener("scroll", checkScrollPosition)
})
</script>

<template>
  <div
    data-test-id="scroll-navigator"
    class="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
  >
    <!-- Scroll to Top -->
    <UButton
      data-test-id="scroll-to-top-button"
      color="neutral"
      variant="solid"
      size="lg"
      class="p-3 border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      :ui="{
        base: 'font-bold',
      }"
      aria-label="Scroll to top"
      :disabled="isOnTop"
      @click="scrollToTop"
    >
      <UIcon name="lucide-lab:escalator-arrow-up-right" class="size-5" />
    </UButton>

    <!-- Scroll to Bottom -->
    <UButton
      data-test-id="scroll-to-bottom-button"
      color="neutral"
      variant="solid"
      size="lg"
      class="p-3 border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      :ui="{
        base: 'font-bold',
      }"
      aria-label="Scroll to bottom"
      :disabled="isOnBottom"
      @click="scrollToBottom"
    >
      <UIcon name="lucide-lab:escalator-arrow-down-left" class="size-5" />
    </UButton>
  </div>
</template>
