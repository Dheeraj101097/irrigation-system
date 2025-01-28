// Configuration
const moistureThreshold = 50; // Threshold for soil moisture
const waterBar = document.getElementById("water-bar");
const moistureLevelDisplay = document.getElementById("moisture-level");
const motorStatusDisplay = document.getElementById("motor-status");

let isMotorOn = false;
let currentMoistureLevel = 0;
let waterLevel = 0; // Water bar level

// Function to simulate soil moisture updates
function updateSoilMoisture() {
  const moistureLevel = Math.floor(Math.random() * 101); // Random moisture level (0-100)
  currentMoistureLevel = moistureLevel;
  moistureLevelDisplay.textContent = moistureLevel;

  if (moistureLevel < moistureThreshold) {
    startPump();
  } else {
    stopPump();
  }
}

// Function to start the pump
function startPump() {
  if (!isMotorOn) {
    isMotorOn = true;
    motorStatusDisplay.textContent = "ON";
    motorStatusDisplay.style.color = "green";
    incrementWaterLevel();
  }
}

// Function to increment the water level
function incrementWaterLevel() {
  if (isMotorOn && waterLevel < 100) {
    waterLevel += 5; // Increase water level
    waterBar.style.height = waterLevel + "%";

    setTimeout(() => {
      incrementWaterLevel();
    }, 500); // Adjust speed of the bar
  } else if (waterLevel >= 100) {
    currentMoistureLevel = moistureThreshold + 1; // Simulate soil being sufficiently watered
    stopPump();
  }
}

// Function to stop the pump
function stopPump() {
  if (isMotorOn) {
    isMotorOn = false;
    motorStatusDisplay.textContent = "OFF";
    motorStatusDisplay.style.color = "red";
    waterLevel = 0; // Reset water bar level
    setTimeout(() => {
      waterBar.style.height = "0%";
    }, 500);
  }
}

// Automatically update soil moisture every 5 seconds
setInterval(updateSoilMoisture, 5000);
