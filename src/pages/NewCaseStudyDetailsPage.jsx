import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight, ArrowRight, CheckCircle2, Clock,
  Building2, Calendar, Layers, ShieldCheck, Cpu,
  Activity, TrendingUp, AlertTriangle, Box, Wrench,
  FileText, FileSpreadsheet, Eye, Settings, Globe, ArrowLeft, Lightbulb, Code
} from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import { caseStudiesData, getCaseStudyById } from '../data/caseStudiesData';
import config from '../config';

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
          alt={`${name} logo icon`}
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
        const res = await fetch(`${config.API_BASE_URL}/projects/${id}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        if (data && data.title) {
          setStudy(data);
        } else {
          setStudy(getCaseStudyById(id));
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching case study from API, falling back to static data:', err);
        setStudy(getCaseStudyById(id));
        setLoading(false);
      }
    };
    fetchStudy();
  }, [id]);

  if (loading) return <div className="py-32 text-center text-slate-500">Loading Case Study Details...</div>;

  // Final fallback check
  const activeStudy = study || getCaseStudyById(id);
  if (!activeStudy) return <div className="py-32 text-center text-red-500">Case Study not found!</div>;

  const parseJSONField = (field, fallback = []) => {
    if (!field) return fallback;
    try {
      return typeof field === 'string' ? JSON.parse(field) : field;
    } catch (e) {
      return fallback;
    }
  };

  const parsedSpecs = parseJSONField(activeStudy.sidebarSpecs, {});

  const specs = {
    client: parsedSpecs.client || activeStudy.client || activeStudy.clientName || 'N/A',
    industry: parsedSpecs.industry || activeStudy.category || 'Technology',
    projectType: parsedSpecs.projectType || activeStudy.catName || 'Solution',
    duration: parsedSpecs.duration || 'N/A',
    technologies: parsedSpecs.technologies || activeStudy.technology_stack || 'N/A',
    liveUrl: parsedSpecs.liveUrl || activeStudy.liveUrl || ''
  };

  const challenges = parseJSONField(activeStudy.challenges, []);
  const solutionPoints = parseJSONField(activeStudy.solutionPoints, []);
  const radialNodes = parseJSONField(activeStudy.radialNodes, ['PRODUCTION', 'QUALITY', 'MAINTENANCE', 'IIOT DEVICES', 'PURCHASE', 'INVENTORY']);
  const keyFeatures = parseJSONField(activeStudy.keyFeatures, []);
  const techStack = parseJSONField(activeStudy.techStack, []);
  const results = parseJSONField(activeStudy.results_impact || activeStudy.results, []);
  const solutionHighlights = parseJSONField(activeStudy.solutionHighlights, []);
  const testimonial = parseJSONField(activeStudy.testimonial, null);

  const siteUrl = config.SITE_URL || "https://codigixinfotech.com";
  // Exact canonical URL for this route
  const canonicalUrl = `${siteUrl}/case-studies/${id}`;
  const pageTitle = `${activeStudy.title} Case Study | ${specs.client} | Codigix Infotech`;
  const metaDescription = activeStudy.subtitle || activeStudy.objective || `Case Study: How Codigix Infotech delivered ${activeStudy.title} for ${specs.client}.`;

  const heroImgUrl = activeStudy.heroImage?.startsWith('/uploads')
    ? `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || ''}${activeStudy.heroImage}`
    : (activeStudy.heroImage?.startsWith('http') ? activeStudy.heroImage : `${siteUrl}${activeStudy.heroImage || '/assets/images/service/erp_dash.webp'}`);

  // Related Case Studies (filter out active)
  const relatedStudies = caseStudiesData.filter(s => String(s.id) !== String(activeStudy.id)).slice(0, 3);

  // JSON-LD Schemas for Detail Page
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${activeStudy.title} for ${specs.client}`,
    "description": metaDescription,
    "image": heroImgUrl,
    "url": canonicalUrl,
    "datePublished": "2026-08-01",
    "dateModified": "2026-08-02",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "author": {
      "@type": "Organization",
      "name": "Codigix Infotech",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Codigix Infotech",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/assets/images/logos/logo.webp`
      }
    },
    "about": [
      {
        "@type": "Thing",
        "name": specs.projectType
      },
      {
        "@type": "Thing",
        "name": specs.industry
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Case Studies",
        "item": `${siteUrl}/case-studies`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${activeStudy.title} for ${specs.client}`,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <SEO
        title={pageTitle}
        metaTitle={pageTitle}
        description={metaDescription}
        keywords={`${activeStudy.title}, ${specs.client}, ${activeStudy.catName}, ${specs.industry}, ${specs.technologies}, IT case study, Codigix Infotech`}
        canonical={canonicalUrl}
        ogType="article"
        ogImage={heroImgUrl}
        schemaData={[articleSchema, breadcrumbSchema]}
      />

      <div className="min-h-screen font-sans bg-white dark:bg-[#030112] text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

        {/* Navigation */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <main className="mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-gray-400 mb-8 tracking-wide">
            <Link to="/" className="hover:text-slate-700 dark:hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/case-studies" className="hover:text-slate-700 dark:hover:text-white transition-colors">Case Studies</Link>
            <ChevronRight size={12} />
            <span className="text-purple-600 dark:text-purple-400 font-medium">{activeStudy.title} for {specs.client}</span>
          </nav>

          {/* 2-COLUMN MAIN LAYOUT */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start mb-16">

            {/* ================= LEFT MAIN COLUMN (68%) ================= */}
            <div className="w-full lg:w-[68%] flex flex-col gap-10">

              {/* 1. HERO SECTION */}
              <section className="relative rounded-2xl border border-slate-200 dark:border-purple-900/40 shadow-lg dark:shadow-2xl overflow-hidden min-h-[500px] flex items-center">

                {/* Background Banner Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={heroImgUrl}
                    alt={`${activeStudy.title} hero banner case study for ${specs.client}`}
                    className="w-full h-full object-cover object-right"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/95 to-transparent dark:from-[#060218] dark:via-[#060218]/95 dark:to-transparent" />

                {/* Content Box */}
                <div className="relative z-10 p-6 sm:p-8 lg:p-10 w-full xl:w-2/3">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-purple-400/30 mb-4 backdrop-blur-sm">
                    {activeStudy.catName}
                  </span>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                    {activeStudy.title} <br className="hidden sm:block" />
                    <span className="text-purple-600 dark:text-purple-400">for {specs.client}</span>
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-200 leading-relaxed mb-8 max-w-2xl">
                    {activeStudy.subtitle}
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
              </section>

              {/* 2. BUSINESS CHALLENGE SECTION */}
              <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#060218]/90 border border-slate-200 dark:border-purple-900/30 shadow-md dark:shadow-xl text-left">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                    <AlertTriangle size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Business Challenge</h2>
                </div>

                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                  {activeStudy.businessChallengeDesc}
                </p>

                {/* Challenge Cards Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {challenges.map((item, idx) => {
                    const IconComponent = iconMap[item.icon] || Clock;
                    return (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#090526] border border-slate-200 dark:border-gray-800/80 flex flex-col justify-between hover:border-purple-400 dark:hover:border-purple-500/40 transition-colors">
                        <div>
                          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 w-fit mb-3">
                            <IconComponent size={16} />
                          </div>
                          <h3 className="text-xs font-bold text-slate-800 dark:text-white mb-1.5 leading-snug">{item.title}</h3>
                          <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 3. OUR SOLUTION SECTION */}
              <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#060218]/90 border border-slate-200 dark:border-purple-900/30 shadow-md dark:shadow-xl text-left">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                    <Lightbulb size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Our Engineering Solution</h2>
                </div>

                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-8">
                  {activeStudy.solutionDesc}
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
              </section>

              {/* 4. KEY FEATURES IMPLEMENTED */}
              <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#060218]/90 border border-slate-200 dark:border-purple-900/30 shadow-md dark:shadow-xl text-left">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                    <Settings size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Key Features Implemented</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {keyFeatures.map((feat, idx) => {
                    const IconComponent = iconMap[feat.icon] || Cpu;
                    return (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#090526] border border-slate-200 dark:border-gray-800/80 hover:border-purple-400 dark:hover:border-purple-500/40 transition-colors">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 w-fit mb-3">
                          <IconComponent size={16} />
                        </div>
                        <h3 className="text-xs font-bold text-slate-800 dark:text-white mb-1.5">{feat.title}</h3>
                        <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 5. TECHNOLOGY STACK SECTION */}
              <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#060218]/90 border border-slate-200 dark:border-purple-900/30 shadow-md dark:shadow-xl text-left">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                    <Code size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Technology Stack</h2>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  {techStack.map((tech, idx) => (
                    <div key={idx} className="flex flex-col items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-[#090526] border border-slate-200 dark:border-purple-900/30 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all w-28 text-center shadow-sm dark:shadow-lg group">
                      <TechLogoIcon name={tech.name} />
                      <span className="text-[11px] font-bold text-slate-700 dark:text-gray-200 mt-2 truncate w-full group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. RESULTS & IMPACT SECTION */}
              <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-slate-50 dark:from-[#0c0730] dark:to-[#040114] border border-purple-200 dark:border-purple-900/40 shadow-lg dark:shadow-2xl text-left">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                    <TrendingUp size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Results & Business Impact</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {results.map((res, idx) => {
                    const IconComponent = iconMap[res.icon] || TrendingUp;
                    return (
                      <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#050117] border border-purple-200 dark:border-purple-900/30 flex flex-col justify-between text-center group hover:border-purple-400 dark:hover:border-purple-500/50 transition-colors shadow-sm">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 mx-auto mb-3 border border-purple-200 dark:border-purple-800/30 group-hover:scale-110 transition-transform">
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1.5">{res.val}</h3>
                          <p className="text-[10px] text-slate-600 dark:text-gray-300 leading-tight">{res.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 7. BOTTOM CALL TO ACTION CARD */}
              <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 dark:from-purple-950/60 dark:via-[#0a052c] dark:to-indigo-950/60 border border-purple-500 dark:border-purple-500/40 shadow-xl dark:shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">

                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-white/20 hidden sm:block">
                    <img src="/assets/images/new-iot-solutions/iot_robot_dark.webp" alt="Transform Operations through Codigix IT Solutions" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Ready to Transform Your Operations?</h2>
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

              </section>

            </div>

            {/* ================= RIGHT STICKY SIDEBAR (32%) ================= */}
            <aside className="w-full lg:w-[32%] shrink-0 flex flex-col gap-6 sticky top-28 text-left" aria-label="Project Overview & Testimonials">

              {/* CARD 1: PROJECT OVERVIEW */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#07031e]/90 border border-slate-200 dark:border-purple-900/40 shadow-md dark:shadow-xl">
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">Project Overview</h2>
                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-6 pb-4 border-b border-slate-200 dark:border-gray-800/80">
                  {activeStudy.objective}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                      <Building2 size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Client</p>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">{specs.client}</h3>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                      <Layers size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Industry</p>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">{specs.industry}</h3>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                      <Settings size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Project Type</p>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">{specs.projectType}</h3>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Duration</p>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">{specs.duration}</h3>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                      <Code size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Technologies</p>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{specs.technologies}</h3>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30 shrink-0">
                      <Globe size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-400">Live URL</p>
                      {specs.liveUrl ? (
                        <a href={`https://${specs.liveUrl}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                          {specs.liveUrl}
                        </a>
                      ) : (
                        <p className="text-xs font-bold text-slate-900 dark:text-white">N/A</p>
                      )}
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
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Solution Highlights</h2>

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
                        src={testimonial.avatar?.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || ''}${testimonial.avatar}` : (testimonial.avatar || "/assets/images/about/team-1.jpg")}
                        alt={`${testimonial.author} testimonial avatar from ${testimonial.company}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">{testimonial.author}</h3>
                      <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">{testimonial.title}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              )}

            </aside>

          </div>

          {/* RELATED CASE STUDIES INTERNAL LINKING SECTION */}
          {relatedStudies.length > 0 && (
            <section className="pt-12 border-t border-slate-200 dark:border-gray-800/80 text-left" aria-label="Related Case Studies">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-650 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-2.5 py-1 rounded border border-purple-200 dark:border-purple-500/20 mb-1 inline-block">
                    More Success Stories
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Explore Related Case Studies
                  </h2>
                </div>
                <Link
                  to="/case-studies"
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 shrink-0"
                >
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedStudies.map(item => (
                  <Link
                    key={item.id}
                    to={`/case-studies/${item.id}`}
                    className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-xl overflow-hidden shadow-sm dark:shadow-md hover:border-purple-500/50 transition-all flex flex-col group"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={item.heroImage || item.image}
                        alt={`${item.title} case study for ${item.clientName || item.client}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
                        {item.catName || item.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed flex-1 line-clamp-2 mb-4">
                        {item.subtitle || item.objective}
                      </p>
                      <div className="text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center gap-1 mt-auto">
                        Read Story <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </main>

        {/* Footer */}
        <footer className="pt-24 border-t border-slate-200 dark:border-gray-800/30 bg-slate-50 dark:bg-black/20">
          <CtaFooterSection />
        </footer>

      </div>
    </>
  );
};

export default NewCaseStudyDetailsPage;
