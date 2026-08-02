import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Activity, ShieldCheck, Zap, Layers, ArrowUpRight } from 'lucide-react';
import { aiSolutionsData } from '../../data/aiSolutionsData';
import './ai-solutions.css';

// Chatbot Simulator
const ChatbotSimulator = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your Codigix AI Assistant. Select a query below to test me.' }
  ]);
  const [typing, setTyping] = useState(false);

  const handleOption = (text, reply) => {
    if (typing) return;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md border border-purple-900/40 dark:border-gray-800 bg-[#0c0828] dark:bg-[#07041a] rounded-2xl overflow-hidden font-mono text-[10px] shadow-[0_15px_40px_rgba(139,92,246,0.18)] dark:shadow-2xl flex flex-col h-[280px] text-left keep-dark">
      <div className="bg-[#130d3a] dark:bg-[#0b0724] px-4 py-2.5 border-b border-purple-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-purple-400 animate-pulse" />
          <span className="text-rose-400 font-bold uppercase tracking-wider text-[11px]">AI_CHAT_STREAM_V4</span>
        </div>
        <span className="nh-led-active bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
      </div>
      <div className="p-3.5 flex-1 overflow-y-auto space-y-2 select-none hide-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded-xl max-w-[85%] leading-relaxed ${
              msg.sender === 'user' ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-tr-none shadow-sm' : 'bg-[#181145] text-gray-200 rounded-tl-none border border-purple-900/50'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && <div className="text-purple-300 italic pl-1 animate-pulse">Codigix LLM agent reasoning...</div>}
      </div>
      <div className="p-2.5 border-t border-purple-900/40 bg-[#130d3a] dark:bg-[#0b0724] flex gap-2 flex-wrap">
        <button 
          onClick={() => handleOption("Check order status #405", "Retrieving database details... Order #405 has been dispatched. ETA: 2h 15m.")}
          className="px-2.5 py-1.5 bg-purple-950/70 hover:bg-purple-900 text-[9px] text-purple-200 rounded-lg border border-purple-700/50 transition-colors font-medium flex items-center gap-1"
        >
          Check Order #405
        </button>
        <button 
          onClick={() => handleOption("System OEE metrics", "Live OEE calculation: Assembly line 1 = 92.4%, Line 2 = 91.8%. State: Optimal.")}
          className="px-2.5 py-1.5 bg-purple-950/70 hover:bg-purple-900 text-[9px] text-purple-200 rounded-lg border border-purple-700/50 transition-colors font-medium flex items-center gap-1"
        >
          System OEE Metrics
        </button>
      </div>
    </div>
  );
};

// Voice Agent Simulator
const VoiceAgentSimulator = () => {
  const [callActive, setCallActive] = useState(false);
  const [speech, setSpeech] = useState('');

  const triggerCall = () => {
    if (callActive) {
      setCallActive(false);
      setSpeech('');
      return;
    }
    setCallActive(true);
    setTimeout(() => {
      setSpeech('Hello, thank you for calling Codigix AI Voice Services. How can I assist your team today?');
    }, 1200);
  };

  return (
    <div className="w-full max-w-md border border-purple-900/40 dark:border-gray-800 bg-[#0c0828] dark:bg-[#07041a] rounded-2xl p-4.5 shadow-[0_15px_40px_rgba(139,92,246,0.18)] dark:shadow-2xl font-mono text-[10px] space-y-4 text-left keep-dark">
      <div className="flex items-center justify-between border-b border-purple-900/40 pb-2.5">
        <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">SIP_VOIP_VOICE_AGENT</span>
        <span className={`w-2.5 h-2.5 rounded-full ${callActive ? 'bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]' : 'bg-gray-600'}`}></span>
      </div>
      <div className="h-20 border border-purple-900/40 bg-[#060318] rounded-xl flex items-center justify-center relative overflow-hidden">
        {callActive ? (
          <div className="flex items-center gap-1.5">
            {[2, 4, 6, 8, 10, 8, 6, 4, 2, 4, 6, 8, 10, 6, 3].map((h, i) => (
              <span key={i} className="w-1 bg-cyan-400 rounded animate-pulse" style={{ height: `${h * 4}px`, animationDelay: `${i * 90}ms` }} />
            ))}
          </div>
        ) : (
          <span className="text-gray-500 font-medium">Line Disconnected (Ready)</span>
        )}
      </div>
      <div className="bg-[#130d3a] p-3 rounded-xl border border-purple-900/40 min-h-[48px] text-gray-200 leading-relaxed">
        {speech || '// Press "Trigger VoIP Agent Call" below to stream live audio payload.'}
      </div>
      <button 
        onClick={triggerCall}
        className={`w-full py-2.5 rounded-xl font-bold text-center transition-all shadow-md ${
          callActive ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700'
        }`}
      >
        {callActive ? 'DISCONNECT CALL' : 'TRIGGER VOIP AGENT CALL'}
      </button>
    </div>
  );
};

// Document AI Simulator
const OcrDocumentSimulator = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 5));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md border border-purple-900/40 dark:border-gray-800 bg-[#0c0828] dark:bg-[#07041a] rounded-2xl p-4 shadow-[0_15px_40px_rgba(139,92,246,0.18)] dark:shadow-2xl font-mono text-[10px] grid grid-cols-2 gap-3 h-[260px] text-left keep-dark">
      <div className="border border-purple-900/40 bg-[#060318] rounded-xl p-3 relative flex flex-col justify-between overflow-hidden select-none">
        <div className="absolute left-0 w-full h-0.5 bg-green-400 shadow-[0_0_10px_#4ade80]" style={{ top: `${progress}%` }} />
        <div className="space-y-1.5">
          <div className="w-12 h-2 bg-purple-900/70 rounded" />
          <div className="w-20 h-1.5 bg-gray-700 rounded" />
        </div>
        <div className="space-y-1.5 mt-4">
          <div className="flex justify-between"><span className="w-10 h-1 bg-purple-900/70 rounded" /><span className="w-5 h-1 bg-purple-900/70 rounded" /></div>
          <div className="flex justify-between"><span className="w-12 h-1 bg-gray-700 rounded" /><span className="w-4 h-1 bg-gray-700 rounded" /></div>
        </div>
        <div className="border-t border-purple-900/40 pt-2 flex justify-between">
          <span className="w-8 h-1.5 bg-gray-700 rounded" />
          <span className="w-8 h-1.5 bg-green-500/80 rounded" />
        </div>
      </div>

      <div className="border border-purple-900/40 bg-[#130d3a] rounded-xl p-3 flex flex-col justify-between overflow-y-auto hide-scrollbar">
        <span className="text-[8px] text-purple-300 font-bold uppercase border-b border-purple-900/40 pb-1 block">OCR_PARSER_OUTPUT</span>
        <div className="space-y-1 mt-2 text-gray-300 leading-relaxed">
          <div>{'{'}</div>
          <div className="pl-2">"doc": <span className="text-purple-400">"invoice"</span>,</div>
          <div className={`pl-2 transition-colors ${progress > 30 ? 'text-green-400 font-bold' : ''}`}>"id": "INV-2090",</div>
          <div className={`pl-2 transition-colors ${progress > 60 ? 'text-green-400 font-bold' : ''}`}>"total": "$14,240",</div>
          <div className={`pl-2 transition-colors ${progress > 90 ? 'text-green-400 font-bold' : ''}`}>"status": "verified"</div>
          <div>{'}'}</div>
        </div>
        <div className="text-[8px] text-gray-400 text-right pt-1">
          accuracy: <span className="text-green-400 font-bold">99.8%</span>
        </div>
      </div>
    </div>
  );
};

// Computer Vision Simulator
const ComputerVisionSimulator = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame(f => (f + 1) % 4), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md border border-purple-900/40 dark:border-gray-800 bg-[#0c0828] dark:bg-[#07041a] rounded-2xl p-4 shadow-[0_15px_40px_rgba(139,92,246,0.18)] dark:shadow-2xl font-mono text-[10px] space-y-3 h-[260px] flex flex-col justify-between text-left keep-dark">
      <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
        <span className="text-rose-400 font-bold uppercase tracking-wider text-[11px]">VISION_CAM_FEED_1080P</span>
        <span className="text-gray-400">30fps</span>
      </div>
      
      <div className="border border-purple-900/40 bg-[#060318] rounded-xl h-32 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div className={`w-14 h-14 border-2 rounded-lg flex flex-col justify-between p-1.5 transition-all ${frame === 0 ? 'border-rose-500 bg-rose-500/20' : 'border-purple-500/50 bg-purple-950/30'}`}>
            <span className="text-[7px] text-gray-300 font-bold">Part_A</span>
            {frame === 0 && <span className="text-[7px] text-rose-400 font-extrabold">DEFECT</span>}
          </div>
          <div className={`w-14 h-14 border-2 rounded-lg flex flex-col justify-between p-1.5 transition-all ${frame === 2 ? 'border-rose-500 bg-rose-500/20' : 'border-purple-500/50 bg-purple-950/30'}`}>
            <span className="text-[7px] text-gray-300 font-bold">Part_B</span>
            {frame === 2 && <span className="text-[7px] text-rose-400 font-extrabold">DEFECT</span>}
          </div>
        </div>
        
        <div className="absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded-md border border-purple-900/40 text-gray-200 text-[8px]">
          Status: {frame % 2 === 0 ? 'Defect Flagged' : 'Passed Inspection'}
        </div>
      </div>

      <div className="flex justify-between text-gray-400 text-[8px] pt-1">
        <span>Model: YOLOv8-Defect-Inspect</span>
        <span className="text-cyan-400 font-bold">CONF: 99.4%</span>
      </div>
    </div>
  );
};

// Predictive Analytics Simulator
const PredictiveAnalyticsSimulator = () => {
  return (
    <div className="w-full max-w-md border border-purple-900/40 dark:border-gray-800 bg-[#0c0828] dark:bg-[#07041a] rounded-2xl p-4.5 shadow-[0_15px_40px_rgba(139,92,246,0.18)] dark:shadow-2xl font-mono text-[10px] space-y-3 h-[260px] flex flex-col justify-between text-left keep-dark">
      <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
        <span className="text-purple-300 font-bold uppercase tracking-wider text-[11px]">PREDICTIVE_ML_FORECAST</span>
        <span className="nh-led-active"></span>
      </div>
      
      <div className="h-28 bg-[#060318] border border-purple-900/40 rounded-xl relative overflow-hidden flex items-end">
        <svg className="w-full h-full px-2" viewBox="0 0 200 80" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M0,60 L30,45 L60,50 L90,30 L120,40" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
          <path d="M120,40 L140,25 L160,35 L180,10 L200,15" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" values="10;0" dur="1.5s" repeatCount="indefinite" />
          </path>
        </svg>
        <div className="absolute top-2 right-2 bg-purple-950/80 border border-purple-500/40 rounded-md px-2 py-0.5 text-[8px] text-purple-200 font-bold">
          ACCURACY: 94.2%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 text-center text-gray-300">
        <div className="border border-purple-900/40 rounded-xl py-1.5 bg-[#130d3a]">
          <div className="text-[8px] text-gray-400">Est. Annual Savings</div>
          <div className="font-bold text-white text-xs">$14.2K / month</div>
        </div>
        <div className="border border-purple-900/40 rounded-xl py-1.5 bg-[#130d3a]">
          <div className="text-[8px] text-gray-400">Failure Risk</div>
          <div className="font-bold text-rose-400 text-xs">1.2% (Low)</div>
        </div>
      </div>
    </div>
  );
};

// API Integration Simulator
const ApiIntegrationSimulator = () => {
  return (
    <div className="w-full max-w-md border border-purple-900/40 dark:border-gray-800 bg-[#0c0828] dark:bg-[#07041a] rounded-2xl p-4.5 shadow-[0_15px_40px_rgba(139,92,246,0.18)] dark:shadow-2xl font-mono text-[10px] space-y-3 h-[260px] flex flex-col justify-between text-left keep-dark">
      <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
        <span className="text-green-400 font-bold uppercase tracking-wider text-[11px]">REST_AI_API_CLIENT</span>
        <span className="text-gray-300 font-semibold">POST /v1/chat</span>
      </div>

      <div className="space-y-2 flex-1">
        <div>
          <span className="text-purple-400 font-bold">Headers:</span> <span className="text-gray-300">Authorization: Bearer cdg_live_key</span>
        </div>
        <div className="bg-[#060318] border border-purple-900/40 p-2.5 rounded-xl text-gray-300">
          <div className="text-gray-500">// Request Payload</div>
          <div>{'{'} "prompt": "Trigger alert email for abnormal temperature" {'}'}</div>
        </div>
        <div className="bg-[#130d3a] border border-purple-900/40 p-2.5 rounded-xl text-green-400 font-bold">
          <div className="text-gray-400">// Response 200 OK</div>
          <div>{'{'} "status": "sent", "task_id": "902ab-12", "latency": "14ms" {'}'}</div>
        </div>
      </div>
    </div>
  );
};

// Default High-Tech AI Banner Showcase Visualizer for AI Overview
const DefaultAiVisualizer = ({ tab }) => {
  return (
    <div className="w-full max-w-md bg-gradient-to-br from-[#0c0828] via-[#090520] to-[#120738] border border-purple-500/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(139,92,246,0.25)] relative overflow-hidden flex flex-col justify-between text-left keep-dark min-h-[280px]">
      
      {/* Glow Backdrop Spotlights */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Console Header */}
      <div className="flex items-center justify-between border-b border-purple-900/60 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center">
            <Cpu size={14} className="text-purple-400" />
          </div>
          <span className="text-white font-mono font-bold text-xs tracking-wide">CODIGIX_AI_ENGINE_V4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50 font-bold">
            LATENCY 12ms
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
        </div>
      </div>

      {/* Center Image Showcase Frame */}
      <div className="my-3 relative rounded-xl border border-purple-500/40 overflow-hidden shadow-lg group bg-[#040114]">
        <img 
          src="/assets/images/ai-page/ai_solutions_hero.png" 
          alt="Codigix AI Solutions" 
          className="w-full h-40 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/images/new-home/ai_brain.png';
          }}
        />

        {/* Scan line effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none" />

        {/* Overlay Telemetry HUD Badges */}
        <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-purple-500/30 text-[9px] font-mono text-purple-200 flex items-center gap-1.5 shadow-md">
          <Zap size={11} className="text-yellow-400" />
          <span>Model: Codigix-LLM-70B</span>
        </div>

        <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-emerald-500/40 text-[9px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-md">
          <ShieldCheck size={11} className="text-emerald-400" />
          <span>ISO 27001 Certified</span>
        </div>
      </div>

      {/* Bottom Live System Telemetry Ticker */}
      <div className="bg-[#140b3b] border border-purple-900/50 rounded-xl p-2.5 flex items-center justify-between font-mono text-[9px] text-gray-300 relative z-10">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-rose-400 animate-pulse" />
          <span className="truncate">Multi-Modal AI Pipelines Active</span>
        </div>
        <div className="flex items-center gap-1 text-purple-300 font-bold shrink-0">
          <span>99.98% Accuracy</span>
          <ArrowUpRight size={12} />
        </div>
      </div>

    </div>
  );
};

const renderSandboxWidget = (tab) => {
  switch (tab) {
    case 'AI Chatbots':
      return <ChatbotSimulator />;
    case 'AI Voice Agents':
      return <VoiceAgentSimulator />;
    case 'Document AI (OCR)':
      return <OcrDocumentSimulator />;
    case 'Computer Vision AI':
      return <ComputerVisionSimulator />;
    case 'Predictive Analytics':
      return <PredictiveAnalyticsSimulator />;
    case 'AI API Integration':
      return <ApiIntegrationSimulator />;
    default:
      return <DefaultAiVisualizer tab={tab} />;
  }
};

const AiHero = ({ activeTab }) => {
  const content = aiSolutionsData[activeTab] || aiSolutionsData['AI Overview'];

  return (
    <section className="relative pt-4 lg:pt-6 pb-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">

        {/* Left Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col space-y-5 text-left"
          >
            <nav aria-label="Breadcrumb" className="mb-1">
              <ol className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400 font-medium">
                <li>
                  <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link>
                </li>
                <li className="text-slate-400 dark:text-gray-600">&gt;</li>
                <li>
                  <Link to="/ai-solutions" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">AI Solutions</Link>
                </li>
                <li className="text-slate-400 dark:text-gray-600">&gt;</li>
                <li className="text-purple-600 dark:text-purple-400 font-extrabold" aria-current="page">
                  {activeTab}
                </li>
              </ol>
            </nav>

            <div>
              <span className="ai-tag mb-4">{activeTab.toUpperCase()}</span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight leading-tight">
                {content.titlePrefix}<span className="ai-text-gradient">{content.titleGradient}</span>
              </h1>
              <h2 className="text-lg md:text-xl font-bold text-purple-700 dark:text-purple-300 tracking-wide mt-3">
                {content.subtitle}
              </h2>
            </div>

            <p className="text-slate-650 dark:text-gray-300 text-sm md:text-base max-w-lg leading-relaxed font-normal">
              {content.description}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-purple-200/70 dark:border-gray-800/50 mt-4">
              {content.metrics.map((metric, index) => {
                const MetricIcon = metric.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + (index * 0.08) }}
                    className="flex flex-col justify-between bg-purple-50/60 dark:bg-purple-950/20 p-3.5 rounded-xl border border-purple-200/70 dark:border-purple-800/30 min-w-0"
                  >
                    <div className="flex flex-col space-y-2 mb-2">
                      <div className="w-7 h-7 rounded-lg border border-purple-300 dark:border-purple-500/30 bg-white dark:bg-purple-950/40 flex items-center justify-center shrink-0 shadow-xs">
                        <MetricIcon size={14} className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-[10px] text-slate-600 dark:text-gray-400 font-bold uppercase tracking-wider leading-snug">{metric.label}</span>
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white">{metric.value}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Content - Dynamic Interactive Sandbox Simulator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-sandbox-${activeTab}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative w-full flex items-center justify-center"
          >
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {renderSandboxWidget(activeTab)}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default AiHero;
