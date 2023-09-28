// Import the 'path' module for working with file paths
const path = require('path');

// Export a function that takes an Express 'app' instance as a parameter
module.exports = (app) =>
  // Define a route handler for the root URL '/'
  app.get('/', (req, res) =>
    // Send the 'index.html' file as a response
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
