// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    baseURL: '/Next4Aon/' // เปลี่ยนชื่อ Next4Aon เป็นชื่อ Repository ของคุณถ้าตั้งชื่ออื่น
  }
})
