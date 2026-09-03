# AIS Vessel Tracker - Frontend

React-based frontend application for the AIS Vessel Tracker system.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from template:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your configuration:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_ENV=development
   REACT_APP_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
   ```

## Running

### Development
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Testing
```bash
npm test
```

## Features

### Dashboard
- Overview of vessel statistics
- Key metrics and features
- Quick access to all features

### Map View
- Geographic visualization of vessel positions
- Interactive markers for each vessel
- Real-time position tracking

### Vessel List
- Comprehensive list of all vessels
- Detailed information for each vessel
- Click to select and view details

### Search
- Search by ship name
- Search by MMSI (Maritime Mobile Service Identity)
- Search by call sign
- Advanced filtering options

## Components

### Dashboard.js
Displays overview statistics and key features of the application.

### VesselMap.js
Provides map visualization of vessel positions and movements.

### VesselList.js
Shows list of vessels with detailed information.

### VesselSearch.js
Provides search functionality for finding specific vessels.

## Styling

- Modern CSS with Flexbox and Grid layouts
- Responsive design for mobile and desktop
- Color scheme: Blue (#1a237e, #0d47a1)
- Consistent component styling

## API Integration

Communicates with backend server at `REACT_APP_API_URL`

Endpoints used:
- `GET /health` - Health check
- `GET /api/vessels` - Get all vessels
- `POST /api/vessels/search` - Search vessels
- `GET /api/vessels/:mmsi` - Get vessel details
- `GET /api/statistics/vessel-types` - Get statistics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading of components
- Optimized re-renders
- Efficient state management
- Responsive grid layouts

## Future Enhancements

- WebSocket integration for real-time updates
- Advanced map features (Leaflet)
- Data export capabilities
- User authentication
- Saved searches and favorites
- Mobile app (React Native)

## Troubleshooting

### Backend Connection Issues
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env`
- Check browser console for CORS errors

### Search Not Working
- Ensure backend API is responding
- Check API key in backend `.env`
- Verify search parameters

### Map Display Issues
- Clear browser cache
- Check internet connection
- Verify Leaflet library is loaded

## Dependencies

- react: ^18.2.0
- axios: ^1.4.0
- leaflet: ^1.9.4
- react-leaflet: ^4.2.1
- recharts: ^2.7.2

## License

ISC
