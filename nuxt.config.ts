/* eslint-disable node/no-process-env */

export default defineNuxtConfig({
  compatibilityDate: "2025-01-10",

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/supabase",
    "@nuxt/ui",
    "@nuxt/test-utils/module",
    "@nuxtjs/seo",
    "@nuxt/eslint",
    "@nuxtjs/storybook",
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },

  css: ["~/assets/css/main.css"],

  site: {
    url: "https://jar-of-gratitude.netlify.app",
  },

  ogImage: {
    enabled: false,
  },

  fonts: {
    experimental: {
      processCSSVariables: true, // Enable if using CSS variables for Tailwind CSS v4
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      titleTemplate: "%s | Gratitude Jar",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: "A simple gratitude journal app built with Nuxt.js and Supabase",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Gratitude Jar",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon-96x96.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
    },
    pageTransition: false,
    layoutTransition: false,
  },

  typescript: {
    typeCheck: true,
  },

  storybook: {
    // Turned off for now, as it's not working with Nuxt
    // You can launch it manually with `bun storybook`
    // enabled: false,
  },
})
