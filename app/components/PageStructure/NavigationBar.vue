<template>
  <div class="relative bg-white dark:bg-gray-800 border-b-4 dark:border-gray-600" data-test-id="navigation-bar">
    <div class="flex justify-between items-center p-4 md:p-6" data-test-id="nav-container">
      <!-- Logo Section -->
      <div data-test-id="nav-logo-section">
        <NavLogo />
      </div>

      <!-- Desktop Navigation & Mobile Menu Toggle -->
      <div class="flex items-center gap-4" data-test-id="nav-right-section">
        <!-- Desktop Only Navigation -->
        <div class="hidden md:flex items-center gap-4" data-test-id="nav-desktop-section">
          <NavGreeting />
          <NavAuthButtons />
        </div>

        <!-- Color Mode Button (Always Visible) -->
        <div data-test-id="nav-color-mode-section">
          <ColorModeButton />
        </div>

        <!-- Mobile Menu (CSS-only) -->
        <div data-test-id="nav-mobile-section">
          <NavMobileMenu />
        </div>
      </div>
    </div>
  </div>
</template>
