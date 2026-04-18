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
      
      const fetchRole = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            const role = data.data.role;
            if (role === 'admin') {
              navigate('/admin/dashboard');
            } else if (role === 'business' || role === 'company') {
              navigate('/company/dashboard');
            } else {
              navigate('/student/dashboard');
            }
          } else {
            navigate('/auth');
          }
        } catch (error) {
          console.error('OAuth profile fetch failed:', error);
          navigate('/student/dashboard'); // Fallback
        }
      };
      fetchRole();
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
