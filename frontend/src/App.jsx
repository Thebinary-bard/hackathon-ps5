import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage';
import AuthPage from './AuthPage';
import StudentDashboardPage from './StudentDashboardPage';
import StudentOpportunitiesPage from './StudentOpportunitiesPage';
import StudentTasksOverview from './StudentTasksOverview';
import StudentTaskDetailPage from './StudentTaskDetailPage';
import StudentTaskSolvePage from './StudentTaskSolvePage';
import StudentTaskResultPage from './StudentTaskResultPage';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />
        <Route path="/student/opportunities" element={<StudentOpportunitiesPage />} />
        <Route path="/student/tasks" element={<StudentTasksOverview />} />
        <Route path="/student/tasks/:id" element={<StudentTaskDetailPage />} />
        <Route path="/student/tasks/:id/solve" element={<StudentTaskSolvePage />} />
        <Route path="/student/tasks/:id/result" element={<StudentTaskResultPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}
