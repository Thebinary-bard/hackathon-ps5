import matchedStudents from '../../data/company/matchedStudents.json';
import potentialMatchStudents from '../../data/company/potentialMatchStudents.json';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanyDashboardLayout from './CompanyDashboardLayout';

export default function CompanyTasksDashboard() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        effort: 'Less than 10 hours'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    deadline: formData.dueDate,
                    skill: 'Full-Stack', // Default or derived from effort
                    difficulty: formData.effort.includes('10') ? 'easy' : 'medium'
                })
            });
            const data = await response.json();
            if (data.success) {
                alert('Task dispatched successfully!');
                navigate('/company/dashboard');
            }
        } catch (error) {
            console.error('Failed to dispatch task:', error);
            alert('Failed to dispatch task.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CompanyDashboardLayout>
            
{/* Header */}
<header className="mb-12">
<h2 className="font-headline text-4xl tracking-tight font-extrabold text-on-surface mb-2">Assign Task</h2>
<p className="font-body text-on-surface-variant text-base max-w-2xl">Create a new brief and assign it to your matched talent pool. Provide clear instructions to ensure successful delivery.</p>
</header>
{/* Bento Grid Layout */}
<form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">
{/* Primary Form Area (Spans 8 columns) */}
<div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
{/* Task Details Card */}
<div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_10px_40px_-10px_rgba(0,24,73,0.04)] hover:shadow-[0_10px_40px_-10px_rgba(0,24,73,0.08)] transition-all duration-300 group">
<h3 className="font-headline text-xl font-bold text-on-surface mb-6 border-b-2 border-surface-container-low pb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">description</span>
                        Brief Details
                    </h3>
<div className="space-y-6">
{/* Task Name Input */}
<div>
<label className="block font-label text-sm font-semibold text-on-surface-variant mb-2">Project Title</label>
<input 
    className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 border-0 rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/15 transition-colors font-body text-base" 
    placeholder="e.g., Q3 Marketing Campaign Analytics" 
    type="text"
    value={formData.title}
    onChange={(e) => setFormData({...formData, title: e.target.value})}
    required
/>
</div>
{/* Description/Instructions */}
<div>
<label className="block font-label text-sm font-semibold text-on-surface-variant mb-2">Detailed Instructions</label>
<textarea 
    className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 border-0 rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/15 transition-colors font-body text-base resize-none" 
    placeholder="Provide background information, key deliverables, and specific formatting requirements..." 
    rows="6"
    value={formData.description}
    onChange={(e) => setFormData({...formData, description: e.target.value})}
    required
></textarea>
</div>
{/* Attachments Area (Drag & Drop conceptual) */}
<div className="border-2 border-dashed border-outline-variant/30 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-surface-container-low/50 transition-colors cursor-pointer group/upload">
<div className="h-12 w-12 rounded-full bg-surface-container-low flex items-center justify-center mb-3 group-hover/upload:bg-secondary-container transition-colors">
<span className="material-symbols-outlined text-on-surface-variant group-hover/upload:text-primary">cloud_upload</span>
</div>
<p className="font-body text-sm font-medium text-on-surface mb-1">Drag and drop resource files here</p>
<p className="font-body text-xs text-on-surface-variant">PDF, DOCX, ZIP up to 50MB</p>
</div>
</div>
</div>
{/* Parameters Card */}
<div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_10px_40px_-10px_rgba(0,24,73,0.04)] hover:shadow-[0_10px_40px_-10px_rgba(0,24,73,0.08)] transition-all duration-300">
<h3 className="font-headline text-xl font-bold text-on-surface mb-6 border-b-2 border-surface-container-low pb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">tune</span>
                        Parameters
                    </h3>
<div className="grid grid-cols-2 gap-6">
<div>
<label className="block font-label text-sm font-semibold text-on-surface-variant mb-2">Due Date</label>
<div className="relative">
<input 
    className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 border-0 rounded-lg pl-4 pr-10 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/15 transition-colors font-body text-base appearance-none" 
    type="date"
    value={formData.dueDate}
    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
/>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">calendar_today</span>
</div>
</div>
<div>
<label className="block font-label text-sm font-semibold text-on-surface-variant mb-2">Estimated Effort</label>
<select 
    className="w-full bg-surface-container-low text-on-surface border-0 rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/15 transition-colors font-body text-base appearance-none"
    value={formData.effort}
    onChange={(e) => setFormData({...formData, effort: e.target.value})}
>
<option>Less than 10 hours</option>
<option>10 - 20 hours</option>
<option>20 - 40 hours</option>
<option>40+ hours</option>
</select>
</div>
</div>
</div>
</div>
{/* Talent Selection & Action Area (Spans 4 columns) */}
<div className="col-span-12 xl:col-span-4 flex flex-col gap-8">
{/* Select Talent Card */}
<div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_10px_40px_-10px_rgba(0,24,73,0.04)] flex-1 flex flex-col h-full">
<h3 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center justify-between">
<span className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-lg">group</span>
                            Assignee
                        </span>
<span className="text-xs font-medium bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full">3 Matched</span>
</h3>
<div className="mb-4">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input className="w-full bg-surface-container-low text-sm text-on-surface placeholder:text-on-surface-variant/50 border-0 rounded-lg pl-9 pr-4 py-2 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/15 transition-colors font-body" placeholder="Search talent..." type="text"/>
</div>
</div>
{/* Talent List */}
<div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
{matchedStudents.map((student, index) => {
  const photoUrl = potentialMatchStudents[index]?.imageUrl || student.avatar || student.imageUrl;
  return (
    <label key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low cursor-pointer transition-all duration-200 group hover:-translate-y-0.5">
      <input className="w-4 h-4 text-primary bg-surface border-outline-variant/50 rounded focus:ring-primary focus:ring-offset-0" type="checkbox"/>
      <div className="flex-1 flex items-center gap-3">
        {photoUrl ? (
          <img
            alt={`${student.name} portrait`}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-surface shadow-sm group-hover:ring-primary/40 transition-all duration-200"
            src={photoUrl}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center font-headline font-bold text-sm ring-2 ring-surface shadow-sm group-hover:ring-primary/40 transition-all duration-200">
            {student.name.split(' ').map(n=>n[0]).join('').substring(0,2)}
          </div>
        )}
        <div>
          <p className="font-body text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{student.name}</p>
          <p className="font-body text-xs text-on-surface-variant">{student.major} • {student.matchScore}% Match</p>
        </div>
      </div>
    </label>
  );
})}
</div>
</div>
{/* Action Button */}
<div className="mt-auto pt-4">
<button 
    type="submit"
    disabled={loading}
    className="w-full bg-gradient-to-br from-[#0050cb] to-[#0066ff] text-white font-headline font-bold text-base py-4 px-6 rounded-xl shadow-[0_8px_16px_-4px_rgba(0,80,203,0.3)] hover:shadow-[0_12px_24px_-4px_rgba(0,80,203,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
>
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{loading ? 'sync' : 'send'}</span>
                        {loading ? 'Dispatching...' : 'Dispatch Task'}
</button>
</div>
</div>
</form>

        </CompanyDashboardLayout>
    );
}
