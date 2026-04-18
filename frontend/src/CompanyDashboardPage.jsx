import React from 'react';
import { Link } from 'react-router-dom';
import CompanyDashboardLayout from './CompanyDashboardLayout';
import companyProfile from './data/company/companyProfile.json';

export default function CompanyDashboardPage() {
    return (
        <CompanyDashboardLayout>
            
{/* Hero / Header Section */}
<header className="flex items-end justify-between w-full">
<div className="space-y-4">
<div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs font-semibold tracking-wide uppercase">
    {companyProfile.companyType}
</div>
<h1 className="font-headline text-[3.5rem] leading-[1.1] tracking-[-0.02em] font-extrabold text-on-surface">
    {companyProfile.companyName}
</h1>
<p className="font-body text-on-surface-variant text-lg max-w-2xl mt-4 leading-relaxed">
    {companyProfile.description}
</p>
</div>
</header>
{/* Bento Grid Section */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Quick Stats (Glassmorphism inspired) */}
<div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
<div className="relative overflow-hidden bg-surface-container-low rounded-[2rem] p-8 hover:bg-surface-container-lowest hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl">
    <img src="https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-500 pointer-events-none mix-blend-overlay" alt="" />
    <div className="relative z-10 flex justify-between items-start mb-12">
        <span className="material-symbols-outlined text-primary text-3xl transition-colors bg-white/50 p-2 rounded-full backdrop-blur-md">group</span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 text-[#001849] font-label text-xs font-bold backdrop-blur-sm shadow-sm">{companyProfile.metrics.activeRolesGrowth}</span>
    </div>
    <div className="relative z-10">
        <p className="font-label text-on-surface-variant font-semibold mb-2">Active Roles</p>
        <p className="font-headline text-5xl font-extrabold text-[#001849]">{companyProfile.metrics.activeRoles}</p>
    </div>
</div>
<div className="relative overflow-hidden bg-surface-container-low rounded-[2rem] p-8 hover:bg-surface-container-lowest hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl">
    <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-500 pointer-events-none mix-blend-overlay" alt="" />
    <div className="relative z-10 flex justify-between items-start mb-12">
        <span className="material-symbols-outlined text-primary text-3xl transition-colors bg-white/50 p-2 rounded-full backdrop-blur-md">handshake</span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 text-[#001849] font-label text-xs font-bold backdrop-blur-sm shadow-sm">High Match Rate</span>
    </div>
    <div className="relative z-10">
        <p className="font-label text-on-surface-variant font-semibold mb-2">Successful Matches</p>
        <p className="font-headline text-5xl font-extrabold text-[#001849]">{companyProfile.metrics.successfulMatches}</p>
    </div>
</div>
</div>
{/* Payment Info Management */}
<div className="col-span-1 bg-surface-container-low rounded-[2rem] p-8 hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300 flex flex-col">
<div className="flex items-center gap-3 mb-8">
<div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
</div>
<h2 className="font-headline text-xl font-bold text-on-surface">Payment Info</h2>
</div>
<div className="space-y-6 flex-1">
<div className="p-5 rounded-xl bg-surface border border-outline-variant/15 flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-12 h-8 bg-surface-variant rounded flex items-center justify-center font-bold text-xs text-on-surface-variant">{companyProfile.billing.cardType}</div>
<div>
<p className="font-label text-sm font-semibold text-on-surface">•••• {companyProfile.billing.lastFour}</p>
<p className="font-label text-xs text-on-surface-variant">Expires {companyProfile.billing.expiry}</p>
</div>
</div>
<span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<p className="font-body text-sm text-on-surface-variant px-1">Next billing cycle is scheduled for {companyProfile.billing.nextCycle}. You are on the {companyProfile.billing.planName}.</p>
</div>
<button className="w-full mt-8 bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-full font-label font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2">
                        Manage Billing
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</section>

        </CompanyDashboardLayout>
    );
}
