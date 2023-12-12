// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Inter: [400, 500, 600, 700]
        }
      }
    ]
  ],
  typescript: {
    typeCheck: true
  },
  devtools: { enabled: true }
})
