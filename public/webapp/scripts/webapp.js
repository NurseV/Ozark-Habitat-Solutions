document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([37.7749, -122.4194], 13); // Centered on San Francisco for now

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    let drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (event) {
        let layer = event.layer;
        drawnItems.addLayer(layer);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Mapping tool code here...

    // Soil Test Tracking Code
    const soilTestForm = document.getElementById("soil-test-form");
    const recommendationsDiv = document.getElementById("recommendations");

    soilTestForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const pH = parseFloat(document.getElementById("pH").value);
        const nitrogen = parseFloat(document.getElementById("nitrogen").value);
        const phosphorus = parseFloat(document.getElementById("phosphorus").value);
        const potassium = parseFloat(document.getElementById("potassium").value);

        let recommendations = "<h3>Fertilizer Recommendations</h3>";

        if (pH < 6.0) {
            recommendations += "<p>Consider adding lime to raise the pH level.</p>";
        } else if (pH > 7.0) {
            recommendations += "<p>Consider adding sulfur to lower the pH level.</p>";
        }

        if (nitrogen < 50) {
            recommendations += "<p>Add a nitrogen-rich fertilizer.</p>";
        }

        if (phosphorus < 30) {
            recommendations += "<p>Add a phosphorus-rich fertilizer.</p>";
        }

        if (potassium < 100) {
            recommendations += "<p>Add a potassium-rich fertilizer.</p>";
        }

        recommendationsDiv.innerHTML = recommendations;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Mapping tool and soil test code here...

    // Weather Tracking Code
    const weatherForm = document.getElementById("weather-form");
    const weatherResultDiv = document.getElementById("weather-result");

    weatherForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const location = document.getElementById("location").value;
        const apiKey = "YOUR_API_KEY"; // Replace with your actual API key from OpenWeatherMap
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const weather = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;

                weatherResultDiv.innerHTML = `
                    <h3>Weather in ${location}</h3>
                    <p>Condition: ${weather}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            })
            .catch(error => {
                weatherResultDiv.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
                console.error("Error fetching weather data:", error);
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([37.7749, -122.4194], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    let drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (event) {
        let layer = event.layer;
        drawnItems.addLayer(layer);
    });

    // Save Map
    document.getElementById('save-map').addEventListener('click', function () {
        const mapName = prompt('Enter a name for your map:');
        if (mapName) {
            const mapData = {
                name: mapName,
                data: drawnItems.toGeoJSON()
            };

            fetch('/api/maps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mapData)
            })
                .then(response => response.json())
                .then(data => {
                    alert('Map saved successfully!');
                    console.log('Saved map:', data);
                })
                .catch(error => console.error('Error saving map:', error));
        }
    });

    // Load Maps
    document.getElementById('load-maps').addEventListener('click', function () {
        fetch('/api/maps')
            .then(response => response.json())
            .then(maps => {
                const mapNames = maps.map(map => map.name).join('\n');
                alert('Saved Maps:\n' + mapNames);
            })
            .catch(error => console.error('Error loading maps:', error));
    });
});
