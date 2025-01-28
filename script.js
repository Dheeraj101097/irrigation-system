// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBStoXU7AtRuNpHqJmOA9nMn7Y8kd7TbRE",
  authDomain: "dht11-5ab79.firebaseapp.com",
  databaseURL: "https://dht11-5ab79-default-rtdb.firebaseio.com",
  projectId: "dht11-5ab79",
  storageBucket: "dht11-5ab79.appspot.com",
  messagingSenderId: "335758690790",
  appId: "1:335758690790:web:f5c08058b79904913e6e27",
  measurementId: "G-XGQYBMZ7BY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Reference to the Firebase Realtime Database
var database = firebase.database();
// Variables to hold data
let humidity = 0;
let temperature = 0;
let soilMoisture = 0;

// Fetch data and update DOM and chart
database.ref("DHT_11/Temperature").on("value", (snapshot) => {
  temperature = snapshot.val();
  document.getElementById("temperature").innerHTML = temperature + " &#8451;";
  updateChart();
});

database.ref("DHT_11/Humidity").on("value", (snapshot) => {
  humidity = snapshot.val();
  document.getElementById("humidity").innerHTML = humidity + " %";
  updateChart();
});

database.ref("DHT_11/Soil_Moisture").on("value", (snapshot) => {
  soilMoisture = snapshot.val();
  document.getElementById("soil").innerHTML = soilMoisture + " %";
  updateChart();
});

// Chart.js initialization
const ctx = document.getElementById("myChart").getContext("2d");
const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Temperature", "Humidity", "Soil Moisture"],
    datasets: [
      {
        label: "Graphical Representaion of data from sensor",
        data: [temperature, humidity, soilMoisture],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        barThickness: 75,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

// Function to update chart dynamically
function updateChart() {
  chart.data.datasets[0].data = [temperature, humidity, soilMoisture];
  chart.update();
}
//
// for data set
//
const cropData = {
  wheat: {
    temperature: "15-25°C",
    rainfall: "400-800mm",
    soil: "Well-drained loamy soil",
    pH: "pH should be between 5.5 and 7.5",
    MoistureLevel: "12-14%",
    WaterLevel: "350–650 millimeters (mm) of water",
  },
  rice: {
    temperature: "20-35°C",
    rainfall: "1000-2000mm",
    soil: "Clayey soil",
    pH: "pH should be between 5.5 and 6.5",
    MoistureLevel: "15-18%",
    WaterLevel: "around 3 cm, 5-10cm (with increasing plant height)",
  },
  maize: {
    temperature: "18-27°C",
    rainfall: "600-1200mm",
    soil: "Fertile loamy soil",
    pH: "pH should be between 5.5 and 7.5",
    MoistureLevel: "10-12%",
    WaterLevel: "500–800 mm per growing season",
  },
};

const cropSelect = document.getElementById("crop-select");
const cropDetails = document.getElementById("details");
const cropDataContainer = document.getElementById("crop-data");
const compareButton = document.getElementById("compare-button");
//

cropSelect.addEventListener("change", () => {
  const selectedCrop = cropSelect.value;
  const data = cropData[selectedCrop];
  if (data) {
    cropDetails.innerHTML = `
            <p><strong>Temperature Range:</strong> ${data.temperature}</p>
            <p><strong>Rainfall Requirement:</strong> ${data.rainfall}</p>
            <p><strong>Soil Type:</strong> ${data.soil}</p>
            <p><strong>pH Range:</strong> ${data.pH}</p>
            <p><strong>Watering Instructions:</strong> ${data.MoistureLevel}</p>
            <p><strong>Water Level:</strong> ${data.WaterLevel}</p>
            

        `;
    cropDataContainer.style.display = "block";
  }
});

compareButton.addEventListener("click", () => {
  const selectedCrop = cropSelect.value;
  if (!selectedCrop) {
    alert("Please select a crop to compare!");
    return;
  }

  let message = `For ${selectedCrop}, ensure the following conditions:\n`;
  const data = cropData[selectedCrop];
  message += `- Temperature: ${data.temperature}\n`;
  message += `- Rainfall: ${data.rainfall}\n`;
  message += `- Soil: ${data.soil}\n`;
  message += `- pH: ${data.pH}\n`;
  message += `- Watering: ${data.MoistureLevel}\n`;
  message += `- Water Level: ${data.WaterLevel}\n`;

  alert(message);
});

//
//
//
// for water pump// for water pump
document.getElementById("moisture-level").innerHTML = soilMoisture;

// Configuration
const waterBar = document.getElementById("water-bar");
const moistureLevelDisplay = document.getElementById("moisture-level");
const motorStatusDisplay = document.getElementById("motor-status");

let isMotorOn = false;
let currentMoistureLevel = 0;
let waterLevel = 0; // Water bar level

// // Function to simulate soil moisture updates
// function updateSoilMoisture() {
//   const moistureLevel = Math.floor(Math.random() * 101); // Random moisture level (0-100)
//   currentMoistureLevel = moistureLevel;
//   moistureLevelDisplay.textContent = soilMoisture;

//   if (moistureLevel < moistureThreshold) {
//     startPump();
//   } else {
//     stopPump();
//   }
// }

let moistureThreshold = 20; // Default threshold
cropSelect.addEventListener("change", () => {
  const selectedCrop = cropSelect.value;
  const data = cropData[selectedCrop];

  if (data) {
    // Parse MoistureLevel (e.g., "12-14%") to calculate threshold
    const [min, max] = data.MoistureLevel.replace("%", "")
      .split("-")
      .map(Number);
    moistureThreshold = (min + max) / 2; // Average of range
    // document.getElementById(
    //   "threshold-water"
    // ).textContent = `Threshold Water Level: ${moistureThreshold}%`;
    const statusbox = document.getElementById("water-level-box");

    // Remove any existing threshold water level element
    const existingThreshold = document.getElementById("threshold-water");
    if (existingThreshold) {
      existingThreshold.remove();
    }

    // Add the new threshold water level element
    const Thresholdwater = document.createElement("div");
    Thresholdwater.id = "threshold-water"; // Assign an ID to identify the element
    Thresholdwater.innerHTML = `<p>Threshold Water Level above:</p> ${data.MoistureLevel}`;
    statusbox.before(Thresholdwater);
  }
  database.ref("DHT_11/Soil_Moisture").on("value", (snapshot) => {
    currentMoistureLevel = snapshot.val(); // Update with real-time sensor data
    moistureLevelDisplay.textContent = `${currentMoistureLevel} %`; // Display updated value
    console.log(currentMoistureLevel);
    console.log(moistureThreshold);

    // Control pump based on updated value
    if (currentMoistureLevel < moistureThreshold) {
      startPump();
    } else {
      stopPump();
    }
  });
});

// Fetch soil moisture from Firebase

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
    waterLevel += 2; // Increase water level
    waterBar.style.height = waterLevel + "%";

    setTimeout(() => {
      incrementWaterLevel();
    }, 200); // Adjust speed of the bar
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
// setInterval(updateSoilMoisture, 3000);
