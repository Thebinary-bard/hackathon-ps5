import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import companyProfile from '../../data/company/companyProfile.json';

export default function CompanyDashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [chatHistory, setChatHistory] = useState([
    { role: "model", text: `Hello ${companyProfile.companyName}! I'm your AI Recruitment Assistant. I can see your open roles and talent matches. How can I help you today?` }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  const [showHiredToast, setShowHiredToast] = useState(false);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  // Build screen context from the current page + company data
  const buildScreenContext = () => {
    const pageMap = {
      '/company/dashboard': 'Company Dashboard & Profile',
      '/company/matches': 'Student Matches & Talent Curation',
      '/company/tasks': 'Task Assignment & Management',
      '/company/reviews': 'Submission Reviews',
      '/company/hiring': 'Hiring Pipeline',
    };
    const currentPage = pageMap[path] || path;

    return `[Screen Context]
Current Page: ${currentPage}
Company: ${companyProfile.companyName}
Type: ${companyProfile.companyType}
Active Roles: ${companyProfile.metrics.activeRoles}
Match Rate: ${companyProfile.metrics.successfulMatches} matches
---
User Message: `;
  };

  const handleSendMessage = async (textToSend) => {
    const msg = textToSend || inputText;
    if (!msg.trim()) return;

    const newMessage = { role: "user", text: msg };
    setChatHistory(prev => [...prev, newMessage]);
    setInputText("");
    setIsLoading(true);

    const contextualMessage = buildScreenContext() + msg;

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: "chat",
          message: contextualMessage 
        })
      });

      const data = await response.json();
      if (data.success) {
        let replyText = data.data.reply;
        
        // Detect HIRE action
        if (replyText.includes("[ACTION:HIRE]")) {
          replyText = replyText.replace("[ACTION:HIRE]", "").trim();
          setShowHiredToast(true);
          setTimeout(() => setShowHiredToast(false), 5000);
        }

        setChatHistory(prev => [...prev, { role: "model", text: replyText }]);
      } else {
        setChatHistory(prev => [...prev, { role: "model", text: "I'm sorry, I'm having trouble connecting to my brain right now." }]);
      }
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      setChatHistory(prev => [...prev, { role: "model", text: "Connection error. Please check your backend." }]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      handleSendMessage(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const getSidebarClass = (targetPath) => {
    const isActive = path === targetPath || (targetPath !== '/company/dashboard' && path.startsWith(targetPath));
    if (isActive) {
      return "flex items-center space-x-3 text-[#001849] bg-[#ffffff]/50 py-3 px-6 rounded-r-full font-body text-base font-bold cursor-pointer active:scale-98 transition-transform duration-200";
    }
    return "flex items-center space-x-3 text-[#424656] py-3 px-6 hover:bg-[#f6f3f2]/50 rounded-r-full font-body text-base font-bold cursor-pointer hover:translate-x-1 transition-transform duration-200";
  };

  return (
    <div className="bg-background text-on-background font-body antialiased min-h-screen">
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#eae7e7] flex flex-col overflow-y-auto z-40 hidden md:flex pt-6">
        <div className="px-6 pb-2">
          <Link className="text-2xl font-black text-blue-700 font-headline tracking-tight scale-95 active:scale-90 transition-transform block" to="/">
            Skillnest
          </Link>
        </div>
        <div className="px-6 py-2">
          <h2 className="font-headline text-lg font-bold text-on-surface">Company Portal</h2>
          <p className="font-body text-sm text-on-surface-variant">{companyProfile.companyName}</p>
        </div>
        <nav className="flex-1 mt-4 space-y-1 pr-4">
          <Link className={getSidebarClass('/company/dashboard')} to="/company/dashboard">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>business</span>
            <span>Profile</span>
          </Link>
          <Link className={getSidebarClass('/company/matches')} to="/company/matches">
            <span className="material-symbols-outlined">group_add</span>
            <span>Match Student</span>
          </Link>
          <Link className={getSidebarClass('/company/tasks')} to="/company/tasks">
            <span className="material-symbols-outlined">task</span>
            <span>Task Assignment</span>
          </Link>
          <Link className={getSidebarClass('/company/reviews')} to="/company/reviews">
            <span className="material-symbols-outlined">upload_file</span>
            <span>Submission</span>
          </Link>
          <Link className={getSidebarClass('/company/hiring')} to="/company/hiring">
            <span className="material-symbols-outlined">verified_user</span>
            <span>Hiring</span>
          </Link>
        </nav>
        <div className="px-6 pb-6 pt-4 space-y-2">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 text-error py-2 hover:translate-x-1 transition-transform duration-200 w-full text-left"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span className="text-base font-bold">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-0 md:ml-64 mr-0 lg:mr-80 pt-24 px-8 pb-12 overflow-y-auto bg-surface min-h-screen relative z-10 w-full lg:w-auto overflow-x-hidden">
        {children}
      </main>

      <aside className="fixed right-0 top-0 h-screen w-80 border-l border-white/10 bg-[#fcf9f8]/90 backdrop-blur-2xl shadow-2xl flex flex-col p-6 gap-4 z-50 hidden lg:flex">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0050cb] to-[#0066ff] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings:"'FILL' 1" }}>smart_toy</span>
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">AI Copilot</h2>
            <p className="font-body text-xs text-on-surface-variant">{isListening ? '🎤 Listening...' : isLoading ? 'Thinking...' : 'Ready to assist'}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {chatHistory.map((msg, index) => (
            msg.role === 'model' ? (
              <div key={index} className="flex gap-2 items-start animate-slide-down" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0050cb] to-[#0066ff] flex-shrink-0 flex items-center justify-center text-white mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-[12px]">smart_toy</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-2xl rounded-tl-none shadow-sm border border-surface-variant/50">
                  <p className="font-body text-sm text-on-surface whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="bg-primary/5 p-3 rounded-2xl rounded-tr-none self-end ml-8 animate-slide-down">
                <p className="font-body text-sm text-on-surface whitespace-pre-wrap">{msg.text}</p>
              </div>
            )
          ))}
          {isLoading && (
            <div className="bg-surface-container-lowest p-4 rounded-2xl rounded-tl-sm shadow-sm border border-surface-variant/50 w-24">
              <div className="flex space-x-1 justify-center items-center h-4">
                <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="mt-auto space-y-3 pt-4 border-t border-surface-container-high">
          <button 
            onClick={handleVoiceCommand}
            className={`w-full flex items-center justify-center space-x-2 p-3 rounded-xl transition-colors font-body text-sm font-medium ${
              isListening 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }`}>
            <span className="material-symbols-outlined text-lg" style={{ color: isListening ? '#dc2626' : '#0050cb' }}>mic</span>
            <span>{isListening ? 'Listening... (tap to stop)' : 'Voice Command'}</span>
          </button>
          
          <div className="relative">
            <input 
              className="w-full bg-surface-container-lowest border-none rounded-xl pl-4 pr-10 py-3 font-body text-sm focus:ring-2 focus:ring-primary/20 shadow-sm transition-all text-on-surface placeholder-on-surface-variant/50" 
              placeholder="Ask AI..." 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={() => handleSendMessage()}
              disabled={isLoading}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 ${inputText.trim() ? 'text-primary hover:text-primary-container' : 'text-on-surface-variant/50'} transition-colors`}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings:"'FILL' 1" }}>send</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Hired Toast */}
      {showHiredToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#001849] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white">verified</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg">Hiring Initiated!</h3>
              <p className="font-body text-sm text-white/80">Recruitment workflow triggered for student.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

