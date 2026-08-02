import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, ArrowRight, Rocket, Building2, ShieldCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDefaultData } from './erpTabData';

// Manufacturing ERP Simulator
const ManufacturingErpSimulator = () => {
  const [progress, setProgress] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 5));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-purple-400 font-bold uppercase tracking-wider">BOM_PROD_LINE_01</span>
        <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
      </div>

      <div className="space-y-2">
        <div>
          <div className="text-gray-500">// Bill of Materials (BOM)</div>
          <div className="text-white">Active Order: #BOM-890A</div>
        </div>

        <div>
          <div className="text-gray-500">Assembly Progress</div>
          <div className="w-full bg-gray-800 rounded-full h-2 mt-1 overflow-hidden">
            <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="border border-gray-800 bg-[#050117] p-2 rounded-lg">
          <span className="text-gray-500 text-[8px] block uppercase">Yield Rate</span>
          <span className="text-xs font-bold text-green-400">99.4%</span>
        </div>
        <div className="border border-gray-800 bg-[#050117] p-2 rounded-lg">
          <span className="text-gray-500 text-[8px] block uppercase">Cycle Time</span>
          <span className="text-xs font-bold text-cyan-400">8.4s</span>
        </div>
      </div>
    </div>
  );
};

// Healthcare ERP Hospital Administration Simulator
const HealthcareErpSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-rose-500 font-bold uppercase tracking-wider">HOSPITAL_ADMISSION_HUB</span>
        <span className="nh-led-active bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Bed Occupancy</span>
          <span className="text-white font-bold">88.0% (Optimal)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Claim Approval Rate</span>
          <span className="text-green-400 font-bold">98.4%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Active Roster</span>
          <span className="text-cyan-400 font-bold">45 Doctors</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Status: <span className="text-green-400">HIPAA VAULT COMPLIANT</span>
      </div>
    </div>
  );
};

// Trading ERP Shipment & Landed Cost Simulator
const TradingErpSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-orange-400 font-bold uppercase tracking-wider">TRADING_DIST_HUB</span>
        <span className="nh-led-active bg-orange-400 shadow-[0_0_8px_#fb923c]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Active Shipments</span>
          <span className="text-white font-bold">142 In-Transit</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">On-Time Delivery</span>
          <span className="text-green-400 font-bold">99.1%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Inventory Turnover</span>
          <span className="text-cyan-400 font-bold">8.4x</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Uptime: <span className="text-green-400">Syncing with Port API</span>
      </div>
    </div>
  );
};

// Construction ERP Budget & Site Cost Simulator
const ConstructionErpSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-emerald-400 font-bold uppercase tracking-wider">CONSTRUCTION_SITE_LEDGER</span>
        <span className="nh-led-active bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Project: Metro Phase 1</span>
          <span className="text-white font-bold">$450K / $500K</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Material Cost Index</span>
          <span className="text-green-400 font-bold">Under Budget (90%)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Active Labor Crew</span>
          <span className="text-cyan-400 font-bold">120 Checked In</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Compliance: <span className="text-green-400">ISO 45001 Verified</span>
      </div>
    </div>
  );
};

// Inventory Management SKU Catalog Simulator
const InventoryManagementSimulator = () => {
  const [qty, setQty] = useState(4820);

  useEffect(() => {
    const timer = setInterval(() => {
      setQty(q => (q <= 4800 ? 4820 : q - 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-blue-400 font-bold uppercase tracking-wider">INVENTORY_SKU_LEDGER</span>
        <span className="nh-led-active bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Total SKUs Tracked</span>
          <span className="text-white font-bold">48,000 SKUs</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Active Stock count</span>
          <span className="text-cyan-400 font-bold">{qty} units</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Accuracy Check</span>
          <span className="text-green-400 font-bold">99.99% (ABC Count)</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        State: <span className="text-green-400">MOBILE SCAN COMPATIBLE</span>
      </div>
    </div>
  );
};

// Purchase Management PO Approval Simulator
const PurchaseManagementSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-pink-400 font-bold uppercase tracking-wider">PO_APPROVAL_QUEUE</span>
        <span className="nh-led-active bg-pink-400 shadow-[0_0_8px_#f472b6]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">PO #INV-890</span>
          <span className="text-green-400 font-bold">APPROVED</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">PO #INV-891</span>
          <span className="text-yellow-500 font-bold">PENDING REVIEW</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">RFQ Ingestions</span>
          <span className="text-cyan-400 font-bold">12 RFQs Queue</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Status: <span className="text-green-400">E-Sign signatures verified</span>
      </div>
    </div>
  );
};

// Production Planning Capacity & OEE Target Simulator
const ProductionPlanningSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-green-400 font-bold uppercase tracking-wider">MRP_SCHEDULER_LINE</span>
        <span className="nh-led-active bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Active Lines</span>
          <span className="text-white font-bold">18 / 20 Line Stations</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Capacity Load</span>
          <span className="text-cyan-400 font-bold">90% Capacity</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Downtime Reasons</span>
          <span className="text-rose-400 font-bold">Zero Alerts</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Status: <span className="text-green-400">MRP ALGORITHMS ENGAGED</span>
      </div>
    </div>
  );
};

// Quality Management Defect Test Ticker Simulator
const QualityManagementSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-amber-400 font-bold uppercase tracking-wider">QUALITY_QC_INSPECTOR</span>
        <span className="nh-led-active bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Scrap Defect Rate</span>
          <span className="text-green-400 font-bold">0.38% (Passed check)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">NCR Exception Files</span>
          <span className="text-white font-bold">0 Active NCRs</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">ISO Standards compliance</span>
          <span className="text-cyan-400 font-bold">100% compliant</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Audit: <span className="text-green-400">CAPA WORKFLOW READY</span>
      </div>
    </div>
  );
};

// Finance & Accounts Ledger Balance Simulator
const FinanceErpSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left h-[180px] flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-green-400 font-bold uppercase tracking-wider">LEDGER_BAL_CLIENT</span>
        <span className="nh-led-active"></span>
      </div>

      <div className="space-y-1.5 flex-1 flex flex-col justify-center">
        <div className="flex justify-between text-gray-400">
          <span>Net Revenue (MTD)</span>
          <span className="font-bold text-white">$142,890.00</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Accounts Receivable</span>
          <span className="font-bold text-cyan-400">$18,405.00</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Accounts Payable</span>
          <span className="font-bold text-purple-400">$4,290.00</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Verification audit: <span className="text-green-400 font-bold">PASSED</span>
      </div>
    </div>
  );
};

// HR & Payroll Timesheet Simulator
const HrPayrollSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-fuchsia-400 font-bold uppercase tracking-wider">HR_PAYROLL_GATEWAY</span>
        <span className="nh-led-active bg-fuchsia-400 shadow-[0_0_8px_#e879f9]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Active Staff</span>
          <span className="text-white font-bold">150 Checked In</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Payroll sync state</span>
          <span className="text-green-400 font-bold">SUCCESS (100% processed)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Leave balance queue</span>
          <span className="text-cyan-400 font-bold">0 pending tickets</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Status: <span className="text-green-400">EMPLOYEE PROFILE COMPLIANT</span>
      </div>
    </div>
  );
};

// Asset Management Depreciation & Alarm Simulator
const AssetManagementSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-cyan-400 font-bold uppercase tracking-wider">ASSET_DEPRECIATION_MATRIX</span>
        <span className="nh-led-active bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Total Hardware Assets</span>
          <span className="text-white font-bold">342 Tracked Nodes</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Audit Status</span>
          <span className="text-green-400 font-bold">Asset Audit: Complete</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Maintenance schedule</span>
          <span className="text-cyan-400 font-bold">Zero active alarms</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        System: <span className="text-green-400">GPS TRACKING ACTIVE</span>
      </div>
    </div>
  );
};

// Warehouse Management Rack Slot Locator Simulator
const WarehouseManagementSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-violet-400 font-bold uppercase tracking-wider">WMS_AISLE_MAPPER</span>
        <span className="nh-led-active bg-violet-400 shadow-[0_0_8px_#a78bfa]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Put-Away route</span>
          <span className="text-white font-bold">Aisle 4, Rack 2, Slot B</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Picker Travel Velocity</span>
          <span className="text-green-400 font-bold">Reduced by 42%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Active carton loads</span>
          <span className="text-cyan-400 font-bold">34 packages packing</span>
        </div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        State: <span className="text-green-400">BARCODE HANDHELD ONLINE</span>
      </div>
    </div>
  );
};

// Default rotating dynamic wireframe
const DefaultErpVisualizer = () => {
  return (
    <div className="w-full max-w-sm aspect-square relative flex items-center justify-center p-6">
      <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-purple-500/20 animate-spin-slow"></div>
      <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-blue-400/30 animate-spin-reverse"></div>

      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-600/30 via-rose-600/20 to-blue-600/30 border border-purple-500/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(168,85,247,0.25)]">
        <div className="absolute w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]" />

        {/* Database Grid SVG Outline */}
        <svg className="w-10 h-10 text-white drop-shadow-[0_0_12px_#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      </div>
    </div>
  );
};

const renderErpSandboxWidget = (tab) => {
  switch (tab) {
    case 'Manufacturing ERP':
      return <ManufacturingErpSimulator />;
    case 'Healthcare ERP':
      return <HealthcareErpSimulator />;
    case 'Trading ERP':
      return <TradingErpSimulator />;
    case 'Construction ERP':
      return <ConstructionErpSimulator />;
    case 'Inventory Management':
      return <InventoryManagementSimulator />;
    case 'Purchase Management':
      return <PurchaseManagementSimulator />;
    case 'Production Planning':
      return <ProductionPlanningSimulator />;
    case 'Quality Management':
      return <QualityManagementSimulator />;
    case 'Finance & Accounts':
      return <FinanceErpSimulator />;
    case 'HR & Payroll':
      return <HrPayrollSimulator />;
    case 'Asset Management':
      return <AssetManagementSimulator />;
    case 'Warehouse Management':
      return <WarehouseManagementSimulator />;
    default:
      return <DefaultErpVisualizer />;
  }
};

const ErpHero = ({ activeTab }) => {
  const navigate = useNavigate();
  const data = getDefaultData(activeTab);

  return (
    <div className="relative">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide">
        <span onClick={() => navigate('/')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Home</span>
        <ChevronRight size={12} />
        <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Services</span>
        <ChevronRight size={12} />
        <span className="text-purple-500 font-medium">{activeTab}</span>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">

        {/* Left text */}
        <div className="lg:w-1/2 z-10 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeTab + "title"}
            className="text-4xl sm:text-5xl lg:text-[44px] font-bold text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            {data.heroTitle} <span className="erp-text-gradient">{data.heroHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            key={activeTab + "desc"}
            className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed mb-10 max-w-lg"
          >
            {data.heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-[#a855f7] hover:bg-[#9333ea] text-white text-sm font-medium rounded-md shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2"
            >
              Book Consultation <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-transparent border border-slate-300 dark:border-gray-600 hover:border-slate-500 dark:hover:border-gray-400 text-slate-900 dark:text-white text-sm font-medium rounded-md transition-all flex items-center gap-2"
            >
              Request Demo <Calendar size={16} />
            </button>
          </motion.div>
        </div>

        {/* Right Content -> Dynamic Specific Visuals */}
        <div className="lg:w-1/2 relative w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`erp-sandbox-${activeTab}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-full flex items-center justify-center"
            >
              {renderErpSandboxWidget(activeTab)}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 text-left"
      >
        <div className="bg-white dark:bg-[#050117]/50 border border-slate-200 dark:border-gray-800/60 rounded-xl p-5 flex items-center gap-4 hover:border-purple-500/30 transition-colors shadow-sm dark:shadow-lg">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Rocket size={24} />
          </div>
          <div>
            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white">3+</h4>
            <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-tight tracking-wide">Successful<br />Implementations</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#050117]/50 border border-slate-200 dark:border-gray-800/60 rounded-xl p-5 flex items-center gap-4 hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-lg">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Building2 size={24} />
          </div>
          <div>
            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white">2+</h4>
            <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-tight tracking-wide">Industries<br />Served</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#050117]/50 border border-slate-200 dark:border-gray-800/60 rounded-xl p-5 flex items-center gap-4 hover:border-pink-500/30 transition-colors shadow-sm dark:shadow-lg">
          <div className="p-3 bg-pink-500/10 rounded-lg text-pink-600 dark:text-pink-400 border border-pink-500/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white">99.9%</h4>
            <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-tight tracking-wide">System<br />Uptime</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#050117]/50 border border-slate-200 dark:border-gray-800/60 rounded-xl p-5 flex items-center gap-4 hover:border-fuchsia-500/30 transition-colors shadow-sm dark:shadow-lg">
          <div className="p-3 bg-fuchsia-500/10 rounded-lg text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-500/20">
            <Users size={24} />
          </div>
          <div>
            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white">10+</h4>
            <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-tight tracking-wide">Users<br />Empowered</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default ErpHero;
