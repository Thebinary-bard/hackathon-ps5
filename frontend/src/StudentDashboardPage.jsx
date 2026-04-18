import React from 'react';
import StudentDashboardLayout from './StudentDashboardLayout';
import userProfile from './data/userProfile.json';
const { mockUserData, portfolioProjects } = userProfile;



export default function StudentDashboardPage() {
  return (
    <StudentDashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between border-b border-surface-container-high pb-6 items-start">
          <div>
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary/10">
              <div className="w-full h-full flex items-center justify-center bg-primary-fixed text-on-primary-fixed">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
            </div>
            <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tight">{mockUserData.name}</h1>
            <p className="font-body text-lg text-on-surface-variant mt-2">{mockUserData.title}</p>
          </div>
          <div className="flex space-x-3">
            {mockUserData.tags.map((tag, i) => (
              <span key={i} className={`px-4 py-1.5 rounded-full font-body text-sm font-medium ${tag === 'Immediate' ? 'bg-[#e6f4ea] text-[#137333]' : 'bg-secondary-container text-on-secondary-container'}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest transition-colors duration-300 group">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Trust Score</h3>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="3.8"></path>
                <path className="text-primary" d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`} fill="none" stroke="currentColor" strokeDasharray={`${mockUserData.trustScore}, 100`} strokeLinecap="round" strokeWidth="3.8"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline text-3xl font-extrabold text-on-surface group-hover:scale-110 transition-transform">{mockUserData.trustScore}</span>
                <span className="font-body text-xs text-on-surface-variant">/100</span>
              </div>
            </div>
            <p className="font-body text-sm text-center text-on-surface-variant mt-4">{mockUserData.percentile}</p>
          </div>

          <div className="col-span-1 md:col-span-2 bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest transition-colors duration-300">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {mockUserData.skills.map((skill, i) => (
                <span key={i} className="bg-surface text-on-surface px-4 py-2 rounded-full font-body text-sm shadow-sm">{skill}</span>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest transition-colors duration-300 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                </div>
                <div>
                  <h4 className="font-headline text-md font-bold text-on-surface">Resume</h4>
                  <p className="font-body text-sm text-on-surface-variant">Last updated: {mockUserData.resumeLastUpdated}</p>
                </div>
              </div>
              <a href={mockUserData.resumeLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-container font-body text-sm font-semibold transition-colors">Update / View</a>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest transition-colors duration-300 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#24292e]/10 rounded-full flex items-center justify-center text-[#24292e]">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <div>
                  <h4 className="font-headline text-md font-bold text-on-surface">GitHub Profile</h4>
                  <p className="font-body text-sm text-on-surface-variant">github.com/{mockUserData.githubUsername}</p>
                </div>
              </div>
              <a href={mockUserData.githubLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-container font-body text-sm font-semibold transition-colors">View</a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 bg-surface-container-low p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-lg font-bold text-on-surface">Portfolio Highlights</h3>
              <button className="flex items-center space-x-1 text-primary hover:text-primary-container font-body text-sm font-semibold transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioProjects.map(project => {
                if (project.isUpload) {
                  return (
                    <a key={project.id} href={project.link} className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer flex items-center justify-center bg-surface-container border border-dashed border-outline-variant hover:bg-surface-container-highest transition-colors">
                      <span className="material-symbols-outlined text-outline text-3xl">upload_file</span>
                    </a>
                  );
                }
                return (
                  <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer block">
                    <img alt={project.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={project.image} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="font-headline text-white font-semibold">{project.title}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
