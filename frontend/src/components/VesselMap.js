import React from 'react';
import './VesselMap.css';

const VesselMap = ({ vessels, onSelectVessel }) => {
  return (
    <div className="map-container">
      <h2>Vessel Map View</h2>
      <div className="map-info">
        <p>🗺️ Interactive map showing {vessels.length} vessels</p>
        <p className="note">
          Note: Full map integration with Leaflet requires additional setup.
          Showing vessel list below.
        </p>
      </div>
      <div className="vessel-map-grid">
        {vessels.length > 0 ? (
          vessels.map((vessel, index) => (
            <div
              key={index}
              className="map-vessel-item"
              onClick={() => onSelectVessel(vessel)}
            >
              <div className="vessel-marker">
                <span className="marker-emoji">🚢</span>
              </div>
              <div className="vessel-marker-info">
                <p className="vessel-name">{vessel.shipname || 'Unknown'}</p>
                <p className="vessel-coords">
                  {vessel.lat && vessel.lon
                    ? `${vessel.lat.toFixed(2)}°N, ${vessel.lon.toFixed(2)}°E`
                    : 'Position N/A'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No vessels to display. Load vessels first.</p>
        )}
      </div>
    </div>
  );
};

export default VesselMap;
