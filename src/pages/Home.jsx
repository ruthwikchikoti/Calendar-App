import PropTypes from 'prop-types';
import Login from '../components/Login';

function Home({ setIsAuthenticated }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      {/* Hero Section - Reduced vertical padding */}
      <div className="relative">
        <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Manage Your Calendar
              <span className="block text-blue-600">With Elegance</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Connect your Google Calendar and experience a new level of productivity with our intuitive interface and powerful scheduling features.
            </p>
          </div>
        </div>
      </div>

      {/* Login Section - Adjusted margins */}
      <div>
        <Login setIsAuthenticated={setIsAuthenticated} />
      </div>
    </div>
  );
}

Home.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Home;