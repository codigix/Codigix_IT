import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl overflow-hidden font-mono text-[10px] shadow-2xl flex flex-col h-[260px] text-left">
      {/* Header */}
      <div className="bg-[#0b0724] px-4 py-2 border-b border-gray-800 flex items-center justify-between">
        <span className="text-rose-500 font-bold uppercase tracking-wider">AI_CHAT_STREAM</span>
        <span className="nh-led-active bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
      </div>
      {/* Messages */}
      <div className="p-3 flex-1 overflow-y-auto space-y-2 select-none hide-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-2.5 py-1.5 rounded-lg max-w-[80%] leading-relaxed ${
              msg.sender === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-gray-800/80 text-gray-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && <div className="text-gray-500 italic pl-1">AI agent is typing...</div>}
      </div>
      {/* Quick Option Pills */}
      <div className="p-2.5 border-t border-gray-800/80 bg-[#0b0724] flex gap-2 flex-wrap">
        <button 
          onClick={() => handleOption("Check order status #405", "Retrieving database details... Order #405 has been dispatched. ETA: 2h 15m.")}
          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-[9px] text-gray-300 rounded border border-gray-700 transition-colors"
        >
          Check Order #405
        </button>
        <button 
          onClick={() => handleOption("System OEE metrics", "Live OEE calculation: Assembly line 1 = 92.4%, Line 2 = 91.8%. State: Optimal.")}
          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-[9px] text-gray-300 rounded border border-gray-700 transition-colors"
        >
          System OEE
        </button>
      </div>
    </div>
  );
};

// Voice Agent Simulator
const VoiceAgentSimulator = () => {
  const [callActive, setCallActive] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [speech, setSpeech] = useState('');

  const triggerCall = () => {
    if (callActive) {
      setCallActive(false);
      setStatus('Idle');
      setSpeech('');
      return;
    }
    setCallActive(true);
    setStatus('Connecting SIP...');
    setTimeout(() => {
      setStatus('Speaking');
      setSpeech('Hello, thank you for calling. I am your voice assistant. How can I help you today?');
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-cyan-400 font-bold uppercase tracking-wider">SIP_VOIP_CLIENT</span>
        <span className={`w-2.5 h-2.5 rounded-full ${callActive ? 'bg-red-500 animate-pulse shadow-[0_0_8px_#f43f5e]' : 'bg-gray-600'}`}></span>
      </div>
      <div className="h-16 border border-gray-800 bg-[#050117] rounded-xl flex items-center justify-center relative overflow-hidden">
        {callActive ? (
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5].map((h, i) => (
              <span key={i} className="w-0.5 bg-cyan-400 rounded animate-pulse" style={{ height: `${h * 4}px`, animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        ) : (
          <span className="text-gray-600">Line Disconnected</span>
        )}
      </div>
      <div className="bg-[#0b0724] p-2.5 rounded-lg border border-gray-800/80 min-h-[45px] text-gray-300">
        {speech || '// Press "Call" below to stream output.'}
      </div>
      <button 
        onClick={triggerCall}
        className={`w-full py-2.5 rounded-lg font-bold text-center transition-all ${
          callActive ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-cyan-500 hover:bg-cyan-600 text-black'
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
      setProgress(p => {
        if (p >= 100) return 0;
        return p + 4;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] grid grid-cols-2 gap-3 h-[240px] text-left">
      {/* Document page rendering */}
      <div className="border border-gray-800 bg-gray-900 rounded-lg p-2.5 relative flex flex-col justify-between overflow-hidden select-none">
        {/* Neon Green Scan Bar */}
        <div className="absolute left-0 w-full h-0.5 bg-green-400 shadow-[0_0_10px_#4ade80]" style={{ top: `${progress}%` }} />
        <div className="space-y-1">
          <div className="w-10 h-2 bg-gray-700 rounded" />
          <div className="w-16 h-1.5 bg-gray-800 rounded" />
        </div>
        <div className="space-y-1 mt-6">
          <div className="flex justify-between">
            <span className="w-8 h-1 bg-gray-700 rounded" />
            <span className="w-4 h-1 bg-gray-700 rounded" />
          </div>
          <div className="flex justify-between">
            <span className="w-10 h-1 bg-gray-800 rounded" />
            <span className="w-3 h-1 bg-gray-800 rounded" />
          </div>
        </div>
        <div className="border-t border-gray-800 pt-2 flex justify-between">
          <span className="w-6 h-1.5 bg-gray-700 rounded" />
          <span className="w-6 h-1.5 bg-green-500/80 rounded" />
        </div>
      </div>

      {/* Structured JSON Output */}
      <div className="border border-gray-800 bg-[#050117] rounded-lg p-2.5 flex flex-col justify-between overflow-y-auto hide-scrollbar">
        <span className="text-[8px] text-gray-500 uppercase font-bold border-b border-gray-800/80 pb-1 block">JSON_SCHEMA_OUT</span>
        <div className="space-y-1 mt-2 text-gray-400">
          <div>{'{'}</div>
          <div className="pl-2">"doc": <span className="text-purple-400">"invoice"</span>,</div>
          <div className={`pl-2 transition-colors ${progress > 30 ? 'text-green-400 font-bold' : ''}`}>"id": "INV-290",</div>
          <div className={`pl-2 transition-colors ${progress > 60 ? 'text-green-400 font-bold' : ''}`}>"total": "$1,240",</div>
          <div className={`pl-2 transition-colors ${progress > 90 ? 'text-green-400 font-bold' : ''}`}>"tax_id": "80-92a"</div>
          <div>{'}'}</div>
        </div>
        <div className="text-[8px] text-gray-600 text-right">
          acc: <span className="text-green-400">99.8%</span>
        </div>
      </div>
    </div>
  );
};

// Computer Vision Simulator
const ComputerVisionSimulator = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(f => (f + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 h-[240px] text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-rose-500 font-bold uppercase tracking-wider">CCTV_FEED_1080P</span>
        <span className="text-gray-500">30fps</span>
      </div>
      
      <div className="border border-gray-800 bg-gray-900 rounded-lg h-28 relative flex items-center justify-center overflow-hidden">
        {/* Animated conveyor graphics */}
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div className={`w-12 h-12 border-2 rounded flex flex-col justify-between p-1 transition-all ${frame === 0 ? 'border-rose-500 bg-rose-500/10' : 'border-blue-500/50'}`}>
            <span className="text-[6px] text-gray-400">Part_A</span>
            {frame === 0 && <span className="text-[6px] text-rose-400 font-bold">DEFECT</span>}
          </div>
          <div className={`w-12 h-12 border-2 rounded flex flex-col justify-between p-1 transition-all ${frame === 2 ? 'border-rose-500 bg-rose-500/10' : 'border-blue-500/50'}`}>
            <span className="text-[6px] text-gray-400">Part_B</span>
            {frame === 2 && <span className="text-[6px] text-rose-400 font-bold">DEFECT</span>}
          </div>
        </div>
        
        {/* Scanning coordinate box overlays */}
        <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded border border-gray-700 text-gray-400 text-[8px]">
          Detected: {frame % 2 === 0 ? 'Anomaly Flagged' : 'Status OK'}
        </div>
      </div>

      <div className="flex justify-between text-gray-500 text-[8px]">
        <span>Model: YOLOv8-Defect-Detect</span>
        <span className="text-cyan-400 font-bold">CONF: 99.4%</span>
      </div>
    </div>
  );
};

// Predictive Analytics Simulator
const PredictiveAnalyticsSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 h-[240px] flex flex-col justify-between text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-purple-400 font-bold uppercase tracking-wider">FORECAST_MODEL</span>
        <span className="nh-led-active"></span>
      </div>
      
      {/* SVG Time series chart */}
      <div className="h-24 bg-[#050117] border border-gray-800/80 rounded-lg relative overflow-hidden flex items-end">
        <svg className="w-full h-full px-2" viewBox="0 0 200 80" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="200" y2="20" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="0" y1="40" x2="200" y2="40" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="0" y1="60" x2="200" y2="60" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2 2" />
          
          <path d="M0,60 L30,45 L60,50 L90,30 L120,40" fill="none" stroke="#6b7280" strokeWidth="1.5" />
          
          <path d="M120,40 L140,25 L160,35 L180,10 L200,15" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3">
            <animate
              attributeName="stroke-dashoffset"
              values="10;0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <div className="absolute top-2 right-2 bg-purple-950/40 border border-purple-500/30 rounded px-1.5 py-0.5 text-[8px] text-purple-300 font-bold">
          PROJ_ACCURACY: 94.2%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-gray-400">
        <div className="border border-gray-800/80 rounded py-1 bg-[#0b0724]">
          <div className="text-[8px] text-gray-500">Est. Savings</div>
          <div className="font-bold text-white">$14.2K</div>
        </div>
        <div className="border border-gray-800/80 rounded py-1 bg-[#0b0724]">
          <div className="text-[8px] text-gray-500">Fail Probability</div>
          <div className="font-bold text-rose-500">1.2%</div>
        </div>
      </div>
    </div>
  );
};

// API Integration Simulator
const ApiIntegrationSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 h-[240px] flex flex-col justify-between text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-green-400 font-bold uppercase tracking-wider">REST_API_CLIENT</span>
        <span className="text-gray-500">POST /v1/chat</span>
      </div>

      <div className="space-y-2 flex-1">
        <div>
          <span className="text-purple-400">Headers:</span> <span className="text-gray-300">Authorization: Bearer cdg_live_key</span>
        </div>
        <div className="bg-[#050117] border border-gray-800 p-2 rounded-lg text-gray-300">
          <div className="text-gray-600">// Request Payload</div>
          <div>{'{'} "prompt": "Trigger alert email for abnormal temperature" {'}'}</div>
        </div>
        <div className="bg-[#0b0724] border border-gray-800 p-2 rounded-lg text-green-400 font-bold">
          <div className="text-gray-600">// Response 200 OK</div>
          <div>{'{'} "status": "sent", "task_id": "902ab-12", "latency": "14ms" {'}'}</div>
        </div>
      </div>
    </div>
  );
};

// Default spinning core visualizer
const DefaultAiVisualizer = ({ tab }) => {
  return (
    <div className="w-full max-w-sm aspect-square relative flex items-center justify-center p-6">
      {/* Outer spinning ring */}
      <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-purple-500/20 animate-spin-slow"></div>
      
      {/* Inner spinning ring */}
      <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-cyan-400/30 animate-spin-reverse"></div>
      
      {/* Neural Core */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-600/30 via-rose-600/20 to-blue-600/30 border border-purple-500/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(139,92,246,0.25)]">
        <div className="absolute w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]" />
        
        {/* Brain SVG outline */}
        <svg className="w-10 h-10 text-white drop-shadow-[0_0_12px_#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
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
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col space-y-6"
          >
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <span>Home</span> <span className="text-gray-600">&gt;</span> <span>AI Solutions</span> <span className="text-gray-600">&gt;</span> <span className="text-purple-400 font-semibold">{activeTab}</span>
            </div>

            <div>
              <span className="ai-tag mb-4">{activeTab.toUpperCase()}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight leading-tight">
                {content.titlePrefix}<span className="ai-text-gradient">{content.titleGradient}</span>
              </h1>
              <h2 className="text-lg md:text-xl font-semibold text-purple-300 tracking-wide mt-3">
                {content.subtitle}
              </h2>
            </div>

            <p className="text-gray-300 text-sm md:text-base max-w-lg leading-relaxed">
              {content.description}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-800/50 mt-4">
              {content.metrics.map((metric, index) => {
                const MetricIcon = metric.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + (index * 0.08) }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-full border border-purple-500/30 bg-purple-950/30 flex items-center justify-center shrink-0">
                        <MetricIcon size={16} className="text-purple-400" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium leading-tight">{metric.label}</span>
                    </div>
                    <div className="text-xl font-bold text-white pl-1">{metric.value}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Content - Dynamic Interactive Sandbox Simulator (Hidden on mobile for performance/layout, falls back to visualizer) */}
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
