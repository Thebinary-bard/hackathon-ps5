import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import userProfile from '../../data/student/userProfile.json';


export default function StudentDashboardLayout({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const firstName = userProfile.mockUserData.name.split(' ')[0];

  const [chatHistory, setChatHistory] = useState([
    { role: "model", text: `Hello ${firstName}! I'm your AI Copilot. I can see your profile and help with your resume, job descriptions, tasks, and opportunities. What do you need?` }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  // Build screen context from the current page + user data
  const buildScreenContext = () => {
    const pageMap = {
      '/student/dashboard': 'Profile & Dashboard page',
      '/student/opportunities': 'Opportunities page',
      '/student/tasks': 'Tasks Overview page',
    };
    const currentPage = pageMap[path] || (path.includes('/tasks/') ? 'Task Detail page' : path);

    return `[Screen Context]
Current Page: ${currentPage}
User: ${userProfile.mockUserData.name}
Title: ${userProfile.mockUserData.title}
Skills: ${userProfile.mockUserData.skills.join(', ')}
Trust Score: ${userProfile.mockUserData.trustScore}/100 (${userProfile.mockUserData.percentile})
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

    // Prepend screen context to every message
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
        setChatHistory(prev => [...prev, { role: "model", text: data.data.reply }]);
      } else {
        setChatHistory(prev => [...prev, { role: "model", text: "Sorry, I couldn't process that request." }]);
      }
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      setChatHistory(prev => [...prev, { role: "model", text: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // Web Speech API voice command
  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in your browser. Try Chrome.");
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
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      handleSendMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };


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
            <span>Company tasks</span>
          </Link>
          <Link className={getSidebarClass('/student/practice')} to="/student/practice">
            <span className="material-symbols-outlined">code</span>
            <span>Practice tasks</span>
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
            <p className="font-body text-xs text-on-surface-variant">{isListening ? '🎤 Listening...' : isLoading ? 'Thinking...' : 'Ready to assist'}</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {chatHistory.map((msg, index) => (
            msg.role === 'model' ? (
              <div key={index} className="bg-surface-container-lowest p-4 rounded-2xl rounded-tl-sm shadow-sm border border-surface-variant/50 relative">
                <div style={{ position: 'absolute', top: -10, left: -10, width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(to bottom right, #0050cb, #0066ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>smart_toy</span>
                </div>
                <p className="font-body text-sm text-on-surface whitespace-pre-wrap">{msg.text}</p>
              </div>
            ) : (
              <div key={index} className="bg-primary/5 p-4 rounded-2xl rounded-tr-sm self-end ml-8">
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
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 ${inputText.trim() ? 'text-primary hover:text-primary-container' : 'text-on-surface-variant/50'} transition-colors`}
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings:"'FILL' 1" }}>send</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
