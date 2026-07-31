import React, { useState, useEffect } from 'react';
import { 
  Factory, HeartPulse, ShoppingCart, HardHat, PackageSearch, 
  ShoppingBag, TrendingUp, ShieldCheck, Calculator, Users, 
  BoxSelect, Warehouse, Share2, CheckCircle2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const erpModulesList = [
  { name: 'Manufacturing ERP', icon: Factory },
  { name: 'Healthcare ERP', icon: HeartPulse },
  { name: 'Trading ERP', icon: ShoppingCart },
  { name: 'Construction ERP', icon: HardHat },
  { name: 'Inventory Management', icon: PackageSearch },
  { name: 'Purchase Management', icon: ShoppingBag },
  { name: 'Production Planning', icon: TrendingUp },
  { name: 'Quality Management', icon: ShieldCheck },
  { name: 'Finance & Accounts', icon: Calculator },
  { name: 'HR & Payroll', icon: Users },
  { name: 'Asset Management', icon: BoxSelect },
  { name: 'Warehouse Management', icon: Warehouse },
  { name: 'ERP Integrations', icon: Share2 }
];

const erpDashboardData = {
  'Manufacturing ERP': {
    title: 'Manufacturing ERP Operational Dashboard',
    desc: 'Automate shop floor operations, optimize production planning, manage BOMs, and monitor machine performance.',
    image: '/assets/images/new-iot-solutions/iot_robot_dark.png',
    features: ['Production Planning & Scheduling', 'Machine OEE Management', 'Bill of Materials (BOM)', 'Quality Control & Inspection', 'Shop Floor Work Orders', 'Costing & Profitability Analysis'],
    stats: [
      { label: 'Units Produced', value: '14,850', chg: '↑ 12.4%' },
      { label: 'Shift OEE Rate', value: '94.2%', chg: '↑ 3.2%', color: 'text-emerald-400' },
      { label: 'Active Lines', value: '18 / 20', chg: '90% Capacity' },
      { label: 'Scrap Defect Rate', value: '0.38%', chg: '↓ 1.4%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Planned Orders', val: '15,000', color: 'bg-purple-600' },
      { stage: 'Dispatched to Shop', val: '14,920', color: 'bg-indigo-600' },
      { stage: 'Passed Quality', val: '14,850', color: 'bg-pink-600' },
      { stage: 'Packed for Dispatch', val: '14,850', color: 'bg-emerald-500' }
    ]
  },
  'Healthcare ERP': {
    title: 'Healthcare & Hospital Administration Hub',
    desc: 'Streamline patient intake, manage medical records (EHR), automate pharmacy stock, and process insurance claims.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.png',
    features: ['EHR/EMR Systems Integration', 'Patient Scheduling Portal', 'Pharmacy Inventory Control', 'Billing & Claims Management', 'Doctor Roster Allocation', 'HIPAA Compliance Vault'],
    stats: [
      { label: 'Admissions Today', value: '420', chg: '↑ 8.2%' },
      { label: 'Bed Occupancy', value: '88.0%', chg: 'Optimal' },
      { label: 'Doctor Roster', value: '45 Active', chg: '100% Roster' },
      { label: 'Claim Approvals', value: '98.4%', chg: '↑ 2.1%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Patient Registrations', val: '420', color: 'bg-rose-600' },
      { stage: 'Doctor Consultations', val: '390', color: 'bg-purple-600' },
      { stage: 'Lab Tests Completed', val: '280', color: 'bg-indigo-600' },
      { stage: 'Billing & Discharged', val: '385', color: 'bg-emerald-500' }
    ]
  },
  'Trading ERP': {
    title: 'Trading & Wholesale Distribution Hub',
    desc: 'Manage supply chains, track inventory across multiple warehouses, automate sales orders, and audit landed costs.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    features: ['Multi-Currency Book Ledger', 'Automated Sales Orders', 'Cross-docking & Warehousing', 'Supplier Scorecards', 'Customs & Duty Automation', 'Dynamic Price Margins'],
    stats: [
      { label: 'Active Shipments', value: '142', chg: '↑ 14.5%' },
      { label: 'Inventory Turnover', value: '8.4x', chg: '↑ 1.2x', color: 'text-emerald-400' },
      { label: 'On-Time Delivery', value: '99.1%', chg: '↑ 0.8%', color: 'text-emerald-400' },
      { label: 'Vendor Rating', value: '94 / 100', chg: 'High Grade' }
    ],
    funnel: [
      { stage: 'Purchase RFQs', val: '180', color: 'bg-orange-600' },
      { stage: 'PO Released', val: '165', color: 'bg-purple-600' },
      { stage: 'Warehouse Received', val: '150', color: 'bg-indigo-600' },
      { stage: 'Dispatched Orders', val: '142', color: 'bg-emerald-500' }
    ]
  },
  'Construction ERP': {
    title: 'Construction & Site Engineering Hub',
    desc: 'Control construction projects with integrated budgeting, resource planning, subcontractor contracts, and site DPR logs.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    features: ['Project BOQ Budgeting', 'Subcontractor RA Billing', 'Site Material Indent', 'Plant & Fleet Management', 'Daily Progress Reports (DPR)', 'Profitability Analytics'],
    stats: [
      { label: 'Active Project Sites', value: '12', chg: 'Running' },
      { label: 'Budget Cost Variance', value: '-2.4%', chg: 'Under Budget', color: 'text-emerald-400' },
      { label: 'Labor Onsite Count', value: '340', chg: 'Active' },
      { label: 'Safety Compliance', value: '100%', chg: 'Certified', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'BOQ Estimates', val: '12', color: 'bg-amber-600' },
      { stage: 'Subcontracts Awarded', val: '45', color: 'bg-purple-600' },
      { stage: 'Site DPR Reports', val: '340', color: 'bg-indigo-600' },
      { stage: 'RA Bills Approved', val: '42', color: 'bg-emerald-500' }
    ]
  },
  'Inventory Management': {
    title: 'Central Inventory & Stores Control Hub',
    desc: 'Optimize stock levels, automate reordering, track serial numbers, and reduce carrying costs with multi-warehouse visibility.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    features: ['Multi-Warehouse Ledger', 'Barcode & RFID Tracking', 'Reorder Point Engine', 'Inter-Warehouse Transfers', 'FIFO/LIFO Valuation', 'Deadstock Analytics'],
    stats: [
      { label: 'Cataloged SKUs', value: '45,200', chg: 'Active' },
      { label: 'Audit Accuracy', value: '99.9%', chg: '↑ 0.5%', color: 'text-emerald-400' },
      { label: 'Reorder Alerts', value: '4', chg: 'Action Needed' },
      { label: 'Deadstock Rate', value: '1.2%', chg: '↓ 3.4%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Inbound GRN Scans', val: '2,450', color: 'bg-blue-600' },
      { stage: 'Bin Slot Put-away', val: '2,450', color: 'bg-purple-600' },
      { stage: 'Picked Orders', val: '2,100', color: 'bg-pink-600' },
      { stage: 'Cycle Count Audit', val: '45,200', color: 'bg-emerald-500' }
    ]
  },
  'Purchase Management': {
    title: 'Corporate Procurement & Sourcing Hub',
    desc: 'Automate RFQs, manage purchase orders, evaluate supplier scorecards, and enforce 3-way invoice matching.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    features: ['Purchase Requisition Hub', 'RFQ Vendor Tendering', 'Multi-Level Approvals', 'GRN 3-Way Match', 'Vendor Scorecards', 'Procurement Savings Log'],
    stats: [
      { label: 'Open RFQ Tenders', value: '14', chg: 'Active' },
      { label: 'Active PO Volume', value: '$1.2M', chg: 'Approved' },
      { label: 'Sourcing Lead Time', value: '2.4 Days', chg: '⚡ Fast', color: 'text-emerald-400' },
      { label: 'Procurement Savings', value: '12.8%', chg: '↑ 2.4%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Requisitions Received', val: '45', color: 'bg-pink-600' },
      { stage: 'RFQs Tendered', val: '14', color: 'bg-purple-600' },
      { stage: 'POs Approved', val: '38', color: 'bg-indigo-600' },
      { stage: 'GRN Matched', val: '36', color: 'bg-emerald-500' }
    ]
  },
  'Production Planning': {
    title: 'Planning & Production Control (PPC) Hub',
    desc: 'Plan demand accurately, schedule capacity, route materials efficiently, and balance machine work centers.',
    image: '/assets/images/new-iot-solutions/iot_robot_dark.png',
    features: ['Master Schedule (MPS)', 'Material Needs (MRP)', 'Capacity Load Balancing', 'What-If Simulation', 'Routing Control', 'On-Time Delivery (OTD)'],
    stats: [
      { label: 'MPS Compliance', value: '98.6%', chg: '↑ 1.4%', color: 'text-emerald-400' },
      { label: 'Machine Load Rate', value: '91.0%', chg: 'Balanced' },
      { label: 'MRP Material Shortage', value: '0 SKUs', chg: 'Clean', color: 'text-emerald-400' },
      { label: 'On-Time Delivery', value: '99.0%', chg: '↑ 2.1%', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Sales Order Demand', val: '15,000', color: 'bg-green-600' },
      { stage: 'MRP Raw Materials', val: '15,000', color: 'bg-purple-600' },
      { stage: 'Machine Shifts Scheduled', val: '140', color: 'bg-indigo-600' },
      { stage: 'Fulfilled On-Time', val: '14,850', color: 'bg-emerald-500' }
    ]
  },
  'Quality Management': {
    title: 'Quality Assurance & Compliance (QA/QC) Hub',
    desc: 'Ensure rigorous quality standards. Inspect incoming GRNs, capture inline defects, quarantine NCR scrap, and track CAPA.',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.png',
    features: ['Inward GRN Quality', 'Inline Operator Sampling', 'NCR Scrap Quarantine', 'CAPA Root Cause (8D)', 'Gauge Calibration', 'Certificate of Analysis (CoA)'],
    stats: [
      { label: 'First Pass Yield', value: '99.4%', chg: '↑ 0.6%', color: 'text-emerald-400' },
      { label: 'Active NCR Logs', value: '2', chg: 'Quarantined' },
      { label: 'CAPA Closure Time', value: '24 Hours', chg: '⚡ Fast', color: 'text-emerald-400' },
      { label: 'Customer Defect Rate', value: '8 PPM', chg: 'World Class', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Samples Tested', val: '4,500', color: 'bg-amber-600' },
      { stage: 'Passed Inspection', val: '4,473', color: 'bg-purple-600' },
      { stage: 'NCR Quarantined', val: '27', color: 'bg-rose-600' },
      { stage: 'CoA Certified', val: '4,473', color: 'bg-emerald-500' }
    ]
  },
  'Finance & Accounts': {
    title: 'Finance & Accounts Controlling Hub',
    desc: 'Gain real-time financial insights. Automate General Ledger, Accounts Payable/Receivable, bank reconciliation, and GST tax filing.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    features: ['General Ledger & Chart', 'Accounts Payable & AR', 'GST & Tax Engine', 'Bank Reconciliation', 'Cost Center Accounting', 'Balance Sheet & P&L'],
    stats: [
      { label: 'Monthly Revenue', value: '$4.2M', chg: '↑ 18.2%' },
      { label: 'Gross Profit Margin', value: '42.5%', chg: '↑ 2.4%', color: 'text-emerald-400' },
      { label: 'Overdue AR Rate', value: '2.1%', chg: '↓ 1.5%', color: 'text-emerald-400' },
      { label: 'GST Tax Return', value: 'Filed & OK', chg: 'Compliant', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Invoices Generated', val: '1,200', color: 'bg-indigo-600' },
      { stage: 'Payments Reconciled', val: '1,180', color: 'bg-purple-600' },
      { stage: 'Tax Returns Filed', val: '100%', color: 'bg-pink-600' },
      { stage: 'Consolidated P&L', val: '$4.2M', color: 'bg-emerald-500' }
    ]
  },
  'HR & Payroll': {
    title: 'Human Resources & People Ops Hub',
    desc: 'Manage workforce attendance, run multi-tier single-click payroll, track leave approvals, and handle PF/ESI compliance.',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.png',
    overview: 'Our HR & Payroll module automates employee administration from onboarding to retirement. Integrate biometric attendance devices, run complex multi-tier salary calculations with tax deductions, manage leave approvals, and empower staff with a mobile self-service app.',
    features: ['Single-Click Payroll Engine', 'Biometric Shift Roster', 'Employee Self-Service App', 'Leave Management', 'Expense Reimbursements', 'KRA/KPI Appraisals'],
    stats: [
      { label: 'Active Workforce', value: '1,250', chg: 'Active' },
      { label: 'Attendance Rate', value: '97.4%', chg: '↑ 1.2%', color: 'text-emerald-400' },
      { label: 'Payroll Status', value: 'Ready', chg: '1-Click Run', color: 'text-emerald-400' },
      { label: 'Pending Claims', value: '8', chg: 'Reviewed' }
    ],
    funnel: [
      { stage: 'Workforce Punches', val: '1,250', color: 'bg-fuchsia-600' },
      { stage: 'Timecards Verified', val: '1,250', color: 'bg-purple-600' },
      { stage: 'Salary Computed', val: '1,250', color: 'bg-indigo-600' },
      { stage: 'Bank Disbursed', val: '1,250', color: 'bg-emerald-500' }
    ]
  },
  'Asset Management': {
    title: 'Plant Facilities & Fixed Asset Management Hub',
    desc: 'Track physical assets across locations, auto-calculate depreciation, schedule preventive AMC service, and handle scrap sales.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    features: ['Asset Tracking & Barcodes', 'Depreciation (SLM/WDV)', 'Preventive AMC Reminders', 'Asset Transfers', 'Physical Scans Audit', 'Disposal & Scrap Valuation'],
    stats: [
      { label: 'Tracked Assets Value', value: '$18.5M', chg: 'Audited' },
      { label: 'Equipment Availability', value: '98.2%', chg: '↑ 2.1%', color: 'text-emerald-400' },
      { label: 'Scheduled AMCs', value: '6 Visits', chg: 'Active' },
      { label: 'Depreciation Engine', value: 'Auto', chg: 'Compliant', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Assets Cataloged', val: '4,500', color: 'bg-cyan-600' },
      { stage: 'Barcode Audited', val: '4,500', color: 'bg-purple-600' },
      { stage: 'AMC Serviced', val: '120', color: 'bg-pink-600' },
      { stage: 'Depreciation Logged', val: '$18.5M', color: 'bg-emerald-500' }
    ]
  },
  'Warehouse Management': {
    title: 'Logistics & Warehouse Operations (WMS) Hub',
    desc: 'Optimize warehouse 3D bin locations, direct put-away routing, generate wave picking slips, and sync handheld barcode scanners.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    features: ['Bin & Rack Slot Control', 'Automated Put-Away', 'Wave & Zone Picking', 'Handheld Mobile Scans', 'Carton Weight & Shipping', 'Cycle Count Audits'],
    stats: [
      { label: 'Warehouse Bins Used', value: '84.0%', chg: 'Optimal' },
      { label: 'Picker Velocity', value: '140 / hr', chg: '↑ 15%', color: 'text-emerald-400' },
      { label: 'Dispatch Accuracy', value: '99.9%', chg: '↑ 0.1%', color: 'text-emerald-400' },
      { label: 'Cycle Discrepancy', value: '0.02%', chg: 'Clean', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'Inbound Receipts', val: '1,200', color: 'bg-violet-600' },
      { stage: 'Bin Slot Put-away', val: '1,200', color: 'bg-purple-600' },
      { stage: 'Wave Picked', val: '1,195', color: 'bg-pink-600' },
      { stage: 'Packed & Dispatched', val: '1,195', color: 'bg-emerald-500' }
    ]
  },
  'ERP Integrations': {
    title: 'Enterprise IT & API Infrastructure Hub',
    desc: 'Connect central ERP with external webstores, IoT sensors, payment portals, and CRM systems via secure REST/GraphQL webhooks.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.png',
    features: ['Shopify & Magento Sync', 'IoT Sensor Telemetry', 'Payment Gateway APIs', 'CRM Bi-directional Sync', 'Legacy REST Bridges', 'B2B EDI Standards'],
    stats: [
      { label: 'Active Webhooks', value: '34', chg: 'Live' },
      { label: 'API Queries / Sec', value: '1,450', chg: 'High Speed' },
      { label: 'System Uptime', value: '99.99%', chg: 'Stable', color: 'text-emerald-400' },
      { label: 'Payload Error Rate', value: '0.00%', chg: 'Zero Error', color: 'text-emerald-400' }
    ],
    funnel: [
      { stage: 'API Requests', val: '1,450/s', color: 'bg-[#9333ea]' },
      { stage: 'Webhook Triggered', val: '34', color: 'bg-indigo-600' },
      { stage: 'Payload Processed', val: '100%', color: 'bg-pink-600' },
      { stage: 'Synced Live', val: '99.99%', color: 'bg-emerald-500' }
    ]
  }
};

const ErpIndustryTabs = ({ activeTab: mainActiveTab }) => {
  const [activeTab, setActiveTab] = useState('Manufacturing ERP');

  useEffect(() => {
    if (mainActiveTab && erpDashboardData[mainActiveTab]) {
      setActiveTab(mainActiveTab);
    }
  }, [mainActiveTab]);

  const data = erpDashboardData[activeTab] || erpDashboardData['Manufacturing ERP'];

  const handleNextTab = () => {
    const currentIndex = erpModulesList.findIndex(i => i.name === activeTab);
    const nextIndex = (currentIndex + 1) % erpModulesList.length;
    setActiveTab(erpModulesList[nextIndex].name);
  };

  const handlePrevTab = () => {
    const currentIndex = erpModulesList.findIndex(i => i.name === activeTab);
    const prevIndex = (currentIndex - 1 + erpModulesList.length) % erpModulesList.length;
    setActiveTab(erpModulesList[prevIndex].name);
  };

  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h3 className="text-[16px] font-bold text-white tracking-wide">ERP Solutions Dashboards & Operational Analytics</h3>
        <p className="text-xs text-gray-400 mt-2">Explore tailored dashboard layouts and real-time operational funnels for each ERP module</p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {erpModulesList.map((mod, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(mod.name)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
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
                      src={data.image || '/assets/images/new-iot-solutions/erp_isometric_dark.png'} 
                      alt={activeTab} 
                      className="w-full h-full object-contain p-2 filter contrast-125 brightness-110 opacity-90" 
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
                              <span className="text-sm font-bold text-white block leading-none">94.2%</span>
                              <span className="text-[8px] text-gray-400 font-medium">Efficiency</span>
                           </div>
                        </div>
                        {/* Activity Bars */}
                        <div className="flex items-end gap-2 h-20">
                           <div className="w-3 bg-purple-600 h-[70%] rounded-t"></div>
                           <div className="w-3 bg-pink-500 h-[90%] rounded-t"></div>
                           <div className="w-3 bg-indigo-500 h-[65%] rounded-t"></div>
                           <div className="w-3 bg-emerald-500 h-[98%] rounded-t"></div>
                           <div className="w-3 bg-cyan-400 h-[80%] rounded-t"></div>
                        </div>
                     </div>
                     <div className="flex justify-between items-center text-[9px] text-gray-400 border-t border-gray-800/80 pt-2 mt-2">
                        <span>Real-time Telemetry Control</span>
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

export default ErpIndustryTabs;
