<template>
  <div class="min-h-screen flex flex-col gap-10">
    <AppNavbar />

    <main class="mx-4 md:mx-6">
      <slot />
    </main>

    <AppFooter />

    <AppScrollTopBottom />
  </div>
</template>
