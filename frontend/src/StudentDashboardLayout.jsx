import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import userProfile from './data/userProfile.json';


export default function StudentDashboardLayout({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const firstName = userProfile.mockUserData.name.split(' ')[0];

  const getSidebarClass = (targetPath) => {
    const isActive = path === targetPath || (targetPath !== '/student/dashboard' && path.startsWith(targetPath));
    if (isActive) {
      return "flex items-center space-x-3 text-[#001849] bg-[#ffffff]/50 py-3 px-6 rounded-r-full font-body text-sm font-semibold cursor-pointer active:scale-98 transition-transform duration-200";
    }
    return "flex items-center space-x-3 text-[#424656] py-3 px-6 hover:bg-[#f6f3f2]/50 rounded-r-full font-body text-sm font-semibold cursor-pointer hover:translate-x-1 transition-transform duration-200";
  };

  return (
    <div className="bg-background text-on-background font-body antialiased min-h-screen">
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#eae7e7] flex flex-col overflow-y-auto z-40 hidden md:flex pt-6">
        <div className="px-6 pb-2">
          <Link className="text-2xl font-black text-blue-700 font-headline tracking-tight scale-95 active:scale-90 transition-transform" to="/">
            Skillnest
          </Link>
        </div>
        <div className="px-6 py-2">
          <h2 className="font-headline text-lg font-bold text-on-surface">Student Portal</h2>
          <p className="font-body text-sm text-on-surface-variant">Manage your growth</p>
        </div>
        <nav className="flex-1 mt-4 space-y-1 pr-4">
          <Link className={getSidebarClass('/student/dashboard')} to="/student/dashboard">
            <span className="material-symbols-outlined">person</span>
            <span>Profile</span>
          </Link>
          <Link className={getSidebarClass('/student/opportunities')} to="/student/opportunities">
            <span className="material-symbols-outlined">work</span>
            <span>Opportunities</span>
          </Link>
          <Link className={getSidebarClass('/student/tasks')} to="/student/tasks">
            <span className="material-symbols-outlined">assignment</span>
            <span>Tasks</span>
          </Link>
        </nav>
        <div className="px-6 pb-6 pt-4 space-y-2">
          <Link className="flex items-center space-x-3 text-error py-2 hover:translate-x-1 transition-transform duration-200" to="/">
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="text-sm font-semibold">Logout</span>
          </Link>
        </div>
      </aside>
      <main className="flex-1 ml-0 md:ml-64 mr-0 lg:mr-80 pt-24 px-8 pb-12 overflow-y-auto bg-surface min-h-screen relative z-10 w-full lg:w-auto overflow-x-hidden">
        {children}
      </main>      <aside className="fixed right-0 top-0 h-screen w-80 border-l border-white/10 bg-[#fcf9f8]/90 backdrop-blur-2xl shadow-2xl flex flex-col p-6 gap-4 z-50 hidden lg:flex">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0050cb] to-[#0066ff] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings:"'FILL' 1" }}>smart_toy</span>
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">AI Copilot</h2>
            <p className="font-body text-xs text-on-surface-variant">Ready to assist</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <div className="bg-surface-container-lowest p-4 rounded-2xl rounded-tl-sm shadow-sm border border-surface-variant/50">
            <p className="font-body text-sm text-on-surface">Hello {firstName}! I noticed you updated your resume. Would you like me to scan it for keyword optimization against recent job postings?</p>
          </div>
          <div className="bg-primary/5 p-4 rounded-2xl rounded-tr-sm self-end ml-8">
            <p className="font-body text-sm text-on-surface">Yes, please. Focus on frontend roles.</p>
          </div>
        </div>
        <div className="mt-auto space-y-3 pt-4 border-t border-surface-container-high">
          <button className="w-full flex items-center justify-center space-x-2 bg-surface-container p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface-variant animate-pulse-subtle">
            <span className="material-symbols-outlined text-lg text-[#0050cb]">mic</span>
            <span className="font-body text-sm font-medium">Voice Command</span>
          </button>
          <div className="relative">
            <input className="w-full bg-surface-container-lowest border-none rounded-xl pl-4 pr-10 py-3 font-body text-sm focus:ring-2 focus:ring-primary/20 shadow-sm transition-all text-on-surface placeholder-on-surface-variant/50" placeholder="Ask AI..." type="text"/>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary-container p-1">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings:"'FILL' 1" }}>send</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
