# Elite Escorts UK - Premium Companion Platform

A sophisticated escort and companion platform built with React, Express, and WebSocket technology. Connect with verified elite companions across the UK for dinner dates, social events, travel, and premium companionship services.

## Features

### 🌟 Core Features
- **Elite Companion Profiles** - Browse verified premium escorts and companions
- **Real-time Messaging** - Instant chat with WebSocket integration
- **Video Call Support** - Built-in video calling functionality
- **Phone Integration** - Direct phone calling with UK numbers
- **Stories System** - Instagram-style companion stories
- **Advanced Filtering** - Filter by location, services, experience level, and more
- **Online Status** - Real-time availability indicators
- **Verification Badges** - Verified companion status

### 🏢 Service Categories
- **GFE (Girlfriend Experience)** - Intimate companionship and emotional connection
- **Dinner Dates** - Elegant dining experiences and social companionship
- **Social Events** - Professional companion for parties, galas, and functions
- **Travel Companion** - Luxury travel and vacation companionship
- **Overnight Services** - Extended companionship experiences
- **Massage Services** - Relaxation and wellness treatments
- **Business Events** - Professional companion for corporate functions
- **Private Time** - Intimate personal companionship

### 📍 UK Locations Covered
- London
- Manchester
- Birmingham
- Edinburgh
- Glasgow
- Bristol
- Leeds
- Liverpool
- Cardiff
- Newcastle

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Wouter** for lightweight routing
- **TanStack Query** for server state management
- **shadcn/ui** components with Radix UI primitives
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **WebSocket** for real-time communication
- **Drizzle ORM** for database operations
- **PostgreSQL** support (with in-memory storage for development)

### Development Tools
- **ESBuild** for server bundling
- **tsx** for TypeScript execution
- **Vite HMR** for hot module replacement

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd connect-pro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Environment Variables

For production deployment, set the following environment variables:

```bash
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
```

## API Endpoints

### Profiles
- `GET /api/profiles` - Get all professional profiles
- `GET /api/profiles/:id` - Get specific profile by ID
- `GET /api/stats` - Get platform statistics

### Messages
- `GET /api/messages/:senderId/:receiverId` - Get conversation messages
- `POST /api/messages` - Send a new message

### WebSocket Events
- `join` - Join the platform with profile ID
- `send_message` - Send real-time message
- `start_video_call` - Initiate video call
- `video_call_response` - Respond to video call invitation

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   └── pages/          # Application pages
├── server/                 # Backend Express application
│   ├── index.ts           # Main server entry point
│   ├── routes.ts          # API routes and WebSocket handlers
│   ├── storage.ts         # Data storage abstraction
│   └── vite.ts            # Vite development integration
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── components.json        # shadcn/ui configuration
```

## Data Models

### Profile
- Personal information (name, title, location)
- Contact details (phone number, image)
- Professional data (services, experience, featured area)
- Status information (online status, verification)
- Rating system

### Message
- Real-time messaging between users
- Read status tracking
- Timestamp management

### User
- Authentication and user management
- Username and password handling

## Development

### Adding New Services
1. Update the `services` array in profile data
2. Add corresponding filter options in `FilterBar` component
3. Update the `featuredArea` categories as needed

### Adding New Locations
1. Add location to the sample profiles in `server/storage.ts`
2. Update the location filter options in `FilterBar` component

### Customizing UI
- Modify `client/src/index.css` for global styles
- Update Tailwind configuration in `tailwind.config.ts`
- Customize shadcn/ui components in `client/src/components/ui/`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Performance

- Real-time updates with WebSocket connections
- Optimized image loading with Unsplash CDN
- Efficient state management with TanStack Query
- Mobile-responsive design for all devices

## Security

- Input validation with Zod schemas
- Type-safe database operations
- Secure WebSocket connections
- Protected API endpoints

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive Web App capabilities

## Deployment

The application is designed for deployment on platforms like:
- Replit (recommended)
- Vercel
- Heroku
- Railway
- DigitalOcean

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

## Roadmap

### Upcoming Features
- Advanced search functionality
- Profile recommendations
- Calendar integration for appointments
- Payment processing for services
- Mobile app development
- Advanced analytics dashboard

---

Built with ❤️ for the professional community in the UK.