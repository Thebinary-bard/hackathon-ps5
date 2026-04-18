import React, { useState, useEffect } from 'react';
import StudentDashboardLayout from './StudentDashboardLayout';
import initialUserProfile from '../../data/student/userProfile.json';
import graphData from '../../data/student/graph.json';

const { mockUserData: initialMockData, portfolioProjects: initialPortfolio } = initialUserProfile;

export default function StudentDashboardPage() {
  const [userData, setUserData] = useState(initialMockData);
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', link: '' });
  const [tempLinks, setTempLinks] = useState({ githubUsername: '', githubLink: '', introVideoLink: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          // Merge API data with JSON fallbacks — never blank the UI
          setUserData(prev => ({
            ...prev,
            ...data.data,
            overallScore: data.data.overallScore ?? data.data.trustScore ?? prev.trustScore ?? 0,
            skills: (data.data.skills?.length > 0 ? data.data.skills : prev.skills),
            tags: (data.data.tags?.length > 0 ? data.data.tags : prev.tags),
          }));
          // Only replace portfolio if API actually returned items
          if (data.data.portfolio?.length > 0) {
            setPortfolio(data.data.portfolio);
          }
          setTempLinks({
            githubUsername: data.data.githubUsername || '',
            githubLink: data.data.githubLink || '',
            introVideoLink: data.data.introVideoLink || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        // keep JSON fallback already in state
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProject)
      });
      const data = await response.json();
      if (data.success) {
        setPortfolio([...portfolio, data.data.portfolio[data.data.portfolio.length - 1]]);
        setShowModal(false);
        setNewProject({ title: '', description: '', link: '' });
      }
    } catch (error) {
      console.error('Failed to add portfolio item:', error);
    }
  };

  const handleLinksUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tempLinks)
      });
      const data = await response.json();
      if (data.success) {
        setUserData(data.data);
        setShowLinksModal(false);
      }
    } catch (error) {
      console.error('Failed to update profile links:', error);
    }
  };

  const { performanceHistory } = graphData;
  const maxVal = Math.max(...performanceHistory);
  const minVal = Math.min(...performanceHistory);
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;
  
  const points = performanceHistory.map((val, i) => {
      const x = (i / (performanceHistory.length - 1)) * 100;
      const y = 80 - (((val - minVal) / range) * 80);
      return `${x},${y}`;
  }).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  const n = performanceHistory.length;
  // Simple smoothing calculation measuring delta from start to end
  const startAvg = n > 1 ? (performanceHistory[0] + performanceHistory[1]) / 2 : performanceHistory[0];
  const endAvg = n > 1 ? (performanceHistory[n-2] + performanceHistory[n-1]) / 2 : performanceHistory[0];
  const diff = endAvg - startAvg;
  const trendText = diff > 5 ? "INCREASING" : diff < -5 ? "DECREASING" : "STEADY";
  const trendColor = trendText === "INCREASING" ? "text-primary" : trendText === "DECREASING" ? "text-error" : "text-on-surface-variant";
  
  if (loading) {
    return (
      <StudentDashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      </StudentDashboardLayout>
    );
  }

  return (
    <StudentDashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 shadow-sm border border-outline-variant/20 -mx-4 md:mx-0">
          <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-container rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left relative z-10 gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_40px_40px_-15px_rgba(0,24,73,0.06)] flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center bg-primary-fixed text-on-primary-fixed">
                <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
            </div>
            <div className="flex-1 mt-2">
              <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-2">{userData.name}</h1>
              <p className="font-body text-on-surface-variant text-lg mb-4">{userData.title || 'Aspiring Professional'}</p>
              <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                {(userData.tags || ['Immediate']).map((tag, i) => (
                  <span key={i} className={`px-4 py-1.5 rounded-full font-label text-xs font-semibold ${tag === 'Immediate' ? 'bg-[#e6f4ea] text-[#137333]' : 'bg-secondary-container text-on-secondary-container'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Graph Visualizer Area */}
            <div className="w-full md:w-72 mt-6 md:mt-0 relative group/graph cursor-pointer flex items-end">
              <div className="flex flex-col justify-center items-center mr-3 h-24">
                <span className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Skill</span>
              </div>
              <div className="flex-1 flex flex-col relative h-32 justify-end pt-8">
                <div className="flex justify-between items-center mb-2 w-full text-[10px] font-bold text-on-surface-variant font-label uppercase tracking-widest absolute top-0 left-0 drop-shadow-sm z-10">
                  <span>Performance</span>
                  <span className={`${trendColor} group-hover/graph:-translate-y-0.5 transition-transform`}>{trendText}</span>
                </div>
                <svg className="w-full h-16 drop-shadow-sm overflow-visible text-primary" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="currentColor" stopOpacity="0.25"/>
                       <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <polygon fill="url(#gradientArea)" points={areaPoints} className="transition-all duration-1000 ease-out" />
                  <polyline fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} vectorEffect="non-scaling-stroke" className="group-hover/graph:stroke-[4] transition-all duration-300"/>
                  <circle cx="100" cy={80 - (((performanceHistory[performanceHistory.length-1] - minVal) / range) * 80)} r="4" fill="currentColor" stroke="var(--surface-container-lowest)" strokeWidth="1.5" className="transform origin-center hover:scale-125 transition-transform duration-300"/>
                </svg>
                <div className="w-full text-center mt-3 border-t border-outline-variant/30 pt-1">
                  <span className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest">Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest transition-colors duration-300 group">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Trust Score</h3>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="3.8"></path>
                <path className="text-primary" d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`} fill="none" stroke="currentColor" strokeDasharray={`${userData.overallScore ?? userData.trustScore ?? 0}, 100`} strokeLinecap="round" strokeWidth="3.8"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline text-3xl font-extrabold text-on-surface group-hover:scale-110 transition-transform">{userData.overallScore ?? userData.trustScore ?? 0}</span>
                <span className="font-body text-xs text-on-surface-variant">/100</span>
              </div>
            </div>
            <p className="font-body text-sm text-center text-on-surface-variant mt-4">Top {100 - (userData.overallScore ?? userData.trustScore ?? 0)}% of candidates</p>
          </div>

          <div className="col-span-1 md:col-span-2 bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest transition-colors duration-300">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(userData.skills || []).map((skill, i) => (
                <span key={i} className="bg-surface text-on-surface px-4 py-2 rounded-full font-body text-sm shadow-sm">{typeof skill === 'string' ? skill : skill.name}</span>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest transition-colors duration-300 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_display</span>
                </div>
                <div>
                  <h4 className="font-headline text-md font-bold text-on-surface">Intro Video</h4>
                  <p className="font-body text-sm text-on-surface-variant">Last updated: {userData.resumeLastUpdated || 'Recently'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {userData.introVideoLink && (
                  <a href={userData.introVideoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-semibold transition-colors">View</a>
                )}
                <button 
                  onClick={() => setShowLinksModal(true)}
                  className="text-primary hover:text-primary-container font-body text-sm font-semibold transition-colors"
                >Update</button>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest transition-colors duration-300 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#24292e]/10 rounded-full flex items-center justify-center text-[#24292e]">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <div>
                  <h4 className="font-headline text-md font-bold text-on-surface">GitHub Profile</h4>
                  <p className="font-body text-sm text-on-surface-variant">{userData.githubUsername || 'Not linked'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {userData.githubLink && (
                  <a href={userData.githubLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-semibold transition-colors">View</a>
                )}
                <button 
                  onClick={() => setShowLinksModal(true)}
                  className="text-primary hover:text-primary-container font-body text-sm font-semibold transition-colors"
                >Update</button>
              </div>
            </div>
          </div>
...
      {/* Links Update Modal */}
      {showLinksModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl p-8 w-full max-w-md shadow-2xl border border-outline-variant/20">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Update Profile Links</h2>
            <form onSubmit={handleLinksUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1">GitHub Username</label>
                <input 
                  value={tempLinks.githubUsername}
                  onChange={e => setTempLinks({...tempLinks, githubUsername: e.target.value})}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-primary focus:outline-none" 
                  placeholder="aarav_coder" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1">GitHub Link</label>
                <input 
                  value={tempLinks.githubLink}
                  onChange={e => setTempLinks({...tempLinks, githubLink: e.target.value})}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-primary focus:outline-none" 
                  placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1">Intro Video Link</label>
                <input 
                  value={tempLinks.introVideoLink}
                  onChange={e => setTempLinks({...tempLinks, introVideoLink: e.target.value})}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-primary focus:outline-none" 
                  placeholder="https://youtube.com/..." />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowLinksModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold bg-surface-container-highest text-on-surface"
                >Cancel</button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl font-bold bg-primary text-on-primary shadow-lg shadow-primary/20"
                >Update Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

          <div className="col-span-1 md:col-span-3 bg-surface-container-low p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-lg font-bold text-on-surface">Portfolio Highlights</h3>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-1 text-primary hover:text-primary-container font-body text-sm font-semibold transition-colors"
                >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer block border border-outline-variant/10"
                  style={project.image ? {
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : {
                    background: 'linear-gradient(135deg, var(--surface-container-low), var(--surface-container-highest))'
                  }}
                >
                  {project.isUpload && !project.image ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-on-surface-variant group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                      <p className="font-body text-sm font-semibold">Upload Project</p>
                    </div>
                  ) : (
                    <div className="w-full h-full p-4 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-headline text-white font-semibold text-lg drop-shadow">{project.title}</p>
                      {project.description && <p className="font-body text-white/80 text-sm line-clamp-2 drop-shadow">{project.description}</p>}
                    </div>
                  )}
                  {/* Always show title bar at bottom */}
                  {!project.isUpload && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                      <p className="font-headline text-white font-semibold text-sm drop-shadow truncate">{project.title}</p>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl p-8 w-full max-w-md shadow-2xl border border-outline-variant/20">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Add New Project</h2>
            <form onSubmit={handlePortfolioSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1">Project Title</label>
                <input 
                  required
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-primary focus:outline-none" 
                  placeholder="e.g. AI SaaS Platform" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1">Description</label>
                <textarea 
                  required
                  value={newProject.description}
                  onChange={e => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-primary focus:outline-none h-24" 
                  placeholder="What did you build?" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1">Project link</label>
                <input 
                  value={newProject.link}
                  onChange={e => setNewProject({...newProject, link: e.target.value})}
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-primary focus:outline-none" 
                  placeholder="https://..." />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold bg-surface-container-highest text-on-surface"
                >Cancel</button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl font-bold bg-primary text-on-primary shadow-lg shadow-primary/20"
                >Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </StudentDashboardLayout>
  );
}
