import React, { useEffect, useState } from 'react';
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
  if (!name) return <Code size={20} className="text-purple-500 dark:text-purple-400" />;
  const norm = name.toLowerCase();
  const matchedKey = Object.keys(officialTechLogos).find(key => norm.includes(key));
  const logoUrl = matchedKey ? officialTechLogos[matchedKey] : null;

  return (
    <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-[#090528] border border-slate-200 dark:border-purple-900/40 flex items-center justify-center p-2 shadow-sm dark:shadow-[0_0_15px_rgba(126,34,206,0.15)] group-hover:scale-110 transition-transform">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          className="w-6 h-6 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <Code size={20} className="text-purple-500 dark:text-purple-400" />
      )}
    </div>
  );
};

const NewCaseStudyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${id}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setStudy(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching case study:', err);
        setLoading(false);
      }
    };
    fetchStudy();
  }, [id]);

  if (loading) return <div className="py-32 text-center text-slate-500">Loading Case Study Details...</div>;
  if (!study) return <div className="py-32 text-center text-red-500">Case Study not found!</div>;

  const parseJSONField = (field, fallback = []) => {
    if (!field) return fallback;
    try {
      return typeof field === 'string' ? JSON.parse(field) : field;
    } catch (e) {
      return fallback;
    }
  };

  const parsedSpecs = parseJSONField(study.sidebarSpecs, {});

  const specs = {
    client: parsedSpecs.client || study.client || study.clientName || 'N/A',
    industry: parsedSpecs.industry || study.category || 'Technology',
    projectType: parsedSpecs.projectType || study.catName || 'Solution',
    duration: parsedSpecs.duration || 'N/A',
    technologies: parsedSpecs.technologies || study.technology_stack || 'N/A',
    liveUrl: parsedSpecs.liveUrl || study.liveUrl || ''
  };

  const challenges = parseJSONField(study.challenges, []);
  const solutionPoints = parseJSONField(study.solutionPoints, []);
  const radialNodes = parseJSONField(study.radialNodes, ['PRODUCTION', 'QUALITY', 'MAINTENANCE', 'IIOT DEVICES', 'PURCHASE', 'INVENTORY']);
  const keyFeatures = parseJSONField(study.keyFeatures, []);
  const techStack = parseJSONField(study.techStack, []);
  const results = parseJSONField(study.results_impact || study.results, []);
  const solutionHighlights = parseJSONField(study.solutionHighlights, []);
  const testimonial = parseJSONField(study.testimonial, null);

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-[#030112] text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

      {/* Navigation */}
      <NewHomeNav />

      {/* Main Layout Container */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-gray-400 mb-8 tracking-wide">
          <span onClick={() => navigate('/')} className="hover:text-slate-700 dark:hover:text-white cursor-pointer transition-colors">Home</span>
          <ChevronRight size={12} />
          <span onClick={() => navigate('/case-studies')} className="hover:text-slate-700 dark:hover:text-white cursor-pointer transition-colors">Case Studies</span>
          <ChevronRight size={12} />
          <span className="text-purple-600 dark:text-purple-400 font-medium">{study.title} for {study.client || study.clientName}</span>
        </div>

        {/* 2-COLUMN MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* ================= LEFT MAIN COLUMN (68%) ================= */}
          <div className="w-full lg:w-[68%] flex flex-col gap-10">

            {/* 1. HERO SECTION */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-purple-900/40 shadow-lg dark:shadow-2xl overflow-hidden min-h-[500px] flex items-center">

              {/* Background Banner Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={study.heroImage?.startsWith('/uploads') ? `http://localhost:5000${study.heroImage}` : study.heroImage}
                  alt={study.title}
                  className="w-full h-full object-cover object-right"
                />
              </div>

              {/* Gradient Overlay: Solid on the left, fading to transparent on the right */}
              <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/95 to-transparent dark:from-[#060218] dark:via-[#060218]/95 dark:to-transparent" />

              {/* Content Box (Left side only) */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 w-full xl:w-2/3">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-purple-400/30 mb-4 backdrop-blur-sm">
                  {study.catName}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                  {study.title} <br className="hidden sm:block" />
                  <span className="text-purple-600 dark:text-purple-400">for {study.client || study.clientName}</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-200 leading-relaxed mb-8 max-w-2xl">
                  {study.subtitle}
                </p>

                {/* Quick Specs Horizontal Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4 border-t border-slate-200 dark:border-white/20 pt-5 text-left">
                  <div className="flex items-center gap-3">
                    <Building2 size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-semibold">Client</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate" title={specs.client}>{specs.client}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-semibold">Duration</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate" title={specs.duration}>{specs.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Layers size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-semibold">Industry</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate" title={specs.industry}>{specs.industry}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Settings size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-semibold">Type</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate" title={specs.projectType}>{specs.projectType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Code size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-semibold">Tech</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate" title={specs.technologies}>{specs.technologies}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-semibold">Live</p>
                      {specs.liveUrl ? (
                        <a href={`https://${specs.liveUrl}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 hover:underline truncate" title={specs.liveUrl}>
                          Link
                        </a>
                      ) : (
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">N/A</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* 2. BUSINESS CHALLENGE SECTION */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#060218]/90 border border-slate-200 dark:border-purple-900/30 shadow-md dark:shadow-xl">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                  <AlertTriangle size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Business Challenge</h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                {study.businessChallengeDesc}
              </p>

              {/* 5 Challenge Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {challenges.map((item, idx) => {
                  const IconComponent = iconMap[item.icon] || Clock;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#090526] border border-slate-200 dark:border-gray-800/80 flex flex-col justify-between hover:border-purple-400 dark:hover:border-purple-500/40 transition-colors">
                      <div>
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 w-fit mb-3">
                          <IconComponent size={16} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-1.5 leading-snug">{item.title}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. OUR SOLUTION SECTION (WITH RADIAL NODE DIAGRAM) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#060218]/90 border border-slate-200 dark:border-purple-900/30 shadow-md dark:shadow-xl">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                  <Lightbulb size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Solution</h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-8">
                {study.solutionDesc}
              </p>

              {/* 2-Column Split: Bullet List + Radial Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                {/* Left Solution Checkmark Points */}
                <div className="md:col-span-6 space-y-3">
                  {solutionPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40 shrink-0 mt-0.5">
                        <CheckCircle2 size={13} />
                      </div>
                      <span className="text-xs text-slate-700 dark:text-gray-300 leading-snug">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Right Radial Hexagon Hub Diagram */}
                <div className="md:col-span-6 flex justify-center items-center py-4">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">

                    {/* Background glow */}
                    <div className="absolute w-40 h-40 bg-purple-400/10 dark:bg-purple-600/20 rounded-full blur-2xl"></div>

                    {/* Central Hexagon */}
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-800 dark:from-purple-900 dark:to-indigo-950 border-2 border-purple-400 flex flex-col items-center justify-center text-center z-10 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center mb-1">
                        <span className="text-white font-bold text-xs">C</span>
                      </div>
                      <span className="text-xs font-bold text-white tracking-widest uppercase">Codigix</span>
                    </div>

                    {/* Radial Satellites */}
                    {radialNodes.map((node, idx) => {
                      const angles = [0, 60, 120, 180, 240, 300];
                      const angle = angles[idx] || 0;
                      const rad = (angle * Math.PI) / 180;
                      const radius = 105;
                      const x = Math.cos(rad) * radius;
                      const y = Math.sin(rad) * radius;

                      return (
                        <React.Fragment key={idx}>
                          {/* Connecting Line */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-144 -144 288 288">
                            <line x1="0" y1="0" x2={x} y2={y} stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                          </svg>

                          {/* Satellite Node */}
                          <div
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                            className="absolute px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-[#0c0730] border border-purple-300 dark:border-purple-500/40 text-[9px] font-bold text-purple-700 dark:text-purple-200 tracking-wider uppercase shadow-md hover:scale-110 transition-transform"
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
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#060218]/90 border border-slate-200 dark:border-purple-900/30 shadow-md dark:shadow-xl">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                  <Settings size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Key Features Implemented</h3>
              </div>

              {/* 8 Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {keyFeatures.map((feat, idx) => {
                  const IconComponent = iconMap[feat.icon] || Cpu;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#090526] border border-slate-200 dark:border-gray-800/80 hover:border-purple-400 dark:hover:border-purple-500/40 transition-colors">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 w-fit mb-3">
                        <IconComponent size={16} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-1.5">{feat.title}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. TECHNOLOGY STACK SECTION */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#060218]/90 border border-slate-200 dark:border-purple-900/30 shadow-md dark:shadow-xl">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                  <Code size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Technology Stack</h3>
              </div>

              {/* Tech Cards Grid */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {techStack.map((tech, idx) => (
                  <div key={idx} className="flex flex-col items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-[#090526] border border-slate-200 dark:border-purple-900/30 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all w-28 text-center shadow-sm dark:shadow-lg group">
                    <TechLogoIcon name={tech.name} />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-gray-200 mt-2 truncate w-full group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. RESULTS & IMPACT SECTION */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-slate-50 dark:from-[#0c0730] dark:to-[#040114] border border-purple-200 dark:border-purple-900/40 shadow-lg dark:shadow-2xl">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                  <TrendingUp size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Results & Impact</h3>
              </div>

              {/* 5 Impact Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {results.map((res, idx) => {
                  const IconComponent = iconMap[res.icon] || TrendingUp;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#050117] border border-purple-200 dark:border-purple-900/30 flex flex-col justify-between text-center group hover:border-purple-400 dark:hover:border-purple-500/50 transition-colors shadow-sm">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 mx-auto mb-3 border border-purple-200 dark:border-purple-800/30 group-hover:scale-110 transition-transform">
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1.5">{res.val}</h4>
                        <p className="text-[10px] text-slate-600 dark:text-gray-300 leading-tight">{res.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 7. BOTTOM CALL TO ACTION CARD */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 dark:from-purple-950/60 dark:via-[#0a052c] dark:to-indigo-950/60 border border-purple-500 dark:border-purple-500/40 shadow-xl dark:shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-white/20 hidden sm:block">
                  <img src="/assets/images/new-iot-solutions/iot_robot_dark.png" alt="Transform Operations" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Ready to Transform Your Operations?</h3>
                  <p className="text-xs text-white/80 max-w-md">Let Codigix Infotech help you build smarter, more efficient and connected business solutions.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 text-purple-700 text-xs font-bold rounded-lg shadow-lg transition-all flex items-center gap-2"
                >
                  Let's Discuss Your Project <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => navigate('/case-studies')}
                  className="px-4 py-2.5 bg-transparent border border-white/40 hover:border-white hover:bg-white/10 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  View More Case Studies
                </button>
              </div>

            </div>

          </div>

          {/* ================= RIGHT STICKY SIDEBAR (32%) ================= */}
          <div className="w-full lg:w-[32%] shrink-0 flex flex-col gap-6 sticky top-28">

            {/* CARD 1: PROJECT OVERVIEW */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#07031e]/90 border border-slate-200 dark:border-purple-900/40 shadow-md dark:shadow-xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Project Overview</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-6 pb-4 border-b border-slate-200 dark:border-gray-800/80">
                {study.objective}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Client</p>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{specs.client}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                    <Layers size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Industry</p>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{specs.industry}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                    <Settings size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Project Type</p>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{specs.projectType}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Duration</p>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{specs.duration}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                    <Code size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Technologies</p>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{specs.technologies}</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                    <Globe size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Live URL</p>
                    <a href={`https://${specs.liveUrl}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                      {specs.liveUrl}
                    </a>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/case-studies')}
                className="w-full py-2.5 rounded-lg border border-purple-300 dark:border-purple-800/60 bg-purple-50 dark:bg-[#090526] hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Back to Case Studies
              </button>
            </div>

            {/* CARD 2: SOLUTION HIGHLIGHTS */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#07031e]/90 border border-slate-200 dark:border-purple-900/40 shadow-md dark:shadow-xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Solution Highlights</h3>

              <div className="space-y-3">
                {solutionHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40 shrink-0 mt-0.5">
                      <CheckCircle2 size={13} />
                    </div>
                    <span className="text-xs text-slate-700 dark:text-gray-300 leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3: TESTIMONIAL CARD */}
            {testimonial && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-[#0e0730] dark:to-[#040114] border border-purple-200 dark:border-purple-500/40 shadow-lg dark:shadow-xl relative overflow-hidden">
                <div className="text-4xl text-purple-300 dark:text-purple-500/20 font-serif absolute top-3 right-4 select-none">"</div>
                <p className="text-xs text-slate-700 dark:text-gray-200 italic leading-relaxed mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-300 dark:border-purple-500/40 shrink-0">
                    <img
                      src={testimonial.avatar?.startsWith('/uploads') ? `http://localhost:5000${testimonial.avatar}` : (testimonial.avatar || "/assets/images/about/team-1.jpg")}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{testimonial.author}</h4>
                    <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="pt-24 border-t border-slate-200 dark:border-gray-800/30 bg-slate-50 dark:bg-black/20">
        <CtaFooterSection />
      </div>

    </div>
  );
};

export default NewCaseStudyDetailsPage;
