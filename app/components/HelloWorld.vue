<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const greatingMessage = computed(() => {
  if (!user.value) return 'Hello World'
  return `Hello ${user.value.user_metadata.user_name}`
})

const { data: messages } = await useAsyncData(
  'messages',
  async () => {
    return await client.from('gratitude_messages').select('id, message, week')
  },
  { transform: (result) => result.data, watch: user }
)
</script>

<template>
  <div>
    <h1>{{ greatingMessage }}</h1>
    <button v-if="!!user" @click="client.auth.signOut()">Log Out</button>
    <button v-else @click="client.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: '/redirect' } })">Log In</button>

    <div v-if="!!user" v-for="{ message, id, week } in messages" :key="id">
      <h2>Week {{ week }}</h2>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
