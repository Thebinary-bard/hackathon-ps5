import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import StudentDashboardLayout from './StudentDashboardLayout';
import universalTasks from '../../data/student/tasks.json';

const defaultTask = {
  id: "PRC-101",
  title: "Algorithm Refinement",
  category: "Logic",
  points: 500,
  description: "Improve the time complexity of the provided sorting algorithm. Target O(n log n).",
  tags: ["Algorithms", "JS"],
};

export default function StudentPracticeTasksPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = universalTasks.find(t => t.id === id) || defaultTask;

  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [localFiles, setLocalFiles] = useState(task.files || [{ name: 'solution.js', code: '' }]);
  const [submissionId, setSubmissionId] = useState(null);
  const hasActed = useRef(false);

  useEffect(() => {
    const startSubmission = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/submissions/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ taskId: task.id })
        });
        const data = await response.json();
        if (data.success) {
          setSubmissionId(data.data._id);
        }
      } catch (error) {
        console.error('Failed to start practice tracking:', error);
      }
    };
    startSubmission();
  }, [task.id]);

  const handleCodeChange = async (e) => {
    const newFiles = [...localFiles];
    newFiles[activeTabIdx] = { ...newFiles[activeTabIdx], code: e.target.value };
    setLocalFiles(newFiles);

    if (!submissionId) return;

    const token = localStorage.getItem('token');
    if (!hasActed.current) {
      hasActed.current = true;
      fetch('http://localhost:5000/api/submissions/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ submissionId })
      });
    }

    fetch('http://localhost:5000/api/submissions/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ submissionId })
    });
  };

  const handleComplete = async () => {
    if (!submissionId) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/submissions/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ submissionId, content: JSON.stringify(localFiles) })
      });
      const data = await response.json();
      if (data.success) {
        navigate(`/student/tasks/${task.id}/result`, { state: { result: data.data } });
      }
    } catch (error) {
      console.error('Practice submission failed:', error);
    }
  };

  return (
    <StudentDashboardLayout>
      <div className="w-full max-w-6xl mx-auto h-full flex flex-col pt-4 pb-8 transition-all duration-300">
        <div className="flex-1 bg-surface-container-lowest text-on-surface rounded-3xl p-8 overflow-y-auto shadow-sm relative font-body border border-outline-variant/20">
          
          <Link to="/student/dashboard" className="text-on-surface-variant hover:text-primary flex items-center gap-2 mb-6 text-sm font-medium transition-colors w-fit">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard
          </Link>

          <header className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider">{task.id}</span>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold tracking-wider">{task.category}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface font-headline leading-tight tracking-tight max-w-3xl">{task.title}</h1>
            </div>
            
            <div className="flex flex-col items-end shrink-0">
              <span className="text-on-surface-variant text-sm font-medium mb-1">XP Points</span>
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-3xl font-light">token</span>
                <span className="text-3xl font-black font-headline text-on-surface">{task.points?.toLocaleString()} <span className="text-lg">XP</span></span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-280px)] min-h-[600px]">
            <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-surface-container-low rounded-2xl p-6 border-l-4 border-primary shadow-sm flex-1">
                <h2 className="flex items-center gap-3 text-xl font-bold text-on-surface mb-6 font-headline">
                  <span className="material-symbols-outlined text-primary">description</span>
                  Task Brief
                </h2>
                <div className="text-on-surface-variant text-sm leading-relaxed mb-8">
                  <p>{task.description}</p>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-4 font-headline">Criteria</h3>
                <ul className="space-y-4">
                  {(task.acceptanceCriteria || []).map((criteria, index) => (
                    <li key={index} className="flex items-start gap-1 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 bg-[#181B19] rounded-2xl flex flex-col border border-white/5 overflow-hidden shadow-lg h-full">
              <div className="flex items-center justify-between bg-[#1F2421] px-2 py-2 border-b border-white/5">
                <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar">
                  {localFiles.map((f, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveTabIdx(idx)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTabIdx === idx ? 'bg-[#29302C] text-[#98EB59]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-0 font-mono text-sm leading-loose overflow-hidden">
                <textarea 
                  value={localFiles[activeTabIdx]?.code || ''}
                  onChange={handleCodeChange}
                  spellCheck="false"
                  className="w-full h-full bg-transparent p-6 text-[#61AFEF] font-mono outline-none resize-none"
                />
              </div>

              <div className="bg-[#191D1A] border-t border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-xs text-[#98EB59]">
                  <div className="w-2 h-2 rounded-full bg-[#98EB59] animate-pulse"></div>
                  Practice Tracking
                </div>
                
                <div className="flex items-center gap-4">
                  <button onClick={handleComplete} className="bg-gradient-to-r from-[#D4FF9D] to-[#98EB59] text-[#121413] px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(152,235,89,0.4)]">
                    <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                    Complete Practice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
