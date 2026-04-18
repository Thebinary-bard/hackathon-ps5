import React from 'react';
import StudentDashboardLayout from './StudentDashboardLayout';
import universalTasks from '../../data/student/tasks.json';
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';

export default function TaskResultPage() {
  const { id } = useParams();
  const location = useLocation();
  const task = universalTasks.find(t => t.id === id) || (id === "PRC-101" ? { title: "Algorithm Refinement" } : null);
  const result = location.state?.result;

  if (!task) {
    return <Navigate to="/student/tasks" replace />;
  }

  // Use real data from result if available, otherwise fallback
  const overallScore = result?.trustScore?.trustScore || 94;
  const behaviorScore = result?.behaviorScore || 82;
  const insights = result?.insights || ["Quick to start and decisive", "Iterative and improves work"];
  const breakdown = result?.trustScore?.breakdown || { execution: 85, communication: 70, adaptability: 90, reliability: 88 };
  const insightText = result?.trustScore?.insight || "Strong executor, slightly slow in communication";

  return (
    <StudentDashboardLayout>
      <div className="w-full flex-1 relative overflow-y-auto min-h-screen bg-surface px-8 md:px-16 py-12 flex flex-col items-center">
        {/* Header */}
        <header className="mb-16 max-w-4xl w-full text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6 font-label">
            <span className="material-symbols-outlined text-[14px]">task_alt</span>
            Task Evaluation
          </div>
          <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tighter leading-tight mb-4">
            {task.title}
          </h1>
          <p className="text-on-surface-variant font-body text-lg max-w-2xl leading-relaxed">
            Your submission has been evaluated by our transparency engine. Review your core performance metrics below.
          </p>
        </header>

        {/* Evaluation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl w-full">
          {/* Trust Score Card */}
          <div className="col-span-1 md:col-span-12 lg:col-span-5 bg-surface-container-low rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container-lowest hover:shadow-[0_40px_40px_-15px_rgba(0,24,73,0.06)] hover:scale-[1.01] transition-all duration-300">
            <div className="absolute -right-12 -top-12 opacity-[0.03] text-primary transition-transform group-hover:scale-110 duration-500">
              <span className="material-symbols-outlined text-[240px]">verified_user</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-headline text-on-surface-variant text-sm font-bold tracking-widest uppercase mb-8">Trust Score</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-8xl font-black text-primary tracking-tighter">{overallScore}</span>
                <span className="font-headline text-3xl font-bold text-outline">/100</span>
              </div>
            </div>
            <div className="mt-12 flex items-center gap-4 relative z-10">
              <div className="h-2 flex-1 bg-surface-variant rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-primary to-primary-container rounded-full`} style={{ width: `${overallScore}%` }}></div>
              </div>
              <span className="font-body text-xs font-semibold text-primary">Top 5%</span>
            </div>
          </div>

          {/* Behavior Logic Card */}
          <div className="col-span-1 md:col-span-12 lg:col-span-7 bg-surface-container-low rounded-2xl p-10 shadow-sm border border-outline-variant/10">
             <h3 className="font-headline text-on-surface-variant text-sm font-bold tracking-widest uppercase mb-8">Behavioral Breakdown</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {Object.entries(breakdown).map(([key, value]) => (
                  <div key={key} className="flex flex-col items-center">
                    <span className="text-2xl font-black text-on-surface tracking-tighter">{value}%</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{key}</span>
                  </div>
                ))}
             </div>
             <div className="bg-primary-container/10 p-6 rounded-xl border border-primary/20">
                <h4 className="font-headline font-bold text-primary text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  AI Insight
                </h4>
                <p className="text-on-surface font-body leading-relaxed">{insightText}</p>
             </div>
          </div>

          {/* Feedback & Behavior Score Section */}
          <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-surface-container-low rounded-2xl p-8 md:p-12 hover:bg-surface-container-lowest hover:shadow-[0_40px_40px_-15px_rgba(0,24,73,0.04)] transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <span className="material-symbols-outlined text-5xl text-primary/20">monitoring</span>
              <div className="flex-1">
                <h3 className="font-headline text-on-surface font-bold text-xl mb-6">Process Evaluation</h3>
                <div className="space-y-4">
                  {insights.map((insight, i) => (
                    <div key={i} className="flex items-center gap-4 bg-surface rounded-xl p-4 border border-outline-variant/10">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-xl">done_all</span>
                      </div>
                      <p className="text-on-surface-variant font-body">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-12 lg:col-span-4 bg-primary text-on-primary rounded-2xl p-10 flex flex-col justify-center items-center text-center">
              <h3 className="font-headline font-bold text-xl mb-2">Behavior Score</h3>
              <div className="text-6xl font-black mb-4">{behaviorScore}</div>
              <p className="opacity-80 text-sm font-body">Reflects your efficiency and decisiveness during the task session.</p>
              <Link to="/student/dashboard" className="mt-8 bg-on-primary text-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
                Return to Dashboard
              </Link>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}