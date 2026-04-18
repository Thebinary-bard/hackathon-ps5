import React from 'react';
import { Link } from 'react-router-dom';
import CompanyDashboardLayout from './CompanyDashboardLayout';
import companyProfile from './data/company/companyProfile.json';

export default function CompanyDashboardPage() {
    return (
        <CompanyDashboardLayout>
            
{/* Hero Banner */}
<header className="w-full rounded-[2rem] overflow-hidden relative min-h-[220px] flex items-end animate-slide-down" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
  {/* Deep gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f3c] via-[#2a4a8a] to-[#3a5fa0]"></div>
  {/* Mesh pattern overlay */}
  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
  {/* Glowing orbs */}
  <div className="absolute top-[-40px] right-[-40px] w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-[-60px] left-[30%] w-64 h-64 bg-[#00B8D9]/20 rounded-full blur-3xl"></div>
  {/* Content */}
  <div className="relative z-10 p-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div className="space-y-3">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-label text-xs font-semibold tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse"></span>
        {companyProfile.companyType}
      </div>
      <h1 className="font-headline text-5xl md:text-6xl font-black text-white tracking-[-0.03em] leading-none drop-shadow-lg">
        {companyProfile.companyName}
      </h1>
      <p className="font-body text-white/70 text-base max-w-xl leading-relaxed">
        {companyProfile.description}
      </p>
    </div>
    <div className="flex gap-3 shrink-0">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center">
        <p className="font-headline text-3xl font-black text-white">{companyProfile.metrics.activeRoles}</p>
        <p className="font-label text-xs text-white/60 mt-1 uppercase tracking-wider">Open Roles</p>
      </div>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center">
        <p className="font-headline text-3xl font-black text-white">{companyProfile.metrics.successfulMatches}</p>
        <p className="font-label text-xs text-white/60 mt-1 uppercase tracking-wider">Matches</p>
      </div>
    </div>
  </div>
</header>
{/* Stats Row */}
<section className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
  {/* Active Roles Card */}
  <div className="relative overflow-hidden bg-surface-container-low rounded-2xl p-5 hover:bg-surface-container-lowest hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 group shadow-sm hover:shadow-lg animate-bounce-fade" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
    <img src="https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-500 pointer-events-none mix-blend-overlay" alt="" />
    <div className="relative z-10 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-primary text-2xl">work</span>
    </div>
    <div className="relative z-10">
      <p className="font-label text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-0.5">Active Roles</p>
      <p className="font-headline text-3xl font-extrabold text-on-surface leading-none">{companyProfile.metrics.activeRoles}</p>
      <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label text-[10px] font-bold">{companyProfile.metrics.activeRolesGrowth}</span>
    </div>
  </div>
  {/* Successful Matches Card */}
  <div className="relative overflow-hidden bg-surface-container-low rounded-2xl p-5 hover:bg-surface-container-lowest hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 group shadow-sm hover:shadow-lg animate-bounce-fade" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
    <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-500 pointer-events-none mix-blend-overlay" alt="" />
    <div className="relative z-10 w-12 h-12 rounded-xl bg-secondary-container/60 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-on-secondary-container text-2xl">handshake</span>
    </div>
    <div className="relative z-10">
      <p className="font-label text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-0.5">Successful Matches</p>
      <p className="font-headline text-3xl font-extrabold text-on-surface leading-none">{companyProfile.metrics.successfulMatches}</p>
      <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-bold">High Match Rate</span>
    </div>
  </div>
</section>

{/* Role Compensation Card */}
<section className="mt-6 bg-surface-container-low rounded-2xl p-6 animate-bounce-fade" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
      <h2 className="font-headline text-lg font-bold text-on-surface">Role Compensation</h2>
    </div>
    <span className="text-xs font-label font-semibold text-on-surface-variant bg-surface px-3 py-1 rounded-full">Annual (CTC)</span>
  </div>
  <div className="space-y-2">
    {companyProfile.roleCompensation.map((item, i) => (
      <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-surface-container-lowest hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 group">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-200">
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-lg transition-colors duration-200">{item.icon}</span>
          </div>
          <span className="font-body text-sm font-semibold text-on-surface">{item.role}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-label font-bold px-2 py-0.5 rounded-full ${item.type === 'Full-time' ? 'bg-primary/10 text-primary' : item.type === 'Contract' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-variant text-on-surface-variant'}`}>
            {item.type}
          </span>
          <span className="font-headline text-sm font-bold text-on-surface">{item.range}</span>
        </div>
      </div>
    ))}
  </div>
</section>

        </CompanyDashboardLayout>
    );
}
