const cropData = {
  wheat: {
    temperature: "15-25°C",
    rainfall: "400-800mm",
    soil: "Well-drained loamy soil",
    pH: "pH should be between 5.5 and 7.5",
    MoistureLevel: "12-14%",
    WaterLevel: "350–650 millimeters (mm) of water",
    CrownRootInitiation: "15-20 days after sowing",
    ActiveTillering: "35-40 days after sowing",
    Flowering: "50-55 days after sowing",
    GrainFfilling: "70-75 days after sowing",
  },
  rice: {
    temperature: "20-35°C",
    rainfall: "1000-2000mm",
    soil: "Clayey soil",
    pH: "pH should be between 5.5 and 6.5",
    MoistureLevel: "15-18%",
    WaterLevel: "around 3 cm, 5-10cm (with increasing plant height)",
    CrownRootInitiation: "15-20 days after sowing",
    ActiveTillering: "35-40 days after sowing",
    Flowering: "50-55 days after sowing",
    GrainFfilling: "70-75 days after sowing",
  },
  maize: {
    temperature: "18-27°C",
    rainfall: "600-1200mm",
    soil: "Fertile loamy soil",
    pH: "pH should be between 5.5 and 7.5",
    MoistureLevel: "10-12%",
    WaterLevel: "500–800 mm per growing season",
    CrownRootInitiation: "15-20 days after sowing",
    ActiveTillering: "35-40 days after sowing",
    Flowering: "50-55 days after sowing",
    GrainFfilling: "70-75 days after sowing",
  },
};

const cropSelect = document.getElementById("crop-select");
const cropDetails = document.getElementById("details");
const cropDataContainer = document.getElementById("crop-data");
const compareButton = document.getElementById("compare-button");

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
            <p><strong>Crown Root Initiation:</strong> ${data.CrownRootInitiation}</p>
            <p><strong>Active Tillering:</strong> ${data.ActiveTillering}</p>
            <p><strong>Flowering:</strong> ${data.Flowering}</p>
            <p><strong>Grain Filling:</strong> ${data.GrainFfilling}</p>

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
  message += `- Crown Root Initiation: ${data.CrownRootInitiation}\n`;
  message += `- Active Tillering: ${data.ActiveTillering}\n`;
  message += `- Flowering: ${data.Flowering}\n`;
  message += `- Grain Filling: ${data.GrainFfilling}`;

  alert(message);
});
