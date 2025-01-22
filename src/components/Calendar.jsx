import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DateFilter from './DateFilter';
import EventList from './EventList';
import CalendarView from './CalendarView';
import EventDetails from './EventDetails';
import PropTypes from 'prop-types';

function Calendar({ setIsAuthenticated }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (selectedDate) {
        queryParams.append('date', selectedDate.toISOString());
      }
      if (searchQuery) {
        queryParams.append('searchQuery', searchQuery);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/calendar/events?${queryParams.toString()}`,
        {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          navigate('/');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, searchQuery, setIsAuthenticated, navigate]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleReauthorize = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Error during reauthorization:', error);
      setError('Failed to reauthorize. Please try logging in again.');
    }
  };

  const handleDateClear = () => {
    setSelectedDate(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Calendar Events</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded ${
                viewMode === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {viewMode === 'list' && (
            <div className="flex-1">
              <DateFilter 
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onClear={handleDateClear}
              />
            </div>
          )}
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Events
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-600">{error}</p>
            {error.includes('authorized') && (
              <button
                onClick={handleReauthorize}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Reauthorize Access
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <EventList 
                events={events} 
                onEventClick={handleEventClick}
              />
            ) : (
              <CalendarView 
                events={events}
                onEventClick={handleEventClick}
              />
            )}
          </>
        )}
      </div>

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

Calendar.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Calendar;