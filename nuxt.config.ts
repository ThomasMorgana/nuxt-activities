// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt3-leaflet', '@pinia/nuxt'],
})
