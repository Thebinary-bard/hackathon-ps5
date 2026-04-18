import React from 'react';
import { Link } from 'react-router-dom';
import CompanyDashboardLayout from './CompanyDashboardLayout';
import studentMatches from './data/company/potentialMatchStudents.json';

export default function CompanyStudentMatchesPage() {
    return (
        <CompanyDashboardLayout>
            
{/* Header Section */}
<header className="mb-12 flex justify-between items-end">
<div>
<h2 className="font-headline text-[3.5rem] leading-none tracking-[-0.02em] font-extrabold text-on-background">Curated Matches</h2>
<p className="font-body text-on-surface-variant text-lg mt-4 max-w-xl">Review top algorithmic matches for your open positions based on skill alignment, recent project submissions, and behavioral traits.</p>
</div>
<div className="flex gap-4">
<button className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-full font-label text-sm font-semibold hover:bg-surface-variant transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-lg">filter_list</span>
                        Filter Results
                    </button>
</div>
</header>
{/* Student Match List (Architectural Cards) */}
<div className="flex flex-col gap-6">
{studentMatches.map(match => (
    <div key={match.id} className="bg-surface-container-low rounded-[1rem] p-8 flex items-center gap-8 relative group transition-all duration-300 hover:bg-surface-container-lowest hover:shadow-[0_40px_40px_-15px_rgba(0,24,73,0.06)] hover:-translate-y-1">
        <div className="relative shrink-0 -mt-4 -ml-4">
            <img alt={match.name} className="w-24 h-24 rounded-full object-cover shadow-[0_20px_40px_-10px_rgba(0,24,73,0.15)] ring-4 ring-surface-container-lowest" src={match.imageUrl}/>
        </div>
        <div className="flex-1">
            <div className="flex items-center gap-3">
                <h3 className="font-headline text-2xl font-bold text-on-background">{match.name}</h3>
                {match.superpower && (
                    <span className="bg-primary-container text-on-primary-container font-headline text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border border-primary/20 shadow-sm whitespace-nowrap inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">{match.superpower.includes('fast') ? 'bolt' : match.superpower.includes('pressure') ? 'diamond' : 'psychiatry'}</span>
                        {match.superpower}
                    </span>
                )}
            </div>
            <p className="font-body text-on-surface-variant text-sm mt-1">{match.role}</p>
            <div className="flex flex-wrap gap-2 mt-4">
                {match.skills.map((skill, i) => (
                    <span key={i} className={`px-4 py-1.5 rounded-full ${skill.includes('more') ? 'bg-surface-variant text-on-surface-variant font-medium' : 'bg-secondary-container text-on-secondary-container font-semibold'} font-label text-xs`}>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
        <div className="flex flex-col items-end gap-4 shrink-0">
            <div className="flex items-center gap-2">
                <div className={`w-12 h-12 rounded-full border-4 ${match.matchScore >= 90 ? 'border-primary bg-primary-fixed text-on-primary-fixed' : 'border-outline-variant bg-surface text-on-surface-variant'} flex items-center justify-center font-headline font-bold text-sm`}>
                    {match.matchScore}%
                </div>
                <span className="font-body text-sm text-on-surface-variant font-medium">Match Score</span>
            </div>
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3 rounded-[0.75rem] font-label font-semibold text-sm hover:opacity-90 transition-opacity">
                View Profile
            </button>
        </div>
    </div>
))}
</div>
{/* Pagination / Load More (Editorial style) */}
<div className="mt-12 flex justify-center">
<button className="text-on-surface font-label font-semibold text-sm border-b border-on-surface pb-1 hover:text-primary hover:border-primary transition-colors">
                    Load Additional Matches
                </button>
</div>

        </CompanyDashboardLayout>
    );
}
