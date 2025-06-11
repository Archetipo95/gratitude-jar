<script setup lang="ts">
import { VuePlugin } from "@stagewise-plugins/vue"
import { StagewiseToolbar, type ToolbarConfig } from "@stagewise/toolbar-vue"

const config: ToolbarConfig = {
  plugins: [VuePlugin],
}
</script>

<template>
  <UApp>
    <ClientOnly>
      <StagewiseToolbar :config="config" />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
