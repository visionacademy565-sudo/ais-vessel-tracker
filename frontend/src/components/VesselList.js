import React from 'react';
import './VesselList.css';

const VesselList = ({ vessels, loading, onSelectVessel, selectedVessel }) => {
  if (loading) {
    return <div className="loading">Loading vessels...</div>;
  }

  if (vessels.length === 0) {
    return (
      <div className="empty-state">
        <p>No vessels found. Try searching or loading all vessels.</p>
      </div>
    );
  }

  return (
    <div className="vessel-list-container">
      <h2>Vessel List ({vessels.length})</h2>
      <div className="vessels-grid">
        {vessels.map((vessel, index) => (
          <div
            key={index}
            className={`vessel-card ${selectedVessel === vessel ? 'selected' : ''}`}
            onClick={() => onSelectVessel(vessel)}
          >
            <div className="vessel-header">
              <h3>{vessel.shipname || vessel.name || 'Unknown'}</h3>
              <span className="vessel-type">{vessel.shiptype || 'N/A'}</span>
            </div>
            <div className="vessel-info">
              <div className="info-row">
                <span className="label">MMSI:</span>
                <span className="value">{vessel.mmsi || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="label">Call Sign:</span>
                <span className="value">{vessel.callsign || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="label">Flag:</span>
                <span className="value">{vessel.flag || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="label">Position:</span>
                <span className="value">
                  {vessel.lat && vessel.lon
                    ? `${vessel.lat.toFixed(4)}°, ${vessel.lon.toFixed(4)}°`
                    : 'N/A'}
                </span>
              </div>
              {vessel.speed && (
                <div className="info-row">
                  <span className="label">Speed:</span>
                  <span className="value">{vessel.speed} knots</span>
                </div>
              )}
              {vessel.course && (
                <div className="info-row">
                  <span className="label">Course:</span>
                  <span className="value">{vessel.course}°</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VesselList;
