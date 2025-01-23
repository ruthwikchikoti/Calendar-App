#  Calendar App

A modern web application that integrates with Google Calendar to help manage and track  schedules and events.

## Demo : https://www.loom.com/share/cb3f11589e2649bcad5c86ee68f1ebad?sid=efa2d2ff-ecd0-4830-a4e2-a10d7d372df9

## Features

- 🔐 Google OAuth2.0 Authentication
- 📅 Google Calendar Integration
- 📱 Responsive Design
- 🗓️ Calendar View with Event Management
- 👤 User Profile Management

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/        # Page components
│   │   └── App.jsx       # Main application component
│   ├── .env              # Frontend environment variables
│   └── package.json      # Frontend dependencies
│
└── server/                # Backend Node.js application
    ├── api/              # API routes and controllers
    │   ├── auth.js       # Authentication endpoints
    │   └── calendar.js   # Calendar-related endpoints
    ├── .env              # Backend environment variables
    ├── index.js          # Server entry point
    └── package.json      # Backend dependencies
```

## Tech Stack

### Frontend
- React.js
- React Router
- Google Calendar API
- Modern UI Components

### Backend
- Node.js
- Express.js
- Google OAuth2.0
- Cookie-based Authentication

## Local Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Cloud Console Project with Calendar API enabled
- Google OAuth2.0 credentials

### Environment Variables

#### Backend (.env)
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
PORT=3001
NODE_ENV=development
```

#### Frontend (.env)
```
VITE_GOOGLE_CLIENT_ID=your_client_id
VITE_API_URL=http://localhost:3001
```

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/ruthwikchikoti/Calendar-App
cd Calender-App
```

2. Install Backend Dependencies:
```bash
cd server
npm install
```

3. Install Frontend Dependencies:
```bash
cd client
npm install
```

4. Start the Backend Server:
```bash
cd server
npm run dev
```

5. Start the Frontend Development Server:
```bash
cd client
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Setting up Google OAuth2.0

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API
4. Configure the OAuth consent screen
5. Create OAuth 2.0 credentials (Client ID and Client Secret)
6. Add authorized JavaScript origins and redirect URIs
7. Copy the credentials to your .env files

