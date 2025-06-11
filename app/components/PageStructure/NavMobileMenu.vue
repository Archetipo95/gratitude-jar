<script setup lang="ts">
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="md:hidden" data-test-id="nav-mobile-menu">
    <!-- Hamburger Button -->
    <UButton
      icon="lucide-lab:burger"
      color="neutral"
      variant="outline"
      size="md"
      class="p-2 border-2 border-current hover:-translate-y-0.5 transition-transform rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-transparent"
      :ui="{
        base: 'font-bold',
      }"
      aria-label="Toggle mobile menu"
      data-test-id="hamburger-button"
      @click="toggleMenu"
    />

    <!-- Mobile Menu Content -->
    <div
      :class="{ hidden: !isMenuOpen, block: isMenuOpen }"
      class="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-t-2 dark:border-gray-600 z-50"
      data-test-id="mobile-menu-content"
    >
      <div class="p-4 space-y-4" data-test-id="mobile-menu-inner">
        <div class="text-center" data-test-id="mobile-greeting-container">
          <NavGreeting />
        </div>
        <div class="flex flex-col gap-2" data-test-id="mobile-auth-container">
          <NavAuthButtons />
        </div>
      </div>
    </div>
  </div>
</template>
