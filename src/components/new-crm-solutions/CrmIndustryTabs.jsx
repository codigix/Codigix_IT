import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, UserPlus, Megaphone, Headset, Settings, 
  FileText, Briefcase, CheckSquare, Truck, LifeBuoy, 
  UserCircle, PieChart, CheckCircle2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const crmModulesList = [
  { name: 'Sales CRM', icon: TrendingUp },
  { name: 'Lead Management', icon: UserPlus },
  { name: 'Marketing Automation', icon: Megaphone },
  { name: 'Customer Support', icon: Headset },
  { name: 'Service Management', icon: Settings },
  { name: 'Quotation Management', icon: FileText },
  { name: 'Project Management', icon: Briefcase },
  { name: 'Task Management', icon: CheckSquare },
  { name: 'Field Service CRM', icon: Truck },
  { name: 'Helpdesk', icon: LifeBuoy },
  { name: 'Customer Portal', icon: UserCircle },
  { name: 'CRM Analytics', icon: PieChart }
];

const crmDashboardData = {
  'Sales CRM': {
    title: 'Sales CRM Dashboard & Funnel',
    desc: 'Manage deals, automated pipelines, quote approvals, and team targets in real-time.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    features: ['Deal Stage Automation', 'Pipeline Drag & Drop', 'AI Deal Win Scoring', 'Quotation E-Signatures', 'Sales Activity Timelines', 'Revenue Forecast Charts'],
    stats: [
      { label: 'Total Leads', value: '12,540', chg: '↑ 15.8%' },
      { label: 'Opportunities', value: '8,320', chg: '↑ 12.5%' },
      { label: 'Won Deals', value: '2,850', chg: '↑ 10.2%' },
      { label: 'Revenue Value', value: '$5.62M', chg: '↑ 15.8%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Leads', val: '12,540', color: 'bg-purple-600' },
      { stage: 'Qualified', val: '8,320', color: 'bg-indigo-600' },
      { stage: 'Proposal', val: '4,150', color: 'bg-pink-600' },
      { stage: 'Won', val: '2,850', color: 'bg-emerald-500' }
    ]
  },
  'Lead Management': {
    title: 'Lead Management & Ingestion Hub',
    desc: 'Ingest multi-channel leads, run automated intent scoring, deduplicate profiles, and route high-fit leads to reps instantly.',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.png',
    features: ['Multi-Channel Ingestion', 'AI Intent Scoring (1-100)', 'Round-Robin Routing', 'Email & SMS Drip Rules', 'Deduplication Engine', 'Ad ROI Attribution'],
    stats: [
      { label: 'Ingested Leads', value: '14,850', chg: '↑ 22.4%' },
      { label: 'Qualified Leads', value: '9,240', chg: '↑ 18.1%' },
      { label: 'Assign Velocity', value: '15 sec', chg: '⚡ Instant', color: 'text-emerald-400' },
      { label: 'Marketing ROI', value: '4.8x', chg: '↑ 14.2%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Ads & Web', val: '14,850', color: 'bg-blue-600' },
      { stage: 'Deduplicated', val: '12,100', color: 'bg-purple-600' },
      { stage: 'Scored High', val: '9,240', color: 'bg-pink-600' },
      { stage: 'Assigned Rep', val: '9,240', color: 'bg-emerald-500' }
    ]
  },
  'Marketing Automation': {
    title: 'Marketing Automation & Campaign Hub',
    desc: 'Design visual drip campaigns, segment hyper-targeted contact lists, execute A/B email tests, and measure revenue attribution.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.png',
    features: ['Visual Drip Builder', 'Dynamic Segmentation', 'A/B Subject Line Tests', 'Omnichannel WhatsApp', 'Landing Page Webforms', 'Revenue Attribution'],
    stats: [
      { label: 'Active Drips', value: '24', chg: '↑ 6 New' },
      { label: 'Segment Reach', value: '180,000', chg: '↑ 12.4%' },
      { label: 'Click-Through Rate', value: '24.2%', chg: '↑ 5.1%', color: 'text-emerald-400' },
      { label: 'Attributed Revenue', value: '$840,000', chg: '↑ 28.5%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Audience Reach', val: '180,000', color: 'bg-rose-600' },
      { stage: 'Email Opens', val: '68,400', color: 'bg-purple-600' },
      { stage: 'Link Clicks', val: '43,560', color: 'bg-indigo-600' },
      { stage: 'Conversions', val: '14,200', color: 'bg-emerald-500' }
    ]
  },
  'Customer Support': {
    title: 'Omnichannel Customer Support Hub',
    desc: 'Centralize support emails, chats, and calls into a unified ticket queue with automated SLA countdowns and CSAT surveys.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    features: ['Omnichannel Ticket Queue', 'SLA Breach Warnings', 'Canned Reply Templates', 'Self-Service KB Articles', 'CSAT Feedback Polls', 'Agent Velocity Metrics'],
    stats: [
      { label: 'Open Tickets', value: '18', chg: '↓ 42.0%' },
      { label: 'First Response Time', value: '4 min', chg: '⚡ Fast', color: 'text-emerald-400' },
      { label: 'SLA Compliance Rate', value: '99.4%', chg: '↑ 1.2%', color: 'text-emerald-400' },
      { label: 'Customer CSAT Score', value: '98.0%', chg: '↑ 4.5%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Tickets Ingested', val: '1,450', color: 'bg-indigo-600' },
      { stage: 'Auto Categorized', val: '1,450', color: 'bg-purple-600' },
      { stage: 'First Response', val: '1,438', color: 'bg-pink-600' },
      { stage: 'SLA Resolved', val: '1,441', color: 'bg-emerald-500' }
    ]
  },
  'Service Management': {
    title: 'Service & Warranty Management Hub',
    desc: 'Track maintenance contracts (AMC), check warranty entitlements, automate preventive service checkups, and manage spare parts.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    features: ['AMC Contract Ledger', 'Warranty Check Console', 'Preventive Service Scheduler', 'Spare Parts Inventory Sync', 'Contract Margin Audits', 'Equipment History Log'],
    stats: [
      { label: 'Active AMCs', value: '340', chg: '↑ 14.2%' },
      { label: 'AMC Renewal Rate', value: '92.4%', chg: '↑ 8.5%', color: 'text-emerald-400' },
      { label: 'Entitlement Scan', value: 'Instant', chg: '100% Valid' },
      { label: 'Parts Inventory Sync', value: '100%', chg: 'Verified', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Contracts Active', val: '340', color: 'bg-emerald-600' },
      { stage: 'Preventive Visits', val: '1,200', color: 'bg-indigo-600' },
      { stage: 'Renewals Pending', val: '45', color: 'bg-amber-600' },
      { stage: 'Renewed & Invoiced', val: '314', color: 'bg-emerald-500' }
    ]
  },
  'Quotation Management': {
    title: 'Quotation & CPQ Management Hub',
    desc: 'Configure products, enforce target discount thresholds, generate interactive web quotes, and collect digital buyer e-signatures.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    features: ['Configure Price Quote (CPQ)', 'Discount Sign-off Matrix', 'Interactive Web Quotes', 'E-Signature Verification', 'Quote Version Control', 'Margin Guard Engine'],
    stats: [
      { label: 'Quotes Issued Today', value: '45', chg: '↑ 18.5%' },
      { label: 'Generation Velocity', value: '3 min', chg: '⚡ Fast', color: 'text-emerald-400' },
      { label: 'Approval Velocity', value: '15 min', chg: '⚡ Fast', color: 'text-emerald-400' },
      { label: 'E-Sign Signatures', value: '94.2%', chg: '↑ 6.4%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Configured CPQ', val: '45', color: 'bg-purple-600' },
      { stage: 'Margin Verified', val: '45', color: 'bg-blue-600' },
      { stage: 'Shared Web Quote', val: '42', color: 'bg-pink-600' },
      { stage: 'E-Signed & Won', val: '40', color: 'bg-emerald-500' }
    ]
  },
  'Project Management': {
    title: 'Client Project Delivery & PMO Hub',
    desc: 'Plan Gantt schedules, monitor team billable hours, track budget burn rates, and give clients transparent status portals.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    features: ['Interactive Gantt Charts', 'Resource Capacity Planner', 'Billable Timesheet Log', 'Budget Burn Rate Alerts', 'Milestone Billing Sync', 'Client Portal Transparency'],
    stats: [
      { label: 'Active Projects', value: '28', chg: '↑ 4 New' },
      { label: 'Milestone On-Time', value: '94.0%', chg: '↑ 2.1%', color: 'text-emerald-400' },
      { label: 'Billable Utilization', value: '86.5%', chg: '↑ 5.2%', color: 'text-emerald-400' },
      { label: 'Budget Overrun Rate', value: '0.0%', chg: 'Clean', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Scope & Budget', val: '28', color: 'bg-indigo-600' },
      { stage: 'Tasks Assigned', val: '240', color: 'bg-purple-600' },
      { stage: 'Milestone Signed', val: '225', color: 'bg-pink-600' },
      { stage: 'Billed & Delivered', val: '28', color: 'bg-emerald-500' }
    ]
  },
  'Task Management': {
    title: 'Task Management & Operations Hub',
    desc: 'Organize cross-department work with visual Kanban boards, sub-task checklists, deadline push alerts, and team productivity logs.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    features: ['Visual Kanban Boards', 'Sub-task Checklist Tools', 'Deadline Reminder Alerts', 'File & Asset Vault', '@Mention Team Comments', 'Productivity Velocity'],
    stats: [
      { label: 'Active Kanban Cards', value: '185', chg: 'Active' },
      { label: 'Completion Velocity', value: '+25%', chg: '↑ 6.2%', color: 'text-emerald-400' },
      { label: 'Overdue Task Rate', value: '0.5%', chg: '↓ 2.1%', color: 'text-emerald-400' },
      { label: 'Checklist Sync', value: '100%', chg: 'Synced', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Backlog Tasks', val: '185', color: 'bg-gray-600' },
      { stage: 'In Progress', val: '94', color: 'bg-purple-600' },
      { stage: 'Review & Verify', val: '42', color: 'bg-pink-600' },
      { stage: 'Done & Archived', val: '49', color: 'bg-emerald-500' }
    ]
  },
  'Field Service CRM': {
    title: 'Field Service Dispatch & Mobile Tech Hub',
    desc: 'Dispatch field technicians based on GPS proximity and skills, guide route navigation, and capture mobile job sign-offs.',
    image: '/assets/images/new-iot-solutions/iot_robot_dark.png',
    features: ['Smart Job Dispatch', 'GPS Route Optimization', 'Offline Mobile Tech App', 'Digital Customer Sign-off', 'Vehicle Trunk Stock Sync', 'First-Time Fix Rate'],
    stats: [
      { label: 'Active Onfield Techs', value: '80', chg: 'Dispatched' },
      { label: 'First-Time Fix Rate', value: '91.0%', chg: '↑ 4.2%', color: 'text-emerald-400' },
      { label: 'Fuel Cost Savings', value: '-22.0%', chg: 'Saved', color: 'text-emerald-400' },
      { label: 'Digital Sign-off Rate', value: '100%', chg: 'Verified', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Jobs Logged', val: '140', color: 'bg-cyan-600' },
      { stage: 'Tech Dispatched', val: '140', color: 'bg-purple-600' },
      { stage: 'Onsite Serviced', val: '132', color: 'bg-pink-600' },
      { stage: 'Signed & Billed', val: '128', color: 'bg-emerald-500' }
    ]
  },
  'Helpdesk': {
    title: 'IT Helpdesk & Incident Resolution Hub',
    desc: 'Ingest internal and external IT incidents, auto-tag issues, leverage AI solution suggestions, and enforce resolution SLAs.',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.png',
    features: ['Smart Ticket Ingestion', 'AI Article Recommender', 'Round-Robin Dispatch', 'SLA Warning Escalations', 'User Feedback Ratings', 'Helpdesk Velocity Log'],
    stats: [
      { label: 'Daily Ticket Volume', value: '450', chg: 'Handled' },
      { label: 'Avg Resolution Time', value: '45 min', chg: '⚡ Fast', color: 'text-emerald-400' },
      { label: 'AI Solution Accuracy', value: '92.4%', chg: '↑ 3.8%', color: 'text-emerald-400' },
      { label: 'SLA Breach Rate', value: '0.0%', chg: 'Zero Breach', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Tickets Created', val: '450', color: 'bg-indigo-600' },
      { stage: 'Auto Tagged & SLA', val: '450', color: 'bg-purple-600' },
      { stage: 'AI Recommended', val: '416', color: 'bg-pink-600' },
      { stage: 'Closed & Rated', val: '448', color: 'bg-emerald-500' }
    ]
  },
  'Customer Portal': {
    title: 'Customer Self-Service & Billing Portal Hub',
    desc: 'Provide clients with 24/7 self-service access to track order shipments, log support tickets, pay invoices, and download contracts.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.png',
    features: ['Branded Self-Service Portal', 'Live Shipment Tracking', 'Self-Service Ticket Log', 'Invoice Payment Ledger', 'Document & Contract Vault', 'Role-Based Sub-Users'],
    stats: [
      { label: 'Active Portal Users', value: '42,000', chg: '↑ 14.8%' },
      { label: 'Ticket Deflection', value: '42.0%', chg: '↑ 8.2%', color: 'text-emerald-400' },
      { label: 'Online Payments', value: '$1.4M', chg: '↑ 22.4%', color: 'text-emerald-400' },
      { label: 'Portal Uptime', value: '99.99%', chg: 'Reliable', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Portal Logins', val: '42,000', color: 'bg-purple-600' },
      { stage: 'Self-Service Visits', val: '28,400', color: 'bg-indigo-600' },
      { stage: 'Paid Invoices Online', val: '14,200', color: 'bg-pink-600' },
      { stage: 'Deflected Support', val: '11,920', color: 'bg-emerald-500' }
    ]
  },
  'CRM Analytics': {
    title: 'CRM Analytics & Revenue Intelligence Hub',
    desc: 'Build drag-and-drop revenue dashboards, analyze sales conversion funnels, track sales rep leaderboards, and schedule AI briefings.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    features: ['Interactive Chart Builder', 'Conversion Drop-off Analyzer', 'Sales Cycle Velocity', 'Rep Quota Leaderboards', 'AI Revenue Forecasts', 'Auto Executive Briefings'],
    stats: [
      { label: 'Funnel Conversion', value: '28.4%', chg: '↑ 4.1%', color: 'text-emerald-400' },
      { label: 'Forecast Accuracy', value: '96.2%', chg: '↑ 2.4%', color: 'text-emerald-400' },
      { label: 'Active BI Widgets', value: '45', chg: 'Live' },
      { label: 'Auto Briefings Set', value: '14', chg: 'Scheduled' }
    ],
    funnel: [
      { stage: 'Total Ingested Leads', val: '10,000', color: 'bg-blue-600' },
      { stage: 'MQL Qualified', val: '5,400', color: 'bg-purple-600' },
      { stage: 'SQL Opportunity', val: '3,800', color: 'bg-pink-600' },
      { stage: 'Won Revenue Deal', val: '2,840', color: 'bg-emerald-500' }
    ]
  }
};

const CrmIndustryTabs = ({ activeTab: mainActiveTab }) => {
  const [activeTab, setActiveTab] = useState('Sales CRM');

  useEffect(() => {
    if (mainActiveTab && crmDashboardData[mainActiveTab]) {
      setActiveTab(mainActiveTab);
    }
  }, [mainActiveTab]);

  const data = crmDashboardData[activeTab] || crmDashboardData['Sales CRM'];

  const handleNextTab = () => {
    const currentIndex = crmModulesList.findIndex(i => i.name === activeTab);
    const nextIndex = (currentIndex + 1) % crmModulesList.length;
    setActiveTab(crmModulesList[nextIndex].name);
  };

  const handlePrevTab = () => {
    const currentIndex = crmModulesList.findIndex(i => i.name === activeTab);
    const prevIndex = (currentIndex - 1 + crmModulesList.length) % crmModulesList.length;
    setActiveTab(crmModulesList[prevIndex].name);
  };

  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h3 className="text-[16px] font-bold text-white tracking-wide">CRM Solutions Dashboards & Interactive Analytics</h3>
        <p className="text-xs text-gray-400 mt-2">Explore tailored dashboard layouts and real-time operational funnels for each CRM solution</p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {crmModulesList.map((mod, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(mod.name)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all ${
              activeTab === mod.name 
              ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105 font-bold' 
              : 'bg-[#050117] border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200'
            }`}
          >
            <mod.icon size={14} className={activeTab === mod.name ? 'text-white' : 'text-purple-400'} />
            <span className="text-[11px] font-medium">{mod.name}</span>
          </button>
        ))}
      </div>

      {/* Interactive Dashboard View */}
      <div className="relative bg-[#090624]/70 border border-purple-900/40 rounded-2xl p-6 lg:p-8 overflow-hidden shadow-2xl">
        
        {/* Navigation Arrows */}
        <div className="flex justify-between items-center absolute top-1/2 left-2 right-2 -translate-y-1/2 z-20 pointer-events-none">
          <button 
            onClick={handlePrevTab}
            className="w-8 h-8 rounded-full bg-black/60 border border-gray-700 flex items-center justify-center text-gray-300 pointer-events-auto hover:bg-purple-600 hover:text-white transition-colors backdrop-blur-sm shadow-lg"
          >
             <ChevronLeft size={16} />
          </button>
          <button 
            onClick={handleNextTab}
            className="w-8 h-8 rounded-full bg-black/60 border border-gray-700 flex items-center justify-center text-gray-300 pointer-events-auto hover:bg-purple-600 hover:text-white transition-colors backdrop-blur-sm shadow-lg"
          >
             <ChevronRight size={16} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row gap-8 relative z-10"
          >
            {/* Left info panel */}
            <div className="lg:w-[40%] flex flex-col justify-center">
               <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-indigo-900/40 to-fuchsia-900/40 border border-gray-800 flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-transparent mix-blend-overlay z-10"></div>
                   <img 
                      src={data.image || '/assets/images/new-iot-solutions/software_wireframe_dark.png'} 
                      alt={activeTab} 
                      className="w-full h-full object-contain p-2 filter contrast-125 brightness-110" 
                    />
               </div>
               <h4 className="text-xl font-bold text-white mb-2">{data.title}</h4>
               <p className="text-[12px] text-gray-300 leading-relaxed mb-6">
                 {data.desc}
               </p>
               <div className="grid grid-cols-2 gap-3">
                  {data.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-purple-500 shrink-0"/>
                      <span className="text-[11px] text-gray-300 leading-tight">{feature}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Right Interactive Dashboard Mockup */}
            <div className="lg:w-[60%] bg-[#030112] border border-gray-800 rounded-xl p-5 flex flex-col gap-4 shadow-inner">
               
               {/* Stats Row */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {data.stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#0c0830] p-3 rounded-lg border border-gray-800/80">
                      <p className="text-[9px] text-gray-400 mb-1 leading-tight uppercase font-medium">{stat.label}</p>
                      <h5 className={`text-sm md:text-base font-bold ${stat.color || 'text-white'}`}>{stat.value}</h5>
                      <span className="text-[9px] text-purple-400 font-semibold">{stat.chg}</span>
                    </div>
                  ))}
               </div>

               {/* Charts & Funnel Row */}
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 mt-2">
                  
                  {/* Left Funnel Representation */}
                  <div className="md:col-span-5 bg-[#0c0830] p-4 rounded-lg border border-gray-800/80 flex flex-col justify-between">
                     <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-3">Module Funnel Flow</p>
                     <div className="flex flex-col gap-2 my-auto">
                        {data.funnel.map((step, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                             <div className="flex justify-between items-center text-[10px] text-gray-300">
                                <span className="font-semibold">{step.stage}</span>
                                <span className="font-bold text-white">{step.val}</span>
                             </div>
                             <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className={`h-full ${step.color}`} style={{ width: `${100 - idx * 22}%` }}></div>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Right Donut & Activity Representation */}
                  <div className="md:col-span-7 bg-[#0c0830] p-4 rounded-lg border border-gray-800/80 flex flex-col justify-between">
                     <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-2">Stage Allocation & Velocity</p>
                     <div className="flex items-center justify-around flex-1 py-2">
                        {/* Donut Simulation */}
                        <div className="relative w-24 h-24 rounded-full border-[7px] border-purple-600 border-t-pink-500 border-r-indigo-500 flex items-center justify-center shadow-lg">
                           <div className="text-center">
                              <span className="text-sm font-bold text-white block leading-none">88.4%</span>
                              <span className="text-[8px] text-gray-400">Target</span>
                           </div>
                        </div>
                        {/* Activity Bars */}
                        <div className="flex items-end gap-2 h-20">
                           <div className="w-3 bg-purple-600 h-[60%] rounded-t"></div>
                           <div className="w-3 bg-pink-500 h-[85%] rounded-t"></div>
                           <div className="w-3 bg-indigo-500 h-[45%] rounded-t"></div>
                           <div className="w-3 bg-emerald-500 h-[95%] rounded-t"></div>
                           <div className="w-3 bg-cyan-400 h-[70%] rounded-t"></div>
                        </div>
                     </div>
                     <div className="flex justify-between items-center text-[9px] text-gray-400 border-t border-gray-800/80 pt-2 mt-2">
                        <span>Real-time Operational Metrics</span>
                        <span className="text-emerald-400 font-bold">● Active Sync</span>
                     </div>
                  </div>

               </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default CrmIndustryTabs;
