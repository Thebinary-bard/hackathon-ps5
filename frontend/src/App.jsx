import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import LandingPage from './LandingPage';
import AuthPage from './AuthPage';
import StudentDashboardPage from './StudentDashboardPage';
import StudentOpportunitiesPage from './StudentOpportunitiesPage';
import StudentTasksOverview from './StudentTasksOverview';
import StudentTaskSubmitPage from './StudentTaskSubmitPage';
import StudentTaskSolvePage from './StudentTaskSolvePage';
import StudentPracticeTasksPage from './StudentPracticeTasksPage';
import StudentTaskDetailPage from './StudentTaskDetailPage';
import StudentTaskResultPage from './StudentTaskResultPage';
import CompanyDashboardPage from './CompanyDashboardPage';
import CompanyStudentMatchesPage from './CompanyStudentMatchesPage';
import CompanyTasksDashboard from './CompanyTasksDashboard';
import CompanySubmissionReviewPage from './CompanySubmissionReviewPage';
import CompanyHiringDashboard from './CompanyHiringDashboard';
import OAuthCallback from './OAuthCallback';
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
        <Route path="/oauth-success" element={<OAuthCallback />} />
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />
        <Route path="/student/opportunities" element={<StudentOpportunitiesPage />} />
        <Route path="/student/tasks" element={<StudentTasksOverview />} />
        <Route path="/student/tasks/:id" element={<StudentTaskDetailPage />} />
        <Route path="/student/practice" element={<StudentPracticeTasksPage />} />
        <Route path="/student/tasks/:id/solve" element={<StudentTaskSolvePage />} />
        <Route path="/student/tasks/:id/submit" element={<StudentTaskSubmitPage />} />
        <Route path="/student/tasks/:id/result" element={<StudentTaskResultPage />} />
        
        <Route path="/company/dashboard" element={<CompanyDashboardPage />} />
        <Route path="/company/matches" element={<CompanyStudentMatchesPage />} />
        <Route path="/company/tasks" element={<CompanyTasksDashboard />} />
        <Route path="/company/reviews" element={<CompanySubmissionReviewPage />} />
        <Route path="/company/hiring" element={<CompanyHiringDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}