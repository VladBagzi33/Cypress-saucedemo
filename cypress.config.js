const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      });
    },
    defaultCommandTimeout: 10000,
    video: false,
    reporter: 'spec',
    screenshotOnRunFailure: false,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    trashAssetsBeforeRuns: true
  },
});
