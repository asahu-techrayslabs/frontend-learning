import tailwindcss from "@tailwindcss/vite";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: "2025-03-18",
  devtools: { enabled: true },
  // vuetify 
  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  css: ['~/assets/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

});