const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.stuller.com",
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
