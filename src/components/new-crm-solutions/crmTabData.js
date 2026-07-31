export const crmTabData = {
  'Sales CRM': {
    heroTitle: 'Smart CRM Solutions to',
    heroHighlight: 'Build Stronger Relationships',
    heroDesc: 'Streamline your sales, marketing, customer support, and service operations with our intelligent CRM solutions. Engage customers, close more deals, improve satisfaction, and grow your business.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    overview: 'Our Sales CRM Platform empowers high-performing revenue teams with full pipeline visibility, automated deal scoring, contact activity histories, and instant quotation delivery. Eliminate manual CRM entry and focus on closing high-margin deals.',
    departmentDashboard: {
      deptName: 'Sales & Revenue Operations Department',
      deptRole: 'Controls sales pipeline stages, deal velocity scoring, rep activity logs, quotation delivery, and quarterly revenue forecasting.',
      kpis: [
        { label: 'Active Pipeline Deals', value: '142 Deals' },
        { label: 'Quarterly Win Rate', value: '38.4%', color: 'text-emerald-400' },
        { label: 'Average Deal Cycle', value: '18 Days', color: 'text-emerald-400' },
        { label: 'Forecasted Revenue', value: '$5.62M' }
      ],
      widgets: [
        { title: 'Pipeline Drag & Drop', desc: 'Visual stage gates from qualified to won.' },
        { title: 'AI Deal Fit Scorecard', desc: 'Ranks deal probability based on buyer intent.' },
        { title: 'Quotation E-Sign Tracker', desc: 'Notifies when buyers sign pricing quotes.' }
      ],
      reports: ['Sales Funnel Conversion Audit', 'Rep Quota Attainment Leaderboard', 'Quarterly Revenue Forecast']
    },
    subModules: [
      { title: 'Pipeline & Deal Stages', desc: 'Visual drag-and-drop deal boards with customizable stage gates and win probability scores.', icon: 'TrendingUp', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: '+35% Closed Deals' },
      { title: 'Contact & Account Timelines', desc: 'Unified 360-degree timeline recording email opens, calls, meetings, and shared quotes.', icon: 'Users', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: '100% History Log' },
      { title: 'Sales Activity Automation', desc: 'Auto-schedule follow-up tasks, log phone calls, and trigger reminder notifications.', icon: 'Clock', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Zero Missed Calls' },
      { title: 'Revenue Forecasting Engine', desc: 'AI-driven revenue predictions based on historical win rates and deal velocity.', icon: 'PieChart', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: '95% Forecast Match' },
      { title: 'Quotation & E-Signatures', desc: 'Build instant branded quotes and collect legally binding e-signatures from buyers.', icon: 'FileText', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Instant Sign-off' },
      { title: 'Team Leaderboards & Targets', desc: 'Real-time sales rep leaderboards, commission calculators, and monthly target charts.', icon: 'Award', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Motivated Reps' }
    ],
    projects: [
      { title: 'B2B Industrial Equipment Sales CRM', client: 'TechnoKraft Drives', results: 'Increased sales conversion rate by 28% and shortened sales cycle from 45 days to 18 days.', tag: 'Industrial B2B' },
      { title: 'Enterprise Software Sales Pipeline', client: 'CloudMatrix Technologies', results: 'Automated deal routing across 40 sales reps, preventing lead leakage entirely.', tag: 'SaaS Software' },
      { title: 'Real Estate Sales CRM & Lead Scoring', client: 'Horizon Realty Group', results: 'Captured 15,000 monthly buyer leads with automatic AI qualification scoring.', tag: 'Real Estate' }
    ],
    benefits: ['Visibility Into Active Deals', 'AI-Powered Deal Scoring', 'Automated Activity Reminders', 'Unified Customer Timelines', 'Accurate Revenue Forecasting', 'Team Performance Dashboards'],
    workflow: [
      { name: 'Capture Deal', desc: 'Identify new sales opportunities' },
      { name: 'Qualify', desc: 'Engage stakeholders and score deal fit' },
      { name: 'Present Quote', desc: 'Build and deliver customized pricing' },
      { name: 'Negotiate', desc: 'Redline terms and align expectations' },
      { name: 'Close Won', desc: 'Convert deals to projects and billing' }
    ]
  },
  'Lead Management': {
    heroTitle: 'Advanced CRM for',
    heroHighlight: 'Lead Management',
    heroDesc: 'Capture, track, and nurture leads across multiple channels. Score leads automatically and pass the best prospects to your sales team to maximize conversion rates and ROI.',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.png',
    overview: 'Our Lead Management System captures incoming leads from websites, paid ads, emails, and phone calls. Automatically verify email validity, rank prospects using custom lead scoring rules, and route high-intent leads to reps instantly.',
    departmentDashboard: {
      deptName: 'Lead Generation & Demand Ops Department',
      deptRole: 'Captures incoming leads across web & ad channels, deduplicates records, scores lead intent, and enforces round-robin rep routing.',
      kpis: [
        { label: 'Monthly Leads Captured', value: '12,540' },
        { label: 'Instant Lead Assign Velocity', value: '15 sec', color: 'text-emerald-400' },
        { label: 'Duplicate Lead Cleanup', value: '100%', color: 'text-emerald-400' },
        { label: 'Marketing ROI Attribution', value: '4.8x', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Multi-Channel Ingestion Feed', desc: 'Real-time leads from Google Ads, Meta, and Webforms.' },
        { title: 'AI Intent Scoring Rules', desc: 'Ranks prospects from 1 to 100 on buying signals.' },
        { title: 'Automated Drip Sequence Engine', desc: 'Triggers WhatsApp & email outreach.' }
      ],
      reports: ['Lead Source Attribution Report', 'Sales Rep Response Velocity', 'Drip Campaign Conversion Audit']
    },
    subModules: [
      { title: 'Multi-Channel Lead Ingestion', desc: 'Gather leads from webforms, Facebook ads, Google campaigns, and live chat widgets.', icon: 'Filter', color: 'text-pink-400', bg: 'bg-pink-500/10', metric: 'Zero Lead Leakage' },
      { title: 'AI Intent & Fit Scoring', desc: 'Rank leads from 1 to 100 based on company size, job title, website visits, and content downloads.', icon: 'Award', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Instant Qualification' },
      { title: 'Dynamic Rule-Based Routing', desc: 'Automatically assign leads to territory managers or sales reps based on round-robin rules.', icon: 'ArrowLeftRight', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Immediate Assign' },
      { title: 'Drip Email & SMS Nurturing', desc: 'Automate personalized drip email sequences for cold leads to rebuild engagement.', icon: 'Send', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: '3x Higher Open Rate' },
      { title: 'Lead Deduplication & Cleaning', desc: 'Scan and merge duplicate lead profiles using phone numbers, domain names, and emails.', icon: 'ShieldCheck', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Clean CRM Database' },
      { title: 'Marketing Attribution Reports', desc: 'Track which ad campaigns and keywords deliver the highest converting sales opportunities.', icon: 'PieChart', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Clear Ad ROI' }
    ],
    projects: [
      { title: 'EdTech Multi-Channel Lead Scoring', client: 'EduSmart Learning', results: 'Processed 50,000 monthly student leads with automated WhatsApp & email nurturing.', tag: 'EdTech' },
      { title: 'Financial Services Lead Ingestion Engine', client: 'CapSecure Advisory', results: 'Reduced lead assignment time from 4 hours to 15 seconds using round-robin routing.', tag: 'FinTech' },
      { title: 'Automotive Dealer Network Lead CRM', client: 'Velocity Auto Franchise', results: 'Increased test drive bookings by 42% via instant SMS follow-ups.', tag: 'Automotive' }
    ],
    benefits: ['Zero Lead Leakage Assured', 'Dynamic Rule-Based Routing', 'Custom Lead Scoring Models', 'Instant Email & SMS Nurturing', 'Marketing Attribution Maps', 'Deduplication & Data Cleansing'],
    workflow: [
      { name: 'Capture', desc: 'Gather leads from webforms, ads, and chat' },
      { name: 'Deduplicate', desc: 'Clean records and verify contact details' },
      { name: 'Score', desc: 'Rank leads by intent and firmographics' },
      { name: 'Route', desc: 'Assign leads to reps instantly' },
      { name: 'Nurture', desc: 'Send automated outreach emails' }
    ]
  },
  'Marketing Automation': {
    heroTitle: 'Intelligent',
    heroHighlight: 'Marketing Automation',
    heroDesc: 'Automate marketing campaigns, email sequences, and customer engagement. Deliver personalized messages at scale and track campaign performance in real-time.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.png',
    overview: 'Our Marketing Automation suite turns cold prospects into loyal customers. Create visual campaign workflows, design responsive email templates, conduct A/B split testing, and track revenue attribution directly in your CRM.',
    departmentDashboard: {
      deptName: 'Digital Marketing & Growth Operations Department',
      deptRole: 'Manages automated email drip journeys, dynamic customer segmentation, A/B split testing, and marketing campaign revenue attribution.',
      kpis: [
        { label: 'Active Drip Journeys', value: '24' },
        { label: 'Target Segment Reach', value: '180,000' },
        { label: 'Avg Email Click Rate', value: '24.2%', color: 'text-emerald-400' },
        { label: 'Attributed Campaign Revenue', value: '$840K', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Visual Journey Canvas', desc: 'Multi-stage decision tree campaign builder.' },
        { title: 'A/B Testing Monitor', desc: 'Tracks winner email subject lines & CTA buttons.' },
        { title: 'Omnichannel WhatsApp Sync', desc: 'Broadcasts transactional & promo alerts.' }
      ],
      reports: ['Campaign Revenue Attribution Report', 'Subscriber Engagement Velocity', 'Email Bounces & Unsubscribes']
    },
    subModules: [
      { title: 'Visual Drip Builder', desc: 'Drag-and-drop campaign canvas to design automated trigger-based customer journeys.', icon: 'Share2', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Visual Journeys' },
      { title: 'Dynamic List Segmentation', desc: 'Build lists based on purchase history, contact tags, location, and web activity.', icon: 'Users', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Hyper-Targeted' },
      { title: 'A/B Testing & Optimization', desc: 'Test subject lines, CTA buttons, and email content to maximize click-through rates.', icon: 'CheckSquare', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: '+24% Click Rate' },
      { title: 'Landing Page & Webform Studio', desc: 'Publish high-converting responsive landing pages with embedded lead forms.', icon: 'FileText', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Fast Page Launch' },
      { title: 'Omnichannel Push & WhatsApp', desc: 'Engage customers via SMS alerts, WhatsApp Business API messages, and web push.', icon: 'Send', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Omnichannel Reach' },
      { title: 'Revenue Attribution Analytics', desc: 'Measure the exact financial revenue generated per marketing email campaign.', icon: 'PieChart', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Proven ROI' }
    ],
    projects: [
      { title: 'Omnichannel E-Commerce Campaign Automation', client: 'Luxe Retail Fashion', results: 'Generated $340,000 in additional sales through automated cart-abandonment drip sequences.', tag: 'E-Commerce' },
      { title: 'B2B Tech Event & Webinar Campaign', client: 'CyberShield Systems', results: 'Automated 6-stage event invite & follow-up sequence, securing 1,200 attendees.', tag: 'B2B Events' },
      { title: 'Subscription Service Re-engagement Campaign', client: 'FitPass Club', results: 'Re-engaged 18% of lapsed subscribers via automated SMS discount triggers.', tag: 'Subscriptions' }
    ],
    benefits: ['High-Conversion Drip Campaigns', 'Granular Segment Builders', 'A/B Testing Optimization', 'Multi-Channel Touchpoint Maps', 'Dynamic Content Blocks', 'Accurate Marketing ROI Reports'],
    workflow: [
      { name: 'Segment', desc: 'Filter audiences by behavior and industry' },
      { name: 'Create', desc: 'Build responsive email templates' },
      { name: 'Schedule', desc: 'Set up multi-stage drip workflows' },
      { name: 'Launch', desc: 'Trigger campaigns on active channels' },
      { name: 'Track', desc: 'Analyze open rates, clicks, and conversions' }
    ]
  },
  'Customer Support': {
    heroTitle: 'Omnichannel',
    heroHighlight: 'Customer Support',
    heroDesc: 'Deliver exceptional support across email, chat, social media, and phone. Centralize all customer interactions to build long-lasting, loyal customer relationships.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    overview: 'Our Customer Support suite converts customer queries into brand loyalty. Centralize support requests into a unified ticket queue, enforce custom SLAs, automate agent routing, and analyze customer satisfaction (CSAT) scores.',
    departmentDashboard: {
      deptName: 'Customer Care & Contact Center Department',
      deptRole: 'Controls unified omnichannel support queues, agent response SLA compliance, self-service help libraries, and CSAT ratings.',
      kpis: [
        { label: 'Open Support Tickets', value: '18' },
        { label: 'First Response Time', value: '4 Minutes', color: 'text-emerald-400' },
        { label: 'SLA Compliance Rate', value: '99.4%', color: 'text-emerald-400' },
        { label: 'Customer CSAT Score', value: '98%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Omnichannel Unified Queue', desc: 'Central inbox for Email, WhatsApp & Web chat.' },
        { title: 'SLA Countdown Monitor', desc: 'Alerts agents before ticket resolution times expire.' },
        { title: 'Self-Service Knowledge Finder', desc: 'Suggests answer articles to agents during chat.' }
      ],
      reports: ['Customer Satisfaction (CSAT) Report', 'First-Contact Resolution (FCR) Log', 'Agent Ticket Resolution Velocity']
    },
    subModules: [
      { title: 'Unified Omnichannel Inbox', desc: 'Combine support emails, WhatsApp chats, website tickets, and calls in one screen.', icon: 'Users', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: '100% Ticket View' },
      { title: 'SLA Escalation Engine', desc: 'Enforce response and resolution SLAs with automatic manager escalation alerts.', icon: 'Clock', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Zero SLA Breach' },
      { title: 'Macro Responses & Canned Replies', desc: 'Equip agents with pre-approved answer templates for recurring customer queries.', icon: 'FileText', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Fast Responses' },
      { title: 'Self-Service Knowledge Base', desc: 'Publish help articles, FAQs, and video tutorials to reduce incoming ticket volume.', icon: 'BookOpen', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: '-30% Ticket Load' },
      { title: 'CSAT & NPS Survey Engine', desc: 'Auto-send feedback surveys after ticket resolution to track customer happiness.', icon: 'Smile', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: '98% CSAT Rating' },
      { title: 'Support SLA & Agent Analytics', desc: 'Track first response time, average resolution time, and agent productivity metrics.', icon: 'PieChart', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Real-time Metrics' }
    ],
    projects: [
      { title: 'Enterprise IT Helpdesk & Support CRM', client: 'FinServe Global Infrastructure', results: 'Reduced average ticket resolution time from 8 hours to 45 minutes across 12,000 users.', tag: 'FinServe Support' },
      { title: 'E-Commerce Omnichannel Customer Care', client: 'TrendBox Direct', results: 'Handled 25,000 monthly chat queries via automated macros and knowledge base articles.', tag: 'E-Commerce Support' },
      { title: 'Telecom Service Escalation Hub', client: 'AirLink Broadband', results: 'Improved first-contact resolution (FCR) rate from 62% to 89% in 90 days.', tag: 'Telecom' }
    ],
    benefits: ['Unified Support Inbox Console', 'SLA-Based Priority Queues', 'Auto-Triggered Response Templates', 'Self-Service Knowledge Bases', 'Bi-directional Client Chat', 'CSAT Feedback Collection'],
    workflow: [
      { name: 'Ingest Ticket', desc: 'Capture tickets from email, chat, or portal' },
      { name: 'Categorize', desc: 'Tag by priority and issue type' },
      { name: 'Assign', desc: 'Route tickets to skilled agents' },
      { name: 'Resolve', desc: 'Troubleshoot and share resolution details' },
      { name: 'Close & Poll', desc: 'Confirm resolution and send survey' }
    ]
  },
  'Service Management': {
    heroTitle: 'Efficient',
    heroHighlight: 'Service Management',
    heroDesc: 'Manage service requests, contracts, and Service Level Agreements (SLAs) with ease. Dispatch technicians and track service delivery to improve customer satisfaction.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    overview: 'Service Management handles client contracts, warranties, and maintenance routines. Track AMC expiration dates, manage spare part costs, and ensure customer machinery operates smoothly.',
    departmentDashboard: {
      deptName: 'Field Service & Warranty Department',
      deptRole: 'Manages Annual Maintenance Contracts (AMC), equipment warranties, spare parts consumption, and technician dispatch scheduling.',
      kpis: [
        { label: 'Active AMC Contracts', value: '340' },
        { label: 'AMC Renewal Rate', value: '92.4%', color: 'text-emerald-400' },
        { label: 'Warranty Entitlement Check', value: 'Instant', color: 'text-emerald-400' },
        { label: 'Spare Parts Inventory Sync', value: '100%' }
      ],
      widgets: [
        { title: 'AMC Expiry Warning Board', desc: 'Alerts account reps 30 days before contract ends.' },
        { title: 'Warranty Entitlement Scanner', desc: 'Verifies free part eligibility during service.' },
        { title: 'Preventive Maintenance Scheduler', desc: 'Auto-generates check-up service orders.' }
      ],
      reports: ['Contract Renewal Profitability Report', 'Spare Parts Consumption Audit', 'Equipment Service History']
    },
    subModules: [
      { title: 'Service Contract & AMC Ledger', desc: 'Track comprehensive maintenance contracts, renewal dates, and service inclusions.', icon: 'FileCheck', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Auto Renewal Reminders' },
      { title: 'Warranty Entitlement Check', desc: 'Instantly verify if equipment, labor, or spare parts are covered under active warranty.', icon: 'ShieldCheck', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Exact Entitlement' },
      { title: 'Preventive Service Scheduler', desc: 'Auto-generate recurring maintenance work orders based on usage hours or elapsed days.', icon: 'Calendar', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Zero Breakdown' },
      { title: 'Spare Parts Consumption Log', desc: 'Track parts used during repairs, deduct inventory, and bill non-warranty replacements.', icon: 'Wrench', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Parts Inventory Sync' },
      { title: 'Service Cost & Margin Analysis', desc: 'Calculate contract profitability by comparing revenue earned against total service expenses.', icon: 'PieChart', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Clear Service ROI' },
      { title: 'Client Service History Log', desc: 'Complete history of all past maintenance visits, replaced parts, and technician notes.', icon: 'Clock', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Full Equipment Audit' }
    ],
    projects: [
      { title: 'Industrial Elevator Maintenance CRM', client: 'Otis Elevators Network', results: 'Automated 1,200 monthly preventive maintenance visits across commercial buildings.', tag: 'Elevator Maintenance' },
      { title: 'HVAC Air Conditioning Service CRM', client: 'CoolTech Climate Systems', results: 'Increased AMC contract renewal rate by 32% via automated email & SMS reminders.', tag: 'HVAC Services' },
      { title: 'Medical Equipment Warranty Tracker', client: 'MedEquip Maintenance India', results: 'Streamlined warranty verification, eliminating $60,000 in unbilled spare parts.', tag: 'Medical Service' }
    ],
    benefits: ['Automatic SLA Warnings', 'Service Contract Renewal Alerts', 'Warranty Entitlement Checks', 'Preventive Maintenance Audits', 'Equipment Installation Logs', 'Spare Parts Cost Tracking'],
    workflow: [
      { name: 'Register SLA', desc: 'Upload contracts and define SLAs' },
      { name: 'Entitle', desc: 'Verify coverage during ticket intake' },
      { name: 'Alert Renewal', desc: 'Notify sales before contract expires' },
      { name: 'Service', desc: 'Execute periodic check-up tasks' },
      { name: 'Bill Contract', desc: 'Invoice renewals and premium support' }
    ]
  },
  'Quotation Management': {
    heroTitle: 'Streamlined',
    heroHighlight: 'Quotation Management',
    heroDesc: 'Create, manage, and track professional quotes in minutes. Speed up the approval process, negotiate effectively, and close deals faster with automated quotation workflows.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    overview: 'Our Quotation & CPQ Management module automates complex pricing logic. Configure products, apply target discount thresholds, auto-calculate taxes/duties, and send interactive web quotes that clients can review and e-sign.',
    departmentDashboard: {
      deptName: 'CPQ & Deal Desk Operations Department',
      deptRole: 'Enforces price configuration rules, manages discount approval hierarchies, generates web-based quotes, and collects digital e-signatures.',
      kpis: [
        { label: 'Quotes Issued Today', value: '45 Quotes' },
        { label: 'Average Quote Generation', value: '3 Minutes', color: 'text-emerald-400' },
        { label: 'Discount Approval Velocity', value: '15 Minutes', color: 'text-emerald-400' },
        { label: 'Digital E-Signature Rate', value: '94.2%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Rules-Based CPQ Configurator', desc: 'Prevents pricing errors and unauthorized discounts.' },
        { title: 'Discount Sign-Off Matrix', desc: 'Routes large discount requests to sales directors.' },
        { title: 'Interactive Web Quote Viewer', desc: 'Notifies when buyers open & review quotes.' }
      ],
      reports: ['Quotation Conversion Rate Audit', 'Discount Variance & Margin Log', 'Quote Revision History']
    },
    subModules: [
      { title: 'Configure Price Quote (CPQ)', desc: 'Rules-based product selection engine to configure complex product bundles without pricing errors.', icon: 'Sliders', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: '100% Quote Accuracy' },
      { title: 'Dynamic Discount Approvals', desc: 'Auto-route quotes exceeding maximum discount limits to sales directors for sign-off.', icon: 'ShieldCheck', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Protected Margins' },
      { title: 'Interactive Web Quotes', desc: 'Send PDF or interactive online quote links allowing buyers to accept, comment, or reject.', icon: 'FileText', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Real-Time Engagement' },
      { title: 'E-Signature Integration', desc: 'Collect legally binding digital signatures directly on quotes from buyer decision makers.', icon: 'CheckSquare', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Instant Sign-off' },
      { title: 'Version Control & History', desc: 'Track all quote revisions, price changes, and historical versions created during negotiation.', icon: 'RotateCc', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Complete Audit Trail' },
      { title: 'Margin & Profitability Check', desc: 'Instant margin calculator warning sales reps if product pricing drops below minimum target.', icon: 'PieChart', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Guaranteed Profit' }
    ],
    projects: [
      { title: 'Industrial Valve Manufacturer CPQ System', client: 'FlowControl Systems', results: 'Reduced custom quote generation time from 3 days to 10 minutes.', tag: 'Manufacturing CPQ' },
      { title: 'IT Infrastructure Solutions Quote Generator', client: 'NetWorks Enterprise', results: 'Increased quote acceptance rate by 22% using interactive web-based quote links.', tag: 'IT Quotations' },
      { title: 'Solar Energy Commercial Tender System', client: 'SunPower Energy Ltd', results: 'Standardized BOQ pricing templates across 15 regional sales engineers.', tag: 'Solar Projects' }
    ],
    benefits: ['Instant Quote Generation', 'Error-Free Configured Pricing', 'Multi-currency Conversion Logs', 'Flexible Discount Rules', 'Legally Safe E-signatures', 'Version Control Revision Logs'],
    workflow: [
      { name: 'Configure', desc: 'Select products, options, and parameters' },
      { name: 'Price', desc: 'Apply target discounts and verify margins' },
      { name: 'Approve', desc: 'Route large discounts to managers' },
      { name: 'Share Quote', desc: 'Send interactive web quotation to buyer' },
      { name: 'Sign', desc: 'Client signs quote via secure e-signature' }
    ]
  },
  'Project Management': {
    heroTitle: 'Integrated',
    heroHighlight: 'Project Management',
    heroDesc: 'Plan, execute, and track customer projects seamlessly. Collaborate with teams, manage resources, and deliver projects on time and within budget directly from your CRM.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    overview: 'Our Project Management module links sales opportunities directly to project execution. Build Gantt chart schedules, assign tasks, log billable team hours, track budget burn rates, and give clients transparent portal views.',
    departmentDashboard: {
      deptName: 'Client Delivery & PMO Department',
      deptRole: 'Manages interactive Gantt project schedules, billable team timesheets, milestone sign-offs, and project budget burn rates.',
      kpis: [
        { label: 'Active Client Projects', value: '28' },
        { label: 'On-Time Milestone Rate', value: '94%', color: 'text-emerald-400' },
        { label: 'Billable Team Utilization', value: '86.5%', color: 'text-emerald-400' },
        { label: 'Project Budget Overrun', value: '0.0%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Interactive Gantt Chart', desc: 'Visual task dependencies & milestone dates.' },
        { title: 'Billable Hours Timesheet Tracker', desc: 'Logs daily hours per client project code.' },
        { title: 'Client Portal Transparency', desc: 'Shares milestone sign-off sheets with clients.' }
      ],
      reports: ['Project Milestone Invoicing Report', 'Resource Capacity & Workload Log', 'Budget Burn Rate Variance']
    },
    subModules: [
      { title: 'Interactive Gantt Charts', desc: 'Visualize project phases, task dependencies, milestone dates, and critical path schedules.', icon: 'Grid', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Visual Timelines' },
      { title: 'Resource Capacity & Workload', desc: 'Monitor team member bandwidth to prevent burnout and assign tasks based on skills.', icon: 'Users', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Optimal Allocation' },
      { title: 'Timesheet & Billable Hours', desc: 'Team members log daily billable and non-billable hours directly against project tasks.', icon: 'Clock', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Accurate Billing' },
      { title: 'Project Budget & Burn Rate', desc: 'Real-time tracking of estimated project budget vs actual labor costs and external expenses.', icon: 'DollarSign', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Zero Budget Overrun' },
      { title: 'Milestone Billing Sync', desc: 'Auto-generate customer invoices when project milestones are signed off by managers.', icon: 'FileText', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Fast Milestone Invoicing' },
      { title: 'Client Portal Transparency', desc: 'Give clients read-only access to view milestone progress, shared assets, and project status.', icon: 'Share2', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Trust & Transparency' }
    ],
    projects: [
      { title: 'Software Development Agency Project CRM', client: 'Digital Crafted Technologies', results: 'Delivered 94% of software projects on budget and improved billable team utilization by 18%.', tag: 'Agency Projects' },
      { title: 'Turnkey Interior Design Project Management', client: 'Urban Space Interiors', results: 'Coordinated 30 parallel fit-out projects with real-time mobile task progress updates.', tag: 'Interiors' },
      { title: 'Consulting Services Timesheet & Invoicing', client: 'StratConsult India', results: 'Automated monthly client timesheet approvals, cutting invoice generation times by 80%.', tag: 'Consulting' }
    ],
    benefits: ['Interactive Gantt Charts', 'Real-time Budget Alerts', 'Billable Hours Tracking', 'Resource Workload Dashboards', 'Milestone Progress Logs', 'Client Portal Transparency'],
    workflow: [
      { name: 'Plan Scope', desc: 'Define milestones, phases, and budgets' },
      { name: 'Allocate Staff', desc: 'Assign tasks to available team members' },
      { name: 'Log Hours', desc: 'Submit timesheets against project codes' },
      { name: 'Track Burn', desc: 'Monitor actual costs vs budget caps' },
      { name: 'Deliver', desc: 'Invoice clients upon milestone completion' }
    ]
  },
  'Task Management': {
    heroTitle: 'Centralized',
    heroHighlight: 'Task Management',
    heroDesc: 'Assign tasks, set priorities, and track progress across teams. Ensure nothing falls through the cracks and keep your entire organization aligned and productive.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    overview: 'Our Task Management module organizes team activity across all business units. Create custom Kanban boards, configure checklist items, set automated due-date reminders, and ensure seamless team collaboration.',
    departmentDashboard: {
      deptName: 'Cross-Department Operations Department',
      deptRole: 'Manages visual Kanban boards, sub-task checklists, deadline reminder alerts, and team task completion velocity.',
      kpis: [
        { label: 'Active Kanban Task Cards', value: '185' },
        { label: 'Task Completion Velocity', value: '+25%', color: 'text-emerald-400' },
        { label: 'Overdue Task Rate', value: '0.5%', color: 'text-emerald-400' },
        { label: 'Daily Task Checklists', value: '100% Synced' }
      ],
      widgets: [
        { title: 'Kanban Drag & Drop Board', desc: 'Visual To-Do, In-Progress & Done columns.' },
        { title: 'Sub-Task Checklist Tool', desc: 'Break down complex assignments into steps.' },
        { title: 'Automated Deadline Reminder', desc: 'Alerts assignees before task due dates.' }
      ],
      reports: ['Team Task Velocity Log', 'Overdue Task Audit', 'Department Workload Balance']
    },
    subModules: [
      { title: 'Visual Kanban Task Boards', desc: 'Drag-and-drop task cards across customizable workflow columns like To-Do, In Progress, and Done.', icon: 'Grid', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Visual Boards' },
      { title: 'Task Checklists & Sub-tasks', desc: 'Break complex assignments down into clear, actionable sub-tasks with individual assignees.', icon: 'CheckSquare', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Detailed Steps' },
      { title: 'Priority & Deadline Reminders', desc: 'Set task priority levels (High, Medium, Low) and receive automated email/push notifications.', icon: 'Clock', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Zero Missed Deadlines' },
      { title: 'File & Asset Attachments', desc: 'Upload documents, mockups, and spreadsheets directly to task cards for easy reference.', icon: 'FileText', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Central Assets' },
      { title: 'Activity Comments & Tagging', desc: 'Tag team members using @mentions to discuss task updates and record progress comments.', icon: 'Users', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Team Chat' },
      { title: 'Task Productivity Dashboards', desc: 'Track overdue task counts, completed task velocity, and team member completion rates.', icon: 'PieChart', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: '+25% Velocity' }
    ],
    projects: [
      { title: 'Marketing Agency Task Board Workflow', client: 'Impact Digital Marketing', results: 'Managed 600 monthly content creation tasks across 20 designers and writers with zero missed deadlines.', tag: 'Marketing Ops' },
      { title: 'Operations Task Automation', client: 'Express Logistics Ops', results: 'Automated daily warehouse checklist assignments, increasing task completion velocity by 30%.', tag: 'Operations' },
      { title: 'Cross-Department Task Management', client: 'Omni Retail Group', results: 'Replaced email thread chaos with centralized Kanban task boards for 150 team members.', tag: 'Corporate Tasks' }
    ],
    benefits: ['Visual Kanban Boards', 'Daily Progress Tracking', 'Automated Deadline Alerts', 'Task Checklist Templates', 'Activity Log History', 'Mobile App Notifications'],
    workflow: [
      { name: 'Create Task', desc: 'Define parameters, checklists, and owners' },
      { name: 'Prioritize', desc: 'Set urgency level and due dates' },
      { name: 'Collaborate', desc: 'Share comments and upload assets' },
      { name: 'Review', desc: 'Verify completed tasks against criteria' },
      { name: 'Archive', desc: 'Mark completed and log performance time' }
    ]
  },
  'Field Service CRM': {
    heroTitle: 'Mobile-First',
    heroHighlight: 'Field Service CRM',
    heroDesc: 'Manage field operations, engineers, visits, and real-time updates. Empower your mobile workforce with the tools they need to resolve issues on the first visit.',
    image: '/assets/images/new-iot-solutions/iot_robot_dark.png',
    overview: 'Our Field Service CRM connects dispatch managers with mobile technicians. Route engineers based on GPS proximity and skill certifications, collect digital customer sign-offs, and track spare parts used on site.',
    departmentDashboard: {
      deptName: 'Field Dispatch & Technician Operations Department',
      deptRole: 'Coordinates mobile field engineers, GPS route optimization, skill-based job dispatching, trunk inventory, and digital customer sign-offs.',
      kpis: [
        { label: 'Active Field Engineers', value: '80 Onfield' },
        { label: 'First-Time Fix Rate (FTFR)', value: '91%', color: 'text-emerald-400' },
        { label: 'GPS Fuel Cost Reduction', value: '-22%', color: 'text-emerald-400' },
        { label: 'Digital Sign-Off Rate', value: '100%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'GPS Live Dispatch Map', desc: 'Tracks engineer locations & shortest routes.' },
        { title: 'Mobile Job Sheet App', desc: 'Offline job logging & digital signatures.' },
        { title: 'Vehicle Trunk Stock Sync', desc: 'Monitors spare parts stored in service vans.' }
      ],
      reports: ['First-Time Fix Rate Analytics', 'Engineer Travel & Fuel Expense', 'Spare Parts Consumption Log']
    },
    subModules: [
      { title: 'Smart Dispatch & Scheduling', desc: 'Match customer service requests with engineer locations, availability, and skill tags.', icon: 'MapPin', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Smart Dispatch' },
      { title: 'GPS Route Optimization', desc: 'Calculate shortest travel paths for field agents to reduce fuel expense and travel times.', icon: 'Truck', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: '-22% Fuel Cost' },
      { title: 'Mobile Technician App (Offline)', desc: 'Android & iOS mobile app allowing field engineers to view job sheets and log work offline.', icon: 'Users', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Offline Ready' },
      { title: 'Digital Job Sign-off & Signature', desc: 'Capture customer e-signatures, photos of installed parts, and instant service ratings on mobile.', icon: 'CheckSquare', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Instant Sign-off' },
      { title: 'Trunk Inventory & Parts Sync', desc: 'Track spare parts stored in technician vehicles and auto-deduct items used on jobs.', icon: 'Wrench', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Vehicle Stock Sync' },
      { title: 'First-Time Fix Rate (FTFR) Analytics', desc: 'Measure engineer performance, repeat visit rates, and average job resolution durations.', icon: 'PieChart', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: '91% FTFR Rate' }
    ],
    projects: [
      { title: 'Solar Roof Panel Installation Dispatch', client: 'SunGrid Solar India', results: 'Dispatched 80 field engineers across 4 states, increasing daily completed installs from 3 to 5 per crew.', tag: 'Solar Service' },
      { title: 'ATM Maintenance Field Technician CRM', client: 'SecureCash Banking Tech', results: 'Reduced emergency ATM repair response time from 3 hours to 42 minutes.', tag: 'Banking Field Ops' },
      { title: 'Commercial Kitchen Equipment Repair', client: 'ChefPro Service Network', results: 'Achieved 91% first-time fix rate by giving technicians real-time trunk inventory access.', tag: 'Commercial Repair' }
    ],
    benefits: ['Smart Route Optimization', 'Skill-Based Tech Dispatch', 'Real-time GPS Location Maps', 'Digital Job Sign-off sheets', 'Spare Parts Inventory Sync', 'Offline Mobile Capability'],
    workflow: [
      { name: 'Schedule Job', desc: 'Log work order and technician skills' },
      { name: 'Dispatch Tech', desc: 'Send route details to mobile app' },
      { name: 'Service Onsite', desc: 'Diagnose equipment and log parts used' },
      { name: 'Sign-off', desc: 'Capture customer signature on screen' },
      { name: 'Complete', desc: 'Invoice for labor and parts consumed' }
    ]
  },
  'Helpdesk': {
    heroTitle: 'Comprehensive',
    heroHighlight: 'Helpdesk Solutions',
    heroDesc: 'Handle tickets, incidents, and customer queries efficiently. Use intelligent routing and AI-powered suggestions to resolve support tickets faster than ever.',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.png',
    overview: 'Our Helpdesk Solution turns ticket chaos into organized service delivery. Capture tickets across email, portal, and chat, apply smart auto-routing based on topic tags, and utilize AI solution recommendations.',
    departmentDashboard: {
      deptName: 'IT Helpdesk & Incident Resolution Department',
      deptRole: 'Manages IT ticket queues, automated round-robin routing, AI solution suggestions, and SLA breach warnings.',
      kpis: [
        { label: 'Daily Ticket Volume', value: '450' },
        { label: 'Avg Ticket Resolution Time', value: '45 Minutes', color: 'text-emerald-400' },
        { label: 'AI Solution Accuracy Rate', value: '92.4%', color: 'text-emerald-400' },
        { label: 'SLA Breach Warnings', value: '0', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Ticket Queue Classifier', desc: 'Auto-tags incoming tickets by issue type.' },
        { title: 'AI Answer Recommender', desc: 'Suggests KB articles for faster resolution.' },
        { title: 'Round-Robin Dispatcher', desc: 'Equally routes tickets across support engineers.' }
      ],
      reports: ['Helpdesk Resolution Velocity', 'SLA Compliance & Escalation Audit', 'User Incident Trend Log']
    },
    subModules: [
      { title: 'Smart Ticket Ingestion & Tags', desc: 'Auto-convert incoming emails into categorized tickets with priority tags and categories.', icon: 'FileText', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Auto Ticket Capture' },
      { title: 'AI Solution Suggestions', desc: 'Suggest relevant knowledge base articles to agents automatically based on ticket keywords.', icon: 'Award', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'AI Assist' },
      { title: 'Automated Round-Robin Routing', desc: 'Distribute tickets evenly to logged-in support engineers based on current queue workload.', icon: 'ArrowLeftRight', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Equal Workload' },
      { title: 'SLA Warning & Breach Escalations', desc: 'Trigger countdown timers for resolution limits and escalate at-risk tickets automatically.', icon: 'Clock', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Zero Unanswered' },
      { title: 'Customer Feedback & Ratings', desc: 'Capture customer 1-5 star ratings and feedback comments upon ticket resolution.', icon: 'Smile', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: '97% Positive' },
      { title: 'Helpdesk Productivity Metrics', desc: 'Executive dashboards showing daily ticket volume, backlog resolution velocity, and FCR.', icon: 'PieChart', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Clear Metrics' }
    ],
    projects: [
      { title: 'SaaS Software Helpdesk & SLA Engine', client: 'DataCore Cloud Systems', results: 'Handled 14,000 monthly user tickets while maintaining a 99.2% SLA compliance rate.', tag: 'SaaS Helpdesk' },
      { title: 'Telecom Broadband Customer Helpdesk', client: 'SpeedNet Fiber', results: 'Reduced average initial response time from 2 hours to 4 minutes using automated triggers.', tag: 'Telecom Helpdesk' },
      { title: 'Financial Institution IT Helpdesk', client: 'State Co-op Bank', results: 'Empowered 1,500 internal bank employees with a self-service password reset and IT portal.', tag: 'Bank IT' }
    ],
    benefits: ['Custom Ticketing Workflows', 'SLA Breach Warning Alerts', 'Intelligent Auto-responses', 'Help Article Authoring Tools', 'Team Performance Tracking', 'Customer Feedback Polls'],
    workflow: [
      { name: 'Ingest Ticket', desc: 'Capture requests from all open channels' },
      { name: 'Categorize', desc: 'Verify service tiers and urgency level' },
      { name: 'Assign Ticket', desc: 'Route tickets to next available agent' },
      { name: 'Resolve Tick', desc: 'Resolve issue and link help articles' },
      { name: 'Close Loop', desc: 'Archive ticket and request CSAT feedback' }
    ]
  },
  'Customer Portal': {
    heroTitle: 'Self-Service',
    heroHighlight: 'Customer Portals',
    heroDesc: 'Empower customers with self-service capabilities. Provide a branded portal for knowledge bases, ticket tracking, order history, and real-time updates.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.png',
    overview: 'Our Customer Portal provides your clients with a secure 24/7 self-service window. Allow customers to track orders, submit support tickets, download invoices, review contract documents, and manage their account profile.',
    departmentDashboard: {
      deptName: 'Client Self-Service & Community Operations Department',
      deptRole: 'Manages branded client portal access, online order tracking, self-service billing history, and document download vaults.',
      kpis: [
        { label: 'Active Client Users', value: '42,000' },
        { label: 'Self-Service Ticket Deflection', value: '42%', color: 'text-emerald-400' },
        { label: 'Online Invoice Payments', value: '$1.4M', color: 'text-emerald-400' },
        { label: 'Portal Uptime Reliability', value: '99.99%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Client Order Tracking Feed', desc: 'Real-time order dispatch & courier updates.' },
        { title: 'Self-Service Ticket Logging', desc: 'Allows customers to log issues & track status.' },
        { title: 'Secure Document Vault', desc: 'Stores contracts, manuals & invoices.' }
      ],
      reports: ['Client Portal Usage & Deflection Report', 'Online Payment Settlement Log', 'Customer Self-Service Activity']
    },
    subModules: [
      { title: 'Branded 24/7 Self-Service Web Portal', desc: 'Custom domain and branded interface for clients to access account services anytime.', icon: 'Globe', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: '24/7 Client Access' },
      { title: 'Real-Time Order & Shipment Tracking', desc: 'Clients track order processing stages, e-way bills, and courier delivery tracking IDs.', icon: 'Truck', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Live Order Tracker' },
      { title: 'Self-Service Ticket Logging', desc: 'Allow customers to open support tickets, attach screenshots, and track agent responses.', icon: 'FileText', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Instant Ticket Log' },
      { title: 'Invoice & Payment History Ledger', desc: 'Clients download past invoices, view outstanding balances, and pay via integrated payment gateways.', icon: 'DollarSign', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Fast Payment' },
      { title: 'Document & Contract Library', desc: 'Secure repository for sharing user manuals, SLAs, safety certificates, and contracts.', icon: 'BookOpen', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Secure Vault' },
      { title: 'Role-Based User Permissions', desc: 'Allow corporate clients to create multiple sub-users with specific view or edit access rights.', icon: 'ShieldCheck', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Enterprise Security' }
    ],
    projects: [
      { title: 'B2B Client Ordering & Invoicing Portal', client: 'Indo-German Industrial Fasteners', results: 'Migrated 600 wholesale buyers to online self-service ordering, reducing phone orders by 75%.', tag: 'B2B Portal' },
      { title: 'Utility Customer Billing & Ticket Portal', client: 'City Power & Gas Utility', results: 'Served 120,000 household accounts with 24/7 online bill payment and outage ticket logging.', tag: 'Utility Portal' },
      { title: 'Legal & Accounting Firm Client Portal', client: 'LexConsult Advisory', results: 'Streamlined secure document sharing and tax return approvals for 450 corporate clients.', tag: 'Professional Services' }
    ],
    benefits: ['Secure 24/7 Portal Access', 'Real-time Order Updates', 'Self-Service Ticket Logging', 'Payment History Ledger', 'Agreement Documentation Hub', 'Custom Brand Themes'],
    workflow: [
      { name: 'Invite Client', desc: 'Generate secure registration links' },
      { name: 'Verify Login', desc: 'Provide Multi-factor Authentication' },
      { name: 'Access Console', desc: 'Client reviews assets and bills' },
      { name: 'Submit Request', desc: 'Client opens ticket or requests quote' },
      { name: 'Resolve Portal', desc: 'Portal updates state automatically' }
    ]
  },
  'CRM Analytics': {
    heroTitle: 'Data-Driven',
    heroHighlight: 'CRM Analytics',
    heroDesc: 'Gain deep insights with advanced reports and dashboards. Monitor pipeline health, track revenue, and make data-driven decisions with real-time analytics.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    overview: 'Our CRM Analytics module transforms customer data into strategic revenue intelligence. Build custom drag-and-drop dashboards, analyze sales conversion funnels, track rep performance metrics, and forecast revenue.',
    departmentDashboard: {
      deptName: 'Revenue Intelligence & Executive BI Department',
      deptRole: 'Analyzes sales funnel conversion rates, deal velocity bottlenecks, campaign ROI attribution, and executive revenue forecasts.',
      kpis: [
        { label: 'Sales Funnel Conversion', value: '28.4%', color: 'text-emerald-400' },
        { label: 'Forecast Model Accuracy', value: '96.2%', color: 'text-emerald-400' },
        { label: 'Active BI Widgets', value: '45' },
        { label: 'Automated Briefings Set', value: '14' }
      ],
      widgets: [
        { title: 'Funnel Drop-Off Analyzer', desc: 'Identifies deal friction points between stages.' },
        { title: 'Rep Leaderboard Matrix', desc: 'Ranks sales rep win rates & quota targets.' },
        { title: 'Executive Briefing Scheduler', desc: 'Exports automated PDF revenue summaries.' }
      ],
      reports: ['Sales Conversion Funnel Audit', 'Marketing Channel ROI Report', 'Customer Churn & Retention Analytics']
    },
    subModules: [
      { title: 'Interactive Dashboard Builder', desc: 'Drag-and-drop chart widgets to build custom sales, marketing, and support dashboards.', icon: 'PieChart', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Custom Reports' },
      { title: 'Sales Funnel & Conversion Rates', desc: 'Visualize drop-off rates across deal stages to pinpoint and fix pipeline bottlenecks.', icon: 'Filter', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Funnel Optimization' },
      { title: 'Sales Velocity & Cycle Times', desc: 'Measure average time taken for leads to progress from initial contact to closed-won.', icon: 'Clock', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Faster Cycles' },
      { title: 'Rep Performance Leaderboards', desc: 'Compare quota achievements, call volume, meeting counts, and win rates across team members.', icon: 'Award', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Rep Insights' },
      { title: 'AI Revenue Forecast Models', desc: 'Predict monthly and quarterly revenue achievements based on pipeline stages and win history.', icon: 'TrendingUp', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Accurate Targets' },
      { title: 'Automated Executive Briefings', desc: 'Schedule automatic PDF/Excel report exports delivered directly to management inboxes.', icon: 'FileSpreadsheet', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Auto Briefing' }
    ],
    projects: [
      { title: 'Global Enterprise Sales Analytics Hub', client: 'OmniCorp Solutions', results: 'Unified sales reporting across 4 international regions, providing real-time executive revenue forecasting.', tag: 'Sales BI' },
      { title: 'Marketing ROI & Funnel Analytics System', client: 'GrowthScale Digital', results: 'Identified top 3 highest-converting marketing channels, increasing campaign ROI by 38%.', tag: 'Marketing BI' },
      { title: 'Customer Churn & Retention Analytics', client: 'CloudApp Software', results: 'Predicted customer churn risk with 89% accuracy, saving $450,000 in recurring revenue.', tag: 'Retention BI' }
    ],
    benefits: ['Real-time Sales Pipelines', 'Conversion Rate Funnels', 'Campaign Performance Maps', 'Interactive Chart Builders', 'Daily Target Status Logs', 'Executive Briefing Exporters'],
    workflow: [
      { name: 'Gather Data', desc: 'Ingest events from CRM, email, and POS' },
      { name: 'Model', desc: 'Classify deals by win probability' },
      { name: 'Visualize', desc: 'Render real-time custom charts' },
      { name: 'Forecast', desc: 'Predict revenue targets and achievements' },
      { name: 'Export', desc: 'Share executive PDF briefing reports' }
    ]
  }
};

export const getDefaultData = (tabName) => {
  return crmTabData[tabName] || crmTabData['Sales CRM'];
};
