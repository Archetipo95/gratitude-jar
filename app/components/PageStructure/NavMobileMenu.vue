<template>
  <div class="md:hidden">
    <!-- CSS-only hamburger menu using checkbox hack -->
    <input
      id="mobile-menu-toggle"
      type="checkbox"
      class="sr-only peer"
    >

    <!-- Hamburger Button -->
    <label
      for="mobile-menu-toggle"
      class="flex items-center justify-center p-2 cursor-pointer hover:-translate-y-0.5 transition-transform border-2 border-transparent focus-within:border-current"
      aria-label="Toggle mobile menu"
    >
      <UIcon name="lucide-lab:burger" class="size-6" />
    </label>

    <!-- Mobile Menu Content -->
    <div class="hidden peer-checked:block absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-t-2 dark:border-gray-600 z-50">
      <div class="p-4 space-y-4">
        <div class="text-center">
          <NavGreeting />
        </div>
        <div class="flex flex-col gap-2">
          <NavAuthButtons />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus styles for the hidden checkbox */
#mobile-menu-toggle:focus + label {
  border-color: currentColor;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.3);
}

@media (prefers-color-scheme: dark) {
  #mobile-menu-toggle:focus + label {
    box-shadow: 2px 2px 0px 0px rgba(255, 255, 255, 0.3);
  }
}
</style>
