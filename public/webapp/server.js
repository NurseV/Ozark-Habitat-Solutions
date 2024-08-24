require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
const dbURI = `mongodb+srv://masonvandevort1:${process.env.DB_PASSWORD}@cluster0.mbw2b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// Define a Map Schema and Model
const mapSchema = new mongoose.Schema({
    name: String,
    data: Object
});

const Map = mongoose.model('Map', mapSchema);

// API Endpoints

// Save Map
app.post('/api/maps', (req, res) => {
    const mapData = new Map(req.body);
    mapData.save()
        .then(result => res.send(result))
        .catch(err => res.status(400).send(err));
});

// Load Maps
app.get('/api/maps', (req, res) => {
    Map.find()
        .then(maps => res.json(maps))
        .catch(err => res.status(400).send(err));
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
