export const erpTabData = {
  'Manufacturing ERP': {
    heroTitle: 'Smart ERP Solutions for',
    heroHighlight: 'Manufacturing Excellence.',
    heroDesc: 'Automate shop floor operations, optimize production planning, manage BOMs, and gain real-time visibility into your manufacturing processes with our intelligent ERP solutions.',
    image: '/assets/images/new-iot-solutions/iot_robot_dark.webp',
    overview: 'Our Manufacturing ERP is built specifically for discrete and process manufacturers. It bridges shop floor automation with top-floor executive decision-making. From multi-level Bill of Materials (BOM) management to real-time machine telemetry integration, raw material planning (MRP), and automated scrap tracking, our platform empowers plant managers to boost throughput, maximize OEE, and maintain strict ISO compliance.',
    departmentDashboard: {
      deptName: 'Manufacturing & Shopfloor Operations Department',
      deptRole: 'Monitors real-time machine telemetry, line speeds, operator shift logs, OEE efficiency, and shopfloor work order dispatches.',
      kpis: [
        { label: 'Active Machine Lines', value: '18 / 20' },
        { label: 'Shift OEE Efficiency', value: '94.2%', color: 'text-emerald-400' },
        { label: 'Units Produced Today', value: '14,850' },
        { label: 'Scrap Defect Rate', value: '0.38%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Work Order Dispatcher', desc: 'Real-time job dispatching to shopfloor workstations.' },
        { title: 'Machine Line Telemetry', desc: 'Live sensor monitoring of speeds, temperatures, and vibrations.' },
        { title: 'Inline Quality Checkpoints', desc: 'Instant operator sampling & non-conformance logs.' }
      ],
      reports: ['Daily Production Log', 'Machine Downtime Audit', 'Scrap & Material Variance']
    },
    subModules: [
      { title: 'Production Planning & MRP', desc: 'Automate material requirements planning and finite capacity scheduling across machines and shifts.', icon: 'Cog', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: '+32% Throughput' },
      { title: 'Multi-Level BOM Control', desc: 'Configure engineering and manufacturing Bill of Materials with revision tracking and costing.', icon: 'Layers', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: '100% BOM Accuracy' },
      { title: 'Shopfloor Work Orders', desc: 'Real-time job dispatching, routing cards, and touch-screen operator reporting stations.', icon: 'Cpu', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Zero Paper Sheets' },
      { title: 'Quality & CAPA Inspections', desc: 'Inline quality checkpoints, non-conformance logs (NCR), and automated root-cause workflows.', icon: 'ShieldCheck', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: '-45% Scrap Defect' },
      { title: 'Machine OEE & Maintenance', desc: 'Track uptime, downtime reasons, and schedule preventive machine maintenance alerts.', icon: 'TrendingUp', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: '94.8% OEE Peak' },
      { title: 'Job Costing & Profitability', desc: 'Real-time variance analysis comparing estimated standard costs against actual labor/material.', icon: 'PieChart', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Exact Cost Logs' }
    ],
    projects: [
      { title: 'Automotive Stamping Plant Automation', client: 'Apex Auto Components', results: 'Increased OEE by 24% and eliminated 150+ hours of paper-based job tracking per month.', tag: 'Automotive', imageLight: '/assets/images/service/erp_manufacturing_light.webp', imageDark: '/assets/images/new-iot-solutions/iot_robot_dark.webp' },
      { title: 'Precision CNC Machining ERP', client: 'Titan Precision Gears', results: 'Achieved 99.4% BOM material accuracy and reduced work-in-progress inventory by $420,000.', tag: 'Precision Engineering', imageLight: '/assets/images/service/crm_project_light.webp', imageDark: '/assets/images/new-iot-solutions/software_wireframe_dark.webp' },
      { title: 'Multi-Plant Electronics Manufacturing', client: 'Electra Tech India', results: 'Automated 12,000 daily shopfloor scans and reduced order lead time from 14 days to 4 days.', tag: 'Electronics', imageLight: '/assets/images/service/crm_sales_light.webp', imageDark: '/assets/images/new-iot-solutions/erp_isometric_dark.webp' }
    ],
    benefits: ['Real-time Production Monitoring', 'Accurate Costing & Margin Control', 'Optimized Shopfloor Routing', 'Reduced Material Waste', 'Automated Quality Inspection', 'Predictive Maintenance Alerts'],
    workflow: [
      { name: 'BOM Design', desc: 'Define multi-level Bill of Materials' },
      { name: 'Plan Demand', desc: 'Schedule capacity and material needs' },
      { name: 'Run Shopfloor', desc: 'Dispatch work orders to machines' },
      { name: 'Quality Pass', desc: 'Execute inline inspect inspections' },
      { name: 'Analyze Cost', desc: 'Real-time variance profitability reports' }
    ]
  },
  'Healthcare ERP': {
    heroTitle: 'Integrated ERP for',
    heroHighlight: 'Healthcare Systems.',
    heroDesc: 'Streamline patient management, billing, pharmacy inventory, and compliance reporting with a unified healthcare ERP platform built for scalability and patient care.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.webp',
    overview: 'Our Healthcare ERP connects clinical workflows with administrative infrastructure. It unifies patient registration, Electronic Health Records (EHR/EMR), ward bed management, pharmacy inventory, and insurer claims processing into a HIPAA-compliant digital core, giving medical directors real-time operational control.',
    departmentDashboard: {
      deptName: 'Clinical & Hospital Administration Department',
      deptRole: 'Coordinates patient intake, ward bed availability, doctor shift rosters, lab diagnostics, and TPA insurance claim settlements.',
      kpis: [
        { label: 'Ward Bed Occupancy', value: '88%' },
        { label: 'Daily OPD Registrations', value: '420' },
        { label: 'Active Specialist Doctors', value: '45' },
        { label: 'Insurance Claim Clearance', value: '98.4%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Emergency Bed Monitor', desc: 'Live ward & ICU bed allocation map.' },
        { title: 'Digital EMR Patient Lookup', desc: 'Instant access to medical histories & lab charts.' },
        { title: 'Pharmacy Stock Refill Alert', desc: 'Automated warnings for drug reorder levels.' }
      ],
      reports: ['Daily Patient Admission Census', 'TPA Insurance Claim Settlement Log', 'Pharmacy Stock & Expiry Audit']
    },
    subModules: [
      { title: 'EHR / EMR Record Management', desc: 'Centralized patient medical histories, diagnostic reports, and digital prescription vaults.', icon: 'HeartPulse', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: '100% HIPAA Safe' },
      { title: 'OPD & IPD Patient Intake', desc: 'Automate outpatient appointments, bed allocations, nurse charts, and discharge summaries.', icon: 'Calendar', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: '-50% Wait Times' },
      { title: 'Pharmacy & Drug Inventory', desc: 'Track batch numbers, expiration alerts, automated reorders, and narcotic drug logs.', icon: 'Pill', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Zero Stockouts' },
      { title: 'Medical Billing & Insurance', desc: 'Unified billing engines supporting TPA insurance claims, package rates, and copays.', icon: 'CreditCard', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: '98% Claim Approval' },
      { title: 'Doctor Roster & Scheduling', desc: 'Manage surgeon shifts, duty rosters, consultation fees, and emergency callouts.', icon: 'UserCheck', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Optimal Roster' },
      { title: 'Diagnostic Lab Integration', desc: 'Sync LIMS test machines directly to patient charts for instant lab report publishing.', icon: 'Activity', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Instant Sync' }
    ],
    projects: [
      { title: 'Multi-Specialty Hospital ERP Deployment', client: 'Sunshine Super Specialty Hospitals', results: 'Unified 450 beds across 3 hospital wings, reducing average discharge times by 65%.', tag: 'Hospitals', imageLight: '/assets/images/service/crm_support_light.webp', imageDark: '/assets/images/new-iot-solutions/ai_brain_dark.webp' },
      { title: 'Regional Pharmacy Chain Inventory ERP', client: 'MedLife Pharmacy Network', results: 'Automated drug expiration tracking across 40 branch stores, saving $180,000 annually.', tag: 'Pharma Retail', imageLight: '/assets/images/service/crm_portal_light.webp', imageDark: '/assets/images/new-iot-solutions/software_wireframe_dark.webp' },
      { title: 'Diagnostic Laboratory LIMS Integration', client: 'PathoCare Clinical Labs', results: 'Connected 14 automated blood analyzer machines directly to online patient portals.', tag: 'Diagnostics', imageLight: '/assets/images/service/crm_lead_light.webp', imageDark: '/assets/images/new-iot-solutions/ai_robot_dark.webp' }
    ],
    benefits: ['Seamless Patient Intake Flow', 'HIPAA & Secure Data Vaults', 'Unified Clinic & Ward Billing', 'Pharmacy Stock Alerts', 'Doctor Scheduling Optimization', 'Centralized Diagnostic Logs'],
    workflow: [
      { name: 'Register', desc: 'Register patients and capture health records' },
      { name: 'Schedule', desc: 'Match slots with specialist doctors' },
      { name: 'Diagnose', desc: 'Log treatments, lab tests, and prescriptions' },
      { name: 'Bill & Insure', desc: 'Auto-calculate costs and process claims' },
      { name: 'Procure', desc: 'Refill critical medical inventory' }
    ]
  },
  'Trading ERP': {
    heroTitle: 'Robust ERP Solutions for',
    heroHighlight: 'Trading & Distribution.',
    heroDesc: 'Manage your entire supply chain, track inventory across multiple warehouses, automate sales orders, and improve vendor relationships with our trading ERP.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.webp',
    overview: 'Designed for wholesale importers, exporters, and distributors, our Trading ERP unifies global purchasing, multi-location stock replenishment, sales order fulfillment, customs documentation, and landed-cost calculations in real time.',
    departmentDashboard: {
      deptName: 'Supply Chain & Wholesale Distribution Department',
      deptRole: 'Oversees container shipments, multi-warehouse stock replenishment, distributor price quotes, landed-cost margins, and 3PL shipping.',
      kpis: [
        { label: 'Active Shipments', value: '142' },
        { label: 'Inventory Turnover', value: '8.4x', color: 'text-emerald-400' },
        { label: 'On-Time Delivery Rate', value: '99.1%', color: 'text-emerald-400' },
        { label: 'Vendor Performance Rating', value: '94 / 100' }
      ],
      widgets: [
        { title: 'Multi-Warehouse Stock View', desc: 'Real-time inventory levels across regional warehouses.' },
        { title: 'Container Shipment Tracker', desc: 'Live GPS & sea freight container tracking.' },
        { title: 'Sales Order Approval Queue', desc: 'Fast credit checks and order approvals.' }
      ],
      reports: ['Landed Cost Margin Report', 'Vendor Lead-Time Scorecard', 'Stock Ageing Ledger']
    },
    subModules: [
      { title: 'Purchase & Vendor Management', desc: 'Automate RFQ releases, purchase order approvals, vendor price comparisons, and GRNs.', icon: 'ShoppingCart', color: 'text-orange-400', bg: 'bg-orange-500/10', metric: 'Faster Procurement' },
      { title: 'Multi-Location Inventory', desc: 'Real-time stock counts across bonded warehouses, retail outlets, and transit containers.', icon: 'Box', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: '100% Stock Clarity' },
      { title: 'Landed Cost Calculation', desc: 'Accurately allocate freight, customs duties, port charges, and insurance to unit costs.', icon: 'DollarSign', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'True Margin View' },
      { title: 'Sales Order & Quotation', desc: 'Generate multi-currency price quotes, track customer credit limits, and automate invoicing.', icon: 'FileText', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Instant Invoicing' },
      { title: 'Dispatch & Logistics Sync', desc: 'Integrate with 3PL logistics carriers, generate e-way bills, and print shipping labels.', icon: 'Truck', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Automated 3PL' },
      { title: 'Rebate & Commission Rules', desc: 'Configure tiered distributor margins, sales agent commissions, and volume rebates.', icon: 'PieChart', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Auto Rebates' }
    ],
    projects: [
      { title: 'Global FMCG Import & Distribution ERP', client: 'Orient Trade Worldwide', results: 'Automated landed-cost calculations across 1,200 monthly sea containers.', tag: 'Import/Export', imageLight: '/assets/images/service/crm_light_analytics.webp', imageDark: '/assets/images/new-iot-solutions/erp_isometric_dark.webp' },
      { title: 'Wholesale Electrical Equipment Distribution', client: 'Nova Electrical Distributors', results: 'Synchronized 5 regional fulfillment hubs, increasing inventory turnover by 3.5x.', tag: 'Wholesale', imageLight: '/assets/images/service/crm_portal_light.webp', imageDark: '/assets/images/new-iot-solutions/software_wireframe_dark.webp' },
      { title: 'Multi-Currency Commodity Trading Platform', client: 'AgriCorp Global Trading', results: 'Reduced sales order processing time from 45 minutes to under 2 minutes.', tag: 'Commodities', imageLight: '/assets/images/service/crm_sales_light.webp', imageDark: '/assets/images/new-iot-solutions/ai_brain_dark.webp' }
    ],
    benefits: ['Multi-Currency Book Ledger', 'Automated Sales Order Entry', 'Cross-docking & Warehousing', 'Supplier Performance Scorecards', 'Customs & Duty Automation', 'Dynamic Price Margins'],
    workflow: [
      { name: 'Source', desc: 'Send RFQs and choose vendors' },
      { name: 'Store', desc: 'Receive stock and log warehouse bins' },
      { name: 'Sell', desc: 'Automate sales orders and quotations' },
      { name: 'Ship', desc: 'Coordinate multi-carrier logistics' },
      { name: 'Reconcile', desc: 'Auto-generate invoices and settle ledgers' }
    ]
  },
  'Construction ERP': {
    heroTitle: 'End-to-End ERP for',
    heroHighlight: 'Construction Projects.',
    heroDesc: 'Take control of your construction projects with integrated budgeting, resource planning, contract management, and real-time site progress tracking.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.webp',
    overview: 'Our Construction ERP is engineered for general contractors, infrastructure builders, and real estate developers. Manage site BOQs, subcontractor tenders, material indenting, equipment usage logs, and Running Account (RA) bills from desktop or mobile devices.',
    departmentDashboard: {
      deptName: 'Project Engineering & Site Operations Department',
      deptRole: 'Tracks site BOQs, sub-contractor tenders, equipment usage hours, material indents, and daily progress reports (DPR).',
      kpis: [
        { label: 'Active Project Sites', value: '12' },
        { label: 'Budget Cost Variance', value: '-2.4%', color: 'text-emerald-400' },
        { label: 'Labor Count Onsite', value: '340' },
        { label: 'Safety Compliance Rate', value: '100%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Daily Progress Log (DPR)', desc: 'Mobile site log capturing labor attendance and weather.' },
        { title: 'Site Material Indent Approval', desc: 'Prevents unauthorized material orders at site.' },
        { title: 'Subcontractor RA Billing', desc: 'Auto-calculates TDS and retention deductions.' }
      ],
      reports: ['WBS Cost Variance Report', 'Equipment Running Log', 'BOQ Consumption Audit']
    },
    subModules: [
      { title: 'Project BOQ & Cost Budgeting', desc: 'Define Bill of Quantities (BOQ), track WBS milestones, and set cost variance alerts.', icon: 'HardHat', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Zero Cost Overrun' },
      { title: 'Subcontractor & RA Billing', desc: 'Manage work orders, track contractor progress, auto-calculate retention money & TDS.', icon: 'ClipboardList', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Auto RA Bills' },
      { title: 'Material Requisition & Site Indent', desc: 'Approve site material requisitions, prevent unauthorized site orders, and track GRNs.', icon: 'Box', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: '-28% Wastage' },
      { title: 'Plant & Machinery Management', desc: 'Monitor equipment running hours, diesel consumption logs, logbook entries, and AMCs.', icon: 'Truck', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Optimal Fleet Use' },
      { title: 'Daily Progress Reporting (DPR)', desc: 'Mobile-enabled DPR logs capturing site labor attendance, weather conditions, and work done.', icon: 'CheckSquare', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Real-time Site Log' },
      { title: 'Project Profitability Analytics', desc: 'Executive dashboards comparing estimated budget versus actual expenditure per WBS.', icon: 'PieChart', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Live ROI View' }
    ],
    projects: [
      { title: 'Infrastructure Highway Project ERP', client: 'Vanguard Infra Ltd', results: 'Managed $140M highway stretch with 100% digital site DPRs and sub-contractor RA bills.', tag: 'Infrastructure', imageLight: '/assets/images/service/crm_project_light.webp', imageDark: '/assets/images/new-iot-solutions/software_wireframe_dark.webp' },
      { title: 'Commercial High-Rise Construction ERP', client: 'Skyline Urban Developers', results: 'Prevented steel & cement material wastage by 18% through barcoded site indents.', tag: 'Real Estate', imageLight: '/assets/images/service/crm_fieldservice_light.webp', imageDark: '/assets/images/new-iot-solutions/iot_robot_dark.webp' },
      { title: 'Industrial Turnkey EPC Project ERP', client: 'Indus Engineering & Construction', results: 'Reduced project milestone billing delays from 3 weeks to 2 days.', tag: 'EPC Projects', imageLight: '/assets/images/service/crm_sales_light.webp', imageDark: '/assets/images/new-iot-solutions/erp_isometric_dark.webp' }
    ],
    benefits: ['Multi-site Budget Visibility', 'Contractor Milestone Tracking', 'Equipment Dispatch Efficiency', 'Automated RA Billing Logs', 'Labor Attendance Sync', 'Material Consumption Audits'],
    workflow: [
      { name: 'Budget', desc: 'Define cost sheets and project estimates' },
      { name: 'Contract', desc: 'Issue subcontracts and vendor agreements' },
      { name: 'Procure', desc: 'Requisition steel, cement, and materials' },
      { name: 'Track Site', desc: 'Log daily site progress reports' },
      { name: 'Audit', desc: 'Compare actual cost vs estimated cost' }
    ]
  },
  'Inventory Management': {
    heroTitle: 'Intelligent',
    heroHighlight: 'Inventory Management.',
    heroDesc: 'Optimize stock levels, automate reordering, track serial numbers, and reduce carrying costs with real-time, multi-warehouse inventory visibility.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.webp',
    overview: 'Our Inventory Management module provides complete control over your stock assets. Gain instant visibility across multiple warehouse locations, automate replenishment orders based on lead times, track serial numbers, and streamline stock auditing with handheld mobile scanners.',
    departmentDashboard: {
      deptName: 'Central Inventory & Stores Department',
      deptRole: 'Manages multi-warehouse stock counts, batch & serial barcode tracking, reorder point alerts, and deadstock reduction.',
      kpis: [
        { label: 'Total Cataloged SKUs', value: '45,200' },
        { label: 'Stock Audit Accuracy', value: '99.9%', color: 'text-emerald-400' },
        { label: 'Reorder Point Alerts', value: '4' },
        { label: 'Deadstock Percentage', value: '1.2%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Handheld Barcode Scanner Feed', desc: 'Real-time receiving & stock put-away feed.' },
        { title: 'Batch & Expiry Tracker', desc: 'Scans upcoming batch expirations across bins.' },
        { title: 'Inter-Warehouse Transfer Log', desc: 'Tracks stock transfer orders in transit.' }
      ],
      reports: ['ABC Inventory Classification', 'Stock Valuation (FIFO/LIFO)', 'Slow-Moving SKU Audit']
    },
    subModules: [
      { title: 'Multi-Warehouse Stock Ledger', desc: 'Centralized view of stock quantities, reserved items, in-transit goods, and damaged inventory.', icon: 'PackageSearch', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: '100% Stock Visibility' },
      { title: 'Barcode & RFID Batch Tracking', desc: 'Assign batch numbers, expiration dates, and serial IDs to items for complete traceability.', icon: 'Barcode', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Instant Scans' },
      { title: 'Automated Reorder Point Engine', desc: 'Calculate safety stock limits and automatically generate purchase indents when stock drops.', icon: 'RefreshCw', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Zero Stockouts' },
      { title: 'Inter-Warehouse Stock Transfer', desc: 'Manage stock transfer orders (STO), gate passes, in-transit tracking, and bin put-away.', icon: 'ArrowLeftRight', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Smooth Transfers' },
      { title: 'Stock Valuation (FIFO / LIFO / Weighted)', desc: 'Generate real-time inventory valuation reports compliant with global accounting standards.', icon: 'DollarSign', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Exact Asset Value' },
      { title: 'Deadstock & Expiry Analytics', desc: 'Identify slow-moving items, near-expiry products, and optimize warehouse carrying costs.', icon: 'AlertTriangle', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: '-35% Deadstock' }
    ],
    projects: [
      { title: 'Multi-City Electronics Warehouse Audit', client: 'Zion Retail Logistics', results: 'Reduced inventory audit discrepancy from 4.2% to 0.05% using mobile RFID handhelds.', tag: 'Retail Logistics' },
      { title: 'Automotive Spare Parts Inventory System', client: 'Speed Auto Spares', results: 'Automated reorder alerts across 65,000 SKUs, improving order fulfillment to 99.2%.', tag: 'Spare Parts' },
      { title: 'Cold-Chain Pharma Inventory Management', client: 'BioPharma Storage Systems', results: 'Enforced strict batch expiry rules, saving $260,000 in spoiled medicine costs.', tag: 'Pharmaceuticals' }
    ],
    benefits: ['Real-time Stock Audits', 'Smart Reorder Point Alerts', 'Barcoded Batch & Serial Tracking', 'FIFO/LIFO Valuation Sheets', 'Inter-warehouse Transfer Logs', 'Deadstock Reduction Alerts'],
    workflow: [
      { name: 'Catalog', desc: 'Assign barcodes and serial numbers' },
      { name: 'Receive', desc: 'Verify incoming stock and warehouse bins' },
      { name: 'Store', desc: 'Manage picking slots and locations' },
      { name: 'Pick & Pack', desc: 'Automate order dispatch items' },
      { name: 'Reorder', desc: 'Auto-trigger POs when stock hits threshold' }
    ]
  },
  'Purchase Management': {
    heroTitle: 'Streamlined',
    heroHighlight: 'Purchase Management.',
    heroDesc: 'Automate RFQs, manage purchase orders, track vendor performance, and streamline the approval workflow to ensure cost-effective procurement.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.webp',
    overview: 'Our Purchase Management module modernizes corporate procurement. From auto-generating Purchase Requisitions to sending side-by-side RFQ tenders, evaluating supplier rating metrics, and enforcing multi-tier approval rules, it guarantees maximum cost savings.',
    departmentDashboard: {
      deptName: 'Corporate Procurement & Sourcing Department',
      deptRole: 'Manages vendor sourcing, RFQ tenders, PO approvals, supplier price history, and 3-way invoice matching.',
      kpis: [
        { label: 'Open RFQ Tenders', value: '14' },
        { label: 'Active PO Volume', value: '$1.2M' },
        { label: 'Avg Sourcing Lead Time', value: '2.4 Days', color: 'text-emerald-400' },
        { label: 'Procurement Savings Rate', value: '12.8%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Side-by-Side RFQ Comparison', desc: 'Ranks vendor proposals by price, lead time & warranty.' },
        { title: 'PO Approval Queue', desc: 'Multi-level manager sign-off for large purchases.' },
        { title: 'Supplier Price Trend Engine', desc: 'Tracks historical commodity price fluctuations.' }
      ],
      reports: ['Vendor Performance Scorecard', 'Purchasing Cost Variance Log', 'GRN 3-Way Invoice Match Audit']
    },
    subModules: [
      { title: 'Purchase Requisition (PR) Hub', desc: 'Centralize material requests from departments with budget check validation.', icon: 'FileSpreadsheet', color: 'text-pink-400', bg: 'bg-pink-500/10', metric: 'Faster PR Cycle' },
      { title: 'RFQ & Vendor Tendering', desc: 'Broadcast RFQs to approved suppliers, compare quotes side-by-side, and award POs.', icon: 'Send', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Best Contract Rate' },
      { title: 'Multi-Level Approval Matrix', desc: 'Route purchase orders through management sign-off chains based on monetary thresholds.', icon: 'ShieldCheck', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: '100% Policy Match' },
      { title: 'Goods Receipt Note (GRN) Matching', desc: 'Execute 3-way matching between PO, GRN receipt, and supplier invoice before payment.', icon: 'FileCheck', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Zero Billing Error' },
      { title: 'Vendor Scorecards & Rating', desc: 'Rate suppliers dynamically based on delivery timeliness, price adherence, and quality defects.', icon: 'Award', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Top Vendor Selection' },
      { title: 'Procurement Savings Analytics', desc: 'Track negotiated cost reductions, spending patterns, and quarterly procurement targets.', icon: 'PieChart', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: '12% Cost Savings' }
    ],
    projects: [
      { title: 'Enterprise Procurement Automation', client: 'Polymer Solutions Corp', results: 'Automated 1,400 monthly PO releases and reduced procurement cycle time by 60%.', tag: 'Chemicals' },
      { title: 'Vendor Rating & 3-Way Match Integration', client: 'Metro General Engineering', results: 'Eliminated $95,000 in duplicate supplier invoices within the first 6 months.', tag: 'Engineering' },
      { title: 'Group-Wide Centralized Buying Portal', client: 'Trinity Hospitality Group', results: 'Negotiated 14% group volume discounts by consolidating purchases across 12 hotels.', tag: 'Hospitality' }
    ],
    benefits: ['Centralized Material Requests', 'Automated RFQ Comparisons', 'Multi-level Approval Workflows', 'Vendor Price History Logs', 'Seamless GRN Match Checks', 'Supplier Invoice Auditing'],
    workflow: [
      { name: 'Requisition', desc: 'Departments submit material requests' },
      { name: 'RFQ', desc: 'Generate and send RFQs to vendors' },
      { name: 'Quote Match', desc: 'Compare quotes side-by-side' },
      { name: 'Issue PO', desc: 'Generate and release POs automatically' },
      { name: 'GRN Verify', desc: 'Verify received items against PO' }
    ]
  },
  'Production Planning': {
    heroTitle: 'Advanced',
    heroHighlight: 'Production Planning.',
    heroDesc: 'Plan demand accurately, schedule capacity, route materials efficiently, and balance resources to ensure on-time delivery and maximum production throughput.',
    image: '/assets/images/new-iot-solutions/iot_robot_dark.webp',
    overview: 'Production Planning module provides advanced Master Production Scheduling (MPS) and Material Requirements Planning (MRP). Align sales order demand forecasts with shopfloor machine capabilities to prevent bottlenecks and ensure 100% on-time delivery.',
    departmentDashboard: {
      deptName: 'Planning & Production Control (PPC) Department',
      deptRole: 'Manages Master Production Schedules (MPS), Material Requirements Planning (MRP), machine capacity load balancing, and shift routing.',
      kpis: [
        { label: 'MPS Schedule Compliance', value: '98.6%', color: 'text-emerald-400' },
        { label: 'Machine Load Balance', value: '91%' },
        { label: 'MRP Material Shortage SKUs', value: '0', color: 'text-emerald-400' },
        { label: 'On-Time Delivery Rate', value: '99%' }
      ],
      widgets: [
        { title: 'Gantt Capacity Planner', desc: 'Visual scheduling across machine work centers.' },
        { title: 'Raw Material Shortage Alert', desc: 'Predicts raw material deficits before production.' },
        { title: 'Shift Changeover Dispatch', desc: 'Minimizes tooling setup times between batches.' }
      ],
      reports: ['Master Production Schedule (MPS)', 'Work Center Load Distribution', 'Material Indent Summary']
    },
    subModules: [
      { title: 'Master Production Schedule (MPS)', desc: 'Convert sales forecasts and confirmed customer orders into balanced weekly production targets.', icon: 'Calendar', color: 'text-green-400', bg: 'bg-green-500/10', metric: 'Optimized MPS' },
      { title: 'Material Requirements Planning (MRP)', desc: 'Auto-calculate exact raw material shortfall dates and issue automatic purchase indents.', icon: 'Layers', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Zero Material Shortage' },
      { title: 'Capacity Load Balancing', desc: 'Visualize work center load distribution to prevent machine overload and balance shifts.', icon: 'Sliders', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Balanced Machine Load' },
      { title: 'What-If Simulation Engine', desc: 'Simulate the impact of rush orders or machine breakdowns on delivery deadlines.', icon: 'Cpu', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Dynamic Rescheduling' },
      { title: 'Routing & Work Center Control', desc: 'Manage operations sequences, setup times, run times, and tool changeover schedules.', icon: 'Cog', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: '-40% Changeover' },
      { title: 'On-Time Delivery (OTD) Tracker', desc: 'Track customer order fulfillment performance and dispatch commitments in real time.', icon: 'TrendingUp', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: '98.6% OTD Rate' }
    ],
    projects: [
      { title: 'High-Volume Consumer Goods MPS System', client: 'Unifood Packaging Ltd', results: 'Balanced production across 8 high-speed lines, improving on-time delivery from 82% to 98.6%.', tag: 'FMCG' },
      { title: 'Heavy Machinery Production Scheduling', client: 'Bharat Heavy Hydraulics', results: 'Reduced machine setup times by 35 minutes per shift using digital sequencing.', tag: 'Heavy Equipment' },
      { title: 'Automated MRP & Capacity Planning', client: 'Zenith Cables India', results: 'Saved 25 hours per week of manual Excel scheduling for plant managers.', tag: 'Cable Manufacturing' }
    ],
    benefits: ['Optimal Resource Load Balancing', 'Accurate Material Needs (MRP)', 'Minimized Setup Times', 'Dynamic Schedule Reshuffling', 'Reduced Raw Material Deficits', 'Accurate Delivery Commitment'],
    workflow: [
      { name: 'Forecast', desc: 'Analyze sales orders and backlog trends' },
      { name: 'MRP Run', desc: 'Calculate raw material requirements' },
      { name: 'Capacity Plan', desc: 'Balance load across machines and staff' },
      { name: 'Schedule', desc: 'Create daily production shifts' },
      { name: 'Dispatch', desc: 'Send routing sheets to shop floor' }
    ]
  },
  'Quality Management': {
    heroTitle: 'Comprehensive',
    heroHighlight: 'Quality Management.',
    heroDesc: 'Ensure rigorous quality standards at every stage. Manage inspections, track non-conformances (NCR), and implement CAPA workflows to maintain compliance.',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.webp',
    overview: 'Our Quality Management System (QMS) enforces strict quality gates across your supply chain. Conduct inward GRN checks, inline production sampling, and finished goods testing with instant Non-Conformance (NCR) quarantine and Corrective Action (CAPA) tracking.',
    departmentDashboard: {
      deptName: 'Quality Assurance & Compliance (QA/QC) Department',
      deptRole: 'Controls inward GRN inspections, inline operator sampling, non-conformance quarantine logs, and gauge calibration.',
      kpis: [
        { label: 'First Pass Yield (FPY)', value: '99.4%', color: 'text-emerald-400' },
        { label: 'Active NCR Defect Logs', value: '2' },
        { label: 'CAPA Closure Velocity', value: '24 Hours', color: 'text-emerald-400' },
        { label: 'Customer Defect Rate', value: '8 PPM', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Inline Sampling Console', desc: 'Hourly operator dimension checks & gauge readings.' },
        { title: 'NCR Scrap Classifier', desc: 'Quarantines defective parts & issues vendor debit notes.' },
        { title: 'Gauge Calibration Reminder', desc: 'Tracks tool inspection due dates.' }
      ],
      reports: ['Non-Conformance Summary', '8D Root Cause Analysis Log', 'Certificate of Analysis (CoA)']
    },
    subModules: [
      { title: 'Inward & GRN Quality Control', desc: 'Inspect raw material shipments against technical drawing specs before stock put-away.', icon: 'ShieldCheck', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Strict Gate Control' },
      { title: 'Inline First-Piece & Patrol Sampling', desc: 'Digital inspector checklists for hourly operator patrols and first-off part sign-offs.', icon: 'CheckSquare', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Early Defect Catch' },
      { title: 'Non-Conformance Report (NCR)', desc: 'Quarantine defect parts immediately, record scrap codes, and issue vendor debit notes.', icon: 'AlertTriangle', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Instant Quarantine' },
      { title: 'CAPA Root Cause Workflows', desc: 'Enforce 8D and 5-Why root cause analysis tasks to prevent recurring quality failures.', icon: 'RotateCc', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Zero Defect Repeat' },
      { title: 'Gauge & Instrument Calibration', desc: 'Track calibration due dates for calipers, micrometers, gauges, and testing rigs.', icon: 'Wrench', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: '100% Calibrated' },
      { title: 'Certificate of Analysis (CoA)', desc: 'Auto-generate digital CoA documents for finished goods batches prior to customer shipment.', icon: 'FileCheck', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Auto CoA Export' }
    ],
    projects: [
      { title: 'Pharma Quality QMS & Compliance Deployment', client: 'Aura Life Sciences', results: 'Automated 21 CFR Part 11 audit trails, cutting batch clearance times by 70%.', tag: 'Pharmaceuticals' },
      { title: 'Automotive Zero-Defect QMS System', client: 'Precision Auto Forgings', results: 'Reduced customer PPM defect rate from 450 PPM to less than 12 PPM.', tag: 'Automotive' },
      { title: 'Aerospace Machining CAPA Tracking', client: 'AeroSpace Components India', results: 'Integrated 100% digital gauge calibration logs across 2,400 measuring tools.', tag: 'Aerospace' }
    ],
    benefits: ['Automated Quality Gates', 'Non-Conformance (NCR) Logs', 'CAPA Workflows Management', 'ISO Compliance Checklists', 'Vendor Quality Scorecards', 'Instrument Calibration Logs'],
    workflow: [
      { name: 'Define Specs', desc: 'Set tolerance limits for materials' },
      { name: 'Inspect', desc: 'Perform tests at GRN and production' },
      { name: 'Log NCR', desc: 'Quarantine defect products instantly' },
      { name: 'CAPA Action', desc: 'Root cause analysis and fix tasks' },
      { name: 'Certify', desc: 'Generate compliance quality reports' }
    ]
  },
  'Finance & Accounts': {
    heroTitle: 'Unified',
    heroHighlight: 'Finance & Accounts.',
    heroDesc: 'Gain real-time financial insights. Automate GL, AP/AR, bank reconciliation, tax compliance (GST), and generate comprehensive financial reports instantly.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.webp',
    overview: 'Our Finance & Accounts module provides enterprise-grade accounting and financial control. Unify your General Ledger, Accounts Receivable, Accounts Payable, GST/TDS tax compliance, fixed asset books, and multi-currency bank reconciliations into a single, audit-proof dashboard.',
    departmentDashboard: {
      deptName: 'Finance & Accounts Controlling Department',
      deptRole: 'Monitors corporate General Ledger, Accounts Payable/Receivable, GST tax compliance, bank reconciliation, and profit & loss statements.',
      kpis: [
        { label: 'Monthly Corporate Revenue', value: '$4.2M' },
        { label: 'Gross Margin Percentage', value: '42.5%', color: 'text-emerald-400' },
        { label: 'Overdue Accounts Receivable', value: '2.1%', color: 'text-emerald-400' },
        { label: 'GST Tax Filing Status', value: 'Filed & Approved', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Live Profit & Loss Engine', desc: 'Real-time income vs expense ledger.' },
        { title: 'Bank Reconciliation Tool', desc: 'Auto-matches bank feeds with voucher entries.' },
        { title: 'Accounts Payable Queue', desc: 'Manages vendor payment schedules & credit terms.' }
      ],
      reports: ['Trial Balance Sheet', 'Cash Flow Forecast', 'Dimensional Cost-Center P&L']
    },
    subModules: [
      { title: 'General Ledger & Chart of Accounts', desc: 'Flexible multi-tier Chart of Accounts supporting dimensional cost-center accounting.', icon: 'BookOpen', color: 'text-indigo-400', bg: 'bg-indigo-500/10', metric: 'Multi-Entity Ledger' },
      { title: 'Accounts Payable & Receivable', desc: 'Track vendor payment terms, aging analysis reports, customer credit limits, and reminders.', icon: 'DollarSign', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Automated AP/AR' },
      { title: 'GST & Tax Compliance Engine', desc: 'Generate e-invoices, e-way bills, and export GSTR-1, GSTR-3B, and TDS returns automatically.', icon: 'ShieldCheck', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: '100% Tax Compliant' },
      { title: 'Automated Bank Reconciliation', desc: 'Import electronic bank statements and auto-match transactions with ledger entries.', icon: 'RefreshCw', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Single-Click Reconcile' },
      { title: 'Cost Center & Project Accounting', desc: 'Track revenue, expenses, and gross profit margins per department, branch, or project.', icon: 'PieChart', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Exact Cost Center' },
      { title: 'Executive Balance Sheet & P&L', desc: 'Generate instant Profit & Loss statements, Trial Balances, and Cash Flow forecasts.', icon: 'FileSpreadsheet', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Instant Reports' }
    ],
    projects: [
      { title: 'Multi-Entity Group Financial Consolidation', client: 'Mahalaxmi Enterprise Group', results: 'Consolidated balance sheets across 6 subsidiary companies in under 3 hours.', tag: 'Group Finance' },
      { title: 'Automated E-Invoicing & GST Return System', client: 'Prime Commercial Logistics', results: 'Generated 45,000 monthly GST e-invoices without a single tax filing penalty.', tag: 'Taxation' },
      { title: 'Corporate Cash Flow & AP Automation', client: 'Summit Retail India', results: 'Accelerated vendor payment processing by 5 days while enforcing double-check approvals.', tag: 'Corporate Finance' }
    ],
    benefits: ['Real-time Profit & Loss Ledger', 'Automated Tax & GST Audits', 'Multi-Entity Consolidated Books', 'Seamless Bank Reconciliation', 'Strict Expense Approval Limits', 'Accurate Cash Flow Forecasts'],
    workflow: [
      { name: 'Post Entry', desc: 'Capture invoices and transactions' },
      { name: 'Approve', desc: 'Verify expenses and payments' },
      { name: 'Reconcile', desc: 'Match bank statements automatically' },
      { name: 'File Tax', desc: 'Calculate GST and regulatory dues' },
      { name: 'Report', desc: 'Export balance sheets and P&L statements' }
    ]
  },
  'HR & Payroll': {
    heroTitle: 'Modern',
    heroHighlight: 'HR & Payroll Systems.',
    heroDesc: 'Manage your workforce effectively from hire to retire. Automate attendance tracking, payroll processing, tax deductions, leave management, and performance reviews.',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.webp',
    overview: 'Our HR & Payroll module automates employee administration from onboarding to retirement. Integrate biometric attendance devices, run complex multi-tier salary calculations with tax deductions, manage leave approvals, and empower staff with a mobile self-service app.',
    departmentDashboard: {
      deptName: 'Human Resources & People Operations Department',
      deptRole: 'Manages employee onboarding, biometric timecards, shift rosters, single-click payroll disbursement, and PF/ESI compliance.',
      kpis: [
        { label: 'Active Workforce Count', value: '1,250' },
        { label: 'Attendance Rate Today', value: '97.4%', color: 'text-emerald-400' },
        { label: 'Payroll Run Status', value: 'Calculated & Verified', color: 'text-emerald-400' },
        { label: 'Pending Expense Claims', value: '8' }
      ],
      widgets: [
        { title: 'Biometric Attendance Feed', desc: 'Live punch-in logs from face-recognition units.' },
        { title: 'Single-Click Payroll Run', desc: 'Computes gross salary, taxes, PF & bank files.' },
        { title: 'Employee Leave Portal', desc: 'Approves leave applications & leave balances.' }
      ],
      reports: ['Monthly Salary Register', 'PF & ESI Statutory Return', 'Employee Turnover & Retention']
    },
    subModules: [
      { title: 'Single-Click Payroll Engine', desc: 'Calculate gross pay, PF, ESI, TDS, professional tax, loan deductions, and net payouts instantly.', icon: 'DollarSign', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', metric: '1-Click Payroll' },
      { title: 'Biometric & Shift Attendance', desc: 'Sync face-recognition and fingerprint biometric machines with shift roster rules.', icon: 'Clock', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Real-time Timecard' },
      { title: 'Employee Self-Service (ESS) Portal', desc: 'Mobile app for staff to view payslips, apply for leave, submit tax proof, and log expenses.', icon: 'Users', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Empowered Staff' },
      { title: 'Leave & Holiday Management', desc: 'Configure paid leave, sick leave, maternity leave, and encashment calculation rules.', icon: 'Calendar', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Auto Leave Sync' },
      { title: 'Expense Reimbursements', desc: 'Scan travel receipts, submit claims, and route expenses through manager approval chains.', icon: 'CreditCard', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Fast Claims' },
      { title: 'Performance Appraisal (KRA/KPI)', desc: 'Track employee goals, quarterly review scorecards, self-appraisals, and increment letters.', icon: 'Award', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Objective Review' }
    ],
    projects: [
      { title: 'Multi-Location Manufacturing Plant Payroll', client: 'Polymax Rubber Works', results: 'Automated monthly payroll processing for 2,200 shopfloor workers from 3 days to 15 minutes.', tag: 'Manufacturing Payroll' },
      { title: 'IT Services Biometric & Remote ESS App', client: 'SoftNet Global Solutions', results: 'Deployed mobile attendance tracking for 850 remote software engineers across 5 cities.', tag: 'IT Workforce' },
      { title: 'Retail Staff Shift Roster & Statutory HR', client: 'HyperMarket Superstores', results: 'Reduced employee turnover by 15% through transparent mobile leave and shift scheduling.', tag: 'Retail HR' }
    ],
    benefits: ['Automated Shift Attendance', 'Single-Click Payroll Runs', 'Regulatory Tax & PF Compliance', 'Self-Service Employee Portals', 'Transparent Expense Claims', 'Performance Review Metrics'],
    workflow: [
      { name: 'Onboard', desc: 'Create profiles and capture contracts' },
      { name: 'Log Time', desc: 'Sync biometric attendance records' },
      { name: 'Calculate', desc: 'Compute gross salary, taxes, and deductions' },
      { name: 'Disburse', desc: 'Generate payslips and bank files' },
      { name: 'Comply', desc: 'Submit PF, ESI, and tax declarations' }
    ]
  },
  'Asset Management': {
    heroTitle: 'Proactive',
    heroHighlight: 'Asset Management.',
    heroDesc: 'Track all your fixed assets across locations. Automate depreciation calculations, schedule maintenance, and maximize asset lifespan and utilization.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.webp',
    overview: 'Our Fixed Asset Management module protects your high-value physical investments. Track asset movements across branches, calculate straight-line or written-down depreciation rates automatically, manage AMCs, and prevent unplanned equipment failures.',
    departmentDashboard: {
      deptName: 'Plant Facilities & Fixed Asset Management Department',
      deptRole: 'Monitors high-value equipment assets, barcode location tags, depreciation sheets, AMC maintenance schedules, and scrap sales.',
      kpis: [
        { label: 'Total Tracked Assets Value', value: '$18.5M' },
        { label: 'Equipment Availability Rate', value: '98.2%', color: 'text-emerald-400' },
        { label: 'Scheduled AMC Visits', value: '6' },
        { label: 'Depreciation Engine Status', value: 'Auto-Calculated', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Fixed Asset Location Map', desc: 'Tracks IT devices & machines by room & branch.' },
        { title: 'Preventive AMC Reminder', desc: 'Alerts before warranty & service contracts expire.' },
        { title: 'Breakdown Work Order Log', desc: 'Dispatches maintenance techs for equipment repairs.' }
      ],
      reports: ['Asset Depreciation Schedule (SLM/WDV)', 'Maintenance Cost & Downtime Log', 'Asset Scrap & Disposal Valuation']
    },
    subModules: [
      { title: 'Asset Tracking & Barcoding', desc: 'Assign QR codes, RFID tags, or barcode labels to track IT equipment, machinery, and furniture.', icon: 'Tag', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: '100% Asset Tracked' },
      { title: 'Depreciation Engine (SLM/WDV)', desc: 'Auto-calculate monthly asset depreciation for Companies Act and Income Tax IT Act rules.', icon: 'PieChart', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Tax Compliant' },
      { title: 'Preventive Maintenance & AMC', desc: 'Set automated service reminders, log breakdown maintenance, and manage warranty contracts.', icon: 'Wrench', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Zero Breakdown' },
      { title: 'Asset Transfer & Movement', desc: 'Issue asset gate passes, record inter-branch equipment transfers, and capture custodian sign-offs.', icon: 'ArrowLeftRight', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Clean Transfer' },
      { title: 'Physical Audit & Verification', desc: 'Perform physical asset audits using mobile barcode scanners to flag missing or damaged items.', icon: 'CheckSquare', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Fast Physical Audits' },
      { title: 'Disposal & Scrap Valuation', desc: 'Manage asset retirements, calculate profit/loss on asset sales, and record write-offs.', icon: 'RotateCc', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Clean Scrap Sale' }
    ],
    projects: [
      { title: 'Corporate IT & Laptop Asset Tracking', client: 'GlobalTech BPO Services', results: 'Tracked 4,500 laptops and IT devices across 8 offices, eliminating 99% of lost asset incidents.', tag: 'IT Assets' },
      { title: 'Industrial Machinery Maintenance & AMC', client: 'Kirloskar Valve Forge', results: 'Automated AMC reminders for 120 heavy forging machines, reducing breakdown time by 40%.', tag: 'Machinery' },
      { title: 'Hospital Fixed Asset Verification ERP', client: 'Lifeline Healthcare Group', results: 'Completed annual physical verification of 12,000 medical devices in 2 days instead of 3 weeks.', tag: 'Healthcare Assets' }
    ],
    benefits: ['Minimized Equipment Downtime', 'Auto-calculated Depreciation', 'AMC & Warranty Reminders', 'Barcode Asset Tracking', 'Maintenance Cost Logging', 'Optimal Disposal Valuations'],
    workflow: [
      { name: 'Register', desc: 'Capture asset codes, cost, and warranty' },
      { name: 'Depreciate', desc: 'Run monthly depreciation calculations' },
      { name: 'Schedule AMC', desc: 'Set service reminders for machinery' },
      { name: 'Maintain', desc: 'Issue breakdown work orders' },
      { name: 'Retire', desc: 'Log asset disposal or scrap sales' }
    ]
  },
  'Warehouse Management': {
    heroTitle: 'Efficient',
    heroHighlight: 'Warehouse Management.',
    heroDesc: 'Optimize warehouse operations with barcode scanning, automated put-away rules, intelligent picking/packing, and real-time bin-level stock visibility.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.webp',
    overview: 'Our Warehouse Management System (WMS) maximizes space utilization and fulfillment speed. Manage bin locations, automate put-away routing, direct picking staff via handheld scanners, and achieve 99.9% order dispatch accuracy.',
    departmentDashboard: {
      deptName: 'Logistics & Warehouse Operations (WMS) Department',
      deptRole: 'Controls bin-level stock locations, put-away routing, picking path optimization, handheld barcode scanning, and shipping manifests.',
      kpis: [
        { label: 'Warehouse Bins Capacity', value: '84% Used' },
        { label: 'Picker Speed Velocity', value: '140 Items/hr', color: 'text-emerald-400' },
        { label: 'Dispatch Accuracy Rate', value: '99.9%', color: 'text-emerald-400' },
        { label: 'Cycle Count Discrepancy', value: '0.02%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'Bin Put-Away Route Map', desc: 'Guides workers to shortest aisle & rack slots.' },
        { title: 'Handheld Scanner Live Feed', desc: 'Monitors real-time picking & packing scans.' },
        { title: 'Carton Weight & Shipping Label', desc: 'Auto-prints carrier labels upon packing.' }
      ],
      reports: ['Warehouse Space Utilization Audit', 'Picker Performance Velocity', 'Dispatch Shipping Manifest']
    },
    subModules: [
      { title: 'Bin & Rack Slot Management', desc: 'Define 3D warehouse locations (Aisle-Rack-Shelf-Bin) and set storage capacity rules.', icon: 'Grid', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: '+30% Space Used' },
      { title: 'Automated Put-Away Routing', desc: 'Direct incoming goods to optimal bin locations based on item weight, frequency, and size.', icon: 'MapPin', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Smart Put-Away' },
      { title: 'Wave & Zone Picking Slips', desc: 'Generate shortest-path picking routes for warehouse staff to speed up order dispatch.', icon: 'PackageSearch', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: '2x Pick Speed' },
      { title: 'Handheld Mobile Scanner Integration', desc: 'Android mobile app for warehouse operators to execute receiving, picking, and packing scans.', icon: 'Barcode', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: '99.9% Accuracy' },
      { title: 'Packing & Shipping Labeling', desc: 'Automate carton weight checks, print shipping manifests, and attach carrier tracking barcodes.', icon: 'Tag', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Fast Dispatch' },
      { title: 'Cycle Counting & Stock Audits', desc: 'Perform perpetual ABC cycle counts without stopping warehouse inbound/outbound operations.', icon: 'RefreshCw', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Zero Downtime Audits' }
    ],
    projects: [
      { title: 'E-Commerce Fulfillment Center WMS', client: 'TrendKart Logistics Hub', results: 'Scaled daily order dispatches from 2,000 to 12,000 packages with 99.9% pick accuracy.', tag: 'E-Commerce WMS' },
      { title: 'Cold-Chain Frozen Food Warehouse WMS', client: 'Arctic Cold Storage', results: 'Reduced picker travel distance by 42% through zone-based shortest-path routing.', tag: 'Cold Storage' },
      { title: 'Automotive Parts Central Distribution WMS', client: 'Mahindra Logistics Supplier Hub', results: 'Implemented bin-level barcode scanning for 48,000 SKUs across a 150,000 sq.ft warehouse.', tag: 'Automotive Logistics' }
    ],
    benefits: ['Optimized Bin Allocations', 'Faster Pick/Pack Delivery Cycles', 'Reduced Stock Search Times', 'Real-time Stock Adjustments', 'Dynamic FIFO Routing', 'Mobile Scan Log Integration'],
    workflow: [
      { name: 'Route Inbound', desc: 'Assign warehouse bins for receipts' },
      { name: 'Log Slot', desc: 'Store items by height and batch limits' },
      { name: 'Pick Order', desc: 'Generate path-optimized picking slip' },
      { name: 'Pack & Label', desc: 'Verify dimensions and print cargo tags' },
      { name: 'Audit Zone', desc: 'Execute cycle counting checklists' }
    ]
  },
  'ERP Integrations': {
    heroTitle: 'Seamless',
    heroHighlight: 'ERP Integrations.',
    heroDesc: 'Connect your ERP with third-party applications, IoT devices, payment gateways, CRM systems, and eCommerce platforms to create a unified business ecosystem.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.webp',
    overview: 'Our ERP Integration module connects your central database with external applications, IoT hardware sensors, e-commerce storefronts, payment gateways, and banking portals via secure REST/GraphQL APIs and webhooks.',
    departmentDashboard: {
      deptName: 'Enterprise IT & API Infrastructure Department',
      deptRole: 'Manages API gateway traffic, webhook triggers, e-commerce inventory feeds, payment handshakes, and system uptime.',
      kpis: [
        { label: 'Active Webhook Triggers', value: '34' },
        { label: 'API Queries Processed / sec', value: '1,450' },
        { label: 'API Infrastructure Uptime', value: '99.99%', color: 'text-emerald-400' },
        { label: 'Payload Error Rate', value: '0.00%', color: 'text-emerald-400' }
      ],
      widgets: [
        { title: 'IoT Machine Telemetry Stream', desc: 'Ingests real-time PLC & sensor data feeds.' },
        { title: 'E-Commerce Stock Sync Status', desc: 'Monitors Shopify/Magento inventory matching.' },
        { title: 'Payment Gateway Handshake Log', desc: 'Verifies Stripe/Razorpay settlement webhooks.' }
      ],
      reports: ['API Traffic Analytics Log', 'Webhook Delivery & Failure Audit', 'Integration Security Log']
    },
    subModules: [
      { title: 'E-Commerce Store Sync (Shopify/Magento)', desc: 'Bi-directional sync of product stock, prices, customer orders, and dispatch statuses.', icon: 'ShoppingCart', color: 'text-blue-400', bg: 'bg-blue-500/10', metric: 'Real-time Sync' },
      { title: 'IoT Sensor & Machine Gateway', desc: 'Ingest live telemetry data from PLC controllers, temperature sensors, and smart meters.', icon: 'Cpu', color: 'text-purple-400', bg: 'bg-purple-500/10', metric: 'Live Sensor Feed' },
      { title: 'Payment Gateway & Banking API', desc: 'Connect Razorpay, Stripe, and HDFC corporate banking APIs for auto-reconciliation.', icon: 'CreditCard', color: 'text-emerald-400', bg: 'bg-emerald-500/10', metric: 'Instant Settlement' },
      { title: 'CRM & Marketing Handshake', desc: 'Sync lead pipelines, customer support tickets, and sales orders between CRM and ERP.', icon: 'Share2', color: 'text-cyan-400', bg: 'bg-cyan-500/10', metric: 'Unified Profiles' },
      { title: 'Legacy Systems REST API Bridge', desc: 'Expose secure REST APIs and webhooks to integrate legacy mainframe and custom software.', icon: 'Code', color: 'text-amber-400', bg: 'bg-amber-500/10', metric: 'Audit Logged' },
      { title: 'EDI & Supply Chain Portal', desc: 'Electronic Data Interchange (EDI 850/856/810) for automated B2B retail retail orders.', icon: 'Globe', color: 'text-rose-400', bg: 'bg-rose-500/10', metric: 'Standard B2B EDI' }
    ],
    projects: [
      { title: 'Omnichannel Shopify & ERP Inventory Sync', client: 'Urban Fashion Brands', results: 'Synchronized online sales with 24 physical retail store inventories in real time.', tag: 'E-Commerce' },
      { title: 'IoT Machine Telemetry & ERP Integration', client: 'Motherson Moulding Works', results: 'Connected 45 plastic injection machines directly to ERP work-order dispatching.', tag: 'IoT Integration' },
      { title: 'Corporate Banking Payment API Integration', client: 'FastTrack Logistics', results: 'Automated 12,000 monthly vendor bank transfers with instant reconciliation.', tag: 'Fintech API' }
    ],
    benefits: ['Unified Business Data Sync', 'Real-time IoT Telemetry Feeds', 'E-commerce Inventory Match', 'Secure Payment API Handshakes', 'Bi-directional CRM Webhooks', 'Custom Developer Sandboxes'],
    workflow: [
      { name: 'Map Fields', desc: 'Match data structures between systems' },
      { name: 'Setup API', desc: 'Configure secure webhook triggers' },
      { name: 'Test Sandbox', desc: 'Simulate data requests and responses' },
      { name: 'Deploy Live', desc: 'Enable bi-directional production sync' },
      { name: 'Monitor Log', desc: 'Track payload transfers and errors' }
    ]
  }
};

export const getDefaultData = (tabName) => {
  return erpTabData[tabName] || erpTabData['Manufacturing ERP'];
};
