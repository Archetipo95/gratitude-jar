export default defineNuxtConfig({
  compatibilityDate: '2025-01-10',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase'],
  supabase: {
    redirect: false,
  },
})
