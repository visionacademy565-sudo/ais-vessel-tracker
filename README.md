# AIS Vessel Tracker - Web Application

A comprehensive web application for tracking and monitoring maritime vessels using the Automatic Identification System (AIS) API.

## Features

### Vessel Tracking
- Real-time vessel position tracking
- Search vessels by name, MMSI, or call sign
- Filter vessels by type and status
- View detailed vessel information

### Geographic Features
- Interactive map view of vessel locations
- Search vessels in geographic areas
- Track vessel routes and movements
- Port location visualization

### Analytics & Statistics
- Vessel type distribution statistics
- Fleet composition analysis
- Port activity monitoring
- Real-time vessel count

### Data Management
- Vessel history and trajectory tracking
- Voyage information and ETA
- Port call records
- Vessel specifications and characteristics

## Project Structure

```
ais-vessel-tracker/
├── backend/
│   ├── server.js           # Express backend server
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables template
│   └── README.md          # Backend documentation
├── frontend/
│   ├── public/            # Static files
│   ├── src/               # React components
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
└── README.md              # This file
```

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from template:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   PORT=5000
   AIS_API_URL=https://ais-dev-vep5xnnkpna3wvvbbi6gzy-740019354709.europe-west2.run.app/
   NODE_ENV=development
   AIS_API_KEY=your_api_key_here
   ```

### Running Backend

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Backend will be available at `http://localhost:5000`

## Frontend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from template:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your backend URL:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_ENV=development
   ```

### Running Frontend

**Development:**
```bash
npm start
```

Frontend will open at `http://localhost:3000`

**Build for Production:**
```bash
npm run build
```

## API Endpoints

### Health Check
- `GET /health` - Check backend service status

### Vessels
- `GET /api/vessels` - Get all vessels with pagination
  - Query params: `page`, `limit`, `mmsi`, `shipname`, `callsign`
- `GET /api/vessels/:mmsi` - Get specific vessel details
- `POST /api/vessels/search` - Search vessels
  - Body: `{ query: string, type: 'shipname'|'mmsi'|'callsign' }`
- `GET /api/vessels/area` - Get vessels in geographic area
  - Query params: `lat`, `lon`, `radius`

### Statistics
- `GET /api/statistics/vessel-types` - Get vessel type statistics

### Ports
- `GET /api/ports` - Get port information
  - Query params: `limit`

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│              - Map View                                      │
│              - Vessel Search                                 │
│              - Real-time Updates                             │
│              - Statistics Dashboard                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/REST
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Express)                          │
│              - API Routing                                   │
│              - Request Validation                            │
│              - Rate Limiting                                 │
│              - Error Handling                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Proxy Requests
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              AIS API (External Service)                      │
│   https://ais-dev-vep5xnnkpna3wvvbbi6gzy...run.app/        │
│              - Vessel Data                                   │
│              - Real-time Positions                           │
│              - Port Information                              │
│              - Historical Data                               │
└─────────────────────────────────────────────────────────────┘
```

## Environment Variables

### Backend (.env)
```
PORT=5000                    # Backend server port
AIS_API_URL=...              # AIS API endpoint URL
NODE_ENV=development         # Environment (development/production)
AIS_API_KEY=...              # API key for authentication (if required)
```

### Frontend (.env)
```
REACT_APP_API_URL=...        # Backend server URL
REACT_APP_ENV=development    # Environment
```

## Development

### Running Both Services

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Deployment

### Docker Deployment

Create Dockerfile for each service and deploy to your preferred cloud platform (Google Cloud Run, AWS, Azure, etc.)

### Environment-Specific Configuration

- **Development**: Uses local backend at `http://localhost:5000`
- **Production**: Configure API URL to your deployed backend

## Troubleshooting

### Backend Connection Issues
- Verify backend is running on correct port
- Check CORS settings in `server.js`
- Ensure `.env` file has correct AIS_API_URL

### AIS API Errors
- Verify API_KEY if authentication is required
- Check rate limits
- Validate query parameters format

### Frontend Errors
- Clear browser cache
- Verify REACT_APP_API_URL in `.env`
- Check browser console for errors

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Performance Optimization

- Implement caching strategies
- Optimize API queries with pagination
- Use clustering for backend
- Implement lazy loading in frontend
- Use WebSockets for real-time updates

## Security Considerations

- Implement authentication/authorization
- Validate all API inputs
- Use HTTPS in production
- Implement rate limiting
- Sanitize user inputs
- Secure API keys

## Future Enhancements

- WebSocket integration for real-time updates
- Advanced filtering and search capabilities
- Data export (CSV, PDF)
- Multi-language support
- Mobile app (React Native)
- Advanced analytics and reporting
- Integration with other maritime data sources

## License

ISC

## Support

For issues or questions, please create a GitHub issue or contact the development team.
