# Replit Project Guide

## Overview

This is a full-stack escort companion platform called "Elite Escorts UK" built with React, Express, and PostgreSQL. The application allows users to browse verified escort profiles, engage in real-time chat, and initiate video calls. It features a modern UI built with shadcn/ui components and Tailwind CSS, with real-time communication powered by WebSockets.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Real-time Communication**: WebSocket server for chat and video call signaling
- **API Design**: RESTful endpoints with WebSocket integration
- **Development**: Hot module replacement with Vite middleware integration

### Database Architecture
- **Database**: PostgreSQL (configured but using in-memory storage currently)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations
- **Connection**: Neon Database serverless driver

## Key Components

### Data Models
- **Users**: Authentication and basic user information
- **Profiles**: Professional profile data with status, services, and ratings
- **Messages**: Real-time messaging between users

### Frontend Components
- **ProfileGrid**: Displays professional profiles in a responsive grid layout
- **ChatModal**: Real-time messaging interface with WebSocket integration  
- **VideoCallModal**: Video call interface with connection simulation
- **FilterBar**: Advanced filtering for profiles by location, services, and experience
- **StoriesCarousel**: Instagram-style stories display

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **WebSocket Handler**: Real-time communication for messaging and status updates
- **Express Routes**: RESTful API endpoints for profiles and user data

## Data Flow

### Real-time Communication
1. Client connects to WebSocket server on `/ws` endpoint
2. User joins with profile ID to enable real-time features
3. Messages are broadcast to connected clients instantly
4. Online status updates are synchronized across all clients

### Profile Management
1. Profiles are fetched via REST API with periodic refresh
2. Online status is updated through WebSocket connections
3. Filtering and search operate on client-side cached data

### Authentication Flow
- User authentication system is defined in schema but not implemented
- Current implementation uses mock user IDs for development

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component for stories

### Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: Production bundling for server code
- **Drizzle Kit**: Database schema management
- **tsx**: TypeScript execution for development

### Real-time Features
- **ws**: WebSocket implementation for real-time communication
- **nanoid**: Unique ID generation

## Deployment Strategy

### Development
- Run with `npm run dev` for full-stack development
- Vite dev server with HMR for frontend
- tsx for TypeScript server execution with auto-restart
- WebSocket server runs alongside Express

### Production Build
- Frontend built with Vite to `dist/public`
- Server bundled with ESBuild to `dist/index.js`
- Static files served from built frontend
- WebSocket server integrated with production Express server

### Environment Configuration
- PostgreSQL connection via `DATABASE_URL` environment variable
- Replit deployment configured for autoscale
- Port 5000 exposed externally on port 80

## Changelog

```
Changelog:
- June 16, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```