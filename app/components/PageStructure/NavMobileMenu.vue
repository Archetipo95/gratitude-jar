<script setup lang="ts">
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="md:hidden" data-test-id="nav-mobile-menu">
    <!-- Hamburger Button -->
    <AppStructureButton
      icon="lucide-lab:burger"
      variant="outline"
      size="md"
      class="p-2"
      aria-label="Toggle mobile menu"
      data-test-id="hamburger-button"
      @click="toggleMenu"
    />

    <!-- Mobile Menu Content -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-4"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-4"
    >
      <div
        v-if="isMenuOpen"
        class="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-2 border-current shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] z-50"
        data-test-id="mobile-menu-content"
      >
        <div class="p-6 space-y-4 border-t-2 border-current" data-test-id="mobile-menu-inner">
          <div class="flex gap-2 justify-between items-center">
            <NavGreeting />
            <ColorModeButton />
          </div>
          <div class="flex flex-col gap-2" data-test-id="mobile-auth-container">
            <NavAuthButtons />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
