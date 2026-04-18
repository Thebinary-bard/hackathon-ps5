import assignedToWorkStudents from '../../data/company/assignedToWorkStudents.json';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanyDashboardLayout from './CompanyDashboardLayout';

export default function CompanyHiringDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const candidate = assignedToWorkStudents[0];

    const handleDecision = async (status) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            // Mock gig ID or fetch real one
            const gigId = '65f1a2b3c4d5e6f7a8b9c0d1'; 
            const response = await fetch(`http://localhost:5000/api/gigs/${gigId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (data.status === 'success' || data.success) {
                alert(`Candidate ${status === 'completed' ? 'Approved' : 'Rejected'} successfully!`);
                navigate('/company/dashboard');
            }
        } catch (error) {
            console.error('Decision failed:', error);
            alert('Failed to process hiring decision.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CompanyDashboardLayout>
            
{/* Header Section */}
<header className="mb-12">
<div className="flex items-center gap-2 text-sm text-on-surface-variant font-label mb-2">
<span>Candidates</span>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="font-medium text-primary">Final Decision</span>
</div>
<h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">Hiring Evaluation</h1>
<p className="font-body text-on-surface-variant text-lg max-w-2xl">Review the final candidate dossier and make your hiring determination.</p>
</header>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
{/* Column 1: Candidate Overview (Spans 1 col) */}
<div className="xl:col-span-1 space-y-8">
{/* Profile Card */}
<div className="bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,80,203,0.12)] transition-all duration-400">
<div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
<div className="flex flex-col items-center text-center relative z-10">
<div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-surface shadow-[0_40px_40px_-15px_rgba(0,24,73,0.06)]">
        <img alt={`${candidate.name} portrait`} className="w-full h-full object-cover" src={candidate.avatar || `https://ui-avatars.com/api/?name=${candidate.name}&background=random`}/>
</div>
<h2 className="font-headline text-2xl font-bold text-on-surface mb-1">{candidate.name}</h2>
<p className="font-body text-on-surface-variant text-sm mb-4">{candidate.major}</p>
<div className="flex gap-2 flex-wrap justify-center mb-6">
<span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label text-xs font-semibold">React</span>
<span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label text-xs font-semibold">Figma</span>
<span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label text-xs font-semibold">TypeScript</span>
</div>
<div className="w-full bg-surface-container-low rounded-lg p-4 text-left flex items-center justify-between">
<div>
<p className="font-label text-xs text-on-surface-variant mb-1">Match Score</p>
<p className="font-headline text-2xl font-extrabold text-primary">{candidate.matchScore}%</p>
</div>
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
</div>
</div>
</div>
</div>
{/* Final Score Highlight Card */}
<div className="bg-gradient-to-br from-[#0050cb] to-[#0066ff] rounded-xl p-8 text-on-primary shadow-2xl relative overflow-hidden">
<div className="absolute -right-8 -bottom-8 opacity-20">
<span className="material-symbols-outlined text-9xl">military_tech</span>
</div>
<div className="relative z-10">
<p className="font-label text-sm text-primary-fixed mb-2 uppercase tracking-widest font-semibold">Final Assessment</p>
<h3 className="font-headline text-6xl font-black mb-2">9.8<span className="text-2xl font-medium text-primary-fixed">/10</span></h3>
<p className="font-body text-sm text-primary-fixed-dim leading-relaxed">Top 2% of all candidates reviewed for this position. Exceptional technical proficiency and strong cultural fit.</p>
</div>
</div>
</div>
{/* Column 2 & 3: Details and Decision (Spans 2 cols) */}
<div className="xl:col-span-2 space-y-8 flex flex-col">
{/* Evaluation Metrics */}
<div className="bg-surface-container-lowest rounded-xl p-8 flex-1 group hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,80,203,0.1)] transition-all duration-400">
<h3 className="font-headline text-xl font-bold text-on-surface mb-6">Performance Breakdown</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
{/* Metric 1 */}
<div>
<div className="flex justify-between items-end mb-2">
<span className="font-body text-sm font-semibold text-on-surface">Technical Challenge</span>
<span className="font-headline text-sm font-bold text-on-surface-variant">95/100</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
</div>
<p className="font-body text-xs text-on-surface-variant mt-2">Completed sorting algorithm in optimal O(n log n) time.</p>
</div>
{/* Metric 2 */}
<div>
<div className="flex justify-between items-end mb-2">
<span className="font-body text-sm font-semibold text-on-surface">System Design</span>
<span className="font-headline text-sm font-bold text-on-surface-variant">90/100</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
</div>
<p className="font-body text-xs text-on-surface-variant mt-2">Strong architecture, minor improvements needed in caching strategy.</p>
</div>
{/* Metric 3 */}
<div>
<div className="flex justify-between items-end mb-2">
<span className="font-body text-sm font-semibold text-on-surface">Cultural Fit</span>
<span className="font-headline text-sm font-bold text-on-surface-variant">98/100</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2">
<div className="bg-tertiary h-2 rounded-full" style={{ width: '98%' }}></div>
</div>
<p className="font-body text-xs text-on-surface-variant mt-2">Excellent communication, aligns well with core company values.</p>
</div>
{/* Metric 4 */}
<div>
<div className="flex justify-between items-end mb-2">
<span className="font-body text-sm font-semibold text-on-surface">Task Submission</span>
<span className="font-headline text-sm font-bold text-on-surface-variant">100/100</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
</div>
<p className="font-body text-xs text-on-surface-variant mt-2">Submitted 2 days before deadline with comprehensive documentation.</p>
</div>
</div>
</div>
{/* Interviewer Notes (Glassmorphism inspired) */}
<div className="bg-surface-container-low rounded-xl p-8">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined text-on-surface-variant">format_quote</span>
<h3 className="font-headline text-lg font-bold text-on-surface">Lead Engineer Notes</h3>
</div>
<p className="font-body text-on-surface-variant leading-relaxed text-sm italic">"Elena demonstrated a deep understanding of frontend architecture. What stood out was her ability to articulate trade-offs between different state management solutions. She was receptive to feedback during the pair programming session and adapted quickly. Highly recommend moving forward with an offer."</p>
</div>
{/* Action Area (Final Decision) */}
<div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 mt-auto">
<h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Final Decision</h3>
<p className="font-body text-sm text-on-surface-variant mb-8">Select an outcome for this candidate. This action will trigger automated communications based on your selection.</p>
<div className="flex flex-col sm:flex-row gap-4">
{/* Reject Button */}
<button className="flex-1 bg-surface-container-highest text-on-surface hover:bg-error hover:text-on-error transition-all duration-200 rounded-xl py-4 px-6 flex flex-col items-center justify-center gap-1 group hover:-translate-y-0.5 hover:shadow-md">
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
<span className="font-headline font-bold text-lg">Reject</span>
</div>
<span className="font-label text-xs text-on-surface-variant group-hover:text-on-surface transition-colors">Student gets: [Rejection Email &amp; Feedback]</span>
</button>
{/* Approve Button */}
<button className="flex-1 bg-gradient-to-br from-[#0050cb] to-[#0066ff] text-on-primary hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-6px_rgba(0,80,203,0.4)] transition-all duration-200 rounded-xl py-4 px-6 flex flex-col items-center justify-center gap-1 shadow-lg group">
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
<span className="font-headline font-bold text-lg">Approve</span>
</div>
<span className="font-label text-xs text-primary-fixed group-hover:text-white transition-colors">Student gets: [Offer Letter &amp; $5,000 Signing Bonus]</span>
</button>
</div>
</div>
</div>
</div>

        </CompanyDashboardLayout>
    );
}
