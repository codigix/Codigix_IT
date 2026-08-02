import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, UserPlus, Megaphone, Headset, Settings, 
  FileText, Briefcase, CheckSquare, Truck, LifeBuoy, 
  UserCircle, PieChart, CheckCircle2, ChevronLeft, ChevronRight, Activity 
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
    features: ['Deal Stage Automation', 'Pipeline Drag & Drop', 'AI Deal Win Scoring', 'Quotation E-Signatures', 'Sales Activity Timelines', 'Revenue Forecast Charts'],
    funnelTitle: 'Sales Pipeline Conversion',
    funnel: [
      { stage: 'Total Ingested Leads', val: '12,540', color: 'bg-purple-600' },
      { stage: 'Qualified Opportunities', val: '8,320', color: 'bg-indigo-600' },
      { stage: 'Proposals Submitted', val: '4,150', color: 'bg-pink-600' },
      { stage: 'Won Deals Closed', val: '2,850', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Deal Win Rate & Velocity',
    donutMetric: { val: '88.4%', label: 'Quota Target' },
    bars: [
      { height: 'h-[60%]', val: '12.5k', label: 'Leads' },
      { height: 'h-[85%]', val: '8.3k', label: 'Qual' },
      { height: 'h-[45%]', val: '4.1k', label: 'Prop' },
      { height: 'h-[95%]', val: '2.8k', label: 'Won' },
      { height: 'h-[70%]', val: '$5.6M', label: 'Rev' }
    ],
    statusText: 'Real-time Pipeline Telemetry Sync',
    stats: [
      { label: 'Total Leads', value: '12,540', chg: '↑ 15.8%' },
      { label: 'Opportunities', value: '8,320', chg: '↑ 12.5%' },
      { label: 'Won Deals', value: '2,850', chg: '↑ 10.2%' },
      { label: 'Revenue Value', value: '$5.62M', chg: '↑ 15.8%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Lead Management': {
    title: 'Lead Management & Ingestion Hub',
    desc: 'Ingest multi-channel leads, run automated intent scoring, deduplicate profiles, and route high-fit leads to reps instantly.',
    features: ['Multi-Channel Ingestion', 'AI Intent Scoring (1-100)', 'Round-Robin Routing', 'Email & SMS Drip Rules', 'Deduplication Engine', 'Ad ROI Attribution'],
    funnelTitle: 'Lead Ingestion & Routing Flow',
    funnel: [
      { stage: 'Ads & Web Ingestion', val: '14,850', color: 'bg-blue-600' },
      { stage: 'Deduplicated Profiles', val: '12,100', color: 'bg-purple-600' },
      { stage: 'High Intent Scored', val: '9,240', color: 'bg-pink-600' },
      { stage: 'Assigned to Sales Rep', val: '9,240', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Intent Scoring & Routing Velocity',
    donutMetric: { val: '92.4%', label: 'Intent Scored' },
    bars: [
      { height: 'h-[80%]', val: '14.8k', label: 'Ingest' },
      { height: 'h-[90%]', val: '12.1k', label: 'Dedup' },
      { height: 'h-[75%]', val: '9.2k', label: 'Score' },
      { height: 'h-[98%]', val: '15s', label: 'Route' },
      { height: 'h-[85%]', val: '4.8x', label: 'ROI' }
    ],
    statusText: 'Lead Engine & Round-Robin Stream',
    stats: [
      { label: 'Ingested Leads', value: '14,850', chg: '↑ 22.4%' },
      { label: 'Qualified Leads', value: '9,240', chg: '↑ 18.1%' },
      { label: 'Assign Velocity', value: '15 sec', chg: '⚡ Instant', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Marketing ROI', value: '4.8x', chg: '↑ 14.2%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Marketing Automation': {
    title: 'Marketing Automation & Campaign Hub',
    desc: 'Design visual drip campaigns, segment hyper-targeted contact lists, execute A/B email tests, and measure revenue attribution.',
    features: ['Visual Drip Builder', 'Dynamic Segmentation', 'A/B Subject Line Tests', 'Omnichannel WhatsApp', 'Landing Page Webforms', 'Revenue Attribution'],
    funnelTitle: 'Campaign Engagement Drip Flow',
    funnel: [
      { stage: 'Audience Segment Reach', val: '180,000', color: 'bg-rose-600' },
      { stage: 'Delivered Email Opens', val: '68,400', color: 'bg-purple-600' },
      { stage: 'Link Clicks Tracked', val: '43,560', color: 'bg-indigo-600' },
      { stage: 'Direct Web Conversions', val: '14,200', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Click Velocity & Attribution',
    donutMetric: { val: '24.2%', label: 'Click Rate' },
    bars: [
      { height: 'h-[85%]', val: '180k', label: 'Reach' },
      { height: 'h-[70%]', val: '68k', label: 'Opens' },
      { height: 'h-[92%]', val: '43k', label: 'Clicks' },
      { height: 'h-[80%]', val: '14k', label: 'Conv' },
      { height: 'h-[96%]', val: '$840k', label: 'Attributed' }
    ],
    statusText: 'Omnichannel Drip Engine Telemetry',
    stats: [
      { label: 'Active Drips', value: '24', chg: '↑ 6 New' },
      { label: 'Segment Reach', value: '180,000', chg: '↑ 12.4%' },
      { label: 'Click-Through Rate', value: '24.2%', chg: '↑ 5.1%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Attributed Revenue', value: '$840,000', chg: '↑ 28.5%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Customer Support': {
    title: 'Omnichannel Customer Support Hub',
    desc: 'Centralize support emails, chats, and calls into a unified ticket queue with automated SLA countdowns and CSAT surveys.',
    features: ['Omnichannel Ticket Queue', 'SLA Breach Warnings', 'Canned Reply Templates', 'Self-Service KB Articles', 'CSAT Feedback Polls', 'Agent Velocity Metrics'],
    funnelTitle: 'Support Ticket SLA Flow',
    funnel: [
      { stage: 'Omnichannel Ingested', val: '1,450', color: 'bg-indigo-600' },
      { stage: 'Auto Categorized & SLA', val: '1,450', color: 'bg-purple-600' },
      { stage: 'First Response Sent', val: '1,438', color: 'bg-pink-600' },
      { stage: 'Resolved Within SLA', val: '1,441', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'SLA Compliance & CSAT Score',
    donutMetric: { val: '99.4%', label: 'SLA Compliance' },
    bars: [
      { height: 'h-[95%]', val: '1.4k', label: 'Ingest' },
      { height: 'h-[98%]', val: '4m', label: 'FirstResp' },
      { height: 'h-[60%]', val: '18', label: 'Open' },
      { height: 'h-[90%]', val: '99.4%', label: 'SLA' },
      { height: 'h-[85%]', val: '98%', label: 'CSAT' }
    ],
    statusText: 'Omnichannel Support SLA Control Stream',
    stats: [
      { label: 'Open Tickets', value: '18', chg: '↓ 42.0%' },
      { label: 'First Response Time', value: '4 min', chg: '⚡ Fast', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'SLA Compliance Rate', value: '99.4%', chg: '↑ 1.2%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Customer CSAT Score', value: '98.0%', chg: '↑ 4.5%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Service Management': {
    title: 'Service & Warranty Management Hub',
    desc: 'Track maintenance contracts (AMC), check warranty entitlements, automate preventive service checkups, and manage spare parts.',
    features: ['AMC Contract Ledger', 'Warranty Check Console', 'Preventive Service Scheduler', 'Spare Parts Inventory Sync', 'Contract Margin Audits', 'Equipment History Log'],
    funnelTitle: 'AMC Service & Renewal Flow',
    funnel: [
      { stage: 'Active AMC Contracts', val: '340', color: 'bg-emerald-600' },
      { stage: 'Preventive Visits Done', val: '1,200', color: 'bg-indigo-600' },
      { stage: 'Renewal Reminders Sent', val: '45', color: 'bg-amber-600' },
      { stage: 'Renewed & Invoiced', val: '314', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Renewal Rate & Margin Audit',
    donutMetric: { val: '92.4%', label: 'AMC Renewal' },
    bars: [
      { height: 'h-[75%]', val: '340', label: 'Active' },
      { height: 'h-[88%]', val: '1.2k', label: 'Visits' },
      { height: 'h-[65%]', val: '45', label: 'Renew' },
      { height: 'h-[94%]', val: '92.4%', label: 'Rate' },
      { height: 'h-[82%]', val: '100%', label: 'Parts' }
    ],
    statusText: 'AMC Ledger & Warranty Audit Stream',
    stats: [
      { label: 'Active AMCs', value: '340', chg: '↑ 14.2%' },
      { label: 'AMC Renewal Rate', value: '92.4%', chg: '↑ 8.5%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Entitlement Scan', value: 'Instant', chg: '100% Valid' },
      { label: 'Parts Inventory Sync', value: '100%', chg: 'Verified', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Quotation Management': {
    title: 'Quotation & CPQ Management Hub',
    desc: 'Configure products, enforce target discount thresholds, generate interactive web quotes, and collect digital buyer e-signatures.',
    features: ['Configure Price Quote (CPQ)', 'Discount Sign-off Matrix', 'Interactive Web Quotes', 'E-Signature Verification', 'Quote Version Control', 'Margin Guard Engine'],
    funnelTitle: 'CPQ Quote Approval Flow',
    funnel: [
      { stage: 'Configured CPQ Rules', val: '45', color: 'bg-purple-600' },
      { stage: 'Margin Guard Verified', val: '45', color: 'bg-blue-600' },
      { stage: 'Shared Interactive Quote', val: '42', color: 'bg-pink-600' },
      { stage: 'E-Signed & Closed Won', val: '40', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'E-Sign Velocity & Margin Guard',
    donutMetric: { val: '94.2%', label: 'E-Sign Signatures' },
    bars: [
      { height: 'h-[70%]', val: '45', label: 'Quotes' },
      { height: 'h-[85%]', val: '3m', label: 'GenTime' },
      { height: 'h-[80%]', val: '15m', label: 'Appr' },
      { height: 'h-[95%]', val: '94.2%', label: 'ESign' },
      { height: 'h-[90%]', val: '40', label: 'Won' }
    ],
    statusText: 'CPQ & Buyer E-Signature Stream',
    stats: [
      { label: 'Quotes Issued Today', value: '45', chg: '↑ 18.5%' },
      { label: 'Generation Velocity', value: '3 min', chg: '⚡ Fast', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Approval Velocity', value: '15 min', chg: '⚡ Fast', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'E-Sign Signatures', value: '94.2%', chg: '↑ 6.4%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Project Management': {
    title: 'Client Project Delivery & PMO Hub',
    desc: 'Plan Gantt schedules, monitor team billable hours, track budget burn rates, and give clients transparent status portals.',
    features: ['Interactive Gantt Charts', 'Resource Capacity Planner', 'Billable Timesheet Log', 'Budget Burn Rate Alerts', 'Milestone Billing Sync', 'Client Portal Transparency'],
    funnelTitle: 'PMO Project Delivery Flow',
    funnel: [
      { stage: 'Scope & Budget Defined', val: '28', color: 'bg-indigo-600' },
      { stage: 'Tasks & Sprints Assigned', val: '240', color: 'bg-purple-600' },
      { stage: 'Milestone Sign-off Received', val: '225', color: 'bg-pink-600' },
      { stage: 'Billed & Delivered', val: '28', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Gantt Delivery & Billable Burn',
    donutMetric: { val: '94.0%', label: 'Milestones On-Time' },
    bars: [
      { height: 'h-[80%]', val: '28', label: 'Projects' },
      { height: 'h-[92%]', val: '94%', label: 'OnTime' },
      { height: 'h-[75%]', val: '86.5%', label: 'Billable' },
      { height: 'h-[96%]', val: '0.0%', label: 'Overrun' },
      { height: 'h-[88%]', val: '225', label: 'Milestones' }
    ],
    statusText: 'Gantt Schedule & PMO Telemetry Stream',
    stats: [
      { label: 'Active Projects', value: '28', chg: '↑ 4 New' },
      { label: 'Milestone On-Time', value: '94.0%', chg: '↑ 2.1%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Billable Utilization', value: '86.5%', chg: '↑ 5.2%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Budget Overrun Rate', value: '0.0%', chg: 'Clean', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Task Management': {
    title: 'Task Management & Operations Hub',
    desc: 'Organize cross-department work with visual Kanban boards, sub-task checklists, deadline push alerts, and team productivity logs.',
    features: ['Visual Kanban Boards', 'Sub-task Checklist Tools', 'Deadline Reminder Alerts', 'File & Asset Vault', '@Mention Team Comments', 'Productivity Velocity'],
    funnelTitle: 'Kanban Task Execution Flow',
    funnel: [
      { stage: 'Backlog Tasks Created', val: '185', color: 'bg-slate-400 dark:bg-gray-600' },
      { stage: 'In Progress Columns', val: '94', color: 'bg-purple-600' },
      { stage: 'Review & Peer Verification', val: '42', color: 'bg-pink-600' },
      { stage: 'Done & Archived', val: '49', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Kanban Velocity & Checklist Sync',
    donutMetric: { val: '+25%', label: 'Velocity Boost' },
    bars: [
      { height: 'h-[90%]', val: '185', label: 'Cards' },
      { height: 'h-[75%]', val: '+25%', label: 'Speed' },
      { height: 'h-[95%]', val: '0.5%', label: 'Overdue' },
      { height: 'h-[85%]', val: '100%', label: 'Sync' },
      { height: 'h-[92%]', val: '49', label: 'Done' }
    ],
    statusText: 'Visual Kanban Board & Task Stream',
    stats: [
      { label: 'Active Kanban Cards', value: '185', chg: 'Active' },
      { label: 'Completion Velocity', value: '+25%', chg: '↑ 6.2%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Overdue Task Rate', value: '0.5%', chg: '↓ 2.1%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Checklist Sync', value: '100%', chg: 'Synced', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Field Service CRM': {
    title: 'Field Service Dispatch & Mobile Tech Hub',
    desc: 'Dispatch field technicians based on GPS proximity and skills, guide route navigation, and capture mobile job sign-offs.',
    features: ['Smart Job Dispatch', 'GPS Route Optimization', 'Offline Mobile Tech App', 'Digital Customer Sign-off', 'Vehicle Trunk Stock Sync', 'First-Time Fix Rate'],
    funnelTitle: 'GPS Technician Dispatch Flow',
    funnel: [
      { stage: 'Service Jobs Logged', val: '140', color: 'bg-cyan-600' },
      { stage: 'Tech Dispatched Proximity', val: '140', color: 'bg-purple-600' },
      { stage: 'Onsite Repair Completed', val: '132', color: 'bg-pink-600' },
      { stage: 'Signed & Mobile Billed', val: '128', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'First-Time Fix & GPS Mileage',
    donutMetric: { val: '91.0%', label: 'First-Time Fix' },
    bars: [
      { height: 'h-[85%]', val: '80', label: 'Techs' },
      { height: 'h-[95%]', val: '91%', label: 'FixRate' },
      { height: 'h-[70%]', val: '-22%', label: 'FuelSave' },
      { height: 'h-[98%]', val: '100%', label: 'Signoff' },
      { height: 'h-[88%]', val: '128', label: 'Billed' }
    ],
    statusText: 'GPS Route Navigation & Dispatch Telemetry',
    stats: [
      { label: 'Active Onfield Techs', value: '80', chg: 'Dispatched' },
      { label: 'First-Time Fix Rate', value: '91.0%', chg: '↑ 4.2%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Fuel Cost Savings', value: '-22.0%', chg: 'Saved', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Digital Sign-off Rate', value: '100%', chg: 'Verified', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Helpdesk': {
    title: 'IT Helpdesk & Incident Resolution Hub',
    desc: 'Ingest internal and external IT incidents, auto-tag issues, leverage AI solution suggestions, and enforce resolution SLAs.',
    features: ['Smart Ticket Ingestion', 'AI Article Recommender', 'Round-Robin Dispatch', 'SLA Warning Escalations', 'User Feedback Ratings', 'Helpdesk Velocity Log'],
    funnelTitle: 'Helpdesk Incident Resolution Flow',
    funnel: [
      { stage: 'IT Incidents Created', val: '450', color: 'bg-indigo-600' },
      { stage: 'Auto Tagged & SLA Priority', val: '450', color: 'bg-purple-600' },
      { stage: 'AI KB Solution Matched', val: '416', color: 'bg-pink-600' },
      { stage: 'Ticket Closed & Rated', val: '448', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'AI Accuracy & SLA Velocity',
    donutMetric: { val: '92.4%', label: 'AI Accuracy' },
    bars: [
      { height: 'h-[90%]', val: '450', label: 'Volume' },
      { height: 'h-[95%]', val: '45m', label: 'AvgTime' },
      { height: 'h-[75%]', val: '92.4%', label: 'AIAcc' },
      { height: 'h-[98%]', val: '0.0%', label: 'Breach' },
      { height: 'h-[85%]', val: '448', label: 'Closed' }
    ],
    statusText: 'IT Helpdesk Incident SLA Telemetry',
    stats: [
      { label: 'Daily Ticket Volume', value: '450', chg: 'Handled' },
      { label: 'Avg Resolution Time', value: '45 min', chg: '⚡ Fast', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'AI Solution Accuracy', value: '92.4%', chg: '↑ 3.8%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'SLA Breach Rate', value: '0.0%', chg: 'Zero Breach', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Customer Portal': {
    title: 'Customer Self-Service & Billing Portal Hub',
    desc: 'Provide clients with 24/7 self-service access to track order shipments, log support tickets, pay invoices, and download contracts.',
    features: ['Branded Self-Service Portal', 'Live Shipment Tracking', 'Self-Service Ticket Log', 'Invoice Payment Ledger', 'Document & Contract Vault', 'Role-Based Sub-Users'],
    funnelTitle: 'Portal Self-Service Journey',
    funnel: [
      { stage: 'Portal User Logins', val: '42,000', color: 'bg-purple-600' },
      { stage: 'Self-Service Sessions', val: '28,400', color: 'bg-indigo-600' },
      { stage: 'Paid Invoices Online', val: '14,200', color: 'bg-pink-600' },
      { stage: 'Deflected Support Tickets', val: '11,920', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Portal Uptime & Deflection Rate',
    donutMetric: { val: '99.99%', label: 'Portal Uptime' },
    bars: [
      { height: 'h-[85%]', val: '42k', label: 'Users' },
      { height: 'h-[92%]', val: '42%', label: 'Deflect' },
      { height: 'h-[80%]', val: '$1.4M', label: 'Paid' },
      { height: 'h-[98%]', val: '99.9%', label: 'Uptime' },
      { height: 'h-[90%]', val: '11.9k', label: 'Saved' }
    ],
    statusText: 'Client Self-Service & Billing Telemetry',
    stats: [
      { label: 'ACTIVE PORTAL USERS', value: '42,000', chg: '↑ 14.8%' },
      { label: 'TICKET DEFLECTION', value: '42.0%', chg: '↑ 8.2%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'ONLINE PAYMENTS', value: '$1.4M', chg: '↑ 22.4%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'PORTAL UPTIME', value: '99.99%', chg: 'Reliable', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'CRM Analytics': {
    title: 'CRM Analytics & Revenue Intelligence Hub',
    desc: 'Build drag-and-drop revenue dashboards, analyze sales conversion funnels, track sales rep leaderboards, and schedule AI briefings.',
    features: ['Interactive Chart Builder', 'Conversion Drop-off Analyzer', 'Sales Cycle Velocity', 'Rep Quota Leaderboards', 'AI Revenue Forecasts', 'Auto Executive Briefings'],
    funnelTitle: 'Revenue Funnel Conversion',
    funnel: [
      { stage: 'Total Ingested Leads', val: '10,000', color: 'bg-blue-600' },
      { stage: 'MQL Qualified Leads', val: '5,400', color: 'bg-purple-600' },
      { stage: 'SQL Sales Opportunities', val: '3,800', color: 'bg-pink-600' },
      { stage: 'Won Revenue Deals', val: '2,840', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'BI Forecast Accuracy & Rep Quotas',
    donutMetric: { val: '96.2%', label: 'Forecast Accuracy' },
    bars: [
      { height: 'h-[90%]', val: '28.4%', label: 'Conv' },
      { height: 'h-[95%]', val: '96.2%', label: 'Forecast' },
      { height: 'h-[85%]', val: '45', label: 'Widgets' },
      { height: 'h-[99%]', val: '14', label: 'Briefings' },
      { height: 'h-[92%]', val: '2.8k', label: 'Deals' }
    ],
    statusText: 'BI Analytics & Revenue Forecast Stream',
    stats: [
      { label: 'Funnel Conversion', value: '28.4%', chg: '↑ 4.1%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Forecast Accuracy', value: '96.2%', chg: '↑ 2.4%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Active BI Widgets', value: '45', chg: 'Live' },
      { label: 'Auto Briefings Set', value: '14', chg: 'Scheduled' }
    ]
  }
};

{/* Dynamic Feature Dashboard UI Canvas for Left Browser Window */}
const DynamicCrmTabUiCanvas = ({ tabName, features }) => {
  return (
    <div className="w-full h-full p-3 flex flex-col justify-between text-left text-xs bg-slate-50 dark:bg-[#07031c]">
      {/* Top Control Header */}
      <div className="flex justify-between items-center bg-white dark:bg-[#0c082e] p-2 rounded-lg border border-slate-200 dark:border-gray-800 shadow-xs mb-2">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-purple-600 dark:text-purple-400" />
          <span className="font-extrabold text-slate-800 dark:text-white text-[11px] truncate max-w-[210px]">{tabName} Dashboard</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
          <span>● Active Engine</span>
        </div>
      </div>

      {/* Feature Pill Tags */}
      <div className="flex flex-wrap gap-1 mb-2">
        {features?.slice(0, 4).map((f, i) => (
          <span key={i} className="text-[8.5px] font-semibold bg-white dark:bg-[#0e0836] text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-slate-200 dark:border-purple-900/50">
            ✓ {f}
          </span>
        ))}
      </div>

      {/* Dashboard Table / Metrics */}
      <div className="bg-white dark:bg-[#090526] rounded-lg border border-slate-200 dark:border-gray-800 p-2.5 shadow-xs overflow-hidden flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-center pb-1 mb-1.5 border-b border-slate-100 dark:border-gray-800 text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase">
          <span>{tabName} Execution Stream</span>
          <span className="text-purple-600 dark:text-purple-400">100% Synced</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] bg-slate-50 dark:bg-[#0d0833] p-1.5 rounded border border-slate-100 dark:border-gray-800/60">
            <span className="font-bold text-slate-800 dark:text-white">{features?.[0] || 'Pipeline Automation'}</span>
            <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400">Active High</span>
          </div>
          <div className="flex items-center justify-between text-[10px] bg-slate-50 dark:bg-[#0d0833] p-1.5 rounded border border-slate-100 dark:border-gray-800/60">
            <span className="font-bold text-slate-800 dark:text-white">{features?.[1] || 'Scoring & Routing'}</span>
            <span className="text-[9px] font-extrabold text-purple-600 dark:text-purple-400">Automated</span>
          </div>
          <div className="flex items-center justify-between text-[10px] bg-slate-50 dark:bg-[#0d0833] p-1.5 rounded border border-slate-100 dark:border-gray-800/60">
            <span className="font-bold text-slate-800 dark:text-white">{features?.[2] || 'Revenue Attribution'}</span>
            <span className="text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400">Verified</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[8.5px] text-slate-500 dark:text-gray-400 pt-1 border-t border-slate-100 dark:border-gray-800 mt-1 font-mono">
          <span>codigix.crm/{tabName.toLowerCase().replace(/\s+/g, '-')}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Secure CRM Node</span>
        </div>
      </div>
    </div>
  );
};

const CrmIndustryTabs = ({ activeTab: mainActiveTab, setActiveTab: setMainActiveTab }) => {
  const [activeTab, setActiveTab] = useState(mainActiveTab || 'Sales CRM');

  useEffect(() => {
    if (mainActiveTab && crmDashboardData[mainActiveTab]) {
      setActiveTab(mainActiveTab);
    }
  }, [mainActiveTab]);

  const changeTab = (name) => {
    setActiveTab(name);
    if (setMainActiveTab) {
      setMainActiveTab(name);
    }
  };

  const data = crmDashboardData[activeTab] || crmDashboardData['Sales CRM'];

  const handleNextTab = () => {
    const currentIndex = crmModulesList.findIndex(i => i.name === activeTab);
    const nextIndex = (currentIndex + 1) % crmModulesList.length;
    changeTab(crmModulesList[nextIndex].name);
  };

  const handlePrevTab = () => {
    const currentIndex = crmModulesList.findIndex(i => i.name === activeTab);
    const prevIndex = (currentIndex - 1 + crmModulesList.length) % crmModulesList.length;
    changeTab(crmModulesList[prevIndex].name);
  };

  return (
    <div className="mt-16 text-left">
      <div className="text-center mb-10">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-wide">CRM Solutions Dashboards & Interactive Analytics</h3>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-2">Explore tailored dashboard layouts and real-time operational funnels for each CRM solution</p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {crmModulesList.map((mod, i) => (
          <button
            key={i}
            onClick={() => changeTab(mod.name)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
              activeTab === mod.name 
              ? 'bg-gradient-to-r from-purple-600 to-rose-600 border-purple-500 text-white shadow-md scale-105 font-bold' 
              : 'bg-white dark:bg-[#050117] border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-400 hover:border-purple-400 dark:hover:border-gray-600 hover:text-purple-600 dark:hover:text-gray-200 shadow-xs'
            }`}
          >
            <mod.icon size={14} className={activeTab === mod.name ? 'text-white' : 'text-purple-600 dark:text-purple-400'} />
            <span className="text-[11px] font-semibold">{mod.name}</span>
          </button>
        ))}
      </div>

      {/* Interactive Dashboard View Container */}
      <div className="relative bg-white dark:bg-[#090624]/70 border border-slate-200/90 dark:border-purple-900/40 rounded-2xl p-6 lg:p-8 overflow-hidden shadow-sm dark:shadow-2xl">
        
        {/* Navigation Arrows */}
        <div className="flex justify-between items-center absolute top-1/2 left-2 right-2 -translate-y-1/2 z-20 pointer-events-none">
          <button 
            onClick={handlePrevTab}
            className="w-9 h-9 rounded-full bg-white/95 dark:bg-black/60 border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-gray-300 pointer-events-auto hover:bg-purple-600 hover:text-white transition-all backdrop-blur-sm shadow-md"
          >
             <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleNextTab}
            className="w-9 h-9 rounded-full bg-white/95 dark:bg-black/60 border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-gray-300 pointer-events-auto hover:bg-purple-600 hover:text-white transition-all backdrop-blur-sm shadow-md"
          >
             <ChevronRight size={18} />
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
            {/* Left info panel with Modern App Frame Showcase */}
            <div className="lg:w-[42%] flex flex-col justify-between text-left">
               <div>
                  {/* Modern SaaS App Frame Showcase */}
                  <div className="w-full rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#060318] shadow-sm dark:shadow-2xl group transition-all duration-300">
                      {/* Window Controls Top Header */}
                      <div className="bg-slate-100/90 dark:bg-[#0d0728] px-4 py-2.5 border-b border-slate-200/80 dark:border-gray-800 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 dark:text-gray-400 tracking-wider bg-white/80 dark:bg-black/40 px-3 py-0.5 rounded-md border border-slate-200/60 dark:border-gray-800 truncate max-w-[210px]">
                              codigix.crm/{activeTab.toLowerCase().replace(/\s+/g, '-')}
                          </div>
                          <div className="w-8"></div>
                      </div>

                      {/* Dual-Theme Responsive Feature-Specific UI Dashboard Canvas */}
                      <div className="relative w-full h-[220px] bg-slate-50 dark:bg-[#090422] flex items-center justify-center overflow-hidden">
                          <DynamicCrmTabUiCanvas tabName={activeTab} features={data.features} />
                      </div>
                  </div>

                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">{data.title}</h4>
                  <p className="text-[12px] text-slate-600 dark:text-gray-300 leading-relaxed mb-6 font-normal">
                    {data.desc}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-gray-800/60">
                  {data.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-purple-600 dark:text-purple-400 shrink-0"/>
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-gray-300 leading-tight">{feature}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Right Interactive Dashboard Mockup */}
            <div className="lg:w-[58%] bg-slate-50/90 dark:bg-[#030112] border border-slate-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm dark:shadow-inner">
               
               {/* Stats Row */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {data.stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0c0830] p-3 rounded-xl border border-slate-200/90 dark:border-gray-800/80 shadow-xs">
                      <p className="text-[9px] text-slate-500 dark:text-gray-400 mb-1 leading-tight uppercase font-bold">{stat.label}</p>
                      <h5 className={`text-sm md:text-base font-extrabold ${stat.color || 'text-slate-900 dark:text-white'}`}>{stat.value}</h5>
                      <span className="text-[9px] text-purple-600 dark:text-purple-400 font-bold">{stat.chg}</span>
                    </div>
                  ))}
               </div>

               {/* Charts & Funnel Row */}
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 mt-1">
                  
                  {/* Left Funnel Representation */}
                  <div className="md:col-span-5 bg-white dark:bg-[#0c0830] p-4 rounded-xl border border-slate-200/90 dark:border-gray-800/80 flex flex-col justify-between shadow-xs">
                     <p className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
                        {data.funnelTitle || 'MODULE FUNNEL FLOW'}
                     </p>
                     <div className="flex flex-col gap-2.5 my-auto">
                        {data.funnel.map((step, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                             <div className="flex justify-between items-center text-[10px] text-slate-700 dark:text-gray-300 font-bold">
                                <span>{step.stage}</span>
                                <span className="font-extrabold text-slate-900 dark:text-white">{step.val}</span>
                             </div>
                             <div className="w-full h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className={`h-full ${step.color}`} style={{ width: `${100 - idx * 22}%` }}></div>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Right Donut & Activity Representation */}
                  <div className="md:col-span-7 bg-white dark:bg-[#0c0830] p-4 rounded-xl border border-slate-200/90 dark:border-gray-800/80 flex flex-col justify-between shadow-xs">
                     <p className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                        {data.rightCardTitle || 'STAGE ALLOCATION & VELOCITY'}
                     </p>
                     <div className="flex items-center justify-around flex-1 py-2">
                        {/* Donut Simulation with Dynamic Metrics */}
                        <div className="relative w-24 h-24 rounded-full border-[7px] border-purple-600 border-t-pink-500 border-r-indigo-500 flex items-center justify-center shadow-md">
                           <div className="text-center px-1">
                              <span className="text-sm font-extrabold text-slate-900 dark:text-white block leading-none">{data.donutMetric?.val || '88.4%'}</span>
                              <span className="text-[8px] font-bold text-slate-500 dark:text-gray-400 block truncate max-w-[70px] mt-0.5">{data.donutMetric?.label || 'Target'}</span>
                           </div>
                        </div>
                        {/* Dynamic Activity Bars with Values & Labels */}
                        <div className="flex items-end gap-2 h-20 pt-4">
                           {data.bars?.map((bar, bIdx) => (
                             <div key={bIdx} className="flex flex-col items-center gap-1 group relative">
                                <div className={`w-3 bg-purple-600 group-hover:bg-pink-500 ${bar.height} rounded-t transition-all duration-500`}></div>
                                <span className="text-[7.5px] font-bold text-slate-500 dark:text-gray-400 truncate max-w-[28px]">{bar.label}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="flex justify-between items-center text-[9px] text-slate-500 dark:text-gray-400 border-t border-slate-100 dark:border-gray-800/80 pt-2 mt-2 font-medium">
                        <span>{data.statusText || 'Real-time Pipeline Operations'}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active Sync
                        </span>
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
