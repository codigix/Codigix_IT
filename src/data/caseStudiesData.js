export const caseStudiesData = [
  {
    id: 1,
    slug: 'manufacturing-erp-sterling-techno-systems',
    category: 'ERP',
    catName: 'MANUFACTURING',
    title: 'Smart Manufacturing ERP',
    clientName: 'Sterling Techno System',
    subtitle: 'A unified ERP solution integrated with IIoT to streamline production, monitor shop-floor operations in real-time, and improve efficiency across the manufacturing ecosystem.',
    objective: 'The objective was to build a centralized ERP system with IIoT integration to connect machines, processes, and people on a single platform.',
    heroImage: '/assets/images/service/erp_dash.png',
    
    // Sidebar Overview Details
    sidebarSpecs: {
      client: 'Sterling Techno System',
      industry: 'Manufacturing',
      projectType: 'ERP + IIoT Integration',
      duration: '6 Months',
      technologies: 'Node.js, React, MySQL, IIoT, MQTT, InfluxDB',
      liveUrl: 'www.sterlingtechno.com'
    },

    // 5 Business Challenges
    businessChallengeDesc: 'Sterling Techno System relied on manual processes and disconnected systems, leading to inefficient operations, high downtime, and lack of real-time visibility.',
    challenges: [
      { title: 'Manual Data Entry', desc: 'High dependency on manual data causing errors and delays.', icon: 'Clock' },
      { title: 'Disconnected Systems', desc: 'Departments worked in silos with no central data visibility.', icon: 'Layers' },
      { title: 'Low Production Visibility', desc: 'No real-time insights into machine performance and OEE.', icon: 'TrendingUp' },
      { title: 'High Downtime', desc: 'Unplanned downtime due to lack of predictive maintenance.', icon: 'AlertTriangle' },
      { title: 'Inefficient Reporting', desc: 'Reports were time-consuming and not data-driven.', icon: 'Box' }
    ],

    // Our Solution
    solutionDesc: 'We implemented an advanced ERP solution integrated with IIoT devices to digitize operations, improve visibility, and enable smarter decision-making.',
    solutionPoints: [
      'Centralized ERP to manage end-to-end operations',
      'IIoT integration for real-time machine monitoring',
      'Live dashboards for production, OEE & downtime',
      'Automated data collection & production logging',
      'Predictive maintenance & alerts',
      'Role-based access for all departments',
      'Advanced analytics and reporting'
    ],
    radialNodes: ['PRODUCTION', 'QUALITY', 'MAINTENANCE', 'IIOT DEVICES', 'PURCHASE', 'INVENTORY'],

    // 8 Key Features Implemented
    keyFeatures: [
      { title: 'Production Management', desc: 'Plan, track and manage production in real-time.', icon: 'Cpu' },
      { title: 'IIoT Machine Monitoring', desc: 'Connect machines and monitor live performance metrics.', icon: 'Activity' },
      { title: 'OEE Dashboard', desc: 'Track Availability, Performance, and Quality in real-time.', icon: 'TrendingUp' },
      { title: 'Downtime Management', desc: 'Capture downtime reasons and reduce unplanned stoppages.', icon: 'Clock' },
      { title: 'Inventory Management', desc: 'Real-time stock tracking and automated reordering.', icon: 'Box' },
      { title: 'Quality Management', desc: 'Manage inspections, quality checks and NCRs.', icon: 'ShieldCheck' },
      { title: 'Maintenance Management', desc: 'Preventive maintenance scheduling and alerts.', icon: 'Wrench' },
      { title: 'Reports & Analytics', desc: 'Custom reports and advanced analytics dashboards.', icon: 'FileSpreadsheet' }
    ],

    // Technology Stack Icons
    techStack: [
      { name: 'Node.js', color: 'text-green-500', bg: 'bg-green-500/10' },
      { name: 'React', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
      { name: 'TypeScript', color: 'text-blue-500', bg: 'bg-blue-500/10' },
      { name: 'MySQL', color: 'text-sky-400', bg: 'bg-sky-500/10' },
      { name: 'MQTT', color: 'text-purple-400', bg: 'bg-purple-500/10' },
      { name: 'InfluxDB', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
      { name: 'Redis', color: 'text-red-500', bg: 'bg-red-500/10' },
      { name: 'Docker', color: 'text-blue-400', bg: 'bg-blue-500/10' },
      { name: 'Nginx', color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
    ],

    // 5 Results & Impact Cards
    results: [
      { val: '32%', title: 'Increase in Overall Equipment Effectiveness', icon: 'TrendingUp' },
      { val: '28%', title: 'Reduction in Machine Downtime', icon: 'Clock' },
      { val: '35%', title: 'Improvement in Production Efficiency', icon: 'Settings' },
      { val: '25%', title: 'Faster Reporting with Real-time Data', icon: 'FileText' },
      { val: '100%', title: 'Real-time Visibility Across Operations', icon: 'Eye' }
    ],

    // Solution Highlights (Sidebar)
    solutionHighlights: [
      'Real-time machine monitoring with IIoT',
      'Overall Equipment Effectiveness (OEE) tracking',
      'Automated production logging & reporting',
      'Downtime alerts & predictive maintenance',
      'Centralized data for better decision-making'
    ],

    // Testimonial Card
    testimonial: {
      quote: "Codigix Infotech transformed our manufacturing operations with their ERP and IIoT solution. We now have real-time visibility, better control, and higher productivity across our shop-floor.",
      author: "Mr. Akshay Mahajan",
      title: "Director",
      company: "Sterling Techno System",
      avatar: "/assets/images/about/team-1.jpg"
    }
  },
  {
    id: 2,
    slug: 'sales-crm-vastra-bhushan',
    category: 'CRM',
    catName: 'SALES & CRM',
    title: 'Omnichannel Sales CRM',
    clientName: 'Vastra Bhushan',
    subtitle: 'Automating multi-channel lead ingestion, instant quotation e-signatures, and sales pipeline management across wholesale networks.',
    objective: 'Build an enterprise CRM to automate sales pipelines, improve lead conversion rates, and enhance buyer engagement across wholesale networks.',
    heroImage: '/assets/images/service/crm_dash.png',

    sidebarSpecs: {
      client: 'Vastra Bhushan',
      industry: 'Wholesale & Retail Fashion',
      projectType: 'Sales CRM & E-Sign Web App',
      duration: '3 Months',
      technologies: 'React, Node.js, MongoDB, Redis, Twilio',
      liveUrl: 'www.vastrabhushan.com'
    },

    businessChallengeDesc: 'Vastra Bhushan struggled with uncoordinated lead management across WhatsApp, webforms, and trade shows, causing slow quotation times and buyer drop-off.',
    challenges: [
      { title: 'Unassigned Leads', desc: 'No central system to route incoming leads to sales reps.', icon: 'Clock' },
      { title: 'Slow Quotations', desc: 'Manual PDF quotes took over 4 hours to generate.', icon: 'FileText' },
      { title: 'Pipeline Friction', desc: 'Sales managers lacked visibility into active deal stages.', icon: 'TrendingUp' },
      { title: 'Buyer Churn', desc: 'Inconsistent follow-ups led to stockists ordering elsewhere.', icon: 'AlertTriangle' },
      { title: 'Paper E-Signatures', desc: 'Deals were delayed waiting for physical signatures.', icon: 'Box' }
    ],

    solutionDesc: 'Codigix IT engineered a dynamic Sales CRM featuring automated round-robin lead routing, interactive web-quotation links with digital e-signatures, and automated follow-up drip rules.',
    solutionPoints: [
      'Centralized CRM pipeline to manage end-to-end sales deals',
      'WhatsApp & Email lead ingestion integration',
      'Interactive web quotes with digital buyer e-signatures',
      'Automated sales rep round-robin lead routing',
      'Dynamic discount sign-off approval matrix',
      'Role-based access for sales managers and reps',
      'Real-time revenue forecast analytics & leaderboards'
    ],
    radialNodes: ['PIPELINE', 'LEADS', 'QUOTATIONS', 'WHATSAPP', 'APPROVALS', 'ANALYTICS'],

    keyFeatures: [
      { title: 'Pipeline Management', desc: 'Visual drag-and-drop deal stage boards.', icon: 'TrendingUp' },
      { title: 'Instant Web Quotes', desc: 'Generate e-signable web quotation links in seconds.', icon: 'FileText' },
      { title: 'AI Lead Scoring', desc: 'Score leads automatically from 1 to 100 on intent.', icon: 'Award' },
      { title: 'WhatsApp Automation', desc: 'Send automated order & quote reminders on WhatsApp.', icon: 'Activity' },
      { title: 'Discount Matrix', desc: 'Route custom discount quotes to directors.', icon: 'ShieldCheck' },
      { title: 'Rep Leaderboard', desc: 'Real-time sales target and commission tracker.', icon: 'Cpu' },
      { title: 'Contact Timelines', desc: '360-degree timeline of calls, emails, and meetings.', icon: 'Clock' },
      { title: 'Revenue Forecasting', desc: 'AI forecast models predicting monthly closed deals.', icon: 'FileSpreadsheet' }
    ],

    techStack: [
      { name: 'Node.js', color: 'text-green-500', bg: 'bg-green-500/10' },
      { name: 'React', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
      { name: 'MongoDB', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
      { name: 'Redis', color: 'text-red-500', bg: 'bg-red-500/10' },
      { name: 'Docker', color: 'text-blue-400', bg: 'bg-blue-500/10' },
      { name: 'Twilio API', color: 'text-purple-400', bg: 'bg-purple-500/10' }
    ],

    results: [
      { val: '40%', title: 'Increase in Closed Sales Revenue', icon: 'TrendingUp' },
      { val: '60%', title: 'Improvement in Lead Conversion Rate', icon: 'Activity' },
      { val: '95%', title: 'Customer Retention Rate', icon: 'ShieldCheck' },
      { val: '15s', title: 'Instant Lead Assignment Speed', icon: 'Clock' },
      { val: '100%', title: 'Visibility Across Active Pipelines', icon: 'Eye' }
    ],

    solutionHighlights: [
      'Multi-channel lead ingestion via WhatsApp & Web',
      'Interactive web quotes with digital e-signatures',
      'Automated sales rep round-robin routing',
      'Real-time deal pipeline & stage tracking',
      'Revenue forecasting & rep leaderboards'
    ],

    testimonial: {
      quote: "Our sales velocity skyrocketed after Codigix IT deployed our custom Sales CRM. Our representatives now send e-signable quotations in under 3 minutes, and our lead conversion rate has doubled.",
      author: "Mr. Vikram Mehta",
      title: "Head of Sales",
      company: "Vastra Bhushan",
      avatar: "/assets/images/about/team-2.jpg"
    }
  },
  {
    id: 3,
    slug: 'iiot-implementation-nobel-casting',
    category: 'IoT',
    catName: 'INDUSTRIAL IOT',
    title: 'IIoT Industrial Automation',
    clientName: 'Nobel Casting',
    subtitle: 'Connecting foundry furnaces and CNC machinery with IIoT edge gateways for real-time telemetry and predictive maintenance.',
    objective: 'Deploy IIoT sensors and edge gateways to monitor real-time furnace temperature, machine OEE, and prevent unplanned downtime.',
    heroImage: '/assets/images/service/iot_robot.png',

    sidebarSpecs: {
      client: 'Nobel Casting',
      industry: 'Industrial Metallurgy',
      projectType: 'IIoT Sensors + Edge Telemetry',
      duration: '5 Months',
      technologies: 'ESP32, MQTT, AWS IoT Core, InfluxDB, Grafana',
      liveUrl: 'www.nobelcasting.com'
    },

    businessChallengeDesc: 'Unplanned furnace shutdowns and unmonitored thermal spikes led to severe casting defects and expensive emergency repairs.',
    challenges: [
      { title: 'Thermal Spikes', desc: 'Lack of live temperature tracking caused metal defects.', icon: 'AlertTriangle' },
      { title: 'Unplanned Shutdowns', desc: 'Furnace failures delayed production schedules.', icon: 'Clock' },
      { title: 'High Energy Waste', desc: 'No visibility into power consumption per furnace run.', icon: 'Layers' },
      { title: 'Manual Readings', desc: 'Engineers logged gauge numbers by hand on paper.', icon: 'Box' },
      { title: 'No Failure Warnings', desc: 'Bearing friction wear was undetected prior to breakdown.', icon: 'TrendingUp' }
    ],

    solutionDesc: 'Codigix IT deployed edge IIoT gateways, thermocouple sensors, vibration telemetry, and an automated AWS cloud control room.',
    solutionPoints: [
      'Real-time furnace temperature telemetry streams',
      'Vibration sensor telemetry for bearing wear detection',
      'Automated SMS & push alerts for maintenance engineers',
      'Live control-room Grafana dashboard console',
      'Energy consumption optimization per metal casting batch',
      'Edge AI predictive maintenance alerts'
    ],
    radialNodes: ['FURNACE', 'SENSORS', 'MQTT', 'TELEMETRY', 'ALERTS', 'CONTROL ROOM'],

    keyFeatures: [
      { title: 'Furnace Telemetry', desc: 'Real-time thermal monitoring feeds.', icon: 'Activity' },
      { title: 'Predictive AMC', desc: 'Early warning alerts before bearing failure.', icon: 'Wrench' },
      { title: 'Energy Audit', desc: 'Tracks power consumption per ton of metal.', icon: 'TrendingUp' },
      { title: 'Edge Processing', desc: 'ESP32 gateways processing sensor signals.', icon: 'Cpu' },
      { title: 'Emergency SMS Alerts', desc: 'Instant push notifications to on-duty engineers.', icon: 'Clock' },
      { title: 'Quality Compliance', desc: 'Guarantees exact thermal holding times.', icon: 'ShieldCheck' }
    ],

    techStack: [
      { name: 'ESP32', color: 'text-purple-400', bg: 'bg-purple-500/10' },
      { name: 'MQTT', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
      { name: 'AWS IoT Core', color: 'text-amber-400', bg: 'bg-amber-500/10' },
      { name: 'InfluxDB', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
      { name: 'Grafana', color: 'text-orange-400', bg: 'bg-orange-500/10' },
      { name: 'Python', color: 'text-blue-500', bg: 'bg-blue-500/10' }
    ],

    results: [
      { val: '30%', title: 'Reduction in Unplanned Machine Downtime', icon: 'Clock' },
      { val: '25%', title: 'Increase in Overall Equipment Effectiveness', icon: 'TrendingUp' },
      { val: '100%', title: 'Real-Time Sensor Telemetry Coverage', icon: 'Eye' },
      { val: '88%', title: 'Reduction in Metal Casting Scrap Defect', icon: 'ShieldCheck' },
      { val: '22%', title: 'Savings in Furnace Energy Costs', icon: 'Activity' }
    ],

    solutionHighlights: [
      'Edge gateway deployment on heavy foundry furnaces',
      'Real-time vibration and acoustic telemetry analysis',
      'Automated SMS emergency alerts for engineers',
      'AWS IoT Core & Grafana control-room integration',
      'Predictive maintenance alerts preventing breakdowns'
    ],

    testimonial: {
      quote: "Codigix IT's IIoT implementation saved our plant from multiple furnace failure incidents. The live telemetry dashboards and early maintenance warnings paid for themselves within the first two months.",
      author: "Mr. Amit Patel",
      title: "VP Operations",
      company: "Nobel Casting",
      avatar: "/assets/images/about/team-3.jpg"
    }
  },
  {
    id: 4,
    slug: 'corporate-website-codigix',
    category: 'Web',
    catName: 'WEB DEVELOPMENT',
    title: 'High-Performance Web Platform',
    clientName: 'Codigix Infotech',
    subtitle: 'Building a next-generation digital ecosystem with sub-second page loads, micro-animations, and dynamic service portals.',
    objective: 'Develop a high-performance, responsive web platform showcasing enterprise IT services, interactive solution tabs, and automated consultation scheduling.',
    heroImage: '/assets/images/service/web_dev_dashboard.webp',

    sidebarSpecs: {
      client: 'Codigix Infotech',
      industry: 'Technology & IT Services',
      projectType: 'Web App & Design System',
      duration: '2 Months',
      technologies: 'React, Vite, TailwindCSS, Framer Motion, GCP',
      liveUrl: 'www.codigix.com'
    },

    businessChallengeDesc: 'The company needed a modern, wowed-at-first-glance digital web platform to showcase their multi-domain IT solutions to global enterprise clients.',
    challenges: [
      { title: 'Slow Load Times', desc: 'Legacy web assets took over 4 seconds to render.', icon: 'Clock' },
      { title: 'Uninspired UI', desc: 'Lacked modern dark-mode micro-animations.', icon: 'Layers' },
      { title: 'Poor Mobile View', desc: 'Complex tables broken on smartphone screens.', icon: 'AlertTriangle' },
      { title: 'Low Organic Leads', desc: 'Inadequate SEO metadata and schema markup.', icon: 'TrendingUp' },
      { title: 'Static Services', desc: 'Services presented as flat un-interactive text.', icon: 'Box' }
    ],

    solutionDesc: 'Codigix IT engineered a modern React web application utilizing Vite, Framer Motion animations, TailwindCSS design systems, and headless backend APIs.',
    solutionPoints: [
      'Sub-second page load times with 99+ Google Lighthouse score',
      'Dynamic tabbed solution pages for AI, IoT, ERP & CRM',
      'Sleek dark mode glassmorphism aesthetics and neon gradients',
      'Interactive Case Study detail pages and applicant modals',
      'SEO schema markup and automated lead capture triggers',
      'Responsive design system tested across all mobile devices'
    ],
    radialNodes: ['FRONTEND', 'ANIMATIONS', 'UI/UX', 'SEO', 'APIS', 'CLOUD'],

    keyFeatures: [
      { title: 'Dynamic Catalogs', desc: 'Interactive tabbed pages for solutions.', icon: 'Activity' },
      { title: 'Sub-Second Loads', desc: 'Optimized bundle size achieving 99+ Lighthouse.', icon: 'TrendingUp' },
      { title: 'Dark Aesthetics', desc: 'Glassmorphism dark aesthetics with purple brand glow.', icon: 'ShieldCheck' },
      { title: 'SEO Schema Markup', desc: 'Rich Google search result snippets.', icon: 'FileSpreadsheet' },
      { title: 'Career Portal Modal', desc: 'Allows applicants to review openings & apply.', icon: 'Cpu' },
      { title: 'Lead Capture Triggers', desc: 'Instant consultation request notifications.', icon: 'Clock' }
    ],

    techStack: [
      { name: 'React', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
      { name: 'Vite', color: 'text-purple-400', bg: 'bg-purple-500/10' },
      { name: 'TailwindCSS', color: 'text-sky-400', bg: 'bg-sky-500/10' },
      { name: 'Framer Motion', color: 'text-pink-400', bg: 'bg-pink-500/10' },
      { name: 'Node.js', color: 'text-green-500', bg: 'bg-green-500/10' },
      { name: 'GCP', color: 'text-amber-400', bg: 'bg-amber-500/10' }
    ],

    results: [
      { val: '3X', title: 'Increase in Monthly Web Traffic', icon: 'TrendingUp' },
      { val: '99', title: 'Google Lighthouse Performance Score', icon: 'ShieldCheck' },
      { val: '0.6s', title: 'Sub-Second Page Load Speed', icon: 'Clock' },
      { val: '522%', title: 'Increase in Monthly Organic Leads', icon: 'Activity' },
      { val: '100%', title: 'Mobile Responsiveness & Usability', icon: 'Eye' }
    ],

    solutionHighlights: [
      'Sub-second page load times with 99+ Lighthouse score',
      'Dynamic interactive solution catalogs for AI, IoT, ERP & CRM',
      'Sleek glassmorphism dark mode aesthetics with neon glows',
      'Automated job application modal & contact lead triggers',
      'Comprehensive SEO schema markup & Google indexing'
    ],

    testimonial: {
      quote: "The web platform designed by our engineering team reflects the highest standard of web aesthetics, speed, and usability. It has become our primary channel for acquiring enterprise clients worldwide.",
      author: "Mr. Harshil Parikh",
      title: "Chief Technology Officer",
      company: "Codigix Infotech",
      avatar: "/assets/images/about/team-1.jpg"
    }
  },
  {
    id: 5,
    slug: 'mobile-app-healthcare-provider',
    category: 'Mobile',
    catName: 'MOBILE APPS',
    title: 'Healthcare Patient Tele-Medicine App',
    clientName: 'HealthCare Plus Network',
    subtitle: 'Cross-platform mobile application for doctor appointment scheduling, WebRTC video consultation, e-prescriptions, and diagnostic test alerts.',
    objective: 'Build a secure, HIPAA-compliant cross-platform mobile app connecting patients with specialist doctors and hospital EMR databases.',
    heroImage: '/assets/images/service/mobile_app.png',

    sidebarSpecs: {
      client: 'HealthCare Plus Network',
      industry: 'Healthcare & Tele-Medicine',
      projectType: 'Cross-Platform Mobile App',
      duration: '4 Months',
      technologies: 'Flutter, Dart, AWS Lambda, WebRTC, Razorpay',
      liveUrl: 'www.healthcareplus.com'
    },

    businessChallengeDesc: 'Patients experienced long queue wait times at clinics and delayed access to diagnostic lab PDF reports and doctor consultations.',
    challenges: [
      { title: 'Long Clinic Queues', desc: 'Patients waited over 45 minutes for OPD consultations.', icon: 'Clock' },
      { title: 'Paper Prescriptions', desc: 'Lost medical prescriptions caused drug renewal issues.', icon: 'FileText' },
      { title: 'Delayed Lab Reports', desc: 'Patients had to visit labs in person to pick up test reports.', icon: 'AlertTriangle' },
      { title: 'No Remote Access', desc: 'Lack of video consultation for remote patients.', icon: 'Layers' },
      { title: 'Payment Hassles', desc: 'Cash billing queues at checkout counters.', icon: 'Box' }
    ],

    solutionDesc: 'Codigix IT created a Flutter cross-platform mobile application connected to secure AWS cloud APIs, supporting video calls, biometric login, and payment gateways.',
    solutionPoints: [
      'Biometric patient login (FaceID & fingerprint)',
      'Real-time doctor appointment booking and slot tracking',
      'WebRTC encrypted video consultations',
      'Digital e-prescriptions signed by certified doctors',
      'Instant push alerts for diagnostic lab PDF reports',
      'Single-click online payment gateway integration'
    ],
    radialNodes: ['MOBILE', 'WEBRTC', 'DOCTORS', 'EMR', 'LABS', 'PAYMENTS'],

    keyFeatures: [
      { title: 'Biometric Login', desc: 'FaceID and fingerprint secure login.', icon: 'ShieldCheck' },
      { title: 'Slot Booking', desc: 'Real-time doctor schedule availability.', icon: 'Clock' },
      { title: 'Video Calls', desc: 'Encrypted WebRTC tele-medicine consultation.', icon: 'Activity' },
      { title: 'E-Prescriptions', desc: 'Digital signed prescriptions saved to app.', icon: 'FileText' },
      { title: 'Lab Push Alerts', desc: 'Instant alert when blood tests are published.', icon: 'TrendingUp' },
      { title: 'Online Payments', desc: 'Pay for OPD visits & lab tests in 1 click.', icon: 'Cpu' }
    ],

    techStack: [
      { name: 'Flutter', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
      { name: 'Dart', color: 'text-blue-500', bg: 'bg-blue-500/10' },
      { name: 'AWS Lambda', color: 'text-amber-400', bg: 'bg-amber-500/10' },
      { name: 'WebRTC API', color: 'text-purple-400', bg: 'bg-purple-500/10' },
      { name: 'Razorpay', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
      { name: 'Firebase', color: 'text-orange-400', bg: 'bg-orange-500/10' }
    ],

    results: [
      { val: '45%', title: 'Increase in App Store Downloads', icon: 'TrendingUp' },
      { val: '8m', title: 'Average OPD Queue Wait Time', icon: 'Clock' },
      { val: '4.8★', title: 'Average App Rating Across Stores', icon: 'ShieldCheck' },
      { val: '78%', title: 'Online Appointment Share Achieved', icon: 'Activity' },
      { val: '100%', title: 'HIPAA Data Compliance Security', icon: 'Eye' }
    ],

    solutionHighlights: [
      'Biometric patient login with FaceID & Fingerprint',
      'Real-time doctor appointment booking and slot tracking',
      'Encrypted WebRTC video calls for tele-medicine consultations',
      'Digital e-prescriptions and instant lab report push alerts',
      'Integrated payment gateway for single-click checkouts'
    ],

    testimonial: {
      quote: "Codigix IT delivered a flawless mobile healthcare application. Our patients love the ease of booking appointments and receiving lab reports directly on their phones. It revolutionized our outpatient care delivery.",
      author: "Dr. Ananya Rao",
      title: "Medical Director",
      company: "HealthCare Plus Network",
      avatar: "/assets/images/about/team-2.jpg"
    }
  },
  {
    id: 6,
    slug: 'ai-analytics-retail',
    category: 'AI',
    catName: 'AI SOLUTIONS',
    title: 'AI Predictive Retail Analytics',
    clientName: 'RetailMax Hypermarkets',
    subtitle: 'Deploying machine learning models for demand forecasting, dynamic pricing, and automated store inventory replenishment.',
    objective: 'Develop AI predictive models to process 120,000 SKUs, seasonal promotion spikes, and competitor pricing to automate store inventory replenishment.',
    heroImage: '/assets/images/service/ai_brain.png',

    sidebarSpecs: {
      client: 'RetailMax Hypermarkets',
      industry: 'Retail & E-Commerce',
      projectType: 'Machine Learning & AI Engine',
      duration: '5 Months',
      technologies: 'Python, AWS SageMaker, XGBoost, Prophet, React',
      liveUrl: 'www.retailmax.com'
    },

    businessChallengeDesc: 'Over-stocking perishable items led to high waste, while stockouts of fast-moving consumer goods caused severe revenue loss.',
    challenges: [
      { title: 'High Food Waste', desc: 'Perishable stock expired before purchase.', icon: 'AlertTriangle' },
      { title: 'Stockout Drops', desc: 'Fast-moving items were out of stock on weekends.', icon: 'Clock' },
      { title: 'Static Pricing', desc: 'Fixed prices failed to respond to competitor sales.', icon: 'Layers' },
      { title: 'Manual POs', desc: 'Store managers created purchase orders by hand.', icon: 'Box' },
      { title: 'No Demand Visibility', desc: 'Lack of predictive insights for seasonal spikes.', icon: 'TrendingUp' }
    ],

    solutionDesc: 'Codigix IT deployed custom Python machine learning models on AWS SageMaker, integrated with RetailMax ERP to automate inventory reorders and dynamic pricing.',
    solutionPoints: [
      'SKU demand forecasting using XGBoost and Prophet algorithms',
      'Automated purchase order triggers when stock hits reorder limits',
      'Dynamic price optimization based on shelf-life and competitor prices',
      'Personalized promotional offers for loyalty program members',
      'Perishable food waste reduction clearance workflows',
      'Executive AI control dashboard monitoring gross margin variance'
    ],
    radialNodes: ['AI MODELS', 'FORECAST', 'REPLENISH', 'PRICING', 'PROMOS', 'MARGINS'],

    keyFeatures: [
      { title: 'Demand Forecast', desc: 'ML models predicting daily store sales.', icon: 'TrendingUp' },
      { title: 'Auto Reorder POs', desc: 'Triggers POs to suppliers automatically.', icon: 'Cpu' },
      { title: 'Dynamic Pricing', desc: 'Adjusts prices on competitor tracking.', icon: 'Activity' },
      { title: 'Promo Engine', desc: 'Generates tailored discount offers.', icon: 'ShieldCheck' },
      { title: 'Waste Reduction', desc: 'Alerts before product shelf life expires.', icon: 'Clock' },
      { title: 'AI BI Console', desc: 'Dashboard showing gross margin variance.', icon: 'FileSpreadsheet' }
    ],

    techStack: [
      { name: 'Python', color: 'text-blue-500', bg: 'bg-blue-500/10' },
      { name: 'AWS SageMaker', color: 'text-amber-400', bg: 'bg-amber-500/10' },
      { name: 'XGBoost', color: 'text-purple-400', bg: 'bg-purple-500/10' },
      { name: 'Prophet', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
      { name: 'PostgreSQL', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
      { name: 'React BI', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    ],

    results: [
      { val: '32%', title: 'Increase in Overall Retail Revenue', icon: 'TrendingUp' },
      { val: '20%', title: 'Reduction in Inventory Holding Cost', icon: 'Clock' },
      { val: '91.4%', title: 'Demand Forecast Accuracy Rate', icon: 'ShieldCheck' },
      { val: '78.5%', title: 'Reduction in Perishable Food Waste', icon: 'Activity' },
      { val: '100%', title: 'Automated Supplier Replenishment', icon: 'Eye' }
    ],

    solutionHighlights: [
      'Machine learning SKU demand forecasting (XGBoost & Prophet)',
      'Automated supplier replenishment purchase order triggers',
      'Dynamic price optimization & competitor tracking algorithms',
      'Perishable food waste reduction and clearance automation',
      'Executive AI control dashboard monitoring profit margin variance'
    ],

    testimonial: {
      quote: "Codigix IT's AI predictive analytics transformed our retail supply chain. We reduced store inventory carrying costs by 20% while eliminating stockouts on popular items. The financial return exceeded our expectations.",
      author: "Mr. Tariq Al-Mansoor",
      title: "Chief Supply Chain Officer",
      company: "RetailMax",
      avatar: "/assets/images/about/team-3.jpg"
    }
  }
];

export const getCaseStudyById = (idOrSlug) => {
  if (!idOrSlug) return caseStudiesData[0];
  const found = caseStudiesData.find(item => 
    String(item.id) === String(idOrSlug) || item.slug === String(idOrSlug)
  );
  return found || caseStudiesData[0];
};
