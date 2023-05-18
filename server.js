const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const UPDATES_LIMIT = 1000;
// Create Express app
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Serve the React application's build files
app.use(express.static(path.join(__dirname, "/build")));

// Create an HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
const clients = new Set();
let updateCount = 0;

setInterval(() => {
  updateCount = 0;
}, 1000); // Reset the count every second

// Handle WebSocket connections
wss.on("connection", (ws) => {
  // Handle new WebSocket connection
  console.log("New client connected");

  // Add client to the set
  clients.add(ws);

  // Handle WebSocket disconnections
  ws.on("close", () => {
    console.log("Client disconnected");

    // Remove client from the set
    clients.delete(ws);

    // Stop data generation if no clients are connected
    if (clients.size === 0) {
      stopDataGeneration();
    }
  });

  // Start data generation if this is the first client
  if (clients.size === 1) {
    startDataGeneration();
  }
});

// Data generation function
function generateData() {
  // Generate sample data
  const data = {
    Tag1: "Tag1Value" + Math.floor(Math.random() * 10 + 1),
    Tag2: "Tag2Value" + Math.floor(Math.random() * 10 + 1),
    Tag3: "Tag3Value" + Math.floor(Math.random() * 10 + 1),
    Metric1: Math.random() * 100,
    Metric2: Math.random() * 100,
  };

  // Send data to connected clients
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN && updateCount < 100) {
      client.send(JSON.stringify(data));
      updateCount++; // Increment the update count
    }
  }
}

let dataGenerationInterval;

// Start data generation at the desired rate
function startDataGeneration() {
  dataGenerationInterval = setInterval(generateData, UPDATES_LIMIT); // Adjust the interval as required
}

// Stop data generation
function stopDataGeneration() {
  clearInterval(dataGenerationInterval);
}

// API routes
app.get("/", (req, res) => {
  // Serve frontend React application
  res.sendFile(__dirname + "build/index.html");
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
