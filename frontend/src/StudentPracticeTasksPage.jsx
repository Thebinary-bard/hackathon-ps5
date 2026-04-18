import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import StudentDashboardLayout from './StudentDashboardLayout';
import universalTasks from './data/student/tasks.json';

const defaultTask = {
  id: "TSK-892",
  title: "Refactor Dashboard Analytics Components",
  category: "Frontend",
  points: 1250,
  description: "The current analytics dashboard components are tightly coupled and suffering from performance issues under heavy data loads. Your task is to refactor the main components to use the new standardized hooks pattern.",
  tags: ["React", "Performance"],
  acceptanceCriteria: [
    "Migrate to useAnalyticsData hook.",
    "Implement React.memo for heavy chart renders.",
    "Ensure 100% test coverage on new hooks."
  ],
  files: [
    {
      name: "index.tsx",
      code: "import React, { useMemo } from \"react\";\nimport { useAnalyticsData } from \"./hooks/useAnalyticsData\";\nimport { ChartRender } from \"@/components/ui/chart\";\n\nexport const ChartWidget = ({ widgetId }) => {\n  /* TODO: Implement hook and memoization */\n\n  const { data, isLoading, error } = useAnalyticsData(widgetId);\n\n  if (isLoading) return <Skeleton />;\n  if (error) return <ErrorState message={error.message} />;\n\n  return (\n    <div className=\"w-full h-full p-4 bg-surface-container\">\n      <ChartRender data={data} />\n    </div>\n  );\n};"
    }
  ]
};

export default function StudentPracticeTasksPage() {
  const { id } = useParams();

  const task = universalTasks.find(t => t.id === id) || defaultTask;

  const [activeTabIdx, setActiveTabIdx] = useState(0);

  // Set up local state for editing files
  const initialFiles = task.files && task.files.length > 0 ? task.files : defaultTask.files;
  const [localFiles, setLocalFiles] = useState(initialFiles);

  useEffect(() => {
    setLocalFiles(task.files && task.files.length > 0 ? task.files : defaultTask.files);
    setActiveTabIdx(0);
  }, [id, task.files]);

  const handleCodeChange = (e) => {
    const newFiles = [...localFiles];
    newFiles[activeTabIdx] = { ...newFiles[activeTabIdx], code: e.target.value };
    setLocalFiles(newFiles);
  };

  return (
    <StudentDashboardLayout>
      <div className="w-full max-w-6xl mx-auto h-full flex flex-col pt-4 pb-8 transition-all duration-300">
        
        {/* Light Theme Container Wrapper */}
        <div className="flex-1 bg-surface-container-lowest text-on-surface rounded-3xl p-8 overflow-y-auto shadow-sm relative font-body border border-outline-variant/20">
          
          <Link to="/student/dashboard" className="text-on-surface-variant hover:text-primary flex items-center gap-2 mb-6 text-sm font-medium transition-colors w-fit">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard
          </Link>

          <header className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider">
                  {task.id || 'TSK-892'}
                </span>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                  {task.category || 'Frontend'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface font-headline leading-tight tracking-tight max-w-3xl">
                {task.title}
              </h1>
            </div>
            
            <div className="flex flex-col items-end shrink-0">
              <span className="text-on-surface-variant text-sm font-medium mb-1">Reward</span>
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-3xl font-light">token</span>
                <span className="text-3xl font-black font-headline text-on-surface">
                  {task.points ? task.points.toLocaleString() : '1,250'} <span className="text-lg">XP</span>
                </span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-280px)] min-h-[600px]">
            
            {/* Left Sidebar: Brief & Criteria */}
            <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-surface-container-low rounded-2xl p-6 border-l-4 border-primary shadow-sm flex-1">
                <h2 className="flex items-center gap-3 text-xl font-bold text-on-surface mb-6 font-headline">
                  <span className="material-symbols-outlined text-primary">description</span>
                  Task Brief
                </h2>
                <div className="text-on-surface-variant text-sm leading-relaxed mb-8">
                  <p>{task.description}</p>
                </div>

                <h3 className="text-lg font-bold text-on-surface mb-4 font-headline">Acceptance Criteria</h3>
                <ul className="space-y-4">
                  {(task.acceptanceCriteria || defaultTask.acceptanceCriteria).map((criteria, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">check</span>
                      <span className="text-on-surface-variant text-sm">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side: Code Editor */}
            <div className="lg:col-span-8 bg-[#181B19] rounded-2xl flex flex-col border border-white/5 overflow-hidden shadow-lg relative h-full">
              
              {/* Editor Tabs */}
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
                <div className="flex items-center gap-2 pr-2 text-gray-500">
                  <button className="p-1.5 hover:text-gray-300 transition-colors"><span className="material-symbols-outlined text-sm">format_align_left</span></button>
                  <button className="p-1.5 hover:text-gray-300 transition-colors"><span className="material-symbols-outlined text-sm">settings</span></button>
                </div>
              </div>

              {/* Code Area */}
              <div className="flex-1 p-6 font-mono text-sm leading-loose">
                <textarea 
                  value={localFiles[activeTabIdx]?.code || ''}
                  onChange={handleCodeChange}
                  spellCheck="false"
                  className="w-full h-full bg-transparent text-[#61AFEF] font-mono outline-none resize-none"
                />
              </div>

              {/* Editor Footer Actions */}
              <div className="bg-[#191D1A] border-t border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#98EB59]"></div>
                  Auto-saved 2 mins ago
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="text-gray-300 font-semibold text-sm hover:text-white transition-colors">
                    Run Tests
                  </button>
                  <Link to="/student/dashboard" onClick={() => alert('Practice solution submitted locally!')} className="bg-gradient-to-r from-[#D4FF9D] to-[#98EB59] text-[#121413] px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(152,235,89,0.4)]">
                    <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                    Complete Practice
                  </Link>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 20px;
        }
      `}</style>
    </StudentDashboardLayout>
  );
}
