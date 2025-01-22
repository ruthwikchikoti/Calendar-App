import React from 'react';
import PropTypes from 'prop-types';

function EventList({ events, onEventClick }) {
  const getEventStatus = (event) => {
    const now = new Date();
    const startDate = new Date(event.start.dateTime || event.start.date);
    const endDate = new Date(event.end.dateTime || event.end.date);

    if (endDate < now) {
      return { label: 'Completed', className: 'bg-gray-100 text-gray-800' };
    } else if (startDate > now) {
      return { label: 'Upcoming', className: 'bg-blue-100 text-blue-800' };
    } else {
      return { label: 'Ongoing', className: 'bg-green-100 text-green-800' };
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No events found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => {
            const status = getEventStatus(event);
            return (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${status.className}`}>
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {event.summary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(event.end.dateTime || event.end.date).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onEventClick(event)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default EventList; 