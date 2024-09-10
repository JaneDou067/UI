const { defineConfig } = require("cypress");
const path = require('path');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.epam.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      on('task', {
        deleteFile(filename) {
          const filePath = path.join(__dirname, 'cypress/downloads', filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return null;
          } else {
            throw new Error(`File not found: ${filename}`);
          }
        },
      });
    },
  },
});