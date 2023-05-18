// Start data generation at desired rate
function startDataGeneration(clients, updateCount) {
  dataGenerationInterval = setInterval(() => {
    generateData(clients, updateCount);
  }, 1000); // Adjust the interval as required
}

// Stop data generation
function stopDataGeneration(dataGenerationInterval) {
  clearInterval(dataGenerationInterval);
}

// Data generation function
function generateData(clients, updateCount) {
  // Generate sample data
  console.log("clients", clients);
  const data = {
    Tag1: "Tag1Value" + Math.floor(Math.random() * 10 + 1),
    Tag2: "Tag2Value" + Math.floor(Math.random() * 10 + 1),
    Tag3: "Tag3Value" + Math.floor(Math.random() * 10 + 1),
    Metric1: Math.random() * 100,
    Metric2: Math.random() * 100,
  };
  console.log("generate");
  // Send data to connected clients
  clients.forEach((client) => {
    if (client.connected && updateCount < 100) {
      client.sendUTF(data);
      updateCount++; // Increment the update count
    }
  });
}

function sendDataToClients(clients, data, updateCount) {
  clients.forEach((client) => {
    if (client.connected && updateCount < 100) {
      client.sendUTF(data);
      updateCount++;
    }
  });
}

module.exports = {
  startDataGeneration,
  stopDataGeneration,
  generateData,
  sendDataToClients,
};
