// fake-esp32.js
const http = require('http');

let currentTemp = 24.0;
let currentHum = 45.0;
let currentAir = 450;
let currentHr = 75;    // New baseline Heart Rate
let currentSpo2 = 98;  // New baseline SpO2

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/api/data' && req.method === 'GET') {

        // 1. Simulate environmental and biometric drift
        currentTemp += (Math.random() - 0.5) * 0.4;
        currentHum += (Math.random() - 0.5) * 1.5;
        currentAir += Math.floor((Math.random() - 0.5) * 30);
        currentHr += Math.floor((Math.random() - 0.5) * 5);   // Drift +/- 2 bpm
        currentSpo2 += Math.floor((Math.random() - 0.5) * 2); // Drift +/- 1%

        // 2. Keep values within realistic boundaries
        if (currentTemp > 35) currentTemp = 35; if (currentTemp < 15) currentTemp = 15;
        if (currentHum > 90) currentHum = 90; if (currentHum < 20) currentHum = 20;
        if (currentAir > 1200) currentAir = 1200; if (currentAir < 100) currentAir = 100;

        // Bounds for vitals
        if (currentHr > 110) currentHr = 110; if (currentHr < 60) currentHr = 60;
        if (currentSpo2 > 100) currentSpo2 = 100; if (currentSpo2 < 92) currentSpo2 = 92;

        // 3. Construct the payload
        const payload = {
            temperature: parseFloat(currentTemp.toFixed(2)),
            humidity: parseFloat(currentHum.toFixed(2)),
            airQualityRaw: currentAir,
            heartRate: currentHr,
            spo2: currentSpo2
        };

        console.log(`[${new Date().toLocaleTimeString()}] Sent fake data:`, payload);

        res.writeHead(200);
        res.end(JSON.stringify(payload));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Endpoint Not Found" }));
    }
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`🔌 Fake ESP32 Simulator is online!`);
    console.log(`📡 Listening for GET requests at: http://localhost:${PORT}/api/data`);
    console.log(`Press Ctrl+C to stop.`);
});