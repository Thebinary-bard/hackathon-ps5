import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, companies: 0, submissions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch real admin stats
    setTimeout(() => {
      setStats({ users: 156, companies: 42, submissions: 890 });
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-surface p-8 md:p-16">
      <header className="mb-12 border-b border-outline-variant/20 pb-8 flex justify-between items-center">
        <div>
          <h1 className="font-headline text-5xl font-black text-on-surface tracking-tighter">Admin Control</h1>
          <p className="text-on-surface-variant font-body mt-2">Global platform analytics and user management.</p>
        </div>
        <Link to="/" className="text-primary hover:underline font-bold">Logout</Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        <div className="bg-surface-container-low p-8 rounded-[2rem] shadow-sm">
          <span className="material-symbols-outlined text-primary text-4xl mb-4">group</span>
          <h2 className="text-on-surface-variant font-label text-sm font-bold uppercase tracking-widest">Total Students</h2>
          <p className="text-5xl font-black text-on-surface mt-2">{stats.users}</p>
        </div>
        <div className="bg-surface-container-low p-8 rounded-[2rem] shadow-sm">
          <span className="material-symbols-outlined text-tertiary text-4xl mb-4">business</span>
          <h2 className="text-on-surface-variant font-label text-sm font-bold uppercase tracking-widest">Partner Companies</h2>
          <p className="text-5xl font-black text-on-surface mt-2">{stats.companies}</p>
        </div>
        <div className="bg-surface-container-low p-8 rounded-[2rem] shadow-sm">
          <span className="material-symbols-outlined text-secondary text-4xl mb-4">assignment_turned_in</span>
          <h2 className="text-on-surface-variant font-label text-sm font-bold uppercase tracking-widest">Total Submissions</h2>
          <p className="text-5xl font-black text-on-surface mt-2">{stats.submissions}</p>
        </div>
      </div>

      <div className="mt-12 bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/20 max-w-6xl">
        <h3 className="font-headline text-2xl font-bold text-on-surface mb-6">System Health</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/10">
            <span className="font-body text-on-surface">API Gateway</span>
            <span className="text-green-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-600"></span> Operational
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/10">
            <span className="font-body text-on-surface">Curation Engine</span>
            <span className="text-green-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-600"></span> Operational
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/10">
            <span className="font-body text-on-surface">Database (MongoDB)</span>
            <span className="text-green-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-600"></span> Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
