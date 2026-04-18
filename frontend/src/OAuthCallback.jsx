import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      navigate('/student/dashboard');
    } else {
      navigate('/auth');
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-on-background">
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">Logging you in...</h2>
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
