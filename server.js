const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const AIS_API_URL = process.env.AIS_API_URL;
const AIS_API_KEY = process.env.AIS_API_KEY;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Backend service is running',
    service: 'AIS Vessel Tracker',
    timestamp: new Date().toISOString()
  });
});

// Get all vessels
app.get('/api/vessels', async (req, res) => {
  try {
    const { page = 1, limit = 50, mmsi, shipname, callsign } = req.query;
    
    let url = `${AIS_API_URL}api/vessels`;
    const params = new URLSearchParams();
    
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (mmsi) params.append('mmsi', mmsi);
    if (shipname) params.append('shipname', shipname);
    if (callsign) params.append('callsign', callsign);
    if (AIS_API_KEY) params.append('api_key', AIS_API_KEY);
    
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch vessels',
      details: error.message
    });
  }
});

// Get vessel by MMSI
app.get('/api/vessels/:mmsi', async (req, res) => {
  try {
    const { mmsi } = req.params;
    let url = `${AIS_API_URL}api/vessels/${mmsi}`;
    
    if (AIS_API_KEY) url += `?api_key=${AIS_API_KEY}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch vessel details',
      details: error.message
    });
  }
});

// Search vessels
app.post('/api/vessels/search', async (req, res) => {
  try {
    const { query, type = 'shipname' } = req.body;
    
    let url = `${AIS_API_URL}api/vessels/search`;
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('type', type);
    
    if (AIS_API_KEY) params.append('api_key', AIS_API_KEY);
    
    url += `?${params.toString()}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Search failed',
      details: error.message
    });
  }
});

// Get vessels in geographic area
app.get('/api/vessels/area', async (req, res) => {
  try {
    const { lat, lon, radius = 10 } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }
    
    let url = `${AIS_API_URL}api/vessels/area`;
    const params = new URLSearchParams();
    params.append('lat', lat);
    params.append('lon', lon);
    params.append('radius', radius);
    
    if (AIS_API_KEY) params.append('api_key', AIS_API_KEY);
    
    url += `?${params.toString()}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch vessels in area',
      details: error.message
    });
  }
});

// Get vessel types statistics
app.get('/api/statistics/vessel-types', async (req, res) => {
  try {
    let url = `${AIS_API_URL}api/statistics/vessel-types`;
    
    if (AIS_API_KEY) url += `?api_key=${AIS_API_KEY}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch statistics',
      details: error.message
    });
  }
});

// Get ports information
app.get('/api/ports', async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    let url = `${AIS_API_URL}api/ports?limit=${limit}`;
    if (AIS_API_KEY) url += `&api_key=${AIS_API_KEY}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch ports',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`AIS Vessel Tracker Backend running on http://localhost:${PORT}`);
  console.log(`Connected to AIS API: ${AIS_API_URL}`);
});

module.exports = app;
