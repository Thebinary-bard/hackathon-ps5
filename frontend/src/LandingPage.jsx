import React from 'react';
import { Link } from 'react-router-dom'; export default function LandingPage() { return ( <div className="font-body bg-surface text-on-surface antialiased min-h-screen flex flex-col relative overflow-x-hidden"> <style>{` .liquid-glass { background: rgba(252, 249, 248, 0.6); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(194, 198, 216, 0.15); } .ambient-shadow { box-shadow: 0 20px 40px -10px rgba(0, 24, 73, 0.06); } .gradient-text { background: linear-gradient(135deg, #0050cb, #0066ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } .blooming-bg { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; z-index: -1; } `}</style> <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"><div className="blooming-bg bg-primary-container w-[600px] h-[600px] top-[-100px] left-[-200px]"></div><div className="blooming-bg bg-tertiary-container w-[500px] h-[500px] top-[20%] right-[-150px]"></div><div className="blooming-bg bg-secondary-container w-[700px] h-[700px] bottom-[-200px] left-[10%]"></div></div> <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-2xl shadow-blue-900/5 transition-all duration-300">
<div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto"> <a className="text-2xl font-black text-blue-700 font-headline tracking-tight scale-95 active:scale-90 transition-transform" href="#"> Skillnest </a> <div className="hidden md:flex gap-8 items-center font-headline tracking-tight font-semibold">
<a className="text-blue-700 border-b-2 border-blue-600 pb-1 hover:text-blue-500 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="#">Home</a>
<a className="text-slate-600 pb-1 hover:text-blue-500 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="#">Features</a>
<a className="text-slate-600 pb-1 hover:text-blue-500 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="#">How it Works</a>
<a className="text-slate-600 pb-1 hover:text-blue-500 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="#">Contact Support</a>
</div> <div className="hidden md:flex gap-4 items-center">
<Link to="/auth" state={{ role: 'company' }}><button className="font-body text-sm font-medium text-slate-600 hover:text-blue-500 transition-colors duration-300"> For Companies </button></Link>
<Link to="/auth" state={{ role: 'student' }}><button className="font-body text-sm font-medium bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 scale-95 active:scale-90">Get Started</button></Link>
</div> <button className="md:hidden text-slate-600">
<span className="material-symbols-outlined text-3xl">menu</span>
</button>
</div>
</nav> <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-32"> <section className="flex flex-col items-center text-center mt-12 md:mt-24 relative z-10">
<span className="bg-secondary-container text-on-secondary-container font-label text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide uppercase"> The New Standard </span>
<h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-background max-w-4xl leading-[1.1] mb-6"> Skillnest: The <span className="gradient-text">Architectural Curator</span> of Talent </h1>
<p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed"> Where students grow and companies thrive through expert curation. Move beyond the spreadsheet and experience professional networking as a high-end gallery. </p>
<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
<Link to="/auth" state={{ role: 'student' }}><button className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-body font-medium px-8 py-4 rounded-full text-lg shadow-[0_10px_30px_-10px_rgba(0,80,203,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(0,80,203,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">Get Started</button></Link>
<Link to="/auth" state={{ role: 'student' }}><button className="bg-surface-container-highest text-on-surface font-body font-medium px-8 py-4 rounded-full text-lg hover:bg-surface-variant transition-all duration-300 w-full"> Explore Opportunities </button></Link>
<Link to="/auth" state={{ role: 'company' }}><button className="bg-transparent text-on-surface font-body font-medium px-8 py-4 rounded-full text-lg hover:bg-surface-variant/50 transition-all duration-300 w-full"> For Companies </button></Link>
</div>
</section> <section className="relative z-10">
<div className="flex justify-between items-end mb-12">
<div>
<h2 className="font-headline text-3xl md:text-4xl font-bold text-on-background tracking-tight mb-2">Curated Capabilities</h2>
<p className="font-body text-on-surface-variant animate-in fade-in slide-in-from-bottom-4 duration-1000">Designed with intentional asymmetry and tonal depth.</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"> <div className="md:col-span-2 liquid-glass rounded-3xl p-8 md:p-12 flex flex-col justify-between ambient-shadow hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300 group overflow-hidden relative">
<div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl group-hover:bg-primary-container/30 transition-all"></div>
<div>
<div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings:"'FILL' 1" }}>architecture</span>
</div>
<h3 className="font-headline text-2xl font-bold text-on-background mb-3">Structural Profiles</h3>
<p className="font-body text-on-surface-variant max-w-md leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000"> Present your professional journey not as a list, but as a carefully constructed portfolio. Break the grid with our fluid, expansive canvas. </p>
</div>
</div> <div className="liquid-glass rounded-3xl p-8 flex flex-col justify-between ambient-shadow hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300">
<div>
<div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-tertiary-container text-2xl" style={{ fontVariationSettings:"'FILL' 1" }}>visibility</span>
</div>
<h3 className="font-headline text-xl font-bold text-on-background mb-2">Quiet Authority</h3>
<p className="font-body text-on-surface-variant text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000"> A refined palette and typography hierarchy that lets your talent speak without the visual noise. </p>
</div>
</div> <div className="liquid-glass rounded-3xl p-8 flex flex-col justify-between ambient-shadow hover:bg-surface-container-lowest hover:scale-[1.01] transition-all duration-300">
<div>
<div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-on-secondary-container text-2xl" style={{ fontVariationSettings:"'FILL' 1" }}>handshake</span>
</div>
<h3 className="font-headline text-xl font-bold text-on-background mb-2">Seamless Connections</h3>
<p className="font-body text-on-surface-variant text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000"> Interact with companies through a frictionless,"no-line" interface that feels like a natural extension of your workflow. </p>
</div>
</div> <div className="md:col-span-2 rounded-3xl overflow-hidden relative ambient-shadow group min-h-[300px]">
<div className="absolute inset-0 bg-gradient-to-br from-primary via-[#0066FF] to-[#00B8D9] opacity-90"></div>
<div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8 md:p-12">
<h3 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">Premium Canvas</h3>
<p className="font-body max-w-lg text-white/95 text-lg leading-relaxed">Showcase your brand in an environment designed for high-end digital curation.</p>
</div>
</div>
</div>
</section> <section className="relative z-10 py-12">
<div className="text-center mb-16">
<h2 className="font-headline text-3xl md:text-4xl font-bold text-on-background tracking-tight mb-4">The Process</h2>
<p className="font-body text-on-surface-variant max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">A seamless journey from discovery to placement, guided by our core philosophy.</p>
</div>
<div className="max-w-4xl mx-auto flex flex-col gap-12"> <div className="flex flex-col md:flex-row gap-8 items-start group">
<div className="w-16 h-16 shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-lg shadow-secondary-container/20 group-hover:scale-110 transition-transform duration-300">
<span className="font-headline font-bold text-xl text-on-secondary-container">1</span>
</div>
<div className="flex-grow pt-2">
<h3 className="font-headline text-2xl font-bold text-on-background mb-3">Curation &amp; Profiling</h3>
<p className="font-body text-on-surface-variant leading-relaxed mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000"> We begin by building a structural profile. Using our deep professional blues and sophisticated neutrals, your data is presented not as a dense spreadsheet, but as an editorial narrative. </p>
</div>
</div> <div className="flex flex-col md:flex-row gap-8 items-start group">
<div className="w-16 h-16 shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-lg shadow-secondary-container/20 group-hover:scale-110 transition-transform duration-300">
<span className="font-headline font-bold text-xl text-on-secondary-container">2</span>
</div>
<div className="flex-grow pt-2">
<h3 className="font-headline text-2xl font-bold text-on-background mb-3">Tonal Layering Match</h3>
<p className="font-body text-on-surface-variant leading-relaxed mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000"> Our matching algorithm uses a"no-line" philosophy. We connect talent with opportunities through subtle shifts in requirements and skills, ensuring a natural, organic fit rather than forcing connections. </p>
</div>
</div> <div className="flex flex-col md:flex-row gap-8 items-start group">
<div className="w-16 h-16 shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-lg shadow-secondary-container/20 group-hover:scale-110 transition-transform duration-300">
<span className="font-headline font-bold text-xl text-on-secondary-container">3</span>
</div>
<div className="flex-grow pt-2">
<h3 className="font-headline text-2xl font-bold text-on-background mb-3">Glassmorphic Integration</h3>
<p className="font-body text-on-surface-variant leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000"> Once matched, communication and onboarding flow through our premium interface. The experience remains fluid and expansive, providing stability for students and a premium showcase for companies. </p>
</div>
</div>
</div>
</section> <section className="relative z-10 max-w-3xl mx-auto w-full mb-12">
<div className="liquid-glass rounded-[2rem] p-8 md:p-12 ambient-shadow">
<div className="mb-10 text-center">
<h2 className="font-headline text-3xl font-bold text-on-background tracking-tight mb-3">Contact Support</h2>
<p className="font-body text-on-surface-variant animate-in fade-in slide-in-from-bottom-4 duration-1000">Our curation team is here to assist you with any inquiries.</p>
</div>
<form className="flex flex-col gap-6">
<div className="flex flex-col gap-2">
<label className="font-label text-sm font-medium text-on-surface" htmlFor="name">Full Name</label>
<input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-0 focus:outline focus:outline-2 focus:outline-primary/15 transition-all duration-200" id="name" placeholder="Jane Doe" type="text"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label text-sm font-medium text-on-surface" htmlFor="email">Email Address</label>
<input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-0 focus:outline focus:outline-2 focus:outline-primary/15 transition-all duration-200" id="email" placeholder="jane@example.com" type="email"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label text-sm font-medium text-on-surface" htmlFor="message">Message</label>
<textarea className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-0 focus:outline focus:outline-2 focus:outline-primary/15 transition-all duration-200 resize-none" id="message" placeholder="How can we help you construct your path?" rows="4"></textarea>
</div>
<button className="mt-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-body font-medium px-8 py-4 rounded-xl text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 w-full" type="submit"> Send Message </button>
</form>
</div>
</section>
</main> <footer className="w-full border-t border-slate-200/15 bg-slate-50 mt-auto relative z-10">
<div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full max-w-7xl mx-auto gap-8 md:gap-0"> <div className="flex flex-col items-center md:items-start gap-2">
<span className="text-lg font-bold text-slate-900 font-headline tracking-tight"> Skillnest </span>
<p className="font-inter text-sm antialiased text-slate-500">© 2026 Skillnest. The Architectural Curator.</p>
</div> <div className="flex flex-col md:flex-row items-center md:items-end gap-6 font-inter text-sm antialiased">
<div className="flex flex-col items-center md:items-end">
<span className="font-bold text-slate-900 mb-1 uppercase tracking-widest text-[10px]">Contacts</span>
<div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-slate-500">
<a className="hover:text-blue-400 transition-colors" href="tel:+15551234567">Phone: (555) 123-4567</a>
<a className="hover:text-blue-400 transition-colors" href="mailto:support@skillnest.com">Email: support@skillnest.com</a>
<a className="hover:text-blue-400 transition-colors" href="https://github.com/skillnest" target="_blank" rel="noopener noreferrer">GitHub: @skillnest</a>
</div>
</div>
</div>
</div>
</footer> </div> );
}
