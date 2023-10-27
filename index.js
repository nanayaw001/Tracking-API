// Load environment variables from .env file using dotenv
require('dotenv').config();

// Import required modules
const express = require('express');
const app = express();
const https = require ('https');
const fs = require('fs');

// SSL/TLS certificate options
const options = {
  key: fs.readFileSync('key.pem'), // Path to your private key file
  cert: fs.readFileSync('cert.pem'), // Path to your SSL certificate file
  passphrase: 'nana', // Passphrase for your SSL certificate
  secureProtocol: 'TLSv1_2_method', // Specify SSL/TLS protocol version
};



// Import the trackingRoutes module from the 'routes' folder
const trackingRoutes = require('./routes/trackingRoutes');

// Use the trackingRoutes in your Express application under the '/api' path
app.use('/api', trackingRoutes);

// Define the port to listen on, using the PORT environment variable or default to 8000
const port = process.env.PORT || 8000;

// Create an HTTPS server using the specified options and Express app
const server = https.createServer(options, app);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
