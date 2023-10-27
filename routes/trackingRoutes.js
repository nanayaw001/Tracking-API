// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Create an Express router
const router = express.Router();

// Use the bodyParser middleware to parse JSON data
router.use(bodyParser.json());

// Load the TrackingMore API key from environment variables
const trackingApiKey = process.env.TRACKINGMORE_API_KEY; // Load the API key from environment variables

// Define a POST endpoint '/track' for tracking packages
router.post('/track', async (req, res) => {
  // Extract orderNumber and courierCode from the request body
  const { orderNumber, courierCode } = req.body; // Extract orderNumber and courierCode from the request body

  // Check if orderNumber and courierCode are provided, return an error response if not
  if (!orderNumber) {
    return res.status(400).json({ error: 'Order number is required.' });
  }

  if (!courierCode) {
    return res.status(400).json({ error: 'Courier code is required.' });
  }

  // Define the base URL for the TrackingMore API
  const baseUrl = 'https://api.trackingmore.com/v4';

  try {
    // Call the function to fetch tracking details from the TrackingMore API
    const trackingData = await getTrackingDetails(orderNumber, courierCode, trackingApiKey, baseUrl);

    if (trackingData.meta.code !== 200) {
      // Handle TrackingMore API errors by returning an error response
      return res.status(trackingData.meta.code).json({ error: trackingData.meta.message });
    }

    // Parse the relevant tracking information.
    const trackingInfo = parseTrackingData(trackingData);

    // Return the parsed tracking information in the response
    res.json(trackingInfo);

  } catch (error) {
    // Handle other errors (e.g., network issues or exceptions).
    res.status(500).json({ error: 'Failed to fetch tracking details.' });
  }
});

// Function to parse tracking data and extract relevant information
function parseTrackingData(trackingData) {
  if (trackingData.meta.code !== 200) {
    // Handle errors or return an error response as needed.
    return { error: trackingData.meta.message };
  }

  // Extract relevant tracking data from the response
  const data = trackingData.data;

  // Return a structured response with extracted information
  return {
    id: data.id,
    trackingNumber: data.tracking_number,
    courierCode: data.courier_code,
    orderNumber: data.order_number,
    orderDate: data.order_date,
    createdDate: data.created_at,
    updatedAt: data.update_at,
    deliveryStatus: data.delivery_status,
    archived: data.archived,
    updating: data.updating,
    destinationCountry: data.destination_country,
    destinationState: data.destination_state,
    destinationCity: data.destination_city,
    originCountry: data.origin_country,
    originState: data.origin_state,
    originCity: data.origin_city,
    trackingPostalCode: data.tracking_postal_code,
    trackingShipDate: data.tracking_ship_date,
    trackingDestinationCountry: data.tracking_destination_country,
    trackingOriginCountry: data.tracking_origin_country,
    trackingCourierAccount: data.tracking_courier_account,
    trackingKey: data.tracking_key,
    customerName: data.customer_name,
    customerEmail: data.customer_email,
    customerSms: data.customer_sms,
    orderId: data.order_id,
    title: data.title,
    logisticsChannel: data.logistics_channel,
    note: data.note,
    signedBy: data.signed_by,
    serviceCode: data.service_code,
    weight: data.weight,
    weightKg: data.weight_kg,
    productType: data.product_type,
    pieces: data.pieces,
    dimension: data.dimension,
    substatus: data.substatus,
    statusInfo: data.status_info,
    previously: data.previously,
    destinationTrackNumber: data.destination_track_number,
    exchangeNumber: data.exchange_number,
    scheduledDeliveryDate: data.scheduled_delivery_date,
    scheduledAddress: data.scheduled_address,
    latestEvent: data.latest_event,
    latestCheckpointTime: data.latest_checkpoint_time,
    transitTime: data.transit_time,
    originInfo: data.origin_info,
    destinationInfo: data.destination_info
  };
}

// Function to get tracking details from the TrackingMore API
async function getTrackingDetails(orderNumber, courierCode, apiKey, baseUrl) {
  try {
    const headers = {
      'Tracking-Api-Key': apiKey,
      'Content-Type': 'application/json',
    };

    const requestData = {
      tracking_number: orderNumber,
      courier_code: courierCode,
    };

    // Make a POST request to the TrackingMore API to fetch tracking details
    const response = await axios.post(`${baseUrl}/trackings/create`, requestData, {
      headers,
    });

    // Return the response data from the TrackingMore API
    return response.data;
  } catch (error) {
    // Handle network errors or exceptions by throwing the error
    throw error;
  }
}

// Export the Express router to use in other parts of your application
module.exports = router;


