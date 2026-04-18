import assignedToWorkStudents from './data/company/assignedToWorkStudents.json';
import React from 'react';
import { Link } from 'react-router-dom';
import CompanyDashboardLayout from './CompanyDashboardLayout';

export default function CompanySubmissionReviewPage() {
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
{assignedToWorkStudents.map((student, index) => {
    // Generate some mock variables statically based on index to retain the beautiful UI variation
    const statuses = [
        { label: "Initial Review", value: "In Progress", color: "text-primary", bg: "bg-primary", width: "w-1/3" },
        { label: "Evaluation", value: "Ready", color: "text-tertiary", bg: "bg-tertiary", width: "w-full", priority: true },
        { label: "Awaiting Feedback", value: "Unopened", color: "text-outline", bg: "bg-outline", width: "w-[5%]" }
    ];
    const s = statuses[index % statuses.length];
    
    return (
        <div key={index} className="bg-surface-container-low rounded-[1.5rem] p-6 hover:bg-surface-container-lowest hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,80,203,0.15)] transition-all duration-400 shadow-[0_40px_40px_-15px_rgba(0,24,73,0.02)] flex items-center justify-between group relative overflow-hidden">
            {s.priority && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary-container"></div>}
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-surface overflow-hidden p-1 shadow-sm flex-shrink-0">
                    {student.avatar ? (
                        <img alt={`${student.name} portrait`} className="w-full h-full object-cover rounded-full" src={student.avatar}/>
                    ) : (
                        <div className="w-full h-full rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-headline font-bold text-xl">
                            {student.name.split(' ').map(n=>n[0]).join('').substring(0,2)}
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-headline text-lg font-bold text-on-surface">{student.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="font-body text-sm text-on-surface-variant">{student.major}</p>
                        {s.priority && <span className="inline-flex items-center justify-center bg-error-container text-on-error-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Priority</span>}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-12">
                <div className="w-48 hidden md:block">
                    <div className="flex justify-between font-label text-xs font-semibold text-on-surface-variant mb-2">
                        <span>{s.label}</span>
                        <span className={s.color}>{s.value}</span>
                    </div>
                    <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.bg} ${s.width}`}></div>
                    </div>
                </div>
                <button className="bg-surface-container-highest text-on-surface font-headline font-semibold px-6 py-3 rounded-xl hover:bg-primary hover:text-on-primary transition-all duration-200 whitespace-nowrap hover:-translate-y-0.5 hover:shadow-md">
                    View Work
                </button>
            </div>
        </div>
    );
})}
</div>

        </CompanyDashboardLayout>
    );
}
