import React, { useState, useEffect } from 'react';
import CompanyDashboardLayout from './CompanyDashboardLayout';
import initialMatches from '../../data/company/potentialMatchStudents.json';

// ── Student Profile Modal ─────────────────────────────────────────────────────
function StudentProfileModal({ student, onClose }) {
  if (!student) return null;

  const superpowerIcon =
    student.superpower?.includes('fast') ? 'bolt'
    : student.superpower?.includes('pressure') ? 'diamond'
    : 'psychiatry';

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface w-full md:max-w-3xl max-h-[92vh] md:max-h-[90vh] rounded-t-3xl md:rounded-2xl overflow-y-auto shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Hero Banner ── */}
        <div className="relative h-36 bg-gradient-to-br from-primary to-primary-container overflow-hidden rounded-t-3xl md:rounded-t-2xl flex-shrink-0">
          <div className="absolute inset-0 opacity-10">
            <div className="w-64 h-64 rounded-full bg-white absolute -top-16 -right-16" />
            <div className="w-40 h-40 rounded-full bg-white absolute top-8 -left-10" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* ── Avatar + Name ── */}
        <div className="px-8 pb-2 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <img
              src={student.imageUrl || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
              alt={student.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-surface shadow-xl flex-shrink-0"
            />
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h2 className="font-headline text-2xl font-extrabold text-on-surface">{student.name}</h2>
                {student.superpower && (
                  <span className="inline-flex items-center gap-1 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[12px]">{superpowerIcon}</span>
                    {student.superpower}
                  </span>
                )}
              </div>
              <p className="font-body text-on-surface-variant text-sm -mt-0.5">{student.role}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(student.tags || []).map((tag, i) => (
                  <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold ${tag === 'Immediate' ? 'bg-[#e6f4ea] text-[#137333]' : 'bg-secondary-container text-on-secondary-container'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Match score badge */}
            <div className="flex flex-col items-center shrink-0 self-end pb-1">
              <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-headline font-extrabold text-lg shadow-sm
                ${student.matchScore >= 90 ? 'border-primary bg-primary-fixed text-on-primary-fixed' : 'border-outline-variant bg-surface-container text-on-surface'}`}>
                {student.matchScore}%
              </div>
              <span className="text-[10px] text-on-surface-variant font-semibold mt-1 uppercase tracking-wider">Match</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-8 py-6 space-y-8">

          {/* Quick stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: 'school', label: 'College', value: student.college || '—' },
              { icon: 'grade', label: 'CGPA', value: student.cgpa ? `${student.cgpa} / 10` : '—' },
              { icon: 'location_on', label: 'Location', value: student.location || '—' },
              { icon: 'schedule', label: 'Available', value: student.availability || '—' },
            ].map(stat => (
              <div key={stat.label} className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">{stat.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="font-headline font-bold text-on-surface text-sm truncate">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          {student.bio && (
            <div>
              <h4 className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3">About</h4>
              <p className="font-body text-on-surface leading-relaxed text-sm">{student.bio}</p>
            </div>
          )}

          {/* Skills */}
          {student.skills?.length > 0 && (
            <div>
              <h4 className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3">Core Skills</h4>
              <div className="flex flex-wrap gap-2">
                {student.skills.filter(s => !s.includes('more')).map((skill, i) => (
                  <span key={i} className="bg-surface-container-high text-on-surface px-4 py-1.5 rounded-full text-sm font-semibold">
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Behavioral Metrics */}
          {student.behaviorMetrics && (
            <div>
              <h4 className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4">Behavioral Breakdown</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(student.behaviorMetrics).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-body text-xs font-semibold text-on-surface capitalize">{key}</span>
                      <span className="font-headline font-bold text-sm text-primary">{value}%</span>
                    </div>
                    <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-700"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Score */}
          {student.trustScore && (
            <div className="bg-surface-container-low rounded-2xl p-6 flex items-center gap-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100,100" strokeWidth="3.8" />
                  <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${student.trustScore},100`} strokeLinecap="round" strokeWidth="3.8" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-headline text-xl font-extrabold text-on-surface">{student.trustScore}</span>
                </div>
              </div>
              <div>
                <h5 className="font-headline font-bold text-on-surface mb-1">Skillnest Trust Score</h5>
                <p className="font-body text-sm text-on-surface-variant">Computed from task performance, behavioral signals, and submission quality across all platform activities.</p>
              </div>
            </div>
          )}

          {/* Portfolio Projects */}
          {student.portfolioProjects?.length > 0 && (
            <div>
              <h4 className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3">Portfolio</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {student.portfolioProjects.map((proj, i) => (
                  <a
                    key={i}
                    href={proj.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-surface-container-low hover:bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-headline font-bold text-on-surface text-sm group-hover:text-primary transition-colors">{proj.title}</p>
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-colors flex-shrink-0">open_in_new</span>
                    </div>
                    <p className="font-body text-xs text-on-surface-variant mt-1 leading-relaxed">{proj.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks on Platform */}
          {student.completedTasks?.length > 0 && (
            <div>
              <h4 className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3">Completed Tasks on Skillnest</h4>
              <div className="space-y-2">
                {student.completedTasks.map((task, i) => (
                  <div key={i} className="bg-surface-container-low rounded-xl px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      </div>
                      <div>
                        <p className="font-body font-semibold text-on-surface text-sm">{task.taskTitle}</p>
                        <p className="text-xs text-on-surface-variant">{task.company} · {task.date}</p>
                      </div>
                    </div>
                    <span className="font-headline font-bold text-tertiary text-sm flex-shrink-0">{task.score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GitHub */}
          {student.githubUsername && (
            <div className="flex items-center gap-3 bg-[#24292e]/5 rounded-xl px-5 py-4 border border-[#24292e]/10">
              <span className="material-symbols-outlined text-[#24292e]">code</span>
              <div className="flex-1">
                <p className="font-headline font-bold text-on-surface text-sm">GitHub</p>
                <p className="text-xs text-on-surface-variant">@{student.githubUsername}</p>
              </div>
              {student.githubLink && (
                <a
                  href={student.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm font-semibold transition-colors"
                >
                  View →
                </a>
              )}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-2 pb-2">
            <button className="flex-1 bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3.5 rounded-xl font-label font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">person_check</span>
              Invite to Apply
            </button>
            <button className="flex-1 bg-surface-container-highest text-on-surface px-6 py-3.5 rounded-xl font-label font-bold text-sm hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">bookmark</span>
              Save Candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CompanyStudentMatchesPage() {
  const [matches, setMatches] = useState(initialMatches);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/matching/default', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setMatches(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedStudent(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <CompanyDashboardLayout>
      {/* Header Section */}
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="font-headline text-[3.5rem] leading-none tracking-[-0.02em] font-extrabold text-on-background">Curated Matches</h2>
          <p className="font-body text-on-surface-variant text-lg mt-4 max-w-xl">
            Review top algorithmic matches for your open positions based on skill alignment, recent project submissions, and behavioral traits.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-full font-label text-sm font-semibold hover:bg-surface-variant transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filter Results
          </button>
        </div>
      </header>

      {/* Student Match List */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          matches.map(match => (
            <div
              key={match.id || match._id}
              className="bg-surface-container-low rounded-[1rem] p-8 flex items-center gap-8 relative group transition-all duration-300 hover:bg-surface-container-lowest hover:shadow-[0_40px_40px_-15px_rgba(0,24,73,0.06)] hover:-translate-y-1"
            >
              <div className="relative shrink-0 -mt-4 -ml-4">
                <img
                  alt={match.name}
                  className="w-24 h-24 rounded-full object-cover shadow-[0_20px_40px_-10px_rgba(0,24,73,0.15)] ring-4 ring-surface-container-lowest"
                  src={match.imageUrl || `https://ui-avatars.com/api/?name=${match.name}&background=random`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-headline text-2xl font-bold text-on-background">{match.name}</h3>
                  {match.superpower && (
                    <span className="bg-primary-container text-on-primary-container font-headline text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border border-primary/20 shadow-sm whitespace-nowrap inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">
                        {match.superpower.includes('fast') ? 'bolt' : match.superpower.includes('pressure') ? 'diamond' : 'psychiatry'}
                      </span>
                      {match.superpower}
                    </span>
                  )}
                </div>
                <p className="font-body text-on-surface-variant text-sm mt-1">{match.role || 'Full-Stack Developer'}</p>
                {/* Quick info chips */}
                <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-on-surface-variant">
                  {match.college && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">school</span>
                      {match.college}
                    </span>
                  )}
                  {match.location && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {match.location}
                    </span>
                  )}
                  {match.availability && (
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {match.availability}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {(match.skills || []).map((skill, i) => (
                    <span
                      key={i}
                      className={`px-4 py-1.5 rounded-full font-label text-xs ${skill.includes('more') ? 'bg-surface-variant text-on-surface-variant font-medium' : 'bg-secondary-container text-on-secondary-container font-semibold'}`}
                    >
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-4 shrink-0">
                <div className="flex items-center gap-2">
                  <div className={`w-12 h-12 rounded-full border-4 ${match.matchScore >= 90 ? 'border-primary bg-primary-fixed text-on-primary-fixed' : 'border-outline-variant bg-surface text-on-surface-variant'} flex items-center justify-center font-headline font-bold text-sm`}>
                    {match.matchScore || 0}%
                  </div>
                  <span className="font-body text-sm text-on-surface-variant font-medium">Match Score</span>
                </div>
                <button
                  onClick={() => setSelectedStudent(match)}
                  className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3 rounded-[0.75rem] font-label font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  View Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <button className="text-on-surface font-label font-semibold text-sm border-b border-on-surface pb-1 hover:text-primary hover:border-primary transition-colors">
          Load Additional Matches
        </button>
      </div>

      {/* Student Profile Modal */}
      <StudentProfileModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </CompanyDashboardLayout>
  );
}
