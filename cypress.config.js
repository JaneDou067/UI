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
          const filePath = path.resolve(__dirname, '..', '..', 'your-directory', filename);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
          } else {
            console.log('File does not exist:', filename);
            return false;
          }
        }
      });
    },
  },
});