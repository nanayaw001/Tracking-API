const axios = require('axios');

// Define the order number and courier code you want to track.
const orderNumber = '9261290312833844954982'; // Replace with a real order number.
const courierCode = 'ups'; // Replace with the actual courier code.

// Define the data to send in the request.
const requestData = {
  orderNumber,
  courierCode, // Include the courierCode in the request data.
};

// Set the API endpoint URL. Ensure it points to your Express server.
const apiUrl = 'http://localhost:3000/api/track'; // Change to the actual URL if needed.

// Make the API request.
axios
  .post(apiUrl, requestData)
  .then((response) => {
    console.log('API Response:', response.data);
  })
  .catch((error) => {
    console.error('API Error:', error);
  });
