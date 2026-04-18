import React from 'react';
import StudentDashboardLayout from './StudentDashboardLayout';
import universalTasks from './data/student/tasks.json';
import { Link, useParams, Navigate } from 'react-router-dom';

export default function TaskResultPage() {
  const { id } = useParams();
  const task = universalTasks.find(t => t.id === id);

  if (!task) {
    return <Navigate to="/student/tasks" replace />;
  }

  return (
    <StudentDashboardLayout>
      <div className="w-full flex-1 relative overflow-y-auto min-h-screen bg-surface px-8 md:px-16 py-12 flex flex-col items-center">
        {/* Header */}
        <header className="mb-16 max-w-4xl w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6 font-label">
            <span className="material-symbols-outlined text-[14px]">task_alt</span>
            Task Evaluation
          </div>
          <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tighter leading-tight mb-4">
            {task.title}
          </h1>
          <p className="text-on-surface-variant font-body text-lg max-w-2xl leading-relaxed">
            Your submission for the {task.category} challenge has been evaluated. Review your performance metrics and direct feedback below.
          </p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl w-full">
          {/* Score Card */}
          <div className="col-span-1 md:col-span-12 lg:col-span-5 bg-surface-container-low rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container-lowest hover:shadow-[0_40px_40px_-15px_rgba(0,24,73,0.06)] hover:scale-[1.01] transition-all duration-300">
            <div className="absolute -right-12 -top-12 opacity-[0.03] text-primary transition-transform group-hover:scale-110 duration-500">
              <span className="material-symbols-outlined text-[240px]">grade</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-headline text-on-surface-variant text-sm font-bold tracking-widest uppercase mb-8">Overall Task Score</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-8xl font-black text-primary tracking-tighter">{task.metrics?.efficiency ? "98" : "94"}</span>
                <span className="font-headline text-3xl font-bold text-outline">/100</span>
              </div>
            </div>
            <div className="mt-12 flex items-center gap-4 relative z-10">
              <div className="h-2 flex-1 bg-surface-variant rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-primary to-primary-container rounded-full w-[94%]`}></div>
              </div>
              <span className="font-body text-xs font-semibold text-primary">Top 5%</span>
            </div>
          </div>

          {/* Approval Status Card */}
          <div className="col-span-1 md:col-span-12 lg:col-span-7 bg-surface-container-lowest rounded-2xl p-10 flex flex-col md:flex-row items-start md:items-center justify-between shadow-[0_20px_40px_-15px_rgba(0,24,73,0.03)] border-l-4 border-primary gap-6">
            <div>
              <h3 className="font-headline text-on-surface-variant text-sm font-bold tracking-widest uppercase mb-2">Company Status</h3>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <div>
                  <span className="block font-headline text-4xl font-extrabold text-on-surface">Approved</span>
                  <span className="block text-on-surface-variant text-sm mt-1">Ready for next steps in roadmap</span>
                </div>
              </div>
            </div>
            <div className="text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-6 md:pt-0 border-outline-variant/30">
              <p className="text-sm text-on-surface-variant mb-2">Evaluated by</p>
              <div className="flex items-center md:justify-end gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary text-xl font-bold">
                  <span className="material-symbols-outlined">{task.companyLogoIcon}</span>
                </div>
                <div className="text-left">
                  <p className="font-headline font-bold text-on-surface">{task.company}</p>
                  <p className="text-xs text-on-surface-variant">{task.category}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="col-span-1 md:col-span-12 bg-surface-container-low rounded-2xl p-8 md:p-12 hover:bg-surface-container-lowest hover:shadow-[0_40px_40px_-15px_rgba(0,24,73,0.04)] transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <span className="material-symbols-outlined text-5xl text-primary/20">format_quote</span>
              <div className="flex-1">
                <h3 className="font-headline text-on-surface font-bold text-xl mb-6">Direct Feedback</h3>
                <div className="prose prose-lg text-on-surface-variant font-body leading-relaxed max-w-none space-y-6">
                  <p>{task.feedback || "Excellent execution on the core user flows. Your solution met all the requirements perfectly."}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-surface-container-highest text-on-surface text-sm font-semibold rounded-full font-label">Great Execution</span>
                  <span className="px-4 py-2 bg-surface-container-highest text-on-surface text-sm font-semibold rounded-full font-label">Highly Recommended</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}