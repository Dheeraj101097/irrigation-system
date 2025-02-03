// const backendurl = "http://localhost:3000/data";

// async function checkWeather() {
//   try {
//     const response = await fetch(backendurl);
//     const data = await response.json();

//     // Assuming the backend sends data like { temperature: 25, humidity: 60, soilMoisture: 300 }
//     document.getElementById(
//       "temperature"
//     ).innerHTML = `${data.temperature} &#8451;`;
//     document.getElementById("humidity").innerHTML = `${data.humidity} %`;
//     document.getElementById(
//       "soil-moisture"
//     ).innerHTML = `${data.soilMoisture} %`;

//     console.log(data); // Debugging
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// // Call the function periodically
// setInterval(checkWeather, 10000); // Fetch every 10 seconds
