import React, { useState } from 'react';
import StudentDashboardLayout from './StudentDashboardLayout';
import universalTasks from './data/student/tasks.json';
import solvedTasksData from './data/student/solvedTasks.json';
import { Link } from 'react-router-dom';

export default function StudentTasksOverview() {
  const activeTasks = universalTasks.filter(t => t.status !== "Completed");
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedTaskId(prev => prev === id ? null : id);
  };

  return (
    <StudentDashboardLayout>
      <div className="w-full max-w-5xl mx-auto transition-all duration-300">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-baseline gap-4 mb-2">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-headline font-extrabold tracking-[-0.02em] text-on-surface">Task Canvas</h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold uppercase tracking-wider">
              {activeTasks.length} Active
            </span>
          </div>
          <p className="text-lg text-on-surface-variant font-body max-w-2xl mt-4">Review your active assignments from industry partners and track your completed milestones. Curate your portfolio through applied experience.</p>
        </header>

        {/* Section: Tasks from Company */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">Active Tasks</h2>
            <button className="text-sm font-semibold text-primary hover:text-primary-container transition-colors flex items-center gap-1">
              Filter View <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>

          {/* Bento Grid Layout for Active Tasks */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {activeTasks.map(task => (
              <article key={task.id} className="bg-surface-container-low rounded-2xl p-8 hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300 group flex flex-col relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary-fixed/20 rounded-full blur-3xl group-hover:bg-primary-fixed/40 transition-colors z-0"></div>
                <div className="relative z-10 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary font-bold text-xl shadow-sm">
                        <span className="material-symbols-outlined">{task.companyLogoIcon}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-on-surface font-headline">{task.company}</h3>
                        <p className="text-xs text-on-surface-variant">{task.category}</p>
                      </div>
                    </div>
                    {task.dueDate && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-error-container text-on-error-container text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Due: {task.dueDate}
                      </span>
                    )}
                  </div>
                  <Link to={`/student/tasks/${task.id}`} className="block hover:underline mb-3">
                    <h4 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{task.title}</h4>
                  </Link>
                  <p className="text-sm text-on-surface-variant font-body line-clamp-2 mb-6">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {task.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 pt-4 border-t border-outline-variant/15 flex items-center justify-between">
                  <div className="text-sm text-on-surface-variant font-medium">
                    Points: <span className="text-on-surface">{task.points}</span>
                  </div>
                  <Link to={`/student/tasks/${task.id}`} className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center gap-2">
                    View Task <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section: Solved Tasks (Editorial List Style) */}
        <section>
          <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight mb-8">Solved Tasks</h2>
          <div className="space-y-4">
            {solvedTasksData.map(task => (
              <div key={task.id} className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm transition-all duration-300 border border-outline-variant/10">
                <div 
                  className="group hover:bg-surface-container-lowest p-4 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8"
                  onClick={() => toggleExpand(task.id)}
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">check_circle</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-headline font-bold text-on-surface">{task.title}</h4>
                        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${expandedTaskId === task.id ? 'rotate-180' : ''}`}>expand_more</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                        <span className="font-medium text-primary">{task.company}</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span>Completed {task.completedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-auto w-full border-t md:border-t-0 border-outline-variant/15 pt-4 md:pt-0" onClick={(e) => e.stopPropagation()}>
                    <div className="text-right">
                      <span className="block text-xs text-on-surface-variant font-medium mb-0.5">Evaluation</span>
                      <span className="text-lg font-headline font-bold text-tertiary">{task.metrics?.efficiency || "100%"}</span>
                    </div>
                    <Link to={`/student/tasks/${task.id}/result`} className="px-5 py-2 rounded-xl bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-variant transition-colors">
                      Results
                    </Link>
                  </div>
                </div>
                {/* Expandable Details Section */}
                <div className={`overflow-hidden transition-all duration-300 bg-surface-container-lowest border-t border-outline-variant/10 ${expandedTaskId === task.id ? 'max-h-96 opacity-100 p-6' : 'max-h-0 opacity-0 p-0'}`}>
                  <h5 className="font-headline font-semibold text-on-surface mb-2 text-sm">Reviewer Feedback</h5>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    "{task.details}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-24"></div>
      </div>
    </StudentDashboardLayout>
  );
}