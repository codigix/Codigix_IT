import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ArrowRight, CheckCircle2, Clock, 
  Building2, Calendar, Layers, ShieldCheck, Cpu, 
  Activity, TrendingUp, AlertTriangle, Box, Wrench, 
  FileText, FileSpreadsheet, Eye, Settings, Globe, ArrowLeft, Lightbulb, Code 
} from 'lucide-react';
import { motion } from 'framer-motion';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import { caseStudiesData, getCaseStudyById } from '../data/caseStudiesData';

const iconMap = {
  Clock: Clock,
  Layers: Layers,
  TrendingUp: TrendingUp,
  AlertTriangle: AlertTriangle,
  Box: Box,
  Cpu: Cpu,
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Wrench: Wrench,
  FileText: FileText,
  FileSpreadsheet: FileSpreadsheet,
  Eye: Eye,
  Settings: Settings
};

const officialTechLogos = {
  'node': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'ts': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'mqtt': 'https://raw.githubusercontent.com/mqtt/mqtt.org/gh-pages/images/mqtt-logo.svg',
  'influx': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/influxdb/influxdb-original.svg',
  'redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'nginx': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  'dart': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  'mongo': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'aws': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg',
  'tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  'gcp': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'grafana': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg'
};

const TechLogoIcon = ({ name }) => {
  const norm = name.toLowerCase();
  const matchedKey = Object.keys(officialTechLogos).find(key => norm.includes(key));
  const logoUrl = matchedKey ? officialTechLogos[matchedKey] : null;

  return (
    <div className="w-11 h-11 rounded-xl bg-[#090528] border border-purple-900/40 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(126,34,206,0.15)] group-hover:scale-110 transition-transform">
      {logoUrl ? (
        <img 
          src={logoUrl} 
          alt={name} 
          className="w-6 h-6 object-contain filter brightness-110 contrast-125"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }} 
        />
      ) : (
        <Code size={20} className="text-purple-400" />
      )}
    </div>
  );
};

const NewCaseStudyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const study = getCaseStudyById(id);

  const specs = study.sidebarSpecs || {
    client: study.clientName,
    industry: study.category,
    projectType: study.catName,
    duration: '6 Months',
    technologies: 'Node.js, React, MySQL, IIoT',
    liveUrl: `www.${study.clientName.toLowerCase().replace(/\s+/g, '')}.com`
  };

  const challenges = study.challenges || [];
  const solutionPoints = study.solutionPoints || [];
  const radialNodes = study.radialNodes || ['PRODUCTION', 'QUALITY', 'MAINTENANCE', 'IIOT DEVICES', 'PURCHASE', 'INVENTORY'];
  const keyFeatures = study.keyFeatures || [];
  const techStack = study.techStack || [];
  const results = study.results || [];
  const solutionHighlights = study.solutionHighlights || [];
  const testimonial = study.testimonial;

  return (
    <div className="bg-[#0d0b21] min-h-screen font-sans text-white selection:bg-purple-500/30">
      
      {/* Navigation */}
      <NewHomeNav />

      {/* Main Layout Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-8 tracking-wide">
          <span onClick={() => navigate('/new-home')} className="hover:text-white cursor-pointer transition-colors">Home</span>
          <ChevronRight size={12} />
          <span onClick={() => navigate('/new-case-studies')} className="hover:text-white cursor-pointer transition-colors">Case Studies</span>
          <ChevronRight size={12} />
          <span className="text-purple-400 font-medium">{study.title} for {study.clientName}</span>
        </div>

        {/* 2-COLUMN MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          {/* ================= LEFT MAIN COLUMN (68%) ================= */}
          <div className="w-full lg:w-[68%] flex flex-col gap-10">
            
            {/* 1. HERO SECTION */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0c072c] via-[#060218] to-[#030112] border border-purple-900/40 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
              <div className="flex flex-col xl:flex-row gap-8 items-center">
                
                {/* Left Text */}
                <div className="xl:w-3/5">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-800/40 mb-4">
                    {study.catName}
                  </span>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                    {study.title} <br className="hidden sm:block" />
                    <span className="text-[#a855f7]">for {study.clientName}</span>
                  </h1>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {study.subtitle}
                  </p>

                  {/* Quick Specs Horizontal Bar */}
                  <div className="grid grid-cols-3 gap-3 border-t border-purple-900/40 pt-4 text-left">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-purple-400 shrink-0" />
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase font-semibold">Client</p>
                        <p className="text-[11px] font-bold text-white truncate">{specs.client}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-purple-400 shrink-0" />
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase font-semibold">Duration</p>
                        <p className="text-[11px] font-bold text-white">{specs.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Layers size={16} className="text-purple-400 shrink-0" />
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase font-semibold">Industry</p>
                        <p className="text-[11px] font-bold text-white truncate">{specs.industry}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Hero Graphic */}
                <div className="xl:w-2/5 w-full">
                  <div className="relative aspect-video xl:aspect-square rounded-xl overflow-hidden border border-purple-800/40 shadow-xl bg-[#08041c]">
                    <img 
                      src={study.heroImage} 
                      alt={study.title} 
                      className="w-full h-full object-cover filter brightness-105 contrast-110" 
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* 2. BUSINESS CHALLENGE SECTION */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#060218]/90 border border-purple-900/30 shadow-xl">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <AlertTriangle size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">Business Challenge</h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                {study.businessChallengeDesc}
              </p>

              {/* 5 Challenge Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {challenges.map((item, idx) => {
                  const IconComponent = iconMap[item.icon] || Clock;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-[#090526] border border-gray-800/80 flex flex-col justify-between hover:border-purple-500/40 transition-colors">
                      <div>
                        <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/30 w-fit mb-3">
                          <IconComponent size={16} />
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1.5 leading-snug">{item.title}</h4>
                        <p className="text-[10px] text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. OUR SOLUTION SECTION (WITH RADIAL NODE DIAGRAM) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#060218]/90 border border-purple-900/30 shadow-xl">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Lightbulb size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">Our Solution</h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-8">
                {study.solutionDesc}
              </p>

              {/* 2-Column Split: Bullet List + Radial Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Left Solution Checkmark Points */}
                <div className="md:col-span-6 space-y-3">
                  {solutionPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-purple-950/80 text-purple-400 border border-purple-800/40 shrink-0 mt-0.5">
                        <CheckCircle2 size={13} />
                      </div>
                      <span className="text-xs text-gray-300 leading-snug">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Right Radial Hexagon Hub Diagram */}
                <div className="md:col-span-6 flex justify-center items-center py-4">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                    
                    {/* Background glow */}
                    <div className="absolute w-40 h-40 bg-purple-600/20 rounded-full blur-2xl"></div>

                    {/* Central Hexagon */}
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-950 border-2 border-purple-400 flex flex-col items-center justify-center text-center z-10 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center mb-1">
                        <span className="text-purple-300 font-bold text-xs">C</span>
                      </div>
                      <span className="text-xs font-bold text-white tracking-widest uppercase">Codigix</span>
                    </div>

                    {/* Radial Satellites */}
                    {radialNodes.map((node, idx) => {
                      const angles = [0, 60, 120, 180, 240, 300];
                      const angle = angles[idx] || 0;
                      const rad = (angle * Math.PI) / 180;
                      const radius = 105; // px distance from center
                      const x = Math.cos(rad) * radius;
                      const y = Math.sin(rad) * radius;

                      return (
                        <React.Fragment key={idx}>
                          {/* Connecting Line */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-144 -144 288 288">
                            <line x1="0" y1="0" x2={x} y2={y} stroke="#7e22ce" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                          </svg>
                          
                          {/* Satellite Node */}
                          <div 
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                            className="absolute px-2.5 py-1 rounded-lg bg-[#0c0730] border border-purple-500/40 text-[9px] font-bold text-purple-200 tracking-wider uppercase shadow-md hover:scale-110 transition-transform"
                          >
                            {node}
                          </div>
                        </React.Fragment>
                      );
                    })}

                  </div>
                </div>

              </div>
            </div>

            {/* 4. KEY FEATURES IMPLEMENTED */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#060218]/90 border border-purple-900/30 shadow-xl">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Settings size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">Key Features Implemented</h3>
              </div>

              {/* 8 Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {keyFeatures.map((feat, idx) => {
                  const IconComponent = iconMap[feat.icon] || Cpu;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-[#090526] border border-gray-800/80 hover:border-purple-500/40 transition-colors">
                      <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/30 w-fit mb-3">
                        <IconComponent size={16} />
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1.5">{feat.title}</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. TECHNOLOGY STACK SECTION */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#060218]/90 border border-purple-900/30 shadow-xl">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Code size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">Technology Stack</h3>
              </div>

              {/* Tech Cards Grid */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {techStack.map((tech, idx) => (
                  <div key={idx} className="flex flex-col items-center p-3.5 rounded-2xl bg-[#090526] border border-purple-900/30 hover:border-purple-500/50 transition-all w-28 text-center shadow-lg group">
                    <TechLogoIcon name={tech.name} />
                    <span className="text-[11px] font-bold text-gray-200 mt-2 truncate w-full group-hover:text-purple-300 transition-colors">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. RESULTS & IMPACT SECTION */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c0730] to-[#040114] border border-purple-900/40 shadow-2xl">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <TrendingUp size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">Results & Impact</h3>
              </div>

              {/* 5 Impact Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {results.map((res, idx) => {
                  const IconComponent = iconMap[res.icon] || TrendingUp;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-[#050117] border border-purple-900/30 flex flex-col justify-between text-center group hover:border-purple-500/50 transition-colors">
                      <div className="p-2 rounded-lg bg-purple-950/50 text-purple-400 mx-auto mb-3 border border-purple-800/30 group-hover:scale-110 transition-transform">
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-1.5">{res.val}</h4>
                        <p className="text-[10px] text-gray-300 leading-tight">{res.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 7. BOTTOM CALL TO ACTION CARD */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#0a052c] to-indigo-950/60 border border-purple-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-purple-800/40 hidden sm:block">
                  <img src="/assets/images/new-iot-solutions/iot_robot_dark.png" alt="Transform Operations" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Ready to Transform Your Operations?</h3>
                  <p className="text-xs text-gray-300 max-w-md">Let Codigix Infotech help you build smarter, more efficient and connected business solutions.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button 
                  onClick={() => navigate('/new-contact')}
                  className="px-5 py-2.5 bg-[#9333ea] hover:bg-[#a855f7] text-white text-xs font-bold rounded-lg shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
                >
                  Let's Discuss Your Project <ArrowRight size={14} />
                </button>
                <button 
                  onClick={() => navigate('/new-case-studies')}
                  className="px-4 py-2.5 bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  View More Case Studies
                </button>
              </div>

            </div>

          </div>

          {/* ================= RIGHT STICKY SIDEBAR (32%) ================= */}
          <div className="w-full lg:w-[32%] shrink-0 flex flex-col gap-6 sticky top-28">
            
            {/* CARD 1: PROJECT OVERVIEW */}
            <div className="p-6 rounded-2xl bg-[#07031e]/90 border border-purple-900/40 shadow-xl">
              <h3 className="text-base font-bold text-white mb-3">Project Overview</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6 pb-4 border-b border-gray-800/80">
                {study.objective}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/30 shrink-0">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Client</p>
                    <h4 className="text-xs font-bold text-white">{specs.client}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/30 shrink-0">
                    <Layers size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Industry</p>
                    <h4 className="text-xs font-bold text-white">{specs.industry}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/30 shrink-0">
                    <Settings size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Project Type</p>
                    <h4 className="text-xs font-bold text-white">{specs.projectType}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/30 shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Duration</p>
                    <h4 className="text-xs font-bold text-white">{specs.duration}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/30 shrink-0">
                    <Code size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Technologies</p>
                    <h4 className="text-xs font-bold text-white leading-snug">{specs.technologies}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/30 shrink-0">
                    <Globe size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Live URL</p>
                    <a href={`https://${specs.liveUrl}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-purple-400 hover:underline">
                      {specs.liveUrl}
                    </a>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/new-case-studies')}
                className="w-full py-2.5 rounded-lg border border-purple-800/60 bg-[#090526] hover:bg-purple-900/40 text-purple-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Back to Case Studies
              </button>
            </div>

            {/* CARD 2: SOLUTION HIGHLIGHTS */}
            <div className="p-6 rounded-2xl bg-[#07031e]/90 border border-purple-900/40 shadow-xl">
              <h3 className="text-base font-bold text-white mb-4">Solution Highlights</h3>
              
              <div className="space-y-3">
                {solutionHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-purple-950/80 text-purple-400 border border-purple-800/40 shrink-0 mt-0.5">
                      <CheckCircle2 size={13} />
                    </div>
                    <span className="text-xs text-gray-300 leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3: TESTIMONIAL CARD */}
            {testimonial && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e0730] to-[#040114] border border-purple-500/40 shadow-xl relative overflow-hidden">
                <div className="text-4xl text-purple-500/20 font-serif absolute top-3 right-4 select-none">“</div>
                <p className="text-xs text-gray-200 italic leading-relaxed mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-500/40 shrink-0">
                    <img src={testimonial.avatar || "/assets/images/about/team-1.jpg"} alt={testimonial.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{testimonial.author}</h4>
                    <p className="text-[10px] text-purple-400 font-medium">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="pt-24 border-t border-gray-800/30 bg-black/20">
        <CtaFooterSection />
      </div>

    </div>
  );
};

export default NewCaseStudyDetailsPage;
