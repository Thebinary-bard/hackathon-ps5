import React from 'react';
import StudentDashboardLayout from './StudentDashboardLayout';
import userProfile from './data/student/userProfile.json';
import graphData from './data/student/graph.json';
import pieWeightage from './data/student/pieWeightage.json';

const { mockUserData, portfolioProjects } = userProfile;

export default function StudentDashboardPage() {
  const { metrics } = mockUserData;
  const { weightagePercentages, maxValues } = pieWeightage;

  const rawAptFill = Math.min((metrics.aiAptitudeTest / maxValues.aiAptitudeTest) * weightagePercentages.aiAptitudeTest, weightagePercentages.aiAptitudeTest);
  const rawSkillsFill = Math.min((metrics.skillsEvaluated / maxValues.skillsEvaluated) * weightagePercentages.skills, weightagePercentages.skills);
  const rawCgpaFill = Math.min((metrics.cgpa / maxValues.cgpa) * weightagePercentages.cgpa, weightagePercentages.cgpa);
  
  const rawTotalScore = rawAptFill + rawSkillsFill + rawCgpaFill;
  const centralTaskScore = Math.round(rawTotalScore);

  // Proportional Scaling to completely fill the 100% pie chart visual
  const scaleFactor = rawTotalScore > 0 ? (100 / rawTotalScore) : 0;
  
  const aptFill = rawAptFill * scaleFactor;
  const skillsFill = rawSkillsFill * scaleFactor;
  const cgpaFill = rawCgpaFill * scaleFactor;

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
  return (
    <StudentDashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 shadow-sm border border-outline-variant/20 -mx-4 md:mx-0 animate-bounce-fade" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-container rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left relative z-10 gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0_40px_40px_-15px_rgba(0,24,73,0.06)] flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center bg-primary-fixed text-on-primary-fixed">
                <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
            </div>
            <div className="flex-1 mt-2">
              <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-2">{mockUserData.name}</h1>
              <p className="font-body text-on-surface-variant text-lg mb-4">{mockUserData.title}</p>
              <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                {mockUserData.tags.map((tag, i) => (
                  <span key={i} className={`px-4 py-1.5 rounded-full font-label text-xs font-semibold ${tag === 'Immediate' ? 'bg-[#e6f4ea] text-[#137333]' : 'bg-secondary-container text-on-secondary-container'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Graph Visualizer Area */}
            <div className="w-full md:w-72 mt-6 md:mt-0 relative group/graph cursor-pointer flex items-end">
              {/* Y-axis label */}
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
                </svg>
                {/* X-axis label */}
                <div className="w-full text-center mt-3 border-t border-outline-variant/30 pt-1">
                  <span className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest">Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest transition-colors duration-300 group animate-slide-down" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Task Score</h3>
            <div className="relative w-32 h-32 mx-auto mt-2">
              <svg className="w-full h-full transform -rotate-90 transition-transform duration-700 ease-in-out group-hover:scale-105" viewBox="0 0 36 36">
                {/* AI Aptitude Segment */}
                <path className="text-[#8da3ba] transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${aptFill} 100`} strokeDashoffset="0" strokeWidth="4"></path>

                {/* Skills Segment */}
                <path className="text-[#cc7a83] transition-all duration-1000 delay-300 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${skillsFill} 100`} strokeDashoffset={`-${aptFill}`} strokeWidth="4"></path>
                
                {/* CGPA Segment */}
                <path className="text-[#9ca893] transition-all duration-1000 delay-500 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${cgpaFill} 100`} strokeDashoffset={`-${aptFill + skillsFill}`} strokeWidth="4"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                <span className="font-headline text-3xl font-extrabold text-on-surface transition-transform drop-shadow-sm">{centralTaskScore}<span className="text-xl">%</span></span>
                <span className="font-body text-[10px] text-on-surface-variant uppercase tracking-widest leading-none mt-1">Score</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-8 text-xs px-2 animate-slide-down">
              <div className="flex justify-between items-center group/leg">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-[#8da3ba] shadow-sm transition-transform group-hover/leg:scale-125"></div><span className="font-body text-on-surface-variant font-medium">Aptitude Test</span></div>
                <span className="font-bold text-on-surface">{aptFill.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center group/leg">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-[#cc7a83] shadow-sm transition-transform group-hover/leg:scale-125"></div><span className="font-body text-on-surface-variant font-medium">Core Skills</span></div>
                <span className="font-bold text-on-surface">{skillsFill.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center group/leg">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-[#9ca893] shadow-sm transition-transform group-hover/leg:scale-125"></div><span className="font-body text-on-surface-variant font-medium">CGPA / DGPA</span></div>
                <span className="font-bold text-on-surface">{cgpaFill.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest hover:-translate-y-1 transition-all duration-300 animate-slide-down" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {mockUserData.skills.map((skill, i) => (
                <span key={i} className="bg-surface text-on-surface px-4 py-2 rounded-full font-body text-sm shadow-sm hover:bg-primary hover:text-on-primary hover:-translate-y-0.5 transition-all duration-200 cursor-default">{skill}</span>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest hover:-translate-y-1 transition-all duration-300 flex items-center justify-between animate-slide-down" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_display</span>
                </div>
                <div>
                  <h4 className="font-headline text-md font-bold text-on-surface">Intro Video</h4>
                  <p className="font-body text-sm text-on-surface-variant">Last updated: {mockUserData.resumeLastUpdated || '2 days ago'}</p>
                </div>
              </div>
              <a href="#" className="text-primary hover:text-primary-container font-body text-sm font-semibold transition-colors">Update / View</a>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl shadow-sm hover:bg-surface-container-lowest hover:-translate-y-1 transition-all duration-300 flex items-center justify-between animate-slide-down" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
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

          <div className="col-span-1 md:col-span-3 bg-surface-container-low p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,80,203,0.12)] transition-all duration-300">
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
