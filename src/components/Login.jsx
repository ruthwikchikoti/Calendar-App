import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Check } from 'lucide-react';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            access_token: tokenResponse.access_token 
          }),
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setIsAuthenticated(true);
          navigate('/dashboard');
        } else {
          throw new Error(data.message || 'Authentication failed');
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    },
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    flow: 'implicit'
  });

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      title: "Seamless Integration",
      description: "Connect with your Google Calendar instantly and manage all your events from a single, unified dashboard"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Intelligent Search",
      description: "Locate any event instantly with our advanced search and smart filtering system"
    },
    {
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      title: "Flexible Views",
      description: "Switch seamlessly between multiple calendar views to visualize your schedule exactly how you want"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
       

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-xl p-8">
          {/* Left side - Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Why Choose Our Calendar App?
            </h2>
            
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Sign In */}
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Get Started Today
              </h2>
              <p className="text-gray-600">
                Sign in with Google to access your calendar
              </p>
            </div>

            <button
              onClick={() => login()}
              className="group relative px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              <span className="font-medium">Sign in with Google</span>
            </button>

            {/* Spacing div */}
            <div className="mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;