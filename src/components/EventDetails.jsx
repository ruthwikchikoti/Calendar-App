import React from 'react';
import PropTypes from 'prop-types';

function EventDetails({ event, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{event.summary}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {event.description || 'N/A'}
                </p>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {event.location ? (
                  <div>
                    <p className="text-gray-700 mb-2">{event.location}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                      View on Maps
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-700">N/A</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EventDetails.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EventDetails; 