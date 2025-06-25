<script setup lang="ts">
const {
  isAuthenticated,
  signOut,
  signInWithGitHub,
  signInWithGoogle,
} = useAuth()
</script>

<template>
  <AppButton
    v-if="isAuthenticated"
    data-test-id="logout-button"
    variant="error"
    size="lg"
    icon="lucide:log-out"
    label="Log Out"
    aria-label="Log out of your account"
    @click="signOut"
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
      @click="signInWithGitHub"
    />
    <AppButton
      data-test-id="google-login-button"
      variant="secondary"
      size="lg"
      icon="simple-icons:google"
      label="Google Login"
      aria-label="Sign in or login with Google"
      @click="signInWithGoogle"
    />
  </div>
</template>
