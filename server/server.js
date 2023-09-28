// Import the 'express' library
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define the port where the server will listen, using the value from the environment variable 'PORT' or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware: Serve static files from the '../client/dist' directory
app.use(express.static('../client/dist'));

// Middleware: Parse incoming URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require and use the HTML routes defined in './routes/htmlRoutes.js'
require('./routes/htmlRoutes')(app);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));