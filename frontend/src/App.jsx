import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import LandingPage from './LandingPage';
import AuthPage from './AuthPage';
import OAuthCallback from './OAuthCallback';
// Student Pages
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import StudentOpportunitiesPage from './pages/student/StudentOpportunitiesPage';
import StudentTasksOverview from './pages/student/StudentTasksOverview';
import StudentTaskDetailPage from './pages/student/StudentTaskDetailPage';
import StudentPracticeTasksPage from './pages/student/StudentPracticeTasksPage';
import StudentTaskSolvePage from './pages/student/StudentTaskSolvePage';
import StudentTaskSubmitPage from './pages/student/StudentTaskSubmitPage';
import StudentTaskResultPage from './pages/student/StudentTaskResultPage';
// Company Pages
import CompanyDashboardPage from './pages/company/CompanyDashboardPage';
import CompanyStudentMatchesPage from './pages/company/CompanyStudentMatchesPage';
import CompanyTasksDashboard from './pages/company/CompanyTasksDashboard';
import CompanySubmissionReviewPage from './pages/company/CompanySubmissionReviewPage';
import CompanyHiringDashboard from './pages/company/CompanyHiringDashboard';
// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
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
        
        {/* Company Routes */}
        <Route path="/company/dashboard" element={<CompanyDashboardPage />} />
        <Route path="/company/matches" element={<CompanyStudentMatchesPage />} />
        <Route path="/company/tasks" element={<CompanyTasksDashboard />} />
        <Route path="/company/reviews" element={<CompanySubmissionReviewPage />} />
        <Route path="/company/hiring" element={<CompanyHiringDashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}