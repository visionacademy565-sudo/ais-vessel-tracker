import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import VesselMap from './components/VesselMap';
import VesselSearch from './components/VesselSearch';
import VesselList from './components/VesselList';
import Dashboard from './components/Dashboard';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/statistics/vessel-types`);
      setStatistics(response.data);
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    }
  };

  const handleSearch = async (query, type = 'shipname') => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/api/vessels/search`, {
        query,
        type
      });
      setVessels(response.data.vessels || response.data || []);
      setActiveTab('list');
    } catch (err) {
      setError(`Search failed: ${err.message}`);
      setVessels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllVessels = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/vessels?limit=100`);
      setVessels(response.data.vessels || response.data || []);
      setActiveTab('list');
    } catch (err) {
      setError(`Failed to fetch vessels: ${err.message}`);
      setVessels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVessel = (vessel) => {
    setSelectedVessel(vessel);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>⚓ AIS Vessel Tracker</h1>
          <p>Real-time Maritime Vessel Tracking and Monitoring</p>
        </div>
      </header>

      <div className="container">
        <nav className="navbar">
          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            🗺️ Map
          </button>
          <button
            className={`nav-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            📋 Vessels
          </button>
          <button
            className={`nav-btn ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            🔍 Search
          </button>
        </nav>

        <main className="content">
          {error && (
            <div className="error-banner">
              <p>⚠️ {error}</p>
              <button onClick={() => setError(null)}>✕</button>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              statistics={statistics}
              onGetAllVessels={handleGetAllVessels}
              loading={loading}
            />
          )}

          {activeTab === 'map' && (
            <VesselMap vessels={vessels} onSelectVessel={handleSelectVessel} />
          )}

          {activeTab === 'list' && (
            <VesselList
              vessels={vessels}
              loading={loading}
              onSelectVessel={handleSelectVessel}
              selectedVessel={selectedVessel}
            />
          )}

          {activeTab === 'search' && (
            <VesselSearch onSearch={handleSearch} loading={loading} />
          )}
        </main>
      </div>

      <footer className="App-footer">
        <p>&copy; 2024 AIS Vessel Tracker. Powered by AIS API.</p>
      </footer>
    </div>
  );
}

export default App;
