<template>
  <div class="relative bg-white dark:bg-gray-800 border-b-4 dark:border-gray-600">
    <div class="flex justify-between items-center p-4 md:p-6">
      <!-- Logo Section -->
      <NavLogo />

      <!-- Desktop Navigation & Mobile Menu Toggle -->
      <div class="flex items-center gap-4">
        <!-- Desktop Only Navigation -->
        <div class="hidden md:flex items-center gap-4">
          <NavGreeting />
          <NavAuthButtons />
        </div>

        <!-- Color Mode Button (Always Visible) -->
        <ColorModeButton />

        <!-- Mobile Menu (CSS-only) -->
        <NavMobileMenu />
      </div>
    </div>
  </div>
</template>
