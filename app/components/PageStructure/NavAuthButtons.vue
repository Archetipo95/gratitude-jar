<script setup lang="ts">
import type { Database } from "~~/types/database.types"

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()
</script>

<template>
  <AppButton
    v-if="!!user"
    data-test-id="logout-button"
    variant="error"
    size="lg"
    icon="lucide:log-out"
    label="Log Out"
    @click="client.auth.signOut()"
  />
  <div
    v-else
    class="flex gap-2 flex-wrap"
    data-test-id="login-buttons-container"
  >
    <AppButton
      data-test-id="github-login-button"
      variant="secondary"
      size="lg"
      icon="lucide:github"
      label="GitHub Login"
      @click="client.auth.signInWithOAuth({ provider: 'github' })"
    />
    <AppButton
      data-test-id="google-login-button"
      variant="secondary"
      size="lg"
      icon="simple-icons:google"
      label="Google Login"
      @click="client.auth.signInWithOAuth({ provider: 'google' })"
    />
  </div>
</template>
