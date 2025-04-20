export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s - ${process.env.NUXT_ENV_APP_NAME}`,
    title: "Dashboard",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  router: {
    base: process.env.NUXT_ENV_ROUTER_BASE,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/preload", "~/plugins/dateFilters"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ["~/components"],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/moment",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth",
  ],

  auth: {
    user: {
      autoFetch: false,
    },
    strategies: {
      local: {
        user: {
          autoFetch: false,
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NUXT_ENV_API_URL,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: "#6BBBAE",
          secondary: "#F1B406",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
