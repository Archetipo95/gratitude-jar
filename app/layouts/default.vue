<template>
  <UContainer class="min-h-screen flex flex-col justify-between">
    <div class="space-y-4">
      <AppNavbar />
      <slot />
    </div>
    <AppFooter />

    <!-- Scroll Navigation -->
    <AppScrollTopBottom />
  </UContainer>
</template>
