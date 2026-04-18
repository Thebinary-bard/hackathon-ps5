import React from 'react';
import StudentDashboardLayout from './StudentDashboardLayout';
import universalTasks from '../../data/student/tasks.json';
import { Link, useParams, Navigate } from 'react-router-dom';

export default function SubmitTaskPage() {
  const { id } = useParams();
  const task = universalTasks.find(t => t.id === id);

  if (!task) {
    return <Navigate to="/student/tasks" replace />;
  }

  return (
    <StudentDashboardLayout>
      <div className="w-full flex-1 relative overflow-y-auto transition-all duration-300">
        {/* Contextual Header */}
        <header className="sticky top-0 z-40 bg-surface/70 backdrop-blur-[24px] px-8 py-6 flex items-center justify-between border-b border-surface-variant/20">
          <div className="flex items-center gap-4">
            <Link to={`/student/tasks/${task.id}`} className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <h1 className="font-headline text-[2.5rem] leading-tight tracking-[-0.02em] text-on-surface font-bold">Submit Task</h1>
              <p className="font-body text-on-surface-variant mt-1 text-md">{task.company} - {task.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </header>

        <div className="px-8 pb-20 max-w-5xl mx-auto mt-8 flex flex-col gap-8">
          {/* Task Instructions Card */}
          <section className="bg-surface-container-low rounded-xl p-8 hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">description</span>
                <h2 className="font-headline text-2xl font-bold text-on-surface">Instructions</h2>
              </div>
              <div className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-label text-sm font-semibold">
                Due: {task.dueDate}
              </div>
            </div>
            <div className="font-body text-on-surface-variant space-y-4 leading-relaxed">
              <p>{task.description}</p>
              <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
                <li>Ensure all criteria align with standard best practices.</li>
                <li>Submit final assets through the workspace below.</li>
                <li>Include descriptive tags: {task.tags.join(', ')}</li>
              </ul>
              <p className="text-sm font-medium mt-4 text-on-surface">Resources:</p>
              <a className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-medium transition-colors" href="#">
                <span className="material-symbols-outlined text-lg">attach_file</span>
                {task.id}_assets.zip
              </a>
            </div>
          </section>

          {/* Workspace Area */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_40px_40px_-15px_rgba(0,24,73,0.06)]">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Your Solution</h2>
            <div className="space-y-6">
              {/* Submission Type Tabs (Visual only for layout) */}
              <div className="flex gap-4 mb-6">
                <button className="px-6 py-2 bg-surface-container-low text-on-surface rounded-full font-label text-sm font-medium hover:bg-surface-container transition-colors">
                  Paste URL
                </button>
                <button className="px-6 py-2 bg-surface-container-high text-on-surface rounded-full font-label text-sm font-semibold border-2 border-primary/10">
                  File Upload
                </button>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-outline-variant/30 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-surface-container-low transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">cloud_upload</span>
                <p className="font-headline text-lg font-semibold text-on-surface">Drag &amp; drop your zipped solution here</p>
                <p className="font-body text-sm text-on-surface-variant mt-2">or click to browse files (Max 50MB)</p>
              </div>

              {/* Additional Comments */}
              <div>
                <label className="block font-label text-sm font-medium text-on-surface mb-2">Additional Notes (Optional)</label>
                <textarea className="w-full bg-surface-container-low border-none rounded-xl p-4 font-body text-on-surface focus:bg-surface-container-lowest focus:ring-0 focus:outline focus:outline-2 focus:outline-primary/20 transition-all resize-none h-32" placeholder="Briefly explain your approach or any challenges faced..."></textarea>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-surface-variant/50">
                <button className="px-8 py-3 bg-transparent text-on-surface font-headline font-semibold rounded-xl hover:bg-surface-variant transition-colors">
                  Save Draft
                </button>
                <Link to={`/student/tasks`} onClick={() => alert("Task submitted successfully!")} className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  Submit Task
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
