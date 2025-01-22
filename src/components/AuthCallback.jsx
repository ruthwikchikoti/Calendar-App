import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthCallback({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    if (error) {
      console.error('Auth error:', error);
      navigate('/?error=auth_failed');
      return;
    }

    if (code && state) {
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [searchParams, navigate, setIsAuthenticated]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default AuthCallback;