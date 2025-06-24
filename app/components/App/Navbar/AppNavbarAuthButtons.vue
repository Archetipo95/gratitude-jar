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
    aria-label="Log out of your account"
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
      aria-label="Sign in or login with GitHub"
      @click="client.auth.signInWithOAuth({ provider: 'github' })"
    />
    <AppButton
      data-test-id="google-login-button"
      variant="secondary"
      size="lg"
      icon="simple-icons:google"
      label="Google Login"
      aria-label="Sign in or login with Google"
      @click="client.auth.signInWithOAuth({ provider: 'google' })"
    />
  </div>
</template>
