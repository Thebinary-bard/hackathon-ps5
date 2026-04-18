import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import iconBg from './assets/icon2.png';

export default function LandingPage() {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const triangleRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    let mouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
    let mouseY = typeof window !== 'undefined' ? window.innerHeight / 2 : 500;

    const updateTransforms = () => {
      if (typeof window !== 'undefined') {
        const tx = (mouseX / window.innerWidth - 0.5) * 80;
        const ty = (mouseY / window.innerHeight - 0.5) * 80;

        if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${tx * 1.5}px, ${ty * 1.5}px)`;
        if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${-tx * 1.2}px, ${-ty * 1.2}px)`;
        if (blob3Ref.current) blob3Ref.current.style.transform = `translate(${tx * 0.8}px, ${-ty * 1.8}px)`;
        if (triangleRef.current) triangleRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      requestRef.current = requestAnimationFrame(updateTransforms);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(updateTransforms);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const topPos = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="top" className="font-body bg-surface text-on-surface antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        .liquid-glass {
            background: rgba(252, 249, 248, 0.6);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(194, 198, 216, 0.15); /* outline-variant at 15% */
        }
        .ambient-shadow {
            box-shadow: 0 20px 40px -10px rgba(0, 24, 73, 0.06); /* primary tinted shadow */
        }
        .gradient-text {
            background: linear-gradient(135deg, #0050cb, #0066ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .blooming-bg {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.4;
            z-index: -1;
        }
      `}</style>

      {/* Interactive Fluid & Ripple Background Elements */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Dynamic Magnetic Blobs */}
        <div 
          ref={blob1Ref}
          className="blooming-bg bg-primary-container w-[600px] h-[600px] top-[-100px] left-[-200px] animate-spin-slow transition-transform duration-1000 ease-out"
        ></div>
        <div 
          ref={blob2Ref}
          className="blooming-bg bg-tertiary-container w-[500px] h-[500px] top-[20%] right-[-150px] animate-float transition-transform duration-1000 delay-75 ease-out"
        ></div>
        <div 
          ref={blob3Ref}
          className="blooming-bg bg-secondary-container w-[700px] h-[700px] bottom-[-200px] left-[10%] animate-spin-slow transition-transform duration-1000 delay-150 ease-out"
          style={{ animationDirection: "reverse" }}
        ></div>
        
      </div>

      {/* Smooth Follow Triangle */}
      <div 
        ref={triangleRef}
        className="fixed pointer-events-none z-40 opacity-20 transition-transform duration-700 ease-out top-0 left-0"
      >
        <svg className="w-16 h-16 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 0px 10px rgba(0, 102, 255, 0.4))' }}>
          <polygon points="50,10 90,90 10,90" fill="transparent" stroke="rgba(0, 102, 255, 0.8)" strokeWidth="6" strokeLinejoin="round" />
        </svg>
      </div>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-2xl shadow-blue-900/5 transition-all duration-300 animate-slide-down">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          {/* Brand */}
          <Link className="text-2xl font-black text-blue-700 font-rozha tracking-tight scale-95 active:scale-90 transition-transform hover:animate-pulse" to="/">
            Skillnest
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 items-center font-konkhmer tracking-tight font-semibold">
            <button className="text-blue-700 border-b-2 border-blue-600 pb-1 hover:text-blue-500 transition-colors duration-300 scale-95 active:scale-90 hover:-translate-y-0.5" onClick={(e) => scrollToSection(e, 'top')}>Home</button>
            <button className="text-slate-600 pb-1 hover:text-blue-500 transition-colors duration-300 scale-95 active:scale-90 hover:-translate-y-0.5" onClick={(e) => scrollToSection(e, 'features')}>Features</button>
            <button className="text-slate-600 pb-1 hover:text-blue-500 transition-colors duration-300 scale-95 active:scale-90 hover:-translate-y-0.5" onClick={(e) => scrollToSection(e, 'process')}>How it Works</button>
            <button className="text-slate-600 pb-1 hover:text-blue-500 transition-colors duration-300 scale-95 active:scale-90 hover:-translate-y-0.5" onClick={(e) => scrollToSection(e, 'contact')}>Contact Support</button>
          </div>

          {/* Actions */}
          <div className="hidden md:flex gap-4 items-center">
            <Link to="/auth" state={{ role: 'company' }}>
              <button className="font-konkhmer text-sm font-medium text-slate-600 hover:text-blue-500 transition-colors duration-300">
                For Companies
              </button>
            </Link>
            <Link to="/auth" state={{ role: 'student' }}>
              <button className="font-konkhmer text-sm font-medium bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 scale-95 active:scale-90 hover:animate-pulse-glow">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-600">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-32">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-12 md:mt-24 relative z-10 w-full">
          {/* Foreground Brand Logo */}
          <div className="mb-10 hover:scale-105 transition-transform duration-500 animate-float">
            <img src={iconBg} alt="Skillnest Logo" className="w-32 md:w-48 h-auto select-none drop-shadow-2xl" />
          </div>

          <span className="bg-secondary-container text-on-secondary-container font-label text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide uppercase animate-slide-down">
            The New Standard
          </span>
          <h1 className="font-rozha text-5xl md:text-7xl font-extrabold tracking-tight text-on-background max-w-4xl leading-[1.1] mb-6 animate-bounce-fade drop-shadow-lg">
            Skillnest: <span className="gradient-text">Merit-Over-Pedigree</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
            Where students grow and companies thrive through expert curation. Move beyond the spreadsheet and experience professional networking as a high-end gallery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-slide-down">
            <Link to="/auth" state={{ role: 'student' }}>
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-body font-medium px-8 py-4 rounded-full text-lg shadow-[0_10px_30px_-10px_rgba(0,80,203,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(0,80,203,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 hover:animate-pulse-glow">
                Get Started
              </button>
            </Link>
            <Link to="/auth" state={{ role: 'student' }}>
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-body font-medium px-8 py-4 rounded-full text-lg shadow-[0_10px_30px_-10px_rgba(0,80,203,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(0,80,203,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 hover:animate-pulse-glow">
                Explore Opportunities
              </button>
            </Link>
            <Link to="/auth" state={{ role: 'company' }}>
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-body font-medium px-8 py-4 rounded-full text-lg shadow-[0_10px_30px_-10px_rgba(0,80,203,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(0,80,203,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 hover:animate-pulse-glow">
                For Companies
              </button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative z-10 scroll-mt-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-background tracking-tight mb-2">Platform Highlights</h2>
              <p className="font-body text-on-surface-variant animate-in fade-in slide-in-from-bottom-4 duration-1000">Where Skills Speak Louder Than Degrees.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
            {/* Feature 1: Large Card */}
            <div className="md:col-span-2 liquid-glass rounded-3xl p-8 md:p-12 flex flex-col justify-between ambient-shadow hover:bg-surface-container-lowest hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,102,255,0.2)] transition-all duration-500 group overflow-hidden relative">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl group-hover:bg-primary-container/30 transition-all"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-background mb-3">Merit Over Pedigree: AI-Powered Talent Assessment</h3>
                <p className="font-body text-on-surface-variant max-w-md leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  An intelligent assessment platform that calculates a comprehensive <strong>Merit Score</strong> using AI-driven skill and aptitude tests, academic performance (CGPA/DGPA), and proximity factors. It ensures fair hiring by eliminating bias linked to college or brand names, focusing purely on real talent and potential.
                </p>
              </div>
            </div>

            {/* Feature 2: Small Card */}
            <div className="liquid-glass rounded-3xl p-8 flex flex-col justify-between ambient-shadow hover:bg-surface-container-lowest hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,102,255,0.2)] transition-all duration-500 group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-tertiary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-background mb-2">Boosting Local Retention</h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <strong>Promoting local employment improves workforce retention, enabling MSMEs to reduce high attrition rates while effectively addressing reverse migration trends.</strong>
                </p>
              </div>
            </div>

            {/* Feature 3: Small Card */}
            <div className="liquid-glass rounded-3xl p-8 flex flex-col justify-between ambient-shadow hover:bg-surface-container-lowest hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,102,255,0.2)] transition-all duration-500 group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-secondary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-background mb-2">
                  <strong>Intelligent Talent Matching</strong>
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  Profiles are matched based on verified skills, maximum merit score, and location proximity—ensuring fair, relevant, and efficient hiring.
                </p>
              </div>
            </div>

            {/* Feature 4: Wide Image Placeholder Card */}
            <div className="md:col-span-2 rounded-3xl overflow-hidden relative ambient-shadow group hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,102,255,0.3)] transition-all duration-500 cursor-pointer min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#0066FF] to-[#00B8D9] opacity-90 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8 md:p-12">
                <h3 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">Unique Feature</h3>
                <p className="font-body max-w-lg text-white/95 text-lg leading-relaxed">
                  MeritMatch Hub links tier 2/3 talent with nearby MSMEs, cutting relocation costs and boosting retention.<br />
                  With AI skill assessments and apprenticeship-based hiring, we deliver precise, merit-first matches—unlike mass or metro-biased platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="process" className="relative z-10 py-12 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-background tracking-tight mb-4">The Process</h2>
            <p className="font-body text-on-surface-variant max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">A seamless journey from discovery to placement, guided by our core philosophy.</p>
          </div>
          <div className="max-w-4xl mx-auto flex flex-col gap-12">
            
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-start group">
              <div className="w-16 h-16 shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-lg shadow-secondary-container/20 group-hover:scale-110 transition-transform duration-300">
                <span className="font-headline font-bold text-xl text-on-secondary-container">1</span>
              </div>
              <div className="flex-grow pt-2">
                <h3 className="font-headline text-2xl font-bold text-on-background mb-3">Geo-Local Matching</h3>
                <p className="font-body text-on-surface-variant leading-relaxed mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">We prioritize opportunities close to where candidates live—minimizing relocation challenges and helping talent grow within their own communities.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-8 items-start group">
              <div className="w-16 h-16 shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-lg shadow-secondary-container/20 group-hover:scale-110 transition-transform duration-300">
                <span className="font-headline font-bold text-xl text-on-secondary-container">2</span>
              </div>
              <div className="flex-grow pt-2">
                <h3 className="font-headline text-2xl font-bold text-on-background mb-3">Monetization & Growth</h3>
                <p className="font-body text-on-surface-variant leading-relaxed mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">We keep hiring accessible for talent by offering free access to students, while MSMEs can choose flexible pricing through subscription plans or a success-based fee tied to successful hires—ensuring value at every step.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-start group">
              <div className="w-16 h-16 shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-lg shadow-secondary-container/20 group-hover:scale-110 transition-transform duration-300">
                <span className="font-headline font-bold text-xl text-on-secondary-container">3</span>
              </div>
              <div className="flex-grow pt-2">
                <h3 className="font-headline text-2xl font-bold text-on-background mb-3">Language-Agnostic AI Support</h3>
                <p className="font-body text-on-surface-variant leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000">Our AI system understands and processes multiple languages, enabling candidates to interact comfortably in their preferred language—reducing reliance on English and making opportunities more accessible to all.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Contact Support Section */}
        <section id="contact" className="relative z-10 max-w-3xl mx-auto w-full mb-12 scroll-mt-24">
          <div className="liquid-glass rounded-[2rem] p-8 md:p-12 ambient-shadow">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold text-on-background tracking-tight mb-3">Contact Support</h2>
              <p className="font-body text-on-surface-variant animate-in fade-in slide-in-from-bottom-4 duration-1000">Our curation team is here to assist you with any inquiries.</p>
            </div>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="font-label text-sm font-medium text-on-surface" htmlFor="name">Full Name</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-0 focus:outline focus:outline-2 focus:outline-primary/15 transition-all duration-200" id="name" placeholder="Aarav Raj" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-sm font-medium text-on-surface" htmlFor="email">Email Address</label>
                <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-0 focus:outline focus:outline-2 focus:outline-primary/15 transition-all duration-200" id="email" placeholder="rajaarav054@gmail.com" type="email" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-sm font-medium text-on-surface" htmlFor="message">Message</label>
                <textarea className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-0 focus:outline focus:outline-2 focus:outline-primary/15 transition-all duration-200 resize-none" id="message" placeholder="How can we help you construct your path?" rows="4"></textarea>
              </div>
              <button className="mt-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-body font-medium px-8 py-4 rounded-xl text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 w-full" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/15 bg-slate-50 mt-auto relative z-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full max-w-7xl mx-auto gap-8 md:gap-0">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-slate-900 font-headline tracking-tight">
              Skillnest
            </span>
            <p className="font-inter text-sm antialiased text-slate-500">© 2026 Skillnest. The Architectural Curator.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 font-inter text-sm antialiased">
            <div className="flex flex-col items-center md:items-end">
              <span className="font-bold text-slate-900 mb-1 uppercase tracking-widest text-[10px]">Contacts</span>
              <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-slate-500">
                <a className="hover:text-blue-400 transition-colors" href="tel:8298212541">Phone: 8298212541</a>
                <a className="hover:text-blue-400 transition-colors" href="mailto:rajaarav054@gmail.com">Email: rajaarav054@gmail.com</a>
                <a className="hover:text-blue-400 transition-colors" href="https://github.com/aarav214" target="_blank" rel="noreferrer">GitHub: aarav214</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
