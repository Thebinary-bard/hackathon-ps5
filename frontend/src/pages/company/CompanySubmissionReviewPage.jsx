import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyDashboardLayout from './CompanyDashboardLayout';
import initialSubmissions from '../../data/company/assignedToWorkStudents.json';

export default function CompanySubmissionReviewPage() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/submissions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (data.success) {
                    setSubmissions(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch submissions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, []);

    return (
        <CompanyDashboardLayout>
            
{/* Header section */}
<div className="mb-12 flex justify-between items-end">
<div>
<h1 className="font-headline text-[3.5rem] leading-none font-extrabold text-on-primary-fixed tracking-tight -ml-1">Submissions</h1>
<p className="font-body text-base text-on-surface-variant mt-4 max-w-xl">Review and evaluate candidate solutions. Prioritize entries marked for expedited review.</p>
</div>
{/* Filter/Sort pills (No-line design) */}
<div className="flex gap-3">
<button className="bg-secondary-container text-on-secondary-container font-label text-sm font-medium px-5 py-2 rounded-full hover:bg-secondary-container/80 transition-colors">
                        Pending Review
                    </button>
<button className="bg-surface-container-low text-on-surface-variant font-label text-sm font-medium px-5 py-2 rounded-full hover:bg-surface-container-highest transition-colors">
                        All Projects
                    </button>
</div>
</div>
{/* List Canvas */}
<div className="space-y-6">
{loading ? (
    <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
) : (
    submissions.length === 0 ? (
        <div className="text-center py-12 bg-surface-container-low rounded-3xl">
            <p className="font-body text-on-surface-variant">No submissions found yet.</p>
        </div>
    ) : (
        submissions.map((sub, index) => {
            const student = sub.user || { name: 'Anonymous Student' };
            const task = sub.task || { title: 'General Task' };
            
            // Generate some mock variables for visual flair
            const statuses = [
                { label: "Evaluation", value: "Ready", color: "text-tertiary", bg: "bg-tertiary", width: "w-full", priority: true },
                { label: "Initial Review", value: "In Progress", color: "text-primary", bg: "bg-primary", width: "w-1/3" },
                { label: "Awaiting Feedback", value: "Unopened", color: "text-outline", bg: "bg-outline", width: "w-[5%]" }
            ];
            const s = statuses[index % statuses.length];
            
            return (
                <div key={sub._id} className="bg-surface-container-low rounded-[1.5rem] p-6 hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300 shadow-[0_40px_40px_-15px_rgba(0,24,73,0.02)] hover:shadow-[0_40px_40px_-15px_rgba(0,24,73,0.06)] flex items-center justify-between group relative overflow-hidden">
                    {s.priority && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary-container"></div>}
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-surface overflow-hidden p-1 shadow-sm flex-shrink-0">
                            <img alt={`${student.name} portrait`} className="w-full h-full object-cover rounded-full" src={student.avatar || `https://ui-avatars.com/api/?name=${student.name}&background=random`}/>
                        </div>
                        <div>
                            <h3 className="font-headline text-lg font-bold text-on-surface">{student.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="font-body text-sm text-on-surface-variant">{task.title}</p>
                                {s.priority && <span className="inline-flex items-center justify-center bg-error-container text-on-error-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Priority</span>}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-12">
                        <div className="w-48 hidden md:block">
                            <div className="flex justify-between font-label text-xs font-semibold text-on-surface-variant mb-2">
                                <span>{s.label}</span>
                                <span className={s.color}>{sub.status || s.value}</span>
                            </div>
                            <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${s.bg} ${s.width}`}></div>
                            </div>
                        </div>
                        <button className="bg-surface-container-highest text-on-surface font-headline font-semibold px-6 py-3 rounded-xl hover:bg-surface-variant transition-colors whitespace-nowrap">
                            View Work
                        </button>
                    </div>
                </div>
            );
        })
    )
)}
</div>

        </CompanyDashboardLayout>
    );
}
