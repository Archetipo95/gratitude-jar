export default defineNuxtConfig({
  compatibilityDate: '2025-01-10',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxt/ui', '@nuxt/test-utils/module', '@nuxtjs/seo'],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Gratitude Jar',
    },
    pageTransition: false,
    layoutTransition: false,
  },
})
