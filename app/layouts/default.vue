<template>
  <UContainer class="min-h-screen flex flex-col justify-between">
    <div class="space-y-4">
      <NavigationBar />
      <slot />
    </div>
    <FooterBar />
    
    <!-- Scroll Navigation -->
    <ScrollNavigator />
  </UContainer>
</template>
