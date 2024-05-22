// Import required modules
const express = require('express');

// Create an instance of Express
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world! This is your Node.js server running on GitHub Actions.');
});

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

console.log(`Hello from the server`);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
