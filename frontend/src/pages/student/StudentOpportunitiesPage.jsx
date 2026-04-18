import React from 'react';
import StudentDashboardLayout from './StudentDashboardLayout';
import jobOpportunities from '../../data/student/opportunities.json';


export default function StudentOpportunitiesPage() {
  return (
    <StudentDashboardLayout>
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="font-headline text-[3.5rem] leading-tight tracking-[-0.02em] text-on-background font-extrabold">Discover Roles</h1>
          <p className="text-on-surface-variant mt-2 text-lg">Curated opportunities matching your unique profile.</p>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
            <input className="bg-surface-container-low text-on-surface placeholder-on-surface-variant pl-12 pr-4 py-3 rounded-full w-64 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-outline-variant/15 transition-all" placeholder="Search roles..." type="text"/>
          </div>
          <button className="bg-surface-container-low text-on-surface p-3 rounded-full hover:bg-surface-container-lowest transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {jobOpportunities.map(job => (
          <article key={job.id} className="bg-surface-container-low rounded-xl p-8 hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300 relative group overflow-hidden flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-sm flex items-center justify-center relative z-10">
                  {job.logoImage ? (
                    <img alt={job.logoAlt} className="w-full h-full object-contain" src={job.logoImage} />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-primary">{job.logoIcon}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-background">{job.title}</h3>
                  <p className="text-on-surface-variant text-sm">{job.company} • {job.location}</p>
                </div>
              </div>
              <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">bolt</span> {job.matchPercentage}% Match 
              </div>
            </div>
            
            <p className="text-on-surface-variant mb-6 text-sm leading-relaxed flex-grow">
              {job.description}
            </p>
            
            <div className="mb-8">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <span key={skill} className="bg-surface px-3 py-1 rounded-full text-xs text-on-surface">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-outline-variant/15 pt-4">
              <span className="text-sm font-semibold text-on-background">{job.salaryStr}</span>
              <button className="text-primary font-semibold text-sm hover:text-primary-container transition-colors flex items-center gap-1"> 
                View Details <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"></div>
          </article>
        ))}
      </div>
    </StudentDashboardLayout>
  );
}
