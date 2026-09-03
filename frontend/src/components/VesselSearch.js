import React, { useState } from 'react';
import './VesselSearch.css';

const VesselSearch = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('shipname');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Vessels</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-group">
          <label htmlFor="searchType">Search By:</label>
          <select
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-select"
          >
            <option value="shipname">Ship Name</option>
            <option value="mmsi">MMSI</option>
            <option value="callsign">Call Sign</option>
          </select>
        </div>

        <div className="search-group">
          <label htmlFor="query">Search Query:</label>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Enter ${searchType}...`}
            className="search-input"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-search" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="search-tips">
        <h3>Search Tips:</h3>
        <ul>
          <li>
            <strong>Ship Name:</strong> Search for vessel names (e.g., "Maersk")
          </li>
          <li>
            <strong>MMSI:</strong> Search by Maritime Mobile Service Identity
            number
          </li>
          <li>
            <strong>Call Sign:</strong> Search by international radio call sign
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VesselSearch;
