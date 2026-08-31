import React, { useState, useEffect } from 'react';
import { Check, X, Monitor, Smartphone, PenTool, Cloud, Infinity as DevOpsIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesTabs = [
  { id: 'web-development', name: 'Web Dev', icon: Monitor },
  { id: 'mobile-apps', name: 'Mobile Apps', icon: Smartphone },
  { id: 'ui-ux-design', name: 'UI/UX', icon: PenTool },
  { id: 'cloud-solutions', name: 'Cloud', icon: Cloud },
  { id: 'devops', name: 'DevOps', icon: DevOpsIcon }
];

const pricingData = {
  'web-development': [
    {
      name: 'Starter Web',
      desc: 'Perfect for small businesses establishing a digital presence.',
      price: '$999',
      period: 'starting at',
      features: ['Up to 5 Pages Responsive Website', 'Standard UI/UX Template', 'Contact Form & Maps Integration', 'Basic SEO Setup', '1 Month Free Support'],
      missing: ['Custom Web App Dashboard', 'Payment Gateway Integration', 'Advanced CMS'],
      highlighted: false,
      delay: 0.1
    },
    {
      name: 'Professional',
      desc: 'Custom web apps and E-commerce for growing enterprises.',
      price: '$3,499',
      period: 'starting at',
      features: ['Custom Full-Stack Web App', 'React / Next.js Frontend', 'Node.js / Python Backend APIs', 'Payment & 3rd Party Integrations', 'Advanced SEO & Analytics', '3 Months Priority Support'],
      missing: ['Dedicated CI/CD Pipeline', '24/7 SLA Guarantee'],
      highlighted: true,
      delay: 0.2
    },
    {
      name: 'Enterprise',
      desc: 'Scalable web systems and enterprise portals.',
      price: 'Custom',
      period: 'per engagement',
      features: ['Microservices Architecture', 'High-Concurrency Scaling', 'Custom CRM / ERP Portals', 'Enterprise Grade Security (SOC2)', 'Dedicated Engineering Team', '24/7 Priority SLA Support'],
      missing: [],
      highlighted: false,
      delay: 0.3
    }
  ],
  'mobile-apps': [
    {
      name: 'MVP App',
      desc: 'Rapid mobile MVP for startups to test the market.',
      price: '$4,999',
      period: 'starting at',
      features: ['Cross-Platform (React Native/Flutter)', 'Core Features (Login, Feed, Profile)', 'Basic Backend API Integration', 'Standard UI/UX Design', 'App Store Submission Support'],
      missing: ['Advanced Animations', 'Offline Data Sync', 'Complex Hardware Integrations'],
      highlighted: false,
      delay: 0.1
    },
    {
      name: 'Growth App',
      desc: 'Feature-rich mobile applications that deliver seamless experiences.',
      price: '$12,499',
      period: 'starting at',
      features: ['Native iOS (Swift) & Android (Kotlin)', 'Push Notification Engines', 'Biometric & Mobile Security', 'Offline Data Synchronization', 'Advanced Interactive UI/UX', '3 Months Maintenance'],
      missing: ['Enterprise MDM Integration'],
      highlighted: true,
      delay: 0.2
    },
    {
      name: 'Enterprise Scale',
      desc: 'Complex apps for millions of users.',
      price: 'Custom',
      period: 'per engagement',
      features: ['Dedicated Mobile Team', 'IoT & Bluetooth Integration', 'Complex Real-time Streaming', 'Enterprise MDM Distribution', 'Continuous Delivery (App Center)', '24/7 Monitoring & Support'],
      missing: [],
      highlighted: false,
      delay: 0.3
    }
  ],
  'ui-ux-design': [
    {
      name: 'UX Audit & Refresh',
      desc: 'Improve conversions on your existing application.',
      price: '$1,499',
      period: 'starting at',
      features: ['Heuristic UX Audit', 'User Journey Mapping', 'UI Modernization Concepts', 'Basic Figma Prototype', 'Accessibility Review'],
      missing: ['Full Atomic Design System', 'Extensive User Testing'],
      highlighted: false,
      delay: 0.1
    },
    {
      name: 'Complete Redesign',
      desc: 'From scratch wireframing and atomic design systems.',
      price: '$3,999',
      period: 'starting at',
      features: ['Comprehensive User Research', 'Figma Wireframing & Prototyping', 'Interactive UI Design', 'Design-to-Code Handoff Assets', 'Brand Identity Integration'],
      missing: ['Ongoing Conversion Optimization'],
      highlighted: true,
      delay: 0.2
    },
    {
      name: 'Design Partner',
      desc: 'Ongoing UX research, A/B testing, and design system scaling.',
      price: 'Custom',
      period: 'per month',
      features: ['Dedicated UI/UX Team', 'Continuous Usability Testing', 'A/B & Multivariate Testing', 'Enterprise Atomic Design Systems', 'Motion & Micro-Interaction Design'],
      missing: [],
      highlighted: false,
      delay: 0.3
    }
  ],
  'cloud-solutions': [
    {
      name: 'Cloud Setup',
      desc: 'Basic infrastructure setup for early-stage products.',
      price: '$1,999',
      period: 'starting at',
      features: ['AWS / Azure Environment Setup', 'Basic Web/App Server Configuration', 'Managed Database Setup', 'Standard SSL & Domain Binding', 'Basic Daily Backups'],
      missing: ['Auto-Scaling', 'Multi-Region Disaster Recovery'],
      highlighted: false,
      delay: 0.1
    },
    {
      name: 'Scalable Architecture',
      desc: 'Production-ready infrastructure with failovers and scaling.',
      price: '$4,999',
      period: 'starting at',
      features: ['Auto-Scaling Groups (ASG)', 'Load Balancing & CDN Setup', 'Cloud Security & IAM Vaults', 'Serverless Functions Setup', 'Automated Database Failovers', 'Cloud FinOps Audit'],
      missing: ['24/7 Incident Response (NOC)'],
      highlighted: true,
      delay: 0.2
    },
    {
      name: 'Enterprise Cloud',
      desc: 'Multi-region architectures and zero-downtime platforms.',
      price: 'Custom',
      period: 'per engagement',
      features: ['Multi-Region Active-Active Setup', 'Disaster Recovery (RTO < 1h)', 'Kubernetes Cluster Provisioning', 'Zero-Trust Security Architecture', 'Compliance (HIPAA/PCI-DSS)', '24/7 Managed NOC Support'],
      missing: [],
      highlighted: false,
      delay: 0.3
    }
  ],
  'devops': [
    {
      name: 'CI/CD Starter',
      desc: 'Automate your deployments and eliminate manual work.',
      price: '$2,499',
      period: 'starting at',
      features: ['GitHub/GitLab Actions Setup', 'Automated Build & Test Pipeline', 'Automated Deployment (1 Env)', 'Basic Error Alerting', 'Dockerization of 1 App'],
      missing: ['Infrastructure as Code (Terraform)', 'Kubernetes Orchestration'],
      highlighted: false,
      delay: 0.1
    },
    {
      name: 'DevOps Pipeline',
      desc: 'End-to-end automation for modern engineering teams.',
      price: '$5,999',
      period: 'starting at',
      features: ['Multi-Environment CI/CD', 'Infrastructure as Code (Terraform)', 'Docker & Containerization', 'Automated Security Scanning', 'Centralized Logging (ELK)', 'Prometheus & Grafana Monitoring'],
      missing: ['24/7 SRE Support'],
      highlighted: true,
      delay: 0.2
    },
    {
      name: 'Managed SRE',
      desc: 'Site Reliability Engineering as a continuous service.',
      price: 'Custom',
      period: 'per month',
      features: ['Dedicated DevOps/SRE Engineer', 'Kubernetes Orchestration & Helm', 'Zero-Downtime Blue/Green Deploys', 'Chaos Engineering & Load Testing', '24/7 Incident Response & On-Call'],
      missing: [],
      highlighted: false,
      delay: 0.3
    }
  ]
};

const OtherServicesPricing = () => {
  const [activeTab, setActiveTab] = useState('web-development');

  useEffect(() => {
    const handleSelectPricing = (e) => {
      if (e.detail && pricingData[e.detail]) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('select-pricing', handleSelectPricing);
    return () => window.removeEventListener('select-pricing', handleSelectPricing);
  }, []);

  const activePlans = pricingData[activeTab] || pricingData['web-development'];

  return (
    <section id="pricing" className="py-16 sm:py-24 border-b border-slate-200 dark:border-gray-800/50 scroll-mt-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">Pricing Models</span></h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto md:mx-0">
            Choose the engagement model that best fits your business goals. Pricing and deliverables are tailored to the specific service you need.
          </p>
        </div>

        {/* Custom Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-12">
          {servicesTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-100 dark:bg-gray-800/80 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-500 dark:text-gray-400'} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Pricing Cards with AnimatePresence for smooth tab switching */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {activePlans.map((plan, idx) => (
              <motion.div
                key={`${activeTab}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: plan.delay, duration: 0.3 }}
                className={`relative flex flex-col p-8 rounded-3xl border ${
                  plan.highlighted 
                    ? 'border-purple-500 shadow-xl shadow-purple-500/10 bg-white dark:bg-[#08041a] z-10 scale-100 md:scale-105' 
                    : 'border-slate-200 dark:border-gray-800/80 bg-white/50 dark:bg-[#050112]/50 backdrop-blur-sm shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8 mt-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 min-h-[40px]">{plan.desc}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">{plan.period}</p>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">What's Included</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Check size={12} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-sm text-slate-700 dark:text-gray-300 leading-snug">{feature}</span>
                      </li>
                    ))}
                    {plan.missing.map((feature, i) => (
                      <li key={`missing-${i}`} className="flex items-start gap-3 opacity-50">
                        <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center">
                          <X size={12} className="text-slate-400 dark:text-gray-500" />
                        </div>
                        <span className="text-sm text-slate-500 dark:text-gray-400 leading-snug line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5'
                    : 'bg-slate-100 dark:bg-gray-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-gray-700'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default OtherServicesPricing;
