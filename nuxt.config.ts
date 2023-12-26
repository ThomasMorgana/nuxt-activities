// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  // Pre-render home page, so first batch of activities are served with HTML for SEO
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt3-leaflet', '@pinia/nuxt'],
})
