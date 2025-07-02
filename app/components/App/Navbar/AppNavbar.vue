<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

const breakpoints = useBreakpoints(breakpointsTailwind)

const mdOrLarger = breakpoints.greaterOrEqual("md")
</script>

<template>
  <header class="relative bg-white dark:bg-gray-800 border-b-4 dark:border-gray-600" data-test-id="navigation-bar">
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
        <div
          v-if="mdOrLarger"
          class="flex items-center gap-4 w-full"
          data-test-id="nav-desktop-section"
        >
          <AppNavbarGreeting />

          <AppThemeButton />
          <AppNavbarAuthButtons />
        </div>

        <!-- Mobile Menu -->
        <AppNavbarMobileMenu v-else data-test-id="nav-mobile-section" />
      </div>
    </div>
  </header>
</template>
