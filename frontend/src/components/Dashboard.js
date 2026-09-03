import React from 'react';
import './Dashboard.css';

const Dashboard = ({ statistics, onGetAllVessels, loading }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <button
          className="btn-primary"
          onClick={onGetAllVessels}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load All Vessels'}
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Vessels</h3>
            <p className="stat-value">-</p>
            <p className="stat-label">Connected vessels</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚢</div>
          <div className="stat-content">
            <h3>Active Tracking</h3>
            <p className="stat-value">-</p>
            <p className="stat-label">In transit</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚓</div>
          <div className="stat-content">
            <h3>At Port</h3>
            <p className="stat-value">-</p>
            <p className="stat-label">In port</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📡</div>
          <div className="stat-content">
            <h3>Data Updates</h3>
            <p className="stat-value">Real-time</p>
            <p className="stat-label">Live feed</p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h3>Key Features</h3>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🗺️</span>
            <h4>Interactive Map</h4>
            <p>View all vessels on an interactive map with real-time positions</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <h4>Advanced Search</h4>
            <p>Search vessels by name, MMSI, or call sign</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📋</span>
            <h4>Detailed Information</h4>
            <p>Access comprehensive vessel specifications and voyage data</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <h4>Real-time Updates</h4>
            <p>Get instant updates on vessel movements and status changes</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>Getting Started</h3>
        <ul>
          <li>Use the <strong>Search</strong> tab to find specific vessels</li>
          <li>View all active vessels using the <strong>Vessels</strong> tab</li>
          <li>Explore the <strong>Map</strong> for geographic visualization</li>
          <li>Click on any vessel to see detailed information</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
