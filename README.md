# Tracking-API
An API for tracking shipments and packages. Retrieve real-time tracking information for orders from various courier services using a simple and user-friendly interface.

## Request Format

To track a shipment, send a POST request to the following endpoint:
`http://localhost:8000/api/track`


The request body should be in JSON format and include the following fields:

- `orderNumber` (string, required): The order number for the shipment.
- `courierCode` (string, required): The courier code for the shipping carrier.

Example request body:

`json
{
  "orderNumber": "1234567890",
  "courierCode": "usps"
}`

API Endpoints

`POST /api/track`: Track a shipment by providing the order number and courier code. Returns tracking information for the shipment.
Response Format
The API response is in JSON format and includes tracking information. A successful response includes the following fields:

`id`: Tracking ID.
`trackingNumber`: Shipment's tracking number.
`courierCode`: Shipping carrier's code.
Other relevant tracking information fields.

Example response:

`{
  "id": 1,
  "trackingNumber": "1234567890",
  "courierCode": "usps",
  // Other tracking information fields
}`

Status Codes
`200 OK`: The request was successful, and tracking information is provided.
`400 Bad Request`: Invalid request format.
`500 Internal Server Error`: Server error when fetching tracking details.
