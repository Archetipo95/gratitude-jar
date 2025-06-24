<template>
  <div class="relative bg-white dark:bg-gray-800 border-b-4 dark:border-gray-600" data-test-id="navigation-bar">
    <div class="flex justify-between gap-4 items-center p-4 md:p-6" data-test-id="nav-container">
      <!-- Logo Section -->
      <div data-test-id="nav-logo-section" class="flex items-center gap-x-4">
        <NuxtLink to="/" class="flex gap-0.5 items-center hover:-translate-y-0.5 transition-transform">
          <AppLogo class="size-16 md:size-24" />
          <h1 class="text-2xl md:text-4xl font-black text-gray-900 dark:text-gray-100 text-nowrap">
            Gratitude Jar
          </h1>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation & Mobile Menu Toggle -->
      <div class="flex items-center gap-4" data-test-id="nav-right-section">
        <!-- Desktop Only Navigation -->
        <div class="hidden md:flex items-center gap-4" data-test-id="nav-desktop-section">
          <AppNavbarGreeting />
          <div class="hidden md:block">
            <AppThemeButton />
          </div>
          <AppNavbarAuthButtons />
        </div>

        <!-- Mobile Menu (CSS-only) -->
        <div data-test-id="nav-mobile-section">
          <AppNavbarMobileMenu />
        </div>
      </div>
    </div>
  </div>
</template>
