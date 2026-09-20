// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    // Removed baseURL: '/protfolio-aon/' to make it run at root /
  },
  runtimeConfig: {
    // Private keys are only available on the server
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    // Public keys that are exposed to the client
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    }
  }
})
