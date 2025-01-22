import React from 'react';

function CalendarView({ events, onEventClick }) {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getEventsForDay = (date) => {
    if (!date) return [];
    return events.filter(event => {
      const eventStart = new Date(event.start.dateTime || event.start.date);
      const eventEnd = new Date(event.end.dateTime || event.end.date);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      return eventStart <= dayEnd && eventEnd >= dayStart;
    });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Week day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="bg-white h-32" />;
          }

          const dayEvents = getEventsForDay(date);
          const isToday = date.toDateString() === now.toDateString();
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

          return (
            <div
              key={date.toISOString()}
              className={`bg-white p-2 h-32 overflow-hidden ${
                isToday ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  isToday ? 'font-bold text-blue-600' :
                  !isCurrentMonth ? 'text-gray-400' :
                  'text-gray-700'
                }`}>
                  {date.getDate()}
                </span>
              </div>
              <div className="mt-1 space-y-1 overflow-y-auto max-h-24">
                {dayEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className="block w-full text-left px-2 py-1 text-xs rounded bg-blue-50 hover:bg-blue-100 truncate"
                  >
                    {new Date(event.start.dateTime || event.start.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {event.summary}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarView; 