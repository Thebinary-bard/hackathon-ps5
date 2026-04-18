import React from 'react';
import StudentDashboardLayout from './StudentDashboardLayout';
import universalTasks from './data/student/tasks.json';
import { Link, useParams, Navigate } from 'react-router-dom';

export default function CompanyTasksDetail() {
  const { id } = useParams();
  const task = universalTasks.find(t => t.id === id);

  if (!task) {
    return <Navigate to="/student/tasks" replace />;
  }

  return (
    <StudentDashboardLayout>
      <div className="w-full max-w-5xl mx-auto transition-all duration-300">
        {/* Breadcrumb / Back Navigation */}
        <div className="flex items-center gap-2 mb-8 text-on-surface-variant font-body text-sm">
          <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/student/tasks">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Tasks
          </Link>
          <span>/</span>
          <span className="text-on-surface">{task.title}</span>
        </div>

        {/* Header Section */}
        <header className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-headline text-[3.5rem] leading-tight tracking-[-0.02em] font-extrabold text-on-surface mb-2">
                {task.title}
              </h1>
              <div className="flex items-center gap-4 text-on-surface-variant font-body mt-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">{task.companyLogoIcon}</span>
                  <span className="font-medium text-on-surface">{task.company}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <span>Due: {task.dueDate || "Flexible"}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-semibold">
                  {task.complexity}
                </span>
              </div>
            </div>
            {/* Company Logo Abstractly placed */}
            <div className="w-20 h-20 bg-surface flex items-center justify-center ambient-shadow overflow-hidden rounded-xl border border-outline-variant/20 shadow-sm text-primary">
              <span className="material-symbols-outlined text-5xl">{task.companyLogoIcon}</span>
            </div>
          </div>
        </header>

        {/* Bento Grid Layout for Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Description (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <section className="bg-surface-container-low rounded-[2rem] p-8 hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300">
              <h2 className="font-headline text-2xl font-bold mb-6 text-on-surface">Task Overview</h2>
              <div className="font-body text-on-surface-variant space-y-4 leading-relaxed">
                <p>{task.description}</p>
                <h3 className="font-headline text-lg font-semibold text-on-surface mt-6 mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Analyze the provided information thoroughly.</li>
                  <li>Incorporate all tags: {task.tags.join(', ')}.</li>
                  <li>Deliver final output by the discussed timeline.</li>
                </ul>
              </div>
            </section>

            {/* Required Skills Card */}
            <section className="bg-surface-container-low rounded-[2rem] p-8 hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300">
              <h2 className="font-headline text-2xl font-bold mb-6 text-on-surface">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {task.tags.map(tag => (
                  <span key={tag} className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-sm font-medium">{tag}</span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Meta info & Action */}
          <div className="space-y-8">
            {/* Action Card */}
            <section className="bg-surface-container-lowest rounded-[2rem] p-8 ambient-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full opacity-50 z-0"></div>
              <h3 className="font-headline text-xl font-bold mb-2 text-on-surface relative z-10">Ready to begin?</h3>
              <p className="font-body text-sm text-on-surface-variant mb-6 relative z-10">Earn {task.points} points upon completion.</p>
              <Link to={`/student/tasks/${task.id}/solve`} className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative z-10 flex justify-center items-center">
                Start Task
              </Link>
              <div className="mt-4 text-center z-10 relative">
                <button className="text-primary font-body text-sm font-medium hover:text-primary-container transition-colors bg-transparent border-none">
                  Save for later
                </button>
              </div>
            </section>

            {/* Company Info Card */}
            <section className="bg-surface-container-low rounded-[2rem] p-6 hover:bg-surface-container-lowest transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-surface-container-highest overflow-hidden mb-4 border-4 border-surface shadow-sm flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl">{task.companyLogoIcon}</span>
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">{task.company}</h3>
              <p className="font-body text-xs text-on-surface-variant mb-4">{task.category} Department</p>
              <a className="text-primary font-body text-sm font-medium hover:underline" href="#">View Company Profile</a>
            </section>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}