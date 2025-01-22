import React from 'react';
import Calendar from '../components/Calendar';

function Dashboard({ setIsAuthenticated }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your calendar events
          </p>
        </div>
        
        <Calendar setIsAuthenticated={setIsAuthenticated} />
      </div>
    </div>
  );
}

export default Dashboard;